"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class FormsFieldsListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idForms: idForms,
                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert,
                            nRecords: nRecords
                        }
        */


        //Properties.
        //----------------------
        this._idForms = objParameters.idForms;
        //this._parentTable = "";

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
            this.objParentTable = await SyncSystemNS.FunctionsDB.tableFindGet(this._idForms);

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

            //Forms.
            if(this.objParentTable.tableName == gSystemConfig.configSystemDBTableForms)
            {
                this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].form_title, "db");

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleMain");
            
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
            this.metaURLCurrent += this._idForms + "/";
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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleMain");

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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleMain");
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
        let offlRecords;
        let offlRecordsParameters;

        let arrIdsFormsFields = [];
        let arrFormsFieldsOptionsListing = [];
        let offolRecords;
        let offolRecordsParameters;
        //----------------------


        //Value definition.
        //----------------------
        //Parameters build.
        arrSearchParameters.push("id_forms;" + this._idForms + ";i");
        //if(this._fileType)
        //{
            //arrSearchParameters.push("file_type;" + this._fileType + ";i");
        //}
        //arrSearchParameters.push("activation;1;i");

        offlRecords = "";
        offlRecordsParameters = {
            _arrSearchParameters: arrSearchParameters,
            _configSortOrder: gSystemConfig.configFormsFieldsSort,
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
            //Build object - forms fields - listing.
            offlRecords = new SyncSystemNS.ObjectFormsFieldsListing(offlRecordsParameters);
            await offlRecords.recordsListingGet(0, 3);


            //Filter forms fields ids.
            offlRecords.resultsFormsFieldsListing.map((formsFieldsRow)=>{
                arrIdsFormsFields.push(formsFieldsRow.id);

                //Debug.
                //console.log("formsFieldsRow=",formsFieldsRow);
                //console.log("formsFieldsRow.id=",formsFieldsRow.id);
            });
            

            //Parameters build - forms fields options - listing.
            offolRecordsParameters = {
                _arrSearchParameters: ["id_forms_fields;" + arrIdsFormsFields.join() + ";ids"],
                _configSortOrder: gSystemConfig.configFormsFieldsOptionsSort,
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Build object - forms fields options - listing.
            offolRecords = new SyncSystemNS.ObjectFormsFieldsOptionsListing(offolRecordsParameters);
            await offolRecords.recordsListingGet(0, 3);

            //Array of objects.
            arrFormsFieldsOptionsListing = offolRecords.resultsFormsFieldsOptionsListing;


            //this.cphBody = JSON.stringify(oclRecords);
            //this.cphBody = JSON.stringify(oclRecords.resultsCategoriesListing); //Debug. //working
            //console.log("arrIdsFormsFields = ", arrIdsFormsFields);
            //console.log("offolRecords = ", offolRecords);
            //console.log("arrFormsFieldsOptionsListing = ", arrFormsFieldsOptionsListing);
            //console.log("oclRecords = ", oclRecords);
            //console.log("typeof oclRecords = ", typeof oclRecords);


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
            ${offlRecords.resultsFormsFieldsListing == "" ? `
                <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                </div>
            ` : `
                <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                    <button 
                        id="forms_fields_delete" 
                        name="forms_fields_delete" 
                        onclick="elementMessage01('formFormsFieldsListing_method', 'DELETE');
                                formSubmit('formFormsFieldsListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                " 
                        class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                        style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                    </button>
                </div>


                <form id="formFormsFieldsListing" name="formFormsFieldsListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="formFormsFieldsListing_method" name="_method" value="">

                    <input type="hidden" id="formFormsFieldsListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableFormsFields }" />
                    
                    <input type="hidden" id="formFormsFieldsListing_idForms" name="idForms" value="${ this._idForms }" />
                    <input type="hidden" id="formFormsFieldsListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFormsFields }" />
                    <input type="hidden" id="formFormsFieldsListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                <tr>
                                    <td style="width: 20px; text-align: center; display: none;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemID") }  
                                    </td>

                                    ${ gSystemConfig.enableFormsFieldsSortOrder == 1 ? 
                                    `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                        </td>
                                    ` : ``
                                    }

                                    <td style="width: 200px; text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldName") }  
                                    </td>

                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType") }  
                                    </td>

                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                    </td>

                                    ${ gSystemConfig.enableFormsFieldsRequired == 1 ? 
                                    `
                                        <td style="width: 100px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequiredA") }  
                                        </td>
                                    ` : ``
                                    }
                                    
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
                            ${ offlRecords.resultsFormsFieldsListing.map((formsFieldsRow)=>{
                                //Variables.
                                let arrFormsFieldsOptionsSearchParameters = [];
                                let offolRecords = "";
                                let offolRecordsParameters = {};

                                //Parameters build.
                                arrFormsFieldsOptionsSearchParameters.push("id_forms_fields;" + formsFieldsRow.id + ";i");

                                offolRecordsParameters = {
                                    _arrSearchParameters: arrFormsFieldsOptionsSearchParameters,
                                    _configSortOrder: gSystemConfig.configFormsFieldsOptionsSort,
                                    _strNRecords: "",
                                    _objSpecialParameters: {returnType: 3}
                                };

                                //Object build.
                                offolRecords = new SyncSystemNS.ObjectFormsFieldsOptionsListing(offolRecordsParameters);
                                //await offolRecords.recordsListingGet(0, 3);
                                            
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        <td style="text-align: center; display: none;">
                                            id = ${ formsFieldsRow.id } 
                                        </td>

                                        ${ gSystemConfig.enableFormsFieldsSortOrder == 1 ? 
                                        `
                                            <td style="text-align: center;">
                                                ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(formsFieldsRow.sort_order, "", 3, null) } 
                                            </td>
                                        ` : ``
                                        }

                                        <td style="text-align: left;">
                                            ${ formsFieldsRow.field_type != 7 && formsFieldsRow.field_type != 8 ? 
                                            `
                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                            ` : ``
                                            }
                                        </td>

                                        <td style="text-align: left;">
                                            ${ /*formsFieldsRow.field_type*/ '' }

                                            ${ /*Instructions*/ '' }
                                            ${ formsFieldsRow.field_instructions != "" ? 
                                            `
                                                <div class="ss-backend-content-text">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db") }
                                                </div>
                                            ` : ``
                                            }


                                            ${ /*Text Field*/ '' }
                                            ${ formsFieldsRow.field_type == 1 ? 
                                            `
                                                <input type="text" id="${ formsFieldsRow.field_name_formatted }" name="${ formsFieldsRow.field_name_formatted }" value="" 
                                                    class="ss-backend-field-text01" 
                                                    style="${formsFieldsRow.field_size == 0 ?
                                                                `width: 100%;`
                                                            :
                                                                `width: ${ formsFieldsRow.field_size }px;`

                                                            }" />
                                            ` : ``
                                            }


                                            ${ /*Text Area*/ '' }
                                            ${ formsFieldsRow.field_type == 2 ? 
                                            `
                                                <textarea id="${ formsFieldsRow.field_name_formatted }" name="${ formsFieldsRow.field_name_formatted }" cols="${ formsFieldsRow.field_size }" rows="${ formsFieldsRow.field_size }" 
                                                class="ss-backend-field-text-area-content" 
                                                style="${formsFieldsRow.field_size == 0 ?
                                                            `width: 100%;`
                                                        :
                                                            `width: ${ formsFieldsRow.field_size }px;`

                                                        }"></textarea>
                                            ` : ``
                                            }


                                            ${ /*Check Box*/ '' }
                                            ${ /*TODO: List options.*/ '' }
                                            ${ formsFieldsRow.field_type == 3 ? 
                                            `
                                                ${ arrFormsFieldsOptionsListing.length > 0 ?
                                                    `
                                                    ${ arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                                return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id

                                                                //Debug.
                                                                //console.log("objFormsFieldsOptions.id_forms_fields=", objFormsFieldsOptions.id_forms_fields);
                                                                //console.log("formsFieldsRow.id=", formsFieldsRow.id);
                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return `
                                                                    <label class="ss-backend-field-checkbox-label">
                                                                        <input type="checkbox" 
                                                                            id="${"form" + formsFieldsRow.id_forms + "_formField" + formsFieldsRow.id}" 
                                                                            name="${formsFieldsRow.field_name_formatted + "[]"}" 
                                                                            value="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }" 
                                                                        />
                                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                                `;
                                                    }).join("")}
                                                    `
                                                :
                                                `
                                                    <div class="ss-backend-content-text">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsOptionsEmptyAlert") }  
                                                    </div>
                                                `
                                                }
                                            ` : ``
                                            }


                                            ${ /*Radio Box*/ '' }
                                            ${ /*TODO: List options.*/ '' }
                                            ${ formsFieldsRow.field_type == 4 ? 
                                            `
                                                ${ arrFormsFieldsOptionsListing.length > 0 ?
                                                    `
                                                    ${ arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                                return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id

                                                                //Debug.
                                                                //console.log("objFormsFieldsOptions.id_forms_fields=", objFormsFieldsOptions.id_forms_fields);
                                                                //console.log("formsFieldsRow.id=", formsFieldsRow.id);
                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return `
                                                                    <label class="ss-backend-field-radio-label">
                                                                        <input type="radio" 
                                                                            id="${"form" + formsFieldsRow.id_forms + "_formField" + formsFieldsRow.id}" 
                                                                            group="${formsFieldsRow.field_name_formatted}" 
                                                                            name="${formsFieldsRow.field_name_formatted}" 
                                                                            value="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }" 
                                                                        />
                                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                                `;
                                                    }).join("")}
                                                    `
                                                :
                                                `
                                                    <div class="ss-backend-content-text">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsOptionsEmptyAlert") }  
                                                    </div>
                                                `
                                                }
                                            ` : ``
                                            }


                                            ${ /*Dropdown Menu*/ '' }
                                            ${ /*TODO: List options.*/ '' }
                                            ${ formsFieldsRow.field_type == 5 ? 
                                            `
                                                <select id="${ formsFieldsRow.field_name_formatted }" 
                                                    name="${ formsFieldsRow.field_name_formatted }" 
                                                    class="ss-backend-field-dropdown01" 
                                                    style="${formsFieldsRow.field_size == 0 ?
                                                                `width: 100%;`
                                                            :
                                                                `width: ${ formsFieldsRow.field_size }px;`

                                                            }">

                                                    <option value="1" selected></option>

                                                    ${ arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                                return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id

                                                                //Debug.
                                                                //console.log("objFormsFieldsOptions.id_forms_fields=", objFormsFieldsOptions.id_forms_fields);
                                                                //console.log("formsFieldsRow.id=", formsFieldsRow.id);
                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return `
                                                                    <option value="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }">
                                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </option>
                                                                `;
                                                    }).join("")}
                                                </select>

                                                ${ arrFormsFieldsOptionsListing.length == 0 ?
                                                `
                                                    <div class="ss-backend-content-text">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsOptionsEmptyAlert") }  
                                                    </div>
                                                `:`` 
                                                }
                                            ` : ``
                                            }


                                            ${ /*Text Description*/ '' }
                                            ${ formsFieldsRow.field_type == 7 ? 
                                            `
                                                <p class="ss-backend-content-text">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                </p>
                                            ` : ``
                                            }


                                            ${ /*Subheader*/ '' }
                                            ${ formsFieldsRow.field_type == 8 ? 
                                            `
                                                <h4 class="ss-backend-content-subheading-title">
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                </4>
                                            ` : ``
                                            }
                                        </td>

                                        <td style="text-align: center;">
                                            ${ formsFieldsRow.field_type == 3 || formsFieldsRow.field_type == 4 || formsFieldsRow.field_type == 5 ? 
                                            `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFormsFieldsOptions + "/" + formsFieldsRow.id + "?masterPageSelect=layout-backend-blank" }" class="ss-backend-links01" style="position: relative; display: block;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsOptionsTitleTableInsert") }
                                                </a> 
                                            ` : ``
                                            }
                                        </td>

                                        ${ gSystemConfig.enableFormsFieldsRequired == 1 ? 
                                        `
                                            <td id="formFormsFieldsListing_elementRequired${ formsFieldsRow.id }" style="text-align: center;" class="${ formsFieldsRow.required == 1 ? "ss-backend-table-bg-deactive" : ""}">
                                                <a id="linkRequired${ formsFieldsRow.id }" class="ss-backend-links01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                            ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                        {
                                                                                            idRecord: '${ formsFieldsRow.id }', 
                                                                                            strTable: '${ gSystemConfig.configSystemDBTableFormsFields }', 
                                                                                            strField:'required', 
                                                                                            recordValue: '${ formsFieldsRow.required == 1 ? 0 : 1}', 
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
                                                                                                    //elementCSSAdd('formFormsFieldsListing_elementRequired${ formsFieldsRow.id }', 'ss-backend-table-bg-deactive');
                                                                                                    elementCSSRemove('formFormsFieldsListing_elementRequired${ formsFieldsRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkRequired${ formsFieldsRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired0") }');
                                                                                                }

                                                                                                if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                {
                                                                                                    //Change cell color.
                                                                                                    //elementCSSRemove('formFormsFieldsListing_elementRequired${ formsFieldsRow.id }', 'ss-backend-table-bg-deactive');
                                                                                                    elementCSSAdd('formFormsFieldsListing_elementRequired${ formsFieldsRow.id }', 'ss-backend-table-bg-deactive');
                                                                                                    
                                                                                                    //Change link text.
                                                                                                    elementMessage01('linkRequired${ formsFieldsRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired1") }');
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
                                                        formsFieldsRow.required == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired1") 
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired0")
                                                    } 
                                                </a>
                                            </td>
                                        ` : ``
                                        }

                                        <td id="formFormsFieldsListing_elementActivation${ formsFieldsRow.id }" style="text-align: center;" class="${ formsFieldsRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                            <a id="linkActivation${ formsFieldsRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ formsFieldsRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableFormsFields }', 
                                                                                        strField:'activation', 
                                                                                        recordValue: '${ formsFieldsRow.activation == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formFormsFieldsListing_elementActivation${ formsFieldsRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ formsFieldsRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formFormsFieldsListing_elementActivation${ formsFieldsRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ formsFieldsRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                    formsFieldsRow.activation == "1" ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFormsFields + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  formsFieldsRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <!--input type="checkbox" name="idsRecordsDelete[]" value="${formsFieldsRow.id}" class="ss-backend-field-checkbox" /--> 
                                            <input type="checkbox" name="idsRecordsDelete" value="${formsFieldsRow.id}" class="ss-backend-field-checkbox" /> 
                                            <!--input type="checkbox" name="arrIdsRecordsDelete" value="${formsFieldsRow.id}" class="ss-backend-field-checkbox" /--> 
                                        </td>
                                    </tr>
                                `;

                                //Clean up.
                                //delete arrFormsFieldsOptionsSearchParameters;
                                //delete offolRecords;
                                //delete offolRecordsParameters;
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
                <form id="formFormsFields" name="formFormsFields" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFormsFields }" enctype="multipart/form-data" class="ss-backend-form-input01">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>

                        <table id="inputTableFormsFields" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableFormsFieldsSortOrder == 1 ? 
                                `
                                <tr id="inputRowFormsFields_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="forms_fields_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("forms_fields_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowFormsFields_field_name" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldName") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="forms_fields_field_name" name="field_name" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFormsFieldsInstructions == 1 ? 
                                `
                                <tr id="inputRowFormsFields_field_instructions" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldInstructions") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="forms_fields_field_instructions" name="field_instructions" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowFormsFields_field_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType") }: 
                                    </td>
                                    <td>
                                        <table id="inputTableFormsFieldsType" class="ss-backend-table-input01">
                                            <caption class="ss-backend-table-header-text01 ss-backend-table-title" style="display: none;">

                                            </caption>
                                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                                <tr>
                                                    <td style="width: 30px; text-align: center;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSelect") }  
                                                    </td>
                                                    <td style="width: 300px;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldExample") }  
                                                    </td>
                                                    <td>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldDescription") }  
                                                    </td>
                                                </tb>
                                            </thead>
                                            <tbody class="ss-backend-table-listing-text01">
                                                <tr>
                                                    <td style="text-align: center;">
                                                        <label class="ss-backend-field-radio-label">
                                                            <input type="radio" name="field_type" value="1" checked class="ss-backend-field-radio" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <input type="text" name="example_text" class="ss-backend-field-text01" />
                                                    </td>
                                                    <td>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType1") }  
                                                    </td>
                                                </tb>

                                                <tr>
                                                    <td style="text-align: center;">
                                                        <label class="ss-backend-field-radio-label">
                                                            <input type="radio" name="field_type" value="2" class="ss-backend-field-radio" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <textarea name="example_textarea" cols="30" rows="3" class="ss-backend-field-text-area-content"></textarea>
                                                    </td>
                                                    <td>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType2") }  
                                                    </td>
                                                </tb>

                                                <tr>
                                                    <td style="text-align: center;">
                                                        <label class="ss-backend-field-radio-label">
                                                            <input type="radio" name="field_type" value="3" class="ss-backend-field-radio" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <input type="checkbox" name="example_checkbox" value="example_checkbox" class="ss-backend-field-checkbox" />
                                                    </td>
                                                    <td>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType3") }  
                                                    </td>
                                                </tb>

                                                <tr>
                                                    <td style="text-align: center;">
                                                        <label class="ss-backend-field-radio-label">
                                                            <input type="radio" name="field_type" value="4" class="ss-backend-field-radio" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <input type="radio" name="example_radio" value="example_radio" class="ss-backend-field-radio" />
                                                    </td>
                                                    <td>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType4") }  
                                                    </td>
                                                </tb>

                                                <tr>
                                                    <td style="text-align: center;">
                                                        <label class="ss-backend-field-radio-label">
                                                            <input type="radio" name="field_type" value="5" class="ss-backend-field-radio" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <select name="example_select" class="ss-backend-field-dropdown01">
                                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldTypeExample1") }</option>
                                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldTypeExample1") }</option>
                                                            <option value="3">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldTypeExample1") }</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType5") }  
                                                    </td>
                                                </tb>

                                                ${ /*Extra options.*/'' }
                                                ${ gSystemConfig.enableFormsFieldTypeExtraOptions == 1 ? 
                                                `
                                                <tr>
                                                    <td style="text-align: center;">
                                                        <label class="ss-backend-field-radio-label">
                                                            <input type="radio" name="field_type" value="7" class="ss-backend-field-radio" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <div class="ss-backend-content-text">
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType7") }  
                                                        </div>
                                                    </td>
                                                    <td>

                                                    </td>
                                                </tb>

                                                <tr>
                                                    <td style="text-align: center;">
                                                        <label class="ss-backend-field-radio-label">
                                                            <input type="radio" name="field_type" value="8" class="ss-backend-field-radio" />
                                                        </label>
                                                    </td>
                                                    <td>
                                                        <div class="ss-backend-content-subheading-title">
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldType8") }  
                                                        </div>
                                                    </td>
                                                    <td>

                                                    </td>
                                                </tb>
                                                ` : ` `
                                                }
                                            </tbody>
                                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                                            </tfoot>
                                        </table>
                                    </td>
                                </tr>

                                <tr id="inputRowFormsFields_field_size" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldSize") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="forms_fields_field_size" name="field_size" class="ss-backend-field-numeric01" maxlength="255" value="60" />
                                        (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldSizeInstructions") })
                                    </td>
                                </tr>

                                <tr id="inputRowFormsFields_field_height" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldHeight") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="forms_fields_field_height" name="field_height" class="ss-backend-field-numeric01" maxlength="255" value="5" />
                                        (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldHeightInstruction") })
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFormsFieldsFieldFilter == 1 ? 
                                `
                                <tr id="inputRowFormsFields_field_filter" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldFilter") }: 
                                    </td>
                                    <td>
                                        <select id="forms_fields_field_filter" name="field_filter" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldFilter0") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="forms_fields_field_filter" name="field_filter" value="0" />
                                `
                                }

                                ${ gSystemConfig.enableFormsFieldsInfoS1 == 1 ? 
                                `
                                <tr id="inputRowFormsFields_info_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsInfoS1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="forms_fields_info_small1" name="info_small1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#forms_fields_info_small1";
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

                                ${ gSystemConfig.enableFormsFieldsInfoS2 == 1 ? 
                                `
                                <tr id="inputRowFormsFields_info_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsInfoS2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="forms_fields_info_small2" name="info_small2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#forms_fields_info_small2";
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

                                ${ gSystemConfig.enableFormsFieldsInfoS3 == 1 ? 
                                `
                                <tr id="inputRowFormsFields_info_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsInfoS3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="forms_fields_info_small3" name="info_small3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#forms_fields_info_small3";
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

                                ${ gSystemConfig.enableFormsFieldsInfoS4 == 1 ? 
                                `
                                <tr id="inputRowFormsFields_info_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsInfoS4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="forms_fields_info_small4" name="info_small4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#forms_fields_info_small4";
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

                                ${ gSystemConfig.enableFormsFieldsInfoS5 == 1 ? 
                                `
                                <tr id="inputRowFormsFields_info_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsInfoS5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="forms_fields_info_small5" name="info_small5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#forms_fields_info_small5";
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

                                <tr id="inputRowFormsFields_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="forms_fields_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFormsFieldsRequired == 1 ? 
                                `
                                <tr id="inputRowFormsFields_required" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired") }: 
                                    </td>
                                    <td>
                                        <select id="forms_fields_required" name="required" class="ss-backend-field-dropdown01">
                                            <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired0") }</option>
                                            <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired1") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="forms_fields_required" name="required" value="0" />
                                `
                                }
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>

                    </div>
                    <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                        <button id="forms_fields_include" name="forms_fields_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="forms_fields_id_forms" name="id_forms" value="${ this._idForms }" />

                    <input type="hidden" id="forms_fields_idForms" name="idForms" value="${ this._idForms }" />
                    <input type="hidden" id="forms_fields_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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


    //Usage.
    //----------------------
    /*
    //Define values.
    let fflBackend = new FormsFieldsListing({
        idForms: idForms,
        //pageNumber: pageNumber,
        masterPageSelect: masterPageSelect,

        messageSuccess: messageSuccess,
        messageError: messageError,
        messageAlert: messageAlert,
        nRecords: nRecords
    });


    //Build object data.
    await fflBackend.build();


    //Render data with template.
    res.render(masterPageSelect, {
        templateData: fflBackend,
        additionalData: {}
    });
    */
    //----------------------
};