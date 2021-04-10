"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class ContentListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idParent: idParent,
                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert,
                            nRecords: nRecords
                        }
        */


        //Properties.
        //----------------------
        this._idParent = objParameters.idParent;
        //this._parentTable = "";

        //this._pagingNRecords = gSystemConfig.configFilesBackendPaginationNRecords;
        //this._pagingTotalRecords = 0;
        //this._pagingTotal = 0;
        //this._pageNumber = objParameters.pageNumber;
        //if(gSystemConfig.enableFilesBackendPagination == 1)
        //{
            //if(!(this._pageNumber))
            //{
                //this._pageNumber = 1;
            //}
        //}

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

        this.objParentTableLevel1;
        this.objParentTable;
        //----------------------
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
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            //if(this._pageNumber)
            //{
                //this.queryDefault += "&pageNumber=" + this._pageNumber;
            //}


            //Tittle - current.

            //Check table of parent id.
            this.objParentTable = await SyncSystemNS.FunctionsDB.tableFindGet(this._idParent);

            //Categories.
            if(this.objParentTable.tableName == gSystemConfig.configSystemDBTableCategories)
            {
                this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].title, "db");

                //Meta description.
                if(gSystemConfig.enableCategoriesDescription == 1)
                {
                    this.metaDescription += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].description, "db"));
                }else{
                    this.metaDescription += this.titleCurrent;
                }
            }

            //Debug.
            //console.log("this.objParentTable = ", this.objParentTable); 
            //console.log("this.titleCurrent = ", this.titleCurrent);


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleMain");
            
            if(this.titleCurrent)
            {
                this.metaTitle += " - " + this.titleCurrent;
            }

            //Meta description.
            //this.metaDescription += "";

            //Meta keywords.
            this.metaKeywords += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].keywords_tags, "db"));

            //Meta URL current.
            this.metaURLCurrent += gSystemConfig.configSystemURL + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackend + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendContent + "/";
            this.metaURLCurrent += this._idParent + "/";
            //if(this._masterPageSelect !== "")
            //{
                this.metaURLCurrent += "?masterPageSelect=" + this._masterPageSelect;
            //}
            //if(this._pageNumber !== "")
            //{
                //this.metaURLCurrent += "&pageNumber=" + this._pageNumber;
            //}


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
            this.cphTitle = SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleMain");
            //TODO: Check file type and show the equivalent tile name.
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleMain");
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
            //TODO: breadcrums.


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
        //if(this._fileType)
        //{
            //arrSearchParameters.push("file_type;" + this._fileType + ";i");
        //}
        //arrSearchParameters.push("activation;1;i");


        let oclRecords = "";
        let oclRecordsParameters = {
            _arrSearchParameters: arrSearchParameters,
            _configSortOrder: gSystemConfig.configContentSort,
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


        //arrSearchParameters.push("table_name;" + "categories" + ";s");
        


        //Debug.
        //console.log("oclRecordsParameters=", oclRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            oclRecords = new SyncSystemNS.ObjectContentListing(oclRecordsParameters);
            await oclRecords.recordsListingGet(0, 3);


            //this.cphBody = JSON.stringify(oclRecords);
            //this.cphBody = JSON.stringify(oclRecords.resultsCategoriesListing); //Debug. //working
            //console.log("oclRecords = ", oclRecords);
            //console.log("typeof oclRecords = ", typeof oclRecords);


            //Build HTML (template string).
            //ref: https://wesbos.com/template-strings-html/



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
            ${oclRecords.resultsContentListing == "" ? `
                <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                </div>
            ` : `
                <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                    <button 
                        id="content_delete" 
                        name="content_delete" 
                        onclick="elementMessage01('formContentListing_method', 'DELETE');
                                formSubmit('formContentListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                " 
                        class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                        style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                    </button>
                </div>


                <form id="formContentListing" name="formContentListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="formContentListing_method" name="_method" value="">

                    <input type="hidden" id="formContentListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableContent }" />
                    
                    <input type="hidden" id="formContentListing_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="formContentListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent }" />
                    <input type="hidden" id="formContentListing_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="formContentListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                <tr>
                                    ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                    `
                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                    </td>
                                    ` : ``
                                    }

                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentContentText") }  
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
                            ${ oclRecords.resultsContentListing.map((contentRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(contentRow.sort_order, "", 3, null) } 
                                        </td>
                                        ` : ``
                                        }

                                        <td style="text-align: left;">
                                            ${ /*Heading title.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 1 ?
                                            `
                                                <h2 class="ss-backend-content-heading-title" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                </h2>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*Subheading title.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 2 ?
                                            `
                                                <h3 class="ss-backend-content-subheading-title" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                </h3>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*Content text.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 3 ?
                                            `
                                                <p class="ss-backend-content-text" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                </p>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*Tab.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 4 ?
                                            `
                                                <p class="ss-backend-content-text ss-backend-content-text-tab" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                </p>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*Image.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 5 || contentRow.content_type == 9 ?
                                            `
                                                ${ /*Left.*/ '' }
                                                ${ contentRow.align_image == 3 ?
                                                `
                                                    <div style="position: relative; display: block; overflow: hidden;">
                                                        ${ contentRow.file != "" ?
                                                        `
                                                            <figure class="ss-backend-content-images-container-left">
                                                                <picture>
                                                                    <!--source media="(min-width:650px)" srcset="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                    <source media="(min-width:465px)" srcset="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->
                                                                    
                                                                    ${ contentRow.content_url != "" ? 
                                                                    `
                                                                        <a href="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url") }" target="_blank">
                                                                            <img src="${ 
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        }" 
                                                                                alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                                class="ss-backend-content-images" 
                                                                            />
                                                                        </a>
                                                                    ` : `
                                                                        ${ /*No pop-up.*/'' }
                                                                        ${ gSystemConfig.configImagePopup == 0 ? 
                                                                        `
                                                                            <img src="${ 
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        }" 
                                                                                alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                                class="ss-backend-content-images" 
                                                                            />
                                                                        ` : ``
                                                                        }


                                                                        ${ /*GLightbox.*/'' }
                                                                        ${ gSystemConfig.configImagePopup == 4 ? 
                                                                        `
                                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file }"
                                                                                title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }"
                                                                                class="glightbox_categories_image_main${ contentRow.id }"
                                                                                data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") };">

                                                                                <img src="${ 
                                                                                                contentRow.content_type == 9 ?
                                                                                                gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                                :
                                                                                                gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                            }" 
                                                                                    alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                                    class="ss-backend-content-images" 
                                                                                />
                                                                            </a>
                                                                            <script>
                                                                                gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                //data-glightbox="title: Title example.; description: Description example."
                                                                                var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                            </script>
                                                                        ` : ``
                                                                        }
                                                                    `
                                                                    }
                                                                </picture>

                                                                ${ contentRow.caption != "" ?
                                                                `
                                                                    <figcaption class="ss-backend-content-caption ss-backend-content-images-caption">
                                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                    </figcaption>
                                                                `
                                                                :
                                                                ``
                                                                }
                                                            </figure>
                                                        `
                                                        :
                                                        ``
                                                        }

                                                        <p class="ss-backend-content-text" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                        </p>
                                                    </div>
                                                `
                                                :
                                                ``
                                                }


                                                ${ /*Center.*/ '' }
                                                ${ contentRow.align_image == 2 ?
                                                `
                                                    ${ contentRow.file != "" ?
                                                    `
                                                        <figure class="ss-backend-content-images-container-center">
                                                            <picture>
                                                                <!--source media="(min-width:650px)" srcset="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                <source media="(min-width:465px)" srcset="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->
                                                                
                                                                ${ contentRow.content_url != "" ? 
                                                                `
                                                                    <a href="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url") }" target="_blank">
                                                                        <img src="${ 
                                                                                        contentRow.content_type == 9 ?
                                                                                        gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                        :
                                                                                        gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                    }" 
                                                                            alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                            class="ss-backend-content-images" 
                                                                        />
                                                                    </a>
                                                                ` : `
                                                                    ${ /*No pop-up.*/'' }
                                                                    ${ gSystemConfig.configImagePopup == 0 ? 
                                                                    `
                                                                        <img src="${ 
                                                                                        contentRow.content_type == 9 ?
                                                                                        gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                        :
                                                                                        gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                    }" 
                                                                            alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                            class="ss-backend-content-images" 
                                                                        />
                                                                    ` : ``
                                                                    }


                                                                    ${ /*GLightbox.*/'' }
                                                                    ${ gSystemConfig.configImagePopup == 4 ? 
                                                                    `
                                                                        <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file }"
                                                                            title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }"
                                                                            class="glightbox_categories_image_main${ contentRow.id }"
                                                                            data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") };">

                                                                            <img src="${ 
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        }" 
                                                                                alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                                class="ss-backend-content-images" 
                                                                            />
                                                                        </a>
                                                                        <script>
                                                                            gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                            //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                            //data-glightbox="title: Title example.; description: Description example."
                                                                            var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                        </script>
                                                                    ` : ``
                                                                    }
                                                                `
                                                                }
                                                            </picture>
                                                            
                                                            ${ contentRow.caption != "" ?
                                                            `
                                                                <figcaption class="ss-backend-content-caption ss-backend-content-images-caption">
                                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                </figcaption>
                                                            `
                                                            :
                                                            ``
                                                            }
                                                        </figure>
                                                    `
                                                    :
                                                    ``
                                                    }

                                                    <p class="ss-backend-content-text" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                    </p>
                                                `
                                                :
                                                ``
                                                }


                                                ${ /*Right.*/ '' }
                                                ${ contentRow.align_image == 1 ?
                                                `
                                                    <div style="position: relative; display: block; overflow: hidden;">
                                                        ${ contentRow.file != "" ?
                                                        `
                                                            <figure class="ss-backend-content-images-container-right">
                                                                <picture>
                                                                    <!--source media="(min-width:650px)" srcset="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                    <source media="(min-width:465px)" srcset="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->
                                                                    
                                                                    ${ contentRow.content_url != "" ? 
                                                                    `
                                                                        <a href="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url") }" target="_blank">
                                                                            <img src="${ 
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        }" 
                                                                                alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                                class="ss-backend-content-images" 
                                                                            />
                                                                        </a>
                                                                    ` : `
                                                                        ${ /*No pop-up.*/'' }
                                                                        ${ gSystemConfig.configImagePopup == 0 ? 
                                                                        `
                                                                            <img src="${ 
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        }" 
                                                                                alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                                class="ss-backend-content-images" 
                                                                            />
                                                                        ` : ``
                                                                        }


                                                                        ${ /*GLightbox.*/'' }
                                                                        ${ gSystemConfig.configImagePopup == 4 ? 
                                                                        `
                                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file }"
                                                                                title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }"
                                                                                class="glightbox_categories_image_main${ contentRow.id }"
                                                                                data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") };">

                                                                                <img src="${ 
                                                                                                contentRow.content_type == 9 ?
                                                                                                gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                                :
                                                                                                gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                            }" 
                                                                                    alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }" 
                                                                                    class="ss-backend-content-images" 
                                                                                />
                                                                            </a>
                                                                            <script>
                                                                                gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                //data-glightbox="title: Title example.; description: Description example."
                                                                                var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                            </script>
                                                                        ` : ``
                                                                        }
                                                                    `
                                                                    }
                                                                </picture>

                                                                ${ contentRow.caption != "" ?
                                                                `
                                                                    <figcaption class="ss-backend-content-caption ss-backend-content-images-caption">
                                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                    </figcaption>
                                                                `
                                                                :
                                                                ``
                                                                }
                                                            </figure>
                                                        `
                                                        :
                                                        ``
                                                        }
                                                        <p class="ss-backend-content-text" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                        </p>
                                                    </div>
                                                `
                                                :
                                                ``
                                                }
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*Videos.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 6 ?
                                            `
                                                <div class="ss-backend-content-text" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                </div>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*HTML.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 7 ?
                                            `
                                                <div class="ss-backend-content-text" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                </div>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*File.*/ '' }
                                            ${ /*TODO: thumbnails.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 8 ?
                                            `
                                                <div class="ss-backend-content-text" style="text-align: ${ SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text) };">
                                                    ${ contentRow.file !== "" ? 
                                                    `
                                                        ${ /*Download link.*/'' }
                                                        ${ contentRow.file_config == 3 ? 
                                                        `
                                                            <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file }" 
                                                                title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }" 
                                                                target="_blank" 
                                                                class="ss-backend-links01">
                                                                    ${ contentRow.content_text != "" ? 
                                                                    `
                                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                                    ` : `
                                                                        ${ contentRow.file }
                                                                    `
                                                                    }
                                                            </a>
                                                        ` : ``
                                                        }


                                                        ${ /*Open on media.*/'' }
                                                        ${ contentRow.file_config == 4 ? 
                                                        `
                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file }" 
                                                                title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }" 
                                                                target="_blank" 
                                                                class="ss-backend-links01">
                                                                    ${ contentRow.content_text != "" ? 
                                                                    `
                                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                                    ` : `
                                                                        ${ contentRow.file }
                                                                    `
                                                                    }
                                                            </a>
                                                        ` : ``
                                                        }
                                                    ` : `
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                    `
                                                    }
                                                </div>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }


                                            ${ /*Columns.*/ '' }
                                            ${ /*----------------------*/ '' }
                                            ${ contentRow.content_type == 10 ?
                                            `
                                                <div class="ss-backend-content-text">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                                </div>
                                            `
                                            :
                                            ``
                                            }
                                            ${ /*----------------------*/ '' }
                                        </td>

                                        <td style="text-align: center;">
                                            ${ /*TODO: Change address to id_parent and develop categories details with content type description and content.*/ '' }
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendDetails + "/" + contentRow.id }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a> 
                                            <!--a href="/${ gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendContent + "/" + gSystemConfig.configRouteFrontendDetails + "/" + contentRow.id }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a--> ${ /*TODO: Change address to access frontend.*/ '' }
                                        </td>

                                        <td id="formContentListing_elementActivation${ contentRow.id }" style="text-align: center;" class="${ contentRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                            <a id="linkActivation${ contentRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ contentRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableContent }', 
                                                                                        strField:'activation', 
                                                                                        recordValue: '${ contentRow.activation == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formContentListing_elementActivation${ contentRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ contentRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formContentListing_elementActivation${ contentRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ contentRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                    contentRow.activation == "1" ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  contentRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <!--input type="checkbox" name="idsRecordsDelete[]" value="${contentRow.id}" class="ss-backend-field-checkbox" /--> 
                                            <input type="checkbox" name="idsRecordsDelete" value="${contentRow.id}" class="ss-backend-field-checkbox" /> 
                                            <!--input type="checkbox" name="arrIdsRecordsDelete" value="${contentRow.id}" class="ss-backend-field-checkbox" /--> 
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
            `}
            </section>


            ${ /*Form.*/'' }
            <section class="ss-backend-layout-section-form01">
                ${ /*Content.*/'' }
                <form id="formContent" name="formContent" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent }" enctype="multipart/form-data" class="ss-backend-form-input01">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>

                        <table id="inputTableContent" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">

                                <!--tr id="inputRowContent_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        <select id="content_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                            <option value="1" selected="true">xxx</option>
                                            <option value="2">yyy</option>
                                        </select>
                                    </td>
                                </tr-->

                                ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                `
                                <tr id="inputRowContent_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="content_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("content_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowContent_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                    </td>
                                    <td>
                                        <select id="content_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="content_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                <tr id="inputRowContent_content_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="content_type" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="content_type" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="content_type" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="content_type" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType4") }
                                        </label>

                                        ${ gSystemConfig.enableContentHTML == 1 ? 
                                        `
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="content_type" value="7" class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType7") }
                                            </label>
                                        ` : ``
                                        }
                                    </td>
                                </tr>

                                <tr id="inputRowContent_align_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                        </label>
                                    </td>
                                </tr>
                                
                                <tr id="inputRowContent_content_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
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
                                            <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#content_content_text");
                                            </script>
                                        ` : ``}


                                        ${ /*TinyMCE*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#content_content_text",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#content_content_text";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                        ` : ``}
                                    </td>
                                </tr>

                                <tr id="inputRowContent_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="content_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>

                    </div>
                    <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                        <button id="content_include" name="content_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="content_id_parent" name="id_parent" value="${ this._idParent }" />
                    <input type="hidden" id="content_content_columns" name="content_columns" value="0" />
                    <input type="hidden" id="content_align_image" name="align_image" value="0" />
                    <input type="hidden" id="content_file_config" name="file_config" value="0" />

                    <input type="hidden" id="content_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="content_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="content_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>


                ${ /*Image.*/'' }
                <form id="formContentImage" name="formContentImage" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent }" enctype="multipart/form-data" class="ss-backend-form-input01">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>

                        <table id="inputTableContentImage" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                `
                                <tr id="inputRowContentImage_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="content_image_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("content_image_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowContentImage_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                    </td>
                                    <td>
                                        <select id="content_image_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="content_image_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                <tr id="inputRowContentImage_align_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                        </label>
                                    </td>
                                </tr>
                                
                                <tr id="inputRowContentImage_align_image" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignImage") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                        </label>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableContentImageNoResize == 1 ? 
                                `
                                <tr id="inputRowContentImage_content_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageNoResize") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="content_type" value="9" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageNoResizeYes") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="content_type" value="5" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageNoResizeNo") }
                                        </label>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="content_image_content_type" name="content_type" value="0" />
                                `
                                }

                                <tr id="inputRowContentImage_content_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*FroalaEditor*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 15 ? `
                                            <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#content_image_content_text");
                                            </script>
                                        ` : ``}


                                        ${ /*TinyMCE*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#content_image_content_text",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#content_image_content_text";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                        ` : ``}
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableContentURL == 1 ? 
                                `
                                <tr id="inputRowContentImage_content_url" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentURL") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="content_image_content_url" name="content_url" class="ss-backend-field-text-area-url" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowContentImage_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="content_image_caption" name="caption" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowContentImage_file" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="content_image_file" name="file" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>

                                <tr id="inputRowContentImage_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="content_image_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>

                    </div>
                    <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                        <button id="content_image_include" name="content_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="content_image_id_parent" name="id_parent" value="${ this._idParent }" />
                    <input type="hidden" id="content_image_content_columns" name="content_columns" value="0" />
                    <input type="hidden" id="content_image_file_config" name="file_config" value="0" />

                    <input type="hidden" id="content_image_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="content_image_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="content_image_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>


                ${ /*Video.*/'' }
                ${ gSystemConfig.enableContentFiles == 1 ?
                `
                <form id="formContentVideo" name="formContentVideo" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent }" enctype="multipart/form-data" class="ss-backend-form-input01">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>

                        <table id="inputTableContentVideo" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentVideoTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                `
                                <tr id="inputRowContentVideo_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="content_video_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("content_video_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowContentVideo_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                    </td>
                                    <td>
                                        <select id="content_video_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="content_video_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                <tr id="inputRowContentVideo_align_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                        </label>
                                    </td>
                                </tr>
                                
                                <tr id="inputRowContentVideo_align_image" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignVideo") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                        </label>
                                    </td>
                                </tr>

                                <tr id="inputRowContentVideo_content_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*FroalaEditor*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 15 ? `
                                            <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#content_video_content_text");
                                            </script>
                                        ` : ``}


                                        ${ /*TinyMCE*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#content_video_content_text",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#content_video_content_text";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                        ` : ``}
                                    </td>
                                </tr>

                                <tr id="inputRowContentVideo_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="content_video_caption" name="caption" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowContentVideo_file_config" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="2" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay4") }
                                        </label>
                                    </td>
                                </tr>

                                <tr id="inputRowContentVideo_file" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="content_video_file" name="file" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableContentFileThumbnail == 1 ? 
                                `
                                <tr id="inputRowContentVideo_file_thumbnail" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentFileThumbnail") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="content_video_file_thumbnail" name="file_thumbnail" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowContentVideo_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="content_video_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>
                    </div>
                    <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                        <button id="content_video_include" name="content_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="content_video_id_parent" name="id_parent" value="${ this._idParent }" />
                    <input type="hidden" id="content_video_content_columns" name="content_columns" value="0" />
                    <input type="hidden" id="content_video_content_type" name="content_type" value="6" />

                    <input type="hidden" id="content_video_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="content_video_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="content_video_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
                `
                :
                ``
                }


                ${ /*File.*/'' }
                ${ gSystemConfig.enableContentFiles == 1 ?
                `
                <form id="formContentFile" name="formContentFile" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent }" enctype="multipart/form-data" class="ss-backend-form-input01">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>

                        <table id="inputTableContentFile" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentFileTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                `
                                <tr id="inputRowContentFile_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="content_file_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("content_file_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowContentFile_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                    </td>
                                    <td>
                                        <select id="content_file_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="content_file_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                <tr id="inputRowContentFile_align_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_text" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                        </label>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableContentFileThumbnail == 1 ? 
                                `
                                <tr id="inputRowContentFile_align_image" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignImage") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label-horizontal">
                                            <input type="radio" name="align_image" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                        </label>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="content_file_align_image" name="align_image" value="0" />
                                `}

                                <tr id="inputRowContentFile_content_text" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*FroalaEditor*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 15 ? `
                                            <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#content_file_content_text");
                                            </script>
                                        ` : ``}


                                        ${ /*TinyMCE*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#content_file_content_text",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#content_file_content_text";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                        ` : ``}
                                    </td>
                                </tr>

                                <tr id="inputRowContentFile_file_config" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="3" checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="4" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay4") }
                                        </label>
                                    </td>
                                </tr>

                                <tr id="inputRowContentFile_file" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="content_file_file" name="file" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableContentFileThumbnail == 1 ? 
                                `
                                <tr id="inputRowContentFile_file_thumbnail" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentFileThumbnail") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="content_file_file_thumbnail" name="file_thumbnail" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowContentFile_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="content_file_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>
                    </div>
                    <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                        <button id="content_file_include" name="content_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="content_file_id_parent" name="id_parent" value="${ this._idParent }" />
                    <input type="hidden" id="content_file_content_columns" name="content_columns" value="0" />
                    <input type="hidden" id="content_file_content_type" name="content_type" value="8" />

                    <input type="hidden" id="content_file_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="content_file_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="content_file_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
                `
                :
                ``
                }
            </section>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(oclRecords);
            //strReturn = JSON.stringify(oclRecords.resultsContentListing);
            
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


    //Usage.
    //----------------------
    /*
    clBackend = new ContentListing({
        idParent: idParent,
        masterPageSelect: masterPageSelect,

        messageSuccess: messageSuccess,
        messageError: messageError,
        messageAlert: messageAlert,
        nRecords: nRecords
    });

    //Build object data.
    await clBackend.build();
    */
    //----------------------
};