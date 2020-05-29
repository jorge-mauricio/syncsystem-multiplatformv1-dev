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
$strTableCounter = $GLOBALS['configSystemDBTablePrefix'] . "counter";
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
$strTableCategories = $GLOBALS['configSystemDBTablePrefix'] . "categories";
$strSQLTableCreateCategories = "";

$strSQLTableCreateCategories .= "CREATE TABLE IF NOT EXISTS `$strTableCategories` (";
$strSQLTableCreateCategories .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`id_parent` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";
$strSQLTableCreateCategories .= "`category_type` INT NOT NULL DEFAULT 0, ";

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

$strSQLTableCreateCategories .= "`title` LONGTEXT DEFAULT '', ";
if($GLOBALS['enableCategoriesDescription'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`description` LONGTEXT, ";
}

$strSQLTableCreateCategories .= "`url_alias` TEXT DEFAULT '', ";
$strSQLTableCreateCategories .= "`keywords_tags` TEXT DEFAULT '', ";
$strSQLTableCreateCategories .= "`meta_description` TEXT DEFAULT '', ";
$strSQLTableCreateCategories .= "`meta_title` TEXT DEFAULT '', ";
$strSQLTableCreateCategories .= "`meta_info` TEXT DEFAULT '' COMMENT 'Reserved for any aditional configuration - json.', ";

if($GLOBALS['enableCategoriesInfo1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info1` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info2` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info3` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info4` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info5` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo6'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info6` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo7'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info7` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo8'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info8` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo9'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info9` LONGTEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesInfo10'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`info10` LONGTEXT DEFAULT '', ";
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

$strSQLTableCreateCategories .= "`image_main` TEXT DEFAULT '', ";
if($GLOBALS['enableCategoriesFile1'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file1` TEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesFile2'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file2` TEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesFile3'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file3` TEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesFile4'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file4` TEXT DEFAULT '', ";
}
if($GLOBALS['enableCategoriesFile5'] == 1 && $GLOBALS['enableSystemDBSizeOtimize'] == 0)
{
	$strSQLTableCreateCategories .= "`file5` TEXT DEFAULT '', ";
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
$strSQLTableCreateCategories .= "`notes` LONGTEXT DEFAULT '', ";
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


//Table _ssmv1_filters_generic.
//**************************************************************************************
$strTableFiltersGeneric = $GLOBALS['configSystemDBTablePrefix'] . "filters_generic";
$strSQLTableCreateFiltersGeneric = "";

$strSQLTableCreateFiltersGeneric .= "CREATE TABLE IF NOT EXISTS `$strTableFiltersGeneric` (";
$strSQLTableCreateFiltersGeneric .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGeneric .= "`date_creation` DATETIME, ";
$strSQLTableCreateFiltersGeneric .= "`date_edit` DATETIME, ";

$strSQLTableCreateFiltersGeneric .= "`filter_index` INT NOT NULL DEFAULT 0 COMMENT '1 - type | 2 - status | 101-200 (filters)', ";
$strSQLTableCreateFiltersGeneric .= "`table_indentifier` TEXT DEFAULT '' COMMENT 'categories | products | register', ";

$strSQLTableCreateFiltersGeneric .= "`title` LONGTEXT DEFAULT '', ";
$strSQLTableCreateFiltersGeneric .= "`description` LONGTEXT, ";
$strSQLTableCreateFiltersGeneric .= "`url_alias` TEXT DEFAULT '', ";
$strSQLTableCreateFiltersGeneric .= "`keywords_tags` TEXT DEFAULT '', ";
$strSQLTableCreateFiltersGeneric .= "`meta_description` TEXT DEFAULT '', ";
$strSQLTableCreateFiltersGeneric .= "`meta_title` TEXT DEFAULT '', ";
$strSQLTableCreateFiltersGeneric .= "`meta_info` TEXT DEFAULT '' COMMENT 'Reserved for any aditional configuration - json.', ";

$strSQLTableCreateFiltersGeneric .= "`info_small1` TEXT, ";
$strSQLTableCreateFiltersGeneric .= "`info_small2` TEXT, ";
$strSQLTableCreateFiltersGeneric .= "`info_small3` TEXT, ";
$strSQLTableCreateFiltersGeneric .= "`info_small4` TEXT, ";
$strSQLTableCreateFiltersGeneric .= "`info_small5` TEXT, ";

$strSQLTableCreateFiltersGeneric .= "`number_small1` INT(20) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`number_small2` INT(20) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`number_small3` INT(20) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`number_small4` INT(20) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`number_small5` INT(20) NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGeneric .= "`image_main` TEXT DEFAULT '', ";

$strSQLTableCreateFiltersGeneric .= "`activation` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`activation1` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`activation2` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`activation3` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`activation4` TINYINT(1) NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGeneric .= "`activation5` TINYINT(1) NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGeneric .= "`notes` LONGTEXT DEFAULT '', ";

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
$strTableFiltersGenericBinding = $GLOBALS['configSystemDBTablePrefix'] . "filters_generic_binding";
$strSQLTableCreateFiltersGeneric = "";

$strSQLTableCreateFiltersGenericBinding .= "CREATE TABLE IF NOT EXISTS `$strTableFiltersGenericBinding` (";
$strSQLTableCreateFiltersGenericBinding .= "`id` BIGINT NOT NULL DEFAULT 0, ";
$strSQLTableCreateFiltersGenericBinding .= "`sort_order` DECIMAL(64,30) NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGenericBinding .= "`date_creation` DATETIME, ";
$strSQLTableCreateFiltersGenericBinding .= "`date_edit` DATETIME, ";

$strSQLTableCreateFiltersGenericBinding .= "`id_filters_generic` BIGINT NOT NULL DEFAULT 0, ";
//$strSQLTableCreateFiltersGenericBinding .= "`id_filter_index` INT NOT NULL DEFAULT 0, ";
//$strSQLTableCreateFiltersGenericBinding .= "`table_indentifier` TEXT DEFAULT '', ";
$strSQLTableCreateFiltersGenericBinding .= "`id_record` BIGINT NOT NULL DEFAULT 0, ";

$strSQLTableCreateFiltersGenericBinding .= "`notes` LONGTEXT DEFAULT '', ";

$strSQLTableCreateFiltersGenericBinding .= "PRIMARY KEY (`id`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `id` (`id`), ";
$strSQLTableCreateFiltersGenericBinding .= "KEY `filter_index` (`filter_index`)";
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


//Write config-application-db.php.
//----------------------

//----------------------


//Debug.
echo "configSystemDBTablePrefix = " . $GLOBALS['configSystemDBTablePrefix'] . "<br />";
echo "enableSystemDBSizeOtimize = " . $GLOBALS['enableSystemDBSizeOtimize'] . "<br />";
echo "strTableCounter = " . $GLOBALS['strTableCounter'] . "<br />";
echo "enableCategoriesInfo1 = " . $GLOBALS['enableCategoriesInfo1'] . "<br />";


/*
echo "dbSystemCreateConPDO = <pre>";
var_dump($dbSystemCreateConPDO);
echo "</pre><br />";
*/
?>
