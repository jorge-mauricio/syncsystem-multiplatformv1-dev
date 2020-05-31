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

        this.dateNow = new Date(SyncSystemNS.FunctionsGeneric.timeZoneConverter())
        this.dateNowDay = this.dateNow.getDate();
        this.dateNowMonth = this.dateNow.getMonth() + 1;
        this.dateNowYear = this.dateNow.getFullYear();
        this.dateNowMinute = this.dateNow.getMinutes();
        this.dateNowHour = this.dateNow.getHours();
        this.dateNowSecond = this.dateNow.getSeconds();
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
            

            //Title content placeholder.
            await this.cphTitleBuild();

            
            //Head content placeholder.
            await this.cphHeadBuild();


            //Title content placeholder.
            await this.cphTitleCurrentBuild();


            //Body content placeholder.
            await this.cphBodyBuild();
        }catch(asyncError){
            console.error(asyncError);
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
                <meta name="title" content="${ this.metaTitle }" /> ${ /*Bellow 160 characters.*/'' }
                <meta name="description" content="${ this.metaDescription }" /> ${ /*Bellow 100 characters.*/'' }
                <meta name="keywords" content="${ this.metaKeywords }" /> ${ /*Bellow 60 characters.*/'' }

                ${ /*Open Graph tags.*/'' }
                <meta property="og:title" content="${ this.metaTitle }" />
                <meta property="og:type" content="website" /> ${ /*http://ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/*/'' }
                <meta property="og:url" content="" />
                <meta property="og:description" content="${ this.metaDescription }" />
                <meta property="og:image" content="" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                <meta property="og:image:alt" content="${ this.metaTitle }" />
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
            <a href="" class="ss-backend-links04">
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


        //Parameters build.
        arrSearchParameters.push("id_parent;" + this._idParent + ";i");
        //arrSearchParameters.push("activation;1;i");


        let oclRecords = "";
        let oclRecordsParameters = {
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


        //Paging.
        if(gSystemConfig.enableCategoriesBackendPagination == 1)
        {
            this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
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


        //Debug.
        //console.log("oclRecordsParameters=", oclRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            oclRecords = new SyncSystemNS.ObjectCategoriesListing(oclRecordsParameters);
            await oclRecords.recordsListingGet(0, 3);


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

            this._messageSuccess

            /* */
            backendHTML = `
            <div id="divMessageSuccess" class="ss-backend-success">
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
                    /*"_idParent=" + this._idParent + "<br />" +*/ /*working*/
                    /*"_pageNumber=" + this._pageNumber + "<br />" +*/ /*working*/
                    /*"_masterPageSelect=" + this._masterPageSelect + "<br />"*/ /*working*/
                    /*"FunctionsGeneric=" + SyncSystemNS.FunctionsGeneric.categoryConfigSelect(2, 5)*/ /*working*/
                    ''
                }
            </div>

            <section class="ss-backend-layout-section-data01">
            <form id="form" name="form" method="post" action="" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                        <button class="ss-backend-btn-action-cancel" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                        </button>
                    </div>

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01 ">
                                <tr>
                                    <td style="width: 40px; text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                    </td>
                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesCategory") }  
                                    </td>
                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                    </td>

                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivationA") }  
                                    </td>
                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                    </td>
                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }  
                                    </td>
                                </tr>
                            </thead>

                            <tbody class="ss-backend-table-listing-text01">
                            ${oclRecords.resultsCategoriesListing.map((categoriesRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        <td style="text-align: center;">
                                            <div>
                                                ${ categoriesRow.sort_order } 
                                            </div>
                                        </td>
                                        <td style="text-align: left;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  categoriesRow.id }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") } 
                                            </a>

                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.image_main, "db") } 
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
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + SyncSystemNS.FunctionsGeneric.categoryConfigSelect(categoriesRow.category_type, 3) + "/" + categoriesRow.id }" class="ss-backend-links01">
                                                        ${ /*categoriesRow.category_type*/'' } 
                                                        ${ SyncSystemNS.FunctionsGeneric.categoryConfigSelect(categoriesRow.category_type, 5) }
                                                    </a> 
                                                `
                                            } 
                                        </td>
                                        <td style="text-align: center;" class="${ categoriesRow.activation ? "" : "ss-backend-table-bg-deactive"}">
                                            <a href="#" class="ss-backend-links01">
                                                ${ 
                                                    categoriesRow.activation ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <a href="#" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <input type="checkbox" name="idsRecordsDelete[]" value="${categoriesRow.id}" class="ss-backend-field-checkbox" /> 
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
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  this._idParent }?pageNumber=${ pageNumberOutput + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") + " " + pageNumberOutput + 1 }" class="ss-backend-paging-number-link">
                                                ${ pageNumberOutput + 1 }
                                            </a>
                                        `}
                                    `;
                                    }).join("")}
                                </div>
                            ` : ''
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
                    ` : ''
                    }
                    ${ /*----------------------*/'' }

                </form>
            </section>


            ${ /*Form.*/'' }
            <section class="ss-backend-layout-section-form01">
                <form id="formCategories" name="form" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories }" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Reorder table rows.
                            //TODO: Create variable in config to able it.
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

                        <table id="input_table_name" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01 ">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">

                                <tr id="inputRowCategories_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        <!--select id="id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                            <option value="1" selected="true">xxx</option>
                                            <option value="2">yyy</option>
                                        </select-->
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesSortCustom == 1 ? 
                                `
                                <tr id="inputRowCategories_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="255" value="0" />
                                    </td>
                                </tr>
                                ` : ''
                                }

                                <tr id="inputRowCategories_category_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesType") }: 
                                    </td>
                                    <td>
                                        <select id="category_type" name="category_type" class="ss-backend-field-dropdown01">
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
                                        <select id="id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="1" selected="true">xxx</option>
                                            <option value="2">yyy</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ''
                                }

                                <tr id="inputRowCategories_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesCategory") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="title" name="title" class="ss-backend-field-text01" />
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
                                            <textarea id="description" name="description" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="description" name="description" class="ss-backend-field-text-area01"></textarea>
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
                                            <textarea id="description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 ? `
                                            <textarea id="description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#description",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#description";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                         ` : ``}
                                     </td>
                                </tr>
                                ` : ''
                                }

                                ${ gSystemConfig.configCategoriesURLAlias == 1 ? 
                                `
                                <tr id="inputRowCategories_url_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="url_alias" name="url_alias" class="ss-backend-field-text01" />
                                    </td>
                                </tr>
                                ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesKeywordsTags == 1 ? 
                                `
                                <tr id="inputRowCategories_keywords_tags" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                    </td>
                                    <td>
                                        <textarea id="keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ''
                                }
    
                                ${ gSystemConfig.enableCategoriesMetaDescription == 1 ? 
                                `
                                <tr id="inputRowCategories_meta_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                    </td>
                                    <td>
                                        <textarea id="meta_description" name="meta_description" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesMetaTitle == 1 ? 
                                `
                                <tr id="inputRowCategories_meta_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="meta_title" name="meta_title" class="ss-backend-field-text01" />
                                    </td>
                                </tr>
                                ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesInfo1 == 1 ? 
                                `
                                <tr id="inputRowCategories_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfo1") }: 
                                    </td>
                                    <td>
                                        <textarea id="info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesInfoS1 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_info_small1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesInfoS1") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="info_small1" name="info_small1" class="ss-backend-field-text01" />
                                        </td>
                                    </tr>
                                    ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesNumber1 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_number1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber1") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="number1" name="number1" class="ss-backend-field-text01" />
                                        </td>
                                    </tr>
                                    ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesNumberS1 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_number_small1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesNumber1") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="number_small1" name="number_small1" class="ss-backend-field-text01" />
                                        </td>
                                    </tr>
                                    ` : ''
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
                                                    <select id="date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
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
                                            <input type="text" id="date1" name="date1" class="ss-backend-field-date01" autocomplete="off" />
                                            <script>
                                                const dpDate1 = datepicker("#date1", {
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 1 || gSystemConfig.configCategoriesDate1Type == 2 | gSystemConfig.configCategoriesDate1Type == 3 ? 
                                                        `
                                                        ${ gSystemConfig.configBackendDPGenericOptions }
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 4 ? 
                                                        `
                                                        ${ gSystemConfig.configBackendDPBirthOptions }
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 5 || gSystemConfig.configCategoriesDate1Type == 55 ? 
                                                        `
                                                        ${ gSystemConfig.configBackendDPTaskOptions }
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configCategoriesDate1Type == 6 || gSystemConfig.configCategoriesDate1Type == 66 ? 
                                                        `
                                                        ${ gSystemConfig.configBackendDPHistoryOptions }
                                                        ` : ``
                                                    }
                                                });
                                                //$("#date1").datepicker();
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configCategoriesDate1Type == 2 || gSystemConfig.configCategoriesDate1Type == 3 || gSystemConfig.configCategoriesDate1Type == 55 || gSystemConfig.configCategoriesDate1Type == 66 ? 
                                            `
                                             - 
                                            <select id="date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ''}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ''}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configCategoriesDate1Type == 2 ? 
                                                `
                                                :
                                                <select id="date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ this.dateNowSecond == arrayRow ? ' selected' : ''}
                                                            >${ arrayRow }</option>
                                                        `}).join(",") }
                                                </select>
                                                ` : ``
                                            }
                                            ` : ``
                                        }
                                        </td>
                                    </tr>
                                    ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesImageMain == 1 ? 
                                `
                                <tr id="inputRowCategories_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="image_main" name="image_main" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ''
                                }

                                <tr id="inputRowCategories_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesStatus == 1 ? 
                                    `
                                    <tr id="inputRowCategories_id_status" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesStatus") }: 
                                        </td>
                                        <td>
                                            <select id="id_status" name="id_status" class="ss-backend-field-dropdown01">
                                                <option value="1" selected="true">xxx</option>
                                                <option value="2">yyy</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ''
                                }

                                ${ gSystemConfig.enableCategoriesRestrictedAccess == 1 ? 
                                `
                                <tr id="inputRowCategories_id_restricted_access" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess") }: 
                                    </td>
                                    <td>
                                        <select id="restricted_access" name="restricted_access" class="ss-backend-field-dropdown01">
                                            <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0") }</option>
                                            <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ''
                                }
    
                                ${ gSystemConfig.enableCategoriesNotes == 1 ? 
                                `
                                <tr id="inputRowCategories_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="notes" name="notes" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ''
                                }
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>

                    </div>
                    <div style="position: relative; display: block; overflow: hidden; margin-top: 2px;">
                        <button class="ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="id_parent" name="idParent" value="${ this._idParent }" />

                    <input type="hidden" id="pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

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