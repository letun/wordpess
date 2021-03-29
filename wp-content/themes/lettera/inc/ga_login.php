<?php
add_action('init', 'letteraLogin');

function letteraLogin()
{
	if (!is_user_logged_in() && (strstr($_SERVER["REQUEST_URI"], '/wp-admin') || strstr($_SERVER["REQUEST_URI"], '/wp-login')) && (!defined('DOING_AJAX') || !DOING_AJAX)) {
		if ($_GET['gaautologin'] !== 'true') {
			$redirect_to = add_query_arg(array('gaautologin' => 'true'), wp_login_url(admin_url()));
			wp_safe_redirect($redirect_to);
		}
	}
}