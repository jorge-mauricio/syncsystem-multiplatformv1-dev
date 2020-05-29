<?php
//Author information.
//**************************************************************************************

//**************************************************************************************


//PHP configuration.
//**************************************************************************************
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


//Categorias - configuração dos recursos do módulo.
//**************************************************************************************
$configClassificacaoCategorias = "categoria"; //opções: id | n_classificacao | data_categoria esc | data_categoria desc | categoria
$habilitarCategoriasClassificacaoPersonalizada = 0; //0-desativado | 1-ativado 

//Campos convencionais.
$ativacaoCategoriasImagem = 0; //0-desativado | 1-ativado
$ativacaoCategoriasDescricao = 0; //0-desativado | 1-ativado
$habilitarCategoriasNClassificacao = 0; //0-desativado | 1-ativado 
$habilitarCategoriasAcessoRestrito = 0; //0-desativado | 1-ativado 
$habilitarCategoriasIdParentEdicao = 0; //0-desativado | 1-ativado 

//Paginação.
$habilitarCategoriasSistemaPaginacao = 1; //0-desativado | 1-ativado
$habilitarCategoriasSistemaPaginacaoNumeracao = 1; //0-desativado | 1-ativado-->
$configCategoriasSistemaPaginacaoNRegistros = 20;

//Recursos disponíveis para cada categoria.
$habilitarCategoriasFotos = 0; //0-desativado | 1-ativado 
$habilitarCategoriasVideos = 0; //0-desativado | 1-ativado 
$habilitarCategoriasArquivos = 0; //0-desativado | 1-ativado 
$habilitarCategoriasZip = 0; //0-desativado | 1-ativado 
$habilitarCategoriasSwfs = 0; //0-desativado | 1-ativado 


//Definição de quantas e quais informações complementares as categorias terão.
$habilitarCategoriasIc1 = 0; //0-desativado | 1-ativado 
$configTituloCategoriasIc1 = "Descrição 01";
$configCategoriasBoxIc1 = 2; //1 - simples | 2 - multilinha

$habilitarCategoriasIc2 = 0; //0-desativado | 1-ativado 
$configTituloCategoriasIc2 = "Descrição 02"; 
$configCategoriasBoxIc2 = 1; //1 - simples | 2 - multilinha

$habilitarCategoriasIc3 = 0; //0-desativado | 1-ativado
$configTituloCategoriasIc3 = "Descrição 03"; 
$configCategoriasBoxIc3 = 1; //1 - simples | 2 - multilinha

$habilitarCategoriasIc4 = 0; //0-desativado | 1-ativado 
$configTituloCategoriasIc4 = "Descrição 04"; 
$configCategoriasBoxIc4 = 1; //1 - simples | 2 - multilinha

$habilitarCategoriasIc5 = 0; //0-desativado | 1-ativado 
$configTituloCategoriasIc5 = "Descrição 05"; 
$configCategoriasBoxIc5 = 1; //1 - simples | 2 - multilinha


//Site.
$habilitarCategoriasSitePaginacao = 0; //0-desativado | 1-ativado
$habilitarCategoriasSitePaginacaoNumeracao = 1; //0-desativado | 1-ativado-->
$configCategoriasSitePaginacaoNRegistros = 20;
//**************************************************************************************
?>