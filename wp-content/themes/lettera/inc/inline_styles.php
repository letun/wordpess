<?php
//include_once get_template_directory() . '/inc/InlineStyle/InlineStyle/InlineStyle.php';

function get_inline_content() {
	if (class_exists('InlineStyle')) {
		$htmldoc = new InlineStyle(file_get_contents('http://wordpress.local/lettera/my-first-email/?preview=true'));
	}

	echo $htmldoc;
}
