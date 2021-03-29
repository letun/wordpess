<?php
if (is_front_page()) {
	$pid = 'front-page';
} elseif (is_singular()) {
	$pid = 'p-' . $post->ID;
} else {
	$pid = 'page';
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
	<link rel="icon" type="image/svg+xml" sizes="any" href="/favicon.svg">
	<link rel="shortcut icon" href="/favicon.ico">
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
	<meta name="msapplication-TileColor" content="#da532c">
	<meta name="theme-color" content="#ffffff">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<title><?php wp_title(); ?></title>
	<link href="<?= get_template_directory_uri();?>/style.css" rel="stylesheet" type="text/css" />
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
	</style>
	<?php wp_head(); ?>
</head>
<body id="<?=$pid?>">
	<header>
		<div class="logo"><a href="//www.letun.dev/" id="logo"><img src="/wp-content/themes/lettera/images/assets/logo/logo.svg" width="24px"></a></div>
	</header>