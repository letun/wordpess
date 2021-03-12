<?php

require_once get_template_directory() . '/inc/disable_comments.php';
require_once get_template_directory() . '/inc/disable_xmlrpc.php';

require_once get_template_directory() . '/inc/lettera_post_type.php';
require_once get_template_directory() . '/inc/allowed_block_types.php';
require_once get_template_directory() . '/inc/add_lettera_blocks.php';

require_once get_template_directory() . '/inc/inline_styles.php';

require_once get_template_directory() . '/inc/send_to_form.php';


add_action('init', 'init_theme_method');
function init_theme_method() {
	add_thickbox();
}