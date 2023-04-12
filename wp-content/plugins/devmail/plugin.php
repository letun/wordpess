<?php
/**
 * Plugin Name: DevMail
 * Description: Email builder. Make your own responsive emails with night theme.
 * Plugin URI:  https://github.com/letun/wordpess
 * Author URI:  https://www.linkedin.com/in/letun84/
 * Author:      Sergei Andreev
 * Version:     1.0
 */

define( 'DEVMAIL__FILE__', __FILE__ );
define( 'DEVMAIL__DIR__', dirname( __FILE__ ) );
define( 'DEVMAIL__URI__', plugins_url('/', __FILE__));

/* Add 'devmail' post type */
require_once DEVMAIL__DIR__ . '/inc/devmail_post_type.php';

/* Show only registered blocks in DevMail post type */
require_once DEVMAIL__DIR__ . '/inc/allowed_block_types.php';

/* Add new blocks to library */
require_once DEVMAIL__DIR__ . '/inc/add_devmail_blocks.php';

/* Add functions to get email content on the page */
require_once DEVMAIL__DIR__ . '/inc/get_email_content.php';

/* Add all CSS styles to style param for each tag */
require_once DEVMAIL__DIR__ . '/inc/inline_styles.php';
