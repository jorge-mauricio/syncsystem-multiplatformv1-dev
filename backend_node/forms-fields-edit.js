"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class FormsFieldsEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbFormsFields: idTbFormsFields,

                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert,
                        }
        */


        //Properties.
        //----------------------
        this._idTbFormsFields = objParameters.idTbFormsFields;
        
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

        this.objParentTableLevel1;
        //this.objParentTableLevel2;
        this.objParentTable;

        this.arrSearchParameters = [];
        this.offdRecord = "";
        this.offdRecordParameters = {
            _arrSearchParameters: this.arrSearchParameters,
            _idTbFormsFields: this._idTbFormsFields,
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
            this.arrSearchParameters.push("id;" + this._idTbFormsFields + ";i"); 


            //Build objects.
            this.offdRecord = new SyncSystemNS.ObjectFormsFieldsDetails(this.offdRecordParameters);
            await this.offdRecord.recordDetailsGet(0, 3);
            //console.log("this.offdRecord=", this.offdRecord);


            //Parent ID Records.
            /*
            if(gSystemConfig.enableFormsIdParentEdit == 1)
            {
                //Check table of parent id.
                this.objParentTableLevel1 = await SyncSystemNS.FunctionsDB.tableFindGet(this.offdRecord.tblFormsIdParent);

                //Categories.
                if(this.objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories)
                {
                    this.objParentTable = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                            ["category_type;12;i"], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "", 
                                                                                            "id, title", 
                                                                                            1);
                }


                //Debug.
                //console.log("this.objParentTableLevel1=", this.objParentTableLevel1);
            }
            */


            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            //if(this._pageNumber)
            //{
                //this.queryDefault += "&pageNumber=" + this._pageNumber;
            //}


            //Tittle - current.
            //this.titleCurrent = this.offdRecord.tblFormsFieldsFieldName;
            //TODO: put a generic name.


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleEdit");
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
            this.metaURLCurrent += this._idTbForms + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleEdit");

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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleEdit");
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
        let offdRecord = this.offdRecord;
        let objParentTableLevel1 = this.objParentTableLevel1;
        let objParentTable = this.objParentTable;


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
                <form id="formFormsFieldsEdit" name="formFormsFieldsEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFormsFields + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formFormsFieldsEdit_method" name="_method" value="PUT">

                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug

                        </script>

                        <table id="inputTableFormsFields" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsTitleTableEdit") } 
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
                                        <input type="text" id="forms_fields_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ offdRecord.tblFormsFieldsSortOrder }" />
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
                                        <input type="text" id="forms_fields_field_name" name="field_name" class="ss-backend-field-text01" maxlength="255" value="${ offdRecord.tblFormsFieldsFieldName }" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFormsFieldsInstructions == 1 ? 
                                `
                                <tr id="inputRowFormsFields_field_instructions" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldInstructions") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="forms_fields_field_instructions" name="field_instructions" class="ss-backend-field-text01" value="${ offdRecord.tblFormsFieldsFieldInstructions }" />
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
                                                            <input type="radio" name="field_type" value="1"${ offdRecord.tblFormsFieldsFieldType == 1 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                                            <input type="radio" name="field_type" value="2"${ offdRecord.tblFormsFieldsFieldType == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                                            <input type="radio" name="field_type" value="3"${ offdRecord.tblFormsFieldsFieldType == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                                            <input type="radio" name="field_type" value="4"${ offdRecord.tblFormsFieldsFieldType == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                                            <input type="radio" name="field_type" value="5"${ offdRecord.tblFormsFieldsFieldType == 5 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                                            <input type="radio" name="field_type" value="7"${ offdRecord.tblFormsFieldsFieldType == 7 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                                            <input type="radio" name="field_type" value="8"${ offdRecord.tblFormsFieldsFieldType == 8 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                        <input type="text" id="forms_fields_field_size" name="field_size" class="ss-backend-field-numeric01" maxlength="255" value="${ offdRecord.tblFormsFieldsFieldSize }" />
                                    </td>
                                </tr>

                                <tr id="inputRowFormsFields_field_height" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsFieldHeight") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="forms_fields_field_height" name="field_height" class="ss-backend-field-numeric01" maxlength="255" value="${ offdRecord.tblFormsFieldsFieldHeight }" />
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
                                            <input type="text" id="forms_fields_info_small1" name="info_small1" class="ss-backend-field-text01" value="${ offdRecord.tblFormsFieldsInfoSmall1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall1_edit }</textarea>
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
                                            <input type="text" id="forms_fields_info_small2" name="info_small2" class="ss-backend-field-text01" value="${ offdRecord.tblFormsFieldsInfoSmall2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall2_edit }</textarea>
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
                                            <input type="text" id="forms_fields_info_small3" name="info_small3" class="ss-backend-field-text01" value="${ offdRecord.tblFormsFieldsInfoSmall3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall3_edit }</textarea>
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
                                            <input type="text" id="forms_fields_info_small4" name="info_small4" class="ss-backend-field-text01" value="${ offdRecord.tblFormsFieldsInfoSmall4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall4_edit }</textarea>
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
                                            <input type="text" id="forms_fields_info_small5" name="info_small5" class="ss-backend-field-text01" value="${ offdRecord.tblFormsFieldsInfoSmall5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFormsFieldsInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="forms_fields_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="forms_fields_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ offdRecord.tblFormsFieldsInfoSmall5_edit }</textarea>
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
                                            <option value="1"${ offdRecord.tblFormsFieldsActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ offdRecord.tblFormsFieldsActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <option value="0"${ offdRecord.tblFormsFieldsRequired == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired0") }</option>
                                            <option value="1"${ offdRecord.tblFormsFieldsRequired == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFormsFieldsRequired1") }</option>
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
                        <button id="content_update" name="content_update" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>

                    <input type="hidden" id="formsFields_id" name="id" value="${ offdRecord.tblFormsFieldsID }" />
                    <input type="hidden" id="formsFields_id_forms" name="id_forms" value="${ offdRecord.tblFormsFieldsIdForms }" />

                    <input type="hidden" id="formsFields_idForms" name="idForms" value="${ offdRecord.tblFormsFieldsIdForms }" />
                    <input type="hidden" id="formsFields_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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