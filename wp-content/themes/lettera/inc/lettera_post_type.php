<?php

add_action('init', function() {
	$labels = array(
		'name' => _x('Lettera', 'post type general name'),
		'singular_name' => _x('Lettera Email', 'post type singular name'),
		'add_new' => _x('Add New', 'guide'),
		'add_new_item' => __('Add new email'),
		'edit_item' => __('Edit email'),
		'new_item' => __('New email'),
		'view_item' => __('View email'),
		'search_items' => __('Search emails'),
		'not_found' =>  __('Nothing found'),
		'not_found_in_trash' => __('Nothing found in Trash'),
		'parent_item_colon' => ''
	);

	$args = array(
		'labels' => $labels,
		'menu_icon' => 'dashicons-buddicons-pm',
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'query_var' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'menu_position' => null,
		'supports' => array('title', 'excerpt', 'editor', 'author', 'custom-fields'),
		'rewrite' => array('slug' => 'lettera', 'with_front' => true),
		'taxonomies' => array('category', 'post_tag'),
		'show_in_rest' => true,
	);

	register_post_type('lettera' , $args);
	//add_rewrite_rule('^lettera', 'index.php?post_type=lettera', 'top');
});