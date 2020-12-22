<?php
spl_autoload_register(function($class){
	//require_once "components_php/syncsystem-ns/" . $class . ".php";
	require_once "components_php/syncsystem-ns/" . str_replace("\\", "/", $class) . ".php";

	
	//Debug.
	//echo "class=<pre>";
	//var_dump($class);
	//echo "</pre><br />";
});
?>