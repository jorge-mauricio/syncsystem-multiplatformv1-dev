"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class QuizzesListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idParent: idParent,
                            //idType: idType,
                            pageNumber: pageNumber,

                            masterPageSelect: masterPageSelect,
                            cookiesData: cookiesData,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert,
                            nRecords: nRecords
                        }
        */
        //idType: 1 - poll | 2 - quiz (multiple questions)  | 3 - (written template answer


        //Properties.
        //----------------------
        this._idParent = objParameters.idParent;
        this._idType = objParameters.idType;

        this._pagingNRecords = gSystemConfig.configQuizzesBackendPaginationNRecords;
        this._pagingTotalRecords = 0;
        this._pagingTotal = 0;
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableQuizzesBackendPagination == 1)
        {
            if(!(this._pageNumber))
            {
                this._pageNumber = 1;
            }
        }

        this._masterPageSelect = objParameters.masterPageSelect;
        this._cookiesData = objParameters.cookiesData;

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
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Check table of parent id.
            this.objParentTable = await SyncSystemNS.FunctionsDB.tableFindGet(this._idParent);

            //Categories.
            if(this.objParentTable.tableName == gSystemConfig.configSystemDBTableCategories)
            {
                //Tittle - current.
                this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].title, "db");
                
                //Meta keywords.
                this.metaKeywords += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].keywords_tags, "db"));

                //Meta description.
                if(gSystemConfig.enableCategoriesDescription == 1)
                {
                    this.metaDescription += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].description, "db"));
                }else{
                    this.metaDescription += this.titleCurrent;
                }


                //Quizzes type.
                //if(this._idType)
                if(this._idType == "" || this._idType === null || this._idType === undefined)
                {
                    switch(this.objParentTable.tableData[0].category_type)
                    {
                        case 7:
                            this._idType = "1";
                            break;
                        case 17:
                            this._idType = "2";
                            break;
                    }


                    //Debug.
                    //console.log("if(this._idType) = true"); 
                    //console.log("this.objParentTable.tableData[0].category_type = ", this.objParentTable.tableData[0].category_type);
                }
            }

            //Debug.
            //console.log("this.objParentTable = ", this.objParentTable); 
            //console.log("this.titleCurrent = ", this.titleCurrent);
            //console.log("this._idType = ", this._idType);


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleMain");
            
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendQuizzes + "/";
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
    async cphTitleBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphTitle = SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleMain");
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleMain");
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
    async cphBodyBuild()
    {
        //Variables.
        //----------------------
        let strReturn = "";
        let backendHTML = "";
        let arrSearchParameters = [];
        let arrFiltersGenericSearchParameters = [];

        let oplRecords = "";
        let oplRecordsParameters = {};
        
        let ofglRecords = "";
        let ofglRecordsParameters = {};

        
        //Debug.
        //console.log("oplRecordsParameters=", oplRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //Parameters build.
            arrSearchParameters.push("id_parent;" + this._idParent + ";i");
            //arrSearchParameters.push("id_type;" + this._idType + ";i");

            oplRecordsParameters = {
                _arrSearchParameters: arrSearchParameters,
                _configSortOrder: gSystemConfig.configQuizzesSort,
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Pagination.
            if(gSystemConfig.enableQuizzesBackendPagination == 1)
            {
                //this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableQuizzes, 
                                                                                            arrSearchParameters, 
                                                                                            gSystemConfig.configQuizzesSort, 
                                                                                            "", 
                                                                                            "id, id_parent", 
                                                                                            3, 
                                                                                            {});

                this._pagingTotal = Math.ceil(this._pagingTotalRecords / this._pagingNRecords);


                //Parameters build - paging.
                oplRecordsParameters._objSpecialParameters._pageNumber = this._pageNumber;
                oplRecordsParameters._objSpecialParameters._pagingNRecords = this._pagingNRecords;
            }
            
            //Object build.
            oplRecords = new SyncSystemNS.ObjectQuizzesListing(oplRecordsParameters);
            await oplRecords.recordsListingGet(0, 3);


            //Parameters build.
            arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableQuizzes + ";s");

            ofglRecordsParameters = {
                _arrSearchParameters: arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(ofglRecordsParameters);
            await ofglRecords.recordsListingGet(0, 3);


            //Filters - Type.
            /*
            if(gSystemConfig.enableQuizzesType != 0)
            {
                var resultsQuizzesTypeListing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 1;
                });
            }
            */

            //Filters - Status.
            if(gSystemConfig.enableQuizzesStatus != 0)
            {
                var resultsQuizzesStatusListing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }


            //Build HTML.
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
            ${oplRecords.resultsQuizzesListing == "" ? `
                <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                </div>
            ` : `
                <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                    <button 
                        id="quizzes_delete" 
                        name="quizzes_delete" 
                        onclick="elementMessage01('formQuizzesListing_method', 'DELETE');
                                formSubmit('formQuizzesListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                " 
                        class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                        style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                    </button>
                </div>

                <form id="formQuizzesListing" name="formQuizzesListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="formQuizzesListing_method" name="_method" value="">

                    <input type="hidden" id="formQuizzesListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableQuizzes }" />
                    
                    <input type="hidden" id="formQuizzesListing_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="formQuizzesListing_idType" name="idType" value="${ this._idType }" />
                    <input type="hidden" id="formQuizzesListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes }" />
                    <input type="hidden" id="formQuizzesListing_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="formQuizzesListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                <tr>
                                    ${ gSystemConfig.enableQuizzesSortOrder == 1 ? 
                                    `
                                    <td style="width: 40px; text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                    </td>
                                    ` : ``
                                    }

                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDatePublished") }  
                                    </td>

                                    ${ gSystemConfig.enableQuizzesImageMain == 1 ? 
                                    `
                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }  
                                    </td>
                                    ` : ``
                                    }

                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitle") }  
                                    </td>

                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                    </td>

                                    ${ gSystemConfig.enableQuizzesStatus == 1 ? 
                                        `
                                        <td style="width: 100px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesStatus") }  
                                        </td>
                                        ` : ``
                                    }

                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivationA") }  
                                    </td>
                                    ${ gSystemConfig.enableQuizzesActivation1 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation1") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableQuizzesActivation2 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation2") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableQuizzesActivation3 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation3") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableQuizzesActivation4 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation4") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableQuizzesActivation5 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation5") }  
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
                            ${ oplRecords.resultsQuizzesListing.map((quizzesRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        ${ gSystemConfig.enableQuizzesSortOrder == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(quizzesRow.sort_order, "", 3, null) } 
                                        </td>
                                        ` : ``
                                        }

                                        <td style="text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.dateRead01(quizzesRow.date_creation, 
                                                                                        gSystemConfig.configBackendDateFormat, 
                                                                                        0, 
                                                                                        3) }
                                        </td>

                                        ${ gSystemConfig.enableQuizzesImageMain == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ quizzesRow.image_main !== "" ? 
                                            `
                                                ${ /*No pop-up.*/'' }
                                                ${ gSystemConfig.configImagePopup == 0 ? 
                                                `
                                                    <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + quizzesRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.title, "db") }" class="ss-backend-images-listing" />
                                                ` : ``
                                                }

                                                ${ /*GLightbox.*/'' }
                                                ${ gSystemConfig.configImagePopup == 4 ? 
                                                `
                                                    <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + quizzesRow.image_main + "?v=" + this.cacheClear }"
                                                       title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.title, "db") }"
                                                       class="glightbox_quizzes_image_main${ quizzesRow.id }"
                                                       data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.title, "db") };">

                                                        <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + quizzesRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.title, "db") }" class="ss-backend-images-listing" />
                                                    </a>
                                                    <script>
                                                        gLightboxBackendConfigOptions.selector = "glightbox_quizzes_image_main${ quizzesRow.id }";
                                                        //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                        //data-glightbox="title: Title example.; description: Description example."
                                                        var glightboxQuizzesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                    </script>
                                                ` : ``
                                                }
                                            ` : ``
                                            }
                                        </td>
                                        ` : ``
                                        }
                                        
                                        <td style="text-align: left;">
                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.title, "db") } 
                                        </td>

                                        <td style="text-align: center;">
                                            ${ /*SyncSystemNS.FunctionsGeneric.categoryConfigSelect(quizzesRow.category_type, 4)*/'' }
                                            
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" + gSystemConfig.configRouteBackendDetails + "/" + quizzesRow.id + "/" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a> 
                                            <!--a href="/${ gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendQuizzes + "/" + gSystemConfig.configRouteFrontendDetails + "/" + quizzesRow.id + "/" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a--> ${ /*TODO: Change address to access frontend.*/ '' }


                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + quizzesRow.id + "/?masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptions") }
                                            </a> 


                                            ${ /*Content.*/ '' }
                                            ${ gSystemConfig.enableQuizzesContent == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + quizzesRow.id + "/?masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertContent") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Images.*/ '' }
                                            ${ gSystemConfig.enableQuizzesImages == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + quizzesRow.id + "/?fileType=1&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertImages") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Videos.*/ '' }
                                            ${ gSystemConfig.enableQuizzesVideos == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + quizzesRow.id + "/?fileType=2&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertVideos") }
                                                    </a> 
                                                ` : ``
                                            }
                                            
                                            ${ /*Files.*/ '' }
                                            ${ gSystemConfig.enableQuizzesFiles == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + quizzesRow.id + "/?fileType=3&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertFiles") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Zip files.*/ '' }
                                            ${ gSystemConfig.enableQuizzesZip == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + quizzesRow.id + "/?fileType=4&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertFilesZip") }
                                                    </a> 
                                                ` : ``
                                            }
                                        </td>

                                        ${ gSystemConfig.enableQuizzesStatus == 1 ? 
                                            `
                                            <td style="text-align: center;">
                                                ${ quizzesRow.id_status == 0 ? `
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }
                                                ` : `
                                                    ${ ofglRecords.resultsFiltersGenericListing.filter(function(objFiltered){
                                                        return objFiltered.id == quizzesRow.id_status;
                                                    }).map(function(objMapped){
                                                        //return objMapped.title
                                                        return SyncSystemNS.FunctionsGeneric.contentMaskRead(objMapped.title, "db");
                                                    }) }

                                                    ${ /*quizzesRow.id_status*/ '' }
                                                ` }
                                            </td>
                                            ` : ``
                                        }
    
                                        <td id="formQuizzesListing_elementActivation${ quizzesRow.id }" style="text-align: center;" class="${ quizzesRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                            <a id="linkActivation${ quizzesRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
                                                                                        strField:'activation', 
                                                                                        recordValue: '${ quizzesRow.activation == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formQuizzesListing_elementActivation${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formQuizzesListing_elementActivation${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                    quizzesRow.activation == "1" ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        ${ gSystemConfig.enableQuizzesActivation1 == 1 ? 
                                            `
                                            <td id="formQuizzesListing_elementActivation1${ quizzesRow.id }" style="text-align: center;" class="${ quizzesRow.activation1 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation1${ quizzesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
                                                                                        strField:'activation1', 
                                                                                        recordValue: '${ quizzesRow.activation1 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formQuizzesListing_elementActivation1${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formQuizzesListing_elementActivation1${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        quizzesRow.activation1 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableQuizzesActivation2 == 1 ? 
                                            `
                                            <td id="formQuizzesListing_elementActivation2${ quizzesRow.id }" style="text-align: center;" class="${ quizzesRow.activation2 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation2${ quizzesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
                                                                                        strField:'activation2', 
                                                                                        recordValue: '${ quizzesRow.activation2 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formQuizzesListing_elementActivation2${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formQuizzesListing_elementActivation2${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        quizzesRow.activation2 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableQuizzesActivation3 == 1 ? 
                                            `
                                            <td id="formQuizzesListing_elementActivation3${ quizzesRow.id }" style="text-align: center;" class="${ quizzesRow.activation3 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation3${ quizzesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
                                                                                        strField:'activation3', 
                                                                                        recordValue: '${ quizzesRow.activation3 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formQuizzesListing_elementActivation3${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formQuizzesListing_elementActivation3${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        quizzesRow.activation3 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableQuizzesActivation4 == 1 ? 
                                            `
                                            <td id="formQuizzesListing_elementActivation4${ quizzesRow.id }" style="text-align: center;" class="${ quizzesRow.activation4 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation4${ quizzesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
                                                                                        strField:'activation4', 
                                                                                        recordValue: '${ quizzesRow.activation4 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formQuizzesListing_elementActivation4${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formQuizzesListing_elementActivation4${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        quizzesRow.activation4 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableQuizzesActivation5 == 1 ? 
                                            `
                                            <td id="formQuizzesListing_elementActivation5${ quizzesRow.id }" style="text-align: center;" class="${ quizzesRow.activation5 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation5${ quizzesRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ quizzesRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
                                                                                        strField:'activation5', 
                                                                                        recordValue: '${ quizzesRow.activation5 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formQuizzesListing_elementActivation5${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formQuizzesListing_elementActivation5${ quizzesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ quizzesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        quizzesRow.activation5 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
        
                                        <td style="text-align: center;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  quizzesRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <!--input type="checkbox" name="idsRecordsDelete[]" value="${quizzesRow.id}" class="ss-backend-field-checkbox" /--> 
                                            <input type="checkbox" name="idsRecordsDelete" value="${quizzesRow.id}" class="ss-backend-field-checkbox" /> 
                                            <!--input type="checkbox" name="arrIdsRecordsDelete" value="${quizzesRow.id}" class="ss-backend-field-checkbox" /--> 
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
                    ${ gSystemConfig.enableQuizzesBackendPagination == 1 ? 
                    `
                        <div class="ss-backend-paging" style="position: relative; display: block; overflow: hidden; text-align: center;">

                            ${ /*Page numbers.*/'' }
                            ${ gSystemConfig.enableQuizzesBackendPaginationNumbering == 1 ? 
                            `
                                <div class="ss-backend-paging-number-link-a" style="position: relative; display: block; overflow: hidden;">
                                    ${Array(this._pagingTotal).fill().map((item, pageNumberOutput)=>{
                                        return `
                                            ${ (pageNumberOutput + 1) == this._pageNumber ? `
                                                ${ pageNumberOutput + 1 }
                                            ` : `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=${ pageNumberOutput + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPageCounter01") + " " + pageNumberOutput + 1 }" class="ss-backend-paging-number-link">
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
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    `
                                }

                                
                                ${ this._pageNumber == this._pagingTotal ? 
                                    `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn">
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
                <form id="formQuizzes" name="formQuizzes" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes }" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configQuizzesInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_quizzes" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableQuizzesSortOrder == 1 ? 
                                `
                                <tr id="inputRowQuizzes_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesType == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_id_type" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesType") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_id_type" name="id_type" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsQuizzesTypeListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowQuizzes_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesRU") }: 
                                    </td>
                                    <td>
                                        <select id="quizzes_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="quizzes_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                <tr id="inputRowQuizzes_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_title" name="title" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableQuizzesDescription == 1 ? 
                                `
                                <tr id="inputRowQuizzes_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesDescription") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01"></textarea>
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
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#quizzes_description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#quizzes_description",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#quizzes_description";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                         ` : ``}
                                     </td>
                                </tr>
                                ` : ``
                                }


                                ${ gSystemConfig.configQuizzesURLAlias == 1 ? 
                                `
                                <tr id="inputRowQuizzes_url_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_url_alias" name="url_alias" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesKeywordsTags == 1 ? 
                                `
                                <tr id="inputRowQuizzes_keywords_tags" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                    </td>
                                    <td>
                                        <textarea id="quizzes_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01"></textarea>
                                        <div>
                                            (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywordsInstruction01") })
                                        </div>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableQuizzesMetaDescription == 1 ? 
                                `
                                <tr id="inputRowQuizzes_meta_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                    </td>
                                    <td>
                                        <textarea id="quizzes_meta_description" name="meta_description" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesMetaTitle == 1 ? 
                                `
                                <tr id="inputRowQuizzes_meta_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_meta_title" name="meta_title" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Information fields.*/'' }
                                ${ gSystemConfig.enableQuizzesInfo1 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzes_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzes_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesInfo2 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzes_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzes_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesInfo3 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzes_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzes_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesInfo4 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzes_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzes_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesInfo5 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#quizzes_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="quizzes_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Number fields.*/'' }
                                ${ gSystemConfig.enableQuizzesNumber1 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_number1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesNumber1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber1FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber1FieldType == 2 || gSystemConfig.configQuizzesNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number1" name="number1" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number1")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzes_number1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesNumber2 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_number2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesNumber2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber2FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber2FieldType == 2 || gSystemConfig.configQuizzesNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number2" name="number2" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzes_number2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesNumber3 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_number3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesNumber3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber3FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber3FieldType == 2 || gSystemConfig.configQuizzesNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number3" name="number3" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzes_number3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesNumber4 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_number4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesNumber4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber4FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber4FieldType == 2 || gSystemConfig.configQuizzesNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number4" name="number4" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzes_number4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesNumber5 == 1 ? 
                                `
                                <tr id="inputRowQuizzes_number5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesNumber5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber5FieldType == 1 ? 
                                        `
                                            <input type="text" id="quizzes_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber5FieldType == 2 || gSystemConfig.configQuizzesNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number5" name="number5" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("quizzes_number5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }


                                ${ gSystemConfig.enableQuizzesImageMain == 1 ? 
                                `
                                <tr id="inputRowQuizzes_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="quizzes_image_main" name="image_main" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableQuizzesImageMainCaption == 1 ? 
                                `
                                <tr id="inputRowQuizzes_image_main_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_image_main_caption" name="image_main_caption" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }                                

                                <tr id="inputRowQuizzes_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="quizzes_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableQuizzesActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesStatus == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_id_status" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesStatus") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_id_status" name="id_status" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsQuizzesStatusListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableQuizzesNotes == 1 ? 
                                `
                                <tr id="inputRowQuizzes_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="quizzes_notes" name="notes" class="ss-backend-field-text-area01"></textarea>
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
                        <button id="quizzes_include" name="quizzes_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="quizzes_id_parent" name="id_parent" value="${ this._idParent }" />
                    <input type="hidden" id="quizzes_id_type" name="id_type" value="${ this._idType }" />

                    <input type="hidden" id="quizzes_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="quizzes_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="quizzes_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
            </section>
            `; 
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{
            this.cphBody = backendHTML;
        }
        //----------------------
    }
    //**************************************************************************************
};