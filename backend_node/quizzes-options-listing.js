"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class QuizzesOptionsListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idQuizzes: idQuizzes,
                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert,
                            nRecords: nRecords
                        }
        */


        //Properties.
        //----------------------
        this._idQuizzes = objParameters.idQuizzes;
        //this._idQuizzes;

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

        this.cacheClear = this.dateNow.getTime().toString();

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
            this.objParentTable = await SyncSystemNS.FunctionsDB.tableFindGet(this._idQuizzes);

            //Categories.
            if(this.objParentTable.tableName == gSystemConfig.configSystemDBTableCategories)
            {
                this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].title, "db");

                //Meta description.
                if(gSystemConfig.enableCategoriesMetaDescription == 1)
                {
                    this.metaDescription += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].description, "db"));
                }else{
                    this.metaDescription += this.titleCurrent;
                }

                //Meta keywords.
                if(gSystemConfig.enableCategoriesKeywordsTags == 1)
                {
                    this.metaKeywords += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].keywords_tags, "db"));
                }
            }

            //Quizzes.
            //TODO: Copy this part to the edit objetc.
            if(this.objParentTable.tableName == gSystemConfig.configSystemDBTableQuizzes)
            {
                this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].title, "db");

                //Meta description.
                this.metaDescription += this.titleCurrent;

                //Meta keywords.
                this.metaKeywords += "";
            }

            
            //Debug.
            //console.log("this.objParentTable = ", this.objParentTable); 
            //console.log("this.titleCurrent = ", this.titleCurrent);


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleMain");
            
            if(this.titleCurrent)
            {
                this.metaTitle += " - " + this.titleCurrent;
            }

            //Meta description.
            //this.metaDescription += "";

            //Meta keywords.
            //this.metaKeywords += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].keywords_tags, "db"));

            //Meta URL current.
            this.metaURLCurrent += gSystemConfig.configSystemURL + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackend + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendForms + "/";
            this.metaURLCurrent += this._idQuizzes + "/";
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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleMain");

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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleMain");
            //this.cphTitleCurrent += " - ";

            //this.cphTitleCurrent += `
            //<a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/0" }" class="ss-backend-links04">
                //${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRoot") }
            //</a>
            //`;
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
        arrSearchParameters.push("id_quizzes;" + this._idQuizzes + ";i");
        //if(this._fileType)
        //{
            //arrSearchParameters.push("file_type;" + this._fileType + ";i");
        //}
        //arrSearchParameters.push("activation;1;i");


        let oqolRecords = "";
        let oqolRecordsParameters = {
            _arrSearchParameters: arrSearchParameters,
            _configSortOrder: gSystemConfig.configQuizzesOptionsSort,
            _strNRecords: "",
            _objSpecialParameters: {returnType: 3}
        };


        //arrSearchParameters.push("table_name;" + "categories" + ";s");
        


        //Debug.
        //console.log("oflRecordsParameters=", oflRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            oqolRecords = new SyncSystemNS.ObjectQuizzesOptionsListing(oqolRecordsParameters);
            await oqolRecords.recordsListingGet(0, 3);


            //this.cphBody = JSON.stringify(oclRecords);
            //this.cphBody = JSON.stringify(oclRecords.resultsCategoriesListing); //Debug. //working
            //console.log("oclRecords = ", oclRecords);
            //console.log("typeof oclRecords = ", typeof oclRecords);


            //Build HTML (template string).
            //ref: https://wesbos.com/template-strings-html/



            /* */
            //backendHTML = `
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
            ${oqolRecords.resultsQuizzesOptionsListing == "" ? `
                <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                </div>
            ` : `
                <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                    <button 
                        id="quizzes_options_delete" 
                        name="quizzes_options_delete" 
                        onclick="elementMessage01('formQuizzesOptionsListing_method', 'DELETE');
                                formSubmit('formQuizzesOptionsListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                " 
                        class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                        style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                    </button>
                </div>


                <form id="formQuizzesOptionsListing" name="formQuizzesOptionsListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="formQuizzesOptionsListing_method" name="_method" value="">

                    <input type="hidden" id="formQuizzesOptionsListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableQuizzesOptions }" />
                    
                    <input type="hidden" id="formQuizzesOptionsListing_idQuizzes" name="idQuizzes" value="${ this._idQuizzes }" />
                    <input type="hidden" id="formQuizzesOptionsListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions }" />
                    <input type="hidden" id="formQuizzesOptionsListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                <tr>
                                    <td style="width: 20px; text-align: center; display: none;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemID") }  
                                    </td>

                                    ${ gSystemConfig.enableQuizzesOptionsSortOrder == 1 ? 
                                    `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                        </td>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableQuizzesOptionsImageMain == 1 ? 
                                    `
                                        <td style="width: 100px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }  
                                        </td>
                                    ` : ``
                                    }

                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsOptionName") }  
                                    </td>

                                    <td style="width: 80px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "frontendQuizzesAnswer") }  
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
                            ${ oqolRecords.resultsQuizzesOptionsListing.map((quizzesOptionsRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        <td style="text-align: center; display: none;">
                                            ${ quizzesOptionsRow.id } 
                                        </td>

                                        ${ gSystemConfig.enableQuizzesOptionsSortOrder == 1 ? 
                                        `
                                            <td style="text-align: center;">
                                                ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(quizzesOptionsRow.sort_order, "", 3, null) } 
                                            </td>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableQuizzesOptionsImageMain == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ quizzesOptionsRow.image_main !== "" ? 
                                            `
                                                ${ /*No pop-up.*/'' }
                                                ${ gSystemConfig.configImagePopup == 0 ? 
                                                `
                                                    <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + quizzesOptionsRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesOptionsRow.title, "db") }" class="ss-backend-images-listing" />
                                                ` : ``
                                                }

                                                ${ /*GLightbox.*/'' }
                                                ${ gSystemConfig.configImagePopup == 4 ? 
                                                `
                                                    <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + quizzesOptionsRow.image_main + "?v=" + this.cacheClear }"
                                                       title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesOptionsRow.title, "db") }"
                                                       class="glightbox_categories_image_main${ quizzesOptionsRow.id }"
                                                       data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesOptionsRow.title, "db") };">

                                                        <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + quizzesOptionsRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesOptionsRow.title, "db") }" class="ss-backend-images-listing" />
                                                    </a>
                                                    <script>
                                                        gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ quizzesOptionsRow.id }";
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
                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesOptionsRow.title, "db") }
                                        </td>

                                        <td style="text-align: center;">
                                            <a id="linkIdQuizzesOptionsAnswer${ quizzesOptionsRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesOptionsRow.id_quizzes }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
                                                                                        strField:'id_quizzes_options_answer', 
                                                                                        recordValue: '${ quizzesOptionsRow.id }', 
                                                                                        patchType: 'setValue', 
                                                                                        ajaxFunction: true, 
                                                                                        apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                    }, 
                                                                                    async function(_resObjReturn){
                                                                                        //alert(JSON.stringify(_resObjReturn));
                                                                                        
                                                                                        if(_resObjReturn.objReturn.returnStatus == true)
                                                                                        {
                                                                                            //Change text inside link (all links).
                                                                                            elementMessage01('multiple:id:linkIdQuizzesOptionsAnswer', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSelect0") }');

                                                                                            //Change text inside link (selected link).
                                                                                            elementMessage01('linkIdQuizzesOptionsAnswer${ quizzesOptionsRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSelect1") }');

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
                                                        this.objParentTable.tableData[0].id_quizzes_options_answer == quizzesOptionsRow.id ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSelect1")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSelect0") 
                                                    } 
                                            </a>
                                        </td>

                                        <td id="formQuizzesOptionsListing_elementActivation${ quizzesOptionsRow.id }" style="text-align: center;" class="${ quizzesOptionsRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                            <a id="linkActivation${ quizzesOptionsRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesOptionsRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzesOptions }', 
                                                                                        strField:'activation', 
                                                                                        recordValue: '${ quizzesOptionsRow.activation == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formQuizzesOptionsListing_elementActivation${ quizzesOptionsRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ quizzesOptionsRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formQuizzesOptionsListing_elementActivation${ quizzesOptionsRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ quizzesOptionsRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                    quizzesOptionsRow.activation == "1" ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  quizzesOptionsRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <!--input type="checkbox" name="idsRecordsDelete[]" value="${quizzesOptionsRow.id}" class="ss-backend-field-checkbox" /--> 
                                            <input type="checkbox" name="idsRecordsDelete" value="${quizzesOptionsRow.id}" class="ss-backend-field-checkbox" /> 
                                            <!--input type="checkbox" name="arrIdsRecordsDelete" value="${quizzesOptionsRow.id}" class="ss-backend-field-checkbox" /--> 
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
                <form id="formQuizzesOptions" name="formQuizzesOptions" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions }" enctype="multipart/form-data" class="ss-backend-form-input01">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>

                        <table id="inputTableQuizzesOptions" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableQuizzesOptionsSortOrder == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_options_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_options_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowQuizzesOptions_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_options_title" name="title" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                ${ /*Information fields.*/'' }
                                ${ gSystemConfig.enableQuizzesOptionsInfo1 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzesOptions_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsInfo2 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzesOptions_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsInfo3 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzesOptions_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsInfo4 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzesOptions_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsInfo5 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzesOptions_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzesOptions_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Number fields.*/'' }
                                ${ gSystemConfig.enableQuizzesOptionsNumber1 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_number1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsNumber1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber1FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber1FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number1" name="number1" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number1")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzesOptions_number1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsNumber2 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_number2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsNumber2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber2FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber2FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number2" name="number2" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzesOptions_number2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsNumber3 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_number3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsNumber3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber3FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber3FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number3" name="number3" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzesOptions_number3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsNumber4 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_number4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsNumber4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber4FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber4FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number4" name="number4" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzesOptions_number4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsNumber5 == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_number5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsNumber5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber5FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber5FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number5" name="number5" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzesOptions_number5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesOptionsImageMain == 1 ? 
                                `
                                <tr id="inputRowQuizzesOptions_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="quizzes_options_image_main" name="image_main" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowQuizzesOptions_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="quizzes_options_activation" name="activation" class="ss-backend-field-dropdown01">
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
                        <button id="quizzes_options_include" name="quizzes_options_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>

                    </div>

                    <input type="hidden" id="quizzes_options_id_quizzes" name="id_quizzes" value="${ this._idQuizzes }" />

                    <input type="hidden" id="quizzes_options_idQuizzes" name="idQuizzes" value="${ this._idQuizzes }" />
                    <input type="hidden" id="quizzes_options_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
            </section>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(oclRecords);
            //strReturn = JSON.stringify(oclRecords.resultsFormsListing);
            
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