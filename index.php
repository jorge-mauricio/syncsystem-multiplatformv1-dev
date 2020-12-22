<?php
//Files import.
declare(strict_types=1);

require_once "config-application.php";

//require_once "components_php/syncsystem-ns/autoload.php";
//require_once "components_php/functions-generic.php";
require_once "components_php/syncsystem-ns/functions-generic.php";
use SyncSystemNS\FunctionsGeneric; //Optional.



//Debug.
echo "configSiteTitle=" . $GLOBALS['configSiteTitle'] . "<br />";
echo "configSiteTitle=" . SyncSystemNS\FunctionsGeneric::appLabelsGet("", "") . "<br />";
echo "configSiteTitle (use)=" . FunctionsGeneric::appLabelsGet("", "") . "<br />";
?>