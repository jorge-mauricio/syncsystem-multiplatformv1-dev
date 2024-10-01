<?php

declare(strict_types=1);

// DB System.
// Configuration for ad hoc DB scripts.
// **************************************************************************************
$dbSystemHost = getenv('DB_SYSTEM_HOST');
$dbSystemPort = getenv('DB_SYSTEM_PORT');
$dbSystemDataBase = getenv('DB_SYSTEM_DATABASE');
$dbSystemUser = getenv('DB_SYSTEM_USER');
$dbSystemPassword = getenv('DB_SYSTEM_PASSWORD');
$dbSystemCharset = 'utf8';
$dbSystemCollation = 'utf8_general_ci';
// Note: Laravel has these set to charset (utf8mb4) and collation (utf8mb4_unicode_ci).
// Evaluate updating laravel or DB build.

// PDO - Connection for various types of data bases.
// PHP 7.1 - tested.
try {
    $gSystemConfig['dbSystemConPDO'] = new PDO("mysql:host=" . $dbSystemHost . ":" . $dbSystemPort . ";dbname=" . $dbSystemDataBase . "", $dbSystemUser, $dbSystemPassword);
    $gSystemConfig['dbSystemConPDO']->exec("set names utf8");
    $gSystemConfig['dbSystemConPDO']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Show errors.
} catch (PDOException $DBSystemErrorPDO) {
    die('DB Error: ' . $DBSystemErrorPDO->getMessage());
}
// **************************************************************************************

// Debug.
// echo 'dbSystemConPDO = <pre>';
// var_dump($gSystemConfig['dbSystemConPDO']);
// echo '</pre><br />';
// exit();
// die();
