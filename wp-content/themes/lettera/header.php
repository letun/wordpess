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
	<title><?php wp_title(); ?></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link href="<?= get_template_directory_uri();?>/style.css" rel="stylesheet" type="text/css" />
	<style>
		@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
	</style>
	<?php wp_head(); ?>
</head>
<body id="<?=$pid?>">
	<header>
		<div class="logo"><a href="//www.letun.dev/" id="logo"><img src="/wp-content/themes/lettera/images/assets/logo/logo.svg"></a></div>
	</header>