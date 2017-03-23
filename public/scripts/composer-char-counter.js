function updateCounter(ev) {
	let $counter = $(this).parent().children('.counter');
	let currLength = $(this).val().length;
	$counter.text(140 - currLength);
	if ($counter.text() < 0) {
		$counter.addClass('red-text');
	}
	else {
		$counter.removeClass('red-text');
	}	
}
$(document).ready(function() {
	$('section.new-tweet form').on('keydown', 'textarea', updateCounter);
	$('section.new-tweet form').on('change', 'textarea', updateCounter);
})