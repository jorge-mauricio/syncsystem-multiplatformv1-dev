"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class CategoriesDetails
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idTbCategories: 123, 
                            pageNumber: 1, 
                            masterPageSelect: "", 

                            messageError: "", 
                            messageSuccess: "", 
                            messageAlert: ""
                        }
        */


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
        //this._nRecords = objParameters.nRecords;

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

        this.objCategoriesIdParent;

        this.arrSearchParameters = [];
        this.ocdRecord = "";
        this.ocdRecordParameters = {
            _arrSearchParameters: this.arrSearchParameters,
            _idTbCategories: this._idTbCategories,
            _terminal: 0,
            _objSpecialParameters: {returnType: 3}
        };

        this.arrFiltersGenericSearchParameters = [];
        this.ofglRecords = "";
        this.ofglRecordsParameters = {
            _arrSearchParameters: this.arrFiltersGenericSearchParameters,
            _configSortOrder: "title",
            _strNRecords: "",
            _objSpecialParameters: {returnType: 3}
        };

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


            //Build objects.
            this.ocdRecord = new SyncSystemNS.ObjectCategoriesDetails(this.ocdRecordParameters);
            await this.ocdRecord.recordDetailsGet(0, 3);
            //console.log("this.ocdRecord = ", this.ocdRecord);

            //Todo: check if filter is enabled.
            this.ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(this.ofglRecordsParameters);
            await this.ofglRecords.recordsListingGet(0, 3);

            
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

            if(gSystemConfig.enableCategoriesStatus != 0)
            {
                this.resultsCategoriesStatusListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleDetails");

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
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.ocdRecord.tblCategoriesImageMain }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                    ` : 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png" }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                    `
                }
                <meta property="og:image:alt" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaTitle) }" />
                <meta property="og:locale" content="${ gSystemConfig.configBackendLanguage }" />
            `;
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


            <section class="ss-backend-layout-section-form01">
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
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleTableDetails") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01 ">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableCategoriesIdParentEdit == 1 ? 
                                `
                                <tr id="inputRowCategories_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        ${ ocdRecord.tblCategoriesIdParent == 0 ? `
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                        ` : `
                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(await SyncSystemNS.FunctionsDB.genericFieldGet01(ocdRecord.tblCategoriesIdParent, gSystemConfig.configSystemDBTableCategories, "title"), "db") }
                                        ` }

                                        ${ /*SyncSystemNS.FunctionsGeneric.contentMaskRead(await SyncSystemNS.FunctionsDB.genericFieldGet01(790, gSystemConfig.configSystemDBTableCategories, "title"), "db")*/ '' }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesSortCustom == 1 ? 
                                `
                                <tr id="inputRowCategories_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        ${ ocdRecord.tblCategoriesSortOrder_print }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowCategories_category_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesType") }: 
                                    </td>
                                    <td>
                                        ${ ocdRecord.tblCategoriesCategoryType }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowCategories_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesRU") }: 
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowCategories_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesCategory") }: 
                                    </td>
                                    <td>
                                        ${ ocdRecord.tblCategoriesTitle }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesDescription == 1 ? 
                                `
                                <tr id="inputRowCategories_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesDescription") }: 
                                    </td>
                                    <td>
                                        ${ ocdRecord.tblCategoriesDescription }
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
                                    ${ ocdRecord.tblCategoriesURLAlias }
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
                                        ${ ocdRecord.tblCategoriesKeywordsTags }
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
                                        ${ ocdRecord.tblCategoriesMetaDescription_edit }
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
                                        ${ ocdRecord.tblCategoriesMetaTitle }
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
                                        ${ gSystemConfig.enableCategoriesFilterGeneric1 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric1Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }

                                        ${ /*Debug.*/'' }
                                        ${ /*JSON.stringify(ocdRecord.objCategoriesFiltersGeneric1Binding_print)*/'' }
                                        ${ /*JSON.stringify(ocdRecord.arrIdsCategoriesFiltersGeneric1Binding)*/'' }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric2 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric2") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric2 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric2Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric3 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric3") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric3 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ ocdRecord.objCategoriesFiltersGeneric3Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("") }
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric4 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric4") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric4 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric4Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric5 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric5") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric5 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric5Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric6 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric6") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric6 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric6Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric7 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric7") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric7 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric7Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric8 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric8") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric8 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric8Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric9 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric9") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric9 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric9Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableCategoriesFilterGeneric10 != 0 ? 
                                `
                                <tr id="inputRowCategories_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesFilterGeneric10") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableCategoriesFilterGeneric10 == 1 ? 
                                        `
                                            <ul class="ss-backend-list-v01">
                                                ${ocdRecord.objCategoriesFiltersGeneric10Binding_print.map((categoriesFiltersGenericRow)=>{
                                                    return `
                                                        <li class="ss-backend-list-item-v01">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow.title, "db") }
                                                        </li>
                                                    `;
                                                }).join("")}
                                            </ul>
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
                                        ${ ocdRecord.tblCategoriesInfo1 }
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
                                        ${ ocdRecord.tblCategoriesInfo2 }
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
                                        ${ ocdRecord.tblCategoriesInfo3 }
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
                                        ${ ocdRecord.tblCategoriesInfo4 }
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
                                        ${ ocdRecord.tblCategoriesInfo5 }
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
                                        ${ ocdRecord.tblCategoriesInfo6 }
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
                                        ${ ocdRecord.tblCategoriesInfo7 }
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
                                        ${ ocdRecord.tblCategoriesInfo8 }
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
                                        ${ ocdRecord.tblCategoriesInfo9 }
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
                                        ${ ocdRecord.tblCategoriesInfo10 }
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
                                        ${ ocdRecord.tblCategoriesInfoSmall1 }
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
                                        ${ ocdRecord.tblCategoriesInfoSmall2 }
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
                                        ${ ocdRecord.tblCategoriesInfoSmall3 }
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
                                        ${ ocdRecord.tblCategoriesInfoSmall4 }
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
                                        ${ ocdRecord.tblCategoriesInfoSmall5 }
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
                                        ${ ocdRecord.tblCategoriesNumber1_print }
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
                                        ${ ocdRecord.tblCategoriesNumber2_print }
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
                                        ${ ocdRecord.tblCategoriesNumber3_print }
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
                                        ${ ocdRecord.tblCategoriesNumber4_print }
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
                                        ${ ocdRecord.tblCategoriesNumber5_print }
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
                                        ${ ocdRecord.tblCategoriesNumberSmall1_print }
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
                                        ${ ocdRecord.tblCategoriesNumberSmall2_print }
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
                                        ${ ocdRecord.tblCategoriesNumberSmall3_print }
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
                                        ${ ocdRecord.tblCategoriesNumberSmall4_print }
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
                                        ${ ocdRecord.tblCategoriesNumberSmall5_print }
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
                                            ${ ocdRecord.tblCategoriesDate1_print }
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
                                            ${ ocdRecord.tblCategoriesDate2_print }
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
                                            ${ ocdRecord.tblCategoriesDate3_print }
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
                                            ${ ocdRecord.tblCategoriesDate4_print }
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
                                            ${ ocdRecord.tblCategoriesDate5_print }
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
                                        ${ ocdRecord.tblCategoriesImageMain != "" ? 
                                        `
                                            <img id="imgCategoriesImageMain" 
                                                src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesImageMain }" 
                                                alt="${ ocdRecord.tblCategoriesTitle }" 
                                                class="ss-backend-images-details" 
                                            />
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
                                        ${ ocdRecord.tblCategoriesFile1 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile1Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile1" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile1 }" 
                                                    alt="${ ocdRecord.tblCategoriesFile1 }" 
                                                    class="ss-backend-images-details" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile1Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile1" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile1 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile1Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile1" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile1 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile1 }
                                                </a>
                                            ` : ``
                                            }

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
                                        ${ ocdRecord.tblCategoriesFile2 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile2Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile2" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile2 }" 
                                                    alt="${ ocdRecord.tblCategoriesFile2 }" 
                                                    class="ss-backend-images-details" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile2Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile2" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile2 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile2Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile2" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile2 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile2 }
                                                </a>
                                            ` : ``
                                            }
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
                                        ${ ocdRecord.tblCategoriesFile3 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile3Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile3" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile3 }" 
                                                    alt="${ ocdRecord.tblCategoriesFile3 }" 
                                                    class="ss-backend-images-details" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile3Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile3" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile3 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile3Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile3" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile3 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile3 }
                                                </a>
                                            ` : ``
                                            }
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
                                        ${ ocdRecord.tblCategoriesFile4 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile4Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile4" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile4 }" 
                                                    alt="${ ocdRecord.tblCategoriesFile4 }" 
                                                    class="ss-backend-images-details" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile4Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile4" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile4 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile4Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile4" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile4 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile4 }
                                                </a>
                                            ` : ``
                                            }
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
                                        ${ ocdRecord.tblCategoriesFile5 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configCategoriesFile5Type == 1 ? 
                                            `
                                                <img id="imgCategoriesFile5" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ocdRecord.tblCategoriesFile5 }" 
                                                    alt="${ ocdRecord.tblCategoriesFile5 }" 
                                                    class="ss-backend-images-details" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile5Type == 3 ? 
                                            `
                                                <a id="imgCategoriesFile5" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile5 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configCategoriesFile5Type == 34 ? 
                                            `
                                                <a id="imgCategoriesFile5" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ocdRecord.tblCategoriesFile5 }" target="_blank" class="ss-backend-links01">
                                                    ${ ocdRecord.tblCategoriesFile5 }
                                                </a>
                                            ` : ``
                                            }
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
                                        ${ ocdRecord.tblCategoriesActivation_print }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableCategoriesActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowCategories_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesActivation1") }: 
                                        </td>
                                        <td>
                                            ${ ocdRecord.tblCategoriesActivation1_print }
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
                                            ${ ocdRecord.tblCategoriesActivation2_print }
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
                                            ${ ocdRecord.tblCategoriesActivation3_print }
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
                                            ${ ocdRecord.tblCategoriesActivation4_print }
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
                                            ${ ocdRecord.tblCategoriesActivation5_print }
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
                                            ${ ocdRecord.tblCategoriesIdStatus_print }
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
                                        ${ ocdRecord.tblCategoriesRestrictedAccess_print }
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
                                    ${ ocdRecord.tblCategoriesNotes }
                                    </td>
                                </tr>
                                ` : ``
                                }
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>

                    </div>
                    <div style="position: relative; display: none; overflow: hidden; clear: both; margin-top: 2px;">
                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>
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



    //Usage.
    //----------------------
    /*
    let cdBackend = new CategoriesDetails({
        idTbCategories: idTbCategories,
        pageNumber: pageNumber,
        masterPageSelect: masterPageSelect,

        messageSuccess: messageSuccess,
        messageError: messageError,
        messageAlert: messageAlert
    });


    //Build object data.
    await cdBackend.build();
    */
    //----------------------
};