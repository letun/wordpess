<?php
/* Get HTML-email by link */

function devmail_getInlineHTML($pageUrl, $cssUrl = '') {

	$url = add_query_arg(array("pageUrl" => urlencode($pageUrl), "cssUrl" => urlencode($cssUrl)), get_site_url() . '/inline/index.php');
	$html = file_get_contents($url);

	return $html;
}
