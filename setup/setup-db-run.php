<?php
//Configuration files import.
require_once "../config-application.php"; //Deve vir antes do db.
require_once "../config-application-db.php";
//require_once "../IncludeFuncoes.php";
//require_once "../IncludeUsuarioVerificacao.php";
//require_once "../IncludeLayout.php";

/*
require_once __DIR__."/../IncludeConfig.php"; //Deve vir antes do db.
require_once __DIR__."/../IncludeConexao.php";
require_once __DIR__."/../IncludeFuncoes.php";
require_once __DIR__."/../IncludeUsuarioVerificacao.php";
require_once __DIR__."/../IncludeLayout.php";

require_once "/home/jmrj/public_html/sistema/IncludeConfig.php";
require_once "/home/jmrj/public_html/sistema/IncludeConexao.php";
require_once "/home/jmrj/public_html/sistema/IncludeFuncoes.php";
require_once "/home/jmrj/public_html/sistema/IncludeUsuarioVerificacao.php";
require_once "/home/jmrj/public_html/sistema/IncludeLayout.php";
*/


//Request variables.
//----------------------
/*
$dbSystemHost = "192.175.105.180"; //$_POST["dbSystemHost"]
$dbSystemDataBase = "dev_db_ss_multiplatformv3";
$dbSystemUser = "usuario_dev";
$dbSystemPassword = "juNh#1803";
*/
//----------------------



//Create data base (only works with localhost.
//----------------------
/*
try 
{
	//$dbh = new PDO("mysql:host=$dbSystemHost", $root, $root_password);
	$dbSystemCreateConPDO = new PDO("mysql:host=$dbSystemHost", $dbSystemUser, $dbSystemPassword);

	
								//CREATE USER '$user'@'localhost' IDENTIFIED BY '$pass';
								//GRANT ALL ON `$db`.* TO '$user'@'localhost';
								//FLUSH PRIVILEGES;
	
	$dbSystemCreateConPDO->exec("CREATE DATABASE `$dbSystemDataBase`;
								GRANT ALL ON `$dbSystemDataBase`.* TO '$dbSystemUser'@'dbSystemHost';
								FLUSH PRIVILEGES;") 
	or die(print_r($dbSystemCreateConPDO->errorInfo(), true));

}catch (PDOException $DBSystemCreateErrorPDO) {
	die("DB Error: ". $DBSystemCreateErrorPDO->getMessage());
}
*/
//----------------------



//Field types:
//http://www.mysqltutorial.org/mysql-data-types.aspx

//Function create table
//ref: https://stackoverflow.com/questions/12095285/php-pdo-mysql-query-create-table-if-not-exist


//Table _ssmv1_counter.
//**************************************************************************************
/*
- prefix_ssmv1_counter
id
counter_global
description
*/


//Query.
//----------------------
//$strTableCounter = $GLOBALS['configSystemDBTablePrefix'] . "counter";
$strTableCounter = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableCounter;
$strSQLTableCreateCounter = "";

$strSQLTableCreateCounter .= "CREATE TABLE IF NOT EXISTS `$strTableCounter` (";
$strSQLTableCreateCounter .= "`id` INT NOT NULL DEFAULT 0 COMMENT 'Counter index.', ";
$strSQLTableCreateCounter .= "`counter_global` BIGINT NOT NULL DEFAULT 0 COMMENT 'Counter.', ";
$strSQLTableCreateCounter .= "`description` LONGTEXT COMMENT 'General description.', ";
$strSQLTableCreateCounter .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateCounter .= "KEY `id` (`id`), ";
$strSQLTableCreateCounter .= "KEY `counter_global` (`counter_global`)";
$strSQLTableCreateCounter .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreateCounter = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateCounter);

if($stmSQLTableCreateCounter !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateCounter->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableCounter . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------


//Add default values.

//**************************************************************************************


//Table _ssmv1_categories.
//**************************************************************************************
//Query.
//----------------------
//$strTableCategories = $GLOBALS['configSystemDBTablePrefix'] . "categories";
$strTableCategories = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableCategories;
$strSQLTableCreateCategories = "";

$strSQLTableCreateCategories .= "CREATE TABLE IF NOT EXISTS `$strTableCategories` (";
$strSQLTableCreateCategories .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`category_type` INT NOT NULL DEFAULT 0 COMMENT '1 - content | 2 - products | 3/4/5/6 - publications | 7 - poll | 17 - quiz | 9 - segment | 10 - real estate | 11 - affiliation | 12 - forms | 13 - register | 19 - HR register | 15 - forum topics | 18 - vehicles | 20 - newsletter | 21 - cash flow | 22 - banners | 23 - classified | 24 - chat | 25 - avatars | 26 - pages | 27 - record bindings | 29 - processes | 63 - files | 80 - classes | 81 - modules | 82 - lessons', ";

//$strSQLTableCreateCategories .= "`date_creation` DATETIME NOT NULL, ";
$strSQLTableCreateCategories .= "`date_creation` DATETIME, ";
$strSQLTableCreateCategories .= "`date_timezone` VARCHAR(255), ";
//$strSQLTableCreateCategories .= "`date_edit` DATETIME NOT NULL, ";
$strSQLTableCreateCategories .= "`date_edit` DATETIME, ";

$strSQLTableCreateCategories .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
if($GLOBALS['enableCategoriesBindRegister1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`id_register1` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesBindRegister2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`id_register2` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesBindRegister3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`id_register3` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesBindRegister4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`id_register4` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesBindRegister5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`id_register5` BIGINT NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateCategories .= "`title` LONGTEXT, ";
if($GLOBALS['enableCategoriesDescription'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`description` LONGTEXT, ";
}

$strSQLTableCreateCategories .= "`url_alias` TEXT, ";
$strSQLTableCreateCategories .= "`keywords_tags` TEXT, ";
$strSQLTableCreateCategories .= "`meta_description` TEXT, ";
$strSQLTableCreateCategories .= "`meta_title` TEXT, ";
$strSQLTableCreateCategories .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if($GLOBALS['enableCategoriesInfo1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info1` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info2` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info3` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info4` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info5` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo6'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info6` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo7'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info7` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo8'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info8` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo9'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info9` LONGTEXT, ";
}
if($GLOBALS['enableCategoriesInfo10'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info10` LONGTEXT, ";
}

if($GLOBALS['enableCategoriesInfoS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info_small1` TEXT, ";
}
if($GLOBALS['enableCategoriesInfoS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info_small2` TEXT, ";
}
if($GLOBALS['enableCategoriesInfoS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info_small3` TEXT, ";
}
if($GLOBALS['enableCategoriesInfoS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info_small4` TEXT, ";
}
if($GLOBALS['enableCategoriesInfoS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info_small5` TEXT, ";
}

if($GLOBALS['enableCategoriesNumber1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumber2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumber3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumber4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumber5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableCategoriesNumberS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumberS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumberS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumberS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesNumberS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableCategoriesDate1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`date1` DATETIME, ";
}
if($GLOBALS['enableCategoriesDate2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`date2` DATETIME, ";
}
if($GLOBALS['enableCategoriesDate3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`date3` DATETIME, ";
}
if($GLOBALS['enableCategoriesDate4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`date4` DATETIME, ";
}
if($GLOBALS['enableCategoriesDate5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`date5` DATETIME, ";
}

$strSQLTableCreateCategories .= "`id_item1` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item2` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item3` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item4` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_item5` BIGINT NOT NULL DEFAULT 0, ";

if($GLOBALS['enableCategoriesImageMain'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`image_main` TEXT, ";
}

if($GLOBALS['enableCategoriesFile1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file1` TEXT, ";
}
if($GLOBALS['enableCategoriesFile2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file2` TEXT, ";
}
if($GLOBALS['enableCategoriesFile3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file3` TEXT, ";
}
if($GLOBALS['enableCategoriesFile4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file4` TEXT, ";
}
if($GLOBALS['enableCategoriesFile5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file5` TEXT, ";
}

$strSQLTableCreateCategories .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if($GLOBALS['enableCategoriesActivation1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesActivation2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesActivation3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesActivation4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableCategoriesActivation5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateCategories .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`restricted_access` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`notes` LONGTEXT, ";
$strSQLTableCreateCategories .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateCategories .= "KEY `id` (`id`), ";
$strSQLTableCreateCategories .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateCategories .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
/**/
//echo "strSQLTableCreateCategories = " . $strSQLTableCreateCategories . "<br />";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreateCategories = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateCategories);

if($stmSQLTableCreateCategories !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateCategories->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableCategories . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_files.
//**************************************************************************************
//Query.
//----------------------
//$strTableFiles = $GLOBALS['configSystemDBTablePrefix'] . "files";
$strTableFiles = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableFiles;
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

if($GLOBALS['enableFilesTitle'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`title` TEXT, ";
}
$strSQLTableCreateFiles .= "`caption` TEXT, ";
if($GLOBALS['enableFilesDescription'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`description` LONGTEXT, ";
}
if($GLOBALS['enableFilesHTMLCode'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`html_code` LONGTEXT, ";
}


$strSQLTableCreateFiles .= "`url_alias` TEXT, ";
$strSQLTableCreateFiles .= "`keywords_tags` TEXT, ";
$strSQLTableCreateFiles .= "`meta_description` TEXT, ";
$strSQLTableCreateFiles .= "`meta_title` TEXT, ";
$strSQLTableCreateFiles .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if($GLOBALS['enableFilesInfo1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info1` LONGTEXT, ";
}
if($GLOBALS['enableFilesInfo2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info2` LONGTEXT, ";
}
if($GLOBALS['enableFilesInfo3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info3` LONGTEXT, ";
}
if($GLOBALS['enableFilesInfo4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info4` LONGTEXT, ";
}
if($GLOBALS['enableFilesInfo5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info5` LONGTEXT, ";
}

if($GLOBALS['enableFilesInfoS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info_small1` TEXT, ";
}
if($GLOBALS['enableFilesInfoS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info_small2` TEXT, ";
}
if($GLOBALS['enableFilesInfoS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info_small3` TEXT, ";
}
if($GLOBALS['enableFilesInfoS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info_small4` TEXT, ";
}
if($GLOBALS['enableFilesInfoS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`info_small5` TEXT, ";
}

if($GLOBALS['enableFilesNumber1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumber2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumber3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumber4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumber5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableFilesNumberS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumberS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumberS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumberS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesNumberS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableFilesDate1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`date1` DATETIME, ";
}
if($GLOBALS['enableFilesDate2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`date2` DATETIME, ";
}
if($GLOBALS['enableFilesDate3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`date3` DATETIME, ";
}
if($GLOBALS['enableFilesDate4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`date4` DATETIME, ";
}
if($GLOBALS['enableFilesDate5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`date5` DATETIME, ";
}


$strSQLTableCreateFiles .= "`file` TEXT, ";
$strSQLTableCreateFiles .= "`file_size` TEXT, ";
$strSQLTableCreateFiles .= "`file_duration` TEXT, ";
$strSQLTableCreateFiles .= "`file_dimensions` TEXT, ";
$strSQLTableCreateFiles .= "`file_original_name` TEXT, ";
if($GLOBALS['enableFilesThumbnails'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`file_thumbnail` TEXT COMMENT 'Thumbnails for video files.', ";
}
if($GLOBALS['enableFilesFile1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`file1` TEXT, ";
}
if($GLOBALS['enableFilesFile2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`file2` TEXT, ";
}
if($GLOBALS['enableFilesFile3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`file3` TEXT, ";
}
if($GLOBALS['enableFilesFile4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`file4` TEXT, ";
}
if($GLOBALS['enableFilesFile5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`file5` TEXT, ";
}

$strSQLTableCreateFiles .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if($GLOBALS['enableFilesActivation1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesActivation2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesActivation3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesActivation4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFilesActivation5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiles .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateFiles .= "`notes` LONGTEXT, ";
$strSQLTableCreateFiles .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFiles .= "KEY `id` (`id`), ";
$strSQLTableCreateFiles .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateFiles .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";


//Statement and parameters.
//----------------------
$stmSQLTableCreateFiles = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateFiles);

if($stmSQLTableCreateFiles !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateFiles->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableFiles . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_content.
//**************************************************************************************
//Query.
//----------------------
$strTableContent = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableContent;
$strSQLTableCreateContent = "";

$strSQLTableCreateContent .= "CREATE TABLE IF NOT EXISTS `$strTableContent` (";
$strSQLTableCreateContent .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateContent .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateContent .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

$strSQLTableCreateContent .= "`date_creation` DATETIME, ";
$strSQLTableCreateContent .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateContent .= "`date_edit` DATETIME, ";

if($GLOBALS['enableContentBindRegisterUser'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateContent .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateContent .= "`content_type` INT NOT NULL DEFAULT 0 COMMENT '1 - header title | 2 - subheader title | 3 - content text | 4 - tab | 5 - image | 6 - video | 7 - html/table | 8 - files (pdf / word / power point / excell/zip) | 9 - newsletter art | 10 - columns | 11 - swf | 103 - publications', ";
if($GLOBALS['enableContentColumns'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateContent .= "`content_columns` INT NOT NULL DEFAULT 0 COMMENT 'Number of columns for a content block.', ";
}
$strSQLTableCreateContent .= "`align_text` INT NOT NULL DEFAULT 0 COMMENT '1 - right | 2 - centered | 3 - left | 4 - justified', ";
$strSQLTableCreateContent .= "`align_image` INT NOT NULL DEFAULT 0 COMMENT '1 - right | 2 - centered | 3 - left | 4 - justified', ";

$strSQLTableCreateContent .= "`content_text` LONGTEXT, ";
if($GLOBALS['enableContentURL'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateContent .= "`content_url` TEXT, ";
}
$strSQLTableCreateContent .= "`caption` TEXT, ";

$strSQLTableCreateContent .= "`file` TEXT, ";
$strSQLTableCreateContent .= "`file_size` TEXT, ";
$strSQLTableCreateContent .= "`file_duration` TEXT, ";
$strSQLTableCreateContent .= "`file_dimensions` TEXT, ";
$strSQLTableCreateContent .= "`file_original_name` TEXT, ";
$strSQLTableCreateContent .= "`file_config` INT NOT NULL DEFAULT 0 COMMENT '1 - link pop-up | 2 - open directly | 3 - download link | 4 - media link', ";
if($GLOBALS['enableContentFileThumbnail'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateContent .= "`file_thumbnail` TEXT COMMENT 'Thumbnails for video files.', ";
}
$strSQLTableCreateContent .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";

$strSQLTableCreateContent .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateContent .= "KEY `id` (`id`), ";
$strSQLTableCreateContent .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateContent .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";


//Statement and parameters.
//----------------------
$stmSQLTableCreateContent = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateContent);

if($stmSQLTableCreateContent !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateContent->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableContent . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_products.
//**************************************************************************************
//Query.
//----------------------
$strTableProducts = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableProducts;
$strSQLTableCreateProducts = "";

$strSQLTableCreateProducts .= "CREATE TABLE IF NOT EXISTS `$strTableProducts` (";
$strSQLTableCreateProducts .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

if($GLOBALS['enableProductsType'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`id_type` INT NOT NULL DEFAULT 0, ";
}

//$strSQLTableCreateProducts .= "`date_creation` DATETIME NOT NULL, ";
$strSQLTableCreateProducts .= "`date_creation` DATETIME, ";
//$strSQLTableCreateProducts .= "`date_timezone` VARCHAR(255), ";
//$strSQLTableCreateProducts .= "`date_edit` DATETIME NOT NULL, ";
$strSQLTableCreateProducts .= "`date_edit` DATETIME, ";

if($GLOBALS['enableProductsBindRegisterUser'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsBindRegister1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`id_register1` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsBindRegister2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`id_register2` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsBindRegister3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`id_register3` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsBindRegister4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`id_register4` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsBindRegister5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`id_register5` BIGINT NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableProductsCode'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`code` TEXT, ";
}

$strSQLTableCreateProducts .= "`title` LONGTEXT, ";
if($GLOBALS['enableProductsDescription'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`description` LONGTEXT, ";
}

$strSQLTableCreateProducts .= "`url_alias` TEXT, ";
$strSQLTableCreateProducts .= "`keywords_tags` TEXT, ";
$strSQLTableCreateProducts .= "`meta_description` TEXT, ";
$strSQLTableCreateProducts .= "`meta_title` TEXT, ";
$strSQLTableCreateProducts .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if($GLOBALS['enableProductsInfo1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info1` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info2` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info3` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info4` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info5` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo6'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info6` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo7'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info7` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo8'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info8` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo9'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info9` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo10'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info10` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo11'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info11` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo12'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info12` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo13'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info13` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo14'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info14` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo15'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info15` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo16'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info16` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo17'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info17` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo18'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info18` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo19'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info19` LONGTEXT, ";
}
if($GLOBALS['enableProductsInfo20'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info20` LONGTEXT, ";
}

if($GLOBALS['enableProductsInfoS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small1` TEXT, ";
}
if($GLOBALS['enableProductsInfoS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small2` TEXT, ";
}
if($GLOBALS['enableProductsInfoS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small3` TEXT, ";
}
if($GLOBALS['enableProductsInfoS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small4` TEXT, ";
}
if($GLOBALS['enableProductsInfoS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small5` TEXT, ";
}
if($GLOBALS['enableProductsInfoS6'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small6` TEXT, ";
}
if($GLOBALS['enableProductsInfoS7'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small7` TEXT, ";
}
if($GLOBALS['enableProductsInfoS8'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small8` TEXT, ";
}
if($GLOBALS['enableProductsInfoS9'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small9` TEXT, ";
}
if($GLOBALS['enableProductsInfoS10'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small10` TEXT, ";
}
if($GLOBALS['enableProductsInfoS11'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small11` TEXT, ";
}
if($GLOBALS['enableProductsInfoS12'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small12` TEXT, ";
}
if($GLOBALS['enableProductsInfoS13'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small13` TEXT, ";
}
if($GLOBALS['enableProductsInfoS14'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small14` TEXT, ";
}
if($GLOBALS['enableProductsInfoS15'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small15` TEXT, ";
}
if($GLOBALS['enableProductsInfoS16'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small16` TEXT, ";
}
if($GLOBALS['enableProductsInfoS17'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small17` TEXT, ";
}
if($GLOBALS['enableProductsInfoS18'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small18` TEXT, ";
}
if($GLOBALS['enableProductsInfoS19'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small19` TEXT, ";
}
if($GLOBALS['enableProductsInfoS20'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small20` TEXT, ";
}
if($GLOBALS['enableProductsInfoS21'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small21` TEXT, ";
}
if($GLOBALS['enableProductsInfoS22'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small22` TEXT, ";
}
if($GLOBALS['enableProductsInfoS23'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small23` TEXT, ";
}
if($GLOBALS['enableProductsInfoS24'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small24` TEXT, ";
}
if($GLOBALS['enableProductsInfoS25'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small25` TEXT, ";
}
if($GLOBALS['enableProductsInfoS26'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small26` TEXT, ";
}
if($GLOBALS['enableProductsInfoS27'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small27` TEXT, ";
}
if($GLOBALS['enableProductsInfoS28'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small28` TEXT, ";
}
if($GLOBALS['enableProductsInfoS29'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small29` TEXT, ";
}
if($GLOBALS['enableProductsInfoS30'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`info_small30` TEXT, ";
}

if($GLOBALS['enableProductsValue'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`value` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsValue1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`value1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsValue2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`value2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableProductsWeight'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`weight` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsCoefficient'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`coefficient` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableProductsNumber1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumber2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumber3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumber4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumber5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableProductsNumberS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumberS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumberS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumberS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNumberS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableProductsURL1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`url1` TEXT, ";
}
if($GLOBALS['enableProductsURL2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`url2` TEXT, ";
}
if($GLOBALS['enableProductsURL3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`url3` TEXT, ";
}
if($GLOBALS['enableProductsURL4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`url4` TEXT, ";
}
if($GLOBALS['enableProductsURL5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`url5` TEXT, ";
}

if($GLOBALS['enableProductsDate1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`date1` DATETIME, ";
}
if($GLOBALS['enableProductsDate2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`date2` DATETIME, ";
}
if($GLOBALS['enableProductsDate3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`date3` DATETIME, ";
}
if($GLOBALS['enableProductsDate4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`date4` DATETIME, ";
}
if($GLOBALS['enableProductsDate5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`date5` DATETIME, ";
}

$strSQLTableCreateProducts .= "`id_item1` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item2` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item3` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item4` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateProducts .= "`id_item5` BIGINT NOT NULL DEFAULT 0, ";

if($GLOBALS['enableProductsImageMain'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`image_main` TEXT, ";
}
if($GLOBALS['enableProductsImageMainCaption'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`image_main_caption` TEXT, ";
}

if($GLOBALS['enableProductsFile1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`file1` TEXT, ";
}
if($GLOBALS['enableProductsFile2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`file2` TEXT, ";
}
if($GLOBALS['enableProductsFile3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`file3` TEXT, ";
}
if($GLOBALS['enableProductsFile4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`file4` TEXT, ";
}
if($GLOBALS['enableProductsFile5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`file5` TEXT, ";
}

$strSQLTableCreateProducts .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if($GLOBALS['enableProductsActivation1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsActivation2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsActivation3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsActivation4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsActivation5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

//if($GLOBALS['enableProductsStatus'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
//{
	$strSQLTableCreateProducts .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
//}
if($GLOBALS['enableProductsRestrictedAccess'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`restricted_access` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableProductsNotes'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateProducts .= "`notes` LONGTEXT, ";
}
$strSQLTableCreateProducts .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateProducts .= "KEY `id` (`id`), ";
$strSQLTableCreateProducts .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateProducts .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
/**/
//echo "strSQLTableCreateProducts = " . $strSQLTableCreateProducts . "<br />";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreateProducts = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateProducts);

if($stmSQLTableCreateProducts !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateProducts->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableProducts . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_publications.
//**************************************************************************************
//Query.
//----------------------
$strTablePublications = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTablePublications;
$strSQLTableCreatePublications = "";

$strSQLTableCreatePublications .= "CREATE TABLE IF NOT EXISTS `$strTablePublications` (";
$strSQLTableCreatePublications .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreatePublications .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreatePublications .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreatePublications .= "`id_type` INT NOT NULL DEFAULT 0 COMMENT '1 - news | 2 - photo gallery  | 3 - articles | 4 - publications', ";
//$strSQLTableCreatePublications .= "`date_creation` DATETIME NOT NULL, ";
$strSQLTableCreatePublications .= "`date_creation` DATETIME, ";
//$strSQLTableCreatePublications .= "`date_timezone` VARCHAR(255), ";
//$strSQLTableCreatePublications .= "`date_edit` DATETIME NOT NULL, ";
$strSQLTableCreatePublications .= "`date_edit` DATETIME, ";
if($GLOBALS['enablePublicationsBindRegisterUser'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsBindRegister1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`id_register1` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsBindRegister2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`id_register2` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsBindRegister3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`id_register3` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsBindRegister4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`id_register4` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsBindRegister5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`id_register5` BIGINT NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enablePublicationsDateStart'] != 0 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`date_start` DATETIME, ";
}
if($GLOBALS['enablePublicationsDateEnd'] != 0 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`date_end` DATETIME, ";
}

$strSQLTableCreatePublications .= "`title` LONGTEXT, ";

if($GLOBALS['enablePublicationsDescription'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`description` LONGTEXT, ";
}

$strSQLTableCreatePublications .= "`url_alias` TEXT, ";
$strSQLTableCreatePublications .= "`keywords_tags` TEXT, ";
$strSQLTableCreatePublications .= "`meta_description` TEXT, ";
$strSQLTableCreatePublications .= "`meta_title` TEXT, ";
$strSQLTableCreatePublications .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if($GLOBALS['enablePublicationsSource'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`source` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsSourceURL'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`source_url` LONGTEXT, ";
}

if($GLOBALS['enablePublicationsInfo1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info1` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info2` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info3` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info4` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info5` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo6'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info6` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo7'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info7` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo8'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info8` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo9'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info9` LONGTEXT, ";
}
if($GLOBALS['enablePublicationsInfo10'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`info10` LONGTEXT, ";
}

if($GLOBALS['enablePublicationsNumber1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`number1` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsNumber2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`number2` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsNumber3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`number3` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsNumber4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`number4` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsNumber5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`number5` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enablePublicationsURL1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`url1` TEXT, ";
}
if($GLOBALS['enablePublicationsURL2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`url2` TEXT, ";
}
if($GLOBALS['enablePublicationsURL3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`url3` TEXT, ";
}
if($GLOBALS['enablePublicationsURL4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`url4` TEXT, ";
}
if($GLOBALS['enablePublicationsURL5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`url5` TEXT, ";
}

if($GLOBALS['enablePublicationsDate1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`date1` DATETIME, ";
}
if($GLOBALS['enablePublicationsDate2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`date2` DATETIME, ";
}
if($GLOBALS['enablePublicationsDate3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`date3` DATETIME, ";
}
if($GLOBALS['enablePublicationsDate4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`date4` DATETIME, ";
}
if($GLOBALS['enablePublicationsDate5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`date5` DATETIME, ";
}

if($GLOBALS['enablePublicationsImageMain'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`image_main` TEXT, ";
}
if($GLOBALS['enablePublicationsImageMainCaption'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`image_main_caption` TEXT, ";
}

if($GLOBALS['enablePublicationsFile1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`file1` TEXT, ";
}
if($GLOBALS['enablePublicationsFile2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`file2` TEXT, ";
}
if($GLOBALS['enablePublicationsFile3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`file3` TEXT, ";
}
if($GLOBALS['enablePublicationsFile4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`file4` TEXT, ";
}
if($GLOBALS['enablePublicationsFile5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`file5` TEXT, ";
}

$strSQLTableCreatePublications .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if($GLOBALS['enablePublicationsActivation1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsActivation2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsActivation3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsActivation4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsActivation5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

//if($GLOBALS['enablePublicationsStatus'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
//{
	$strSQLTableCreatePublications .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
//}
if($GLOBALS['enablePublicationsRestrictedAccess'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`restricted_access` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enablePublicationsNotes'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreatePublications .= "`notes` LONGTEXT, ";
}
$strSQLTableCreatePublications .= "PRIMARY KEY (`id`), ";
$strSQLTableCreatePublications .= "KEY `id` (`id`), ";
$strSQLTableCreatePublications .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreatePublications .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
/**/
//echo "strSQLTableCreatePublications = " . $strSQLTableCreatePublications . "<br />";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreatePublications = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreatePublications);

if($stmSQLTableCreatePublications !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreatePublications->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTablePublications . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_forms.
//**************************************************************************************
//Query.
//----------------------
$strTableForms = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableForms;
$strSQLTableCreateForms = "";

$strSQLTableCreateForms .= "CREATE TABLE IF NOT EXISTS `$strTableForms` (";
$strSQLTableCreateForms .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`date_creation` DATETIME, ";
$strSQLTableCreateForms .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateForms .= "`date_edit` DATETIME, ";

if($GLOBALS['enableFormsBindRegisterUser'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateForms .= "`id_register_user` BIGINT NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateForms .= "`form_title` TEXT, ";
$strSQLTableCreateForms .= "`form_subject` TEXT, ";
$strSQLTableCreateForms .= "`recipient_name` TEXT, ";
$strSQLTableCreateForms .= "`recipient_email` TEXT, ";
if($GLOBALS['enableFormsRecipientEmailCopy'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateForms .= "`recipient_email_copy` LONGTEXT, ";
}

if($GLOBALS['enableFormsSender'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateForms .= "`sender_name` TEXT, ";
	$strSQLTableCreateForms .= "`sender_email` TEXT, ";
}
if($GLOBALS['enableFormsSenderConfig'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateForms .= "`sender_config` LONGTEXT COMMENT 'json', ";
}

if($GLOBALS['enableFormsEmailFormat'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateForms .= "`email_format` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - text | 1 - HTML', ";
}
if($GLOBALS['enableFormsMessageSuccess'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateForms .= "`message_success` LONGTEXT, ";
}

$strSQLTableCreateForms .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateForms .= "`notes` LONGTEXT, ";
$strSQLTableCreateForms .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateForms .= "KEY `id` (`id`), ";
$strSQLTableCreateForms .= "KEY `id_parent` (`id_parent`)";
$strSQLTableCreateForms .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreateForms = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateForms);

if($stmSQLTableCreateForms !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateForms->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableForms . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_forms_fields.
//**************************************************************************************
//Query.
//----------------------
$strTableFormsFields = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableFormsFields;
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

if($GLOBALS['enableFormsFieldsInstructions'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFields .= "`field_instructions` TEXT, ";
}

$strSQLTableCreateFormsFields .= "`field_size` TEXT, ";
$strSQLTableCreateFormsFields .= "`field_height` TEXT, ";

if($GLOBALS['enableFormsFieldsFieldFilter'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFields .= "`field_filter` INT NOT NULL DEFAULT 0 COMMENT '0 - none | 1 - e-mail', ";
}

if($GLOBALS['enableFormsFieldsInfoS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFields .= "`info_small1` TEXT, ";
}
if($GLOBALS['enableFormsFieldsInfoS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFields .= "`info_small2` TEXT, ";
}
if($GLOBALS['enableFormsFieldsInfoS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFields .= "`info_small3` TEXT, ";
}
if($GLOBALS['enableFormsFieldsInfoS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFields .= "`info_small4` TEXT, ";
}
if($GLOBALS['enableFormsFieldsInfoS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFields .= "`info_small5` TEXT, ";
}

$strSQLTableCreateFormsFields .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFields .= "`required` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFields .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFormsFields .= "KEY `id` (`id`), ";
$strSQLTableCreateFormsFields .= "KEY `id_forms` (`id_forms`)";
$strSQLTableCreateFormsFields .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreateFormsFields = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateFormsFields);

if($stmSQLTableCreateFormsFields !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateFormsFields->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableFormsFields . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_forms_fields_options.
//**************************************************************************************
//Query.
//----------------------
$strTableFormsFieldsOptions = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableFormsFieldsOptions;
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

if($GLOBALS['enableFormsFieldsOptionsConfigSelection'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFieldsOptions .= "`config_selection` INT NOT NULL DEFAULT 0 COMMENT '0 - not selected | 1 - selected', ";
}

if($GLOBALS['enableFormsFieldsOptionsInfoS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFieldsOptions .= "`info_small1` TEXT, ";
}
if($GLOBALS['enableFormsFieldsOptionsInfoS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFieldsOptions .= "`info_small2` TEXT, ";
}
if($GLOBALS['enableFormsFieldsOptionsInfoS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFieldsOptions .= "`info_small3` TEXT, ";
}
if($GLOBALS['enableFormsFieldsOptionsInfoS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFieldsOptions .= "`info_small4` TEXT, ";
}
if($GLOBALS['enableFormsFieldsOptionsInfoS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFieldsOptions .= "`info_small5` TEXT, ";
}

if($GLOBALS['enableFormsFieldsOptionsImageMain'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFormsFieldsOptions .= "`image_main` TEXT, ";
}

$strSQLTableCreateFormsFieldsOptions .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFormsFieldsOptions .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFormsFieldsOptions .= "KEY `id` (`id`), ";
$strSQLTableCreateFormsFieldsOptions .= "KEY `id_forms_fields` (`id_forms_fields`)";
$strSQLTableCreateFormsFieldsOptions .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreateFormsFieldsOptions = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateFormsFieldsOptions);

if($stmSQLTableCreateFormsFieldsOptions !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateFormsFieldsOptions->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableFormsFieldsOptions . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_filters_generic.
//**************************************************************************************
//$strTableFiltersGeneric = $GLOBALS['configSystemDBTablePrefix'] . "filters_generic";
$strTableFiltersGeneric = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableFiltersGeneric;
$strSQLTableCreateFiltersGeneric = "";

$strSQLTableCreateFiltersGeneric .= "CREATE TABLE IF NOT EXISTS `$strTableFiltersGeneric` (";
$strSQLTableCreateFiltersGeneric .= "`id` BIGINT NOT NULL DEFAULT 0, ";
if($GLOBALS['enableFiltersGenericSortOrder'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
}
$strSQLTableCreateFiltersGeneric .= "`date_creation` DATETIME, ";
$strSQLTableCreateFiltersGeneric .= "`date_edit` DATETIME, ";

$strSQLTableCreateFiltersGeneric .= "`filter_index` INT NOT NULL DEFAULT 0 COMMENT '1 - status | 2 - type | 101-200 (filters)', ";
//$strSQLTableCreateFiltersGeneric .= "`table_name` TEXT DEFAULT '' COMMENT 'categories | products | register', ";
$strSQLTableCreateFiltersGeneric .= "`table_name` VARCHAR(255) DEFAULT '' COMMENT 'categories | products | register', ";

$strSQLTableCreateFiltersGeneric .= "`title` LONGTEXT, ";
if($GLOBALS['enableFiltersGenericDescription'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`description` LONGTEXT, ";
}

if($GLOBALS['configFiltersGenericURLAlias'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`url_alias` TEXT, ";
}
if($GLOBALS['enableFiltersGenericKeywordsTags'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`keywords_tags` TEXT, ";
}
if($GLOBALS['enableFiltersGenericMetaDescription'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`meta_description` TEXT, ";
}
if($GLOBALS['enableFiltersGenericMetaTitle'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`meta_title` TEXT, ";
}

$strSQLTableCreateFiltersGeneric .= "`meta_info` TEXT COMMENT 'Reserved for any aditional configuration - json.', ";

if($GLOBALS['enableFiltersGenericInfoS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`info_small1` TEXT, ";
}
if($GLOBALS['enableFiltersGenericInfoS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`info_small2` TEXT, ";
}
if($GLOBALS['enableFiltersGenericInfoS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`info_small3` TEXT, ";
}
if($GLOBALS['enableFiltersGenericInfoS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`info_small4` TEXT, ";
}
if($GLOBALS['enableFiltersGenericInfoS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`info_small5` TEXT, ";
}

if($GLOBALS['enableFiltersGenericImageMain'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`image_main` TEXT, ";
}

if($GLOBALS['enableFiltersGenericConfigSelection'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	//$strSQLTableCreateFiltersGeneric .= "`selected_default` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - not selected | 1 - selected', ";
	$strSQLTableCreateFiltersGeneric .= "`config_selection` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - not selected | 1 - selected', ";
}

if($GLOBALS['enableFiltersGenericNumberS1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericNumberS2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericNumberS3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericNumberS4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericNumberS5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateFiltersGeneric .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";

if($GLOBALS['enableFiltersGenericActivation1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericActivation2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericActivation3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericActivation4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableFiltersGenericActivation5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateFiltersGeneric .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

$strSQLTableCreateFiltersGeneric .= "`notes` LONGTEXT, ";

$strSQLTableCreateFiltersGeneric .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFiltersGeneric .= "KEY `id` (`id`), ";
$strSQLTableCreateFiltersGeneric .= "KEY `filter_index` (`filter_index`)";
$strSQLTableCreateFiltersGeneric .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";


//Statement and parameters.
//----------------------
$stmSQLTableCreateFiltersGeneric = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateFiltersGeneric);

if($stmSQLTableCreateFiltersGeneric !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateFiltersGeneric->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableFiltersGeneric . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_filters_generic_binding.
//**************************************************************************************
//$strTableFiltersGenericBinding = $GLOBALS['configSystemDBTablePrefix'] . "filters_generic_binding";
$strTableFiltersGenericBinding = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableFiltersGenericBinding;
$strSQLTableCreateFiltersGenericBinding = "";

$strSQLTableCreateFiltersGenericBinding .= "CREATE TABLE IF NOT EXISTS `$strTableFiltersGenericBinding` (";
$strSQLTableCreateFiltersGenericBinding .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGenericBinding .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGenericBinding .= "`date_creation` DATETIME, ";
$strSQLTableCreateFiltersGenericBinding .= "`date_edit` DATETIME, ";

$strSQLTableCreateFiltersGenericBinding .= "`id_filters_generic` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGenericBinding .= "`id_filter_index` INT NOT NULL DEFAULT 0, ";
//$strSQLTableCreateFiltersGenericBinding .= "`table_name` VARCHAR(255) DEFAULT '', ";
$strSQLTableCreateFiltersGenericBinding .= "`id_record` BIGINT NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGenericBinding .= "`notes` LONGTEXT, ";

$strSQLTableCreateFiltersGenericBinding .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `id` (`id`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `id_filters_generic` (`id_filters_generic`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `id_record` (`id_record`)";
$strSQLTableCreateFiltersGenericBinding .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";

//Statement and parameters.
//----------------------
$stmSQLTableCreateFiltersGenericBinding = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateFiltersGenericBinding);

if($stmSQLTableCreateFiltersGenericBinding !== false)
{
	
	
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateFiltersGenericBinding->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableFiltersGenericBinding . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Table _ssmv1_users.
//**************************************************************************************
//Query.
//----------------------
$strTableUsers = $GLOBALS['configSystemDBTablePrefix'] . $configSystemDBTableUsers;
$strSQLTableCreateUsers = "";

$strSQLTableCreateUsers .= "CREATE TABLE IF NOT EXISTS `$strTableUsers` (";
$strSQLTableCreateUsers .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateUsers .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateUsers .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateUsers .= "`date_creation` DATETIME, ";
$strSQLTableCreateUsers .= "`date_timezone` VARCHAR(255), ";
$strSQLTableCreateUsers .= "`date_edit` DATETIME, ";
$strSQLTableCreateUsers .= "`id_type` INT NOT NULL DEFAULT 0 COMMENT '1 - administrator (all functions) | 2 - (browse records)  | 3 - (include records) | 4 - (edit records) | 5 - (delete records)', ";

if($GLOBALS['enableUsersNameTitle'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`name_title` TEXT, ";
}
if($GLOBALS['enableUsersNameFull'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`name_full` TEXT, ";
}
if($GLOBALS['enableUsersNameFirst'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`name_first` TEXT, ";
}
if($GLOBALS['enableUsersNameLast'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`name_last` TEXT, ";
}

if($GLOBALS['enableUsersDateBirth'] != 0 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`date_birth` DATETIME, ";
}
if($GLOBALS['enableUsersGender'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`gender` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0 - not specified | 1 - male | 2 - female', ";
}

if($GLOBALS['enableUsersDocument'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`document` TEXT, ";
}

if($GLOBALS['enableUsersAddress'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
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

if($GLOBALS['enableUsersPhone1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	if($GLOBALS['enableUsersPhoneInternationalCode'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
	{
		$strSQLTableCreateUsers .= "`phone1_international_code` TEXT, ";
	}
	$strSQLTableCreateUsers .= "`phone1_area_code` TEXT, ";
	$strSQLTableCreateUsers .= "`phone1` TEXT, ";
}

if($GLOBALS['enableUsersPhone2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	if($GLOBALS['enableUsersPhoneInternationalCode'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
	{
		$strSQLTableCreateUsers .= "`phone2_international_code` TEXT, ";
	}
	$strSQLTableCreateUsers .= "`phone2_area_code` TEXT, ";
	$strSQLTableCreateUsers .= "`phone2` TEXT, ";
}

if($GLOBALS['enableUsersPhone3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	if($GLOBALS['enableUsersPhoneInternationalCode'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
	{
		$strSQLTableCreateUsers .= "`phone3_international_code` TEXT, ";
	}
	$strSQLTableCreateUsers .= "`phone3_area_code` TEXT, ";
	$strSQLTableCreateUsers .= "`phone3` TEXT, ";
}

if($GLOBALS['enableUsersUsername'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`username` TEXT, ";
}
if($GLOBALS['enableUsersEmail'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`email` TEXT, ";
}

$strSQLTableCreateUsers .= "`password` LONGTEXT, ";
$strSQLTableCreateUsers .= "`password_hint` TEXT, ";
$strSQLTableCreateUsers .= "`password_length` TEXT, ";

if($GLOBALS['enableUsersInfo1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info1` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info2` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info3` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info4` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info5` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo6'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info6` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo7'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info7` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo8'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info8` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo9'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info9` LONGTEXT, ";
}
if($GLOBALS['enableUsersInfo10'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`info10` LONGTEXT, ";
}

if($GLOBALS['enableUsersImageMain'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`image_main` TEXT, ";
}

$strSQLTableCreateUsers .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
if($GLOBALS['enableUsersActivation1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableUsersActivation2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableUsersActivation3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableUsersActivation4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableUsersActivation5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";
}

if($GLOBALS['enableUsersStatus'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`id_status` BIGINT NOT NULL DEFAULT 0, ";
}
if($GLOBALS['enableUsersNotes'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateUsers .= "`notes` LONGTEXT, ";
}

$strSQLTableCreateUsers .= "PRIMARY KEY (`id`), ";
//$strSQLTableCreateUsers .= "KEY `id` (`id`), ";
$strSQLTableCreateUsers .= "KEY `id` (`id`) ";
//$strSQLTableCreateUsers .= "KEY `id_parent` (`id_parent`)";
//$strSQLTableCreateUsers .= ") CHARACTER SET utf8 COLLATE utf8_general_ci";
$strSQLTableCreateUsers .= ") CHARACTER SET utf8 COLLATE utf8_general_ci;";
/**/
//echo "strSQLTableCreateUsers = " . $strSQLTableCreateUsers . "<br />";
//----------------------


//Insert default user.
//----------------------
$strSQLTableCreateUsers .= "INSERT INTO `prefix_ssmv1_users` (`id`, `id_parent`, `sort_order`, `date_creation`, `date_timezone`, `date_edit`, `id_type`, `name_title`, `name_full`, `name_first`, `name_last`, `date_birth`, `gender`, `document`, `address_street`, `address_number`, `address_complement`, `neighborhood`, `district`, `county`, `city`, `state`, `country`, `zip_code`, `phone1_international_code`, `phone1_area_code`, `phone1`, `phone2_international_code`, `phone2_area_code`, `phone2`, `phone3_international_code`, `phone3_area_code`, `phone3`, `username`, `email`, `password`, `password_hint`, `password_length`, `info1`, `info2`, `info3`, `info4`, `info5`, `info6`, `info7`, `info8`, `info9`, `info10`, `image_main`, `activation`, `activation1`, `activation2`, `activation3`, `activation4`, `activation5`, `id_status`, `notes`) VALUES
(11, 0, '0.000000000000000000000000000000', '2021-01-01 00:00:00', '', '2021-01-01 00:00:00', 1, '', '', '', '', NULL, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'root', '', 'cc8a152d91029a95d2f210649c65c551', '', '', '847ef509866a4ab40bf857428acc045b', '847ef509866a4ab40bf857428acc045b', '', '', '', '', '', '', '', '', '', 1, 0, 0, 0, 0, 0, 0, '');";
//----------------------


//Statement and parameters.
//----------------------
$stmSQLTableCreateUsers = $GLOBALS['dbSystemConPDO']->prepare($strSQLTableCreateUsers);

if($stmSQLTableCreateUsers !== false)
{
	//if($idTbFluxo <> "")
	//{
		//$stmSQLTableCreateCounter->bindParam(':id', $idTbFluxo, PDO::PARAM_STR);
	//}
	$stmSQLTableCreateUsers->execute();
	

	//$mensagemSucesso = "1 " . XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus2");
	//Obs: Colocar um flag de verificação de gravação.
	//Success.
	echo "Table: " . $strTableUsers . " - Created successfully." . "<br />";
}else{
	//echo "erro";
	//$mensagemErro = XMLFuncoes::XMLIdiomas($GLOBALS['xmlIdiomaSistema'], "sistemaStatus3");
	//Error.
}
//----------------------
//**************************************************************************************


//Write config-application-db.php.
//----------------------

//----------------------


//Debug.
echo "configSystemDBTablePrefix = " . $GLOBALS['configSystemDBTablePrefix'] . "<br />";
echo "enableSystemDBSizeOtimize = " . $GLOBALS['enableSystemDBSizeOtimize'] . "<br />";
//echo "strTableCounter = " . $GLOBALS['strTableCounter'] . "<br />";
//echo "enableCategoriesInfo1 = " . $GLOBALS['enableCategoriesInfo1'] . "<br />";


/*
echo "dbSystemCreateConPDO = <pre>";
var_dump($dbSystemCreateConPDO);
echo "</pre><br />";
*/
?>
