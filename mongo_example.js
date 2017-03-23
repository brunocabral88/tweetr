"use strict";

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


function getTweets(callback) {
	MongoClient.connect(MONGODB_URI, function(err,db) {
		db.collection('tweets').find({}).toArray(callback);
	});
}

getTweets(function(err,tweets) {
	tweets.map((tweet) => console.log(tweet));
})


