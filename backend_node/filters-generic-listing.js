"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class FiltersGenericListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
            filterIndex: filterIndex,
            tableName: tableName,
            masterPageSelect: masterPageSelect,

            messageSuccess: messageSuccess,
            messageError: messageError,
            messageAlert: messageAlert,
            nRecords: nRecords
        }
        */


        //Properties.
        //----------------------
        this._filterIndex = objParameters.filterIndex;
        this._tableName = objParameters.tableName;

        this.filtersGenericLabelIndex = ""; //Optimize to show the right label.
        this.filtersGenericLabelModule = ""; //Optimize to show the right label.
        
        //this._pagingNRecords = gSystemConfig.configCategoriesBackendPaginationNRecords;
        //this._pagingTotalRecords = 0;
        //this._pagingTotal = 0;
        //this._pageNumber = objParameters.pageNumber;
        /*
        if(gSystemConfig.enableCategoriesBackendPagination == 1)
        {
            if(!(this._pageNumber))
            {
                this._pageNumber = 1;
            }
        }
        */

        this._masterPageSelect = objParameters.masterPageSelect;

        this._messageSuccess = objParameters.messageSuccess;
        this._messageError = objParameters.messageError;
        this._messageAlert = objParameters.messageAlert;
        this._nRecords = objParameters.nRecords;

        this.queryDefault = "";

        this.cphTitle = ""; //text
        this.cphHead = ""; //HTML
        this.cphTitleCurrent = ""; //text
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

        this.cacheClear = this.dateNow.getTime().toString();
        //----------------------


        //Define values.
        //----------------------
        //Filters generic label index.
        if(this._filterIndex.toString().length >= 3)
        {
            this.filtersGenericLabelIndex = this._filterIndex.toString().substring(1, 3); //Delete the first number.
            this.filtersGenericLabelIndex = parseInt(this.filtersGenericLabelIndex).toString(); //Convert to int and back to string.
        }else{
            //this.filtersGenericLabelIndex = parseInt(this._filterIndex).toString(); //Convert to int and back to string.
        }


        //Filters generic label module.
        if(this._tableName == gSystemConfig.configSystemDBTableCategories)
        {
            this.filtersGenericLabelModule = "Categories";
        }
        if(this._tableName == gSystemConfig.configSystemDBTableProducts)
        {
            this.filtersGenericLabelModule = "Products";
        }
        if(this._tableName == gSystemConfig.configSystemDBTablePublications)
        {
            this.filtersGenericLabelModule = "Publications";
        }


        //Debug.
        //console.log("this._filterIndex=",  this._filterIndex.toString().length);
        //console.log("this.filtersGenericLabelIndex=",  this.filtersGenericLabelIndex);
        //console.log("this.filtersGenericLabelModule=",  this.filtersGenericLabelModule);
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
            //Default query.
            this.queryDefault += "tableName=" + this._tableName;
            this.queryDefault += "&filterIndex=" + this._filterIndex;
            if(this._masterPageSelect)
            {
                this.queryDefault += "&masterPageSelect=" + this._masterPageSelect;
            }

            /*
            request({url:url, qs:propertiesObject}, function(err, response, body) {
                if(err) { console.log(err); return; }
                console.log("Get response: " + response.statusCode);
              });
              */


            //Tittle - current.
            this.titleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitleMain");
            if(this._tableName == gSystemConfig.configSystemDBTableCategories)
            {
                this.titleCurrent += " - " + SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain");
            }
            
            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application"); 
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendFiltersGeneric + "/";
            //this.metaURLCurrent += this._idParent + "/";
            this.metaURLCurrent += "?tableName=" + this._tableName;
            this.metaURLCurrent += "&filterIndex=" + this._filterIndex;
            if(this._masterPageSelect !== "")
            {
                this.metaURLCurrent += "&masterPageSelect=" + this._masterPageSelect;
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
    async cphTitleBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphTitle = SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application");
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
            if(this.titleCurrent)
            {
                this.cphTitleCurrent += this.titleCurrent;
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

        let ofglRecords;
        let ofglRecordsParameters;

        //Debug.
        //console.log("ofglRecordsParameters=", ofglRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //Parameters build.
            arrSearchParameters.push("filter_index;" + this._filterIndex + ";s");
            arrSearchParameters.push("table_name;" + this._tableName + ";s");
             
            //arrSearchParameters.push("activation;1;i");

            ofglRecordsParameters = {
                _arrSearchParameters: arrSearchParameters,
                _configSortOrder: gSystemConfig.configFiltersGenericSort,
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };
            
            //Object build.
            ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(ofglRecordsParameters);
            await ofglRecords.recordsListingGet(0, 3);



            //Build HTML (template string).
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
                ${ofglRecords.resultsFiltersGenericListing == "" ? `
                    <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                    </div>
                ` : `
                    <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                        <button 
                            id="filtersGeneric_delete" 
                            name="filtersGeneric_delete" 
                            onclick="elementMessage01('formFiltersGenericListing_method', 'DELETE');
                                    formSubmit('formFiltersGenericListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                    " 
                            class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                            style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                        </button>
                    </div>

                    <form id="formFiltersGenericListing" name="formFiltersGenericListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                        <input type="hidden" id="formFiltersGenericListing_method" name="_method" value="">

                        <input type="hidden" id="formFiltersGenericListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableFiltersGeneric }" />
                        
                        <input type="hidden" id="formFiltersGenericListing_tableName" name="tableName" value="${ this._tableName }" />
                        <input type="hidden" id="formFiltersGenericListing_filterIndex" name="filterIndex" value="${ this._filterIndex }" />
                        <input type="hidden" id="formFiltersGenericListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric }" />
                        <input type="hidden" id="formFiltersGenericListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                        <div style="position: relative; display: block; overflow: hidden;">
                            <table class="ss-backend-table-listing01">
                                <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitleMain") } 
                                    - 
                                    
                                    ${ this.filtersGenericLabelIndex != "" ? 
                                    `
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backend" + this.filtersGenericLabelModule + "FilterGeneric" + this.filtersGenericLabelIndex) } 
                                    ` : ``
                                    }
    
                                    ${ this._filterIndex == "1" ? 
                                    `
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backend" + this.filtersGenericLabelModule + "Type") } 
                                    ` : ``
                                    }

                                    ${ this._filterIndex == "2" ? 
                                    `
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backend" + this.filtersGenericLabelModule + "Status") } 
                                    ` : ``
                                    }
                                    </caption>
                                <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                    <tr>
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemID") }  
                                        </td>
                                    
                                        ${ gSystemConfig.enableFiltersGenericSortOrder == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: left;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                        </td>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFiltersGenericImageMain == 1 ? 
                                        `
                                        <td style="width: 100px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }  
                                        </td>
                                        ` : ``
                                        }

                                        <td style="text-align: left;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitle") }  
                                        </td>

                                        ${ gSystemConfig.enableFiltersGenericConfigSelection == 1 ? 
                                        `
                                        <td style="width: 100px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                        </td>
                                        ` : ``
                                        }

                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivationA") }  
                                        </td>
                                        ${ gSystemConfig.enableFiltersGenericActivation1 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation1") }  
                                        </td>
                                        ` : ``
                                        }
                                        ${ gSystemConfig.enableFiltersGenericActivation2 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation2") }  
                                        </td>
                                        ` : ``
                                        }
                                        ${ gSystemConfig.enableFiltersGenericActivation3 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation3") }  
                                        </td>
                                        ` : ``
                                        }
                                        ${ gSystemConfig.enableFiltersGenericActivation4 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation4") }  
                                        </td>
                                        ` : ``
                                        }
                                        ${ gSystemConfig.enableFiltersGenericActivation5 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation5") }  
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
                                ${ ofglRecords.resultsFiltersGenericListing.map((filtersGenericRow)=>{
                                    return `
                                        <tr class="ss-backend-table-bg-light">
                                            <td style="text-align: center;">
                                                ${ filtersGenericRow.id } 
                                            </td>
                                        
                                            ${ gSystemConfig.enableFiltersGenericSortOrder == 1 ? 
                                            `
                                            <td style="text-align: center;">
                                                ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(filtersGenericRow.sort_order, "", 3, null) } 
                                            </td>
                                            ` : ``
                                            }

                                            ${ gSystemConfig.enableFiltersGenericImageMain == 1 ? 
                                            `
                                            <td style="text-align: center;">
                                                ${ filtersGenericRow.image_main != "" &&  filtersGenericRow.image_main != undefined ? 
                                                `
                                                    ${ /*No pop-up.*/'' }
                                                    ${ gSystemConfig.configImagePopup == 0 ? 
                                                    `
                                                        <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + filtersGenericRow.image_main }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filtersGenericRow.title, "db") }" class="ss-backend-images-listing" />
                                                    ` : ``
                                                    }

                                                    ${ /*GLightbox.*/'' }
                                                    ${ gSystemConfig.configImagePopup == 4 ? 
                                                    `
                                                        <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + filtersGenericRow.image_main + "?v=" + this.cacheClear }"
                                                            title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filtersGenericRow.title, "db") }"
                                                            class="glightbox_filters_generic_image_main${ filtersGenericRow.id }"
                                                            data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filtersGenericRow.title, "db") };">

                                                            <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + filtersGenericRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filtersGenericRow.title, "db") }" class="ss-backend-images-listing" />
                                                        </a>
                                                        <script>
                                                            gLightboxBackendConfigOptions.selector = "glightbox_filters_generic_image_main${ filtersGenericRow.id }";
                                                            //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                            //data-glightbox="title: Title example.; description: Description example."
                                                            var glightboxFiltersGenericImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                        </script>
                                                    ` : ``
                                                    }
                                                ` : ``
                                                }
                                            </td>
                                            ` : ``
                                            }
                                            
                                            <td style="text-align: left;">
                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filtersGenericRow.title, "db") } 
                                            </td>

                                            ${ gSystemConfig.enableFiltersGenericConfigSelection == 1 ? 
                                            `
                                            <td style="text-align: center;">

                                            </td>
                                            ` : ``
                                            }

                                            <td id="formFiltersGeneric_elementActivation${ filtersGenericRow.id }" style="text-align: center;" class="${ filtersGenericRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkFiltersGenericActivation${ filtersGenericRow.id }" class="ss-backend-links01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                            ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                        {
                                                                                            idRecord: '${ filtersGenericRow.id }', 
                                                                                            strTable: '${ gSystemConfig.configSystemDBTableFiltersGeneric }', 
                                                                                            strField:'activation', 
                                                                                            recordValue: '${ filtersGenericRow.activation == 1 ? 0 : 1}', 
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
                                                                                                    elementCSSAdd('formFiltersGeneric_elementActivation${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                }

                                                                                                if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                {
                                                                                                    //Change cell color.
                                                                                                    elementCSSRemove('formFiltersGeneric_elementActivation${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        filtersGenericRow.activation == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ${ gSystemConfig.enableFiltersGenericActivation1 == 1 ? 
                                                `
                                                <td id="formFiltersGeneric_elementActivation1${ filtersGenericRow.id }" style="text-align: center;" class="${ filtersGenericRow.activation1 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                    <a id="linkFiltersGenericActivation1${ filtersGenericRow.id }" class="ss-backend-links01"
                                                        onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                        {
                                                                                            idRecord: '${ filtersGenericRow.id }', 
                                                                                            strTable: '${ gSystemConfig.configSystemDBTableFiltersGeneric }', 
                                                                                            strField:'activation1', 
                                                                                            recordValue: '${ filtersGenericRow.activation1 == 1 ? 0 : 1}', 
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
                                                                                                    elementCSSAdd('formFiltersGeneric_elementActivation1${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation1${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                }

                                                                                                if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                {
                                                                                                    //Change cell color.
                                                                                                    elementCSSRemove('formFiltersGeneric_elementActivation1${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation1${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                            filtersGenericRow.activation1 == "1" ? 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                            : 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                        } 
                                                    </a>
                                                </td>
                                                ` : ``
                                            }
                                            ${ gSystemConfig.enableFiltersGenericActivation2 == 1 ? 
                                                `
                                                <td id="formFiltersGeneric_elementActivation2${ filtersGenericRow.id }" style="text-align: center;" class="${ filtersGenericRow.activation2 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                    <a id="linkFiltersGenericActivation2${ filtersGenericRow.id }" class="ss-backend-links01"
                                                        onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                        {
                                                                                            idRecord: '${ filtersGenericRow.id }', 
                                                                                            strTable: '${ gSystemConfig.configSystemDBTableFiltersGeneric }', 
                                                                                            strField:'activation2', 
                                                                                            recordValue: '${ filtersGenericRow.activation2 == 1 ? 0 : 1}', 
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
                                                                                                    elementCSSAdd('formFiltersGeneric_elementActivation2${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation2${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                }

                                                                                                if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                {
                                                                                                    //Change cell color.
                                                                                                    elementCSSRemove('formFiltersGeneric_elementActivation2${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation2${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                            filtersGenericRow.activation2 == "1" ? 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                            : 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                        } 
                                                    </a>
                                                </td>
                                                ` : ``
                                            }
                                            ${ gSystemConfig.enableFiltersGenericActivation3 == 1 ? 
                                                `
                                                <td id="formFiltersGeneric_elementActivation3${ filtersGenericRow.id }" style="text-align: center;" class="${ filtersGenericRow.activation3 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                    <a id="linkFiltersGenericActivation3${ filtersGenericRow.id }" class="ss-backend-links01"
                                                        onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                        {
                                                                                            idRecord: '${ filtersGenericRow.id }', 
                                                                                            strTable: '${ gSystemConfig.configSystemDBTableFiltersGeneric }', 
                                                                                            strField:'activation3', 
                                                                                            recordValue: '${ filtersGenericRow.activation3 == 1 ? 0 : 1}', 
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
                                                                                                    elementCSSAdd('formFiltersGeneric_elementActivation3${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation3${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                }

                                                                                                if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                {
                                                                                                    //Change cell color.
                                                                                                    elementCSSRemove('formFiltersGeneric_elementActivation3${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation3${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                            filtersGenericRow.activation3 == "1" ? 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                            : 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                        } 
                                                    </a>
                                                </td>
                                                ` : ``
                                            }
                                            ${ gSystemConfig.enableFiltersGenericActivation4 == 1 ? 
                                                `
                                                <td id="formFiltersGeneric_elementActivation4${ filtersGenericRow.id }" style="text-align: center;" class="${ filtersGenericRow.activation4 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                    <a id="linkFiltersGenericActivation4${ filtersGenericRow.id }" class="ss-backend-links01"
                                                        onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                        {
                                                                                            idRecord: '${ filtersGenericRow.id }', 
                                                                                            strTable: '${ gSystemConfig.configSystemDBTableFiltersGeneric }', 
                                                                                            strField:'activation4', 
                                                                                            recordValue: '${ filtersGenericRow.activation4 == 1 ? 0 : 1}', 
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
                                                                                                    elementCSSAdd('formFiltersGeneric_elementActivation4${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation4${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                }

                                                                                                if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                {
                                                                                                    //Change cell color.
                                                                                                    elementCSSRemove('formFiltersGeneric_elementActivation4${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation4${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                            filtersGenericRow.activation4 == "1" ? 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                            : 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                        } 
                                                    </a>
                                                </td>
                                                ` : ``
                                            }
                                            ${ gSystemConfig.enableFiltersGenericActivation5 == 1 ? 
                                                `
                                                <td id="formFiltersGeneric_elementActivation5${ filtersGenericRow.id }" style="text-align: center;" class="${ filtersGenericRow.activation5 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                    <a id="linkFiltersGenericActivation5${ filtersGenericRow.id }" class="ss-backend-links01"
                                                        onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                        {
                                                                                            idRecord: '${ filtersGenericRow.id }', 
                                                                                            strTable: '${ gSystemConfig.configSystemDBTableFiltersGeneric }', 
                                                                                            strField:'activation5', 
                                                                                            recordValue: '${ filtersGenericRow.activation5 == 1 ? 0 : 1}', 
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
                                                                                                    elementCSSAdd('formFiltersGeneric_elementActivation5${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkFiltersGenericActivation5${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                }

                                                                                                if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                {
                                                                                                    //Change cell color.
                                                                                                    elementCSSRemove('formFiltersGeneric_elementActivation5${ filtersGenericRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkActivation5${ filtersGenericRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                            filtersGenericRow.activation5 == "1" ? 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                            : 
                                                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                        } 
                                                    </a>
                                                </td>
                                                ` : ``
                                            }
            
                                            <td style="text-align: center;">
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  filtersGenericRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                                </a>
                                            </td>
                                            <td style="text-align: center;">
                                                <!--input type="checkbox" name="idsRecordsDelete[]" value="${filtersGenericRow.id}" class="ss-backend-field-checkbox" /--> 
                                                <input type="checkbox" name="idsRecordsDelete" value="${filtersGenericRow.id}" class="ss-backend-field-checkbox" /> 
                                                <!--input type="checkbox" name="arrIdsRecordsDelete" value="${filtersGenericRow.id}" class="ss-backend-field-checkbox" /--> 
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
                    </form>
                ` 
                }
            </section>


            ${ /*Form.*/'' }
            <section class="ss-backend-layout-section-form01">
                <form id="formFiltersGeneric" name="formFiltersGeneric" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric }" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configFiltersGenericInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>
                        <table id="input_table_filters_generic" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitleTable") } 
                                - 

                                ${ this.filtersGenericLabelIndex != "" ? 
                                `
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backend" + this.filtersGenericLabelModule + "FilterGeneric" + this.filtersGenericLabelIndex) } 
                                ` : ``
                                }

                                ${ this._filterIndex == "2" ? 
                                `
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backend" + this.filtersGenericLabelModule + "Status") } 
                                ` : ``
                                }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableFiltersGenericSortOrder == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="filtersGeneric_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowFiltersGeneric_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="inputRowFiltersGeneric_title" name="title" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFiltersGenericDescription == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericDescription") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01"></textarea>
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
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#filtersGeneric_description");
                                            </script>
                                            ` : ``}


                                            ${ /*TinyMCE*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#filtersGeneric_description",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#filtersGeneric_description";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                            ` : ``}
                                        </td>
                                </tr>
                                ` : ``
                                }


                                ${ gSystemConfig.configFiltersGenericURLAlias == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_url_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="filtersGeneric_url_alias" name="url_alias" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericKeywordsTags == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_keywords_tags" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                    </td>
                                    <td>
                                        <textarea id="filtersGeneric_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01"></textarea>
                                        <div>
                                            (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywordsInstruction01") })
                                        </div>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableFiltersGenericMetaDescription == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_meta_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                    </td>
                                    <td>
                                        <textarea id="filtersGeneric_meta_description" name="meta_description" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericMetaTitle == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_meta_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="filtersGeneric_meta_title" name="meta_title" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericInfoS1 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_info_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericInfoS1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_info_small1" name="info_small1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#filtersGeneric_info_small1";
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

                                ${ gSystemConfig.enableFiltersGenericInfoS2 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_info_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericInfoS2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_info_small2" name="info_small2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#filtersGeneric_info_small2";
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

                                ${ gSystemConfig.enableFiltersGenericInfoS3 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_info_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericInfoS3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_info_small3" name="info_small3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#filtersGeneric_info_small3";
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

                                ${ gSystemConfig.enableFiltersGenericInfoS4 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_info_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericInfoS4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_info_small4" name="info_small4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#filtersGeneric_info_small4";
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

                                ${ gSystemConfig.enableFiltersGenericInfoS5 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_info_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericInfoS5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_info_small5" name="info_small5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#filtersGeneric_info_small5";
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

                                ${ gSystemConfig.enableFiltersGenericNumberS1 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_number_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericNumberS1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS1FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small1" name="number_small1" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("filtersGeneric_number_small1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericNumberS2 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_number_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericNumberS2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS2FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small2" name="number_small2" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("filtersGeneric_number_small2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericNumberS3 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_number_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericNumberS3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS3FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small3" name="number_small3" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("filtersGeneric_number_small3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericNumberS4 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_number_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericNumberS4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS4FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small4" name="number_small4" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("filtersGeneric_number_small4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericNumberS5 == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_number_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericNumberS5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="filtersGeneric_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS5FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small5" name="number_small5" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("filtersGeneric_number_small5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericImageMain == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="filtersGeneric_image_main" name="image_main" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowFiltersGeneric_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="filtersGeneric_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFiltersGenericActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowFiltersGeneric_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="filtersGeneric_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowFiltersGeneric_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="filtersGeneric_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowFiltersGeneric_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="filtersGeneric_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowFiltersGeneric_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="filtersGeneric_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowFiltersGeneric_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="filtersGeneric_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableFiltersGenericNotes == 1 ? 
                                `
                                <tr id="inputRowFiltersGeneric_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="filtersGeneric_notes" name="notes" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>
    
                        <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                            <button id="filtersGeneric_include" name="FiltersGeneric_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                            </button>
                        </div>
    
                        <input type="hidden" id="filtersGeneric_filter_index" name="filter_index" value="${ this._filterIndex }" />
                        <input type="hidden" id="filtersGeneric_table_name" name="table_name" value="${ this._tableName }" />
                        <input type="hidden" id="filtersGeneric_config_selection" name="config_selection" value="0" />
    
                        <input type="hidden" id="filtersGeneric_filterIndex" name="filterIndex" value="${ this._filterIndex }" />
                        <input type="hidden" id="filtersGeneric_tableName" name="tableName" value="${ this._tableName }" />
                        <input type="hidden" id="filtersGeneric_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                    </div>
                </form>    
            </section>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(ofglRecords);
            //strReturn = JSON.stringify(ofglRecords.resultsCategoriesListing);
            
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