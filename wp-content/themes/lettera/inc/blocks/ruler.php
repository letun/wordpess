<div class="ruler">
	<div class="ruler__buttons">
		<div class="ruler__buttons-group ruler__buttons-group--devices">
			<div class="ruler__button" data-name="laptop-l"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/desktop_mac.svg'); ?></div>
			<div class="ruler__button" data-name="laptop-m"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/laptop_mac.svg'); ?></div>
			<div class="ruler__button ruler__button--rotate" data-name="tablet-m"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/tablet_mac.svg'); ?></div>
			<div class="ruler__button" data-name="tablet-s"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/tablet_mac.svg'); ?></div>
			<div class="ruler__button" data-name="mobile-m"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/phone_iphone.svg'); ?></div>
		</div>
		<div class="ruler__buttons-group">
			<div class="ruler__button ruler__button--active" data-name="theme-l"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/sunny.svg'); ?></div>
			<div class="ruler__button" data-name="theme-d"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/brightness.svg'); ?></div>
		</div>
		<div class="ruler__buttons-group">
			<div class="ruler__button" data-name="copy-html"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/copy.svg'); ?></div>
			<div class="ruler__button" data-name="send-to"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/mail.svg'); ?></div>
			<a href="<?= get_edit_post_link(); ?>" class="ruler__button" data-name="edit" target="_blank"><?= file_get_contents(get_template_directory() . '/images/assets/ruler/edit.svg'); ?></a>
		</div>
	</div>
	<div class="ruler__screens-line"></div>
	<div class="ruler__copy-html-container">
		<textarea id="copyToClipboard"><?= file_get_contents(add_query_arg(array("preview" => "true"), get_permalink())); ?></textarea>
	</div>
</div>