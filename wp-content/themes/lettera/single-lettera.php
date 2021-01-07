<?php
/**
 * The main template file
 */

if ($_GET["preview"]):

else:
	get_header();
	?>
	<div class="ruler"></div>
	<div class="content">
	<?= add_query_arg(array("preview" => "true"), get_permalink());?>
	<iframe src="" class="content__frame" width="100%" height="100%"></iframe>
	</div>
	<script src="<?= get_template_directory_uri();?>/js/func.js" async></script>
	<?php get_footer();
endif;