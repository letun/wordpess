<?php
/**
 * The main template file
 */

if ($_GET["inline"]):
	$pageUrl = add_query_arg(array("preview" => "true"), get_permalink());
	$cssUrl = DEVMAIL__URI__ . 'css/devmail.css';
	echo devmail_getInlineHTML($pageUrl, $cssUrl);
elseif ($_GET["preview"]):
	require_once DEVMAIL__DIR__ . '/inc/partials/header-devmail.php';
	the_content();
	require_once DEVMAIL__DIR__ . '/inc/partials/footer-devmail.php';
else:
	get_header();
	include_once DEVMAIL__DIR__ . '/inc/blocks/ruler.php';
    ?>
	<div class="content">
		<iframe src="<?= add_query_arg(array("preview" => "true"), get_permalink());?>" class="content__frame" id="lettera-content" width="100%" height="100%"></iframe>
	</div>
	<script src="<?= DEVMAIL__DIR__ . 'js/ruler.js' ;?>" async></script>
	<?php
    get_footer();
endif;