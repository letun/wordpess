<?php

function render_lettera_blocks($attr, $content) {
	return $content;
}

function lettera_add_editor_styles() {
	add_theme_support( 'editor-styles' );
	add_editor_style('lettera-admin.css');
}
add_action( 'after_setup_theme', 'lettera_add_editor_styles' );
add_action('admin_init', 'lettera_add_editor_styles');

function lettera_blocks() {

	// automatically load dependencies and version
	$asset_file = include( get_template_directory() . '/blocks/build/index.asset.php');

	wp_register_script(
		'lettera-blocks',
		get_template_directory_uri() . '/blocks/build/index.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'lettera-admin-css',
		get_template_directory_uri() . '/lettera-admin.css'
	);

	register_block_type( 'lettera/cover', array(
		'editor_script' => 'lettera-blocks',
		'render_callback' => 'render_lettera_blocks',
		'editor_style'    => 'lettera-admin-css'
	) );

	//Add elements
	register_block_type( 'lettera/preheader');
	register_block_type( 'lettera/header');
	register_block_type( 'lettera/heading');
	register_block_type( 'lettera/text');
	register_block_type( 'lettera/list');
	register_block_type( 'lettera/button');
	register_block_type( 'lettera/text-small');

	register_block_type( 'lettera/block-text');
	register_block_type( 'lettera/block-text-extra');
	register_block_type( 'lettera/block-btn');
	register_block_type( 'lettera/block-heading');


	//Add HTML comment to columns
	add_filter('the_content', 'addHTMLComment', 10001);
}
add_action('init', 'lettera_blocks');

function addHTMLComment($content) {
	if ( is_single() && is_main_query() ) {
		return preg_replace("/<[\/]?pre>/i", "", $content);
	}
	return $content;
}
