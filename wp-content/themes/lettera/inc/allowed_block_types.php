<?php

add_filter( 'allowed_block_types', function($allowed_block_types, $post) {
	if ($post->post_type === 'lettera') {
		$allowed_block_types = array('core/block');

		$registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		if (!empty($registered_blocks)) {
			foreach ($registered_blocks as $k => $v) {
				if (strpos($v->name, 'lettera/') === 0) {
					$allowed_block_types[] = $k;
				}
			}
		}
	}

	return $allowed_block_types;
}, 10, 2 );
