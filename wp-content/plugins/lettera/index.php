<?php
/*
Plugin Name: Lettera
Plugin URI: https://letun.dev/lettera/
Description: Email builder
Version: 0.9
Author: Serge Andreev
Author URI: https://letun.dev
*/

if ( ! function_exists( 'get_option' ) ) {
	header( 'HTTP/1.0 403 Forbidden' );
	die;  // Silence is golden, direct call is prohibited
}

if ( defined( 'LETTERA_VERSION' ) ) {
	wp_die( 'It seems that other version of Lettera is active. Please deactivate it before use this version' );
}

define( 'LETTERA_VERSION', '0.9' );
define( 'LETTERA_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'LETTERA_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'LETTERA_PLUGIN_BASE_NAME', plugin_basename( __FILE__ ) );
define( 'LETTERA_PLUGIN_FILE', basename( __FILE__ ) );
define( 'LETTERA_PLUGIN_FULL_PATH', __FILE__ );

require_once( LETTERA_PLUGIN_DIR .'inc/loader.php' );