<?php
/**
 * The main template file
 */

if ($_GET["inline"]):
	get_inline_content();
elseif ($_GET["preview"]):
	get_header('lettera');
	the_content();
	get_footer('lettera');
else:
	get_header();
	?>
	<?php include_once get_template_directory() . '/inc/blocks/ruler.php'; ?>
	<div class="content">
	<iframe src="<?= add_query_arg(array("preview" => "true"), get_permalink());?>" class="content__frame" id="lettera-content" width="100%" height="100%"></iframe>
	</div>
	<script src="<?= get_template_directory_uri();?>/js/ruler.js" async></script>
	<?php get_footer();
endif;