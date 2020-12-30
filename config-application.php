<?php
//Author information.
//**************************************************************************************

//**************************************************************************************


//PHP configuration.
//**************************************************************************************
//Coding style reference: https://www.php-fig.org/psr/psr-12/
//declare(strict_types=1); //causing error somewhere in this code


//Error handling / displaying.
//----------------------
ini_set('display_errors', 1); //Show all errors.
//error_reporting(0); //Ocultar todos erros.
//error_reporting(E_ALL); //alpshost
//error_reporting(E_STRICT & ~E_STRICT); //Locaweb Linux 5.4 | HostGator Linux 5.5 | e 1 (windows)
//error_reporting(E_ALL | E_STRICT);
//error_reporting(error_reporting() & ~E_NOTICE);
//----------------------


//Timezone configuration.
date_default_timezone_set('America/Sao_Paulo');
//**************************************************************************************


//General configuration.
//**************************************************************************************
//Basic information.
$configSystemClientName = "Planejamento Visual";

$configSiteTitle = "SyncSystem - Multiplatform"; //site name
$configSystemName = "Sistema de Gerenciamento de Conteúdo"; //Sistema de Controle | Sistema Administrativo | CRM
$configDevName = "Planejamento Visual - Arte e Tecnologia"; //Jorge Mauricio - Programador Visual | Planejamento Visual - Arte e Tecnologia | Jorge Mauricio - Criação e Treinamento Web | Web Inventor - Imagine, realize.
$configDevSite = "http://www.planejamentovisual.com.br"; //http://www.programadorvisual.com.br | http://www.planejamentovisual.com.br | http://www.jorgemauricio.com | http://www.webinventor.com.br
$configCopyrightYear = "2015";

$configSystemURL = "http://multiplatformv1.syncsystem.com.br";
$configSystemURLSSL = "http://multiplatformv1.syncsystem.com.br";

$configSystemURLImages = ".."; //".." = relative path | http://www.nomedodominio.com.br = absolute path

$configFrontendDefaultView = "frontend_php";
$configFrontendMobileDefaultView = "frontend_php_mobile";


//DB especial configuration.
//----------------------
$configSystemDBTablePrefix = "prefix_ssmv1_";
$configSystemDBType = 2; //2 - MySQL | 3 - SQL Server
$enableSystemDBSizeOtimize = 0; //0-disable (all fields created) | 1-enable (only enabled fields created on database setup)


//Table names.
//TODO: Update db setup file with variable names.
$configSystemDBTableCounter = "counter";
$configSystemDBTableCategories = "categories";
$configSystemDBTableFiles = "files";
$configSystemDBTableFiltersGeneric = "filters_generic";
$configSystemDBTableFiltersGenericBinding = "filters_generic_binding";
//----------------------
//**************************************************************************************


//Categories - configuration and resources.
//**************************************************************************************
$configCategoriesSort = "title"; //options: id | sort_order | date_creation esc | date_creation desc | title
$enableCategoriesSortCustom = 0; //0 - disable | 1 - enable

//Basic resources.
$enableCategoriesImageMain = 1; //0 - disable | 1 - enable
$enableCategoriesDescription = 1; //0 - disable | 1 - enable
$enableCategoriesSortOrder = 1; //0 - disable | 1 - enable
$enableCategoriesRestrictedAccess = 1; //0 - disable | 1 - enable
$enableCategoriesIdParentEdit = 1; //0 - disable | 1 - enable

$configCategoriesURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
$enableCategoriesKeywordsTags = 1; //0 - disable | 1 - enable
$enableCategoriesMetaDescription = 1; //0 - disable | 1 - enable
$enableCategoriesMetaTitle = 1; //0 - disable | 1 - enable

//Pagination.
$enableCategoriesBackendPagination = 1; //0 - disable | 1 - enable
$enableCategoriesBackendPaginationNumbering = 1; //0 - disable | 1 - enable
$configCategoriesBackendPaginationNRecords = 20;

//Resources.
$enableCategoriesImages = 1; //0 - disable | 1 - enable
$enableCategoriesVideos = 1; //0 - disable | 1 - enable
$enableCategoriesFiles = 1; //0 - disable | 1 - enable
$enableCategoriesZip = 1; //0 - disable | 1 - enable


//User bind (link categories to registers).
//----------------------
$enableCategoriesBindRegisterUser = 1; //0 - disable | 1 - enable
$configCategoriesBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
$configCategoriesBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
$configCategoriesBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableCategoriesBindRegister1 = 1; //0 - disable | 1 - enable
$configCategoriesBindRegister1Method = 1; //1 - category ID | 2 - register type
$configCategoriesBindRegister1IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configCategoriesBindRegister1Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableCategoriesBindRegister2 = 1; //0 - disable | 1 - enable
$configCategoriesBindRegister2Method = 1; //1 - category ID | 2 - register type
$configCategoriesBindRegister2IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configCategoriesBindRegister2Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableCategoriesBindRegister3 = 1; //0 - disable | 1 - enable
$configCategoriesBindRegister3Method = 1; //1 - category ID | 2 - register type
$configCategoriesBindRegister3IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configCategoriesBindRegister3Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableCategoriesBindRegister4 = 1; //0 - disable | 1 - enable
$configCategoriesBindRegister4Method = 1; //1 - category ID | 2 - register type
$configCategoriesBindRegister4IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configCategoriesBindRegister4Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableCategoriesBindRegister5 = 1; //0 - disable | 1 - enable
$configCategoriesBindRegister5Method = 1; //1 - category ID | 2 - register type
$configCategoriesBindRegister5IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configCategoriesBindRegister5Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//----------------------


//Optioinal fields (field titles in the language configuration file).
//----------------------
//Big information fields.
$enableCategoriesInfo1 = 1; //0 - disable | 1 - enable
$configCategoriesInfo1FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo2 = 1; //0 - disable | 1 - enable
$configCategoriesInfo2FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo3 = 1; //0 - disable | 1 - enable
$configCategoriesInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo4 = 1; //0 - disable | 1 - enable
$configCategoriesInfo4FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo5 = 1; //0 - disable | 1 - enable
$configCategoriesInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo6 = 1; //0 - disable | 1 - enable
$configCategoriesInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo7 = 1; //0 - disable | 1 - enable
$configCategoriesInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo8 = 1; //0 - disable | 1 - enable
$configCategoriesInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo9 = 1; //0 - disable | 1 - enable
$configCategoriesInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableCategoriesInfo10 = 1; //0 - disable | 1 - enable
$configCategoriesInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Small information fields.
$enableCategoriesInfoS1 = 1; //0 - disable | 1 - enable
$configCategoriesInfoS1FieldType = 1; //1 - single line | 2 - multiline

$enableCategoriesInfoS2 = 1; //0 - disable | 1 - enable
$configCategoriesInfoS2FieldType = 1; //1 - single line | 2 - multiline

$enableCategoriesInfoS3 = 1; //0 - disable | 1 - enable
$configCategoriesInfo3FieldType = 1; //1 - single line | 2 - multiline

$enableCategoriesInfoS4 = 1; //0 - disable | 1 - enable
$configCategoriesInfoS4FieldType = 1; //1 - single line | 2 - multiline

$enableCategoriesInfoS5 = 1; //0 - disable | 1 - enable
$configCategoriesInfoS5FieldType = 1; //1 - single line | 2 - multiline

//Big number fields.
$enableCategoriesNumber1 = 1; //0 - disable | 1 - enable
$configCategoriesNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumber2 = 1; //0 - disable | 1 - enable
$configCategoriesNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumber3 = 1; //0 - disable | 1 - enable
$configCategoriesNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumber4 = 1; //0 - disable | 1 - enable
$configCategoriesNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumber5 = 1; //0 - disable | 1 - enable
$configCategoriesNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

//Small number fields.
$enableCategoriesNumberS1 = 1; //0 - disable | 1 - enable
$configCategoriesNumberS1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumberS2 = 1; //0 - disable | 1 - enable
$configCategoriesNumberS2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumberS3 = 1; //0 - disable | 1 - enable
$configCategoriesNumberS3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumberS4 = 1; //0 - disable | 1 - enable
$configCategoriesNumberS4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

$enableCategoriesNumberS5 = 1; //0 - disable | 1 - enable
$configCategoriesNumberS5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal

//Date fields.
$enableCategoriesDate1 = 1; //0 - disable | 1 - enable
$configCategoriesDate1FieldType = 1; //1 - JQuery DatePicker
$configCategoriesDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableCategoriesDate2 = 1; //0 - disable | 1 - enable
$configCategoriesDate2FieldType = 1; //1 - JQuery DatePicker
$configCategoriesDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableCategoriesDate3 = 1; //0 - disable | 1 - enable
$configCategoriesDate3FieldType = 1; //1 - JQuery DatePicker
$configCategoriesDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableCategoriesDate4 = 1; //0 - disable | 1 - enable
$configCategoriesDate4FieldType = 1; //1 - JQuery DatePicker
$configCategoriesDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableCategoriesDate5 = 1; //0 - disable | 1 - enable
$configCategoriesDate5FieldType = 1; //1 - JQuery DatePicker
$configCategoriesDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
$enableCategoriesFile1 = 1; //0 - disable | 1 - enable
$configCategoriesFile1Type = 1; //1 - image | 3 - file

$enableCategoriesFile2 = 1; //0 - disable | 1 - enable
$configCategoriesFile1Type = 1; //1 - image | 3 - file

$enableCategoriesFile3 = 1; //0 - disable | 1 - enable
$configCategoriesFile1Type = 1; //1 - image | 3 - file

$enableCategoriesFile4 = 1; //0 - disable | 1 - enable
$configCategoriesFile1Type = 1; //1 - image | 3 - file

$enableCategoriesFile5 = 1; //0 - disable | 1 - enable
$configCategoriesFile1Type = 1; //1 - image | 3 - file


//Activation fields.
$enableCategoriesActivation1 = 1; //0 - disable | 1 - enable
$enableCategoriesActivation2 = 1; //0 - disable | 1 - enable
$enableCategoriesActivation3 = 1; //0 - disable | 1 - enable
$enableCategoriesActivation4 = 1; //0 - disable | 1 - enable
$enableCategoriesActivation5 = 1; //0 - disable | 1 - enable
//----------------------


//Frontend configuration.
$enableCategoriesFrontendPagination = 1; //0 - disable | 1 - enable
$enableCategoriesFrontendPaginationNumbering = 1; //0 - disable | 1 - enable
$configCategoriesFrontendPaginationNRecords = 20;
//**************************************************************************************


//Files - configuration and resources.
//**************************************************************************************
$configFilesSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | caption
$enableFilesSortCustom = 1; //0 - disable | 1 - enable
$configFilesInputOrder = ["inputRowFiles_id_parent", 
                                            "inputRowFiles_sort_order", 
                                            "inputRowFiles_date1", 
                                            "inputRowFiles_id_register_user", 
                                            "inputRowFiles_title", 
                                            "inputRowFiles_description", 
                                            "inputRowFiles_url_alias", 
                                            "inputRowFiles_meta_title", 
                                            "inputRowFiles_meta_description", 
                                            "inputRowFiles_keywords_tags", 
                                            "inputRowFiles_info1", 
                                            "inputRowFiles_info_small1", 
                                            "inputRowFiles_number1", 
                                            "inputRowFiles_number_small1", 
                                            "inputRowFiles_category_type", 
                                            "inputRowFiles_image_main", 
                                            "inputRowFiles_file1", 
                                            "inputRowFiles_file2", 
                                            "inputRowFiles_activation", 
                                            "inputRowFiles_id_restricted_access", 
                                            "inputRowFiles_id_status", 
                                            "inputRowFiles_notes"
                                          ];

//Basic resources.
$enableFilesIdParentEdit = 1; //0 - disable | 1 - enable
$enableFilesSortOrder = 1; //0 - disable | 1 - enable

$enableFilesTitle = 1; //0 - disable | 1 - enable
$enableFilesDescription = 1; //0 - disable | 1 - enable
$enableFilesHTMLCode = 1; //0 - disable | 1 - enable
$enableFilesThumbnails = 1; //0 - disable | 1 - enable //Thumbnails for video files.

$configFilesURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
$enableFilesKeywordsTags = 1; //0 - disable | 1 - enable
$enableFilesMetaDescription = 1; //0 - disable | 1 - enable
$enableFilesMetaTitle = 1; //0 - disable | 1 - enable
$enableFilesNotes = 1; //0 - disable | 1 - enable


//Pagination.
$enableFilesBackendPagination = 1; //0 - disable | 1 - enable
$enableFilesBackendPaginationNumbering = 1; //0 - disable | 1 - enable
$configFilesBackendPaginationNRecords = 15;


//Optioinal fields (field titles in the language configuration file).
//Big information fields.
$enableFilesInfo1 = 1; //0 - disable | 1 - enable
$configFilesInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableFilesInfo2 = 1; //0 - disable | 1 - enable
$configFilesInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableFilesInfo3 = 1; //0 - disable | 1 - enable
$configFilesInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableFilesInfo4 = 1; //0 - disable | 1 - enable
$configFilesInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableFilesInfo5 = 1; //0 - disable | 1 - enable
$configFilesInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Small information fields.
$enableFilesInfoS1 = 1; //0 - disable | 1 - enable
$configFilesInfoS1FieldType = 2; //1 - single line | 2 - multiline

$enableFilesInfoS2 = 1; //0 - disable | 1 - enable
$configFilesInfoS2FieldType = 1; //1 - single line | 2 - multiline

$enableFilesInfoS3 = 1; //0 - disable | 1 - enable
$configFilesInfoS3FieldType = 1; //1 - single line | 2 - multiline

$enableFilesInfoS4 = 1; //0 - disable | 1 - enable
$configFilesInfoS4FieldType = 1; //1 - single line | 2 - multiline

$enableFilesInfoS5 = 1; //0 - disable | 1 - enable
$configFilesInfoS5FieldType = 1; //1 - single line | 2 - multiline

//Big number fields (up to 34 digits).
$enableFilesNumber1 = 1; //0 - disable | 1 - enable
$configFilesNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableFilesNumber2 = 1; //0 - disable | 1 - enable
$configFilesNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableFilesNumber3 = 1; //0 - disable | 1 - enable
$configFilesNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableFilesNumber4 = 1; //0 - disable | 1 - enable
$configFilesNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableFilesNumber5 = 1; //0 - disable | 1 - enable
$configFilesNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

//Small number fields (up to 9 digits).
$enableFilesNumberS1 = 1; //0 - disable | 1 - enable
$configFilesNumberS1FieldType = 2; //1 - general number | 2 - system currency

$enableFilesNumberS2 = 1; //0 - disable | 1 - enable
$configFilesNumberS2FieldType = 1; //1 - general number | 2 - system currency

$enableFilesNumberS3 = 1; //0 - disable | 1 - enable
$configFilesNumberS3FieldType = 1; //1 - general number | 2 - system currency

$enableFilesNumberS4 = 1; //0 - disable | 1 - enable
$configFilesNumberS4FieldType = 1; //1 - general number | 2 - system currency

$enableFilesNumberS5 = 1; //0 - disable | 1 - enable
$configFilesNumberS5FieldType = 1; //1 - general number | 2 - system currency

//Date fields.
$enableFilesDate1 = 1; //0 - disable | 1 - enable
$configFilesDate1FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configFilesDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

$enableFilesDate2 = 1; //0 - disable | 1 - enable
$configFilesDate2FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configFilesDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableFilesDate3 = 1; //0 - disable | 1 - enable
$configFilesDate3FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configFilesDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableFilesDate4 = 1; //0 - disable | 1 - enable
$configFilesDate4FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configFilesDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableFilesDate5 = 1; //0 - disable | 1 - enable
$configFilesDate5FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configFilesDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
$enableFilesFile1 = 1; //0 - disable | 1 - enable
$configFilesFile1Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableFilesFile2 = 1; //0 - disable | 1 - enable
$configFilesFile2Type = 34; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableFilesFile3 = 1; //0 - disable | 1 - enable
$configFilesFile3Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableFilesFile4 = 1; //0 - disable | 1 - enable
$configFilesFile4Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableFilesFile5 = 1; //0 - disable | 1 - enable
$configFilesFile5Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

//Activation fields.
$enableFilesActivation1 = 1; //0 - disable | 1 - enable
$enableFilesActivation2 = 1; //0 - disable | 1 - enable
$enableFilesActivation3 = 1; //0 - disable | 1 - enable
$enableFilesActivation4 = 1; //0 - disable | 1 - enable
$enableFilesActivation5 = 1; //0 - disable | 1 - enable
//----------------------


//Frontend configuration.
$configFilesImagePlaceholder = 1; //0 - disable | 1 - enable


$enableFilesFrontendPagination = 1; //0 - disable | 1 - enable (custom) | 11 - enable (bootstrap)
$enableFilesFrontendPaginationNumbering = 1; //0 - disable | 1 - enable
$configFilesFrontendPaginationNRecords = 10;
//**************************************************************************************



?>