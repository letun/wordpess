<?php
/* Add new blocks to library */

function devmail_RenderBlocks($attr, $content) {
	return $content;
}

function devmail_addEditorStyles() {
	add_theme_support( 'editor-styles' );
	add_editor_style(DEVMAIL__URI__ . 'css/admin.css');
}
add_action( 'after_setup_theme', 'devmail_addEditorStyles' );
add_action('admin_init', 'devmail_addEditorStyles');

add_action('init', function () {
	// automatically load dependencies and version
	$asset_file = include( DEVMAIL__DIR__ . '/blocks/build/index.asset.php');

	wp_register_script(
		'devmail-blocks',
		DEVMAIL__URI__ . 'blocks/build/index.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);

	wp_register_style(
		'devmail-admin-css',
		DEVMAIL__URI__ . 'css/admin.css'
	);

	register_block_type( 'devmail/text', array(
		'editor_script' => 'devmail-blocks',
		'render_callback' => 'devmail_RenderBlocks',
		'editor_style'    => 'devmail-admin-css'
	) );

	//Add elements
	register_block_type( 'devmail/preheader');
	register_block_type( 'devmail/header');
	register_block_type( 'devmail/heading');
	register_block_type( 'devmail/paragraph');
	register_block_type( 'devmail/list');
	register_block_type( 'devmail/button');
	register_block_type( 'devmail/text-small');
	register_block_type( 'devmail/card');
	register_block_type( 'devmail/feature');
	register_block_type( 'devmail/image');

	register_block_type( 'devmail/block-text');
	register_block_type( 'devmail/block-btn');
	register_block_type( 'devmail/block-heading');
	register_block_type( 'devmail/block-cards');

	//Components
	register_block_type( 'devmail/text-image');
	register_block_type( 'devmail/promo');
	register_block_type( 'devmail/cards');
	register_block_type( 'devmail/superhead');
	register_block_type( 'devmail/cta');

	//Add HTML comment to columns
	add_filter('the_content', 'devmail_addHTMLComment', 10001);
});

function devmail_addHTMLComment($content) {

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
