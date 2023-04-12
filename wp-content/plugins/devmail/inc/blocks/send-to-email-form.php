<div id="send-to" class="send-to">
	<form action="#" action="POST" id="send-to-email-form" class="send-to__form form">
		<?php wp_nonce_field( 'send-to-nonce' ); ?>
		<input type="hidden" name="action" value="send_to" />
		<fieldset>
			<legend class="h3">Send a preview email</legend>
			<div class="form__group">
				<input type="email" name="email" placeholder="Enter email address" value="" class="form__control" />
				<label for="email" class="form__label">Send the preview to:</label>
			</div>
			<div class="form__btn-block">
				<button type="submit" value="Send" class="button">Send</button>
			</div>
		</fieldset>
		<div class="form__result" id="send-to__result"></div>
	</form>
</div>
