<?php
/*
Plugin Name: Bitlet button in TinyMCE
Plugin URI: http://www.loixiyo.com
Description: Allows you to insert Bittorrent "direct downloads" thanks to Bitlet online client. Visit Bitlet homepage to learn more about this online Bittorrent client.
Author: loixiyo
Version: 1.0
Author URI: http://www.loixiyo.com
*/
function reemplaza ($content = '') {
	
	$patron =  '/\[bitlet=(.*?)\](.*)\[\/bitlet\]/';
	$reemplazo = '<script src="http://www.bitlet.org/javascripts/BitLet.js" type="text/javascript"></script>
<a href="http://www.bitlet.org?torrent=$1" onclick="return BitLet.openDownloadFromAnchor(this);">$2</a>';	

	return preg_replace($patron, $reemplazo, $content);
}
add_action('the_content', 'reemplaza');

function completar ($content = '') {	
		
	$patron = '/\<a (.*) href=\"http:\/\/www\.bitlet\.org\?torrent=/';
	$reemplazo = '<script src="http://www.bitlet.org/javascripts/BitLet.js" type="text/javascript"></script>
<a $1 href="http://www.bitlet.org?torrent=';	

	return preg_replace($patron, $reemplazo, $content);
}
add_action('the_content', 'completar');

function myplugin_addbuttons() {
   // Don't bother doing this stuff if the current user lacks permissions
   if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') )
     return;   
     add_filter('mce_external_plugins', 'add_myplugin_tinymce_plugin');
     add_filter('mce_buttons', 'register_myplugin_button');
 }
 
function register_myplugin_button($buttons) {
   array_push($buttons, 'separator', 'bitletbutton');
   return $buttons;
}
 
// Load the TinyMCE plugin : editor_plugin.js (wp2.5)
function add_myplugin_tinymce_plugin($plugin_array) {
   $js = get_bloginfo('wpurl') . '/wp-content/plugins/bitlet-plugin/editor_plugin.js';
   $plugin_array['bitletplugin'] = $js;
   return $plugin_array;
}
 
// init process for button control
add_action('init', 'myplugin_addbuttons');

?>