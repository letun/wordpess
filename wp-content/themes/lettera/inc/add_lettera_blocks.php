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
	register_block_type( 'lettera/superhead');

	//Add HTML comment to columns
	add_filter('the_content', 'addHTMLComment', 10001);
}
add_action('init', 'lettera_blocks');

function addHTMLComment($content) {

	if ( is_single() && is_main_query() && !empty($content)) {

		$dom = new DOMDocument();
		$dom->encoding = 'utf-8';
		$dom->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'));
		
		$domx = new DomXPath($dom);
		$nodes = $domx->query("//*[contains(@class, 'columns')]");

		if (!is_null($nodes) && $nodes->length > 0) {
			foreach ($nodes as $node) {
				$k = 0;
				$columnsDiv = $dom->createElement('div');
				$columnsDiv->setAttribute("class","columns");

				//Add IE-table comment START
				$columnComment = $dom->createComment('[if (gte mso 9)|(IE)]><table width="100%"><tr><td width="50%" valign="top" ><![endif]');
				$columnsDiv->appendChild($columnComment);

				foreach ($oldColumns = $domx->query(".//table[contains(@class, 'column')]", $node) as $column) {
					$k++;
					$columnDiv = $dom->createElement('div');
					$columnDiv->setAttribute("class","column");
					$columnDiv->appendChild($column->cloneNode(true));
					$columnsDiv->appendChild($columnDiv);

					if ($k < $oldColumns->length) {
						//Add IE-table comment BETWEEN
						$columnComment = $dom->createComment('[if (gte mso 9)|(IE)]></td><td width="50%" valign="top" ><![endif]');
						$columnsDiv->appendChild($columnComment);
					}
				}
				//Add IE-table comment END
				$columnComment = $dom->createComment('[if (gte mso 9)|(IE)]></td></tr></table><![endif]');
				$columnsDiv->appendChild($columnComment);

				$node->parentNode->replaceChild($columnsDiv, $node);
			}
			return str_replace(array('<html>', '<body>', '</body>', '</html>'), '', ($dom->saveHTML($dom->documentElement)));
		}
	}
	return $content;
}
