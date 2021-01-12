<?php

function render_lettera_blocks($attr, $content) {
	return $content;
}

function lettera_blocks() {
	// automatically load dependencies and version
	$asset_file = include( get_template_directory() . '/blocks/build/index.asset.php');

	wp_register_script(
		'lettera-blocks',
		get_template_directory_uri() . '/blocks/build/index.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);

	/*
	register_block_type( 'lettera/cover', array(
		'editor_script' => 'lettera-blocks',
	) );
	*/
	register_block_type( 'lettera/text', array(
		'editor_script' => 'lettera-blocks',
		'render_callback' => 'render_lettera_blocks'
	) );

	//Add elements
	//register_block_type( 'lettera/text');
}
add_action('init', 'lettera_blocks');