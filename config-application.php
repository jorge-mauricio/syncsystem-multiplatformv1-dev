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
$configSystemDBTableContent = "content";
$configSystemDBTableProducts = "products";
$configSystemDBTablePublications = "publications";
$configSystemDBTableForms = "forms";
$configSystemDBTableFormsFields = "forms_fields";
$configSystemDBTableFormsFieldsOptions = "forms_fields_options";
$configSystemDBTableFiltersGeneric = "filters_generic";
$configSystemDBTableFiltersGenericBinding = "filters_generic_binding";
$configSystemDBTableUsers = "users";
//----------------------


//e-mail configuration.
//----------------------
$configEmailComponent = 1; //1 - 
$configEmailFormat = 1; //0 - text | 1 - HTML
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


//Content - configuration and resources.
//**************************************************************************************
$configContentSort = "id ASC"; //options: id | sort_order | date_creation esc | date_creation desc
$enableContentSortCustom = 1; //0 - disable | 1 - enable
/*$configContentInputOrder = ["inputRowContent_id_parent", 
                                            "inputRowContent_sort_order", 
                                            "inputRowContent_date1", 
                                            "inputRowContent_id_register_user", 
                                            "inputRowContent_content_type", 
                                            "inputRowContent_content_columns", 
                                            "inputRowContent_align_text", 
                                            "inputRowContent_align_image", 
                                            "inputRowContent_content", 
                                            "inputRowContent_content_url", 
                                            "inputRowContent_caption", 
                                            "inputRowContent_file", 
                                            "inputRowContent_activation"
                                          ];*/

//Basic resources.
$enableContentSortOrder = 1; //0 - disable | 1 - enable
$enableContentIdParentEdit = 1; //0 - disable | 1 - enable
$enableContentURL = 1; //0 - disable | 1 - enable
//$enableContentCaption = 1; //0 - disable | 1 - enable
$enableContentHTML = 1; //0 - disable | 1 - enable
$enableContentFiles = 1; //0 - disable | 1 - enable
$enableContentVideos = 1; //0 - disable | 1 - enable
$enableContentFileThumbnail = 1; //0 - disable | 1 - enable
$enableContentColumns = 1; //0 - disable | 1 - enable
$enableContentImageNoResize = 1; //0 - disable | 1 - enable

$enableContentBindRegisterUser = 1; //0 - disable | 1 - enable
$configContentBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
$configContentBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
$configContentBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//**************************************************************************************


//Products - configuration and resources.
//**************************************************************************************
$configProductsSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
$enableProductsSortCustom = 1; //0 - disable | 1 - enable
$configProductsInputOrder = ["inputRowProducts_id_parent", 
                                            "inputRowProducts_sort_order", 
                                            "inputRowProducts_date1", 
                                            "inputRowProducts_id_register_user", 
                                            "inputRowProducts_title", 
                                            "inputRowProducts_description", 
                                            "inputRowProducts_url_alias", 
                                            "inputRowProducts_meta_title", 
                                            "inputRowProducts_meta_description", 
                                            "inputRowProducts_keywords_tags", 
                                            "inputRowProducts_info1", 
                                            "inputRowProducts_info_small1", 
                                            "inputRowProducts_number1", 
                                            "inputRowProducts_number_small1", 
                                            "inputRowProducts_image_main", 
                                            "inputRowProducts_file1", 
                                            "inputRowProducts_file2", 
                                            "inputRowProducts_activation", 
                                            "inputRowProducts_id_restricted_access", 
                                            "inputRowProducts_id_status", 
                                            "inputRowProducts_notes"
                                          ];

//Basic resources.
$enableProductsIdParentEdit = 1; //0 - disable | 1 - enable
$enableProductsSortOrder = 1; //0 - disable | 1 - enable
$enableProductsType = 1; //0 - disable | 1 - enable
$enableProductsCode = 1; //0 - disable | 1 - enable
$enableProductsDescription = 1; //0 - disable | 1 - enable
$enableProductsValue = 1; //0 - disable | 1 - enable
$enableProductsValue1 = 1; //0 - disable | 1 - enable
$enableProductsValue2 = 1; //0 - disable | 1 - enable
$enableProductsWeight = 1; //0 - disable | 1 - enable
$enableProductsCoefficient = 1; //0 - disable | 1 - enable
$enableProductsImageMain = 1; //0 - disable | 1 - enable
$enableProductsImageMainCaption = 1; //0 - disable | 1 - enable
$enableProductsStatus = 1; //0 - disable | 1 - enable
$enableProductsRestrictedAccess = 1; //0 - disable | 1 - enable
$enableProductsNotes = 1; //0 - disable | 1 - enable

$configProductsURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
$enableProductsKeywordsTags = 1; //0 - disable | 1 - enable
$enableProductsMetaDescription = 1; //0 - disable | 1 - enable
$enableProductsMetaTitle = 1; //0 - disable | 1 - enable

//Pagination.
$enableProductsBackendPagination = 1; //0 - disable | 1 - enable
$enableProductsBackendPaginationNumbering = 1; //0 - disable | 1 - enable
$configProductsBackendPaginationNRecords = 15;

//Resources.
$enableProductsImages = 1; //0 - disable | 1 - enable
$enableProductsVideos = 1; //0 - disable | 1 - enable
$enableProductsFiles = 1; //0 - disable | 1 - enable
$enableProductsZip = 1; //0 - disable | 1 - enable
                   

//User bind (link categories to registers).
//----------------------
$enableProductsBindRegisterUser = 1; //0 - disable | 1 - enable
$configProductsBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
$configProductsBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
$configProductsBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableProductsBindRegister1 = 1; //0 - disable | 1 - enable
$configProductsBindRegister1Method = 1; //1 - category ID | 2 - register type
$configProductsBindRegister1IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configProductsBindRegister1Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableProductsBindRegister2 = 1; //0 - disable | 1 - enable
$configProductsBindRegister2Method = 1; //1 - category ID | 2 - register type
$configProductsBindRegister2IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configProductsBindRegister2Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableProductsBindRegister3 = 1; //0 - disable | 1 - enable
$configProductsBindRegister3Method = 1; //1 - category ID | 2 - register type
$configProductsBindRegister3IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configProductsBindRegister3Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableProductsBindRegister4 = 1; //0 - disable | 1 - enable
$configProductsBindRegister4Method = 1; //1 - category ID | 2 - register type
$configProductsBindRegister4IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configProductsBindRegister4Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableProductsBindRegister5 = 1; //0 - disable | 1 - enable
$configProductsBindRegister5Method = 1; //1 - category ID | 2 - register type
$configProductsBindRegister5IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configProductsBindRegister5Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//----------------------


//Optional fields (field titles in the language configuration file).
//----------------------
//Generic filters.
$enableProductsFilterGeneric1 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric2 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric3 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric4 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric5 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric6 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric7 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric8 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric9 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric10 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric11 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric12 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric13 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric14 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric15 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric16 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric17 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric18 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric19 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric20 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric21 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric22 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric23 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric24 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric25 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric26 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric27 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric28 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric29 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enableProductsFilterGeneric30 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio


//Big information fields.
$enableProductsInfo1 = 1; //0 - disable | 1 - enable
$configProductsInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo2 = 1; //0 - disable | 1 - enable
$configProductsInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo3 = 1; //0 - disable | 1 - enable
$configProductsInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo4 = 1; //0 - disable | 1 - enable
$configProductsInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo5 = 1; //0 - disable | 1 - enable
$configProductsInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo6 = 1; //0 - disable | 1 - enable
$configProductsInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo7 = 1; //0 - disable | 1 - enable
$configProductsInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo8 = 1; //0 - disable | 1 - enable
$configProductsInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo9 = 1; //0 - disable | 1 - enable
$configProductsInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo10 = 1; //0 - disable | 1 - enable
$configProductsInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo11 = 1; //0 - disable | 1 - enable
$configProductsInfo11FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo12 = 1; //0 - disable | 1 - enable
$configProductsInfo12FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo13 = 1; //0 - disable | 1 - enable
$configProductsInfo13FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo14 = 1; //0 - disable | 1 - enable
$configProductsInfo14FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo15 = 1; //0 - disable | 1 - enable
$configProductsInfo15FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo16 = 1; //0 - disable | 1 - enable
$configProductsInfo16FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo17 = 1; //0 - disable | 1 - enable
$configProductsInfo17FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo18 = 1; //0 - disable | 1 - enable
$configProductsInfo18FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo19 = 1; //0 - disable | 1 - enable
$configProductsInfo19FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableProductsInfo20 = 1; //0 - disable | 1 - enable
$configProductsInfo20FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Small information fields.
$enableProductsInfoS1 = 1; //0 - disable | 1 - enable
$configProductsInfoS1FieldType = 2; //1 - single line | 2 - multiline

$enableProductsInfoS2 = 1; //0 - disable | 1 - enable
$configProductsInfoS2FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS3 = 1; //0 - disable | 1 - enable
$configProductsInfoS3FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS4 = 1; //0 - disable | 1 - enable
$configProductsInfoS4FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS5 = 1; //0 - disable | 1 - enable
$configProductsInfoS5FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS6 = 1; //0 - disable | 1 - enable
$configProductsInfoS6FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS7 = 1; //0 - disable | 1 - enable
$configProductsInfoS7FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS8 = 1; //0 - disable | 1 - enable
$configProductsInfoS8FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS9 = 1; //0 - disable | 1 - enable
$configProductsInfoS9FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS10 = 1; //0 - disable | 1 - enable
$configProductsInfoS10FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS11 = 1; //0 - disable | 1 - enable
$configProductsInfoS11FieldType = 2; //1 - single line | 2 - multiline

$enableProductsInfoS12 = 1; //0 - disable | 1 - enable
$configProductsInfoS12FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS13 = 1; //0 - disable | 1 - enable
$configProductsInfoS13FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS14 = 1; //0 - disable | 1 - enable
$configProductsInfoS14FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS15 = 1; //0 - disable | 1 - enable
$configProductsInfoS15FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS16 = 1; //0 - disable | 1 - enable
$configProductsInfoS16FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS17 = 1; //0 - disable | 1 - enable
$configProductsInfoS17FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS18 = 1; //0 - disable | 1 - enable
$configProductsInfoS18FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS19 = 1; //0 - disable | 1 - enable
$configProductsInfoS19FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS20 = 1; //0 - disable | 1 - enable
$configProductsInfoS20FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS21 = 1; //0 - disable | 1 - enable
$configProductsInfoS21FieldType = 2; //1 - single line | 2 - multiline

$enableProductsInfoS22 = 1; //0 - disable | 1 - enable
$configProductsInfoS22FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS23 = 1; //0 - disable | 1 - enable
$configProductsInfoS23FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS24 = 1; //0 - disable | 1 - enable
$configProductsInfoS24FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS25 = 1; //0 - disable | 1 - enable
$configProductsInfoS25FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS26 = 1; //0 - disable | 1 - enable
$configProductsInfoS26FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS27 = 1; //0 - disable | 1 - enable
$configProductsInfoS27FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS28 = 1; //0 - disable | 1 - enable
$configProductsInfoS28FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS29 = 1; //0 - disable | 1 - enable
$configProductsInfoS29FieldType = 1; //1 - single line | 2 - multiline

$enableProductsInfoS30 = 1; //0 - disable | 1 - enable
$configProductsInfoS30FieldType = 1; //1 - single line | 2 - multiline

//Big number fields (up to 34 digits).
$enableProductsNumber1 = 1; //0 - disable | 1 - enable
$configProductsNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableProductsNumber2 = 1; //0 - disable | 1 - enable
$configProductsNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableProductsNumber3 = 1; //0 - disable | 1 - enable
$configProductsNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableProductsNumber4 = 1; //0 - disable | 1 - enable
$configProductsNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enableProductsNumber5 = 1; //0 - disable | 1 - enable
$configProductsNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

//Small number fields (up to 9 digits).
$enableProductsNumberS1 = 1; //0 - disable | 1 - enable
$configProductsNumberS1FieldType = 2; //1 - general number | 2 - system currency

$enableProductsNumberS2 = 1; //0 - disable | 1 - enable
$configProductsNumberS2FieldType = 1; //1 - general number | 2 - system currency

$enableProductsNumberS3 = 1; //0 - disable | 1 - enable
$configProductsNumberS3FieldType = 1; //1 - general number | 2 - system currency

$enableProductsNumberS4 = 1; //0 - disable | 1 - enable
$configProductsNumberS4FieldType = 1; //1 - general number | 2 - system currency

$enableProductsNumberS5 = 1; //0 - disable | 1 - enable
$configProductsNumberS5FieldType = 1; //1 - general number | 2 - system currency

//URLs.
$enableProductsURL1 = 1; //0 - disable | 1 - enable
$enableProductsURL2 = 1; //0 - disable | 1 - enable
$enableProductsURL3 = 1; //0 - disable | 1 - enable
$enableProductsURL4 = 1; //0 - disable | 1 - enable
$enableProductsURL5 = 1; //0 - disable | 1 - enable

//Date fields.
$enableProductsDate1 = 1; //0 - disable | 1 - enable
$configProductsDate1FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configProductsDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

$enableProductsDate2 = 1; //0 - disable | 1 - enable
$configProductsDate2FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configProductsDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableProductsDate3 = 1; //0 - disable | 1 - enable
$configProductsDate3FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configProductsDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableProductsDate4 = 1; //0 - disable | 1 - enable
$configProductsDate4FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configProductsDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enableProductsDate5 = 1; //0 - disable | 1 - enable
$configProductsDate5FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configProductsDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
$enableProductsFile1 = 1; //0 - disable | 1 - enable
$configProductsFile1Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableProductsFile2 = 1; //0 - disable | 1 - enable
$configProductsFile2Type = 34; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableProductsFile3 = 1; //0 - disable | 1 - enable
$configProductsFile3Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableProductsFile4 = 1; //0 - disable | 1 - enable
$configProductsFile4Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enableProductsFile5 = 1; //0 - disable | 1 - enable
$configProductsFile5Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

//Activation fields.
$enableProductsActivation1 = 1; //0 - disable | 1 - enable
$enableProductsActivation2 = 1; //0 - disable | 1 - enable
$enableProductsActivation3 = 1; //0 - disable | 1 - enable
$enableProductsActivation4 = 1; //0 - disable | 1 - enable
$enableProductsActivation5 = 1; //0 - disable | 1 - enable
//**************************************************************************************


//Publications - configuration and resources.
//**************************************************************************************
$configPublicationsSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
$enablePublicationsSortCustom = 1; //0 - disable | 1 - enable
$configPublicationsInputOrder = ["inputRowPublications_id_parent", 
                                  "inputRowPublications_sort_order", 
                                  "inputRowPublications_date1", 
                                  "inputRowPublications_id_register_user", 
                                  "inputRowPublications_title", 
                                  "inputRowPublications_description", 
                                  "inputRowPublications_url_alias", 
                                  "inputRowPublications_meta_title", 
                                  "inputRowPublications_meta_description", 
                                  "inputRowPublications_keywords_tags", 
                                  "inputRowPublications_info1", 
                                  "inputRowPublications_number1", 
                                  "inputRowPublications_image_main", 
                                  "inputRowPublications_file1", 
                                  "inputRowPublications_file2", 
                                  "inputRowPublications_activation", 
                                  "inputRowPublications_id_restricted_access", 
                                  "inputRowPublications_id_status", 
                                  "inputRowPublications_notes"
                                ];

//Basic resources.
$enablePublicationsIdParentEdit = 1; //0 - disable | 1 - enable
$enablePublicationsSortOrder = 1; //0 - disable | 1 - enable
$enablePublicationsDateStart = 11; //0 - disable | 2 - dropdown menu | 11 - js-datepicker 
$enablePublicationsDateEnd = 11; //0 - disable | 2 - dropdown menu | 11 - js-datepicker 
$enablePublicationsDescription = 1; //0 - disable | 1 - enable
$enablePublicationsSource = 1; //0 - disable | 1 - enable
$enablePublicationsSourceURL = 1; //0 - disable | 1 - enable
$enablePublicationsImageMain = 1; //0 - disable | 1 - enable
$enablePublicationsImageMainCaption = 1; //0 - disable | 1 - enable
$enablePublicationsStatus = 1; //0 - disable | 1 - enable
$enablePublicationsRestrictedAccess = 1; //0 - disable | 1 - enable
$enablePublicationsNotes = 1; //0 - disable | 1 - enable

$configPublicationsURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
$enablePublicationsKeywordsTags = 1; //0 - disable | 1 - enable
$enablePublicationsMetaDescription = 1; //0 - disable | 1 - enable
$enablePublicationsMetaTitle = 1; //0 - disable | 1 - enable

//Pagination.
$enablePPublicationsBackendPagination = 1; //0 - disable | 1 - enable
$enablePPublicationsBackendPaginationNumbering = 1; //0 - disable | 1 - enable
$configPPublicationsBackendPaginationNRecords = 15;

//Resources.
$enablePPublicationsImages = 1; //0 - disable | 1 - enable
$enablePPublicationsVideos = 1; //0 - disable | 1 - enable
$enablePPublicationsFiles = 1; //0 - disable | 1 - enable
$enablePPublicationsZip = 1; //0 - disable | 1 - enable
                   

//User bind (link categories to registers).
//----------------------
$enablePublicationsBindRegisterUser = 1; //0 - disable | 1 - enable
$configPublicationsBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
$configPublicationsBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
$configPublicationsBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enablePublicationsBindRegister1 = 1; //0 - disable | 1 - enable
$configPublicationsBindRegister1Method = 1; //1 - category ID | 2 - register type
$configPublicationsBindRegister1IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configPublicationsBindRegister1Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enablePublicationsBindRegister2 = 1; //0 - disable | 1 - enable
$configPublicationsBindRegister2Method = 1; //1 - category ID | 2 - register type
$configPublicationsBindRegister2IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configPublicationsBindRegister2Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enablePublicationsBindRegister3 = 1; //0 - disable | 1 - enable
$configPublicationsBindRegister3Method = 1; //1 - category ID | 2 - register type
$configPublicationsBindRegister3IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configPublicationsBindRegister3Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enablePublicationsBindRegister4 = 1; //0 - disable | 1 - enable
$configPublicationsBindRegister4Method = 1; //1 - category ID | 2 - register type
$configPublicationsBindRegister4IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configPublicationsBindRegister4Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enablePublicationsBindRegister5 = 1; //0 - disable | 1 - enable
$configPublicationsBindRegister5Method = 1; //1 - category ID | 2 - register type
$configPublicationsBindRegister5IDReference = 3892; //category ID / register type ID | 0 - all register categories
$configPublicationsBindRegister5Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//----------------------


//Optional fields (field titles in the language configuration file).
//----------------------
//Generic filters.
$enablePublicationsFilterGeneric1 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric2 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric3 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric4 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric5 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric6 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric7 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric8 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric9 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
$enablePublicationsFilterGeneric10 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio


//Big information fields.
$enablePublicationsInfo1 = 1; //0 - disable | 1 - enable
$configPublicationsInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo2 = 1; //0 - disable | 1 - enable
$configPublicationsInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo3 = 1; //0 - disable | 1 - enable
$configPublicationsInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo4 = 1; //0 - disable | 1 - enable
$configPublicationsInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo5 = 1; //0 - disable | 1 - enable
$configPublicationsInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo6 = 1; //0 - disable | 1 - enable
$configPublicationsInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo7 = 1; //0 - disable | 1 - enable
$configPublicationsInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo8 = 1; //0 - disable | 1 - enable
$configPublicationsInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo9 = 1; //0 - disable | 1 - enable
$configPublicationsInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enablePublicationsInfo10 = 1; //0 - disable | 1 - enable
$configPublicationsInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Big number fields (up to 34 digits).
$enablePublicationsNumber1 = 1; //0 - disable | 1 - enable
$configPublicationsNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enablePublicationsNumber2 = 1; //0 - disable | 1 - enable
$configPublicationsNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enablePublicationsNumber3 = 1; //0 - disable | 1 - enable
$configPublicationsNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enablePublicationsNumber4 = 1; //0 - disable | 1 - enable
$configPublicationsNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

$enablePublicationsNumber5 = 1; //0 - disable | 1 - enable
$configPublicationsNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

//URLs.
$enablePublicationsURL1 = 1; //0 - disable | 1 - enable
$enablePublicationsURL2 = 1; //0 - disable | 1 - enable
$enablePublicationsURL3 = 1; //0 - disable | 1 - enable
$enablePublicationsURL4 = 1; //0 - disable | 1 - enable
$enablePublicationsURL5 = 1; //0 - disable | 1 - enable

//Date fields.
$enablePublicationsDate1 = 1; //0 - disable | 1 - enable
$configPublicationsDate1FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configPublicationsDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

$enablePublicationsDate2 = 1; //0 - disable | 1 - enable
$configPublicationsDate2FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configPublicationsDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enablePublicationsDate3 = 1; //0 - disable | 1 - enable
$configPublicationsDate3FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configPublicationsDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enablePublicationsDate4 = 1; //0 - disable | 1 - enable
$configPublicationsDate4FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configPublicationsDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

$enablePublicationsDate5 = 1; //0 - disable | 1 - enable
$configPublicationsDate5FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
$configPublicationsDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
$enablePublicationsFile1 = 1; //0 - disable | 1 - enable
$configPublicationsFile1Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enablePublicationsFile2 = 1; //0 - disable | 1 - enable
$configPublicationsFile2Type = 34; //1 - image | 3 - file (download) | 34 - file (open direct)

$enablePublicationsFile3 = 1; //0 - disable | 1 - enable
$configPublicationsFile3Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enablePublicationsFile4 = 1; //0 - disable | 1 - enable
$configPublicationsFile4Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

$enablePublicationsFile5 = 1; //0 - disable | 1 - enable
$configPublicationsFile5Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

//Activation fields.
$enablePublicationsActivation1 = 1; //0 - disable | 1 - enable
$enablePublicationsActivation2 = 1; //0 - disable | 1 - enable
$enablePublicationsActivation3 = 1; //0 - disable | 1 - enable
$enablePublicationsActivation4 = 1; //0 - disable | 1 - enable
$enablePublicationsActivation5 = 1; //0 - disable | 1 - enable
//**************************************************************************************


//Forms - configuration and resources.
//**************************************************************************************
$configFormsSort = "id DESC"; //options: id | sort_order | form_title | recipient_name | recipient_email
$configFormsFieldsSort = "id DESC"; //options: id | sort_order
$configFormsFieldsOptionsSort = "id DESC"; //options: id | sort_order

//Forms.
//----------------------
$enableFormsIdParentEdit = 1; //0 - disable | 1 - enable
$enableFormsSortOrder = 1; //0 - disable | 1 - enable

$enableFormsBindRegisterUser = 1; //0 - disable | 1 - enable
$configFormsBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
$configFormsBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
$configFormsBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

$enableFormsRecipientEmailCopy = 1; //0 - disable | 1 - enable
$enableFormsSender = 1; //0 - disable | 1 - enable
$enableFormsSenderConfig = 1; //0 - disable | 1 - enable
$enableFormsEmailFormat = 1; //0 - disable | 1 - enable
$enableFormsMessageSuccess = 1; //0 - disable | 1 - enable
$enableFormsNotes = 1; //0 - disable | 1 - enable

$enableFormsEmailSectors = 1; //0 - disable | 1 - enable
//----------------------


//Forms fields.
//----------------------
$enableFormsFieldsSortOrder = 1; //0 - disable | 1 - enable
$enableFormsFieldsInstructions = 1; //0 - disable | 1 - enable

$enableFormsFieldsFieldFilter = 1; //0 - disable | 1 - enable
$configFormsFieldsFieldFilter = ["email"]; //email

$enableFormsFieldsRequired = 1; //0 - disable | 1 - enable

$enableFormsFieldTypeExtraOptions = 1; //0 - disable | 1 - enable (text, subheader, etc)

//Optional fields (field titles in the language configuration file).
//Small information fields.
$enableFormsFieldsInfoS1 = 1; //0 - disable | 1 - enable
$configFormsFieldsInfoS1FieldType = 2; //1 - single line | 2 - multiline

$enableFormsFieldsInfoS2 = 1; //0 - disable | 1 - enable
$configFormsFieldsInfoS2FieldType = 1; //1 - single line | 2 - multiline

$enableFormsFieldsInfoS3 = 1; //0 - disable | 1 - enable
$configFormsFieldsInfoS3FieldType = 1; //1 - single line | 2 - multiline

$enableFormsFieldsInfoS4 = 1; //0 - disable | 1 - enable
$configFormsFieldsInfoS4FieldType = 1; //1 - single line | 2 - multiline

$enableFormsFieldsInfoS5 = 1; //0 - disable | 1 - enable
$configFormsFieldsInfoS5FieldType = 1; //1 - single line | 2 - multiline
//----------------------

//Forms fields options.
$enableFormsFieldsOptionsSortOrder = 1; //0 - disable | 1 - enable
$enableFormsFieldsOptionsConfigSelection = 1; //0 - disable | 1 - enable
$enableFormsFieldsOptionsImageMain = 1; //0 - disable | 1 - enable

//Optional fields (field titles in the language configuration file).
//Small information fields.
$enableFormsFieldsOptionsInfoS1 = 1; //0 - disable | 1 - enable
$configFormsFieldsOptionsInfoS1FieldType = 2; //1 - single line | 2 - multiline

$enableFormsFieldsOptionsInfoS2 = 1; //0 - disable | 1 - enable
$configFormsFieldsOptionsInfoS2FieldType = 1; //1 - single line | 2 - multiline

$enableFormsFieldsOptionsInfoS3 = 1; //0 - disable | 1 - enable
$configFormsFieldsOptionsInfoS3FieldType = 1; //1 - single line | 2 - multiline

$enableFormsFieldsOptionsInfoS4 = 1; //0 - disable | 1 - enable
$configFormsFieldsOptionsInfoS4FieldType = 1; //1 - single line | 2 - multiline

$enableFormsFieldsOptionsInfoS5 = 1; //0 - disable | 1 - enable
$configFormsFieldsOptionsInfoS5FieldType = 1; //1 - single line | 2 - multiline

//Site.

//**************************************************************************************


//Filters Generic - configuration and resources.
//**************************************************************************************
$configFiltersGenericSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
$enableFiltersGenericSortCustom = 1; //0 - disable | 1 - enable
$configFiltersGenericInputOrder = ["inputRowFiltersGeneric_id_parent", 
                                    "inputRowFiltersGeneric_sort_order", 
                                    "inputRowFiltersGeneric_id_register_user", 
                                    "inputRowFiltersGeneric_title", 
                                    "inputRowFiltersGeneric_description", 
                                    "inputRowFiltersGeneric_url_alias", 
                                    "inputRowFiltersGeneric_meta_title", 
                                    "inputRowFiltersGeneric_meta_description", 
                                    "inputRowFiltersGeneric_keywords_tags", 
                                    "inputRowFiltersGeneric_info_small1", 
                                    "inputRowFiltersGeneric_number_small1", 
                                    "inputRowFiltersGeneric_image_main", 
                                    "inputRowFiltersGeneric_activation", 
                                    "inputRowFiltersGeneric_notes"
                                  ];

//Basic resources.
$enableFiltersGenericSortOrder = 1; //0 - disable | 1 - enable
$enableFiltersGenericDescription = 1; //0 - disable | 1 - enable
$enableFiltersGenericImageMain = 1; //0 - disable | 1 - enable
$enableFiltersGenericConfigSelection = 1; //0 - disable | 1 - enable
$enableFiltersGenericNotes = 1; //0 - disable | 1 - enable
//TODO: change name on DB

$configFiltersGenericURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
$enableFiltersGenericKeywordsTags = 1; //0 - disable | 1 - enable
$enableFiltersGenericMetaDescription = 1; //0 - disable | 1 - enable
$enableFiltersGenericMetaTitle = 1; //0 - disable | 1 - enable

//Small information fields.
$enableFiltersGenericInfoS1 = 1; //0 - disable | 1 - enable
$configFiltersGenericInfoS1FieldType = 2; //1 - single line | 2 - multiline

$enableFiltersGenericInfoS2 = 1; //0 - disable | 1 - enable
$configFiltersGenericInfoS2FieldType = 1; //1 - single line | 2 - multiline

$enableFiltersGenericInfoS3 = 1; //0 - disable | 1 - enable
$configFiltersGenericInfoS3FieldType = 1; //1 - single line | 2 - multiline

$enableFiltersGenericInfoS4 = 1; //0 - disable | 1 - enable
$configFiltersGenericInfoS4FieldType = 1; //1 - single line | 2 - multiline

$enableFiltersGenericInfoS5 = 1; //0 - disable | 1 - enable
$configFiltersGenericInfoS5FieldType = 1; //1 - single line | 2 - multiline

//Small number fields (up to 9 digits).
$enableFiltersGenericNumberS1 = 1; //0 - disable | 1 - enable
$configFiltersGenericNumberS1FieldType = 2; //1 - general number | 2 - system currency

$enableFiltersGenericNumberS2 = 1; //0 - disable | 1 - enable
$configFiltersGenericNumberS2FieldType = 1; //1 - general number | 2 - system currency

$enableFiltersGenericNumberS3 = 1; //0 - disable | 1 - enable
$configFiltersGenericNumberS3FieldType = 1; //1 - general number | 2 - system currency

$enableFiltersGenericNumberS4 = 1; //0 - disable | 1 - enable
$configFiltersGenericNumberS4FieldType = 1; //1 - general number | 2 - system currency

$enableFiltersGenericNumberS5 = 1; //0 - disable | 1 - enable
$configFiltersGenericNumberS5FieldType = 1; //1 - general number | 2 - system currency

//Activation fields.
$enableFiltersGenericActivation1 = 1; //0 - disable | 1 - enable
$enableFiltersGenericActivation2 = 1; //0 - disable | 1 - enable
$enableFiltersGenericActivation3 = 1; //0 - disable | 1 - enable
$enableFiltersGenericActivation4 = 1; //0 - disable | 1 - enable
$enableFiltersGenericActivation5 = 1; //0 - disable | 1 - enable


//Frontend configuration.
$configFiltersGenericImagePlaceholder = 1; //0 - disable | 1 - enable
//**************************************************************************************


//Users.
//**************************************************************************************
$configUsersSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
$enableUsersSortCustom = 1; //0 - disable | 1 - enable
$configUsersInputOrder = ["inputRowUsers_id_parent", 
                                        "inputRowUsers_sort_order", 
                                        "inputRowUsers_name", 
                                        "inputRowUsers_info1", 
                                        "inputRowUsers_image_main", 
                                        "inputRowUsers_activation", 
                                        "inputRowUsers_id_status", 
                                        "inputRowUsers_notes"
                                      ];

//Authentication method.
$configUsersMasterAuthenticationMethod = 1; //1 - cookie | 2 session
$configUsersAuthenticationMethod = 1; //1 - cookie | 2 session


//Basic resources.
$enableUsersSortOrder = 1; //0 - disable | 1 - enable
$enableUsersType = 1; //0 - disable | 1 - enable

$enableUsersNameTitle = 1; //0 - disable | 1 - enable
$enableUsersNameFull = 1; //0 - disable | 1 - enable
$enableUsersNameFirst = 1; //0 - disable | 1 - enable
$enableUsersNameLast = 1; //0 - disable | 1 - enable
$enableUsersDateBirth = 11; //0 - disable | 2 - dropdown menu | 11 - js-datepicker 
$enableUsersGender = 1; //0 - disable | 1 - enable
$enableUsersDocument = 1; //0 - disable | 1 - enable
$enableUsersAddress = 1; //0 - disable | 1 - enable
$enableUsersPhoneInternationalCode = 1; //0 - disable | 1 - enable
$enableUsersPhone1 = 1; //0 - disable | 1 - enable
$enableUsersPhone2 = 1; //0 - disable | 1 - enable
$enableUsersPhone3 = 1; //0 - disable | 1 - enable
$enableUsersUsername = 1; //0 - disable | 1 - enable
$enableUsersEmail = 1; //0 - disable | 1 - enable

$configUsersPassword = 1; //0 - don´t display | 1 - display
$configUsersPasswordMethod = 26; //23 - Crypto Module algorithm: aes-128-cbc and simple key password | 24 - Crypto Module algorithm: aes-128-cbc - 16 byte key and 16 byte iv | 26 - Crypto Module algorithm: aes-256-cbc - 32 byte key and 16 byte iv

$enableUsersImageMain = 1; //0 - disable | 1 - enable
$enableUsersStatus = 1; //0 - disable | 1 - enable
$enableUsersNotes = 1; //0 - disable | 1 - enable

//Big information fields.
$enableUsersInfo1 = 1; //0 - disable | 1 - enable
$configUsersInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo2 = 1; //0 - disable | 1 - enable
$configUsersInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo3 = 1; //0 - disable | 1 - enable
$configUsersInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo4 = 1; //0 - disable | 1 - enable
$configUsersInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo5 = 1; //0 - disable | 1 - enable
$configUsersInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo6 = 1; //0 - disable | 1 - enable
$configUsersInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo7 = 1; //0 - disable | 1 - enable
$configUsersInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo8 = 1; //0 - disable | 1 - enable
$configUsersInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo9 = 1; //0 - disable | 1 - enable
$configUsersInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

$enableUsersInfo10 = 1; //0 - disable | 1 - enable
$configUsersInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Activation fields.
$enableUsersActivation1 = 1; //0 - disable | 1 - enable
$enableUsersActivation2 = 1; //0 - disable | 1 - enable
$enableUsersActivation3 = 1; //0 - disable | 1 - enable
$enableUsersActivation4 = 1; //0 - disable | 1 - enable
$enableUsersActivation5 = 1; //0 - disable | 1 - enable
//**************************************************************************************


?>