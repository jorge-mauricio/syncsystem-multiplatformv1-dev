"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class FiltersGenericEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbFiltersGeneric: idTbFiltersGeneric,

                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert
                        }
        */


        //Properties.
        //----------------------
        this._idTbFiltersGeneric = objParameters.idTbFiltersGeneric;
        this._filterIndex = "";
        this._tableName ="";
        
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
        this.ofgdRecord = "";
        this.ofgdRecordParameters = {
            _arrSearchParameters: this.arrSearchParameters,
            _idTbFiltersGeneric: this._idTbFiltersGeneric,
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
            this.arrSearchParameters.push("id;" + this._idTbFiltersGeneric + ";i"); 


            //Build objects.
            this.ofgdRecord = new SyncSystemNS.ObjectFiltersGenericDetails(this.ofgdRecordParameters);
            await this.ofgdRecord.recordDetailsGet(0, 3);
            //console.log("this.offdRecord=", this.offdRecord);


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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitleEdit");
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
            this.metaURLCurrent += this._idTbFiltersGeneric + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitleEdit");

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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitleEdit");
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
        let ofgdRecord = this.ofgdRecord;
        //let objParentTableLevel1 = this.objParentTableLevel1;
        //let objParentTable = this.objParentTable;


        this._filterIndex = ofgdRecord.tblFiltersGenericFilterIndex;
        this._tableName = ofgdRecord.tblFiltersGenericTableName;

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
        //console.log("ofgdRecord=", ofgdRecord);
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
                <form id="formFiltersGenericEdit" name="formFiltersGenericEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formFiltersGenericEdit_method" name="_method" value="PUT">
                    
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
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFiltersGenericTitleTableEdit") } 
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

                                ${ this._filterIndex == "1" ? 
                                `
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backend" + this.filtersGenericLabelModule + "Type") } 
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
                                        <input type="text" id="filtersGeneric_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ ofgdRecord.tblFiltersGenericSortOrder }" />
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
                                        <input type="text" id="inputRowFiltersGeneric_title" name="title" class="ss-backend-field-text01" maxlength="255" value="${ ofgdRecord.tblFiltersGenericTitle }" />
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
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericDescription_edit }</textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericDescription_edit }</textarea>
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
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericDescription_edit }</textarea>
                                            <script>
                                                new FroalaEditor("#filtersGeneric_description");
                                            </script>
                                            ` : ``}


                                            ${ /*TinyMCE*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="filtersGeneric_description" name="description" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericDescription_edit }</textarea>
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
                                        <input type="text" id="filtersGeneric_url_alias" name="url_alias" class="ss-backend-field-text01" value="${ ofgdRecord.tblFiltersGenericURLAlias }" />
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
                                        <textarea id="filtersGeneric_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericKeywordsTags }</textarea>
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
                                        <textarea id="filtersGeneric_meta_description" name="meta_description" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericMetaDescription_edit }</textarea>
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
                                        <input type="text" id="filtersGeneric_meta_title" name="meta_title" class="ss-backend-field-text01" value="${ ofgdRecord.tblFiltersGenericMetaTitle }" />
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
                                            <input type="text" id="filtersGeneric_info_small1" name="info_small1" class="ss-backend-field-text01" value="${ ofgdRecord.tblFiltersGenericInfoSmall1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall1_edit }</textarea>
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
                                            <input type="text" id="filtersGeneric_info_small2" name="info_small2" class="ss-backend-field-text01" value="${ ofgdRecord.tblFiltersGenericInfoSmall2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall2_edit }</textarea>
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
                                            <input type="text" id="filtersGeneric_info_small3" name="info_small3" class="ss-backend-field-text01" value="${ ofgdRecord.tblFiltersGenericInfoSmall3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall3_edit }</textarea>
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
                                            <input type="text" id="filtersGeneric_info_small4" name="info_small4" class="ss-backend-field-text01" value="${ ofgdRecord.tblFiltersGenericInfoSmall4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall4_edit }</textarea>
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
                                            <input type="text" id="filtersGeneric_info_small5" name="info_small5" class="ss-backend-field-text01" value="${ ofgdRecord.tblFiltersGenericInfoSmall5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFiltersGenericInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="filtersGeneric_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericInfoSmall5_edit }</textarea>
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
                                            <input type="text" id="filtersGeneric_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="${ ofgdRecord.tblFiltersGenericNumberSmall1_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS1FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small1" name="number_small1" class="ss-backend-field-currency01" value="${ ofgdRecord.tblFiltersGenericNumberSmall1_print }" maxlength="9" />
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
                                            <input type="text" id="filtersGeneric_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="${ ofgdRecord.tblFiltersGenericNumberSmall2_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS2FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small2" name="number_small2" class="ss-backend-field-currency01" value="${ ofgdRecord.tblFiltersGenericNumberSmall2_print }" maxlength="9" />
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
                                            <input type="text" id="filtersGeneric_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="${ ofgdRecord.tblFiltersGenericNumberSmall3_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS3FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small3" name="number_small3" class="ss-backend-field-currency01" value="${ ofgdRecord.tblFiltersGenericNumberSmall3_print }" maxlength="9" />
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
                                            <input type="text" id="filtersGeneric_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="${ ofgdRecord.tblFiltersGenericNumberSmall4_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS4FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small4" name="number_small4" class="ss-backend-field-currency01" value="${ ofgdRecord.tblFiltersGenericNumberSmall4_print }" maxlength="9" />
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
                                            <input type="text" id="filtersGeneric_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="${ ofgdRecord.tblFiltersGenericNumberSmall5_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("filtersGeneric_number_small5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFiltersGenericNumberS5FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="filtersGeneric_number_small5" name="number_small5" class="ss-backend-field-currency01" value="${ ofgdRecord.tblFiltersGenericNumberSmall5_print }" maxlength="9" />
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="filtersGeneric_image_main" name="image_main" class="ss-backend-field-file-upload" />


                                        ${ ofgdRecord.tblFiltersGenericImageMain != "" && ofgdRecord.tblFiltersGenericImageMain !== undefined && ofgdRecord.tblFiltersGenericImageMain !== null ? 
                                        `
                                        <img id="imgFiltersGenericImageMain" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofgdRecord.tblFiltersGenericImageMain + "?v=" + this.cacheClear }" alt="${ ofgdRecord.tblFiltersGenericOptionName }" class="ss-backend-images-edit" />
                                        <div id="divFiltersGenericImageMainDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ ofgdRecord.tblFiltersGenericID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTableFiltersGeneric }', 
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
                                                                                    htmlGenericStyle01('imgFiltersGenericImageMain', 'display', 'none');
                                                                                    htmlGenericStyle01('divFiltersGenericImageMainDelete', 'display', 'none');

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

                                <tr id="inputRowFiltersGeneric_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="filtersGeneric_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1"${ ofgdRecord.tblFiltersGenericActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ofgdRecord.tblFiltersGenericActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <option value="1"${ ofgdRecord.tblFiltersGenericActivation1 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ofgdRecord.tblFiltersGenericActivation1 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <option value="1"${ ofgdRecord.tblFiltersGenericActivation2 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ofgdRecord.tblFiltersGenericActivation2 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <option value="1"${ ofgdRecord.tblFiltersGenericActivation3 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ofgdRecord.tblFiltersGenericActivation3 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <option value="1"${ ofgdRecord.tblFiltersGenericActivation4== 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ofgdRecord.tblFiltersGenericActivation4 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <option value="1"${ ofgdRecord.tblFiltersGenericActivation5 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ofgdRecord.tblFiltersGenericActivation5 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                        <textarea id="filtersGeneric_notes" name="notes" class="ss-backend-field-text-area01">${ ofgdRecord.tblFiltersGenericNotes_edit }</textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }
                            </tbody>
                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>
    
                        <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                            <button id="content_update" name="content_update" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                            </button>

                            <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                            </a>
                        </div>

                        <input type="hidden" id="filtersGeneric_id" name="id" value="${ ofgdRecord.tblFiltersGenericID }" />
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