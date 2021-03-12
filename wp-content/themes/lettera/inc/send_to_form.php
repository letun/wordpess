<?php
function send_to_scripts() {
	if (!is_admin() || 1) {
		wp_register_script(
			'send_to',
			get_template_directory_uri() . '/js/send_to.js',
			array('jquery'),
			'1.0',
			true
		);
		wp_localize_script(
			'send_to',
			'send_to_vars',
			array(
				'ajax_url' => admin_url('admin-ajax.php'),
				'nonce' => wp_create_nonce('send-to-nonce'),
				'postID' => get_the_ID(),
			)
		);
		wp_enqueue_script('send_to');
	}
}
add_action('wp_enqueue_scripts', 'send_to_scripts');

function wp_ajax_send_to_function() {
	$is_error = false;
	$msg = '';
	if (!check_ajax_referer( 'send-to-nonce' )) {
		$is_error = true;
		$msg = 'Error: Please try again later';
	}
	if (!is_user_logged_in()) {
		$is_error = true;
		$msg = 'Error: Please <a href="' . wp_login_url() . '">log in</a>';
	}

	if (!$is_error && !is_email($_POST['email'])) {
		$is_error = true;
		$msg = 'Error: Wrong email address';
	}

	if (!$is_error) {
		$url = add_query_arg(
			array('inline' => true),
			get_permalink($_POST['postID'])
		);

		$html = file_get_contents($url);

		if (!wp_mail(
			$_POST['email'],
			get_the_title($_POST['postID']),
			$html,
			array(
				'Content-Type: text/html; charset=UTF-8',
				'From: Me Myself <' . wp_get_current_user()->user_email . '>'
			)
		)) {
			$is_error = true;
			$msg = 'Error: Email wasn\'t sent. Please try again later';
		}
	}

	if (!$is_error) {
		$msg = 'Email was sent';
	}

	echo '<span class="form__message send_to__message' . ($is_error ? ' form__message--error' : '') . '">' . $msg . '</span>';

	wp_die();
}
add_action( 'wp_ajax_nopriv_send_to', 'wp_ajax_send_to_function' );
add_action( 'wp_ajax_send_to', 'wp_ajax_send_to_function' );
