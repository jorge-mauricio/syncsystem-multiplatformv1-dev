<?php
//DB System.
//**************************************************************************************
$dbSystemHost = "192.175.105.180";
$dbSystemDataBase = "dev_db_ss_multiplatformv1";
$dbSystemUser = "usuario_dev";
$dbSystemPassword = "juNh#1803";


//PDO - Connection for various types of data bases.
try
{
    $dbSystemConPDO = new PDO("mysql:host=" . $dbSystemHost . ";dbname=" . $dbSystemDataBase . "", $dbSystemUser, $dbSystemPassword);
	$dbSystemConPDO->exec("set names utf8");
	$dbSystemConPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //Show errors.
}catch(PDOException $DBSystemErrorPDO) {
    //print "Error!: " . $erroDBPDO->getMessage() . "<br/>";
    die("DB Error: " . $DBSystemErrorPDO->getMessage() . "<br />");
}
//**************************************************************************************
?>