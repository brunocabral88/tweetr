/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1411113796368
  }
];

function createTweetElement(tweetObj) {
	var $tweet = $('<article></article>');
	// Header
	var $header = $('<header></header>');
	var $avatar = $('<img>').addClass('tweet-thumbnail');
	$avatar.attr('src',tweetObj.user.avatars.small);
	$header.append($avatar);
	var $headerText = $('<h3></h3>').text(tweetObj.user.name);
	$header.append($headerText);
  var $username = $(`<div class="username">${tweetObj.user.handle}</div>`);
  $header.append($username);
	$tweet.append($header);
	// Body
	var $tweetText = $('<p></p>').text(tweetObj.content.text);
	$tweet.append($tweetText);
	// Footer
	var $footer = $('<footer></footer>');
	var postTimeDiff = new Date(new Date().getTime() - new Date(tweetObj.created_at).getTime());
	var postDaysAgo = Math.round(postTimeDiff/1000/60/60/24);
	var $span = $('<span></span>').addClass('tweet-timestamp').text(postDaysAgo + " days ago");
	$footer.append($span);
	var $div = $('<div></div>').addClass('tweet-interact-icons');
	var $iconsFlag = $('<i class="fa fa-flag" aria-hidden="true"></i>');
	var $iconsRetweet = $('<i class="fa fa-retweet" aria-hidden="true"></i>');
	var $iconsHeart = $('<i class="fa fa-heart" aria-hidden="true"></i>');
	$div.append($iconsFlag).append($iconsRetweet).append($iconsHeart);
	$footer.append($div);
	$tweet.append($footer);
	return $tweet;
}

function renderTweets(tweetsArr) {
	tweetsArr.forEach((tweet) => {
		$('#tweets').append(createTweetElement(tweet));	
	});
}

$(document).ready(function() {

  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      type: 'GET',
      success: function (tweets) {
        renderTweets(tweets);
      }
    });
  }
  loadTweets();

  const alertUser = (message) => {
    if ($(document).find('section.new-tweet div.alert').length == 0) {
      let $section = $('section.new-tweet');
      let $alertDiv = $(`<div class='alert alert-warning'>${message}</div>`);
      $section.append($alertDiv);
      setTimeout(() => {
        $alertDiv.remove();
      }, 2000);  
    } else if ($(document).find('section.new-tweet div.alert').length > 140){ 

    } else {
      return false;
    } 
  }

	// Tweets hover handler
  $('section#tweets').on('mouseenter','article',function() {
    $(this).find('h3,p').css('color','#244751');
		$(this).children('footer').children('.tweet-interact-icons').fadeIn('fast');
	});
	$('section#tweets').on('mouseleave','article',function() {
    $(this).find('h3,p').css('color','#667e84');
		$(this).children('footer').children('.tweet-interact-icons').fadeOut('fast');
	});
	
  // New tweet submit form event handler
  $('section.new-tweet form').on('submit',function(event) {
    let serializedData = $(this).serialize();
    event.preventDefault();
    if ($('.new-tweet textarea').val() == false) {
      alertUser('Please enter a message to tweet');
      return false;
    } else if ($('.new-tweet textarea').val().length > 140) {
      alertUser('Please reduce your message size. Allowed up to 140 characters..');
      return false;
    }

    $.ajax({
      url: 'http://localhost:8080/tweets',
      type: 'POST',
      data: serializedData,
      success: function(response) {
        $('#tweets').prepend(createTweetElement(response));
      }
    });
  });

  // Compose button
  $('div.btn-compose').on('click',function() {
    $('section.new-tweet').slideToggle();
    $('section.new-tweet textarea').focus();
  });

})

