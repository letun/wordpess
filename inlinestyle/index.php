<?php
require_once __DIR__ . '/vendor/autoload.php';

/*
use Pelago\Emogrifier\CssInliner;
$html = file_get_contents("http://wordpress.local/lettera/my-first-email/?preview=true");
$css = file_get_contents("http://wordpress.local/wp-content/themes/lettera/lettera.css");
//$visualHtml = CssInliner::fromHtml($html)->inlineCss($css)->render();
$visualHtml = CssInliner::fromHtml($html)->inlineCss()->render();
echo $visualHtml;
*/

use \InlineStyle\InlineStyle;

$htmldoc = new InlineStyle(file_get_contents("http://wordpress.local/lettera/my-first-email/?preview=true"));
//$htmldoc->applyStylesheet($htmldoc->extractStylesheets());
$htmldoc->applyStylesheet(file_get_contents("http://wordpress.local/wp-content/themes/lettera/lettera.css"));

echo $htmldoc->getHTML();