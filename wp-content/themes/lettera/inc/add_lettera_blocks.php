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

	register_block_type( 'lettera/text', array(
		'editor_script' => 'lettera-blocks',
		'render_callback' => 'render_lettera_blocks',
		'editor_style'    => 'lettera-admin-css'
	) );

	//Add elements
	register_block_type( 'lettera/preheader');
	register_block_type( 'lettera/header');
	register_block_type( 'lettera/heading');
	register_block_type( 'lettera/paragraph');
	register_block_type( 'lettera/list');
	register_block_type( 'lettera/button');
	register_block_type( 'lettera/text-small');
	register_block_type( 'lettera/card');

	register_block_type( 'lettera/block-text');
	register_block_type( 'lettera/block-btn');
	register_block_type( 'lettera/block-heading');
	register_block_type( 'lettera/block-cards');

	//Components
	register_block_type( 'lettera/text-image');
	register_block_type( 'lettera/promo');
	register_block_type( 'lettera/cards');

	//Add HTML comment to columns
	//add_filter('the_content', 'addHTMLComment', 10001);
	add_filter('the_content', 'addHTMLComment2', 10, 2);
}
add_action('init', 'lettera_blocks');

function addHTMLComment($content) {
	if ( is_single() && is_main_query() ) {
		return preg_replace("/<[\/]?pre>/i", "", $content);
	}
	return $content;
}

function addHTMLComment2($content) {
	if ( is_single() && is_main_query() ) {
		$doc = new DOMDocument();
		$doc->encoding = 'utf-8';
		$doc->loadHTML(htmlentities(utf8_decode($content)));
		$finder = new DomXPath($doc);
		$classname="columns-inner";
		$nodes = $finder->query("//*[contains(@class, '$classname')]");

		if (!is_null($nodes) && $nodes->length > 0) {
			//$nodes[0]->removeChild($nodes);
			return $nodes->length . '-' . $doc->saveHTML();
		}

	}
	return $content;
}
