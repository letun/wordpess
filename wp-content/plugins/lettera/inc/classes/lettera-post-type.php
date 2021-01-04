<?php
/*
 * Create custom post type Lettera
 *
 */

class Lettera_Post_Type {
	public function __construct() {

		add_action('init', array( &$this, 'init'));

		if (is_admin()) {
			add_action('admin_init', array( &$this, 'admin_init'));
		}
	}

	/**
	 * Register the custom post type
	 */
	public function init() {

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
			'rewrite' => true,
			'capability_type' => 'post',
			'hierarchical' => false,
			'menu_position' => null,
			'supports' => array('title', 'editor', 'author', 'custom-fields'),
			'rewrite' => array('slug' => 'lettera', 'with_front' => true),
			'taxonomies' => array('category', 'post_tag'),
		);

		register_post_type('lettera' , $args);
		//add_rewrite_rule('^videos$', 'index.php?post_type=ecwid-video', 'top');
	}
}

$GLOBALS['lettera_post_type'] = new Lettera_Post_Type();