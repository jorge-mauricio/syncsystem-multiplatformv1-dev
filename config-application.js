"use strict";

//Author information.
//**************************************************************************************

//**************************************************************************************


//"use strict";
//Import Node Modules.
//----------------------
//const os = require("os"); //utility to get hostname //ref: https://nodejs.org/api/os.html#os_os_hostname
//----------------------


//Create a namespace to help export all variables / properties.
var gSystemConfig = {};


//NodeJS configuration.
//**************************************************************************************
gSystemConfig.configDebug = true; //true (debug mode) | false (production mode)
//**************************************************************************************


//General configuration.
//**************************************************************************************
//Basic information.
//----------------------
gSystemConfig.configSystemClientName = "Planejamento Visual";

gSystemConfig.configSiteTitle = "SyncSystem - Multiplatform (debug: çáéã)"; //site name
gSystemConfig.configSystemName = "Sistema de Gerenciamento de Conteúdo"; //Sistema de Controle | Sistema Administrativo | CRM
gSystemConfig.configDevName = "Planejamento Visual - Arte e Tecnologia"; //Jorge Mauricio - Programador Visual | Planejamento Visual - Arte e Tecnologia | Jorge Mauricio - Criação e Treinamento Web | Web Inventor - Imagine, realize.
gSystemConfig.configDevSite = "http://www.planejamentovisual.com.br"; //http://www.programadorvisual.com.br | http://www.planejamentovisual.com.br | http://www.jorgemauricio.com | http://www.webinventor.com.br
gSystemConfig.configCopyrightYear = "2008";

//gSystemConfig.configSystemURL = "http://localhost:3000"; //http://multiplatformv1.syncsystem.com.br
gSystemConfig.configSystemURL = process.env.CONFIG_SYSTEM_URL; //http://multiplatformv1.syncsystem.com.br
//gSystemConfig.configSystemURL = window.location.origin; //http://multiplatformv1.syncsystem.com.br
//gSystemConfig.configSystemURLSSL = "http://localhost:3000"; //http://multiplatformv1.syncsystem.com.br
gSystemConfig.configSystemURLSSL = process.env.CONFIG_SYSTEM_URL_SSL; //http://multiplatformv1.syncsystem.com.br
//gSystemConfig.configSystemURLSSL = window.location.origin; //http://multiplatformv1.syncsystem.com.br

gSystemConfig.configAPIURL = gSystemConfig.configSystemURLSSL; //process.env.CONFIG_API_URL;

/*
window.location.hash: "#2"
​window.location.host: "localhost:4200"
​window.location.hostname: "localhost"
​window.location.href: "http://localhost:4200/landing?query=1#2"
​window.location.origin: "http://localhost:4200"
​window.location.pathname: "/landing"
​window.location.port: "4200"
​window.location.protocol: "http:"
window.location.search: "?query=1"
*/

gSystemConfig.configSystemURLImages = "/"; //".." = relative path | "/" = root | http://www.nomedodominio.com.br = absolute path
gSystemConfig.configFrontendReactURLImages = gSystemConfig.configSystemURL + "/";

gSystemConfig.configFrontendDefaultView = "frontend_react"; //frontend_node | frontend_react
gSystemConfig.configFrontendMobileDefaultView = "frontend_node_mobile";
//----------------------


//DB especial configuration.
//----------------------
/*Moved to .env file.
const configSystemDBTablePrefix = "prefix_ssmv1_";
const configSystemDBType = 2; //2 - MySQL | 3 - SQL Server
const enableSystemDBSizeOtimize = 0; //0-disable (all fields created) | 1-enable (only enabled fields created on database setup)
*/

//Table names.
gSystemConfig.configSystemDBTableCounter = "counter";
gSystemConfig.configSystemDBTableCategories = "categories";
gSystemConfig.configSystemDBTableFiles = "files";
gSystemConfig.configSystemDBTableFiltersGeneric = "filters_generic";
gSystemConfig.configSystemDBTableFiltersGenericBinding = "filters_generic_binding";
//----------------------


//Media configuration.
//----------------------
gSystemConfig.configImagePopup = 4; //0 - no pop-up | 1 - LightBox 2 (JQuery) | 3 - fancybox (JQuery) | 4 - GLightbox (vanilla js)
gSystemConfig.configImagePopupBGColor = "#000000";
gSystemConfig.configImagePopupW = "890";
gSystemConfig.configImagePopupBGColor = "530";
//----------------------


//Directories configuration.
//----------------------
gSystemConfig.configPhysicalPathRoot = __dirname;

//gSystemConfig.configDirectoryRootPhysical = __dirname;
/**/
gSystemConfig.configDirectorySystem = "backend_node";
//gSystemConfig.configDirectorySystemRoute = "system"; //trash
gSystemConfig.configDirectoryComponents = "components_node";

gSystemConfig.configDirectoryFilesVisualization = "app_files_public";
gSystemConfig.configDirectoryFiles = "app_files_public";
gSystemConfig.configDirectoryFilesLayout = "app_files_layout";
gSystemConfig.configDirectoryResources = "app_resources";
gSystemConfig.configDirectoryStyles = "app_styles";
gSystemConfig.configDirectoryViews = "app_views";
gSystemConfig.configDirectoryDist = "dist"; //webpack distribution folder files (production / minifying)
gSystemConfig.configDirectoryBuildReact = "build"; //webpack distribution folder files - react (production / minifying)
gSystemConfig.configDirectoryBuildReactClient = "public"; //webpack distribution folder files - react client (production / minifying)
gSystemConfig.configDirectoryJS = "app_js";

//Upload directories.
gSystemConfig.configDirectoryFilesUpload = gSystemConfig.configPhysicalPathRoot + "/" + gSystemConfig.configDirectoryFilesVisualization;
//gSystemConfig.configDirectoryFilesUpload = gSystemConfig.configPhysicalPathRoot + "\\" + gSystemConfig.configDirectoryFilesVisualization;
//----------------------


//Static directories configuration (public alias).
//----------------------
gSystemConfig.configFrontendDefaultViewSD = "frontend";
gSystemConfig.configDirectorySystemSD = "backend";

gSystemConfig.configDirectoryFilesSD = "files";
gSystemConfig.configDirectoryFilesLayoutSD = "files-layout";
gSystemConfig.configDirectoryStylesSD = "css";
gSystemConfig.configDirectoryJSSD = "js";
gSystemConfig.configDirectoryDistSD = "dist";
gSystemConfig.configDirectoryBuildReactSD = "build"; //TODO: Maybe change to frontend_react
gSystemConfig.configDirectoryBuildReactClientSD = "public";
//----------------------


//Routes configuration.
//----------------------
gSystemConfig.configRouteAPI = "api";
gSystemConfig.configRouteAPIActionEdit = "edit";
gSystemConfig.configRouteAPIDetails = "details";
gSystemConfig.configRouteAPIRecords = "records";
gSystemConfig.configRouteAPICategories = "categories";
gSystemConfig.configRouteAPIFiles = "files";


gSystemConfig.configRouteBackend = "system";
gSystemConfig.configRouteBackendActionEdit = "edit";
gSystemConfig.configRouteBackendDetails = "details";
gSystemConfig.configRouteBackendRecords = "records";
gSystemConfig.configRouteBackendCategories = "categories";
gSystemConfig.configRouteBackendFiles = "files";

gSystemConfig.configRouteFrontend = "pt";
gSystemConfig.configRouteFrontendMobile = "pt-mobile";

gSystemConfig.configRouteFrontendActionEdit = "edit";
gSystemConfig.configRouteFrontendDetails = "details";
gSystemConfig.configRouteFrontendRecords = "records";

gSystemConfig.configRouteFrontendCategories = "categories";
gSystemConfig.configRouteFrontendFiles = "files";
//----------------------


//Cryptography.
//----------------------
gSystemConfig.configCryptType = 2 //0 - no cryptography | 1 - hash (doesn´t allow decryptography) | 2 - Data (allows decryptography)
gSystemConfig.configCryptHash = 23 //23 - Crypto Module
gSystemConfig.configCryptData = 26 //23 - Crypto Module algorithm: aes-128-cbc and simple key password | 24 - Crypto Module algorithm: aes-128-cbc - 16 byte key and 16 byte iv | 26 - Crypto Module algorithm: aes-256-cbc - 32 byte key and 16 byte iv 

gSystemConfig.configCryptKey = "system_crypt_key"; //generate key data
gSystemConfig.configCryptKey16Byte = "95f19c6f734f9f4fdc1d4258277a1c7d"; //not in use
gSystemConfig.configCryptKey32Byte = "d0a7e7997b6d5fcd55f4b5c32611b87cd923e88837b63bf2941ef819dc8ca282"; //not in use
gSystemConfig.configCryptiv16Byte = "bd1e41c05f861867e225d5d998f10813"; //not in use
gSystemConfig.configCryptiv32Byte = "21f534b09237b9716ab561149367ebb8d2d0ab0e0bfec395baf7ba112cb2872f"; //not in use
gSystemConfig.configCryptSalt = "syncsystem"; //generate a salt data
//----------------------


//Image configuration.
//----------------------
gSystemConfig.configUploadType = 1; //Sabe Files Locally | Amazon (TODO)
gSystemConfig.configUploadComponent = 1; //1 - formidable
gSystemConfig.configImageComponent = 1; //1 - sharp
gSystemConfig.configImageQuality = 100; //image quality percentage on resizing
gSystemConfig.configImageFormats = ".bmp, .gif, .jpg, .jpeg, .png"; //formats allowed for image resizing


//Image size configuration.
gSystemConfig.enableDefaultImageSize  = 1; //0 - disable (image sizes diferent for each table) | 1 - enable (default image sizes)

//prefix;w;h
gSystemConfig.configArrDefaultImageSize = ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrCategoriesImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrFilesImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
//----------------------


//APIs.
//----------------------
//.env
//gSystemConfig.configAPIKeyInternal = "";
//----------------------
//**************************************************************************************


//Global system configuration.
//**************************************************************************************
gSystemConfig.configBackendTemplateEngine = 1 //1 - EJS

gSystemConfig.configBackendTextBox = 17; //1 - no formatting | 2 - basic formatting (CKEditor) | 3 - advanced formatting (CKEditor) | 4 - basic formatting (Ajax HTMLEditorExtender) | 5 - advanced formatting (Ajax HTMLEditorExtender) | 6 - formatting (Ajax HTMLEditor) | 7 - advanced formatting (Ajax HTMLEditor) | 11 - basic (CLEditor) | 12 - advanced formatting (CLEditor) | 13 - basic (Quill) | 14 - advanced formatting (Quill) | 15 - basic (FroalaEditor) | 16 - advanced formatting (FroalaEditor) | 17 basic (TinyMCE) | 18 - advanced formatting (TinyMCE)
gSystemConfig.configFrontendTextBox = 1; //1 - no formatting | 2 - basic formatting (CKEditor) | 3 - advanced formatting (CKEditor) | 4 - basic formatting (Ajax HTMLEditorExtender) | 5 - advanced formatting (Ajax HTMLEditorExtender) | 6 - formatting (Ajax HTMLEditor) | 7 - advanced formatting (Ajax HTMLEditor) | 11 - basic (CLEditor) | 12 - advanced formatting (CLEditor) | 13 - basic (Quill) | 14 - advanced formatting (Quill) | 15 - basic (FroalaEditor) | 16 - advanced formatting (FroalaEditor) | 17 basic (TinyMCE) | 18 - advanced formatting (TinyMCE)

gSystemConfig.configSystemTimeZone = "America/Sao_Paulo"; //America/Sao_Paulo (pt-BR) | Atlantic/South_Georgia (en-US) | (en-GB)
gSystemConfig.configBackendLanguage = "en_US" // en_US | pt_BR
gSystemConfig.configFrontendLanguage = "en_US" // en_US | pt_BR

gSystemConfig.configBackendDateFormat = 1; //1 - portuguese dd/mm/yyyy | 2 - britanic mm/dd/yyyy
gSystemConfig.configBackendDateFieldType = 11; //0 - simple field | 1 - JQuery DatePicker | 2 - dropdown menu | 11 - js-datepicker (https://www.npmjs.com/package/js-datepicker)
gSystemConfig.configFrontendDateFormat = 1; //1 - portuguese dd/mm/yyyy | 2 - britanic mm/dd/yyyy
gSystemConfig.configFrontendDateFieldType = 1; //0 - simple field | 1 - JQuery DatePicker | 2 - dropdown menu

//Currency.
gSystemConfig.configSystemCurrency = "R$" //R$ | $ | € | £
gSystemConfig.configSystemWeight = "g" //g | ounces (1 pound -> 16 ounces)
gSystemConfig.configSystemWeight2 = "kg" //kg | Pounds (453.6 grams)
gSystemConfig.configSystemMetric = "m²" //m² | ft²
gSystemConfig.configSystemMetricDistance = "KM" //KM | MI
//**************************************************************************************


//Backend - main menu configuration.
//**************************************************************************************
gSystemConfig.enableBackendSearch = 1; //0 - disable | 1 - enable
//**************************************************************************************


//Languages.
//**************************************************************************************
//const appLabels = require("./app_resources/language-en-us.js");

//gSystemConfig.languageFrontend = appLabels; //working
gSystemConfig.configLanguageFrontend = require("./" + gSystemConfig.configDirectoryResources + "/language-en-us.js");
//gSystemConfig.languageBackend = appLabels; //working
gSystemConfig.configLanguageBackend = require("./" + gSystemConfig.configDirectoryResources + "/language-en-us.js");
//**************************************************************************************


//Categories - configuration and resources.
//**************************************************************************************
gSystemConfig.configCategoryType = [
  {category_type: 1, category_type_function_label: "backendCategoriesType1Function", queryString: ""}, 
  {category_type: 2, category_type_function_label: "backendCategoriesType2Function", queryString: ""}, 
  {category_type: 3, category_type_function_label: "backendCategoriesType3Function", queryString: "publicationType=1"}, 
  {category_type: 9, category_type_function_label: "backendCategoriesType9Function", queryString: "-"}, 
]
//**************************************************************************************


//Categories - configuration and resources.
//**************************************************************************************
gSystemConfig.configCategoriesSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
gSystemConfig.enableCategoriesSortCustom = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInputOrder = ["inputRowCategories_id_parent", 
                                            "inputRowCategories_sort_order", 
                                            "inputRowCategories_date1", 
                                            "inputRowCategories_id_register_user", 
                                            "inputRowCategories_title", 
                                            "inputRowCategories_description", 
                                            "inputRowCategories_url_alias", 
                                            "inputRowCategories_meta_title", 
                                            "inputRowCategories_meta_description", 
                                            "inputRowCategories_keywords_tags", 
                                            "inputRowCategories_info1", 
                                            "inputRowCategories_info_small1", 
                                            "inputRowCategories_number1", 
                                            "inputRowCategories_number_small1", 
                                            "inputRowCategories_category_type", 
                                            "inputRowCategories_image_main", 
                                            "inputRowCategories_file1", 
                                            "inputRowCategories_file2", 
                                            "inputRowCategories_activation", 
                                            "inputRowCategories_id_restricted_access", 
                                            "inputRowCategories_id_status", 
                                            "inputRowCategories_notes"
                                          ];

//Basic resources.
gSystemConfig.enableCategoriesImageMain = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesSortOrder = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesRestrictedAccess = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesIdParentEdit = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesStatus = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesNotes = 1; //0 - disable | 1 - enable

gSystemConfig.configCategoriesURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
gSystemConfig.enableCategoriesKeywordsTags = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesMetaDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesMetaTitle = 1; //0 - disable | 1 - enable

//Pagination.
gSystemConfig.enableCategoriesBackendPagination = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesBackendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesBackendPaginationNRecords = 15;

//Resources.
gSystemConfig.enableCategoriesImages = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesVideos = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesFiles = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesZip = 1; //0 - disable | 1 - enable


//User bind (link categories to registers).
//----------------------
gSystemConfig.enableCategoriesBindRegisterUser = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
gSystemConfig.configCategoriesBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
gSystemConfig.configCategoriesBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableCategoriesBindRegister1 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesBindRegister1Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configCategoriesBindRegister1IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configCategoriesBindRegister1Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableCategoriesBindRegister2 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesBindRegister2Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configCategoriesBindRegister2IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configCategoriesBindRegister2Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableCategoriesBindRegister3 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesBindRegister3Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configCategoriesBindRegister3IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configCategoriesBindRegister3Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableCategoriesBindRegister4 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesBindRegister4Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configCategoriesBindRegister4IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configCategoriesBindRegister4Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableCategoriesBindRegister5 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesBindRegister5Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configCategoriesBindRegister5IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configCategoriesBindRegister5Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//----------------------


//Optioinal fields (field titles in the language configuration file).
//----------------------
//Generic filters.
gSystemConfig.enableCategoriesFilterGeneric1 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric2 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric3 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric4 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric5 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric6 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric7 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric8 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric9 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableCategoriesFilterGeneric10 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio


//Big information fields.
gSystemConfig.enableCategoriesInfo1 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo2 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo3 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo4 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo5 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo6 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo7 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo8 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo9 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableCategoriesInfo10 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Small information fields.
gSystemConfig.enableCategoriesInfoS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfoS1FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableCategoriesInfoS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfoS2FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableCategoriesInfoS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfoS3FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableCategoriesInfoS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfoS4FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableCategoriesInfoS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesInfoS5FieldType = 1; //1 - single line | 2 - multiline

//Big number fields (up to 34 digits).
gSystemConfig.enableCategoriesNumber1 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableCategoriesNumber2 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableCategoriesNumber3 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableCategoriesNumber4 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableCategoriesNumber5 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

//Small number fields (up to 9 digits).
gSystemConfig.enableCategoriesNumberS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumberS1FieldType = 2; //1 - general number | 2 - system currency

gSystemConfig.enableCategoriesNumberS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumberS2FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableCategoriesNumberS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumberS3FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableCategoriesNumberS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumberS4FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableCategoriesNumberS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesNumberS5FieldType = 1; //1 - general number | 2 - system currency

//Date fields.
gSystemConfig.enableCategoriesDate1 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesDate1FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configCategoriesDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

gSystemConfig.enableCategoriesDate2 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesDate2FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configCategoriesDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableCategoriesDate3 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesDate3FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configCategoriesDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableCategoriesDate4 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesDate4FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configCategoriesDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableCategoriesDate5 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesDate5FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configCategoriesDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
gSystemConfig.enableCategoriesFile1 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesFile1Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableCategoriesFile2 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesFile2Type = 34; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableCategoriesFile3 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesFile3Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableCategoriesFile4 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesFile4Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableCategoriesFile5 = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesFile5Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

//Activation fields.
gSystemConfig.enableCategoriesActivation1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesActivation2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesActivation3 = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesActivation4 = 1; //0 - disable | 1 - enable
gSystemConfig.enableCategoriesActivation5 = 1; //0 - disable | 1 - enable
//----------------------


//Frontend configuration.
gSystemConfig.configCategoriesImagePlaceholder = 1; //0 - disable | 1 - enable


gSystemConfig.enableCategoriesFrontendPagination = 1; //0 - disable | 1 - enable (custom) | 11 - enable (bootstrap)
gSystemConfig.enableCategoriesFrontendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configCategoriesFrontendPaginationNRecords = 10;
//**************************************************************************************


//Files - configuration and resources.
//**************************************************************************************
gSystemConfig.configFilesSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | caption
gSystemConfig.enableFilesSortCustom = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInputOrder = ["inputRowFiles_id_parent", 
                                        "inputRowFiles_sort_order", 
                                        "inputRowFiles_date1", 
                                        "inputRowFiles_file_config", 
                                        "inputRowFiles_caption", 
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
                                        "inputRowFiles_file", 
                                        "inputRowFiles_file1", 
                                        "inputRowFiles_file2", 
                                        "inputRowFiles_activation", 
                                        "inputRowFiles_notes"
                                      ];

//Basic resources.
gSystemConfig.enableFilesIdParentEdit = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesSortOrder = 1; //0 - disable | 1 - enable

gSystemConfig.enableFilesTitle = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesHTMLCode = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesThumbnails = 1; //0 - disable | 1 - enable //Thumbnails for video files.

gSystemConfig.configFilesURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
gSystemConfig.enableFilesKeywordsTags = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesMetaDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesMetaTitle = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesNotes = 1; //0 - disable | 1 - enable


//Pagination.
gSystemConfig.enableFilesBackendPagination = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesBackendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesBackendPaginationNRecords = 15;


//Optioinal fields (field titles in the language configuration file).
//Big information fields.
gSystemConfig.enableFilesInfo1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfo1FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableFilesInfo2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfo2FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableFilesInfo3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableFilesInfo4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableFilesInfo5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Small information fields.
gSystemConfig.enableFilesInfoS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfoS1FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableFilesInfoS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfoS2FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFilesInfoS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfoS3FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFilesInfoS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfoS4FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFilesInfoS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesInfoS5FieldType = 1; //1 - single line | 2 - multiline

//Big number fields (up to 34 digits).
gSystemConfig.enableFilesNumber1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableFilesNumber2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableFilesNumber3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableFilesNumber4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableFilesNumber5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

//Small number fields (up to 9 digits).
gSystemConfig.enableFilesNumberS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumberS1FieldType = 2; //1 - general number | 2 - system currency

gSystemConfig.enableFilesNumberS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumberS2FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableFilesNumberS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumberS3FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableFilesNumberS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumberS4FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableFilesNumberS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesNumberS5FieldType = 1; //1 - general number | 2 - system currency

//Date fields.
gSystemConfig.enableFilesDate1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesDate1FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configFilesDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

gSystemConfig.enableFilesDate2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesDate2FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configFilesDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableFilesDate3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesDate3FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configFilesDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableFilesDate4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesDate4FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configFilesDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableFilesDate5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesDate5FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configFilesDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
gSystemConfig.enableFilesFile1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesFile1Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableFilesFile2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesFile2Type = 34; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableFilesFile3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesFile3Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableFilesFile4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesFile4Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableFilesFile5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesFile5Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

//Activation fields.
gSystemConfig.enableFilesActivation1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesActivation2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesActivation3 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesActivation4 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFilesActivation5 = 1; //0 - disable | 1 - enable
//----------------------


//Frontend configuration.
gSystemConfig.configFilesImagePlaceholder = 1; //0 - disable | 1 - enable


gSystemConfig.enableFilesFrontendPagination = 1; //0 - disable | 1 - enable (custom) | 11 - enable (bootstrap)
gSystemConfig.enableFilesFrontendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configFilesFrontendPaginationNRecords = 10;
//**************************************************************************************


//Search.
//**************************************************************************************
//**************************************************************************************






//Export module.
//**************************************************************************************
/*
module.exports =  {
    configSystemClientName : configSystemClientName, 
    configSiteTitle : configSiteTitle, 
    configSystemName : configSystemName, 
    configDevName : configDevName, 
    configDevSite : configDevSite, 
    configCopyrightYear : configCopyrightYear, 
    configCopyrightYear : configCopyrightYear, 
    configCopyrightYear : configCopyrightYear, 
    configCopyrightYear : configCopyrightYear, 
    SomeMathObject : SomeMathObject
}
*/

//Export all elements in namespace.
//ref: https://vancelucas.com/blog/module-exports-all-the-things/
//ref: https://hackernoon.com/5-techniques-to-iterate-over-javascript-object-entries-and-their-performance-6602dcb708a8
for(const prop in gSystemConfig)
{
    if(gSystemConfig.hasOwnProperty(prop))
    {
      module.exports[prop] = gSystemConfig[prop];
    }
 }
//**************************************************************************************