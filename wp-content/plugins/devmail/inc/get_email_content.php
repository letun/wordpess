<?php

$templateSettings = array(
	'templateClass' => '',
	'files' => array(
		'header' => get_template_directory() . '/inc/partials/header.php',
		'footer' => get_template_directory() . '/inc/partials/footer.php',
		'css' => get_template_directory() . '/lettera.css',
	),
	'header' => array(
		'headerClass' => 'header--ecwid',
		'logoText' => 'Ecwid by Lightspeed',
		'logoUrl' => 'https://www.ecwid.com/',
		'logoSizeX' => '120',
		'logoSizeY' => '36',
		'logoImage' => CDN . '/wp-content/themes/lettera/images/header/logo/v4/ecwid-logo-horizontal.png',
		'titleVar' => wp_title(),
		'preheaderVar' => the_excerpt(),
	),
	'footer' => array(
		'class' => 'footer',
		'unsubscribeUrl' => '{{ unsubscribe_url }}',
		'links' => array(
			array(
				'linkText' => 'Sign in',
				'linkUrl' => 'https://my.ecwid.com/cp/#register',
			),
			array(
				'linkText' => 'Help Center',
				'linkUrl' => 'https://support.ecwid.com/',
			),
			array(
				'linkText' => 'Refer a friend',
				'linkUrl' => 'https://support.ecwid.com/hc/en-us/articles/207600079-Ecwid-referral-program?utm_source=intercomemails&utm_medium=email&utm_campaign=referralprogram_footer#becoming-an-ecwid-partner',
			),
			array(
				'linkText' => 'Website',
				'linkUrl' => 'https://www.ecwid.com/',
			),
			array(
				'linkText' => 'Unsubscribe',
				'linkUrl' => 'unsubscribeUrl',
			),
		),
		'text1' => '<p class="text-gray">Download our app for <a href="https://itunes.apple.com/us/app/ecwid/id626731456?mt=8" target="_blank">iPhone</a>&nbsp;and <a href="https://play.google.com/store/apps/details?id=com.ecwid.android" target="_blank">Android</a></p>',
		'text2' => '<p class="text-gray">Ecwid, Inc.,<br /> 460 Park Ave S 7th Floor,<br /> New York, NY 10016, US</p>',
		'socialLinks' => array(
			array(
				'linkImage' => CDN . '/wp-content/themes/lettera/images/footer/social/fb.png',
				'linkText' => 'Facebook',
				'linkUrl' => 'https://www.facebook.com/ecwid',
			),
			array(
				'linkImage' => CDN . '/wp-content/themes/lettera/images/footer/social/in.png',
				'linkText' => 'Instagram',
				'linkUrl' => 'https://www.instagram.com/ecwid/',
			),
			array(
				'linkImage' => CDN . '/wp-content/themes/lettera/images/footer/social/sc.png',
				'linkText' => 'Podcast',
				'linkUrl' => 'https://ecwid.com/podcast',
			),
			array(
				'linkImage' => CDN . '/wp-content/themes/lettera/images/footer/social/tw.png',
				'linkText' => 'Twitter',
				'linkUrl' => 'https://twitter.com/ecwid',
			),
			array(
				'linkImage' => CDN . '/wp-content/themes/lettera/images/footer/social/yt.png',
				'linkText' => 'Youtube',
				'linkUrl' => 'http://www.youtube.com/user/EcwidTeam',
			),
			array(
				'linkImage' => CDN . '/wp-content/themes/lettera/images/footer/social/ln.png',
				'linkText' => 'LinkedIn',
				'linkUrl' => 'https://www.linkedin.com/company/ecwid',
			),
		),
	),
);

function devmail_formatHTML($html) {

	include_once get_template_directory() . '/inc/php-format-html/beautify-html.php';

	$beautify = new Beautify_Html(array(
		'indent_inner_html' => false,
		'indent_char' => " ",
		'indent_size' => 2,
		'wrap_line_length' => 32786,
		'preserve_newlines' => false,
		'max_preserve_newlines' => 32786,
		'indent_scripts'	=> 'normal' // keep|separate|normal
	));

	return $beautify->beautify($html);
}

function get_lettera_type() {
	global $post;

	if ($post->post_type === 'lettera-ls') {
		return 'lettera-ls';
	}

	if (empty(get_page_template_slug($post->ID))) return 'default';

	preg_match('/template-lettera-(.*).php/', get_page_template_slug($post->ID), $output);

	return $output[1];
}

function inline_content($html) {
	include_once get_template_directory() . '/inc/inline/inline.php';
	$css = file_get_contents(get_template_directory() . '/lettera.css');

	return lettera_get_inline_content($html, $css);
}

function lettera_add_htmlentities($html) {
	//Add special characters to correct copyToClipboard
	$html = htmlentities($html);

	//Fix special characters
	$specialCharacters = array(
		'&nbsp;' => '&amp;nbsp;',
		'&zwnj;' => '&amp;zwnj;',
		'&rarr;' => '&amp;rarr;',
		'&rsaquo;' => '&amp;rsaquo;',
		'&ndash;' => '&amp;ndash;',
		'&mdash;' => '&amp;mdash;',
		'&shy;' => '&amp;shy;',
	);
	$html = str_replace(array_keys($specialCharacters), $specialCharacters, $html);

	return $html;
}

function get_lettera_header($formatHTML = false) {
	global $templateSettings;

	ob_start();
	include get_template_directory() . "/inc/partials/vars-" . get_lettera_type() . ".php";
	if (!empty(@$templateSettings['files']['header'])) {
		include $templateSettings['files']['header'];
	}
	$header = ob_get_clean();

	if ($formatHTML === true) {
		$header = formatHTML($header);
	}

	return $header;
}

function get_lettera_footer($formatHTML = false) {
	global $templateSettings;

	ob_start();
	include get_template_directory() . "/inc/partials/vars-" . get_lettera_type() . ".php";
	if (!empty(@$templateSettings['files']['footer'])) {
		include $templateSettings['files']['footer'];
	}
	$footer = ob_get_clean();

	if ($formatHTML === true) {
		$footer = formatHTML($footer);
	}

	return $footer;
}

function get_lettera_content($formatHTML = false, $inline = false, $htmlentities = false) {
	global $post;

	$content = $post->post_content;
	$content = apply_filters('the_content', $content);
	$content = lettera_add_html_comments($content);

	//Add inline styles to each tag
	if ($inline) {
		$content = inline_content($content);
	}

	//Remove extra lines and add tabs
	if ($formatHTML === true) {
		$content = formatHTML($content);
	}

	if ($inline) {
		//Remove <doctype><html>,<body> tags
		preg_match_all('/<body.*>(.*)<\/body>/msU', $content, $matches);
		if (!empty($matches) && !empty($matches[1][0])) {
			$content = $matches[1][0];
		}
	}

	//Add special characters to correct copyToClipboard
	if ($htmlentities) {
		$content = lettera_add_htmlentities($content, $inline);
	}

	return $content;
}

function get_lettera_email($inline = false, $htmlentities = false) {
	$html = get_lettera_header();
	$html .= get_lettera_content();
	$html .= get_lettera_footer();

	//Add inline styles to each tag
	if ($inline) {
		$html = inline_content($html);
	}

	//Remove extra lines and add tabs
	$html = formatHTML($html);

	//Add special characters to correct copyToClipboard
	if ($htmlentities) {
		$html = lettera_add_htmlentities($html, $inline);
	}

	return $html;
}
