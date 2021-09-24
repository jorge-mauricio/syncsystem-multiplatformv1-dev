"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

//const _ = require('lodash'); //Loadash
//const request = require('request');

//const datepicker = require("js-datepicker");
//const picker = datepicker(selector, options);
//@import '~js-datepicker/src/datepicker';
//@import '~js-datepicker/dist/datepicker.min.css';
//import "js-datepicker/dist/datepicker.min.js";
//import "js-datepicker/dist/datepicker.min.css";

//const FroalaEditor = require('froala-editor');
//require('../node_modules/froala-editor/js/plugins/align.min.js'); // load a plugin

//const Inputmask = require('inputmask'); //Inputmask
//import Inputmask from "inputmask";

//const _ = require('lodash');
//const os = require("os"); //utility to get hostname //ref: https://nodejs.org/api/os.html#os_os_hostname
//----------------------


module.exports = class CategoriesListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        //objParameters = {idParentCategories: 123, configSortOrder: ""}


        //Properties.
        //----------------------
        this._idParent = objParameters.idParent;
        
        this._pagingNRecords = gSystemConfig.configCategoriesBackendPaginationNRecords;
        this._pagingTotalRecords = 0;
        this._pagingTotal = 0;
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableCategoriesBackendPagination == 1)
        {
            if(!(this._pageNumber))
            {
                this._pageNumber = 1;
            }
        }

        this._masterPageSelect = objParameters.masterPageSelect;

        this._messageSuccess = objParameters.messageSuccess;
        this._messageError = objParameters.messageError;
        this._messageAlert = objParameters.messageAlert;
        this._nRecords = objParameters.nRecords;

        this.queryDefault = "";

        //this.contentType = "categories-default"; //categories-default | 

        this.cphTitle = ""; //text
        this.cphHead = ""; //HTML
        this.cphTitleCurrent = ""; //text
        //this.cphBody = "html body"; 
        //this.cphBody = this.cphBodyBuild(); //HTML
        this.cphBody = ""; //HTML

        this.titleCurrent = "";

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";

        this.dateNow = new Date(SyncSystemNS.FunctionsGeneric.timeZoneConverter())
        this.dateNowDay = this.dateNow.getDate();
        this.dateNowMonth = this.dateNow.getMonth() + 1;
        this.dateNowYear = this.dateNow.getFullYear();
        this.dateNowMinute = this.dateNow.getMinutes();
        this.dateNowHour = this.dateNow.getHours();
        this.dateNowSecond = this.dateNow.getSeconds();

        this.cacheClear = this.dateNow.getTime().toString(); //variable to clear image cache
        //----------------------

        /*
        (async function(){ 
            try{
                //cphBody = await this.cphBodyBuild();
                await this.cphBodyBuild();
            }catch(asyncError){
                console.error(asyncError);
            }finally{
                
            }
        })();
        */
    }
    //**************************************************************************************


    //Getters / Setters.
    //**************************************************************************************
    /*
    set _idParent(val){
        //console.log("setting foo")
        this._idParent = val;
    }

    get _idParent(){
        //console.log("getting foo");
        return this._idParent;
    }
    */
    //**************************************************************************************


    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Logic.
        //----------------------
        try
        {
            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            /*
            request({url:url, qs:propertiesObject}, function(err, response, body) {
                if(err) { console.log(err); return; }
                console.log("Get response: " + response.statusCode);
              });
              */


            //Tittle - current.
            //this.titleCurrent = "";
            if(this._idParent != 0)
            {
                //let tblCategoryCurrent = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                let tblCategoryCurrent = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                        ["id;" + this._idParent + ";i"], 
                                                                                        "", 
                                                                                        "1", 
                                                                                        "id, title, activation", 
                                                                                        1, 
                                                                                        {returnType: 3});
                
                if(tblCategoryCurrent.length !== 0) //check for empty (not working)
                //if(!tblCategoryCurrent.length === 0) //check for empty (not working)
                //if(!_.isEmpty(tblCategoryCurrent)) //check for empty (loadash)
                {
                    
                    this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(tblCategoryCurrent[0].title, "db");
                

                    //Degug.
                    //console.log("tblCategoryCurrent (vazio) = ");
                    //console.log(tblCategoryCurrent);
                    //console.log(tblCategoryCurrent.length);
                    //console.log(tblCategoryCurrent.length);
                }
                //Debug.
                //console.log("tblCategoryCurrent = ", tblCategoryCurrent);
                //console.log(tblCategoryCurrent);
            }


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain");
            if(this.titleCurrent)
            {
                this.metaTitle += " - " + this.titleCurrent;
            }

            //Meta description.
            this.metaDescription += "";

            //Meta keywords.
            this.metaKeywords += "";

            //Meta URL current.
            this.metaURLCurrent += gSystemConfig.configSystemURL + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackend + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendCategories + "/";
            this.metaURLCurrent += this._idParent + "/";
            //if(this._masterPageSelect !== "")
            //{
                this.metaURLCurrent += "?masterPageSelect=" + this._masterPageSelect;
            //}
            if(this._pageNumber !== "")
            {
                this.metaURLCurrent += "&pageNumber=" + this._pageNumber;
            }
            

            //Title content placeholder.
            await this.cphTitleBuild();

            
            //Head content placeholder.
            await this.cphHeadBuild();


            //Title content placeholder.
            await this.cphTitleCurrentBuild();


            //Body content placeholder.
            await this.cphBodyBuild();
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


    //Build content placeholder title.
    //**************************************************************************************
    //static async cphBodyBuild()
    async cphTitleBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphTitle = SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain");

            if(this.titleCurrent)
            {
                this.cphTitle += " - " + this.titleCurrent;
            }


            /*
            if(this._idParent != 0)
            {

                let tblCategoryCurrent = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                                                                                        ["id;" + this._idParent + ";i"], 
                                                                                        "", 
                                                                                        "1", 
                                                                                        "id, title, activation", 
                                                                                        1, 
                                                                                        {returnType: 3});
                
                if(tblCategoryCurrent.length !== 0) //check for empty (not working)
                //if(!tblCategoryCurrent.length === 0) //check for empty (not working)
                //if(!_.isEmpty(tblCategoryCurrent)) //check for empty (loadash)
                {
                    
                    this.cphTitle += " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(tblCategoryCurrent[0].title, "db");
                

                    //Degug.
                    //console.log("tblCategoryCurrent (vazio) = ");
                    //console.log(tblCategoryCurrent);
                    //console.log(tblCategoryCurrent.length);
                    //console.log(tblCategoryCurrent.length);
                }


                //Debug.
                //console.log("tblCategoryCurrent = ", tblCategoryCurrent);
                //console.log(tblCategoryCurrent);
            }
            */

            
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


    //Build content placeholder head.
    //**************************************************************************************
    async cphHeadBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphHead += `
                <meta name="title" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaTitle) }" /> ${ /*Bellow 160 characters.*/'' }
                <meta name="description" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaDescription) }" /> ${ /*Bellow 100 characters.*/'' }
                <meta name="keywords" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaKeywords) }" /> ${ /*Bellow 60 characters.*/'' }

                ${ /*Open Graph tags.*/'' }
                <meta property="og:title" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaTitle) }" />
                <meta property="og:type" content="website" /> ${ /*http://ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/*/'' }
                <meta property="og:url" content="${ this.metaURLCurrent }" />
                <meta property="og:description" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaDescription) }" />
                <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png" }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                <meta property="og:image:alt" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaTitle) }" />
                <meta property="og:locale" content="${ gSystemConfig.configBackendLanguage }" />
            `;

            /**
            this.cphHead += "<meta name='title' content='' />"; //Bellow 160 characters.
            this.cphHead += "<meta name='description' content='' />"; //Bellow 100 characters.
            this.cphHead += "<meta name='keywords' content='' />"; //Bellow 60 characters.

            //Open Graph tags. 
            this.cphHead += "<meta property='og:title' content='' />";
            this.cphHead += "<meta property='og:type' content='website' />"; //http://ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/
            this.cphHead += "<meta property='og:url' content='' />"; 
            this.cphHead += "<meta property='og:description' content='' />"; 
            this.cphHead += "<meta property='og:image' content='' />"; //The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.
            this.cphHead += "<meta property='og:image:alt' content='' />"; 
            this.cphHead += "<meta property='og:locale' content='en_US' />"; 
            */             
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


    //Build content placeholder current title of the page (in the layout).
    //**************************************************************************************
    async cphTitleCurrentBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendMenuStart");
            this.cphTitleCurrent += " - ";

            this.cphTitleCurrent += `
            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/0" }" class="ss-backend-links04">
                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRoot") }
            </a>
            `;
            if(this.titleCurrent)
            {
                this.cphTitleCurrent += " - " + this.titleCurrent;
            }
            //TODO: Breadcrumbs.


            //Debug.
            //console.log("cphTitleCurrent=",  this.cphTitleCurrent);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************

    
    //Build content placeholder body.
    //**************************************************************************************
    //static async cphBodyBuild()
    async cphBodyBuild()
    {
        //Variables.
        //----------------------
        //let strReturn = "<h1>Testing layout body</h1>"; //debug.
        let strReturn = "";
        let backendHTML = "";
        let arrSearchParameters = [];
        let arrFiltersGenericSearchParameters = [];

        let oclRecords = "";
        let oclRecordsParameters = {};

        let ofglRecords = "";
        let ofglRecordsParameters = {};



        //Debug.
        //console.log("oclRecordsParameters=", oclRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //Parameters build.
            arrSearchParameters.push("id_parent;" + this._idParent + ";i");
            //arrSearchParameters.push("activation;1;i");

            oclRecordsParameters = {
                _arrSearchParameters: arrSearchParameters,
                _configSortOrder: gSystemConfig.configCategoriesSort,
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };
            /*
            let oclRecordsParameters = {
                _arrSearchParameters: ["id_parent;0;i", "activation;1;i"],
                _configSortOrder: gSystemConfig.configCategoriesSort,
                _strNRecords: "5",
                _objSpecialParameters: {}
            };*/ //working (debug)


            //Pagination.
            if(gSystemConfig.enableCategoriesBackendPagination == 1)
            {
                //this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                            arrSearchParameters, 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "", 
                                                                                            "id, id_parent", 
                                                                                            3, 
                                                                                            {});

                this._pagingTotal = Math.ceil(this._pagingTotalRecords / this._pagingNRecords);


                //Parameters build - paging.
                //oclRecordsParameters._strNRecords = this._pagingNRecords;
                oclRecordsParameters._objSpecialParameters._pageNumber = this._pageNumber;
                oclRecordsParameters._objSpecialParameters._pagingNRecords = this._pagingNRecords;
            }

            //Object build.
            oclRecords = new SyncSystemNS.ObjectCategoriesListing(oclRecordsParameters);
            await oclRecords.recordsListingGet(0, 3);


            //Parameters build.
            arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableCategories + ";s");
            
            ofglRecordsParameters = {
                _arrSearchParameters: arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            //Todo: check if filter is enabled.
            let ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(ofglRecordsParameters);
            await ofglRecords.recordsListingGet(0, 3);


            //Filters - Status.
            if(gSystemConfig.enableCategoriesStatus != 0)
            {
                var resultsCategoriesStatusListing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }

            //Filter results acording to filter_index.
            if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
            {
                var resultsCategoriesFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                    //console.log("obj = ", obj);
                });
                //console.log("ofglRecords.resultsFiltersGenericListing = ", ofglRecords.resultsFiltersGenericListing);
                //console.log("resultsFiltersGeneric1Listing = ", resultsFiltersGeneric1Listing);
            }
            if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
            {
                var resultsCategoriesFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 102;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
            {
                var resultsCategoriesFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 102;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric3 != 0)
            {
                var resultsCategoriesFiltersGeneric3Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 103;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric4 != 0)
            {
                var resultsCategoriesFiltersGeneric4Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 104;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric5 != 0)
            {
                var resultsCategoriesFiltersGeneric5Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 105;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric6 != 0)
            {
                var resultsCategoriesFiltersGeneric6Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 106;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric7 != 0)
            {
                var resultsCategoriesFiltersGeneric7Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 107;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric8 != 0)
            {
                var resultsCategoriesFiltersGeneric8Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 108;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric9 != 0)
            {
                var resultsCategoriesFiltersGeneric9Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 109;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric10 != 0)
            {
                var resultsCategoriesFiltersGeneric10Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 110;
                });
            }


            //this.cphBody = JSON.stringify(oclRecords);
            //this.cphBody = JSON.stringify(oclRecords.resultsCategoriesListing); //Debug. //working
            //console.log("oclRecords = ", oclRecords);
            //console.log("typeof oclRecords = ", typeof oclRecords);


            //Build HTML (template string).
            //ref: https://wesbos.com/template-strings-html/

            /*
            //Loop pelos resultados (debug).
            //----------------------
            for(let countObjArray = 0; countObjArray < oclRecords.resultsCategoriesListing.length; countObjArray++)
            {
                
                let categoriesRow = oclRecords.resultsCategoriesListing[countObjArray];
                for(let key in categoriesRow)
                {
                    backendHTML += key + "=" + categoriesRow[key] + "<br />";

                }
                backendHTML += "<br />";



                //Debug.
                //backendHTML += oclRecords.resultsCategoriesListing[countObjArray];
                //backendHTML += categoriesRow.length;
            } 
            //----------------------
            */ /*debug - working */


            /* */
            backendHTML = `
            <div id="divMessageSuccess" class="ss-backend-success">
                ${ 
                    (this._nRecords) ? 
                    `
                        ${ this._nRecords + " " }
                    `
                    : 
                    ``
                } 
            
                ${ 
                    (this._messageSuccess) ? 
                    `
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this._messageSuccess) }
                    `
                    : 
                    ``
                } 
            </div>
            <div id="divMessageError" class="ss-backend-error">
                ${ 
                    (this._messageError) ? 
                    `
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this._messageError) }
                    `
                    : 
                    ``
                } 
            </div>
            <div id="divMessageAlert" class="ss-backend-alert">
                ${ 
                    (this._messageAlert) ? 
                    `
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this._messageAlert) }
                    `
                    : 
                    ``
                } 
            
                ${
                    /*Debug.*/
                    /*"FunctionsCrypto.encryptValue=" + SyncSystemNS.FunctionsCrypto.encryptValue("testing encryption", 2) + "<br />" +*/
                    /*"FunctionsCrypto.decryptValue 23=" + SyncSystemNS.FunctionsCrypto.decryptValue("7d9690aa7af8350618fba2d1060fdefd233480f4a2de8227e605a9522b44f0e4", 2) + "<br />" +*/ /* 23 */
                    /*"FunctionsCrypto.decryptValue 26=" + SyncSystemNS.FunctionsCrypto.decryptValue("1c7839affd95d5bc4c638d4c57fa903a326d6a5bb326f6eaa4b8c08269a400bd", 2) + "<br />" +*/ /* 26 */
                    /*"_idParent=" + this._idParent + "<br />" +*/ /*working*/
                    /*"_idParent=" + this._idParent + "<br />" +*/ /*working*/
                    /*"_pageNumber=" + this._pageNumber + "<br />" +*/ /*working*/
                    /*"_masterPageSelect=" + this._masterPageSelect + "<br />"*/ /*working*/
                    /*"FunctionsGeneric=" + SyncSystemNS.FunctionsGeneric.categoryConfigSelect(2, 5)*/ /*working*/
                    /*"hostname=" + os.hostname() + "<br />" +*/
                    /*"networkInterfaces=" + JSON.stringify(os.networkInterfaces()) + "<br />" +*/
                    /*"networkInterfaces=" + _(os.networkInterfaces()).values().flatten().where({ family: 'IPv4', internal: false }).pluck('address').first() + "<br />" +*/
                    /*"networkInterfaces=" + Object.values(os.networkInterfaces())
                    .reduce((r,a)=>{
                        r = r.concat(a)
                        return r;
                    }, [])
                    .filter(({family, address}) => {
                        return family.toLowerCase().indexOf('v4') >= 0 && address !== '127.0.0.1'
                    })
                    .map(({address}) => address).join(', ') + "<br />" +*/
                    /*"global=" + global.URL() + "<br />" +*/ /*working - result: 192.168.201.1, 192.168.26.1, 192.168.0.11, 127.0.0.1*/
                    ''
                }
            </div>
            <script>
                //Debug.
                //alert(document.location);
                //alert(window.location.hostname);
                //alert(window.location.host);
                //alert(window.location.origin);
            </script>

            <section class="ss-backend-layout-section-data01">
            ${oclRecords.resultsCategoriesListing == "" ? `
                <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                </div>
            ` : `
                <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                    <button 
                        id="categories_delete" 
                        name="categories_delete" 
                        onclick="elementMessage01('formCategoriesListing_method', 'DELETE');
                                formSubmit('formCategoriesListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                " 
                        class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                        style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                    </button>
                </div>

                <form id="formCategoriesListing" name="formCategoriesListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="formCategoriesListing_method" name="_method" value="">

                    <input type="hidden" id="formCategoriesListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableCategories }" />
                    
                    <input type="hidden" id="formCategoriesListing_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="formCategoriesListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories }" />
                    <input type="hidden" id="formCategoriesListing_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="formCategoriesListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                <tr>
                                    ${ gSystemConfig.enableCategoriesSortOrder == 1 ? 
                                    `
                                    <td style="width: 40px; text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                    </td>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableCategoriesImageMain == 1 ? 
                                    `
                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }  
                                    </td>
                                    ` : ``
                                    }

                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesCategory") }  
                                    </td>
                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                    </td>

                                    ${ gSystemConfig.enableCategoriesStatus == 1 ? 
                                        `
                                        <td style="width: 100px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesStatus") }  
                                        </td>
                                        ` : ``
                                    }

                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivationA") }  
                                    </td>
                                    ${ gSystemConfig.enableCategoriesActivation1 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation1") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableCategoriesActivation2 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation2") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableCategoriesActivation3 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation3") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableCategoriesActivation4 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation4") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableCategoriesActivation5 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation5") }  
                                        </td>
                                        ` : ``
                                    }

                                    ${ gSystemConfig.enableCategoriesRestrictedAccess == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccessA") }  
                                        </td>
                                        ` : ``
                                    }

                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                    </td>
                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }  
                                    </td>
                                </tr>
                            </thead>

                            <tbody class="ss-backend-table-listing-text01">
                            ${ oclRecords.resultsCategoriesListing.map((categoriesRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        ${ gSystemConfig.enableCategoriesSortOrder == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.sort_order, "", 3, null) } 
                                        </td>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableCategoriesImageMain == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ categoriesRow.image_main !== "" ? 
                                            `
                                                ${ /*No pop-up.*/'' }
                                                ${ gSystemConfig.configImagePopup == 0 ? 
                                                `
                                                    <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + categoriesRow.image_main }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }" class="ss-backend-images-listing" />
                                                ` : ``
                                                }

                                                ${ /*GLightbox.*/'' }
                                                ${ gSystemConfig.configImagePopup == 4 ? 
                                                `
                                                    <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + categoriesRow.image_main }"
                                                       title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }"
                                                       class="glightbox_categories_image_main${ categoriesRow.id }"
                                                       data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") };">

                                                        <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + categoriesRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }" class="ss-backend-images-listing" />
                                                    </a>
                                                    <script>
                                                        /*
                                                        var lightboxDescription = GLightbox({
                                                            loop: false,
                                                            autoplayVideos: true,
                                                            openEffect: "fade", //zoom, fade, none
                                                            slideEffect: "slide", //slide, fade, zoom, none
                                                            moreText: "+", //More text for descriptions on mobile devices.
                                                            touchNavigation: true,
                                                            descPosition: "bottom", //Global position for slides description, you can define a specific position on each slide (bottom, top, left, right).
                                                            selector: "glightbox_categories_image_main"
                                                        });
                                                        */

                                                        gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ categoriesRow.id }";
                                                        //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                        //data-glightbox="title: Title example.; description: Description example."
                                                        var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                    </script>
                                                ` : ``
                                                }
                                            ` : ``
                                            }
                                        </td>
                                        ` : ``
                                        }
                                        
                                        <td style="text-align: left;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  categoriesRow.id }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") } 
                                            </a>
                                            ${ gSystemConfig.enableCategoriesDescription == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDescription") }:
                                                    </strong>

                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.description, "db") }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo1 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo1") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo1FieldType == 1 || gSystemConfig.configCategoriesInfo1FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info1, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo1FieldType == 11 || gSystemConfig.configCategoriesInfo1FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info1, "db"), 2) }
                                                        ` : ``
                                                    }
                                                    
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo2 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo2") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo2FieldType == 1 || gSystemConfig.configCategoriesInfo2FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info2, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo2FieldType == 11 || gSystemConfig.configCategoriesInfo2FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info2, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo3 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo3") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo3FieldType == 1 || gSystemConfig.configCategoriesInfo3FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info3, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo3FieldType == 11 || gSystemConfig.configCategoriesInfo3FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info3, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo4 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo4") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo4FieldType == 1 || gSystemConfig.configCategoriesInfo4FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info4, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo4FieldType == 11 || gSystemConfig.configCategoriesInfo4FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info4, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo5 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo5") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo5FieldType == 1 || gSystemConfig.configCategoriesInfo5FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info5, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo5FieldType == 11 || gSystemConfig.configCategoriesInfo5FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info5, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo6 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo6") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo6FieldType == 1 || gSystemConfig.configCategoriesInfo6FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info6, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo6FieldType == 11 || gSystemConfig.configCategoriesInfo6FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info6, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo7 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo7") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo7FieldType == 1 || gSystemConfig.configCategoriesInfo7FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info7, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo7FieldType == 11 || gSystemConfig.configCategoriesInfo7FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info7, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo8 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo8") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo8FieldType == 1 || gSystemConfig.configCategoriesInfo8FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info8, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo8FieldType == 11 || gSystemConfig.configCategoriesInfo8FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info8, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo9 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo9") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo9FieldType == 1 || gSystemConfig.configCategoriesInfo9FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info9, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo9FieldType == 11 || gSystemConfig.configCategoriesInfo9FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info9, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfo10 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo10") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesInfo10FieldType == 1 || gSystemConfig.configCategoriesInfo10FieldType == 2 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info10, "db") }
                                                        ` : ``
                                                    }

                                                    ${ /*Encrypted.*/'' }
                                                    ${ gSystemConfig.configCategoriesInfo10FieldType == 11 || gSystemConfig.configCategoriesInfo10FieldType == 12 ? 
                                                        `
                                                        ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info10, "db"), 2) }
                                                        ` : ``
                                                    }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfoS1 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS1") }:
                                                    </strong>

                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info_small1, "db") }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfoS2 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS2") }:
                                                    </strong>

                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info_small2, "db") }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfoS3 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS3") }:
                                                    </strong>

                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info_small3, "db") }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfoS4 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS4") }:
                                                    </strong>

                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info_small4, "db") }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesInfoS5 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS5") }:
                                                    </strong>

                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info_small5, "db") }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumber1 == 1 ? 
                                            `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber1") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumber1FieldType == 2 || gSystemConfig.configCategoriesNumber1FieldType == 4 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number1, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber1FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumber2 == 1 ? 
                                            `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber2") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumber2FieldType == 2 || gSystemConfig.configCategoriesNumber2FieldType == 4 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number2, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber2FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumber3 == 1 ? 
                                            `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber3") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumber3FieldType == 2 || gSystemConfig.configCategoriesNumber3FieldType == 4 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number3, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber3FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumber4 == 1 ? 
                                            `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber4") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumber4FieldType == 2 || gSystemConfig.configCategoriesNumber4FieldType == 4 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number4, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber4FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumber5 == 1 ? 
                                            `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber5") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumber5FieldType == 2 || gSystemConfig.configCategoriesNumber5FieldType == 4 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number5, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber5FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumberS1 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS1") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumberS1FieldType == 2 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number_small1, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS1FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumberS2 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS2") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumberS2FieldType == 2 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number_small2, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS2FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumberS3 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS3") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumberS3FieldType == 2 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number_small3, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS3FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumberS4 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS4") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumberS4FieldType == 2 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number_small4, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS4FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesNumberS5 == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS5") }:
                                                    </strong>

                                                    ${ gSystemConfig.configCategoriesNumberS5FieldType == 2 ? 
                                                    `
                                                        ${ gSystemConfig.configSystemCurrency }
                                                    ` : ``
                                                    }

                                                    ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number_small5, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS5FieldType) }
                                                </div>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesDate1 == 1 ? 
                                                `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate1") }:
                                                        </strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.dateRead01(categoriesRow.date1, 
                                                                                                    gSystemConfig.configBackendDateFormat, 
                                                                                                    0, 
                                                                                                    gSystemConfig.configCategoriesDate1Type) }
                                                    </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesDate2 == 1 ? 
                                                `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate2") }:
                                                        </strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.dateRead01(categoriesRow.date2, 
                                                                                                    gSystemConfig.configBackendDateFormat, 
                                                                                                    0, 
                                                                                                    gSystemConfig.configCategoriesDate2Type) }
                                                    </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesDate3 == 1 ? 
                                                `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate3") }:
                                                        </strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.dateRead01(categoriesRow.date3, 
                                                                                                    gSystemConfig.configBackendDateFormat, 
                                                                                                    0, 
                                                                                                    gSystemConfig.configCategoriesDate3Type) }
                                                    </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesDate4 == 1 ? 
                                                `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate4") }:
                                                        </strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.dateRead01(categoriesRow.date4, 
                                                                                                    gSystemConfig.configBackendDateFormat, 
                                                                                                    0, 
                                                                                                    gSystemConfig.configCategoriesDate4Type) }
                                                    </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesDate5 == 1 ? 
                                                `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate5") }:
                                                        </strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.dateRead01(categoriesRow.date5, 
                                                                                                    gSystemConfig.configBackendDateFormat, 
                                                                                                    0, 
                                                                                                    gSystemConfig.configCategoriesDate5Type) }
                                                    </div>
                                                ` : ``
                                            }
    
                                            ${ gSystemConfig.enableCategoriesFile1 == 1 ? 
                                                `
                                                ${ gSystemConfig.configCategoriesFile1Type == 3 || gSystemConfig.configCategoriesFile1Type == 34 ? 
                                                    `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile1") }:
                                                        </strong>
                                                        
                                                        ${ /*file (download)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile1Type == 3 ? 
                                                        `
                                                            <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file1 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file1 }
                                                            </a>

                                                            <!--a onlick="fileDownload('${ categoriesRow.file1 }', '${ gSystemConfig.configSystemURL + "/" + gSystemConfig.configDirectoryFilesSD }');" class="ss-backend-links01">
                                                                ${ categoriesRow.file1 }
                                                            </a-->
                                                        ` : ``
                                                        }

                                                        ${ /*file (open direct)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile1Type == 34 ? 
                                                        `
                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file1 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file1 }
                                                            </a>
                                                        ` : ``
                                                        }
                                                    </div>
                                                ` : ``
                                                }
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesFile2 == 1 ? 
                                                `
                                                ${ gSystemConfig.configCategoriesFile2Type == 3 || gSystemConfig.configCategoriesFile2Type == 34 ? 
                                                    `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile2") }:
                                                        </strong>
                                                        
                                                        ${ /*file (download)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile2Type == 3 ? 
                                                        `
                                                            <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file2 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file2 }
                                                            </a>

                                                            <!--a onlick="fileDownload('${ categoriesRow.file2 }', '${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD }')" class="ss-backend-links01">
                                                                ${ categoriesRow.file2 }
                                                            </a-->
                                                        ` : ``
                                                        }

                                                        ${ /*file (open direct)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile2Type == 34 ? 
                                                        `
                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file2 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file2 }
                                                            </a>
                                                        ` : ``
                                                        }
                                                    </div>
                                                ` : ``
                                                }
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesFile3 == 1 ? 
                                                `
                                                ${ gSystemConfig.configCategoriesFile3Type == 3 || gSystemConfig.configCategoriesFile3Type == 34 ? 
                                                    `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile3") }:
                                                        </strong>
                                                        
                                                        ${ /*file (download)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile3Type == 3 ? 
                                                        `
                                                            <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file3 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file3 }
                                                            </a>

                                                            <!--a onlick="fileDownload('${ categoriesRow.file3 }', '${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD }')" class="ss-backend-links01">
                                                                ${ categoriesRow.file3 }
                                                            </a-->
                                                        ` : ``
                                                        }

                                                        ${ /*file (open direct)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile3Type == 34 ? 
                                                        `
                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file3 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file3 }
                                                            </a>
                                                        ` : ``
                                                        }
                                                    </div>
                                                ` : ``
                                                }
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableCategoriesFile4 == 1 ? 
                                                `
                                                ${ gSystemConfig.configCategoriesFile4Type == 3 || gSystemConfig.configCategoriesFile4Type == 34 ? 
                                                    `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile4") }:
                                                        </strong>
                                                        
                                                        ${ /*file (download)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile4Type == 3 ? 
                                                        `
                                                            <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file4 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file4 }
                                                            </a>

                                                            <!--a onlick="fileDownload('${ categoriesRow.file4 }', '${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD }')" class="ss-backend-links01">
                                                                ${ categoriesRow.file4 }
                                                            </a-->
                                                        ` : ``
                                                        }

                                                        ${ /*file (open direct)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile4Type == 34 ? 
                                                        `
                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file4 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file4 }
                                                            </a>
                                                        ` : ``
                                                        }
                                                    </div>
                                                ` : ``
                                                }
                                            ` : ``
                                            }
                                            
                                            ${ gSystemConfig.enableCategoriesFile5 == 1 ? 
                                                `
                                                ${ gSystemConfig.configCategoriesFile5Type == 3 || gSystemConfig.configCategoriesFile5Type == 34 ? 
                                                    `
                                                    <div>
                                                        <strong>
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile5") }:
                                                        </strong>
                                                        
                                                        ${ /*file (download)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile5Type == 3 ? 
                                                        `
                                                            <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file5 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file5 }
                                                            </a>

                                                            <!--a onlick="fileDownload('${ categoriesRow.file5 }', '${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD }')" class="ss-backend-links01">
                                                                ${ categoriesRow.file5 }
                                                            </a-->
                                                        ` : ``
                                                        }

                                                        ${ /*file (open direct)*/'' }
                                                        ${ gSystemConfig.configCategoriesFile5Type == 34 ? 
                                                        `
                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + categoriesRow.file5 }" target="_blank" class="ss-backend-links01">
                                                                ${ categoriesRow.file5 }
                                                            </a>
                                                        ` : ``
                                                        }
                                                    </div>
                                                ` : ``
                                                }
                                            ` : ``
                                            }     
                                            
                                            ${ gSystemConfig.enableCategoriesNotes == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }:
                                                    </strong>

                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.notes, "db") }
                                                </div>
                                            ` : ``
                                            }
    
                                            ${
                                                /*Debug.*/
                                                /*"<br />" + */
                                                /*"BigInt()=" + BigInt(12312312312312312312312311.000000000000000000000000000000) + "<br />" +
                                                "valueMaskWrite(number1)=" + SyncSystemNS.FunctionsGeneric.valueMaskWrite("2,45") + "<br />" +
                                                "valueMaskWrite(number1)=" + SyncSystemNS.FunctionsGeneric.valueMaskWrite("1.000.000.000.000.000.000,52") + "<br />" +*/
                                                /*"number1=" + categoriesRow.number1 + "<br />" + */
                                                /*"BigInt(number1)=" + BigInt(categoriesRow.number1) + "<br />" +*/
                                                /*"JSON.stringify(BigInt(number1))=" + JSON.stringify(BigInt(categoriesRow.number1).toString() + "n") + "<br />" +*/
                                                /*"valueMaskRead(number1)=" + SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number1, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber1FieldType) + "<br />" + */
                                                /*"parseInt(number1)=" + parseInt(categoriesRow.number1) + "<br />" +*/
                                                /*"date1=" + categoriesRow.date1 + "<br />" + */
                                                /*"dateRead01(date1)=" + SyncSystemNS.FunctionsGeneric.dateRead01(categoriesRow.date1, 
                                                                                                    gSystemConfig.configBackendDateFormat, 
                                                                                                    0, 
                                                                                                    gSystemConfig.configCategoriesDate1Type) + "<br />" + */
                                                /*"dateMount (dateField)=" + SyncSystemNS.FunctionsGeneric.dateMount({
                                                    dateField: "21/01/1978",
                                                    dateFieldDay: "",
                                                    dateFieldMonth: "",
                                                    dateFieldYear: "",
                                                    dateFieldHour: "",
                                                    dateFieldMinute: "",
                                                    dateFieldSeconds: ""
                                                },  
                                                gSystemConfig.configBackendDateFormat, 
                                                "") + "<br />" +

                                                "dateMount (other fields)=" + SyncSystemNS.FunctionsGeneric.dateMount({
                                                    dateField: "",
                                                    dateFieldDay: "21",
                                                    dateFieldMonth: "01",
                                                    dateFieldYear: "1978",
                                                    dateFieldHour: "14",
                                                    dateFieldMinute: "05",
                                                    dateFieldSeconds: "00"
                                                },  
                                                gSystemConfig.configBackendDateFormat, 
                                                "") + "<br />" +

                                                "dateMount (dateField and hour)=" + SyncSystemNS.FunctionsGeneric.dateMount({
                                                    dateField: "21/01/1978",
                                                    dateFieldDay: "",
                                                    dateFieldMonth: "",
                                                    dateFieldYear: "",
                                                    dateFieldHour: "14",
                                                    dateFieldMinute: "05",
                                                    dateFieldSeconds: "00"
                                                },  
                                                gSystemConfig.configBackendDateFormat, 
                                                "") + "<br />" +

                                                "dateSQLWrite(dateMount) (dateField)=" + SyncSystemNS.FunctionsGeneric.dateSQLWrite(SyncSystemNS.FunctionsGeneric.dateMount({
                                                    dateField: "21/01/1978",
                                                    dateFieldDay: "",
                                                    dateFieldMonth: "",
                                                    dateFieldYear: "",
                                                    dateFieldHour: "",
                                                    dateFieldMinute: "",
                                                    dateFieldSeconds: ""
                                                },  
                                                gSystemConfig.configBackendDateFormat, 
                                                ""), gSystemConfig.configBackendDateFormat) + "<br />" +

                                                //SyncSystemNS.FunctionsGeneric.dateSQLWrite(categoriesRow.date1, gSystemConfig.configBackendDateFormat) + "<br />" +
                                                SyncSystemNS.FunctionsGeneric.dateSQLWrite("15/02/2020", gSystemConfig.configBackendDateFormat) + "<br />" +*/ ''
                                            }
                                        </td>

                                        <td style="text-align: center;">
                                            ${ /*SyncSystemNS.FunctionsGeneric.categoryConfigSelect(categoriesRow.category_type, 4)*/'' }
                                            
                                            ${ 
                                                SyncSystemNS.FunctionsGeneric.categoryConfigSelect(categoriesRow.category_type, 0) == "-" ? 
                                                `
                                                    ${ SyncSystemNS.FunctionsGeneric.categoryConfigSelect(categoriesRow.category_type, 5) }
                                                `
                                                : 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + SyncSystemNS.FunctionsGeneric.categoryConfigSelect(categoriesRow.category_type, 3) + "/" + categoriesRow.id }" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ /*categoriesRow.category_type*/'' } 
                                                        ${ SyncSystemNS.FunctionsGeneric.categoryConfigSelect(categoriesRow.category_type, 5) }
                                                    </a> 
                                                `
                                            } 

                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + gSystemConfig.configRouteBackendDetails + "/" + categoriesRow.id }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a> 
                                            <!--a href="/${ gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a--> ${ /*TODO: Change address to access frontend.*/ '' }


                                            ${ /*Images.*/ '' }
                                            ${ gSystemConfig.enableCategoriesImages == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + categoriesRow.id + "?fileType=1&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertImages") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Videos.*/ '' }
                                            ${ gSystemConfig.enableCategoriesVideos == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + categoriesRow.id + "?fileType=2&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertVideos") }
                                                    </a> 
                                                ` : ``
                                            }
                                            
                                            ${ /*Files.*/ '' }
                                            ${ gSystemConfig.enableCategoriesFiles == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + categoriesRow.id + "?fileType=3&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertFiles") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Zip files.*/ '' }
                                            ${ gSystemConfig.enableCategoriesZip == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + categoriesRow.id + "?fileType=4&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertFilesZip") }
                                                    </a> 
                                                ` : ``
                                            }
                                        </td>

                                        ${ gSystemConfig.enableCategoriesStatus == 1 ? 
                                            `
                                            <td style="text-align: center;">
                                                ${ categoriesRow.id_status == 0 ? `
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }
                                                ` : `
                                                    ${ ofglRecords.resultsFiltersGenericListing.filter(function(objFiltered){
                                                        return objFiltered.id == categoriesRow.id_status;
                                                    }).map(function(objMapped){
                                                        //return objMapped.title
                                                        return SyncSystemNS.FunctionsGeneric.contentMaskRead(objMapped.title, "db");
                                                    }) }

                                                    ${ /*categoriesRow.id_status*/ '' }
                                                ` }
                                            </td>
                                            ` : ``
                                        }
    
                                        <td id="formCategoriesListing_elementActivation${ categoriesRow.id }" style="text-align: center;" class="${ categoriesRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                            <a id="linkActivation${ categoriesRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ categoriesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                        strField:'activation', 
                                                                                        recordValue: '${ categoriesRow.activation == 1 ? 0 : 1}', 
                                                                                        patchType: 'toggleValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        //alert(JSON.stringify(_resObjReturn));
                                                                                        
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Check status.
                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '0')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formCategoriesListing_elementActivation${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formCategoriesListing_elementActivation${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
                                                                                            }

                                                                                            //Success message.
                                                                                            elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage11") }');

                                                                                        }else{
                                                                                            //Show error.
                                                                                            elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                        }

                                                                                        //Hide ajax progress bar.
                                                                                        htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                    });">
                                                ${ 
                                                    categoriesRow.activation == "1" ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        ${ gSystemConfig.enableCategoriesActivation1 == 1 ? 
                                            `
                                            <td id="formCategoriesListing_elementActivation1${ categoriesRow.id }" style="text-align: center;" class="${ categoriesRow.activation1 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation1${ categoriesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ categoriesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                        strField:'activation1', 
                                                                                        recordValue: '${ categoriesRow.activation1 == 1 ? 0 : 1}', 
                                                                                        patchType: 'toggleValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Check status.
                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '0')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formCategoriesListing_elementActivation1${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formCategoriesListing_elementActivation1${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
                                                                                            }

                                                                                            //Success message.
                                                                                            elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage11") }');
                                                                                        }else{
                                                                                            //Show error.
                                                                                            elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                        }

                                                                                        //Hide ajax progress bar.
                                                                                        htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                    });">
                                                    ${ 
                                                        categoriesRow.activation1 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableCategoriesActivation2 == 1 ? 
                                            `
                                            <td id="formCategoriesListing_elementActivation2${ categoriesRow.id }" style="text-align: center;" class="${ categoriesRow.activation2 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation2${ categoriesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ categoriesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                        strField:'activation2', 
                                                                                        recordValue: '${ categoriesRow.activation2 == 1 ? 0 : 1}', 
                                                                                        patchType: 'toggleValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Check status.
                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '0')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formCategoriesListing_elementActivation2${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formCategoriesListing_elementActivation2${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
                                                                                            }

                                                                                            //Success message.
                                                                                            elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage11") }');
                                                                                        }else{
                                                                                            //Show error.
                                                                                            elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                        }

                                                                                        //Hide ajax progress bar.
                                                                                        htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                    });">
                                                    ${ 
                                                        categoriesRow.activation2 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableCategoriesActivation3 == 1 ? 
                                            `
                                            <td id="formCategoriesListing_elementActivation3${ categoriesRow.id }" style="text-align: center;" class="${ categoriesRow.activation3 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation3${ categoriesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ categoriesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                        strField:'activation3', 
                                                                                        recordValue: '${ categoriesRow.activation3 == 1 ? 0 : 1}', 
                                                                                        patchType: 'toggleValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Check status.
                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '0')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formCategoriesListing_elementActivation3${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formCategoriesListing_elementActivation3${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
                                                                                            }

                                                                                            //Success message.
                                                                                            elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage11") }');
                                                                                        }else{
                                                                                            //Show error.
                                                                                            elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                        }

                                                                                        //Hide ajax progress bar.
                                                                                        htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                    });">
                                                    ${ 
                                                        categoriesRow.activation3 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableCategoriesActivation4 == 1 ? 
                                            `
                                            <td id="formCategoriesListing_elementActivation4${ categoriesRow.id }" style="text-align: center;" class="${ categoriesRow.activation4 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation4${ categoriesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ categoriesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                        strField:'activation4', 
                                                                                        recordValue: '${ categoriesRow.activation4 == 1 ? 0 : 1}', 
                                                                                        patchType: 'toggleValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Check status.
                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '0')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formCategoriesListing_elementActivation4${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formCategoriesListing_elementActivation4${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
                                                                                            }

                                                                                            //Success message.
                                                                                            elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage11") }');
                                                                                        }else{
                                                                                            //Show error.
                                                                                            elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                        }

                                                                                        //Hide ajax progress bar.
                                                                                        htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                    });">
                                                    ${ 
                                                        categoriesRow.activation4 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableCategoriesActivation5 == 1 ? 
                                            `
                                            <td id="formCategoriesListing_elementActivation5${ categoriesRow.id }" style="text-align: center;" class="${ categoriesRow.activation5 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation5${ categoriesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ categoriesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                        strField:'activation5', 
                                                                                        recordValue: '${ categoriesRow.activation5 == 1 ? 0 : 1}', 
                                                                                        patchType: 'toggleValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Check status.
                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '0')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formCategoriesListing_elementActivation5${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formCategoriesListing_elementActivation5${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
                                                                                            }

                                                                                            //Success message.
                                                                                            elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage11") }');
                                                                                        }else{
                                                                                            //Show error.
                                                                                            elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                        }

                                                                                        //Hide ajax progress bar.
                                                                                        htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                    });">
                                                    ${ 
                                                        categoriesRow.activation5 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableCategoriesRestrictedAccess == 1 ? 
                                            `
                                            <td id="formCategoriesListing_elementRestrictedAccess${ categoriesRow.id }" style="text-align: center;" class="${ categoriesRow.restricted_access == 0 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkRestrictedAccess${ categoriesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ categoriesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                        strField:'restricted_access', 
                                                                                        recordValue: '${ categoriesRow.restricted_access == 1 ? 0 : 1}', 
                                                                                        patchType: 'toggleValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Check status.
                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '0')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formCategoriesListing_elementRestrictedAccess${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkRestrictedAccess${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formCategoriesListing_elementRestrictedAccess${ categoriesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkRestrictedAccess${ categoriesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1A") }');
                                                                                            }

                                                                                            //Success message.
                                                                                            elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage11") }');
                                                                                        }else{
                                                                                            //Show error.
                                                                                            elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                        }

                                                                                        //Hide ajax progress bar.
                                                                                        htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                    });">
                                                    ${ 
                                                        categoriesRow.restricted_access == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1A") 
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0A")
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
        
                                        <td style="text-align: center;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  categoriesRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <!--input type="checkbox" name="idsRecordsDelete[]" value="${categoriesRow.id}" class="ss-backend-field-checkbox" /--> 
                                            <input type="checkbox" name="idsRecordsDelete" value="${categoriesRow.id}" class="ss-backend-field-checkbox" /> 
                                            <!--input type="checkbox" name="arrIdsRecordsDelete" value="${categoriesRow.id}" class="ss-backend-field-checkbox" /--> 
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                            </tbody>

                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01" style="display: none;">
                                <tr>
                                    <td style="text-align: left;">
                                         
                                    </td>
                                    <td style="text-align: center;">
                                         
                                    </td>
                                    <td style="text-align: center;">
                                         
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>


                    ${ /*Paging.*/'' }
                    ${ /*----------------------*/'' }
                    ${ gSystemConfig.enableCategoriesBackendPagination == 1 ? 
                    `
                        <div class="ss-backend-paging" style="position: relative; display: block; overflow: hidden; text-align: center;">

                            ${ /*Page numbers.*/'' }
                            ${ gSystemConfig.enableCategoriesBackendPaginationNumbering == 1 ? 
                            `
                                <div class="ss-backend-paging-number-link-a" style="position: relative; display: block; overflow: hidden;">
                                    ${Array(this._pagingTotal).fill().map((item, pageNumberOutput)=>{
                                        return `
                                            ${ (pageNumberOutput + 1) == this._pageNumber ? `
                                                ${ pageNumberOutput + 1 }
                                            ` : `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ pageNumberOutput + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPageCounter01") + " " + pageNumberOutput + 1 }" class="ss-backend-paging-number-link">
                                                    ${ pageNumberOutput + 1 }
                                                </a>
                                            `}
                                        `;
                                    }).join("")}
                                </div>
                            ` : ``
                            }
    
                            ${ /*Page controls.*/'' }

                            
                            <div style="position: relative; display: block; overflow: hidden;">
                                ${ this._pageNumber == 1 ? 
                                    `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    `
                                }

                                
                                ${ this._pageNumber == this._pagingTotal ? 
                                    `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") } 
                                    </a>
                                    `
                                }
                            </div>

                            <div style="position: relative; display: block; overflow: hidden;">
                                ${ this._pageNumber } / ${ this._pagingTotal }
                            </div>
                        </div>
                    ` : ``
                    }
                    ${ /*----------------------*/'' }

                </form>
            ` }
            </section>


            ${ /*Form.*/'' }
            <section class="ss-backend-layout-section-form01">
                <form id="formCategories" name="formCategories" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories }" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                //inputDataReorder();
                                //inputDataReorder(["inputRowCategories_field_name1", "inputRowCategories_field_name2", "inputRowCategories_field_name3", "inputRowCategories_field_name4", "inputRowCategories_field_name5", "inputRowCategories_field_name6"]);
                                //inputDataReorder(["inputRowCategories_image_main", "inputRowCategories_id_parent", "inputRowCategories_sort_order", "inputRowCategories_title", "inputRowCategories_meta_title", "inputRowCategories_url_alias"]);
                                /*inputDataReorder([
                                    "inputRowCategories_id_parent", 
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
                                    "inputRowCategories_activation", 
                                    "inputRowCategories_id_restricted_access", 
                                    "inputRowCategories_id_status", 
                                    "inputRowCategories_notes"
                                ]);*/
                                
                                inputDataReorder([${ gSystemConfig.configCategoriesInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_categories" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableCategoriesSortOrder == 1 ? 
                                `
                                <tr id="inputRowCategories_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="categories_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowCategories_category_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesType") }: 
                                    </td>
                                    <td>
                                        <select id="categories_category_type" name="category_type" class="ss-backend-field-dropdown01">
                                            ${gSystemConfig.configCategoryType.map((categoryTypeRow)=>{
                                                return `
                                                    <option value="${ categoryTypeRow.category_type }">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, categoryTypeRow.category_type_function_label) }</option>
                                                `;
                                            }).join("")}
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowCategories_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesRU") }: 
                                    </td>
                                    <td>
                                        <select id="categories_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="categories_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                <tr id="inputRowCategories_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesCategory") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="categories_title" name="title" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesDescription == 1 ? 
                                `
                                <tr id="inputRowCategories_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDescription") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <div id="toolbar">
                                                <button class="ql-bold">Bold</button>
                                                <button class="ql-italic">Italic</button>
                                            </div>
                                            <div id="editor">
                                                <p></p>
                                            </div>
                                            <script>
                                                var editor = new Quill('#editor', {
                                                    modules: { toolbar: '#toolbar' },
                                                    theme: 'snow'
                                                });
                                            </script>
                                         ` : ``}


                                         ${ /*FroalaEditor*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 15 ? `
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#categories_description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#categories_description",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#categories_description";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                         ` : ``}
                                     </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.configCategoriesURLAlias == 1 ? 
                                `
                                <tr id="inputRowCategories_url_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="categories_url_alias" name="url_alias" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesKeywordsTags == 1 ? 
                                `
                                <tr id="inputRowCategories_keywords_tags" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                    </td>
                                    <td>
                                        <textarea id="categories_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01"></textarea>
                                        <div>
                                            (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywordsInstruction01") })
                                        </div>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableCategoriesMetaDescription == 1 ? 
                                `
                                <tr id="inputRowCategories_meta_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                    </td>
                                    <td>
                                        <textarea id="categories_meta_description" name="meta_description" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesMetaTitle == 1 ? 
                                `
                                <tr id="inputRowCategories_meta_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="categories_meta_title" name="meta_title" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Generic filters.*/'' }
                                ${ gSystemConfig.enableCategoriesFilterGeneric1 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric1") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric1 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric1Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric1" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric1 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric1" name="idsCategoriesFiltersGeneric1" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric1Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric1 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric1" name="idsCategoriesFiltersGeneric1" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric1Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric1 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric1Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric1" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric2 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric2") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric2 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric2Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric2" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric2 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric2" name="idsCategoriesFiltersGeneric2" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric2Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric2 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric2" name="idsCategoriesFiltersGeneric2" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric2Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric2 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric2Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric2" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric3 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric3") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric3 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric3Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric3" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric3 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric3" name="idsCategoriesFiltersGeneric3" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric3Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric3 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric3" name="idsCategoriesFiltersGeneric3" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric3Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric3 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric3Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric3" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric4 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric4") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric4 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric4Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric4" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric4 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric4" name="idsCategoriesFiltersGeneric4" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric4Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric4 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric4" name="idsCategoriesFiltersGeneric4" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric4Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric4 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric4Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric4" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric5 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric5") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric5 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric5Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric5" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric5 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric5" name="idsCategoriesFiltersGeneric5" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric5Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric5 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric5" name="idsCategoriesFiltersGeneric5" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric5Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric5 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric5Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric5" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric6 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric6") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric6 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric6Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric6" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric6 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric6" name="idsCategoriesFiltersGeneric6" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric6Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric6 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric6" name="idsCategoriesFiltersGeneric6" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric6Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric6 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric6Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric6" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric7 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric7") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric7 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric7Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric7" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric7 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric7" name="idsCategoriesFiltersGeneric7" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric7Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric7 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric7" name="idsCategoriesFiltersGeneric7" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric7Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric7 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric7Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric7" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric8 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric8") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric8 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric8Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric8" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric8 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric8" name="idsCategoriesFiltersGeneric8" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric8Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric8 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric8" name="idsCategoriesFiltersGeneric8" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric8Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric8 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric8Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric8" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric9 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric9") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric9 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric9Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric9" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric9 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric9" name="idsCategoriesFiltersGeneric9" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric9Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric9 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric9" name="idsCategoriesFiltersGeneric9" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric9Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric9 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric9Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric9" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric10 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric10") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric10 == 1 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric10Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric10" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric10 == 2 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric10" name="idsCategoriesFiltersGeneric10" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsCategoriesFiltersGeneric10Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric10 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric10" name="idsCategoriesFiltersGeneric10" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric10Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric10 == 4 ? 
                                        `
                                            ${resultsCategoriesFiltersGeneric10Listing.map((categoriesFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsCategoriesFiltersGeneric10" value="${ categoriesFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo1 == 1 ? 
                                `
                                <tr id="inputRowCategories_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo2 == 1 ? 
                                `
                                <tr id="inputRowCategories_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo3 == 1 ? 
                                `
                                <tr id="inputRowCategories_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo4 == 1 ? 
                                `
                                <tr id="inputRowCategories_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo5 == 1 ? 
                                `
                                <tr id="inputRowCategories_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo6 == 1 ? 
                                `
                                <tr id="inputRowCategories_info6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo6FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info6" name="info6" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info6";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo6FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info6" name="info6" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo6FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo7 == 1 ? 
                                `
                                <tr id="inputRowCategories_info7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo7FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info7" name="info7" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info7";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo7FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info7" name="info7" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo7FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo8 == 1 ? 
                                `
                                <tr id="inputRowCategories_info8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo8FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info8" name="info8" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info8";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo8FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info8" name="info8" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo8FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo9 == 1 ? 
                                `
                                <tr id="inputRowCategories_info9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo9FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info9" name="info9" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info9";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo9FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info9" name="info9" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo9FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfo10 == 1 ? 
                                `
                                <tr id="inputRowCategories_info10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo10FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info10" name="info10" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info10";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo10FieldType == 11 ? 
                                        `
                                            <input type="text" id="categories_info10" name="info10" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo10FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfoS1 == 1 ? 
                                `
                                <tr id="inputRowCategories_info_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info_small1" name="info_small1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info_small1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfoS2 == 1 ? 
                                `
                                <tr id="inputRowCategories_info_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info_small2" name="info_small2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info_small2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfoS3 == 1 ? 
                                `
                                <tr id="inputRowCategories_info_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info_small3" name="info_small3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info_small3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfoS4 == 1 ? 
                                `
                                <tr id="inputRowCategories_info_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info_small4" name="info_small4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info_small4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesInfoS5 == 1 ? 
                                `
                                <tr id="inputRowCategories_info_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_info_small5" name="info_small5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#categories_info_small5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumber1 == 1 ? 
                                `
                                <tr id="inputRowCategories_number1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber1FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber1FieldType == 2 || gSystemConfig.configCategoriesNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number1" name="number1" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number1")*/'' }
                                            <script>
                                                //var  selector = document.getElementById("categories_number1");

                                                //var im = new Inputmask("99-9999999");
                                                //im.mask(selector);

                                                //Inputmask("9", { repeat: 10 }).mask(selector);

                                                //if(typeof window !== 'undefined')
                                                //{
                                                    //Inputmask("9", { repeat: 10 }).mask(selector);
                                                //}


                                                //Inputmask("9", { repeat: 10 }).mask("categories_number1"); //debug //working
                                                /*Inputmask("(.999){+|1},00", {
                                                    /*positionCaretOnClick: "radixFocus",
                                                    radixPoint: ",",
                                                    _radixDance: true,
                                                    numericInput: true,
                                                    placeholder: "0",
                                                }).mask("categories_number1");*/

                                                /*
                                                Inputmask({
                                                    //mask: "9[.99]{0,}",
                                                    //mask: "9[.99]",
                                                    //repeat: *,
                                                    greedy: false,
                                                    //numericInput: true

                                                    //R$
                                                    groupSeparator: ".",
                                                    radixPoint: ",",

                                                    //$
                                                    //groupSeparator: ",",
                                                    //radixPoint: ".",

                                                    alias: "numeric",
                                                    //alias: "currency",
                                                    //alias: "decimal",
                                                    digits: 2,
                                                    autoGroup: true,
                                                    digitsOptional: false,
                                                    allowMinus: false
                                                }).mask("categories_number1");
                                                */ //working

                                                /*Inputmask('Regex', {
                                                    regex: "^[0-9]{1,6}(\\.\\d{1,2})?$"
                                                }).mask("categories_number1");
                                                */


                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("categories_number1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumber2 == 1 ? 
                                `
                                <tr id="inputRowCategories_number2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber2FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber2FieldType == 2 || gSystemConfig.configCategoriesNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number2" name="number2" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("categories_number2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumber3 == 1 ? 
                                `
                                <tr id="inputRowCategories_number3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber3FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber3FieldType == 2 || gSystemConfig.configCategoriesNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number3" name="number3" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("categories_number3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumber4 == 1 ? 
                                `
                                <tr id="inputRowCategories_number4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber4FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber4FieldType == 2 || gSystemConfig.configCategoriesNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number4" name="number4" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("categories_number4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumber5 == 1 ? 
                                `
                                <tr id="inputRowCategories_number5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber5FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber5FieldType == 2 || gSystemConfig.configCategoriesNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number5" name="number5" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("categories_number5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumberS1 == 1 ? 
                                `
                                <tr id="inputRowCategories_number_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS1FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small1" name="number_small1" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number_small1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumberS2 == 1 ? 
                                `
                                <tr id="inputRowCategories_number_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS2FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small2" name="number_small2" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number_small2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumberS3 == 1 ? 
                                `
                                <tr id="inputRowCategories_number_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS3FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small3" name="number_small3" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number_small3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumberS4 == 1 ? 
                                `
                                <tr id="inputRowCategories_number_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS4FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small4" name="number_small4" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number_small4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesNumberS5 == 1 ? 
                                `
                                <tr id="inputRowCategories_number_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumberS5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="categories_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS5FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small5" name="number_small5" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number_small5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }
                                
                                ${ gSystemConfig.enableCategoriesDate1 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_date1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate1") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configCategoriesDate1FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    ${  /*Debug.*/
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                        ''
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                    }
                                                    <select id="categories_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configCategoriesDate1FieldType == 11 ? 
                                            `
                                            <input type="text" id="categories_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate1 = datepicker("#categories_date1", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 1 || gSystemConfig.configCategoriesDate1Type == 2 | gSystemConfig.configCategoriesDate1Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 5 || gSystemConfig.configCategoriesDate1Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 6 || gSystemConfig.configCategoriesDate1Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                                //$("#date1").datepicker();


                                                //Debug.
                                                //alert(jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBaseBackendConfigOptions=", jsDatepickerBaseBackendConfigOptions);
                                                //console.log("jsDatepickerGenericBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBirthBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerTaskBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerHistoryBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configCategoriesDate1Type == 2 || gSystemConfig.configCategoriesDate1Type == 3 || gSystemConfig.configCategoriesDate1Type == 55 || gSystemConfig.configCategoriesDate1Type == 66 ? 
                                            `
                                             - 
                                            <select id="categories_date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configCategoriesDate1Type == 2 ? 
                                                `
                                                :
                                                <select id="categories_date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                            >${ arrayRow }</option>
                                                        `}).join(",") }
                                                </select>
                                                ` : ``
                                            }
                                            ` : ``
                                        }
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesDate2 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_date2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate2") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configCategoriesDate2FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="categories_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configCategoriesDate2FieldType == 11 ? 
                                            `
                                            <input type="text" id="categories_date2" name="date2" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate2 = datepicker("#categories_date2", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate2Type == 1 || gSystemConfig.configCategoriesDate2Type == 2 | gSystemConfig.configCategoriesDate2Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate2Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate2Type == 5 || gSystemConfig.configCategoriesDate2Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate2Type == 6 || gSystemConfig.configCategoriesDate2Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configCategoriesDate2Type == 2 || gSystemConfig.configCategoriesDate2Type == 3 || gSystemConfig.configCategoriesDate2Type == 55 || gSystemConfig.configCategoriesDate2Type == 66 ? 
                                            `
                                             - 
                                            <select id="categories_date2_hour" name="date2_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date2_minute" name="date2_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configCategoriesDate2Type == 2 ? 
                                                `
                                                :
                                                <select id="categories_date2_seconds" name="date2_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                            >${ arrayRow }</option>
                                                        `}).join(",") }
                                                </select>
                                                ` : ``
                                            }
                                            ` : ``
                                        }
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesDate3 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_date3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate3") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configCategoriesDate3FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="categories_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configCategoriesDate3FieldType == 11 ? 
                                            `
                                            <input type="text" id="categories_date3" name="date3" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate3 = datepicker("#categories_date3", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate3Type == 1 || gSystemConfig.configCategoriesDate3Type == 2 | gSystemConfig.configCategoriesDate3Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate3Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate3Type == 5 || gSystemConfig.configCategoriesDate3Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate3Type == 6 || gSystemConfig.configCategoriesDate3Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configCategoriesDate3Type == 2 || gSystemConfig.configCategoriesDate3Type == 3 || gSystemConfig.configCategoriesDate3Type == 55 || gSystemConfig.configCategoriesDate3Type == 66 ? 
                                            `
                                             - 
                                            <select id="categories_date3_hour" name="date3_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date3_minute" name="date3_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configCategoriesDate3Type == 2 ? 
                                                `
                                                :
                                                <select id="categories_date3_seconds" name="date3_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                            >${ arrayRow }</option>
                                                        `}).join(",") }
                                                </select>
                                                ` : ``
                                            }
                                            ` : ``
                                        }
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesDate4 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_date4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate4") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configCategoriesDate4FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="categories_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configCategoriesDate4FieldType == 11 ? 
                                            `
                                            <input type="text" id="categories_date4" name="date4" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate4 = datepicker("#categories_date4", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate4Type == 1 || gSystemConfig.configCategoriesDate4Type == 2 | gSystemConfig.configCategoriesDate4Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate4Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate4Type == 5 || gSystemConfig.configCategoriesDate4Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate4Type == 6 || gSystemConfig.configCategoriesDate4Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configCategoriesDate4Type == 2 || gSystemConfig.configCategoriesDate4Type == 3 || gSystemConfig.configCategoriesDate4Type == 55 || gSystemConfig.configCategoriesDate4Type == 66 ? 
                                            `
                                             - 
                                            <select id="categories_date4_hour" name="date4_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date4_minute" name="date4_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configCategoriesDate4Type == 2 ? 
                                                `
                                                :
                                                <select id="categories_date4_seconds" name="date4_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                            >${ arrayRow }</option>
                                                        `}).join(",") }
                                                </select>
                                                ` : ``
                                            }
                                            ` : ``
                                        }
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesDate5 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_date5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDate5") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configCategoriesDate5FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="categories_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configCategoriesDate5FieldType == 11 ? 
                                            `
                                            <input type="text" id="categories_date5" name="date5" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate5 = datepicker("#categories_date5", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate5Type == 1 || gSystemConfig.configCategoriesDate5Type == 2 | gSystemConfig.configCategoriesDate5Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate5Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate5Type == 5 || gSystemConfig.configCategoriesDate5Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate5Type == 6 || gSystemConfig.configCategoriesDate5Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configCategoriesDate5Type == 2 || gSystemConfig.configCategoriesDate5Type == 3 || gSystemConfig.configCategoriesDate5Type == 55 || gSystemConfig.configCategoriesDate5Type == 66 ? 
                                            `
                                             - 
                                            <select id="categories_date5_hour" name="date5_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date5_minute" name="date5_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configCategoriesDate5Type == 2 ? 
                                                `
                                                :
                                                <select id="categories_date5_seconds" name="date5_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                            >${ arrayRow }</option>
                                                        `}).join(",") }
                                                </select>
                                                ` : ``
                                            }
                                            ` : ``
                                        }
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesImageMain == 1 ? 
                                `
                                <tr id="inputRowCategories_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="categories_image_main" name="image_main" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFile1 == 1 ? 
                                `
                                <tr id="inputRowCategories_file1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile1") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="categories_file1" name="file1" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFile2 == 1 ? 
                                `
                                <tr id="inputRowCategories_file2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile2") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="categories_file2" name="file2" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFile3 == 1 ? 
                                `
                                <tr id="inputRowCategories_file3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile3") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="categories_file3" name="file3" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFile4 == 1 ? 
                                `
                                <tr id="inputRowCategories_file4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile4") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="categories_file4" name="file4" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFile5 == 1 ? 
                                `
                                <tr id="inputRowCategories_file5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFile5") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="categories_file5" name="file5" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowCategories_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="categories_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="categories_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="categories_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="categories_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="categories_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="categories_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesStatus == 1 ? 
                                    `
                                    <tr id="inputRowCategories_id_status" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesStatus") }: 
                                        </td>
                                        <td>
                                            <select id="categories_id_status" name="id_status" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesStatusListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesRestrictedAccess == 1 ? 
                                `
                                <tr id="inputRowCategories_id_restricted_access" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess") }: 
                                    </td>
                                    <td>
                                        <select id="categories_restricted_access" name="restricted_access" class="ss-backend-field-dropdown01">
                                            <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0") }</option>
                                            <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableCategoriesNotes == 1 ? 
                                `
                                <tr id="inputRowCategories_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="categories_notes" name="notes" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>

                    </div>
                    <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                        <button id="categories_include" name="categories_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="categories_id_parent" name="id_parent" value="${ this._idParent }" />

                    <input type="hidden" id="categories_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="categories_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="categories_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
            </section>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(oclRecords);
            //strReturn = JSON.stringify(oclRecords.resultsCategoriesListing);
            
            //return strReturn;

            //return this;
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


};