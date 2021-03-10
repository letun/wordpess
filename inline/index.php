<?php
require_once __DIR__ . '/vendor/autoload.php';

use TijsVerkoyen\CssToInlineStyles\CssToInlineStyles;

if (!empty($_GET['pageUrl'])) {
	$html = file_get_contents($_GET['pageUrl']);
}

if (!empty($_GET['cssUrl'])) {
	$css = file_get_contents($_GET['cssUrl']);
}
$cssToInlineStyles = new CssToInlineStyles();

echo $cssToInlineStyles->convert($html, $css);
