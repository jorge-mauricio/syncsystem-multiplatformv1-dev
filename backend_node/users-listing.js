"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class UsersListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idParent: idParent,
                            pageNumber: pageNumber,
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

        this._pagingNRecords = gSystemConfig.configUsersBackendPaginationNRecords;
        this._pagingTotalRecords = 0;
        this._pagingTotal = 0;
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableUsersBackendPagination == 1)
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
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Tittle - current.
            this.titleCurrent = "";


            //Debug.
            //console.log("this.objParentTable = ", this.objParentTable); 
            //console.log("this.titleCurrent = ", this.titleCurrent);


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleMain");
            
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendUsers + "/";
            this.metaURLCurrent += this._idParent + "/";
            //if(this._masterPageSelect !== "")
            //{
                this.metaURLCurrent += "?masterPageSelect=" + this._masterPageSelect;
            //}
            if(this._pageNumber !== "")
            {
                this.metaURLCurrent += "&pageNumber=" + this._pageNumber;
            }


            //Testing.
            //let debugCookieRead;
            //debugCookieRead = await SyncSystemNS.FunctionsCookies.cookieRead(gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot);
            //console.log("debugCookieRead=", debugCookieRead);
        

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleMain");
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleMain");


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
        //let strReturn = "<h1>Testing layout body</h1>"; //debug.
        let strReturn = "";
        let backendHTML = "";
        let arrSearchParameters = [];
        let arrFiltersGenericSearchParameters = [];

        let oulRecords = "";
        let oulRecordsParameters = {};

        
        //Debug.
        //console.log("oulRecordsParameters=", oulRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //Parameters build.
            arrSearchParameters.push("id_parent;" + this._idParent + ";i");
            arrSearchParameters.push("id;11;!i"); //user - root

            oulRecordsParameters = {
                _arrSearchParameters: arrSearchParameters,
                _configSortOrder: gSystemConfig.configUsersSort,
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Pagination.
            if(gSystemConfig.enableUsersBackendPagination == 1)
            {
                //this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableUsers, 
                                                                                            arrSearchParameters, 
                                                                                            gSystemConfig.configUsersSort, 
                                                                                            "", 
                                                                                            "id, id_parent", 
                                                                                            3, 
                                                                                            {});

                this._pagingTotal = Math.ceil(this._pagingTotalRecords / this._pagingNRecords);


                //Parameters build - paging.
                oulRecordsParameters._objSpecialParameters._pageNumber = this._pageNumber;
                oulRecordsParameters._objSpecialParameters._pagingNRecords = this._pagingNRecords;
            }
            
            //Object build.
            oulRecords = new SyncSystemNS.ObjectUsersListing(oulRecordsParameters);
            await oulRecords.recordsListingGet(0, 3);


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
            ${oulRecords.resultsUsersListing == "" ? `
                <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                </div>
            ` : `
                <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                    <button 
                        id="users_delete" 
                        name="users_delete" 
                        onclick="elementMessage01('formUsersListing_method', 'DELETE');
                                formSubmit('formUsersListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                " 
                        class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                        style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                    </button>
                </div>

                <form id="formUsersListing" name="formUsersListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="formUsersListing_method" name="_method" value="">

                    <input type="hidden" id="formUsersListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableUsers }" />
                    
                    <input type="hidden" id="formUsersListing_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="formUsersListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers }" />
                    <input type="hidden" id="formUsersListing_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="formUsersListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                <tr>
                                    ${ gSystemConfig.enableUsersSortOrder == 1 ? 
                                    `
                                    <td style="width: 40px; text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                    </td>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableUsersImageMain == 1 ? 
                                    `
                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }  
                                    </td>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableUsersNameFull == 1 ? 
                                    `
                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameFull") }  
                                    </td>
                                    ` : ``
                                    }
                                    ${ gSystemConfig.enableUsersNameFirst == 1 ? 
                                    `
                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameFirst") }  
                                    </td>
                                    ` : ``
                                    }

                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                    </td>

                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivationA") }  
                                    </td>
                                    ${ gSystemConfig.enableUsersActivation1 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation1") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableUsersActivation2 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation2") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableUsersActivation3 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation3") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableUsersActivation4 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation4") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableUsersActivation5 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation5") }  
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
                            ${ oulRecords.resultsUsersListing.map((usersRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        ${ gSystemConfig.enableUsersSortOrder == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(usersRow.sort_order, "", 3, null) } 
                                        </td>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableUsersImageMain == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ usersRow.image_main !== "" ? 
                                            `
                                                ${ /*No pop-up.*/'' }
                                                ${ gSystemConfig.configImagePopup == 0 ? 
                                                `
                                                    <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + usersRow.image_main }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.title, "db") }" class="ss-backend-images-listing" />
                                                ` : ``
                                                }

                                                ${ /*GLightbox.*/'' }
                                                ${ gSystemConfig.configImagePopup == 4 ? 
                                                `
                                                    <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + usersRow.image_main }"
                                                       title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.name_full, "db") }"
                                                       class="glightbox_users_image_main${ usersRow.id }"
                                                       data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.name_full, "db") };">

                                                        <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + usersRow.image_main }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.name_full, "db") }" class="ss-backend-images-listing" />
                                                    </a>
                                                    <script>
                                                        gLightboxBackendConfigOptions.selector = "glightbox_users_image_main${ usersRow.id }";
                                                        //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                        //data-glightbox="title: Title example.; description: Description example."
                                                        var glightboxUsersImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                    </script>
                                                ` : ``
                                                }
                                            ` : ``
                                            }
                                        </td>
                                        ` : ``
                                        }
                                        
                                        <td style="text-align: left;">
                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.name_full, "db") } 
                                            <div>
                                                ${ gSystemConfig.enableUsersUsername == 1 ? 
                                                    `
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersUsername") }:
                                                    </strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.username, "db") }  
                                                    ` : ``
                                                }

                                                ${ gSystemConfig.enableUsersEmail == 1 ? 
                                                    `
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEmail") }:
                                                    </strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.email, "db") }  
                                                    ` : ``
                                                }

                                                <strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemPassword") }:
                                                </strong>
                                                ${ usersRow.password != "" ? 
                                                    `
                                                    ${ SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.password, "db"), 2) }
                                                    ` : ``
                                                }

                                            </div>
                                        </td>

                                        ${ gSystemConfig.enableUsersNameFirst == 1 ? 
                                        `
                                        <td style="text-align: left;">
                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(usersRow.name_first, "db") } 
                                        </td>
                                        ` : ``
                                        }

                                        <td style="text-align: center;">

                                        </td>

                                        <td id="formUsersListing_elementActivation${ usersRow.id }" style="text-align: center;" class="${ usersRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                            <a id="linkActivation${ usersRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ usersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableUsers }', 
                                                                                        strField:'activation', 
                                                                                        recordValue: '${ usersRow.activation == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formUsersListing_elementActivation${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formUsersListing_elementActivation${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                    usersRow.activation == "1" ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        ${ gSystemConfig.enableUsersActivation1 == 1 ? 
                                            `
                                            <td id="formUsersListing_elementActivation1${ usersRow.id }" style="text-align: center;" class="${ usersRow.activation1 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation1${ usersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ usersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableUsers }', 
                                                                                        strField:'activation1', 
                                                                                        recordValue: '${ usersRow.activation1 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formUsersListing_elementActivation1${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formUsersListing_elementActivation1${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        usersRow.activation1 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableUsersActivation2 == 1 ? 
                                            `
                                            <td id="formUsersListing_elementActivation2${ usersRow.id }" style="text-align: center;" class="${ usersRow.activation2 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation2${ usersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ usersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableUsers }', 
                                                                                        strField:'activation2', 
                                                                                        recordValue: '${ usersRow.activation2 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formUsersListing_elementActivation2${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formUsersListing_elementActivation2${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        usersRow.activation2 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableUsersActivation3 == 1 ? 
                                            `
                                            <td id="formUsersListing_elementActivation3${ usersRow.id }" style="text-align: center;" class="${ usersRow.activation3 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation3${ usersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ usersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableUsers }', 
                                                                                        strField:'activation3', 
                                                                                        recordValue: '${ usersRow.activation3 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formUsersListing_elementActivation3${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formUsersListing_elementActivation3${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        usersRow.activation3 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableUsersActivation4 == 1 ? 
                                            `
                                            <td id="formUsersListing_elementActivation4${ usersRow.id }" style="text-align: center;" class="${ usersRow.activation4 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation4${ usersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ usersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableUsers }', 
                                                                                        strField:'activation4', 
                                                                                        recordValue: '${ usersRow.activation4 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formUsersListing_elementActivation4${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formUsersListing_elementActivation4${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        usersRow.activation4 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableUsersActivation5 == 1 ? 
                                            `
                                            <td id="formUsersListing_elementActivation5${ usersRow.id }" style="text-align: center;" class="${ usersRow.activation5 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation5${ usersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ usersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableUsers }', 
                                                                                        strField:'activation5', 
                                                                                        recordValue: '${ usersRow.activation5 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formUsersListing_elementActivation5${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formUsersListing_elementActivation5${ usersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ usersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        usersRow.activation5 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }

                                        <td style="text-align: center;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  usersRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <!--input type="checkbox" name="idsRecordsDelete[]" value="${usersRow.id}" class="ss-backend-field-checkbox" /--> 
                                            <input type="checkbox" name="idsRecordsDelete" value="${usersRow.id}" class="ss-backend-field-checkbox" /> 
                                            <!--input type="checkbox" name="arrIdsRecordsDelete" value="${usersRow.id}" class="ss-backend-field-checkbox" /--> 
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
                    ${ gSystemConfig.enableUsersBackendPagination == 1 ? 
                    `
                        <div class="ss-backend-paging" style="position: relative; display: block; overflow: hidden; text-align: center;">

                            ${ /*Page numbers.*/'' }
                            ${ gSystemConfig.enableUsersBackendPaginationNumbering == 1 ? 
                            `
                                <div class="ss-backend-paging-number-link-a" style="position: relative; display: block; overflow: hidden;">
                                    ${Array(this._pagingTotal).fill().map((item, pageNumberOutput)=>{
                                        return `
                                            ${ (pageNumberOutput + 1) == this._pageNumber ? `
                                                ${ pageNumberOutput + 1 }
                                            ` : `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=${ pageNumberOutput + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPageCounter01") + " " + pageNumberOutput + 1 }" class="ss-backend-paging-number-link">
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
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    `
                                }

                                
                                ${ this._pageNumber == this._pagingTotal ? 
                                    `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn">
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
                <form id="formUsers" name="formUsers" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers }" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configUsersInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_users" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableUsersSortOrder == 1 ? 
                                `
                                <tr id="inputRowUsers_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("users_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersNameFull == 1 ? 
                                `
                                <tr id="inputRowUsers_name_full" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameFull") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_name_full" name="name_full" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersNameFirst == 1 ? 
                                `
                                <tr id="inputRowUsers_name_first" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameFirst") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_name_first" name="name_first" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersNameLast == 1 ? 
                                `
                                <tr id="inputRowUsers_name_last" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameLast") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_name_last" name="name_last" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersDateBirth != 0 ? 
                                `
                                <tr id="inputRowUsers_date_birth" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDateBirth") }: 
                                    </td>
                                    <td>
                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.enableUsersDateBirth == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="users_date_birth_day" name="date_birth_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_date_birth_month" name="date_birth_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_date_birth_year" name="date_birth_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="users_date_birth_month" name="date_birth_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_date_birth_day" name="date_birth_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_date_birth_year" name="date_birth_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: 4}).map((arrayRow)=>{
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
                                        ${ /*TODO: Think about a logic that takes account jsDatepickerBirthBackendConfigOptions.dateSelected as default value, if field is required.*/'' }
                                        ${ gSystemConfig.enableUsersDateBirth == 11 ? 
                                            `
                                            <input type="text" id="users_date_birth" name="date_birth" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDateBirth = datepicker("#users_date_birth", jsDatepickerBirthBackendConfigOptions);
                                            </script>
                                            ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersGender == 1 ? 
                                `
                                <tr id="inputRowUsers_gender" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender" checked value="0" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender0") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender2") }
                                        </label>
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersDocument == 1 ? 
                                `
                                <tr id="inputRowUsers_document" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersDocument") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_document" name="document" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersAddress == 1 ? 
                                `
                                <tr id="inputRowUsers_address_street" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressStreet") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_address_street" name="address_street" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_address_number" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressNumber") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_address_number" name="address_number" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_address_complement" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressComplement") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_address_complement" name="address_complement" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_neighborhood" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressNeighborhood") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_neighborhood" name="neighborhood" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_district" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressDistrict") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_district" name="district" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_county" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCounty") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_county" name="county" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_city" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCity") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_city" name="city" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_state" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressState") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_state" name="state" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_country" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCountry") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_country" name="country" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_zip_code" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressZipCode") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_zip_code" name="zip_code" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersPhone1 == 1 ? 
                                `
                                <tr id="inputRowUsers_phone1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersPhone1") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableUsersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="users_phone1_international_code" name="phone1_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="" />
                                        ` : ``
                                        }
                                        (<input type="text" id="users_phone1_area_code" name="phone1_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="" />)
                                        <input type="text" id="users_phone1" name="phone1" class="ss-backend-field-tel01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersPhone2 == 1 ? 
                                `
                                <tr id="inputRowUsers_phone2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersPhone2") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableUsersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="users_phone2_international_code" name="phone2_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="" />
                                        ` : ``
                                        }
                                        (<input type="text" id="users_phone2_area_code" name="phone2_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="" />)
                                        <input type="text" id="users_phone2" name="phone2" class="ss-backend-field-tel01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersPhone3 == 1 ? 
                                `
                                <tr id="inputRowUsers_phone3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersPhone3") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableUsersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="users_phone3_international_code" name="phone3_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="" />
                                        ` : ``
                                        }
                                        (<input type="text" id="users_phone3_area_code" name="phone3_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="" />)
                                        <input type="text" id="users_phone3" name="phone3" class="ss-backend-field-tel01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersUsername == 1 ? 
                                `
                                <tr id="inputRowUsers_username" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersUsername") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_username" name="username" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersEmail == 1 ? 
                                `
                                <tr id="inputRowUsers_email" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEmail") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_email" name="email" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowUsers_password" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemPassword") }: 
                                    </td>
                                    <td>
                                        <input type="password" id="users_password" name="password" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                ${ /*Information fields.*/'' }
                                ${ gSystemConfig.enableUsersInfo1 == 1 ? 
                                `
                                <tr id="inputRowUsers_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="users_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo2 == 1 ? 
                                `
                                <tr id="inputRowUsers_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="users_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo3 == 1 ? 
                                `
                                <tr id="inputRowUsers_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="users_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo4 == 1 ? 
                                `
                                <tr id="inputRowUsers_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="users_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo5 == 1 ? 
                                `
                                <tr id="inputRowUsers_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="users_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo6 == 1 ? 
                                `
                                <tr id="inputRowUsers_info6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info6" name="info6" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info6";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info6" name="info6" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 12 ? 
                                        `
                                            <textarea id="users_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo7 == 1 ? 
                                `
                                <tr id="inputRowUsers_info7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info7" name="info7" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info7";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info7" name="info7" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 12 ? 
                                        `
                                            <textarea id="users_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo8 == 1 ? 
                                `
                                <tr id="inputRowUsers_info8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info8" name="info8" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info8";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info8" name="info8" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 12 ? 
                                        `
                                            <textarea id="users_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo9 == 1 ? 
                                `
                                <tr id="inputRowUsers_info9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info9" name="info9" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info9";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info9" name="info9" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 12 ? 
                                        `
                                            <textarea id="users_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo10 == 1 ? 
                                `
                                <tr id="inputRowUsers_info10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 1 ? 
                                        `
                                            <input type="text" id="users_info10" name="info10" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="users_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="users_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#users_info10";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 11 ? 
                                        `
                                            <input type="text" id="users_info10" name="info10" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 12 ? 
                                        `
                                            <textarea id="users_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersImageMain == 1 ? 
                                `
                                <tr id="inputRowUsers_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="users_image_main" name="image_main" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowUsers_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="users_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableUsersActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersNotes == 1 ? 
                                `
                                <tr id="inputRowUsers_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="users_notes" name="notes" class="ss-backend-field-text-area01"></textarea>
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
                        <button id="users_include" name="users_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="users_id_parent" name="id_parent" value="${ this._idParent }" />
                    <input type="hidden" id="users_id_type" name="id_type" value="1" />
                    <input type="hidden" id="users_name_title" name="name_title" value="" />
                    <input type="hidden" id="users_id_status" name="id_status" value="0" />

                    <input type="hidden" id="users_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="users_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="users_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
            </section>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(oplRecords);
            //strReturn = JSON.stringify(oplRecords.resultsContentListing);
            
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