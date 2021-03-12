(function($){
	$(function() {
		console.log(send_to_vars.postID);
		$('form#send-to-email-form').on('submit', function(e){
			$('#send-to__result').html('');
			$.post(
				send_to_vars.ajax_url,
				$(this).serialize() + "&postID=" + send_to_vars.postID
			).done(function( data ) {
				$('#send-to__result').html(data);
			}).fail(function() {
				console.log(111);
				$('#send-to__result').html('<span class="form__message send_to__message form__message--error">Error: Wrong request</span>');
			});
			e.preventDefault();
		});
	});
})(jQuery);