<?php
/**
 * Register "DevMail" post type
 */

add_action('init', function() {
	$labels = array(
		'name' => 'DevMail',
		'singular_name' => 'DevMail',
		'add_new' => 'Add New Email',
		'add_new_item' => 'Add New Email',
		'edit_item' => 'Edit email',
		'new_item' => 'New email',
		'view_item' => 'View email',
		'search_items' => 'Search emails',
		'not_found' =>  'Nothing found',
		'not_found_in_trash' => 'Nothing found in Trash',
		'parent_item_colon' => ''
	);

	$args = array(
		'labels' => $labels,
		'menu_icon' => 'dashicons-email',
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'query_var' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'menu_position' => null,
		'supports' => array('title', 'excerpt', 'editor', 'author', 'custom-fields'),
		'rewrite' => array('slug' => 'devmail', 'with_front' => true),
		'taxonomies' => array('category', 'post_tag'),
		'show_in_rest' => true,
	);

	register_post_type('devmail' , $args);
	//add_rewrite_rule('^lettera', 'index.php?post_type=lettera', 'top');
});

add_filter('single_template', function ($single) {
	global $post;

	/* Checks for single template by post type */
	if ( $post->post_type == 'devmail' ) {
		if ( file_exists( DEVMAIL__DIR__ . '/inc/single-devmail.php' ) ) {
			return DEVMAIL__DIR__ . '/inc/single-devmail.php';
		}
	}

	return $single;
});
