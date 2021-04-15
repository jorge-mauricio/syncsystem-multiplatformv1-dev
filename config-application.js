"use strict";
//import "babel-polyfill"; //with babel, we can use the import syntax. //heroku - returns compile error


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
gSystemConfig.configSystemClientName = "Planejamento Visual"; //(Note: moved to language file)

gSystemConfig.configSiteTitle = "SyncSystem - Multiplatform (debug: çáéã)"; //site name (Note: moved to language file)
gSystemConfig.configSystemName = "Sistema de Gerenciamento de Conteúdo"; //Sistema de Controle | Sistema Administrativo | CRM
gSystemConfig.configDevName = "Planejamento Visual - Arte e Tecnologia"; //Jorge Mauricio - Programador Visual | Planejamento Visual - Arte e Tecnologia | Jorge Mauricio - Criação e Treinamento Web | Web Inventor - Imagine, realize. (Note: moved to language file)
gSystemConfig.configDevSite = "http://www.planejamentovisual.com.br"; //http://www.programadorvisual.com.br | http://www.planejamentovisual.com.br | http://www.jorgemauricio.com | http://www.webinventor.com.br
gSystemConfig.configCopyrightYear = "2008";

//gSystemConfig.configSystemURL = "http://localhost:3000"; //http://multiplatformv1.syncsystem.com.br
gSystemConfig.configSystemURL = process.env.CONFIG_SYSTEM_URL; //http://multiplatformv1.syncsystem.com.br
//gSystemConfig.configSystemURL = window.location.origin; //http://multiplatformv1.syncsystem.com.br
//gSystemConfig.configSystemURLSSL = "http://localhost:3000"; //http://multiplatformv1.syncsystem.com.br
gSystemConfig.configSystemURLSSL = process.env.CONFIG_SYSTEM_URL_SSL; //http://multiplatformv1.syncsystem.com.br
//gSystemConfig.configSystemURLSSL = window.location.origin; //http://multiplatformv1.syncsystem.com.br

gSystemConfig.configAPIURL = process.env.CONFIG_API_URL; //gSystemConfig.configSystemURLSSL | process.env.CONFIG_API_URL;
gSystemConfig.configURLFrontendReact = process.env.CONFIG_URL_FRONTEND_REACT;

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

//gSystemConfig.configSystemURLImages = "/"; //".." = relative path | "/" = root | http://www.nomedodominio.com.br = absolute path | remote (AWS s3): https://multiplatformnodev1.s3.sa-east-1.amazonaws.com (note: gSystemConfig.configDirectoryFilesSD has to be "")
gSystemConfig.configSystemURLImages = "https://multiplatformnodev1.s3.sa-east-1.amazonaws.com";
gSystemConfig.configSystemURLImagesRemote = "https://multiplatformnodev1.s3.sa-east-1.amazonaws.com"; //maybe it´s not needed
//gSystemConfig.configFrontendReactURLImages = gSystemConfig.configSystemURL + "/";
gSystemConfig.configFrontendReactURLImages = "https://multiplatformnodev1.s3.sa-east-1.amazonaws.com";

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
gSystemConfig.configSystemDBTableContent = "content";
gSystemConfig.configSystemDBTableProducts = "products";
gSystemConfig.configSystemDBTablePublications = "publications";
gSystemConfig.configSystemDBTableForms = "forms";
gSystemConfig.configSystemDBTableFormsFields = "forms_fields";
gSystemConfig.configSystemDBTableFormsFieldsOptions = "forms_fields_options";
gSystemConfig.configSystemDBTableFiltersGeneric = "filters_generic";
gSystemConfig.configSystemDBTableFiltersGenericBinding = "filters_generic_binding";
gSystemConfig.configSystemDBTableUsers = "users";
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

gSystemConfig.configDirectoryFilesSD = ""; //"" - when using remote file storage
//gSystemConfig.configDirectoryFilesSD = "files"; //"" - when using remote
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
gSystemConfig.configRouteAPIActionSend = "send";
gSystemConfig.configRouteAPIDetails = "details";
gSystemConfig.configRouteAPIRecords = "records";

gSystemConfig.configRouteAPICategories = "categories";
gSystemConfig.configRouteAPIFiles = "files";
gSystemConfig.configRouteAPIContent = "content";
gSystemConfig.configRouteAPIProducts = "products";
gSystemConfig.configRouteAPIPublications = "publications";
gSystemConfig.configRouteAPIForms = "forms";
gSystemConfig.configRouteAPIFormsFields = "forms-fields";
gSystemConfig.configRouteAPIFormsFieldsOptions = "forms-fields-options";
gSystemConfig.configRouteAPIFiltersGeneric = "filters-generic";
gSystemConfig.configRouteAPIUsers = "users";
gSystemConfig.configRouteAPIAuthentication = "authentication";

gSystemConfig.configRouteBackend = "system";
gSystemConfig.configRouteBackendLogin = "login";
gSystemConfig.configRouteBackendLogOff = "logoff";
gSystemConfig.configRouteBackendLoginUsers = "login-users";
//gSystemConfig.configRouteBackendLogOffUsers = "logoff-users";
gSystemConfig.configRouteBackendLogOffUsersRoot = "logoff-users-root";
gSystemConfig.configRouteBackendDashboard = "dashboard"; //main

gSystemConfig.configRouteBackendActionEdit = "edit";
gSystemConfig.configRouteBackendDetails = "details";
gSystemConfig.configRouteBackendRecords = "records";
gSystemConfig.configRouteBackendCategories = "categories";
gSystemConfig.configRouteBackendFiles = "files";
gSystemConfig.configRouteBackendContent = "content";
gSystemConfig.configRouteBackendProducts = "products";
gSystemConfig.configRouteBackendPublications = "publications";
gSystemConfig.configRouteBackendForms = "forms";
gSystemConfig.configRouteBackendFormsFields = "forms-fields";
gSystemConfig.configRouteBackendFormsFieldsOptions = "forms-fields-options";
gSystemConfig.configRouteBackendFiltersGeneric = "filters-generic";
gSystemConfig.configRouteBackendUsers = "users";

gSystemConfig.configRouteFrontend = "en"; //(blank) - root | en
gSystemConfig.configRouteFrontendMobile = "en-mobile"; //(blank) - responsive |  //NOTE: only in use if layout not responsive

gSystemConfig.configRouteFrontendActionEdit = "edit";
gSystemConfig.configRouteFrontendActionSend = "send";
gSystemConfig.configRouteFrontendDetails = "details";
gSystemConfig.configRouteFrontendRecords = "records";

gSystemConfig.configRouteFrontendCategories = "categories";
gSystemConfig.configRouteFrontendFiles = "files";
gSystemConfig.configRouteFrontendContent = "content";
gSystemConfig.configRouteFrontendForms = "forms";
gSystemConfig.configRouteFrontendProducts = "products";
gSystemConfig.configRouteFrontendPublications = "publications";

gSystemConfig.configRouteFrontendDashboardCategories = "dashboard-categories";
gSystemConfig.configRouteFrontendDashboardFiles = "dashboard-files";
gSystemConfig.configRouteFrontendDashboardContent = "dashboard-content";
gSystemConfig.configRouteFrontendDashboardProducts = "dashboard-products";
gSystemConfig.configRouteFrontendDashboardPublications = "dashboard-products";
//----------------------


//Cryptography.
//----------------------
gSystemConfig.configCookieSetType = 1; //0 - disable (without path - directory) | 1 - enable (set with path - directory)
gSystemConfig.configCookieDirectory = "/"; // / - full site

gSystemConfig.configCookiePrefix = "ss"; // / - full site
gSystemConfig.configCookiePrefixUserRoot = "user_root";
gSystemConfig.configCookiePrefixUser = "user";

gSystemConfig.configCookieDefaultOptions = {
  path: gSystemConfig.configCookieDirectory,
  overwrite: true,
  //domain: '127.0.0.1:4444',
  //secure: process.env.NODE_ENV === 'production'? true: false, / Forces to use https in production.
  //expires: new Date(Date.now() + 900000),
  //maxAge: 1000 * 60 * 10,
  httpOnly: true // You can't access these tokens in the client's javascript.
}; //ref: https://alligator.io/nodejs/express-cookies/
gSystemConfig.configCookieDeleteDefaultOptions = {
  path: gSystemConfig.configCookieDirectory,
  overwrite: true,
  //domain: '127.0.0.1:4444',
  //secure: process.env.NODE_ENV === 'production'? true: false, / Forces to use https in production.
  expires: new Date(),
  maxAge: 0,
  httpOnly: true // You can't access these tokens in the client's javascript.
}; //ref: https://alligator.io/nodejs/express-cookies/

gSystemConfig.configSessionBackendTimeout = "1440";
//----------------------


//Cryptography.
//----------------------
gSystemConfig.configCryptType = 2; //0 - no cryptography | 1 - hash (doesn´t allow decryptography) | 2 - Data (allows decryptography)
gSystemConfig.configCryptHash = 23; //23 - Crypto Module
gSystemConfig.configCryptData = 26; //23 - Crypto Module algorithm: aes-128-cbc and simple key password | 24 - Crypto Module algorithm: aes-128-cbc - 16 byte key and 16 byte iv | 26 - Crypto Module algorithm: aes-256-cbc - 32 byte key and 16 byte iv 

gSystemConfig.configCryptKey = "system_crypt_key"; //generate key data
gSystemConfig.configCryptKey16Byte = "95f19c6f734f9f4fdc1d4258277a1c7d"; //not in use
gSystemConfig.configCryptKey32Byte = "d0a7e7997b6d5fcd55f4b5c32611b87cd923e88837b63bf2941ef819dc8ca282"; //not in use
gSystemConfig.configCryptiv16Byte = "bd1e41c05f861867e225d5d998f10813"; //not in use
gSystemConfig.configCryptiv32Byte = "21f534b09237b9716ab561149367ebb8d2d0ab0e0bfec395baf7ba112cb2872f"; //not in use
gSystemConfig.configCryptSalt = "syncsystem"; //generate a salt data
//----------------------


//Image configuration.
//----------------------
gSystemConfig.configUploadType = 2; //1 - Save Files Locally | 2 - Amazon S3
gSystemConfig.configUploadComponent = 1; //1 - formidable | 2 - multer (TODO) | 3 - multyparty (TODO)
gSystemConfig.configImageComponent = 1; //1 - sharp
gSystemConfig.configImageQuality = 100; //image quality percentage on resizing
gSystemConfig.configImageFormats = ".bmp, .gif, .jpg, .jpeg, .png"; //formats allowed for image resizing


//Image size configuration.
gSystemConfig.enableDefaultImageSize  = 1; //0 - disable (image sizes diferent for each table) | 1 - enable (default image sizes)

//prefix;w;h
gSystemConfig.configArrDefaultImageSize = ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrCategoriesImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrFilesImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrContentImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrProductsImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrPublicationsImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrFormsFieldsOptionsImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrFiltersGenericImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
gSystemConfig.configArrUsersImageSize = gSystemConfig.enableDefaultImageSize == 1 ? gSystemConfig.configArrDefaultImageSize : ["g;667;500","NULL;370;277","r;205;154","t;120;90"];
//----------------------


//e-mail configuration.
//----------------------
gSystemConfig.configEmailComponent = 11; //11 - nodemailer
gSystemConfig.configEmailFormat = 1; //0 - text | 1 - HTML
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
gSystemConfig.configBackendLanguage = "en_US"; // en_US | pt_BR - DELETE - moved to language (check to see if node code uses)
gSystemConfig.configFrontendLanguage = "en_US"; // en_US | pt_BR

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

gSystemConfig.enableBackendMaintenanceCategories = 1; //0 - disable | 1 - enable
gSystemConfig.enableBackendMaintenanceProducts = 1; //0 - disable | 1 - enable
gSystemConfig.enableBackendMaintenancePublications = 1; //0 - disable | 1 - enable
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
  {category_type: 4, category_type_function_label: "backendCategoriesType4Function", queryString: "publicationType=2"}, 
  {category_type: 5, category_type_function_label: "backendCategoriesType5Function", queryString: "publicationType=3"}, 
  {category_type: 6, category_type_function_label: "backendCategoriesType6Function", queryString: "publicationType=4"}, 
  {category_type: 9, category_type_function_label: "backendCategoriesType9Function", queryString: "-"}, 
  {category_type: 12, category_type_function_label: "backendCategoriesType12Function", queryString: ""}
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


//Optional fields (field titles in the language configuration file).
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


//Content - configuration and resources.
//**************************************************************************************
gSystemConfig.configContentSort = "id ASC"; //options: id | sort_order | date_creation esc | date_creation desc
gSystemConfig.enableContentSortCustom = 1; //0 - disable | 1 - enable
/*gSystemConfig.configContentInputOrder = ["inputRowContent_id_parent", 
                                            "inputRowContent_sort_order", 
                                            "inputRowContent_date1", 
                                            "inputRowContent_id_register_user", 
                                            "inputRowContent_content_type", 
                                            "inputRowContent_content_columns", 
                                            "inputRowContent_align_text", 
                                            "inputRowContent_align_image", 
                                            "inputRowContent_content_text", 
                                            "inputRowContent_content_url", 
                                            "inputRowContent_caption", 
                                            "inputRowContent_file", 
                                            "inputRowContent_activation"
                                          ];*//*not in use */

//Basic resources.
gSystemConfig.enableContentSortOrder = 1; //0 - disable | 1 - enable
gSystemConfig.enableContentIdParentEdit = 1; //0 - disable | 1 - enable
gSystemConfig.enableContentURL = 1; //0 - disable | 1 - enable
//gSystemConfig.enableContentCaption = 1; //0 - disable | 1 - enable
gSystemConfig.enableContentFileThumbnail = 1; //0 - disable | 1 - enable
gSystemConfig.enableContentColumns = 1; //0 - disable | 1 - enable
gSystemConfig.enableContentImageNoResize = 1; //0 - disable | 1 - enable

gSystemConfig.enableContentHTML = 1; //0 - disable | 1 - enable
gSystemConfig.enableContentVideos = 1; //0 - disable | 1 - enable
gSystemConfig.enableContentFiles = 1; //0 - disable | 1 - enable

gSystemConfig.enableContentBindRegisterUser = 1; //0 - disable | 1 - enable
gSystemConfig.configContentBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
gSystemConfig.configContentBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
gSystemConfig.configContentBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//**************************************************************************************


//Products - configuration and resources.
//**************************************************************************************
gSystemConfig.configProductsSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
gSystemConfig.enableProductsSortCustom = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInputOrder = ["inputRowProducts_id_parent", 
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
gSystemConfig.enableProductsIdParentEdit = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsSortOrder = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsType = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsCode = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsValue = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsValue1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsValue2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsWeight = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsCoefficient = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsImageMain = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsImageMainCaption = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsStatus = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsRestrictedAccess = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsNotes = 1; //0 - disable | 1 - enable

gSystemConfig.configProductsURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
gSystemConfig.enableProductsKeywordsTags = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsMetaDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsMetaTitle = 1; //0 - disable | 1 - enable

//Pagination.
gSystemConfig.enableProductsBackendPagination = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsBackendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsBackendPaginationNRecords = 15;

//Resources.
gSystemConfig.enableProductsImages = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsVideos = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsFiles = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsZip = 1; //0 - disable | 1 - enable
                   

//User bind (link categories to registers).
//----------------------
gSystemConfig.enableProductsBindRegisterUser = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
gSystemConfig.configProductsBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
gSystemConfig.configProductsBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableProductsBindRegister1 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsBindRegister1Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configProductsBindRegister1IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configProductsBindRegister1Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableProductsBindRegister2 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsBindRegister2Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configProductsBindRegister2IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configProductsBindRegister2Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableProductsBindRegister3 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsBindRegister3Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configProductsBindRegister3IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configProductsBindRegister3Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableProductsBindRegister4 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsBindRegister4Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configProductsBindRegister4IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configProductsBindRegister4Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableProductsBindRegister5 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsBindRegister5Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configProductsBindRegister5IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configProductsBindRegister5Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//----------------------


//Optional fields (field titles in the language configuration file).
//----------------------
//Generic filters.
gSystemConfig.enableProductsFilterGeneric1 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric2 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric3 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric4 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric5 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric6 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric7 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric8 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric9 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric10 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric11 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric12 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric13 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric14 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric15 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric16 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric17 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric18 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric19 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric20 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric21 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric22 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric23 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric24 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric25 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric26 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric27 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric28 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric29 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enableProductsFilterGeneric30 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio


//Big information fields.
gSystemConfig.enableProductsInfo1 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo2 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo3 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo4 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo5 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo6 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo7 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo8 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo9 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo10 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo11 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo11FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo12 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo12FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo13 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo13FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo14 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo14FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo15 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo15FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo16 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo16FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo17 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo17FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo18 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo18FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo19 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo19FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableProductsInfo20 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfo20FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Small information fields.
gSystemConfig.enableProductsInfoS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS1FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS2FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS3FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS4FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS5FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS6 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS6FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS7 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS7FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS8 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS8FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS9 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS9FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS10 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS10FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS11 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS11FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS12 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS12FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS13 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS13FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS14 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS14FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS15 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS15FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS16 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS16FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS17 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS17FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS18 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS18FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS19 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS19FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS20 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS20FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS21 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS21FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS22 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS22FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS23 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS23FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS24 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS24FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS25 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS25FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS26 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS26FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS27 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS27FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS28 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS28FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS29 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS29FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableProductsInfoS30 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsInfoS30FieldType = 1; //1 - single line | 2 - multiline

//Big number fields (up to 34 digits).
gSystemConfig.enableProductsNumber1 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableProductsNumber2 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableProductsNumber3 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableProductsNumber4 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enableProductsNumber5 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

//Small number fields (up to 9 digits).
gSystemConfig.enableProductsNumberS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumberS1FieldType = 2; //1 - general number | 2 - system currency

gSystemConfig.enableProductsNumberS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumberS2FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableProductsNumberS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumberS3FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableProductsNumberS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumberS4FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableProductsNumberS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsNumberS5FieldType = 1; //1 - general number | 2 - system currency

//URLs.
gSystemConfig.enableProductsURL1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsURL2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsURL3 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsURL4 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsURL5 = 1; //0 - disable | 1 - enable

//Date fields.
gSystemConfig.enableProductsDate1 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsDate1FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configProductsDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

gSystemConfig.enableProductsDate2 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsDate2FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configProductsDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableProductsDate3 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsDate3FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configProductsDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableProductsDate4 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsDate4FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configProductsDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enableProductsDate5 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsDate5FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configProductsDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
gSystemConfig.enableProductsFile1 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsFile1Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableProductsFile2 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsFile2Type = 34; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableProductsFile3 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsFile3Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableProductsFile4 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsFile4Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enableProductsFile5 = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsFile5Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

//Activation fields.
gSystemConfig.enableProductsActivation1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsActivation2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsActivation3 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsActivation4 = 1; //0 - disable | 1 - enable
gSystemConfig.enableProductsActivation5 = 1; //0 - disable | 1 - enable


//Frontend configuration.
gSystemConfig.configProductsImagePlaceholder = 1; //0 - disable | 1 - enable


gSystemConfig.enableProductsFrontendPagination = 1; //0 - disable | 1 - enable (custom) | 11 - enable (bootstrap)
gSystemConfig.enableProductsFrontendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configProductsFrontendPaginationNRecords = 10;
//**************************************************************************************


//Publications - configuration and resources.
//**************************************************************************************
gSystemConfig.configPublicationsSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
gSystemConfig.enablePublicationsSortCustom = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInputOrder = ["inputRowPublications_id_parent", 
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
gSystemConfig.enablePublicationsIdParentEdit = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsSortOrder = 1; //0 - disable | 1 - enable

gSystemConfig.enablePublicationsDateStart = 11; //0 - disable | 2 - dropdown menu | 11 - js-datepicker 
gSystemConfig.configPublicationsDateStartType = 55; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

gSystemConfig.enablePublicationsDateEnd = 11; //0 - disable | 2 - dropdown menu | 11 - js-datepicker 
gSystemConfig.configPublicationsDateEndType = 55; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

gSystemConfig.enablePublicationsDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsSource = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsSourceURL = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsImageMain = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsImageMainCaption = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsStatus = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsRestrictedAccess = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsNotes = 1; //0 - disable | 1 - enable

gSystemConfig.configPublicationsURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
gSystemConfig.enablePublicationsKeywordsTags = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsMetaDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsMetaTitle = 1; //0 - disable | 1 - enable

//Pagination.
gSystemConfig.enablePPublicationsBackendPagination = 1; //0 - disable | 1 - enable
gSystemConfig.enablePPublicationsBackendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configPPublicationsBackendPaginationNRecords = 15;

//Resources.
gSystemConfig.enablePublicationsContent = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsImages = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsVideos = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsFiles = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsZip = 1; //0 - disable | 1 - enable
                   

//User bind (link categories to registers).
//----------------------
gSystemConfig.enablePublicationsBindRegisterUser = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
gSystemConfig.configPublicationsBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
gSystemConfig.configPublicationsBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enablePublicationsBindRegister1 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsBindRegister1Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configPublicationsBindRegister1IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configPublicationsBindRegister1Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enablePublicationsBindRegister2 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsBindRegister2Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configPublicationsBindRegister2IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configPublicationsBindRegister2Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enablePublicationsBindRegister3 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsBindRegister3Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configPublicationsBindRegister3IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configPublicationsBindRegister3Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enablePublicationsBindRegister4 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsBindRegister4Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configPublicationsBindRegister4IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configPublicationsBindRegister4Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enablePublicationsBindRegister5 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsBindRegister5Method = 1; //1 - category ID | 2 - register type
gSystemConfig.configPublicationsBindRegister5IDReference = 3892; //category ID / register type ID | 0 - all register categories
gSystemConfig.configPublicationsBindRegister5Sort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order
//----------------------


//Optional fields (field titles in the language configuration file).
//----------------------
//Generic filters.
gSystemConfig.enablePublicationsFilterGeneric1 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric2 = 2; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric3 = 3; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric4 = 4; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric5 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric6 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric7 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric8 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric9 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio
gSystemConfig.enablePublicationsFilterGeneric10 = 1; //0 - disable | 1 - checkbox | 2 - listbox | 3 - dropdown | 4 - radio


//Big information fields.
gSystemConfig.enablePublicationsInfo1 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo2 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo3 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo4 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo5 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo6 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo7 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo8 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo9 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enablePublicationsInfo10 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Big number fields (up to 34 digits).
gSystemConfig.enablePublicationsNumber1 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsNumber1FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enablePublicationsNumber2 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsNumber2FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enablePublicationsNumber3 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsNumber3FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enablePublicationsNumber4 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsNumber4FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

gSystemConfig.enablePublicationsNumber5 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsNumber5FieldType = 1; //1 - general number | 2 - system currency | 3 - decimal | 4 - system currency with decimals

//URLs.
gSystemConfig.enablePublicationsURL1 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsURL2 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsURL3 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsURL4 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsURL5 = 1; //0 - disable | 1 - enable

//Date fields.
gSystemConfig.enablePublicationsDate1 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsDate1FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configPublicationsDate1Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)

gSystemConfig.enablePublicationsDate2 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsDate2FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configPublicationsDate2Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enablePublicationsDate3 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsDate3FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configPublicationsDate3Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enablePublicationsDate4 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsDate4FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configPublicationsDate4Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

gSystemConfig.enablePublicationsDate5 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsDate5FieldType = 11; //1 - JQuery DatePicker  | 2 - dropdown menu | 11 - js-datepicker
gSystemConfig.configPublicationsDate5Type = 1; //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on)

//File fields.
gSystemConfig.enablePublicationsFile1 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsFile1Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enablePublicationsFile2 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsFile2Type = 34; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enablePublicationsFile3 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsFile3Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enablePublicationsFile4 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsFile4Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

gSystemConfig.enablePublicationsFile5 = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsFile5Type = 3; //1 - image | 3 - file (download) | 34 - file (open direct)

//Activation fields.
gSystemConfig.enablePublicationsActivation1 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsActivation2 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsActivation3 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsActivation4 = 1; //0 - disable | 1 - enable
gSystemConfig.enablePublicationsActivation5 = 1; //0 - disable | 1 - enable


//Frontend configuration.
gSystemConfig.configPublicationsImagePlaceholder = 1; //0 - disable | 1 - enable


gSystemConfig.enablePublicationsFrontendPagination = 1; //0 - disable | 1 - enable (custom) | 11 - enable (bootstrap)
gSystemConfig.enablePublicationsFrontendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configPublicationsFrontendPaginationNRecords = 10;
//**************************************************************************************


//Forms - configuration and resources.
//**************************************************************************************
gSystemConfig.configFormsSort = "id DESC"; //options: id | sort_order | form_title | recipient_name | recipient_email
gSystemConfig.configFormsFieldsSort = "id DESC"; //options: id | sort_order
gSystemConfig.configFormsFieldsOptionsSort = "id DESC"; //options: id | sort_order

//Forms.
//----------------------
gSystemConfig.enableFormsIdParentEdit = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsSortOrder = 1; //0 - disable | 1 - enable

gSystemConfig.enableFormsBindRegisterUser = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsBindRegisterUserMethod = 1; //1 - category ID | 2 - register type
gSystemConfig.configFormsBindRegisterUserIDReference = 3892; //category ID / register type ID | 0 - all registeres
gSystemConfig.configFormsBindRegisterUserSort = "name"; //options: name | name_first | name_last | name_company | date_register esc | date_register desc | sort_order

gSystemConfig.enableFormsRecipientEmailCopy = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsSender = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsSenderConfig = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsEmailFormat = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsMessageSuccess = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsNotes = 1; //0 - disable | 1 - enable

gSystemConfig.enableFormsEmailSectors = 1; //0 - disable | 1 - enable
//----------------------


//Forms fields.
//----------------------
gSystemConfig.enableFormsFieldsSortOrder = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsFieldsInstructions = 1; //0 - disable | 1 - enable

gSystemConfig.enableFormsFieldsFieldFilter = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsFieldFilter = ["email"]; //email

gSystemConfig.enableFormsFieldsRequired = 1; //0 - disable | 1 - enable

gSystemConfig.enableFormsFieldTypeExtraOptions = 1; //0 - disable | 1 - enable (text, subheader, etc)


//Optional fields (field titles in the language configuration file).
//Small information fields.
gSystemConfig.enableFormsFieldsInfoS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsInfoS1FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsInfoS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsInfoS2FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsInfoS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsInfoS3FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsInfoS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsInfoS4FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsInfoS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsInfoS5FieldType = 1; //1 - single line | 2 - multiline
//----------------------

//Forms fields options.
gSystemConfig.enableFormsFieldsOptionsSortOrder = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsFieldsOptionsConfigSelection = 1; //0 - disable | 1 - enable
gSystemConfig.enableFormsFieldsOptionsImageMain = 1; //0 - disable | 1 - enable

//Optional fields (field titles in the language configuration file).
//Small information fields.
gSystemConfig.enableFormsFieldsOptionsInfoS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsOptionsInfoS1FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsOptionsInfoS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsOptionsInfoS2FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsOptionsInfoS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsOptionsInfoS3FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsOptionsInfoS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsOptionsInfoS4FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFormsFieldsOptionsInfoS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFormsFieldsOptionsInfoS5FieldType = 1; //1 - single line | 2 - multiline


//Frontend configuration.

//**************************************************************************************


//email - configuration and resources.
//**************************************************************************************
gSystemConfig.enableEmailSenderDefault = "portfolio@sistemadinamico.com.br";
gSystemConfig.enableEmailSenderNameDefault = "Sistema Dinâmico (Dev - debug: çáéã)";
gSystemConfig.enableEmailReplyDefault = "portfolio@sistemadinamico.com.br";

gSystemConfig.enableEmailRecipientDefault = "jm@planejamentovisual.com.br";
gSystemConfig.enableEmailRecipientNameDefault = "Planejamento Visual - Arte e Tecnologia";

gSystemConfig.enableEmailCCDefault = "jm@planejamentovisual.com.br";
gSystemConfig.enableEmailCCNameDefault = "Planejamento Visual - Arte e Tecnologia";

gSystemConfig.enableEmailBCCDefault = "jm@planejamentovisual.com.br";
gSystemConfig.enableEmailBCCNameDefault = "Planejamento Visual - Arte e Tecnologia";

gSystemConfig.enableEmailTSL = true;
gSystemConfig.enableEmailSSL = false;
//**************************************************************************************


//Filters Generic - configuration and resources.
//**************************************************************************************
gSystemConfig.configFiltersGenericSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
gSystemConfig.enableFiltersGenericSortCustom = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericInputOrder = ["inputRowFiltersGeneric_id_parent", 
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
gSystemConfig.enableFiltersGenericSortOrder = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericImageMain = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericConfigSelection = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericNotes = 1; //0 - disable | 1 - enable
//TODO: change name on DB

gSystemConfig.configFiltersGenericURLAlias = 1; //0 - disable | 1 - automatic | 2 - custom
gSystemConfig.enableFiltersGenericKeywordsTags = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericMetaDescription = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericMetaTitle = 1; //0 - disable | 1 - enable

//Small information fields.
gSystemConfig.enableFiltersGenericInfoS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericInfoS1FieldType = 2; //1 - single line | 2 - multiline

gSystemConfig.enableFiltersGenericInfoS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericInfoS2FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFiltersGenericInfoS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericInfoS3FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFiltersGenericInfoS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericInfoS4FieldType = 1; //1 - single line | 2 - multiline

gSystemConfig.enableFiltersGenericInfoS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericInfoS5FieldType = 1; //1 - single line | 2 - multiline

//Small number fields (up to 9 digits).
gSystemConfig.enableFiltersGenericNumberS1 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericNumberS1FieldType = 2; //1 - general number | 2 - system currency

gSystemConfig.enableFiltersGenericNumberS2 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericNumberS2FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableFiltersGenericNumberS3 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericNumberS3FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableFiltersGenericNumberS4 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericNumberS4FieldType = 1; //1 - general number | 2 - system currency

gSystemConfig.enableFiltersGenericNumberS5 = 1; //0 - disable | 1 - enable
gSystemConfig.configFiltersGenericNumberS5FieldType = 1; //1 - general number | 2 - system currency

//Activation fields.
gSystemConfig.enableFiltersGenericActivation1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericActivation2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericActivation3 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericActivation4 = 1; //0 - disable | 1 - enable
gSystemConfig.enableFiltersGenericActivation5 = 1; //0 - disable | 1 - enable


//Frontend configuration.
gSystemConfig.configFiltersGenericImagePlaceholder = 1; //0 - disable | 1 - enable
//**************************************************************************************


//Search.
//**************************************************************************************
//**************************************************************************************


//Users.
//**************************************************************************************
gSystemConfig.configUsersSort = "id DESC"; //options: id | sort_order | date_creation esc | date_creation desc | title
gSystemConfig.enableUsersSortCustom = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInputOrder = ["inputRowUsers_id_parent", 
                                        "inputRowUsers_sort_order", 
                                        "inputRowUsers_name", 
                                        "inputRowUsers_info1", 
                                        "inputRowUsers_image_main", 
                                        "inputRowUsers_activation", 
                                        "inputRowUsers_id_status", 
                                        "inputRowUsers_notes"
                                      ];

//Authentication method.
gSystemConfig.configUsersRootAuthenticationMethod = 1; //1 - cookie | 2 session //Root was Master on other versions
gSystemConfig.configUsersRootAuthenticationCheck = 1; //0 - only checks if the cookie / session is empty or not (faster) | 1 - reads the database and checks if the user exists and is active (safer, but slower)

gSystemConfig.configUsersAuthenticationMethod = 1; //1 - cookie | 2 session
gSystemConfig.configUsersAuthenticationCheck = 1; //0 - only checks if the cookie / session is empty or not (faster) | 1 - reads the database and checks if the user exists and is active (safer, but slower)


//Basic resources.
gSystemConfig.enableUsersSortOrder = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersType = 1; //0 - disable | 1 - enable

gSystemConfig.enableUsersNameTitle = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersNameFull = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersNameFirst = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersNameLast = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersDateBirth = 11; //0 - disable | 2 - dropdown menu | 11 - js-datepicker 
gSystemConfig.enableUsersGender = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersDocument = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersDocument = 0; //11 - CPF (BR) | 12 - CNPJ (BR)
gSystemConfig.enableUsersAddress = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersPhoneInternationalCode = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersPhone1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersPhone2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersPhone3 = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersUsername = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersEmail = 1; //0 - disable | 1 - enable

gSystemConfig.configUsersPassword = 1; //0 - don´t display | 1 - display
gSystemConfig.configUsersPasswordMethod = 26; //23 - Crypto Module algorithm: aes-128-cbc and simple key password | 24 - Crypto Module algorithm: aes-128-cbc - 16 byte key and 16 byte iv | 26 - Crypto Module algorithm: aes-256-cbc - 32 byte key and 16 byte iv

gSystemConfig.enableUsersImageMain = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersStatus = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersNotes = 1; //0 - disable | 1 - enable

//Pagination.
gSystemConfig.enableUsersBackendPagination = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersBackendPaginationNumbering = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersBackendPaginationNRecords = 15;

//Big information fields.
gSystemConfig.enableUsersInfo1 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo1FieldType = 12; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo2 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo2FieldType = 11; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo3 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo3FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo4 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo4FieldType = 2; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo5 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo5FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo6 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo6FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo7 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo7FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo8 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo8FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo9 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo9FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

gSystemConfig.enableUsersInfo10 = 1; //0 - disable | 1 - enable
gSystemConfig.configUsersInfo10FieldType = 1; //1 - single line | 2 - multiline | 11 - single (encrypted) | 12 - multiline (encrypted)

//Activation fields.
gSystemConfig.enableUsersActivation1 = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersActivation2 = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersActivation3 = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersActivation4 = 1; //0 - disable | 1 - enable
gSystemConfig.enableUsersActivation5 = 1; //0 - disable | 1 - enable
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