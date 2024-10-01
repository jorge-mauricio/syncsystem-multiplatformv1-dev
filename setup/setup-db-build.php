<?php

declare(strict_types=1);

// Error handling / displaying.
// ----------------------
// ini_set('display_errors', 1); // Show all errors.
//error_reporting(0); // Hide all errors.
// error_reporting(E_ALL); // alpshost
error_reporting(E_STRICT & ~E_STRICT); // Locaweb Linux 5.4 | HostGator Linux 5.5 | e 1 (windows)
//error_reporting(E_ALL | E_STRICT);
//error_reporting(error_reporting() & ~E_NOTICE);
// ----------------------

// Configuration files import.

// Laravel.
// $gSystemConfig = config('app.gSystemConfig'); // Imports directly from Laravel's configuration.
// $gSystemConfig = include(__DIR__ . '/../config-application.php'); // didn't work

// Other versions.
// TODO: condition with .env file.
// require_once __DIR__ . '/../config-application.php';

// DB connection file.
// require_once __DIR__ . '/../config-application-db.php'; // working (note: check if config-application-db.php is in place)
// require_once dirname(__DIR__) . '/config-application-db.php';


// Other versions.
// TODO: refactor (with GTP or Gimini) config-application.php to be set up as an array (more aligned with Node version).
// And later, create a script that transcribes the config-application.js to php.
// Note: seems that it was already refactored - update multiplatform code base with the updated versions - be careful with the language setup for laravel.
require_once __DIR__ . '/../config-application.php'; // TODO: integrate with $gSystemConfig to align with laravel and node

// Convert variables to array.
// $configApplicationVars = get_defined_vars();

// Approach without excluding global variables.
// foreach ($configApplicationVars as $key => $value) {
//     if ($key !== 'gSystemConfig' && $key !== 'configApplicationVars') {
//         $gSystemConfig[$key] = $value;
//     }
// }

// Approach excluding global variables.
// $excludeGlobalVars = array('_GET', '_POST', '_COOKIE', '_FILES', 'argv', 'argc', '_SERVER', '_ENV', '_SESSION', 'GLOBALS');
// $ExcludeConfigApplicationVars = array('gSystemConfig', 'configApplicationVars');
// $excludeVars = array_merge($globalVarsExclude, $configApplicationVarsExclude);

// foreach ($configApplicationVars as $key => $value) {
//     if (!in_array($key, $excludeVars)) {
//         $gSystemConfig[$key] = $value;
//     }
// }

// Debug.
// echo 'gSystemConfig=<pre>';
// var_dump($gSystemConfig);
// echo '</pre><br />';

require_once __DIR__ . '/../config-application-db.php'; // working (note: check if config-application-db.php is in place)


// Debug.
/**/
// echo 'dbSystemConPDO = <pre>';
// var_dump($gSystemConfig['dbSystemConPDO']);
// echo '</pre><br />';
// echo 'gSystemConfig = <pre>';
// var_dump($gSystemConfig);
// echo '</pre><br />';
// exit();
// die();

// Create data base (only works with localhost).
// ----------------------
/*
try {
    //$dbh = new PDO("mysql:host=$dbSystemHost", $root, $root_password);
    $dbSystemCreateConPDO = new PDO("mysql:host=$dbSystemHost", $dbSystemUser, $dbSystemPassword);


                                //CREATE USER '$user'@'localhost' IDENTIFIED BY '$pass';
                                //GRANT ALL ON `$db`.* TO '$user'@'localhost';
                                //FLUSH PRIVILEGES;

    $dbSystemCreateConPDO->exec("CREATE DATABASE `$dbSystemDataBase`;
                                GRANT ALL ON `$dbSystemDataBase`.* TO '$dbSystemUser'@'dbSystemHost';
                                FLUSH PRIVILEGES;")
    or die(print_r($dbSystemCreateConPDO->errorInfo(), true));

} catch (PDOException $DBSystemCreateErrorPDO) {
    die("DB Error: ". $DBSystemCreateErrorPDO->getMessage());
}
*/
// ----------------------

// Notes:
// **************************************************************************************
// Field types:
// http://www.mysqltutorial.org/mysql-data-types.aspx

// Function create table
// ref: https://stackoverflow.com/questions/12095285/php-pdo-mysql-query-create-table-if-not-exist
// **************************************************************************************

// TODO: use parameter for fresh install (drop all tables before creating).

// Table counter.
// **************************************************************************************
// Query.
// ----------------------
$strTableCounter = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableCounter'];
$strSQLTableCreateCounter = "";

$strSQLTableCreateCounter .= "CREATE TABLE IF NOT EXISTS `$strTableCounter` (";
$strSQLTableCreateCounter .= "`id` INT NOT NULL DEFAULT 0 COMMENT 'Counter index.', ";
$strSQLTableCreateCounter .= "`counter_global` BIGINT NOT NULL DEFAULT 0 COMMENT 'Counter.', ";
$strSQLTableCreateCounter .= "`description` LONGTEXT COMMENT 'General description.', ";
$strSQLTableCreateCounter .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateCounter .= "KEY `id` (`id`), ";
$strSQLTableCreateCounter .= "KEY `counter_global` (`counter_global`)";
$strSQLTableCreateCounter .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

//Insert default records.
// ----------------------
$strSQLTableCreateCounter .= "INSERT IGNORE INTO `$strTableCounter` (`id`, `counter_global`, `description`) VALUES (1, 100, 'Universal counter.');";
// TODO: Define the initial counter start value.
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateCounter = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateCounter);

if ($stmSQLTableCreateCounter !== false) {
    $stmSQLTableCreateCounter->execute();
    $stmSQLTableCreateCounter->closeCursor();

    echo "Table: " . $strTableCounter . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableCounter . " - Error." . "<br />";
}
// ----------------------

// Add default values.
// TODO:
// **************************************************************************************

// Table categories.
// **************************************************************************************
// Query.
// ----------------------
$strTableCategories = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableCategories'];
$strSQLTableCreateCategories = "";

$strSQLTableCreateCategories .= "CREATE TABLE IF NOT EXISTS `$strTableCategories` (";
$strSQLTableCreateCategories .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`category_type` INT NOT NULL DEFAULT 0 COMMENT '1 - content | 2 - products | 3/4/5/6 - publications | 7 - poll | 17 - quiz | 9 - segment | 10 - real estate | 11 - affiliation | 12 - forms | 13 - register | 19 - HR register | 15 - forum topics | 18 - vehicles | 20 - newsletter | 21 - cash flow | 22 - banners | 23 - classified | 24 - chat | 25 - avatars | 26 - pages | 27 - record bindings | 29 - processes | 63 - files | 80 - classes | 81 - modules | 82 - lessons', ";

// $strSQLTableCreateCategories .= "`date_creation` DATETIME NOT NULL, ";
$strSQLTableCreateCategories .= "`date_creation` DATETIME, ";
$strSQLTableCreateCategories .= "`date_timezone` VARCHAR(255), ";
// $strSQLTableCreateCategories .= "`date_edit` DATETIME NOT NULL, ";
$strSQLTableCreateCategories .= "`date_edit` DATETIME, ";

$strSQLTableCreateCategories .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableCategoriesBindRegister1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`id_register1` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesBindRegister2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`id_register2` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesBindRegister3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`id_register3` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesBindRegister4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`id_register4` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesBindRegister5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`id_register5` BIGINT NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateCategories .= "`title` LONGTEXT, ";
if ($gSystemConfig['enableCategoriesDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`description` LONGTEXT, ";
}

$strSQLTableCreateCategories .= "`url_alias` TEXT, ";
$strSQLTableCreateCategories .= "`keywords_tags` TEXT, ";
$strSQLTableCreateCategories .= "`meta_description` TEXT, ";
$strSQLTableCreateCategories .= "`meta_title` TEXT, ";
$strSQLTableCreateCategories .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if ($gSystemConfig['enableCategoriesInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info5` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info6` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info7` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info8` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info9` LONGTEXT, ";
}
if ($gSystemConfig['enableCategoriesInfo10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info10` LONGTEXT, ";
}

if ($gSystemConfig['enableCategoriesInfoS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info_small1` TEXT, ";
}
if ($gSystemConfig['enableCategoriesInfoS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info_small2` TEXT, ";
}
if ($gSystemConfig['enableCategoriesInfoS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info_small3` TEXT, ";
}
if ($gSystemConfig['enableCategoriesInfoS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info_small4` TEXT, ";
}
if ($gSystemConfig['enableCategoriesInfoS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`info_small5` TEXT, ";
}

if ($gSystemConfig['enableCategoriesNumber1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumber2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumber3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumber4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumber5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableCategoriesNumberS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumberS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumberS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumberS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesNumberS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableCategoriesDate1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`date1` DATETIME, ";
}
if ($gSystemConfig['enableCategoriesDate2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`date2` DATETIME, ";
}
if ($gSystemConfig['enableCategoriesDate3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`date3` DATETIME, ";
}
if ($gSystemConfig['enableCategoriesDate4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`date4` DATETIME, ";
}
if ($gSystemConfig['enableCategoriesDate5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`date5` DATETIME, ";
}

$strSQLTableCreateCategories .= "`id_item1` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item2` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item3` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item4` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item5` BIGINT NOT NULL DEFAULT 0, ";

if ($gSystemConfig['enableCategoriesImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`image_main` TEXT, ";
}

if ($gSystemConfig['enableCategoriesFile1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`file1` TEXT, ";
}
if ($gSystemConfig['enableCategoriesFile2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`file2` TEXT, ";
}
if ($gSystemConfig['enableCategoriesFile3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`file3` TEXT, ";
}
if ($gSystemConfig['enableCategoriesFile4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`file4` TEXT, ";
}
if ($gSystemConfig['enableCategoriesFile5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`file5` TEXT, ";
}

$strSQLTableCreateCategories .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableCategoriesActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableCategoriesActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateCategories .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateCategories .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`restricted_access` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`notes` LONGTEXT, ";
$strSQLTableCreateCategories .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateCategories .= "KEY `id` (`id`), ";
$strSQLTableCreateCategories .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateCategories .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// echo "strSQLTableCreateCategories = " . $strSQLTableCreateCategories . "<br />";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateCategories = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateCategories);

if ($stmSQLTableCreateCategories !== false) {
    $stmSQLTableCreateCategories->execute();
    $stmSQLTableCreateCategories->closeCursor();

    echo "Table: " . $strTableCategories . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableCategories . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table files.
// **************************************************************************************
// Query.
// ----------------------
$strTableFiles = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableFiles'];
$strSQLTableCreateFiles = "";

$strSQLTableCreateFiles .= "CREATE TABLE IF NOT EXISTS `$strTableFiles` (";
$strSQLTableCreateFiles .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiles .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiles .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiles .= "`file_type` INT NOT NULL DEFAULT 0 COMMENT '1 - image | 2 - video | 3 - file | 4 - zip file', ";
$strSQLTableCreateFiles .= "`file_config` INT NOT NULL DEFAULT 0 COMMENT '1 - link pop-up | 2 - open directly | 3 - download link | 4 - media link', ";

$strSQLTableCreateFiles .= "`date_creation` DATETIME, ";
$strSQLTableCreateFiles .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateFiles .= "`date_edit` DATETIME, ";

if ($gSystemConfig['enableFilesTitle'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`title` TEXT, ";
}
$strSQLTableCreateFiles .= "`caption` TEXT, ";
if ($gSystemConfig['enableFilesDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`description` LONGTEXT, ";
}
if ($gSystemConfig['enableFilesHTMLCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`html_code` LONGTEXT, ";
}

$strSQLTableCreateFiles .= "`url_alias` TEXT, ";
$strSQLTableCreateFiles .= "`keywords_tags` TEXT, ";
$strSQLTableCreateFiles .= "`meta_description` TEXT, ";
$strSQLTableCreateFiles .= "`meta_title` TEXT, ";
$strSQLTableCreateFiles .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if ($gSystemConfig['enableFilesInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enableFilesInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enableFilesInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enableFilesInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enableFilesInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info5` LONGTEXT, ";
}

if ($gSystemConfig['enableFilesInfoS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info_small1` TEXT, ";
}
if ($gSystemConfig['enableFilesInfoS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info_small2` TEXT, ";
}
if ($gSystemConfig['enableFilesInfoS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info_small3` TEXT, ";
}
if ($gSystemConfig['enableFilesInfoS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info_small4` TEXT, ";
}
if ($gSystemConfig['enableFilesInfoS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`info_small5` TEXT, ";
}

if ($gSystemConfig['enableFilesNumber1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumber2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumber3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumber4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumber5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableFilesNumberS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumberS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumberS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumberS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesNumberS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableFilesDate1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`date1` DATETIME, ";
}
if ($gSystemConfig['enableFilesDate2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`date2` DATETIME, ";
}
if ($gSystemConfig['enableFilesDate3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`date3` DATETIME, ";
}
if ($gSystemConfig['enableFilesDate4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`date4` DATETIME, ";
}
if ($gSystemConfig['enableFilesDate5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`date5` DATETIME, ";
}

$strSQLTableCreateFiles .= "`file` TEXT, ";
$strSQLTableCreateFiles .= "`file_size` TEXT, ";
$strSQLTableCreateFiles .= "`file_duration` TEXT, ";
$strSQLTableCreateFiles .= "`file_dimensions` TEXT, ";
$strSQLTableCreateFiles .= "`file_original_name` TEXT, ";
if ($gSystemConfig['enableFilesThumbnails'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`file_thumbnail` TEXT COMMENT 'Thumbnails for video files.', ";
}
if ($gSystemConfig['enableFilesFile1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`file1` TEXT, ";
}
if ($gSystemConfig['enableFilesFile2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`file2` TEXT, ";
}
if ($gSystemConfig['enableFilesFile3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`file3` TEXT, ";
}
if ($gSystemConfig['enableFilesFile4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`file4` TEXT, ";
}
if ($gSystemConfig['enableFilesFile5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`file5` TEXT, ";
}

$strSQLTableCreateFiles .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableFilesActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFilesActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiles .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateFiles .= "`notes` LONGTEXT, ";
$strSQLTableCreateFiles .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFiles .= "KEY `id` (`id`), ";
$strSQLTableCreateFiles .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateFiles .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";

// Statement and parameters.
// ----------------------
$stmSQLTableCreateFiles = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateFiles);

if ($stmSQLTableCreateFiles !== false) {
    $stmSQLTableCreateFiles->execute();
    $stmSQLTableCreateFiles->closeCursor();

    echo "Table: " . $strTableFiles . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableFiles . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table content.
// **************************************************************************************
// Query.
// ----------------------
$strTableContent = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableContent'];
$strSQLTableCreateContent = "";

$strSQLTableCreateContent .= "CREATE TABLE IF NOT EXISTS `$strTableContent` (";
$strSQLTableCreateContent .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateContent .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateContent .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

$strSQLTableCreateContent .= "`date_creation` DATETIME, ";
$strSQLTableCreateContent .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateContent .= "`date_edit` DATETIME, ";

if ($gSystemConfig['enableContentBindRegisterUser'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateContent .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateContent .= "`content_type` INT NOT NULL DEFAULT 0 COMMENT '1 - header title | 2 - subheader title | 3 - content text | 4 - tab | 5 - image | 6 - video | 7 - html/table | 8 - files (pdf / word / power point / excell/zip) | 9 - newsletter art | 10 - columns | 11 - swf | 103 - publications', ";
if ($gSystemConfig['enableContentColumns'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateContent .= "`content_columns` INT NOT NULL DEFAULT 0 COMMENT 'Number of columns for a content block.', ";
}
$strSQLTableCreateContent .= "`align_text` INT NOT NULL DEFAULT 0 COMMENT '1 - right | 2 - centered | 3 - left | 4 - justified', ";
$strSQLTableCreateContent .= "`align_image` INT NOT NULL DEFAULT 0 COMMENT '1 - right | 2 - centered | 3 - left | 4 - justified', ";

$strSQLTableCreateContent .= "`content_text` LONGTEXT, ";
if ($gSystemConfig['enableContentURL'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateContent .= "`content_url` TEXT, ";
}
$strSQLTableCreateContent .= "`caption` TEXT, ";

$strSQLTableCreateContent .= "`file` TEXT, ";
$strSQLTableCreateContent .= "`file_size` TEXT, ";
$strSQLTableCreateContent .= "`file_duration` TEXT, ";
$strSQLTableCreateContent .= "`file_dimensions` TEXT, ";
$strSQLTableCreateContent .= "`file_original_name` TEXT, ";
$strSQLTableCreateContent .= "`file_config` INT NOT NULL DEFAULT 0 COMMENT '1 - link pop-up | 2 - open directly | 3 - download link | 4 - media link', ";
if ($gSystemConfig['enableContentFileThumbnail'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateContent .= "`file_thumbnail` TEXT COMMENT 'Thumbnails for video files.', ";
}
$strSQLTableCreateContent .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";

$strSQLTableCreateContent .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateContent .= "KEY `id` (`id`), ";
$strSQLTableCreateContent .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateContent .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";

// Statement and parameters.
// ----------------------
$stmSQLTableCreateContent = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateContent);

if ($stmSQLTableCreateContent !== false) {
    $stmSQLTableCreateContent->execute();
    $stmSQLTableCreateContent->closeCursor();

    echo "Table: " . $strTableContent . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableContent . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table products.
// **************************************************************************************
// Query.
// ----------------------
$strTableProducts = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableProducts'];
$strSQLTableCreateProducts = "";

$strSQLTableCreateProducts .= "CREATE TABLE IF NOT EXISTS `$strTableProducts` (";
$strSQLTableCreateProducts .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

if ($gSystemConfig['enableProductsType'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`id_type` BIGINT NOT NULL DEFAULT 0, ";
}

// $strSQLTableCreateProducts .= "`date_creation` DATETIME NOT NULL, ";
$strSQLTableCreateProducts .= "`date_creation` DATETIME, ";
// $strSQLTableCreateProducts .= "`date_timezone` VARCHAR(255), ";
// $strSQLTableCreateProducts .= "`date_edit` DATETIME NOT NULL, ";
$strSQLTableCreateProducts .= "`date_edit` DATETIME, ";

if ($gSystemConfig['enableProductsBindRegisterUser'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsBindRegister1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`id_register1` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsBindRegister2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`id_register2` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsBindRegister3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`id_register3` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsBindRegister4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`id_register4` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsBindRegister5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`id_register5` BIGINT NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableProductsCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`code` TEXT, ";
}

$strSQLTableCreateProducts .= "`title` LONGTEXT, ";
if ($gSystemConfig['enableProductsDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`description` LONGTEXT, ";
}

$strSQLTableCreateProducts .= "`url_alias` TEXT, ";
$strSQLTableCreateProducts .= "`keywords_tags` TEXT, ";
$strSQLTableCreateProducts .= "`meta_description` TEXT, ";
$strSQLTableCreateProducts .= "`meta_title` TEXT, ";
$strSQLTableCreateProducts .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if ($gSystemConfig['enableProductsInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info5` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info6` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info7` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info8` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info9` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info10` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo11'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info11` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo12'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info12` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo13'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info13` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo14'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info14` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo15'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info15` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo16'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info16` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo17'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info17` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo18'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info18` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo19'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info19` LONGTEXT, ";
}
if ($gSystemConfig['enableProductsInfo20'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info20` LONGTEXT, ";
}

if ($gSystemConfig['enableProductsInfoS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small1` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small2` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small3` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small4` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small5` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small6` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small7` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small8` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small9` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small10` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS11'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small11` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS12'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small12` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS13'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small13` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS14'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small14` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS15'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small15` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS16'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small16` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS17'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small17` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS18'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small18` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS19'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small19` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS20'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small20` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS21'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small21` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS22'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small22` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS23'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small23` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS24'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small24` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS25'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small25` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS26'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small26` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS27'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small27` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS28'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small28` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS29'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small29` TEXT, ";
}
if ($gSystemConfig['enableProductsInfoS30'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`info_small30` TEXT, ";
}

if ($gSystemConfig['enableProductsValue'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`value` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsValue1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`value1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsValue2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`value2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableProductsWeight'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`weight` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsCoefficient'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`coefficient` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableProductsNumber1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumber2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumber3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumber4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumber5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableProductsNumberS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumberS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumberS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumberS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNumberS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableProductsURL1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`url1` TEXT, ";
}
if ($gSystemConfig['enableProductsURL2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`url2` TEXT, ";
}
if ($gSystemConfig['enableProductsURL3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`url3` TEXT, ";
}
if ($gSystemConfig['enableProductsURL4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`url4` TEXT, ";
}
if ($gSystemConfig['enableProductsURL5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`url5` TEXT, ";
}

if ($gSystemConfig['enableProductsDate1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`date1` DATETIME, ";
}
if ($gSystemConfig['enableProductsDate2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`date2` DATETIME, ";
}
if ($gSystemConfig['enableProductsDate3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`date3` DATETIME, ";
}
if ($gSystemConfig['enableProductsDate4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`date4` DATETIME, ";
}
if ($gSystemConfig['enableProductsDate5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`date5` DATETIME, ";
}

$strSQLTableCreateProducts .= "`id_item1` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item2` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item3` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item4` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item5` BIGINT NOT NULL DEFAULT 0, ";

if ($gSystemConfig['enableProductsImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`image_main` TEXT, ";
}
if ($gSystemConfig['enableProductsImageMainCaption'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`image_main_caption` TEXT, ";
}

if ($gSystemConfig['enableProductsFile1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`file1` TEXT, ";
}
if ($gSystemConfig['enableProductsFile2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`file2` TEXT, ";
}
if ($gSystemConfig['enableProductsFile3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`file3` TEXT, ";
}
if ($gSystemConfig['enableProductsFile4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`file4` TEXT, ";
}
if ($gSystemConfig['enableProductsFile5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`file5` TEXT, ";
}

$strSQLTableCreateProducts .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableProductsActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

//if ($gSystemConfig['enableProductsStatus'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0)
//{
    $strSQLTableCreateProducts .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
//}
if ($gSystemConfig['enableProductsRestrictedAccess'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`restricted_access` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableProductsNotes'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateProducts .= "`notes` LONGTEXT, ";
}
$strSQLTableCreateProducts .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateProducts .= "KEY `id` (`id`), ";
$strSQLTableCreateProducts .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateProducts .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// echo "strSQLTableCreateProducts = " . $strSQLTableCreateProducts . "<br />";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateProducts = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateProducts);

if ($stmSQLTableCreateProducts !== false) {
    $stmSQLTableCreateProducts->execute();
    $stmSQLTableCreateProducts->closeCursor();

    echo "Table: " . $strTableProducts . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableProducts . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table publications.
// **************************************************************************************
// Query.
// ----------------------
$strTablePublications = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTablePublications'];
$strSQLTableCreatePublications = "";

$strSQLTableCreatePublications .= "CREATE TABLE IF NOT EXISTS `$strTablePublications` (";
$strSQLTableCreatePublications .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreatePublications .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreatePublications .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreatePublications .= "`id_type` BIGINT NOT NULL DEFAULT 0 COMMENT '1 - news | 2 - photo gallery  | 3 - articles | 4 - publications', ";
// $strSQLTableCreatePublications .= "`date_creation` DATETIME NOT NULL, ";
$strSQLTableCreatePublications .= "`date_creation` DATETIME, ";
// $strSQLTableCreatePublications .= "`date_timezone` VARCHAR(255), ";
// $strSQLTableCreatePublications .= "`date_edit` DATETIME NOT NULL, ";
$strSQLTableCreatePublications .= "`date_edit` DATETIME, ";
if ($gSystemConfig['enablePublicationsBindRegisterUser'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsBindRegister1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`id_register1` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsBindRegister2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`id_register2` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsBindRegister3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`id_register3` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsBindRegister4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`id_register4` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsBindRegister5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`id_register5` BIGINT NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enablePublicationsDateStart'] != 0 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`date_start` DATETIME, ";
}
if ($gSystemConfig['enablePublicationsDateEnd'] != 0 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`date_end` DATETIME, ";
}

$strSQLTableCreatePublications .= "`title` LONGTEXT, ";

if ($gSystemConfig['enablePublicationsDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`description` LONGTEXT, ";
}

$strSQLTableCreatePublications .= "`url_alias` TEXT, ";
$strSQLTableCreatePublications .= "`keywords_tags` TEXT, ";
$strSQLTableCreatePublications .= "`meta_description` TEXT, ";
$strSQLTableCreatePublications .= "`meta_title` TEXT, ";
$strSQLTableCreatePublications .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if ($gSystemConfig['enablePublicationsSource'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`source` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsSourceURL'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`source_url` LONGTEXT, ";
}

if ($gSystemConfig['enablePublicationsInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info5` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info6` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info7` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info8` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info9` LONGTEXT, ";
}
if ($gSystemConfig['enablePublicationsInfo10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`info10` LONGTEXT, ";
}

if ($gSystemConfig['enablePublicationsNumber1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsNumber2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsNumber3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsNumber4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsNumber5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enablePublicationsURL1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`url1` TEXT, ";
}
if ($gSystemConfig['enablePublicationsURL2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`url2` TEXT, ";
}
if ($gSystemConfig['enablePublicationsURL3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`url3` TEXT, ";
}
if ($gSystemConfig['enablePublicationsURL4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`url4` TEXT, ";
}
if ($gSystemConfig['enablePublicationsURL5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`url5` TEXT, ";
}

if ($gSystemConfig['enablePublicationsDate1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`date1` DATETIME, ";
}
if ($gSystemConfig['enablePublicationsDate2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`date2` DATETIME, ";
}
if ($gSystemConfig['enablePublicationsDate3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`date3` DATETIME, ";
}
if ($gSystemConfig['enablePublicationsDate4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`date4` DATETIME, ";
}
if ($gSystemConfig['enablePublicationsDate5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`date5` DATETIME, ";
}

if ($gSystemConfig['enablePublicationsImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`image_main` TEXT, ";
}
if ($gSystemConfig['enablePublicationsImageMainCaption'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`image_main_caption` TEXT, ";
}

if ($gSystemConfig['enablePublicationsFile1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`file1` TEXT, ";
}
if ($gSystemConfig['enablePublicationsFile2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`file2` TEXT, ";
}
if ($gSystemConfig['enablePublicationsFile3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`file3` TEXT, ";
}
if ($gSystemConfig['enablePublicationsFile4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`file4` TEXT, ";
}
if ($gSystemConfig['enablePublicationsFile5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`file5` TEXT, ";
}

$strSQLTableCreatePublications .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enablePublicationsActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

//if ($gSystemConfig['enablePublicationsStatus'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0)
//{
    $strSQLTableCreatePublications .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
//}
if ($gSystemConfig['enablePublicationsRestrictedAccess'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`restricted_access` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enablePublicationsNotes'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreatePublications .= "`notes` LONGTEXT, ";
}
$strSQLTableCreatePublications .= "PRIMARY KEY (`id`), ";
$strSQLTableCreatePublications .= "KEY `id` (`id`), ";
$strSQLTableCreatePublications .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreatePublications .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
/**/
// echo "strSQLTableCreatePublications = " . $strSQLTableCreatePublications . "<br />";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreatePublications = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreatePublications);

if ($stmSQLTableCreatePublications !== false) {
    $stmSQLTableCreatePublications->execute();
    $stmSQLTableCreatePublications->closeCursor();

    echo "Table: " . $strTablePublications . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTablePublications . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table registers.
// **************************************************************************************
// Query.
// ----------------------
$strTableRegisters = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableRegisters'];
$strSQLTableCreateRegisters = "";

$strSQLTableCreateRegisters .= "CREATE TABLE IF NOT EXISTS `$strTableRegisters` (";
$strSQLTableCreateRegisters .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateRegisters .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateRegisters .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

// $strSQLTableCreateRegisters .= "`date_creation` DATETIME NOT NULL, ";
$strSQLTableCreateRegisters .= "`date_creation` DATETIME, ";
$strSQLTableCreateRegisters .= "`date_timezone` VARCHAR(255), ";
// $strSQLTableCreateRegisters .= "`date_edit` DATETIME NOT NULL, ";
$strSQLTableCreateRegisters .= "`date_edit` DATETIME, ";

//if ($gSystemConfig['enableRegistersType'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0)
//{
    $strSQLTableCreateRegisters .= "`id_type` BIGINT NOT NULL DEFAULT 0, ";
//}
if ($gSystemConfig['enableRegistersActivity'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_activity` BIGINT NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableRegistersBindRegisterUser'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersBindRegister1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_register1` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersBindRegister2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_register2` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersBindRegister3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_register3` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersBindRegister4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_register4` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersBindRegister5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_register5` BIGINT NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableRegistersRegisterType'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`register_type` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '1 - physical person | 2 - company', ";
}

if ($gSystemConfig['enableRegistersNameTitle'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`name_title` TEXT, ";
}
if ($gSystemConfig['enableRegistersNameFull'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`name_full` TEXT, ";
}
if ($gSystemConfig['enableRegistersNameFirst'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`name_first` TEXT, ";
}
if ($gSystemConfig['enableRegistersNameLast'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`name_last` TEXT, ";
}

if ($gSystemConfig['enableRegistersCompanyNameLegal'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`company_name_legal` TEXT, ";
}
if ($gSystemConfig['enableRegistersCompanyNameAlias'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`company_name_alias` TEXT, ";
}

if ($gSystemConfig['enableRegistersDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`description` LONGTEXT, ";
}

$strSQLTableCreateRegisters .= "`url_alias` TEXT, ";
$strSQLTableCreateRegisters .= "`keywords_tags` TEXT, ";
$strSQLTableCreateRegisters .= "`meta_description` TEXT, ";
$strSQLTableCreateRegisters .= "`meta_title` TEXT, ";
$strSQLTableCreateRegisters .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if ($gSystemConfig['enableRegistersDateBirth'] != 0 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date_birth` DATETIME, ";
}
if ($gSystemConfig['enableUsersGender'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`gender` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - not specified | 1 - male | 2 - female', ";
}
if ($gSystemConfig['enableRegistersHeight'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    // $strSQLTableCreateRegisters .= "`height` INT(20) NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`height` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersWeight'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    // $strSQLTableCreateRegisters .= "`weight` INT(20) NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`weight` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableRegistersDocumentType'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document_type` INT NOT NULL DEFAULT 0 COMMENT '1 - social security (USA) | 55 - cpf (BRA)', ";
}
if ($gSystemConfig['enableRegistersDocument'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document` TEXT, ";
}
if ($gSystemConfig['enableRegistersDocument1Type'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document1_type` INT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersDocument1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document1` TEXT, ";
}
if ($gSystemConfig['enableRegistersDocument2Type'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document2_type` INT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersDocument2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document2` TEXT, ";
}

if ($gSystemConfig['enableRegistersDocumentCompanyType'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document_company_type` INT NOT NULL DEFAULT 0 COMMENT '1 - federal register (USA) | 55 - cnpj (BRA)', ";
}
if ($gSystemConfig['enableRegistersDocumentCompany'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document_company` TEXT, ";
}
if ($gSystemConfig['enableRegistersDocumentCompany2Type'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document_company1_type` INT NOT NULL DEFAULT 0 COMMENT '1 - county register (USA) | 55 - municipal register (BRA)', ";
}
if ($gSystemConfig['enableRegistersDocumentCompany2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document_company1` TEXT, ";
}
if ($gSystemConfig['enableRegistersDocumentCompany2Type'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document_company2_type` INT NOT NULL DEFAULT 0 COMMENT '1 - state register (USA) | 55 - state register (BRA)', ";
}
if ($gSystemConfig['enableRegistersDocumentCompany2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`document_company2` TEXT, ";
}

if ($gSystemConfig['enableRegistersZIPCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`zip_code` TEXT, ";
}
if ($gSystemConfig['enableRegistersAddressStreet'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`address_street` TEXT, ";
}
if ($gSystemConfig['enableRegistersAddressNumber'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`address_number` TEXT, ";
}
if ($gSystemConfig['enableRegistersAddressComplement'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`address_complement` TEXT, ";
}
if ($gSystemConfig['enableRegistersNeighborhood'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`neighborhood` TEXT, ";
}
if ($gSystemConfig['enableRegistersDistrict'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`district` TEXT, ";
}
if ($gSystemConfig['enableRegistersCounty'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`county` TEXT, ";
}
if ($gSystemConfig['enableRegistersCity'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`city` TEXT, ";
}
if ($gSystemConfig['enableRegistersState'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`state` TEXT, ";
}
if ($gSystemConfig['enableRegistersCountry'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`country` TEXT, ";
}

if ($gSystemConfig['enableRegistersAddressConfig'] != 0 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`id_street` BIGINT NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`id_neighborhood` BIGINT NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`id_district` BIGINT NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`id_county` BIGINT NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`id_city` BIGINT NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`id_state` BIGINT NOT NULL DEFAULT 0, ";
    $strSQLTableCreateRegisters .= "`id_country` BIGINT NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableRegistersLocationReference'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`location_reference` TEXT, ";
}
if ($gSystemConfig['enableRegistersLocationMap'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`location_map` TEXT, ";
}

if ($gSystemConfig['enableRegistersPhone1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    if ($gSystemConfig['enableRegistersPhoneInternationalCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
        $strSQLTableCreateRegisters .= "`phone1_international_code` TEXT, ";
    }
    $strSQLTableCreateRegisters .= "`phone1_area_code` TEXT, ";
    $strSQLTableCreateRegisters .= "`phone1` TEXT, ";
}

if ($gSystemConfig['enableRegistersPhone2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    if ($gSystemConfig['enableRegistersPhoneInternationalCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
        $strSQLTableCreateRegisters .= "`phone2_international_code` TEXT, ";
    }
    $strSQLTableCreateRegisters .= "`phone2_area_code` TEXT, ";
    $strSQLTableCreateRegisters .= "`phone2` TEXT, ";
}

if ($gSystemConfig['enableRegistersPhone3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    if ($gSystemConfig['enableRegistersPhoneInternationalCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
        $strSQLTableCreateRegisters .= "`phone3_international_code` TEXT, ";
    }
    $strSQLTableCreateRegisters .= "`phone3_area_code` TEXT, ";
    $strSQLTableCreateRegisters .= "`phone3` TEXT, ";
}

if ($gSystemConfig['enableRegistersWebsite'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`website` TEXT, ";
}

if ($gSystemConfig['enableRegistersUsername'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`username` TEXT, ";
}
if ($gSystemConfig['enableRegistersEmail'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`email` TEXT, ";
}
if ($gSystemConfig['configRegistersPassword'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`password` LONGTEXT, ";
    $strSQLTableCreateRegisters .= "`password_hint` TEXT, ";
    $strSQLTableCreateRegisters .= "`password_length` TEXT, ";
}

if ($gSystemConfig['enableRegistersInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info5` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info6` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info7` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info8` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info9` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info10` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo11'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info11` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo12'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info12` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo13'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info13` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo14'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info14` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo15'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info15` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo16'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info16` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo17'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info17` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo18'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info18` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo19'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info19` LONGTEXT, ";
}
if ($gSystemConfig['enableRegistersInfo20'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info20` LONGTEXT, ";
}

if ($gSystemConfig['enableRegistersInfoS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small1` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small2` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small3` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small4` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small5` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small6` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small7` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small8` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small9` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small10` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS11'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small11` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS12'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small12` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS13'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small13` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS14'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small14` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS15'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small15` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS16'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small16` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS17'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small17` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS18'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small18` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS19'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small19` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS20'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small20` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS21'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small21` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS22'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small22` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS23'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small23` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS24'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small24` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS25'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small25` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS26'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small26` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS27'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small27` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS28'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small28` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS29'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small29` TEXT, ";
}
if ($gSystemConfig['enableRegistersInfoS30'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`info_small30` TEXT, ";
}

if ($gSystemConfig['enableRegistersNumber1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumber2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumber3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumber4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumber5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableRegistersNumberS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumberS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumberS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumberS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNumberS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableRegistersURL1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`url1` TEXT, ";
}
if ($gSystemConfig['enableRegistersURL2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`url2` TEXT, ";
}
if ($gSystemConfig['enableRegistersURL3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`url3` TEXT, ";
}
if ($gSystemConfig['enableRegistersURL4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`url4` TEXT, ";
}
if ($gSystemConfig['enableRegistersURL5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`url5` TEXT, ";
}

if ($gSystemConfig['enableRegistersDate1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date1` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date2` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date3` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date4` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date5` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date6` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date7` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date8` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date9` DATETIME, ";
}
if ($gSystemConfig['enableRegistersDate10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`date10` DATETIME, ";
}

if ($gSystemConfig['enableRegistersImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`image_main` TEXT, ";
}
if ($gSystemConfig['enableRegistersImageMainCaption'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`image_main_caption` TEXT, ";
}
if ($gSystemConfig['enableRegistersImageLogo'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`image_logo` TEXT, ";
}
if ($gSystemConfig['enableRegistersImageBanner'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`image_banner` TEXT, ";
}

if ($gSystemConfig['enableRegistersFile1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`file1` TEXT, ";
}
if ($gSystemConfig['enableRegistersFile2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`file2` TEXT, ";
}
if ($gSystemConfig['enableRegistersFile3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`file3` TEXT, ";
}
if ($gSystemConfig['enableRegistersFile4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`file4` TEXT, ";
}
if ($gSystemConfig['enableRegistersFile5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`file5` TEXT, ";
}

$strSQLTableCreateRegisters .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableRegistersActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

//if ($gSystemConfig['enableRegistersStatus'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0)
//{
    $strSQLTableCreateRegisters .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
//}
if ($gSystemConfig['enableRegistersRestrictedAccess'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`restricted_access` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableRegistersNotes'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateRegisters .= "`notes` LONGTEXT, ";
}
$strSQLTableCreateRegisters .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateRegisters .= "KEY `id` (`id`), ";
$strSQLTableCreateRegisters .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateRegisters .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// echo "strSQLTableCreateRegisters = " . $strSQLTableCreateRegisters . "<br />";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateRegisters = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateRegisters);

if ($stmSQLTableCreateRegisters !== false) {
    $stmSQLTableCreateRegisters->execute();
    $stmSQLTableCreateRegisters->closeCursor();

    echo "Table: " . $strTableRegisters . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableRegisters . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table quizzes.
// **************************************************************************************
// Query.
// ----------------------
$strTableQuizzes = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableQuizzes'];
$strSQLTableCreateQuizzes = "";

$strSQLTableCreateQuizzes .= "CREATE TABLE IF NOT EXISTS `$strTableQuizzes` (";
$strSQLTableCreateQuizzes .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzes .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzes .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzes .= "`date_creation` DATETIME, ";
// $strSQLTableCreateQuizzes .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateQuizzes .= "`date_edit` DATETIME, ";
$strSQLTableCreateQuizzes .= "`id_type` INT NOT NULL DEFAULT 0 COMMENT '1 - poll | 2 - quiz (multiple questions)  | 3 - (written template answer)', ";

if ($gSystemConfig['enableQuizzesBindRegisterUser'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateQuizzes .= "`title` TEXT, ";
if ($gSystemConfig['enableQuizzesDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`description` LONGTEXT, ";
}

$strSQLTableCreateQuizzes .= "`url_alias` TEXT, ";
$strSQLTableCreateQuizzes .= "`keywords_tags` TEXT, ";
$strSQLTableCreateQuizzes .= "`meta_description` TEXT, ";
$strSQLTableCreateQuizzes .= "`meta_title` TEXT, ";
$strSQLTableCreateQuizzes .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if ($gSystemConfig['enableQuizzesInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`info5` LONGTEXT, ";
}

if ($gSystemConfig['enableQuizzesNumber1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesNumber2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesNumber3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesNumber4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesNumber5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableQuizzesImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`image_main` TEXT, ";
}
if ($gSystemConfig['enableQuizzesImageMainCaption'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`image_main_caption` TEXT, ";
}

$strSQLTableCreateQuizzes .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableQuizzesActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzes .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

//if ($gSystemConfig['enableQuizzesStatus'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0)
//{
    $strSQLTableCreateQuizzes .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
//}
$strSQLTableCreateQuizzes .= "`id_quizzes_options_answer` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzes .= "`notes` LONGTEXT, ";
$strSQLTableCreateQuizzes .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateQuizzes .= "KEY `id` (`id`), ";
$strSQLTableCreateQuizzes .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateQuizzes .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateQuizzes = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateQuizzes);

if ($stmSQLTableCreateQuizzes !== false) {
    $stmSQLTableCreateQuizzes->execute();
    $stmSQLTableCreateQuizzes->closeCursor();

    echo "Table: " . $strTableQuizzes . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableQuizzes . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table quizzes_options.
// **************************************************************************************
// Query.
// ----------------------
$strTableQuizzesOptions = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableQuizzesOptions'];
$strSQLTableCreateQuizzesOptions = "";

$strSQLTableCreateQuizzesOptions .= "CREATE TABLE IF NOT EXISTS `$strTableQuizzesOptions` (";
$strSQLTableCreateQuizzesOptions .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesOptions .= "`id_quizzes` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesOptions .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesOptions .= "`date_creation` DATETIME, ";
// $strSQLTableCreateQuizzesOptions .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateQuizzesOptions .= "`date_edit` DATETIME, ";

$strSQLTableCreateQuizzesOptions .= "`title` TEXT, ";
//if ($gSystemConfig['enableQuizzesOptionsDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0)
//{
    // $strSQLTableCreateQuizzesOptions .= "`description` LONGTEXT, ";
//}

if ($gSystemConfig['enableQuizzesOptionsInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesOptionsInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesOptionsInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesOptionsInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enableQuizzesOptionsInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`info5` LONGTEXT, ";
}

if ($gSystemConfig['enableQuizzesOptionsNumber1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesOptionsNumber2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesOptionsNumber3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesOptionsNumber4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableQuizzesOptionsNumber5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableQuizzesOptionsImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateQuizzesOptions .= "`image_main` TEXT, ";
}
//if ($gSystemConfig['enableQuizzesOptionsImageMainCaption'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0)
//{
    // $strSQLTableCreateQuizzesOptions .= "`image_main_caption` TEXT, ";
//}

$strSQLTableCreateQuizzesOptions .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesOptions .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateQuizzesOptions .= "KEY `id` (`id`), ";
$strSQLTableCreateQuizzesOptions .= "KEY `id_quizzes` (`id_quizzes`)";
$strSQLTableCreateQuizzesOptions .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateQuizzesOptions = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateQuizzesOptions);

if ($stmSQLTableCreateQuizzesOptions !== false) {
    $stmSQLTableCreateQuizzesOptions->execute();
    $stmSQLTableCreateQuizzesOptions->closeCursor();

    echo "Table: " . $strTableQuizzesOptions . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableQuizzesOptions . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table quizzes_log.
// **************************************************************************************
// Query.
// ----------------------
$strTableQuizzesLog = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableQuizzesLog'];
$strSQLTableCreateQuizzesLog = "";

$strSQLTableCreateQuizzesLog .= "CREATE TABLE IF NOT EXISTS `$strTableQuizzesLog` (";
$strSQLTableCreateQuizzesLog .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesLog .= "`id_quizzes` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesLog .= "`id_quizzes_options` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesLog .= "`id_register` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesLog .= "`id_quizzes_options_answer` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateQuizzesLog .= "`date_creation` DATETIME, ";
$strSQLTableCreateQuizzesLog .= "`notes` LONGTEXT, ";
$strSQLTableCreateQuizzesLog .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateQuizzesLog .= "KEY `id` (`id`), ";
$strSQLTableCreateQuizzesLog .= "KEY `id_quizzes` (`id_quizzes`), ";
$strSQLTableCreateQuizzesLog .= "KEY `id_quizzes_options` (`id_quizzes_options`), ";
$strSQLTableCreateQuizzesLog .= "KEY `id_register` (`id_register`)";
$strSQLTableCreateQuizzesLog .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateQuizzesLog = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateQuizzesLog);

if ($stmSQLTableCreateQuizzesLog !== false) {
    $stmSQLTableCreateQuizzesLog->execute();
    $stmSQLTableCreateQuizzesLog->closeCursor();

    echo "Table: " . $strTableQuizzesLog . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableQuizzesLog . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table forms.
// **************************************************************************************
// Query.
// ----------------------
$strTableForms = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableForms'];
$strSQLTableCreateForms = "";

$strSQLTableCreateForms .= "CREATE TABLE IF NOT EXISTS `$strTableForms` (";
$strSQLTableCreateForms .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`date_creation` DATETIME, ";
$strSQLTableCreateForms .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateForms .= "`date_edit` DATETIME, ";

if ($gSystemConfig['enableFormsBindRegisterUser'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateForms .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateForms .= "`form_title` TEXT, ";
$strSQLTableCreateForms .= "`form_subject` TEXT, ";
$strSQLTableCreateForms .= "`recipient_name` TEXT, ";
$strSQLTableCreateForms .= "`recipient_email` TEXT, ";
if ($gSystemConfig['enableFormsRecipientEmailCopy'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateForms .= "`recipient_email_copy` LONGTEXT, ";
}

if ($gSystemConfig['enableFormsSender'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateForms .= "`sender_name` TEXT, ";
    $strSQLTableCreateForms .= "`sender_email` TEXT, ";
}
if ($gSystemConfig['enableFormsSenderConfig'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateForms .= "`sender_config` LONGTEXT COMMENT 'json', ";
}

if ($gSystemConfig['enableFormsEmailFormat'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateForms .= "`email_format` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - text | 1 - HTML', ";
}
if ($gSystemConfig['enableFormsMessageSuccess'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateForms .= "`message_success` LONGTEXT, ";
}

$strSQLTableCreateForms .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`notes` LONGTEXT, ";
$strSQLTableCreateForms .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateForms .= "KEY `id` (`id`), ";
$strSQLTableCreateForms .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateForms .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateForms = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateForms);

if ($stmSQLTableCreateForms !== false) {
    $stmSQLTableCreateForms->execute();
    $stmSQLTableCreateForms->closeCursor();

    echo "Table: " . $strTableForms . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableForms . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table forms_fields.
// **************************************************************************************
// Query.
// ----------------------
$strTableFormsFields = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableFormsFields'];
$strSQLTableCreateFormsFields = "";

$strSQLTableCreateFormsFields .= "CREATE TABLE IF NOT EXISTS `$strTableFormsFields` (";
$strSQLTableCreateFormsFields .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFields .= "`id_forms` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFields .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFields .= "`date_creation` DATETIME, ";
$strSQLTableCreateFormsFields .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateFormsFields .= "`date_edit` DATETIME, ";

$strSQLTableCreateFormsFields .= "`field_type` INT NOT NULL DEFAULT 0 COMMENT '1 -text field | 2 - text area | 3 - check box | 4 - radio button | 5 - dropdown menu | 6 - file field | 7 - text description | 8 - subheader| 9 - date field | 10 - time field', ";

$strSQLTableCreateFormsFields .= "`field_name` TEXT, ";
$strSQLTableCreateFormsFields .= "`field_name_formatted` TEXT COMMENT 'field + id', ";

if ($gSystemConfig['enableFormsFieldsInstructions'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFields .= "`field_instructions` TEXT, ";
}

$strSQLTableCreateFormsFields .= "`field_size` TEXT, ";
$strSQLTableCreateFormsFields .= "`field_height` TEXT, ";

if ($gSystemConfig['enableFormsFieldsFieldFilter'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFields .= "`field_filter` INT NOT NULL DEFAULT 0 COMMENT '0 - none | 1 - e-mail', ";
}

if ($gSystemConfig['enableFormsFieldsInfoS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFields .= "`info_small1` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsInfoS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFields .= "`info_small2` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsInfoS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFields .= "`info_small3` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsInfoS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFields .= "`info_small4` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsInfoS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFields .= "`info_small5` TEXT, ";
}

$strSQLTableCreateFormsFields .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFields .= "`required` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFields .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFormsFields .= "KEY `id` (`id`), ";
$strSQLTableCreateFormsFields .= "KEY `id_forms` (`id_forms`)";
$strSQLTableCreateFormsFields .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateFormsFields = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateFormsFields);

if ($stmSQLTableCreateFormsFields !== false) {
    $stmSQLTableCreateFormsFields->execute();
    $stmSQLTableCreateFormsFields->closeCursor();

    echo "Table: " . $strTableFormsFields . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableFormsFields . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table forms_fields_options.
// **************************************************************************************
// Query.
// ----------------------
$strTableFormsFieldsOptions = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableFormsFieldsOptions'];
$strSQLTableCreateFormsFieldsOptions = "";

$strSQLTableCreateFormsFieldsOptions .= "CREATE TABLE IF NOT EXISTS `$strTableFormsFieldsOptions` (";
$strSQLTableCreateFormsFieldsOptions .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFieldsOptions .= "`id_forms_fields` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFieldsOptions .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFieldsOptions .= "`date_creation` DATETIME, ";
$strSQLTableCreateFormsFieldsOptions .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateFormsFieldsOptions .= "`date_edit` DATETIME, ";

$strSQLTableCreateFormsFieldsOptions .= "`option_name` TEXT, ";
$strSQLTableCreateFormsFieldsOptions .= "`option_name_formatted` TEXT COMMENT 'option + id', ";

if ($gSystemConfig['enableFormsFieldsOptionsConfigSelection'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFieldsOptions .= "`config_selection` INT NOT NULL DEFAULT 0 COMMENT '0 - not selected | 1 - selected', ";
}

if ($gSystemConfig['enableFormsFieldsOptionsInfoS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFieldsOptions .= "`info_small1` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsOptionsInfoS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFieldsOptions .= "`info_small2` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsOptionsInfoS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFieldsOptions .= "`info_small3` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsOptionsInfoS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFieldsOptions .= "`info_small4` TEXT, ";
}
if ($gSystemConfig['enableFormsFieldsOptionsInfoS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFieldsOptions .= "`info_small5` TEXT, ";
}

if ($gSystemConfig['enableFormsFieldsOptionsImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFormsFieldsOptions .= "`image_main` TEXT, ";
}

$strSQLTableCreateFormsFieldsOptions .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFieldsOptions .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFormsFieldsOptions .= "KEY `id` (`id`), ";
$strSQLTableCreateFormsFieldsOptions .= "KEY `id_forms_fields` (`id_forms_fields`)";
$strSQLTableCreateFormsFieldsOptions .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateFormsFieldsOptions = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateFormsFieldsOptions);

if ($stmSQLTableCreateFormsFieldsOptions !== false) {
    $stmSQLTableCreateFormsFieldsOptions->execute();
    $stmSQLTableCreateFormsFieldsOptions->closeCursor();

    echo "Table: " . $strTableFormsFieldsOptions . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableFormsFieldsOptions . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table filters_generic.
// **************************************************************************************
$strTableFiltersGeneric = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableFiltersGeneric'];
$strSQLTableCreateFiltersGeneric = "";

$strSQLTableCreateFiltersGeneric .= "CREATE TABLE IF NOT EXISTS `$strTableFiltersGeneric` (";
$strSQLTableCreateFiltersGeneric .= "`id` BIGINT NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableFiltersGenericSortOrder'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
$strSQLTableCreateFiltersGeneric .= "`date_creation` DATETIME, ";
$strSQLTableCreateFiltersGeneric .= "`date_edit` DATETIME, ";

$strSQLTableCreateFiltersGeneric .= "`filter_index` INT NOT NULL DEFAULT 0 COMMENT '1 - status | 2 - type | 101-200 (filters)', ";
// $strSQLTableCreateFiltersGeneric .= "`table_name` TEXT DEFAULT '' COMMENT 'categories | products | register', ";
$strSQLTableCreateFiltersGeneric .= "`table_name` VARCHAR(255) DEFAULT '' COMMENT 'categories | products | register', ";

$strSQLTableCreateFiltersGeneric .= "`title` LONGTEXT, ";
if ($gSystemConfig['enableFiltersGenericDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`description` LONGTEXT, ";
}

if ($gSystemConfig['configFiltersGenericURLAlias'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`url_alias` TEXT, ";
}
if ($gSystemConfig['enableFiltersGenericKeywordsTags'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`keywords_tags` TEXT, ";
}
if ($gSystemConfig['enableFiltersGenericMetaDescription'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`meta_description` TEXT, ";
}
if ($gSystemConfig['enableFiltersGenericMetaTitle'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`meta_title` TEXT, ";
}

$strSQLTableCreateFiltersGeneric .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if ($gSystemConfig['enableFiltersGenericInfoS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`info_small1` TEXT, ";
}
if ($gSystemConfig['enableFiltersGenericInfoS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`info_small2` TEXT, ";
}
if ($gSystemConfig['enableFiltersGenericInfoS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`info_small3` TEXT, ";
}
if ($gSystemConfig['enableFiltersGenericInfoS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`info_small4` TEXT, ";
}
if ($gSystemConfig['enableFiltersGenericInfoS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`info_small5` TEXT, ";
}

if ($gSystemConfig['enableFiltersGenericImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`image_main` TEXT, ";
}

if ($gSystemConfig['enableFiltersGenericConfigSelection'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    // $strSQLTableCreateFiltersGeneric .= "`selected_default` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - not selected | 1 - selected', ";
    $strSQLTableCreateFiltersGeneric .= "`config_selection` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - not selected | 1 - selected', ";
}

if ($gSystemConfig['enableFiltersGenericNumberS1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericNumberS2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericNumberS3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericNumberS4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericNumberS5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateFiltersGeneric .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";

if ($gSystemConfig['enableFiltersGenericActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableFiltersGenericActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateFiltersGeneric .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateFiltersGeneric .= "`notes` LONGTEXT, ";

$strSQLTableCreateFiltersGeneric .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFiltersGeneric .= "KEY `id` (`id`), ";
$strSQLTableCreateFiltersGeneric .= "KEY `filter_index` (`filter_index`)";
$strSQLTableCreateFiltersGeneric .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateFiltersGeneric = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateFiltersGeneric);

if ($stmSQLTableCreateFiltersGeneric !== false) {
    $stmSQLTableCreateFiltersGeneric->execute();
    $stmSQLTableCreateFiltersGeneric->closeCursor();

    echo "Table: " . $strTableFiltersGeneric . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableFiltersGeneric . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table filters_generic_binding.
// **************************************************************************************
$strTableFiltersGenericBinding = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableFiltersGenericBinding'];
$strSQLTableCreateFiltersGenericBinding = "";

$strSQLTableCreateFiltersGenericBinding .= "CREATE TABLE IF NOT EXISTS `$strTableFiltersGenericBinding` (";
$strSQLTableCreateFiltersGenericBinding .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGenericBinding .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGenericBinding .= "`date_creation` DATETIME, ";
$strSQLTableCreateFiltersGenericBinding .= "`date_edit` DATETIME, ";

$strSQLTableCreateFiltersGenericBinding .= "`id_filters_generic` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGenericBinding .= "`id_filter_index` INT NOT NULL DEFAULT 0, ";
// $strSQLTableCreateFiltersGenericBinding .= "`table_name` VARCHAR(255) DEFAULT '', ";
$strSQLTableCreateFiltersGenericBinding .= "`id_record` BIGINT NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGenericBinding .= "`notes` LONGTEXT, ";

$strSQLTableCreateFiltersGenericBinding .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `id` (`id`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `id_filters_generic` (`id_filters_generic`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `id_record` (`id_record`)";
$strSQLTableCreateFiltersGenericBinding .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";

// Statement and parameters.
// ----------------------
$stmSQLTableCreateFiltersGenericBinding = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateFiltersGenericBinding);

if ($stmSQLTableCreateFiltersGenericBinding !== false) {
    $stmSQLTableCreateFiltersGenericBinding->execute();
    $stmSQLTableCreateFiltersGenericBinding->closeCursor();

    echo "Table: " . $strTableFiltersGenericBinding . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableFiltersGenericBinding . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Table users.
// **************************************************************************************
// Query.
// ----------------------
$strTableUsers = $gSystemConfig['configSystemDBTablePrefix'] . $gSystemConfig['configSystemDBTableUsers'];
$strSQLTableCreateUsers = "";

$strSQLTableCreateUsers .= "CREATE TABLE IF NOT EXISTS `$strTableUsers` (";
$strSQLTableCreateUsers .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateUsers .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateUsers .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateUsers .= "`date_creation` DATETIME, ";
$strSQLTableCreateUsers .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateUsers .= "`date_edit` DATETIME, ";
$strSQLTableCreateUsers .= "`id_type` INT NOT NULL DEFAULT 0 COMMENT '1 - administrator (all functions) | 2 - (browse records)  | 3 - (include records) | 4 - (edit records) | 5 - (delete records)', ";

if ($gSystemConfig['enableUsersNameTitle'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`name_title` TEXT, ";
}
if ($gSystemConfig['enableUsersNameFull'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`name_full` TEXT, ";
}
if ($gSystemConfig['enableUsersNameFirst'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`name_first` TEXT, ";
}
if ($gSystemConfig['enableUsersNameLast'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`name_last` TEXT, ";
}

if ($gSystemConfig['enableUsersDateBirth'] != 0 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`date_birth` DATETIME, ";
}
if ($gSystemConfig['enableUsersGender'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`gender` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - not specified | 1 - male | 2 - female', ";
}

if ($gSystemConfig['enableUsersDocument'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`document` TEXT, ";
}

if ($gSystemConfig['enableUsersAddress'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`address_street` TEXT, ";
    $strSQLTableCreateUsers .= "`address_number` TEXT, ";
    $strSQLTableCreateUsers .= "`address_complement` TEXT, ";
    $strSQLTableCreateUsers .= "`neighborhood` TEXT, ";
    $strSQLTableCreateUsers .= "`district` TEXT, ";
    $strSQLTableCreateUsers .= "`county` TEXT, ";
    $strSQLTableCreateUsers .= "`city` TEXT, ";
    $strSQLTableCreateUsers .= "`state` TEXT, ";
    $strSQLTableCreateUsers .= "`country` TEXT, ";
    $strSQLTableCreateUsers .= "`zip_code` TEXT, ";
}

if ($gSystemConfig['enableUsersPhone1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    if ($gSystemConfig['enableUsersPhoneInternationalCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
        $strSQLTableCreateUsers .= "`phone1_international_code` TEXT, ";
    }
    $strSQLTableCreateUsers .= "`phone1_area_code` TEXT, ";
    $strSQLTableCreateUsers .= "`phone1` TEXT, ";
}

if ($gSystemConfig['enableUsersPhone2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    if ($gSystemConfig['enableUsersPhoneInternationalCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
        $strSQLTableCreateUsers .= "`phone2_international_code` TEXT, ";
    }
    $strSQLTableCreateUsers .= "`phone2_area_code` TEXT, ";
    $strSQLTableCreateUsers .= "`phone2` TEXT, ";
}

if ($gSystemConfig['enableUsersPhone3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    if ($gSystemConfig['enableUsersPhoneInternationalCode'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
        $strSQLTableCreateUsers .= "`phone3_international_code` TEXT, ";
    }
    $strSQLTableCreateUsers .= "`phone3_area_code` TEXT, ";
    $strSQLTableCreateUsers .= "`phone3` TEXT, ";
}

if ($gSystemConfig['enableUsersUsername'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`username` TEXT, ";
}
if ($gSystemConfig['enableUsersEmail'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`email` TEXT, ";
}

$strSQLTableCreateUsers .= "`password` LONGTEXT, ";
$strSQLTableCreateUsers .= "`password_hint` TEXT, ";
$strSQLTableCreateUsers .= "`password_length` TEXT, ";

if ($gSystemConfig['enableUsersInfo1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info1` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info2` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info3` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info4` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info5` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo6'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info6` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo7'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info7` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo8'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info8` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo9'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info9` LONGTEXT, ";
}
if ($gSystemConfig['enableUsersInfo10'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`info10` LONGTEXT, ";
}

if ($gSystemConfig['enableUsersImageMain'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`image_main` TEXT, ";
}

$strSQLTableCreateUsers .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if ($gSystemConfig['enableUsersActivation1'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableUsersActivation2'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableUsersActivation3'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableUsersActivation4'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableUsersActivation5'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

if ($gSystemConfig['enableUsersStatus'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
}
if ($gSystemConfig['enableUsersNotes'] == 1 && $gSystemConfig['enableSystemDBSizeOptimize'] == 0) {
    $strSQLTableCreateUsers .= "`notes` LONGTEXT, ";
}

$strSQLTableCreateUsers .= "PRIMARY KEY (`id`), ";
// $strSQLTableCreateUsers .= "KEY `id` (`id`), ";
$strSQLTableCreateUsers .= "KEY `id` (`id`) ";
// $strSQLTableCreateUsers .= "KEY `id_parent` (`id_parent`)";
// $strSQLTableCreateUsers .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
$strSQLTableCreateUsers .= ") CHARACTER SET `$dbSystemCharset` COLLATE `$dbSystemCollation`;";
// echo "strSQLTableCreateUsers = " . $strSQLTableCreateUsers . "<br />";
// ----------------------

// Insert default user.
// TODO: condition to insert user based on the config file set up.
// ----------------------
// Backend Node.
$strSQLTableCreateUsers .= "INSERT IGNORE INTO `$strTableUsers` (`id`, `id_parent`, `sort_order`, `date_creation`, `date_timezone`, `date_edit`, `id_type`, `name_title`, `name_full`, `name_first`, `name_last`, `date_birth`, `gender`, `document`, `address_street`, `address_number`, `address_complement`, `neighborhood`, `district`, `county`, `city`, `state`, `country`, `zip_code`, `phone1_international_code`, `phone1_area_code`, `phone1`, `phone2_international_code`, `phone2_area_code`, `phone2`, `phone3_international_code`, `phone3_area_code`, `phone3`, `username`, `email`, `password`, `password_hint`, `password_length`, `info1`, `info2`, `info3`, `info4`, `info5`, `info6`, `info7`, `info8`, `info9`, `info10`, `image_main`, `activation`, `activation1`, `activation2`, `activation3`, `activation4`, `activation5`, `id_status`, `notes`) VALUES
(11, 0, '0.000000000000000000000000000000', '2021-01-01 00:00:00', '', '2021-01-01 00:00:00', 1, '', '', '', '', NULL, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'root', '', 'cc8a152d91029a95d2f210649c65c551', '', '', '847ef509866a4ab40bf857428acc045b', '847ef509866a4ab40bf857428acc045b', '', '', '', '', '', '', '', '', '', 1, 0, 0, 0, 0, 0, 0, '');";

// Backend PHP Laravel (Data - Defuse php-encryption).
$strSQLTableCreateUsers .= "INSERT IGNORE INTO `$strTableUsers` (`id`, `id_parent`, `sort_order`, `date_creation`, `date_timezone`, `date_edit`, `id_type`, `name_title`, `name_full`, `name_first`, `name_last`, `date_birth`, `gender`, `document`, `address_street`, `address_number`, `address_complement`, `neighborhood`, `district`, `county`, `city`, `state`, `country`, `zip_code`, `phone1_international_code`, `phone1_area_code`, `phone1`, `phone2_international_code`, `phone2_area_code`, `phone2`, `phone3_international_code`, `phone3_area_code`, `phone3`, `username`, `email`, `password`, `password_hint`, `password_length`, `info1`, `info2`, `info3`, `info4`, `info5`, `info6`, `info7`, `info8`, `info9`, `info10`, `image_main`, `activation`, `activation1`, `activation2`, `activation3`, `activation4`, `activation5`, `id_status`, `notes`) VALUES
(14, 0, '0.000000000000000000000000000000', '2023-01-01 00:00:00', '', '2023-01-01 00:00:00', 1, '', '', '', '', NULL, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'root', '', 'def5020010d76a669a8ccd525d2d0405109fcd10075b6e40dafb4eb923275ffc40aa1a3e7e98fbafc17c439937a8373b917554b1b82638dbf296a41674747e95ceab8f122eedf3b3078cba54198c2c93a34e8787d3a176942da4', '', '', '', '', '', '', '', '', '', '', '', '', '', 1, 0, 0, 0, 0, 0, 0, '');";
// ----------------------

// Statement and parameters.
// ----------------------
$stmSQLTableCreateUsers = $gSystemConfig['dbSystemConPDO']->prepare($strSQLTableCreateUsers);

if ($stmSQLTableCreateUsers !== false) {
    $stmSQLTableCreateUsers->execute();
    $stmSQLTableCreateUsers->closeCursor();

    echo "Table: " . $strTableUsers . " - Created successfully." . "<br />";
} else {
    echo "Table: " . $strTableUsers . " - Error." . "<br />";
}
// ----------------------
// **************************************************************************************

// Write config-application-db.php.
// ----------------------

// ----------------------

// Debug.
// echo "configSystemDBTablePrefix = " . $gSystemConfig['configSystemDBTablePrefix'] . "<br />";
// echo "enableSystemDBSizeOptimize = " . $gSystemConfig['enableSystemDBSizeOptimize'] . "<br />";
// echo "strTableCounter = " . $gSystemConfig['strTableCounter'] . "<br />";
// echo "enableCategoriesInfo1 = " . $gSystemConfig['enableCategoriesInfo1'] . "<br />";

/*
echo "dbSystemCreateConPDO = <pre>";
var_dump($dbSystemCreateConPDO);
echo "</pre><br />";
*/
