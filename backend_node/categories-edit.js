"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class CategoriesEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        //objParameters = {idParentCategories: 123, configSortOrder: ""}


        //Properties.
        //----------------------
        this._idTbCategories = objParameters.idTbCategories;
        
        //this._pagingNRecords = gSystemConfig.configCategoriesBackendPaginationNRecords;
        //this._pagingTotalRecords = 0;
        //this._pagingTotal = 0;
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

        this.objCategoriesIdParent;

        this.arrSearchParameters = [];
        this.ocdRecord = "";
        this.ocdRecordParameters = {};

        this.arrFiltersGenericSearchParameters = [];
        this.ofglRecords = "";
        this.ofglRecordsParameters = {};

        this.resultsCategoriesFiltersGeneric1Listing;
        this.resultsCategoriesFiltersGeneric2Listing;
        this.resultsCategoriesFiltersGeneric3Listing;
        this.resultsCategoriesFiltersGeneric4Listing;
        this.resultsCategoriesFiltersGeneric5Listing;
        this.resultsCategoriesFiltersGeneric6Listing;
        this.resultsCategoriesFiltersGeneric7Listing;
        this.resultsCategoriesFiltersGeneric8Listing;
        this.resultsCategoriesFiltersGeneric9Listing;
        this.resultsCategoriesFiltersGeneric10Listing;

        this.resultsCategoriesStatusListing;
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


    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Logic.
        //----------------------
        try
        {
            //Parameters build.
            this.arrSearchParameters.push("id;" + this._idTbCategories + ";i"); 

            this.ocdRecordParameters = {
                _arrSearchParameters: this.arrSearchParameters,
                _idTbCategories: this._idTbCategories,
                _terminal: 0,
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            this.ocdRecord = new SyncSystemNS.ObjectCategoriesDetails(this.ocdRecordParameters);
            await this.ocdRecord.recordDetailsGet(0, 3);
            //console.log("this.ocdRecord = ", this.ocdRecord);


            //Parameters build.
            this.arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableCategories + ";s");
            
            this.ofglRecordsParameters = {
                _arrSearchParameters: this.arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };
                
            //Object build.
            //Todo: check if filter is enabled.
            this.ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(this.ofglRecordsParameters);
            await this.ofglRecords.recordsListingGet(0, 3);

            
            //Filters - Status.
            if(gSystemConfig.enableCategoriesStatus != 0)
            {
                this.resultsCategoriesStatusListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }

            //Filter results acording to filter_index.
            if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
            {
                this.resultsCategoriesFiltersGeneric1Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                    //console.log("obj = ", obj);
                });
                //console.log("ofglRecords.resultsFiltersGenericListing = ", ofglRecords.resultsFiltersGenericListing);
                //console.log("resultsFiltersGeneric1Listing = ", resultsFiltersGeneric1Listing);
            }
            if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
            {
                this.resultsCategoriesFiltersGeneric2Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 102;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric3 != 0)
            {
                this.resultsCategoriesFiltersGeneric3Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 103;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric4 != 0)
            {
                this.resultsCategoriesFiltersGeneric4Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 104;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric5 != 0)
            {
                this.resultsCategoriesFiltersGeneric5Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 105;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric6 != 0)
            {
                this.resultsCategoriesFiltersGeneric6Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 106;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric7 != 0)
            {
                this.resultsCategoriesFiltersGeneric7Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 107;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric8 != 0)
            {
                this.resultsCategoriesFiltersGeneric8Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 108;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric9 != 0)
            {
                this.resultsCategoriesFiltersGeneric9Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 109;
                });
            }
            if(gSystemConfig.enableCategoriesFilterGeneric10 != 0)
            {
                this.resultsCategoriesFiltersGeneric10Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 110;
                });
            }


            //Parent ID Records.
            if(gSystemConfig.enableCategoriesIdParentEdit == 1)
            {
                this.objCategoriesIdParent = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                            [], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "", 
                                                                                            "id, title", 
                                                                                            1);
            }


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
            this.titleCurrent = this.ocdRecord.tblCategoriesTitle;


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain");
            if(this.titleCurrent)
            {
                this.metaTitle += " - " + this.titleCurrent;
            }

            //Meta description.
            this.metaDescription += this.ocdRecord.tblCategoriesDescription;

            //Meta keywords.
            this.metaKeywords += this.ocdRecord.tblCategoriesKeywordsTags;

            //Meta URL current.
            this.metaURLCurrent += gSystemConfig.configSystemURL + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackend + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendCategories + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbCategories + "/";
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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleEdit");

            if(this.titleCurrent)
            {
                this.cphTitle += " - " + this.titleCurrent;
            }
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
                ${ this.ocdRecord.tblCategoriesImageMain != "" ? 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.ocdRecord.tblCategoriesImageMain + "?v=" + this.cacheClear }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                    ` : 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png" }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                    `
                }
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
        //let arrSearchParameters = [];
        //let arrFiltersGenericSearchParameters = [];


        //Parameters build.
        //arrSearchParameters.push("id;" + this._idTbCategories + ";i");
        //arrSearchParameters.push("activation;1;i");


        //let ocdRecord = "";
        /*let ocdRecordParameters = {
            _arrSearchParameters: arrSearchParameters,
            _terminal: 0,
            _objSpecialParameters: {returnType: 3}
        };*/
        /*
        let oclRecordsParameters = {
            _arrSearchParameters: ["id_parent;0;i", "activation;1;i"],
            _configSortOrder: gSystemConfig.configCategoriesSort,
            _strNRecords: "5",
            _objSpecialParameters: {}
        };*/ //working (debug)


        //arrSearchParameters.push("table_name;" + "categories" + ";s");

        //let ofglRecords = "";
        /*let ofglRecordsParameters = {
            _arrSearchParameters: arrFiltersGenericSearchParameters,
            _configSortOrder: "title",
            _strNRecords: "",
            _objSpecialParameters: {returnType: 3}
        };*/


        //Redefine values.
        let ocdRecord = this.ocdRecord;
        let ofglRecords = this.ofglRecords;
        let objCategoriesIdParent = this.objCategoriesIdParent;

        let resultsCategoriesFiltersGeneric1Listing = this.resultsCategoriesFiltersGeneric1Listing;
        let resultsCategoriesFiltersGeneric2Listing = this.resultsCategoriesFiltersGeneric2Listing;
        let resultsCategoriesFiltersGeneric3Listing = this.resultsCategoriesFiltersGeneric3Listing;
        let resultsCategoriesFiltersGeneric4Listing = this.resultsCategoriesFiltersGeneric4Listing;
        let resultsCategoriesFiltersGeneric5Listing = this.resultsCategoriesFiltersGeneric5Listing;
        let resultsCategoriesFiltersGeneric6Listing = this.resultsCategoriesFiltersGeneric6Listing;
        let resultsCategoriesFiltersGeneric7Listing = this.resultsCategoriesFiltersGeneric7Listing;
        let resultsCategoriesFiltersGeneric8Listing = this.resultsCategoriesFiltersGeneric8Listing;
        let resultsCategoriesFiltersGeneric9Listing = this.resultsCategoriesFiltersGeneric9Listing;
        let resultsCategoriesFiltersGeneric10Listing = this.resultsCategoriesFiltersGeneric10Listing;

        let resultsCategoriesStatusListing = this.resultsCategoriesStatusListing;

        //Debug.
        //console.log("this._idTbCategories=", this._idTbCategories);
        //console.log("oclRecordsParameters=", oclRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
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
                    
                    /*"this.objCategoriesIdParent=" + this.objCategoriesIdParent + "<br />" +*/
                    /*"ocdRecord.arrIdsCategoriesFiltersGenericBinding=" + ocdRecord.arrIdsCategoriesFiltersGenericBinding + "<br />" +*/
                    /*"ocdRecord.resultsCategoryDetails=" + SyncSystemNS.FunctionsFiles.fileDelete02("f5625.pdf") + "<br />" +*/
                    /*"ocdRecord.resultsCategoryDetails=" + SyncSystemNS.FunctionsFiles.fileDelete02("612.jpg", "", gSystemConfig.configArrDefaultImageSize) + "<br />" +*/
                    /*"ocdRecord.resultsCategoryDetails=" + SyncSystemNS.FunctionsGeneric.removeHTML01("<a href='teste.html'>Teste com link</a>") + "<br />" +*/
                    /*"ocdRecord.tblCategoriesID=" + ocdRecord.tblCategoriesID + "<br />" +*/
                    /*"ocdRecord.resultsCategoryDetails=" + ocdRecord.resultsCategoryDetails + "<br />" +*/
                    /*"JSON.stringify(ocdRecord.resultsCategoryDetails)=" + JSON.stringify(ocdRecord.resultsCategoryDetails) + "<br />" +*/
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


            ${ /*Form.*/'' }
            <section class="ss-backend-layout-section-form01">
                <form id="formCategories" name="formCategories" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formCategoryEdit_method" name="_method" value="PUT">
                    
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to able it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configCategoriesInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_categories" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleTableEdit") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableCategoriesIdParentEdit == 1 ? 
                                `
                                <tr id="inputRowCategories_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        ${ /*TODO: Convert to ajax.*/'' }
                                        <select id="categories_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                            <option value="0"${ ocdRecord.tblCategoriesIdParent == 0 ? ` selected` : `` }>
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                            </option>
                                            ${ objCategoriesIdParent.map((categoriesIdParentRow)=>{
                                                return `
                                                    <option value="${ categoriesIdParentRow.id }"${ ocdRecord.tblCategoriesIdParent == categoriesIdParentRow.id ? ` selected` : `` }>
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesIdParentRow.title, "db") }
                                                    </option>
                                                `
                                            }) }
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesSortOrder == 1 ? 
                                `
                                <tr id="inputRowCategories_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="categories_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ ocdRecord.tblCategoriesSortOrder }" />
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
                                                    <option value="${ categoryTypeRow.category_type }"${ ocdRecord.tblCategoriesCategoryType == categoryTypeRow.category_type ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, categoryTypeRow.category_type_function_label) }</option>
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
                                ` : ``
                                }

                                <tr id="inputRowCategories_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesCategory") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="categories_title" name="title" class="ss-backend-field-text01" maxlength="255" value="${ ocdRecord.tblCategoriesTitle }" />
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
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesDescription_edit }</textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesDescription_edit }</textarea>
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
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesDescription_edit }</textarea>
                                            <script>
                                                new FroalaEditor("#categories_description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="categories_description" name="description" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesDescription_edit }</textarea>
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
                                        <input type="text" id="categories_url_alias" name="url_alias" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesURLAlias }" />
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
                                        <textarea id="categories_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesKeywordsTags }</textarea>
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
                                        <textarea id="categories_meta_description" name="meta_description" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesMetaDescription_edit }</textarea>
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
                                        <input type="text" id="categories_meta_title" name="meta_title" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesMetaTitle }" />
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric1" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric1Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric1Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric1 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric1" name="idsCategoriesFiltersGeneric1" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric1Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric1Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric1Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric1" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric1Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric2" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric2Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric2Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric2 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric2" name="idsCategoriesFiltersGeneric2" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric2Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric2Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric2Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric2" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric2Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric3" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric3Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric3Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric3 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric3" name="idsCategoriesFiltersGeneric3" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric3Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric3Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric3Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric3" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric3Binding.includes("0") ? ` selected` : `` } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric4" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric4Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric4Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric4 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric4" name="idsCategoriesFiltersGeneric4" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric4Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric4Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric4Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric4" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric4Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric5" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric5Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric5Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric5 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric5" name="idsCategoriesFiltersGeneric5" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric5Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric5Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric5Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric5" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric5Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric6" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric6Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric6Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric6 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric6" name="idsCategoriesFiltersGeneric6" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric6Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric6Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric6Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric6" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric6Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric7" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric7Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric7Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric7 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric7" name="idsCategoriesFiltersGeneric7" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric7Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric7Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric7Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric7" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric7Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric8" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric8Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric8Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric8Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric8" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric8Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric9" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric9Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric9Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableCategoriesFilterGeneric9 == 3 ? 
                                        `
                                            <select id="idsCategoriesFiltersGeneric9" name="idsCategoriesFiltersGeneric9" class="ss-backend-field-dropdown01">
                                                <option value="0"${ ocdRecord.arrIdsCategoriesFiltersGeneric9Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesFiltersGeneric9Listing.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric9Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric9" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric9Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <input type="checkbox" name="idsCategoriesFiltersGeneric10" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric10Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric10Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <option value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric10Binding.includes(categoriesFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }</option>
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
                                                        <input type="radio" name="idsCategoriesFiltersGeneric10" value="${ categoriesFiltersGenericRow.id }"${ ocdRecord.arrIdsCategoriesFiltersGeneric10Binding.includes(categoriesFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
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
                                            <input type="text" id="categories_info1" name="info1" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info1" name="info1" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info1" name="info1" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo1_edit }</textarea>
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
                                            <input type="text" id="categories_info1" name="info1" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info1" name="info1" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo1_edit }</textarea>
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
                                            <input type="text" id="categories_info2" name="info2" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info2" name="info2" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info2" name="info2" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo2_edit }</textarea>
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
                                            <input type="text" id="categories_info2" name="info2" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info2" name="info2" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo2_edit }</textarea>
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
                                            <input type="text" id="categories_info3" name="info3" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info3" name="info3" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info3" name="info3" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo3_edit }</textarea>
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
                                            <input type="text" id="categories_info3" name="info3" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info3" name="info3" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo3_edit }</textarea>
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
                                            <input type="text" id="categories_info4" name="info4" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info4" name="info4" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info4" name="info4" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo4_edit }</textarea>
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
                                            <input type="text" id="categories_info4" name="info4" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info4" name="info4" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo4_edit }</textarea>
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
                                            <input type="text" id="categories_info5" name="info5" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info5" name="info5" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info5" name="info5" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo5_edit }</textarea>
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
                                            <input type="text" id="categories_info5" name="info5" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info5" name="info5" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo5_edit }</textarea>
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
                                            <input type="text" id="categories_info6" name="info6" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info6" name="info6" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo6_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info6" name="info6" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo6_edit }</textarea>
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
                                            <input type="text" id="categories_info6" name="info6" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo6FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info6" name="info6" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo6_edit }</textarea>
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
                                            <input type="text" id="categories_info7" name="info7" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info7" name="info7" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo7_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info7" name="info7" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo7_edit }</textarea>
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
                                            <input type="text" id="categories_info7" name="info7" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo7FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info7" name="info7" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo7_edit }</textarea>
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
                                            <input type="text" id="categories_info8" name="info8" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info8" name="info8" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo8_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info8" name="info8" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo8_edit }</textarea>
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
                                            <input type="text" id="categories_info8" name="info8" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo8FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info8" name="info8" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo8_edit }</textarea>
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
                                            <input type="text" id="categories_info9" name="info9" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info9" name="info9" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo9_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info9" name="info9" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo9_edit }</textarea>
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
                                            <input type="text" id="categories_info9" name="info9" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo9FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info9" name="info9" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo9_edit }</textarea>
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
                                            <input type="text" id="categories_info10" name="info10" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfo10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info10" name="info10" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo10_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info10" name="info10" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo10_edit }</textarea>
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
                                            <input type="text" id="categories_info10" name="info10" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configCategoriesInfo10FieldType == 12 ? 
                                        `
                                            <textarea id="categories_info10" name="info10" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfo10_edit }</textarea>
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
                                            <input type="text" id="categories_info_small1" name="info_small1" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfoSmall1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall1_edit }</textarea>
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
                                            <input type="text" id="categories_info_small2" name="info_small2" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfoSmall2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall2_edit }</textarea>
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
                                            <input type="text" id="categories_info_small3" name="info_small3" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfoSmall3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall3_edit }</textarea>
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
                                            <input type="text" id="categories_info_small4" name="info_small4" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfoSmall4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall4_edit }</textarea>
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
                                            <input type="text" id="categories_info_small5" name="info_small5" class="ss-backend-field-text01" value="${ ocdRecord.tblCategoriesInfoSmall5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configCategoriesInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="categories_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="categories_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesInfoSmall5_edit }</textarea>
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
                                            <input type="text" id="categories_number1" name="number1" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber1FieldType == 2 || gSystemConfig.configCategoriesNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number1" name="number1" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumber1_print }" maxlength="45" />
                                            
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
                                            <input type="text" id="categories_number1" name="number1" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber1_print }" maxlength="34" />
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
                                            <input type="text" id="categories_number2" name="number2" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber2FieldType == 2 || gSystemConfig.configCategoriesNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number2" name="number2" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumber2_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number2" name="number2" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber2_print }" maxlength="34" />
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
                                            <input type="text" id="categories_number3" name="number3" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber3FieldType == 2 || gSystemConfig.configCategoriesNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number3" name="number3" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumber3_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number3" name="number3" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber3_print }" maxlength="34" />
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
                                            <input type="text" id="categories_number4" name="number4" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber4FieldType == 2 || gSystemConfig.configCategoriesNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number4" name="number4" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumber4_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number4" name="number4" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber4_print }" maxlength="34" />
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
                                            <input type="text" id="categories_number5" name="number5" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber5FieldType == 2 || gSystemConfig.configCategoriesNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number5" name="number5" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumber5_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("categories_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("categories_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configCategoriesNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="categories_number5" name="number5" class="ss-backend-field-numeric02" value="${ ocdRecord.tblCategoriesNumber5_print }" maxlength="34" />
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
                                            <input type="text" id="categories_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="${ ocdRecord.tblCategoriesNumberSmall1_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS1FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small1" name="number_small1" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumberSmall1_print }" maxlength="9" />
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
                                            <input type="text" id="categories_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="${ ocdRecord.tblCategoriesNumberSmall2_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS2FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small2" name="number_small2" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumberSmall2_print }" maxlength="9" />
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
                                            <input type="text" id="categories_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="${ ocdRecord.tblCategoriesNumberSmall3_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS3FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small3" name="number_small3" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumberSmall3_print }" maxlength="9" />
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
                                            <input type="text" id="categories_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="${ ocdRecord.tblCategoriesNumberSmall4_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS4FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small4" name="number_small4" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumberSmall4_print }" maxlength="9" />
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
                                            <input type="text" id="categories_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="${ ocdRecord.tblCategoriesNumberSmall5_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("categories_number_small5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configCategoriesNumberS5FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="categories_number_small5" name="number_small5" class="ss-backend-field-currency01" value="${ ocdRecord.tblCategoriesNumberSmall5_print }" maxlength="9" />
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate1DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate1DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="categories_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="${ ocdRecord.tblCategoriesDate1_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate1DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate1DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ocdRecord.tblCategoriesDate1DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate2DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate2DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="categories_date2" name="date2" class="ss-backend-field-date01" autocomplete="off" value="${ ocdRecord.tblCategoriesDate2_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate2DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date2_minute" name="date2_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate2DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ocdRecord.tblCategoriesDate2DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate3DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate3DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="categories_date3" name="date3" class="ss-backend-field-date01" autocomplete="off" value="${ ocdRecord.tblCategoriesDate3_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate3DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date3_minute" name="date3_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate3DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ocdRecord.tblCategoriesDate3DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate4DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate4DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="categories_date4" name="date4" class="ss-backend-field-date01" autocomplete="off" value="${ ocdRecord.tblCategoriesDate4_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate4DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date4_minute" name="date4_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate4DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ocdRecord.tblCategoriesDate4DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate5DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="categories_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="categories_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ocdRecord.tblCategoriesDate5DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="categories_date5" name="date5" class="ss-backend-field-date01" autocomplete="off" value="${ ocdRecord.tblCategoriesDate5_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate5DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="categories_date5_minute" name="date5_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configCategoriesDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ocdRecord.tblCategoriesDate5DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ocdRecord.tblCategoriesDate5DateSecond == arrayRow ? ' selected' : ``}
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="categories_image_main" name="image_main" class="ss-backend-field-file-upload" />
                                        ${ /*ocdRecord.tblCategoriesImageMain*/ '' }
                                        ${ ocdRecord.tblCategoriesImageMain != "" ? 
                                        `
                                        <img id="imgCategoriesImageMain" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesImageMain + "?v=" + this.cacheClear }" alt="${ ocdRecord.tblCategoriesTitle }" class="ss-backend-images-edit" />
                                        <div id="divCategoriesImageMainDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ ocdRecord.tblCategoriesID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                strField:'image_main', 
                                                                                recordValue: '', 
                                                                                patchType: 'fileDelete', 
                                                                                ajaxFunction: true, 
                                                                                apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                            }, 
                                                                            async function(_resObjReturn){
                                                                                //alert(JSON.stringify(_resObjReturn));
                                                                                
                                                                                if(_resObjReturn.objReturn.returnStatus == true)
                                                                                {
                                                                                    //Delete files.


                                                                                    //Hide elements.
                                                                                    htmlGenericStyle01('imgCategoriesImageMain', 'display', 'none');
                                                                                    htmlGenericStyle01('divCategoriesImageMainDelete', 'display', 'none');

                                                                                    //Success message.
                                                                                    elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');

                                                                                }else{
                                                                                    //Show error.
                                                                                    elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                }

                                                                                //Hide ajax progress bar.
                                                                                htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                            });">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") }
                                            </a>
                                        </div>
                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="categories_file1" name="file1" class="ss-backend-field-file-upload" />
                                        ${ ocdRecord.tblCategoriesFile1 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile1Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile1" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile1 + "?v=" + this.cacheClear }" alt="${ ocdRecord.tblCategoriesFile1 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile1Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile1" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile1Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile1" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divCategoriesFile1Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ocdRecord.tblCategoriesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                    strField:'file1', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgCategoriesFile1', 'display', 'none');
                                                                                        htmlGenericStyle01('divCategoriesFile1Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configCategoriesFile1Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="categories_file2" name="file2" class="ss-backend-field-file-upload" />

                                        ${ ocdRecord.tblCategoriesFile2 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile2Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile2" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile2 + "?v=" + this.cacheClear }" alt="${ ocdRecord.tblCategoriesFile2 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile2Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile2" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile2Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile2" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divCategoriesFile2Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ocdRecord.tblCategoriesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                    strField:'File2', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgCategoriesFile2', 'display', 'none');
                                                                                        htmlGenericStyle01('divCategoriesFile2Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configCategoriesFile2Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="categories_file3" name="file3" class="ss-backend-field-file-upload" />

                                        ${ ocdRecord.tblCategoriesFile3 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile3Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile3" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile3 + "?v=" + this.cacheClear }" alt="${ ocdRecord.tblCategoriesFile3 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile3Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile3" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile3Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile3" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divCategoriesFile3Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ocdRecord.tblCategoriesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                    strField:'File3', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgCategoriesFile3', 'display', 'none');
                                                                                        htmlGenericStyle01('divCategoriesFile3Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configCategoriesFile3Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="categories_file4" name="file4" class="ss-backend-field-file-upload" />

                                        ${ ocdRecord.tblCategoriesFile4 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile4Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile4" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile4 + "?v=" + this.cacheClear }" alt="${ ocdRecord.tblCategoriesFile4 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile4Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile4" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile4Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile4" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divCategoriesFile4Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ocdRecord.tblCategoriesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                    strField:'File4', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgCategoriesFile4', 'display', 'none');
                                                                                        htmlGenericStyle01('divCategoriesFile4Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configCategoriesFile4Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="categories_file5" name="file5" class="ss-backend-field-file-upload" />

                                        ${ ocdRecord.tblCategoriesFile5 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile5Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile5" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile5 + "?v=" + this.cacheClear }" alt="${ ocdRecord.tblCategoriesFile5 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile5Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile5" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile5Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile5" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ocdRecord.tblCategoriesFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divCategoriesFile5Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ocdRecord.tblCategoriesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableCategories }', 
                                                                                    strField:'File5', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgCategoriesFile5', 'display', 'none');
                                                                                        htmlGenericStyle01('divCategoriesFile5Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configCategoriesFile5Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                            <option value="1"${ ocdRecord.tblCategoriesActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ocdRecord.tblCategoriesActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                        ${ /*ocdRecord.tblCategoriesActivation_print*/ '' }
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
                                                <option value="1"${ ocdRecord.tblCategoriesActivation1 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblCategoriesActivation1 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ocdRecord.tblCategoriesActivation2 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblCategoriesActivation2 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ocdRecord.tblCategoriesActivation3 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblCategoriesActivation3 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ocdRecord.tblCategoriesActivation4 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblCategoriesActivation4 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ocdRecord.tblCategoriesActivation5 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblCategoriesActivation5 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="0"${ ocdRecord.tblCategoriesIdStatus == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsCategoriesStatusListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }"${ ocdRecord.tblCategoriesIdStatus == statusRow.id ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
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
                                            <option value="0"${ ocdRecord.tblCategoriesRestrictedAccess == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0") }</option>
                                            <option value="1"${ ocdRecord.tblCategoriesRestrictedAccess == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1") }</option>
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
                                        <textarea id="categories_notes" name="notes" class="ss-backend-field-text-area01">${ ocdRecord.tblCategoriesNotes_edit }</textarea>
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
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>

                    <input type="hidden" id="categories_id" name="id" value="${ ocdRecord.tblCategoriesID }" />
                    ${ gSystemConfig.enableCategoriesIdParentEdit == 1 ? 
                    `
                        ${ /*id_parent defined by dropdown*/'' }
                    ` : `
                        <input type="hidden" id="categories_id_parent" name="id_parent" value="${ ocdRecord.tblCategoriesIdParent }" />
                    `
                    }

                    <input type="hidden" id="categories_idParent" name="idParent" value="${ ocdRecord.tblCategoriesIdParent }" />
                    <input type="hidden" id="categories_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="categories_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
            </section>
            `; 

            this.cphBody = backendHTML;

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