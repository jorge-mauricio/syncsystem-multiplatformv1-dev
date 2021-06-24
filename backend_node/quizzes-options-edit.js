"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class QuizzesOptionsEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbQuizzesOptions: idTbQuizzesOptions,

                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert,
                        }
        */


        //Properties.
        //----------------------
        this._idTbQuizzesOptions = objParameters.idTbQuizzesOptions;
        
        this._masterPageSelect = objParameters.masterPageSelect;

        this._messageSuccess = objParameters.messageSuccess;
        this._messageError = objParameters.messageError;
        this._messageAlert = objParameters.messageAlert;
        //this._nRecords = objParameters.nRecords;

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

        this.objParentTableLevel1;
        //this.objParentTableLevel2;
        this.objParentTable;

        this.arrSearchParameters = [];
        this.oqodRecord = "";
        this.oqodRecordParameters = {
            _arrSearchParameters: this.arrSearchParameters,
            _idTbQuizzesOptions: this._idTbQuizzesOptions,
            _terminal: 0,
            _objSpecialParameters: {returnType: 3}
        };
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
            //Parameters build.
            this.arrSearchParameters.push("id;" + this._idTbQuizzesOptions + ";i"); 


            //Build objects.
            this.oqodRecord = new SyncSystemNS.ObjectQuizzesOptionsDetails(this.oqodRecordParameters);
            await this.oqodRecord.recordDetailsGet(0, 3);
            //console.log("this.offdRecord=", this.offdRecord);


            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            //if(this._pageNumber)
            //{
                //this.queryDefault += "&pageNumber=" + this._pageNumber;
            //}


            //Tittle - current.
            //this.titleCurrent = this.offdRecord.tblQuizzesOptionsTitle;
            //TODO: put a generic name.


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleEdit");
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendForms + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbQuizzesOptions + "/";

            //if(this._masterPageSelect !== "")
            //{
                this.metaURLCurrent += "?masterPageSelect=" + this._masterPageSelect;
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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleEdit");

            /*
            if(this.titleCurrent)
            {
                this.cphTitle += " - " + this.titleCurrent;
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleEdit");
            //this.cphTitleCurrent += " - ";
            /*
            if(this.titleCurrent)
            {
                this.cphTitleCurrent += " - " + this.titleCurrent;
            }
            */


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
        //let arrSearchParameters = [];
        //let arrFiltersGenericSearchParameters = [];


        //Redefine values.
        let oqodRecord = this.oqodRecord;
        //let objParentTableLevel1 = this.objParentTableLevel1;
        //let objParentTable = this.objParentTable;


        //Debug.
        //console.log("oqodRecord=", oqodRecord);
        //console.log("oclRecordsParameters=", oclRecordsParameters);
        //----------------------


        //Logic.
        //----------------------
        try
        {
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
                    
                    /*"this.objCategoriesIdParent=" + this.objCategoriesIdParent + "<br />" +*/
                    /*"offdRecord.arrIdsCategoriesFiltersGenericBinding=" + offdRecord.arrIdsCategoriesFiltersGenericBinding + "<br />" +*/
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
                <form id="formQuizzesOptionsEdit" name="formQuizzesOptionsEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formQuizzesOptionsEdit_method" name="_method" value="PUT">

                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>


                        <table id="inputTableQuizzesOptions" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesOptionsTitleTableEdit") } 
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
                                        <input type="text" id="forms_fields_options_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ oqodRecord.tblQuizzesOptionsSortOrder }" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("forms_fields_options_sort_order");
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
                                        <input type="text" id="forms_fields_options_title" name="title" class="ss-backend-field-text01" maxlength="255" value="${ oqodRecord.tblQuizzesOptionsTitle }" />
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
                                            <input type="text" id="quizzesOptions_info1" name="info1" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info1" name="info1" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info1" name="info1" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo1_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info1" name="info1" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info1" name="info1" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo1_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info2" name="info2" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info2" name="info2" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info2" name="info2" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo2_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info2" name="info2" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info2" name="info2" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo2_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info3" name="info3" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info3" name="info3" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info3" name="info3" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo3_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info3" name="info3" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info3" name="info3" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo3_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info4" name="info4" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info4" name="info4" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info4" name="info4" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo4_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info4" name="info4" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info4" name="info4" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo4_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info5" name="info5" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzesOptions_info5" name="info5" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzesOptions_info5" name="info5" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo5_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_info5" name="info5" class="ss-backend-field-text01" value="${ oqodRecord.tblQuizzesOptionsInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="quizzesOptions_info5" name="info5" class="ss-backend-field-text-area01">${ oqodRecord.tblQuizzesOptionsInfo5_edit }</textarea>
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
                                            <input type="text" id="quizzesOptions_number1" name="number1" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber1FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number1" name="number1" class="ss-backend-field-currency01" value="${ oqodRecord.tblQuizzesOptionsNumber1_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number1")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number1" name="number1" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber1_print }" maxlength="34" />
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
                                            <input type="text" id="quizzesOptions_number2" name="number2" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber2FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number2" name="number2" class="ss-backend-field-currency01" value="${ oqodRecord.tblQuizzesOptionsNumber2_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number2" name="number2" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber2_print }" maxlength="34" />
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
                                            <input type="text" id="quizzesOptions_number3" name="number3" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber3FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number3" name="number3" class="ss-backend-field-currency01" value="${ oqodRecord.tblQuizzesOptionsNumber3_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number3" name="number3" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber3_print }" maxlength="34" />
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
                                            <input type="text" id="quizzesOptions_number4" name="number4" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber4FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number4" name="number4" class="ss-backend-field-currency01" value="${ oqodRecord.tblQuizzesOptionsNumber4_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number4" name="number4" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber4_print }" maxlength="34" />
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
                                            <input type="text" id="quizzesOptions_number5" name="number5" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzesOptions_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber5FieldType == 2 || gSystemConfig.configQuizzesOptionsNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzesOptions_number5" name="number5" class="ss-backend-field-currency01" value="${ oqodRecord.tblQuizzesOptionsNumber5_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzesOptions_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzesOptions_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesOptionsNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzesOptions_number5" name="number5" class="ss-backend-field-numeric02" value="${ oqodRecord.tblQuizzesOptionsNumber5_print }" maxlength="34" />
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="quizzesOptions_image_main" name="image_main" class="ss-backend-field-file-upload" />


                                        ${ oqodRecord.tblQuizzesOptionsImageMain != "" && oqodRecord.tblQuizzesOptionsImageMain !== undefined && oqodRecord.tblQuizzesOptionsImageMain !== null ? 
                                        `
                                        <img id="imgQuizzesOptionsImageMain" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + oqodRecord.tblQuizzesOptionsImageMain + "?v=" + this.cacheClear }" alt="${ oqodRecord.tblQuizzesOptionsOptionName }" class="ss-backend-images-edit" />
                                        <div id="divQuizzesOptionsImageMainDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ oqodRecord.tblQuizzesOptionsID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTableQuizzesOptions }', 
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
                                                                                    htmlGenericStyle01('imgQuizzesOptionsImageMain', 'display', 'none');
                                                                                    htmlGenericStyle01('divQuizzesOptionsImageMainDelete', 'display', 'none');

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

                                <tr id="inputRowQuizzesOptions_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="forms_fields_options_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1"${ oqodRecord.tblQuizzesOptionsActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ oqodRecord.tblQuizzesOptionsActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>

                    </div>
                    <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                        <button id="quizzesOptions_update" name="quizzesOptions_update" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>

                    <input type="hidden" id="quizzesOptions_id" name="id" value="${ oqodRecord.tblQuizzesOptionsID }" />
                    <input type="hidden" id="quizzesOptions_id_quizzes" name="id_quizzes" value="${ oqodRecord.tblQuizzesOptionsIdQuizzes }" />

                    <input type="hidden" id="quizzesOptions_idQuizzes" name="idQuizzes" value="${ oqodRecord.tblQuizzesOptionsIdQuizzes }" />
                    <input type="hidden" id="quizzesOptions_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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