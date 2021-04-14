"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class FilesListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idParent: 132,
                            fileType: 1,
                            pageNumber: 0,
                            masterPageSelect: "layout-backend-main",

                            messageSuccess: "",
                            messageError: "",
                            messageAlert: "",
                            nRecords: 0 | null
                        }
        */


        //Properties.
        //----------------------
        this._idParent = objParameters.idParent;
        //this._parentTable = "";
        this._fileType = objParameters.fileType;

        this._pagingNRecords = gSystemConfig.configFilesBackendPaginationNRecords;
        this._pagingTotalRecords = 0;
        this._pagingTotal = 0;
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableFilesBackendPagination == 1)
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

        this.cacheClear = this.dateNow.getTime().toString();
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
            this.queryDefault += "fileType=" + this._fileType;
            this.queryDefault += "&masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Tittle - current.

            //Check which table is parent.
            //this._parentTable = await SyncSystemNS.FunctionsDB.tableFindGet(this._idParent);
            //Debug.
            //console.log("this._parentTable=", this._parentTable);


            if(this._idParent != 0)
            {
                let tblCurrent = await SyncSystemNS.FunctionsDB.tableFindGet(this._idParent);
                
                if(tblCurrent.returnStatus === true) //check for empty (not working)
                //if(!tblCategoryCurrent.length === 0) //check for empty (not working)
                //if(!_.isEmpty(tblCategoryCurrent)) //check for empty (loadash)
                {
                    if(tblCurrent.tableName == gSystemConfig.configSystemDBTableCategories)
                    {
                        this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(tblCurrent.tableData[0].title, "db");
                    }

                    //Degug.
                    //console.log("tblCategoryCurrent (vazio) = ");
                    //console.log(tblCategoryCurrent);
                    //console.log(tblCategoryCurrent.length);
                    //console.log(tblCategoryCurrent.length);
                }
                //Debug.
                //console.log("tblCategoryCurrent = ", tblCategoryCurrent);
                //console.log(tblCategoryCurrent);
            }


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleMain");
            
            //TODO: Check file type and show the equivalent tile name.
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendFiles + "/";
            this.metaURLCurrent += this._idParent + "/";
            this.metaURLCurrent += "?fileType=" + this._fileType;
            //if(this._masterPageSelect !== "")
            //{
                this.metaURLCurrent += "&masterPageSelect=" + this._masterPageSelect;
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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleMain");
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleMain");
            //this.cphTitleCurrent += " - ";

            if(this.titleCurrent)
            {
                this.cphTitleCurrent += " - " + this.titleCurrent;
            }


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
        if(this._fileType)
        {
            arrSearchParameters.push("file_type;" + this._fileType + ";i");
        }
        //arrSearchParameters.push("activation;1;i");


        let oflRecords = "";
        let oflRecordsParameters = {
            _arrSearchParameters: arrSearchParameters,
            _configSortOrder: gSystemConfig.configFilesSort,
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
        


        //Pagination.
        if(gSystemConfig.enableFilesBackendPagination == 1)
        {
            //this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
            this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiles, 
                                                                                        arrSearchParameters, 
                                                                                        gSystemConfig.configFilesSort, 
                                                                                        "", 
                                                                                        "id, id_parent", 
                                                                                        3, 
                                                                                        {});

            this._pagingTotal = Math.ceil(this._pagingTotalRecords / this._pagingNRecords);


            //Parameters build - paging.
            //oclRecordsParameters._strNRecords = this._pagingNRecords;
            oflRecordsParameters._objSpecialParameters._pageNumber = this._pageNumber;
            oflRecordsParameters._objSpecialParameters._pagingNRecords = this._pagingNRecords;
        }


        //Debug.
        //console.log("oclRecordsParameters=", oclRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            oflRecords = new SyncSystemNS.ObjectFilesListing(oflRecordsParameters);
            await oflRecords.recordsListingGet(0, 3);


            //this.cphBody = JSON.stringify(oclRecords);
            //this.cphBody = JSON.stringify(oclRecords.resultsCategoriesListing); //Debug. //working
            //console.log("oclRecords = ", oclRecords);
            //console.log("typeof oclRecords = ", typeof oclRecords);


            //Build HTML (template string).
            //ref: https://wesbos.com/template-strings-html/



            /* */
            backendHTML = `
            <div style="position: relative; display: flex; flex: 1; align-items: stretch; margin: 0px 5px 0px 5px;">
                <div class="ss-backend-layout-column01">
                    ${ /*Form.*/'' }
                    <section class="ss-backend-layout-section-form01" style="margin-top: 0px;">
                        <form id="formFiles" name="formFiles" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles }" enctype="multipart/form-data">
                            <div style="position: relative; display: block; overflow: hidden; margin-top: 2px;">
                                <script>
                                    document.addEventListener('DOMContentLoaded', function() {
                                        inputDataReorder([${ gSystemConfig.configFilesInputOrder.map((arrayRow)=>{
                                                            return `"${ arrayRow }"`}).join(",") 
                                                        }]); //necessary to map the array in order to display as an array inside template literals
                                    }, false);


                                    //Debug.
                                    //alert(document.location);
                                    //alert(window.location.hostname);
                                    //alert(window.location.host);
                                    //alert(window.location.origin);
                                </script>
                                <table id="input_table_files" class="ss-backend-table-input01">
                                    <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleTable") } 
                                    </caption>
                                    <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                        
                                    </thead>
            
                                    <tbody class="ss-backend-table-listing-text01">
                                        ${ gSystemConfig.enableFilesIdParentEdit == 1 ? 
                                        `
                                        <!--tr id="inputRowFiles_id_parent" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                            </td>
                                            <td>
                                                <select id="files_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                                    <option value="1" selected="true">xxx</option>
                                                    <option value="2">yyy</option>
                                                </select>
                                            </td>
                                        </tr-->
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesSortOrder == 1 ? 
                                        `
                                        <tr id="inputRowFiles_sort_order" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                            </td>
                                            <td>
                                                <input type="text" id="files_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                                <script>
                                                    Inputmask(inputmaskGenericBackendConfigOptions).mask("files_sort_order");
                                                </script>
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ /*File config (depending on the file type).*/'' }
                                        ${ this._fileType == 1 ? 
                                        `
                                        <input type="hidden" id="files_file_config" name="file_config" value="1" />
                                        ` : ``
                                        }

                                        ${ this._fileType == 2 ? 
                                        `
                                        <tr id="inputRowFiles_file_config" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay") }: 
                                            </td>
                                            <td>
                                                <label class="ss-backend-field-radio-label">
                                                    <input type="radio" name="file_config" value="1" checked class="ss-backend-field-radio" />
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay1") }
                                                </label>
                                                <label class="ss-backend-field-radio-label">
                                                    <input type="radio" name="file_config" value="2" class="ss-backend-field-radio" />
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay2") }
                                                </label>
                                                <label class="ss-backend-field-radio-label">
                                                    <input type="radio" name="file_config" value="3" class="ss-backend-field-radio" />
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay3") }
                                                </label>
                                                <label class="ss-backend-field-radio-label">
                                                    <input type="radio" name="file_config" value="4" class="ss-backend-field-radio" />
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay4") }
                                                </label>
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ this._fileType == 3 ? 
                                        `
                                        <tr id="inputRowFiles_file_config" class="ss-backend-table-bg-light">
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
                                        ` : ``
                                        }

                                        ${ this._fileType == 4 ? 
                                        `
                                        <input type="hidden" id="files_file_config" name="file_config" value="3" />
                                        ` : ``
                                        }

                                        ${ /*File Duration.*/'' }
                                        ${ this._fileType == 2 ? 
                                        `
                                        <tr id="inputRowFiles_duration" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFileDuration") }: 
                                            </td>
                                            <td>
                                                <input type="text" id="files_file_duration_min" name="file_duration_min" class="ss-backend-field-text02" maxlength="255" value="0" style="width: 40px;" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMinutesA") }
                                                <input type="text" id="files_file_duration_sec" name="file_duration_sec" class="ss-backend-field-text02" maxlength="255" value="0" style="width: 40px;" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSecondsA") }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ /*File Dimensions.*/'' }
                                        ${ this._fileType == 5 ? 
                                        `
                                        <tr id="inputRowFiles_duration" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFileDimensions") }: 
                                            </td>
                                            <td>
                                                <input type="text" id="files_file_dimensions_w" name="file_file_dimensions_w" class="ss-backend-field-text02" maxlength="255" value="0" style="width: 40px;" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDimensionsW") } 
                                                (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemPixels") })
                                                <input type="text" id="files_file_dimensions_h" name="file_file_dimensions_h" class="ss-backend-field-text02" maxlength="255" value="0" style="width: 40px;" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDimensionsH") } 
                                                (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemPixels") })
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesTitle == 1 ? 
                                        `
                                        <tr id="inputRowFiles_title" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitle") }: 
                                            </td>
                                            <td>
                                                <input type="text" id="files_title" name="title" class="ss-backend-field-text01" maxlength="255" value="" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        <tr id="inputRowFiles_caption" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesCaption") }: 
                                            </td>
                                            <td>
                                                <input type="text" id="files_caption" name="caption" class="ss-backend-field-text01" maxlength="255" value="" />
                                            </td>
                                        </tr>

                                        ${ gSystemConfig.enableFilesDescription == 1 ? 
                                        `
                                        <tr id="inputRowFiles_description" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesDescription") }: 
                                            </td>
                                            <td>
                                                ${ /*No formatting*/'' }
                                                ${ gSystemConfig.configBackendTextBox == 1 ? `
                                                    <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                ` : ``}


                                                ${ /*Quill*/'' }
                                                ${ gSystemConfig.configBackendTextBox == 13 ? `
                                                    <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
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
                                                    <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    <script>
                                                        new FroalaEditor("#files_description");
                                                    </script>
                                                ` : ``}


                                                ${ /*TinyMCE*/'' }
                                                ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                                    <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    <script>
                                                        /*
                                                        tinymce.init({
                                                            selector: "#files_description",
                                                        });
                                                        */ /*working*/

                                                        tinyMCEBackendConfig.selector = "#files_description";
                                                        tinymce.init(tinyMCEBackendConfig);
                                                    </script>
                                                ` : ``}
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesHTMLCode == 1 ? 
                                        `
                                        <tr id="inputRowFiles_html_code" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesHTMLCode") }: 
                                            </td>
                                            <td>
                                                <textarea id="files_html_code" name="html_code" class="ss-backend-field-text-area-html ss-backend-field-text-area-html-column"></textarea>
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.configFilesURLAlias == 1 ? 
                                        `
                                        <tr id="inputRowFiles_url_alias" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                            </td>
                                            <td>
                                                <input type="text" id="files_url_alias" name="url_alias" class="ss-backend-field-text01 ss-backend-field-text-area-html-column" value="" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesKeywordsTags == 1 ? 
                                        `
                                        <tr id="inputRowFiles_keywords_tags" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                            </td>
                                            <td>
                                                <textarea id="files_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                <div>
                                                    (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywordsInstruction01") })
                                                </div>
                                            </td>
                                        </tr>
                                        ` : ``
                                        }
            
                                        ${ gSystemConfig.enableFilesMetaDescription == 1 ? 
                                        `
                                        <tr id="inputRowFiles_meta_description" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                            </td>
                                            <td>
                                                <textarea id="files_meta_description" name="meta_description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesInfo1 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info1" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfo1") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfo1FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info1" name="info1" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfo1FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info1" name="info1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info1" name="info1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info1";
                                                            tinymce.init(tinyMCEBackendConfig);
                                                        </script>
                                                    ` : ``
                                                    }
                                                ` : ``
                                                }

                                                ${ /*Single line (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo1FieldType == 11 ? 
                                                `
                                                    <input type="text" id="files_info1" name="info1" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo1FieldType == 12 ? 
                                                `
                                                    <textarea id="files_info1" name="info1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesInfo2 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info2" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfo2") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfo2FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info2" name="info2" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfo2FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info2" name="info2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info2" name="info2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info2";
                                                            tinymce.init(tinyMCEBackendConfig);
                                                        </script>
                                                    ` : ``
                                                    }
                                                ` : ``
                                                }

                                                ${ /*Single line (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo2FieldType == 11 ? 
                                                `
                                                    <input type="text" id="files_info2" name="info2" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo2FieldType == 12 ? 
                                                `
                                                    <textarea id="files_info2" name="info2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesInfo3 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info3" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfo3") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfo3FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info3" name="info3" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfo3FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info3" name="info3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info3" name="info3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info3";
                                                            tinymce.init(tinyMCEBackendConfig);
                                                        </script>
                                                    ` : ``
                                                    }
                                                ` : ``
                                                }

                                                ${ /*Single line (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo3FieldType == 11 ? 
                                                `
                                                    <input type="text" id="files_info3" name="info3" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo3FieldType == 12 ? 
                                                `
                                                    <textarea id="files_info3" name="info3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesInfo4 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info4" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfo4") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfo4FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info4" name="info4" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfo4FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info4" name="info4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info4" name="info4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info4";
                                                            tinymce.init(tinyMCEBackendConfig);
                                                        </script>
                                                    ` : ``
                                                    }
                                                ` : ``
                                                }

                                                ${ /*Single line (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo4FieldType == 11 ? 
                                                `
                                                    <input type="text" id="files_info4" name="info4" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo4FieldType == 12 ? 
                                                `
                                                    <textarea id="files_info4" name="info4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesInfo5 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info5" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfo5") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfo5FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info5" name="info5" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfo5FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info5" name="info5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info5" name="info5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info5";
                                                            tinymce.init(tinyMCEBackendConfig);
                                                        </script>
                                                    ` : ``
                                                    }
                                                ` : ``
                                                }

                                                ${ /*Single line (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo5FieldType == 11 ? 
                                                `
                                                    <input type="text" id="files_info5" name="info5" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline (encrypted).*/'' }
                                                ${ gSystemConfig.configFilesInfo5FieldType == 12 ? 
                                                `
                                                    <textarea id="files_info5" name="info5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesInfoS1 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info_small1" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfoS1") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfoS1FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info_small1" name="info_small1" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfoS1FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info_small1" name="info_small1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info_small1" name="info_small1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info_small1";
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

                                        ${ gSystemConfig.enableFilesInfoS2 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info_small2" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfoS2") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfoS2FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info_small2" name="info_small2" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfoS2FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info_small2" name="info_small2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info_small2" name="info_small2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info_small2";
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

                                        ${ gSystemConfig.enableFilesInfoS3 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info_small3" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfoS3") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfoS3FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info_small3" name="info_small3" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfoS3FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info_small3" name="info_small3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info_small3" name="info_small3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info_small3";
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

                                        ${ gSystemConfig.enableFilesInfoS4 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info_small4" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfoS4") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfoS4FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info_small4" name="info_small4" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfoS4FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info_small4" name="info_small4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info_small4" name="info_small4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info_small4";
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

                                        ${ gSystemConfig.enableFilesInfoS5 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_info_small5" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesInfoS5") }: 
                                            </td>
                                            <td>
                                                ${ /*Single line.*/'' }
                                                ${ gSystemConfig.configFilesInfoS5FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_info_small5" name="info_small5" class="ss-backend-field-text01" value="" />
                                                ` : ``
                                                }

                                                ${ /*Multiline.*/'' }
                                                ${ gSystemConfig.configFilesInfoS5FieldType == 2 ? 
                                                `
                                                    ${ /*No formatting.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 1 ? 
                                                    `
                                                        <textarea id="files_info_small5" name="info_small5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                    ` : ``
                                                    }

                                                    ${ /*TinyMCE.*/'' }
                                                    ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                                    `
                                                        <textarea id="files_info_small5" name="info_small5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                                        <script>
                                                            tinyMCEBackendConfig.selector = "#files_info_small5";
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

                                        ${ gSystemConfig.enableFilesNumber1 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number1" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumber1") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumber1FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number1");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumber1FieldType == 2 || gSystemConfig.configFilesNumber1FieldType == 4 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number1" name="number1" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                                    
                                                    ${ /*Inputmask("9", { repeat: 10 }).mask("files_number1")*/'' }
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number1");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*Decimal.*/'' }
                                                ${ gSystemConfig.configFilesNumber1FieldType == 3 ? 
                                                `
                                                    <input type="text" id="files_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskDecimalBackendConfigOptions).mask("files_number1");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumber2 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number2" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumber2") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumber2FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number2");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumber2FieldType == 2 || gSystemConfig.configFilesNumber2FieldType == 4 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number2" name="number2" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                                    
                                                    ${ /*Inputmask("9", { repeat: 10 }).mask("files_number2")*/'' }
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number2");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*Decimal.*/'' }
                                                ${ gSystemConfig.configFilesNumber2FieldType == 3 ? 
                                                `
                                                    <input type="text" id="files_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskDecimalBackendConfigOptions).mask("files_number2");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumber3 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number3" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumber3") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumber3FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number3");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumber3FieldType == 2 || gSystemConfig.configFilesNumber3FieldType == 4 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number3" name="number3" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                                    
                                                    ${ /*Inputmask("9", { repeat: 10 }).mask("files_number3")*/'' }
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number3");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*Decimal.*/'' }
                                                ${ gSystemConfig.configFilesNumber3FieldType == 3 ? 
                                                `
                                                    <input type="text" id="files_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskDecimalBackendConfigOptions).mask("files_number3");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumber4 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number4" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumber4") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumber4FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number4");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumber4FieldType == 2 || gSystemConfig.configFilesNumber4FieldType == 4 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number4" name="number4" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                                    
                                                    ${ /*Inputmask("9", { repeat: 10 }).mask("files_number4")*/'' }
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number4");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*Decimal.*/'' }
                                                ${ gSystemConfig.configFilesNumber4FieldType == 3 ? 
                                                `
                                                    <input type="text" id="files_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskDecimalBackendConfigOptions).mask("files_number4");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumber5 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number5" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumber5") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumber5FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number5");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumber5FieldType == 2 || gSystemConfig.configFilesNumber5FieldType == 4 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number5" name="number5" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                                    
                                                    ${ /*Inputmask("9", { repeat: 10 }).mask("files_number5")*/'' }
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number5");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*Decimal.*/'' }
                                                ${ gSystemConfig.configFilesNumber5FieldType == 3 ? 
                                                `
                                                    <input type="text" id="files_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                                    <script>
                                                        Inputmask(inputmaskDecimalBackendConfigOptions).mask("files_number5");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumberS1 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number_small1" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumberS1") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumberS1FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small1");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumberS1FieldType == 2 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number_small1" name="number_small1" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number_small1");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumberS2 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number_small2" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumberS2") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumberS2FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small2");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumberS2FieldType == 2 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number_small2" name="number_small2" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number_small2");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumberS3 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number_small3" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumberS3") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumberS3FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small3");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumberS3FieldType == 2 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number_small3" name="number_small3" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number_small3");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumberS4 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number_small4" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumberS4") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumberS4FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small4");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumberS4FieldType == 2 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number_small4" name="number_small4" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number_small4");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNumberS5 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_number_small5" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesNumberS5") }: 
                                            </td>
                                            <td>
                                                ${ /*General number.*/'' }
                                                ${ gSystemConfig.configFilesNumberS5FieldType == 1 ? 
                                                `
                                                    <input type="text" id="files_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small5");
                                                    </script>
                                                ` : ``
                                                }

                                                ${ /*System currency.*/'' }
                                                ${ gSystemConfig.configFilesNumberS5FieldType == 2 ? 
                                                `
                                                    ${ gSystemConfig.configSystemCurrency }
                                                    <input type="text" id="files_number_small5" name="number_small5" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                                    <script>
                                                        Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number_small5");
                                                    </script>
                                                ` : ``
                                                }
                                            </td>
                                        </tr>
                                        ` : ``
                                        }
                                        
                                        ${ gSystemConfig.enableFilesDate1 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_date1" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesDate1") }: 
                                                </td>
                                                <td>

                                                ${ /*Dropdown menu.*/'' }
                                                ${ gSystemConfig.configFilesDate1FieldType == 2 ? 
                                                    `
                                                    ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                        `
                                                            ${  /*Debug.*/
                                                                /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                                ''
                                                                /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                            }
                                                            <select id="files_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                        ` : `
                                                            <select id="files_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
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
                                                ${ gSystemConfig.configFilesDate1FieldType == 11 ? 
                                                    `
                                                    <input type="text" id="files_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="" />
                                                    <script>
                                                        const dpDate1 = datepicker("#files_date1", 
                                                            ${ /*Generic date.*/'' }
                                                            ${ gSystemConfig.configFilesDate1Type == 1 || gSystemConfig.configFilesDate1Type == 2 | gSystemConfig.configFilesDate1Type == 3 ? 
                                                                `
                                                                jsDatepickerGenericBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Birth date.*/'' }
                                                            ${ gSystemConfig.configFilesDate1Type == 4 ? 
                                                                `
                                                                jsDatepickerBirthBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Task date.*/'' }
                                                            ${ gSystemConfig.configFilesDate1Type == 5 || gSystemConfig.configFilesDate1Type == 55 ? 
                                                                `
                                                                jsDatepickerTaskBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*History date.*/'' }
                                                            ${ gSystemConfig.configFilesDate1Type == 6 || gSystemConfig.configFilesDate1Type == 66 ? 
                                                                `
                                                                jsDatepickerHistoryBackendConfigOptions
                                                                ` : ``
                                                            }
                                                        );
                                                    </script>
                                                    ` : ``
                                                }

                                                ${ /*Complete and Semi-complete date.*/'' }
                                                ${ gSystemConfig.configFilesDate1Type == 2 || gSystemConfig.configFilesDate1Type == 3 || gSystemConfig.configFilesDate1Type == 55 || gSystemConfig.configFilesDate1Type == 66 ? 
                                                    `
                                                    - 
                                                    <select id="files_date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    :
                                                    <select id="files_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    ${ gSystemConfig.configFilesDate1Type == 2 ? 
                                                        `
                                                        :
                                                        <select id="files_date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                            ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                                return `
                                                                    <option value="${ arrayRow }"
                                                                        ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                                    >${ arrayRow }</option>
                                                                `}).join(",") }
                                                        </select>
                                                        ` : ``
                                                    }
                                                    ` : ``
                                                }
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesDate2 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_date2" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesDate2") }: 
                                                </td>
                                                <td>

                                                ${ /*Dropdown menu.*/'' }
                                                ${ gSystemConfig.configFilesDate2FieldType == 2 ? 
                                                    `
                                                    ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                        `
                                                            <select id="files_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                        ` : `
                                                            <select id="files_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
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
                                                ${ gSystemConfig.configFilesDate2FieldType == 11 ? 
                                                    `
                                                    <input type="text" id="files_date2" name="date2" class="ss-backend-field-date01" autocomplete="off" value="" />
                                                    <script>
                                                        const dpDate2 = datepicker("#files_date2", 
                                                            ${ /*Generic date.*/'' }
                                                            ${ gSystemConfig.configFilesDate2Type == 1 || gSystemConfig.configFilesDate2Type == 2 | gSystemConfig.configFilesDate2Type == 3 ? 
                                                                `
                                                                jsDatepickerGenericBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Birth date.*/'' }
                                                            ${ gSystemConfig.configFilesDate2Type == 4 ? 
                                                                `
                                                                jsDatepickerBirthBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Task date.*/'' }
                                                            ${ gSystemConfig.configFilesDate2Type == 5 || gSystemConfig.configFilesDate2Type == 55 ? 
                                                                `
                                                                jsDatepickerTaskBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*History date.*/'' }
                                                            ${ gSystemConfig.configFilesDate2Type == 6 || gSystemConfig.configFilesDate2Type == 66 ? 
                                                                `
                                                                jsDatepickerHistoryBackendConfigOptions
                                                                ` : ``
                                                            }
                                                        );
                                                    </script>
                                                    ` : ``
                                                }

                                                ${ /*Complete and Semi-complete date.*/'' }
                                                ${ gSystemConfig.configFilesDate2Type == 2 || gSystemConfig.configFilesDate2Type == 3 || gSystemConfig.configFilesDate2Type == 55 || gSystemConfig.configFilesDate2Type == 66 ? 
                                                    `
                                                    - 
                                                    <select id="files_date2_hour" name="date2_hour" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    :
                                                    <select id="files_date2_minute" name="date2_minute" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    ${ gSystemConfig.configFilesDate2Type == 2 ? 
                                                        `
                                                        :
                                                        <select id="files_date2_seconds" name="date2_seconds" class="ss-backend-field-dropdown01">
                                                            ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                                return `
                                                                    <option value="${ arrayRow }"
                                                                        ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                                    >${ arrayRow }</option>
                                                                `}).join(",") }
                                                        </select>
                                                        ` : ``
                                                    }
                                                    ` : ``
                                                }
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesDate3 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_date3" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesDate3") }: 
                                                </td>
                                                <td>

                                                ${ /*Dropdown menu.*/'' }
                                                ${ gSystemConfig.configFilesDate3FieldType == 2 ? 
                                                    `
                                                    ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                        `
                                                            <select id="files_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                        ` : `
                                                            <select id="files_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
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
                                                ${ gSystemConfig.configFilesDate3FieldType == 11 ? 
                                                    `
                                                    <input type="text" id="files_date3" name="date3" class="ss-backend-field-date01" autocomplete="off" value="" />
                                                    <script>
                                                        const dpDate3 = datepicker("#files_date3", 
                                                            ${ /*Generic date.*/'' }
                                                            ${ gSystemConfig.configFilesDate3Type == 1 || gSystemConfig.configFilesDate3Type == 2 | gSystemConfig.configFilesDate3Type == 3 ? 
                                                                `
                                                                jsDatepickerGenericBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Birth date.*/'' }
                                                            ${ gSystemConfig.configFilesDate3Type == 4 ? 
                                                                `
                                                                jsDatepickerBirthBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Task date.*/'' }
                                                            ${ gSystemConfig.configFilesDate3Type == 5 || gSystemConfig.configFilesDate3Type == 55 ? 
                                                                `
                                                                jsDatepickerTaskBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*History date.*/'' }
                                                            ${ gSystemConfig.configFilesDate3Type == 6 || gSystemConfig.configFilesDate3Type == 66 ? 
                                                                `
                                                                jsDatepickerHistoryBackendConfigOptions
                                                                ` : ``
                                                            }
                                                        );
                                                    </script>
                                                    ` : ``
                                                }

                                                ${ /*Complete and Semi-complete date.*/'' }
                                                ${ gSystemConfig.configFilesDate3Type == 2 || gSystemConfig.configFilesDate3Type == 3 || gSystemConfig.configFilesDate3Type == 55 || gSystemConfig.configFilesDate3Type == 66 ? 
                                                    `
                                                    - 
                                                    <select id="files_date3_hour" name="date3_hour" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    :
                                                    <select id="files_date3_minute" name="date3_minute" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    ${ gSystemConfig.configFilesDate3Type == 2 ? 
                                                        `
                                                        :
                                                        <select id="files_date3_seconds" name="date3_seconds" class="ss-backend-field-dropdown01">
                                                            ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                                return `
                                                                    <option value="${ arrayRow }"
                                                                        ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                                    >${ arrayRow }</option>
                                                                `}).join(",") }
                                                        </select>
                                                        ` : ``
                                                    }
                                                    ` : ``
                                                }
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesDate4 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_date4" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesDate4") }: 
                                                </td>
                                                <td>

                                                ${ /*Dropdown menu.*/'' }
                                                ${ gSystemConfig.configFilesDate4FieldType == 2 ? 
                                                    `
                                                    ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                        `
                                                            <select id="files_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                        ` : `
                                                            <select id="files_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
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
                                                ${ gSystemConfig.configFilesDate4FieldType == 11 ? 
                                                    `
                                                    <input type="text" id="files_date4" name="date4" class="ss-backend-field-date01" autocomplete="off" value="" />
                                                    <script>
                                                        const dpDate4 = datepicker("#files_date4", 
                                                            ${ /*Generic date.*/'' }
                                                            ${ gSystemConfig.configFilesDate4Type == 1 || gSystemConfig.configFilesDate4Type == 2 | gSystemConfig.configFilesDate4Type == 3 ? 
                                                                `
                                                                jsDatepickerGenericBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Birth date.*/'' }
                                                            ${ gSystemConfig.configFilesDate4Type == 4 ? 
                                                                `
                                                                jsDatepickerBirthBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Task date.*/'' }
                                                            ${ gSystemConfig.configFilesDate4Type == 5 || gSystemConfig.configFilesDate4Type == 55 ? 
                                                                `
                                                                jsDatepickerTaskBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*History date.*/'' }
                                                            ${ gSystemConfig.configFilesDate4Type == 6 || gSystemConfig.configFilesDate4Type == 66 ? 
                                                                `
                                                                jsDatepickerHistoryBackendConfigOptions
                                                                ` : ``
                                                            }
                                                        );
                                                    </script>
                                                    ` : ``
                                                }

                                                ${ /*Complete and Semi-complete date.*/'' }
                                                ${ gSystemConfig.configFilesDate4Type == 2 || gSystemConfig.configFilesDate4Type == 3 || gSystemConfig.configFilesDate4Type == 55 || gSystemConfig.configFilesDate4Type == 66 ? 
                                                    `
                                                    - 
                                                    <select id="files_date4_hour" name="date4_hour" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    :
                                                    <select id="files_date4_minute" name="date4_minute" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    ${ gSystemConfig.configFilesDate4Type == 2 ? 
                                                        `
                                                        :
                                                        <select id="files_date4_seconds" name="date4_seconds" class="ss-backend-field-dropdown01">
                                                            ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                                return `
                                                                    <option value="${ arrayRow }"
                                                                        ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                                    >${ arrayRow }</option>
                                                                `}).join(",") }
                                                        </select>
                                                        ` : ``
                                                    }
                                                    ` : ``
                                                }
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesDate5 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_date5" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesDate5") }: 
                                                </td>
                                                <td>

                                                ${ /*Dropdown menu.*/'' }
                                                ${ gSystemConfig.configFilesDate5FieldType == 2 ? 
                                                    `
                                                    ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                        `
                                                            <select id="files_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                        ` : `
                                                            <select id="files_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                                    return `
                                                                        <option value="${ arrayRow }"
                                                                            ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                        >${ arrayRow }</option>
                                                                    `}).join(",") }
                                                            </select>
                                                            /
                                                            <select id="files_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
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
                                                ${ gSystemConfig.configFilesDate5FieldType == 11 ? 
                                                    `
                                                    <input type="text" id="files_date5" name="date5" class="ss-backend-field-date01" autocomplete="off" value="" />
                                                    <script>
                                                        const dpDate5 = datepicker("#files_date5", 
                                                            ${ /*Generic date.*/'' }
                                                            ${ gSystemConfig.configFilesDate5Type == 1 || gSystemConfig.configFilesDate5Type == 2 | gSystemConfig.configFilesDate5Type == 3 ? 
                                                                `
                                                                jsDatepickerGenericBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Birth date.*/'' }
                                                            ${ gSystemConfig.configFilesDate5Type == 4 ? 
                                                                `
                                                                jsDatepickerBirthBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*Task date.*/'' }
                                                            ${ gSystemConfig.configFilesDate5Type == 5 || gSystemConfig.configFilesDate5Type == 55 ? 
                                                                `
                                                                jsDatepickerTaskBackendConfigOptions
                                                                ` : ``
                                                            }

                                                            ${ /*History date.*/'' }
                                                            ${ gSystemConfig.configFilesDate5Type == 6 || gSystemConfig.configFilesDate5Type == 66 ? 
                                                                `
                                                                jsDatepickerHistoryBackendConfigOptions
                                                                ` : ``
                                                            }
                                                        );
                                                    </script>
                                                    ` : ``
                                                }

                                                ${ /*Complete and Semi-complete date.*/'' }
                                                ${ gSystemConfig.configFilesDate5Type == 2 || gSystemConfig.configFilesDate5Type == 3 || gSystemConfig.configFilesDate5Type == 55 || gSystemConfig.configFilesDate5Type == 66 ? 
                                                    `
                                                    - 
                                                    <select id="files_date5_hour" name="date5_hour" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    :
                                                    <select id="files_date5_minute" name="date5_minute" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    ${ gSystemConfig.configFilesDate5Type == 2 ? 
                                                        `
                                                        :
                                                        <select id="files_date5_seconds" name="date5_seconds" class="ss-backend-field-dropdown01">
                                                            ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                                return `
                                                                    <option value="${ arrayRow }"
                                                                        ${ this.dateNowSecond == arrayRow ? ' selected' : ``}
                                                                    >${ arrayRow }</option>
                                                                `}).join(",") }
                                                        </select>
                                                        ` : ``
                                                    }
                                                    ` : ``
                                                }
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        <tr id="inputRowFiles_file" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                            </td>
                                            <td>
                                                <input type="file" id="files_file" name="file" class="ss-backend-field-file-upload" />
                                            </td>
                                        </tr>

                                        ${ gSystemConfig.enableFilesThumbnails == 1 ? 
                                        `
                                        <tr id="inputRowFiles_file_thumbnail" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFileThumbnail") }: 
                                            </td>
                                            <td>
                                                <input type="file" id="files_file_thumbnail" name="file_thumbnail" class="ss-backend-field-file-upload" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesFile1 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_file1" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFile1") }: 
                                            </td>
                                            <td>
                                                <input type="file" id="files_file1" name="file1" class="ss-backend-field-file-upload" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesFile2 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_file2" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFile2") }: 
                                            </td>
                                            <td>
                                                <input type="file" id="files_file2" name="file2" class="ss-backend-field-file-upload" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesFile3 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_file3" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFile3") }: 
                                            </td>
                                            <td>
                                                <input type="file" id="files_file3" name="file3" class="ss-backend-field-file-upload" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesFile4 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_file4" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFile4") }: 
                                            </td>
                                            <td>
                                                <input type="file" id="files_file4" name="file4" class="ss-backend-field-file-upload" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesFile5 == 1 ? 
                                        `
                                        <tr id="inputRowFiles_file5" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFile5") }: 
                                            </td>
                                            <td>
                                                <input type="file" id="files_file5" name="file5" class="ss-backend-field-file-upload" />
                                            </td>
                                        </tr>
                                        ` : ``
                                        }

                                        <tr id="inputRowFiles_activation" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                            </td>
                                            <td>
                                                <select id="files_activation" name="activation" class="ss-backend-field-dropdown01">
                                                    <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                    <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                                </select>
                                            </td>
                                        </tr>

                                        ${ gSystemConfig.enableFilesActivation1 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_activation1" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation1") }: 
                                                </td>
                                                <td>
                                                    <select id="files_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                        <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                        <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesActivation2 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_activation2" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation2") }: 
                                                </td>
                                                <td>
                                                    <select id="files_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                        <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                        <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesActivation3 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_activation3" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation3") }: 
                                                </td>
                                                <td>
                                                    <select id="files_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                        <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                        <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesActivation4 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_activation4" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation4") }: 
                                                </td>
                                                <td>
                                                    <select id="files_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                        <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                        <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesActivation5 == 1 ? 
                                            `
                                            <tr id="inputRowFiles_activation5" class="ss-backend-table-bg-light">
                                                <td class="ss-backend-table-bg-medium">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation5") }: 
                                                </td>
                                                <td>
                                                    <select id="files_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                        <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                        <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableFilesNotes == 1 ? 
                                        `
                                        <tr id="inputRowFiles_notes" class="ss-backend-table-bg-light">
                                            <td class="ss-backend-table-bg-medium">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                            </td>
                                            <td>
                                                <textarea id="files_notes" name="notes" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column"></textarea>
                                            </td>
                                        </tr>
                                        ` : ``
                                        }
                                    </tbody>

                                    <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                                    </tfoot>
                                </table>
                            </div>
                            <div style="position: relative; display: block; overflow: hidden; margin-top: 2px;">
                                <button id="files_include" name="files_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                                </button>
                            </div>

                            <input type="hidden" id="files_id_parent" name="id_parent" value="${ this._idParent }" />
                            <input type="hidden" id="files_file_type" name="file_type" value="${ this._fileType }" />

                            <input type="hidden" id="files_idParent" name="idParent" value="${ this._idParent }" />
                            <input type="hidden" id="files_fileType" name="fileType" value="${ this._fileType }" />
                            <input type="hidden" id="files_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                            <input type="hidden" id="files_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                        </form>
                    </section>
                </div>
                <div class="ss-backend-layout-column02">
                    <section class="ss-backend-layout-section-data01">
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
                        ${oflRecords.resultsFilesListing == "" ? `
                            <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                            </div>
                        ` : `
                            <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px; margin-top: 2px;">
                                <button 
                                    id="files_delete" 
                                    name="files_delete" 
                                    onclick="elementMessage01('formFilesListing_method', 'DELETE');
                                            formSubmit('formFilesListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                            " 
                                    class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                                    style="float: right;">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                                </button>
                            </div>
                        
                            <form id="formFilesListing" name="formFilesListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                                <input type="hidden" id="formFilesListing_method" name="_method" value="">

                                <input type="hidden" id="formFilesListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableFiles }" />
                                
                                <input type="hidden" id="formFilesListing_idParent" name="idParent" value="${ this._idParent }" />
                                <input type="hidden" id="formFilesListing_fileType" name="fileType" value="${ this._fileType }" />
                                
                                <input type="hidden" id="formFilesListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles }" />
                                <input type="hidden" id="formFilesListing_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                                <input type="hidden" id="formFilesListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                                <div style="position: relative; display: block; overflow: hidden;">
                                    <table class="ss-backend-table-listing01">
                                        <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleMain") }
                                        </caption>
                                        <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                            <tr>
                                                <td style="width: 40px; text-align: left;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                                </td>
                                                <td style="text-align: center;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }  
                                                </td>
                                                
                                                <td style="width: 100px; text-align: center;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                                </td>

                                                <td style="width: 40px; text-align: center;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivationA") }  
                                                </td>
                                                ${ gSystemConfig.enableFilesActivation1 == 1 ? 
                                                    `
                                                    <td style="width: 40px; text-align: center;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation1") }  
                                                    </td>
                                                    ` : ``
                                                }
                                                ${ gSystemConfig.enableFilesActivation2 == 1 ? 
                                                    `
                                                    <td style="width: 40px; text-align: center;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation2") }  
                                                    </td>
                                                    ` : ``
                                                }
                                                ${ gSystemConfig.enableFilesActivation3 == 1 ? 
                                                    `
                                                    <td style="width: 40px; text-align: center;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation3") }  
                                                    </td>
                                                    ` : ``
                                                }
                                                ${ gSystemConfig.enableFilesActivation4 == 1 ? 
                                                    `
                                                    <td style="width: 40px; text-align: center;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation4") }  
                                                    </td>
                                                    ` : ``
                                                }
                                                ${ gSystemConfig.enableFilesActivation5 == 1 ? 
                                                    `
                                                    <td style="width: 40px; text-align: center;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation5") }  
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
                                        ${ oflRecords.resultsFilesListing.map((filesRow)=>{
                                            return `
                                                <tr class="ss-backend-table-bg-light">
                                                    <td style="text-align: center;">
                                                        ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(filesRow.sort_order, "", 3, null) } 
                                                    </td>
                                                    <td style="text-align: center;">
                                                        ${ /*Images.*/'' }
                                                        ${ /*----------------------*/'' }
                                                        ${ filesRow.file_type == 1 ? 
                                                        `
                                                            ${ filesRow.file !== "" ? 
                                                            `
                                                                ${ /*No pop-up.*/'' }
                                                                ${ gSystemConfig.configImagePopup == 0 ? 
                                                                `
                                                                    <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }" class="ss-backend-images-listing" style="width: auto;" />
                                                                ` : ``
                                                                }

                                                                ${ /*GLightbox.*/'' }
                                                                ${ gSystemConfig.configImagePopup == 4 ? 
                                                                `
                                                                    <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + filesRow.file + "?v=" + this.cacheClear }"
                                                                        title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.title, "db") }"
                                                                        class="glightbox_files_file${ filesRow.id }"
                                                                        data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") };">
                                                                        
                                                                        <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }" class="ss-backend-images-listing" style="width: auto;" />
                                                                    </a>
                                                                    <script>
                                                                        gLightboxBackendConfigOptions.selector = "glightbox_files_file${ filesRow.id }";
                                                                        //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                        //data-glightbox="title: Title example.; description: Description example."
                                                                        var glightboxFilesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                    </script>
                                                                ` : ``
                                                                }

                                                            ` : ``
                                                            }

                                                        <div>
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") } 
                                                        </div>
                                                        ` : ``
                                                        }
                                                        ${ /*----------------------*/'' }


                                                        ${ /*Videos.*/'' }
                                                        ${ /*----------------------*/'' }
                                                        ${ filesRow.file_type == 2 ? 
                                                        `
                                                            <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file }" 
                                                                title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }" 
                                                                target="_blank" 
                                                                class="ss-backend-links01">
                                                                    ${ filesRow.caption != "" ? 
                                                                    `
                                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }
                                                                    ` : `
                                                                        ${ filesRow.file }
                                                                    `
                                                                    }
                                                            </a>

                                                            <div>
                                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") } 
                                                            </div>
                                                        ` : ``
                                                        }
                                                        ${ /*----------------------*/'' }


                                                        ${ /*Files.*/'' }
                                                        ${ /*----------------------*/'' }
                                                        ${ filesRow.file_type == 3 ? 
                                                        `
                                                            ${ filesRow.file !== "" ? 
                                                            `
                                                                ${ /*Download link.*/'' }
                                                                ${ filesRow.file_config == 3 ? 
                                                                `
                                                                    <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file }" 
                                                                        title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }" 
                                                                        target="_blank" 
                                                                        class="ss-backend-links01">
                                                                            ${ filesRow.caption != "" ? 
                                                                            `
                                                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }
                                                                            ` : `
                                                                                ${ filesRow.file }
                                                                            `
                                                                            }
                                                                    </a>
                                                                ` : ``
                                                                }


                                                                ${ /*Open on media.*/'' }
                                                                ${ filesRow.file_config == 4 ? 
                                                                `
                                                                    <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file }" 
                                                                        title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }" 
                                                                        target="_blank" 
                                                                        class="ss-backend-links01">
                                                                            ${ filesRow.caption != "" ? 
                                                                            `
                                                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }
                                                                            ` : `
                                                                                ${ filesRow.file }
                                                                            `
                                                                            }
                                                                    </a>
                                                                ` : ``
                                                                }
                                                            ` : `
                                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") } 
                                                            `
                                                            }
                                                        ` : ``
                                                        }
                                                        ${ /*----------------------*/'' }


                                                        ${ /*Zip.*/'' }
                                                        ${ /*----------------------*/'' }
                                                        ${ filesRow.file_type == 4 ? 
                                                        `
                                                            ${ filesRow.file !== "" ? 
                                                            `
                                                                <a download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file }" 
                                                                    title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }" 
                                                                    target="_blank" 
                                                                    class="ss-backend-links01">
                                                                        ${ filesRow.caption != "" ? 
                                                                        `
                                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }
                                                                        ` : `
                                                                            ${ filesRow.file }
                                                                        `
                                                                        }
                                                                </a>
                                                            ` : `
                                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") } 
                                                            `
                                                            }
                                                        ` : ``
                                                        }
                                                        ${ /*----------------------*/'' }
                                                    </td>
                                                    <td style="text-align: center;">
                                                        <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendDetails + "/" + filesRow.id + "/?" + this.queryDefault }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                                        </a> 
                                                        <!--a href="/${ gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendFiles + "/" + gSystemConfig.configRouteFrontendDetails + "/" + filesRow.id + "/?" + this.queryDefault }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                                        </a--> ${ /*TODO: Change address to access frontend.*/ '' }
                                                    </td>

                                                    <td id="formCategoririesListing_elementActivation${ filesRow.id }" style="text-align: center;" class="${ filesRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                        <a id="linkActivation${ filesRow.id }" class="ss-backend-links01" 
                                                            onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                                {
                                                                                                    idRecord: '${ filesRow.id }', 
                                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                                    strField:'activation', 
                                                                                                    recordValue: '${ filesRow.activation == 1 ? 0 : 1}', 
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
                                                                                                            elementCSSAdd('formCategoririesListing_elementActivation${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                        }

                                                                                                        if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                        {
                                                                                                            //Change cell color.
                                                                                                            elementCSSRemove('formCategoririesListing_elementActivation${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                                filesRow.activation == "1" ? 
                                                                SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                                : 
                                                                SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                            } 
                                                        </a>
                                                    </td>
                                                    ${ gSystemConfig.enableFilesActivation1 == 1 ? 
                                                        `
                                                        <td id="formCategoririesListing_elementActivation1${ filesRow.id }" style="text-align: center;" class="${ filesRow.activation1 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                            <a id="linkActivation1${ filesRow.id }" class="ss-backend-links01"
                                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                        ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                                {
                                                                                                    idRecord: '${ filesRow.id }', 
                                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                                    strField:'activation1', 
                                                                                                    recordValue: '${ filesRow.activation1 == 1 ? 0 : 1}', 
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
                                                                                                            elementCSSAdd('formCategoririesListing_elementActivation1${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation1${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                        }

                                                                                                        if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                        {
                                                                                                            //Change cell color.
                                                                                                            elementCSSRemove('formCategoririesListing_elementActivation1${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation1${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                                    filesRow.activation1 == "1" ? 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                                    : 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                                } 
                                                            </a>
                                                        </td>
                                                        ` : ``
                                                    }
                                                    ${ gSystemConfig.enableFilesActivation2 == 1 ? 
                                                        `
                                                        <td id="formCategoririesListing_elementActivation2${ filesRow.id }" style="text-align: center;" class="${ filesRow.activation2 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                            <a id="linkActivation2${ filesRow.id }" class="ss-backend-links01"
                                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                        ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                                {
                                                                                                    idRecord: '${ filesRow.id }', 
                                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                                    strField:'activation2', 
                                                                                                    recordValue: '${ filesRow.activation2 == 1 ? 0 : 1}', 
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
                                                                                                            elementCSSAdd('formCategoririesListing_elementActivation2${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation2${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                        }

                                                                                                        if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                        {
                                                                                                            //Change cell color.
                                                                                                            elementCSSRemove('formCategoririesListing_elementActivation2${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation2${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                                    filesRow.activation2 == "1" ? 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                                    : 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                                } 
                                                            </a>
                                                        </td>
                                                        ` : ``
                                                    }
                                                    ${ gSystemConfig.enableFilesActivation3 == 1 ? 
                                                        `
                                                        <td id="formCategoririesListing_elementActivation3${ filesRow.id }" style="text-align: center;" class="${ filesRow.activation3 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                            <a id="linkActivation3${ filesRow.id }" class="ss-backend-links01"
                                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                        ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                                {
                                                                                                    idRecord: '${ filesRow.id }', 
                                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                                    strField:'activation3', 
                                                                                                    recordValue: '${ filesRow.activation3 == 1 ? 0 : 1}', 
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
                                                                                                            elementCSSAdd('formCategoririesListing_elementActivation3${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation3${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                        }

                                                                                                        if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                        {
                                                                                                            //Change cell color.
                                                                                                            elementCSSRemove('formCategoririesListing_elementActivation3${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation3${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                                    filesRow.activation3 == "1" ? 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                                    : 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                                } 
                                                            </a>
                                                        </td>
                                                        ` : ``
                                                    }
                                                    ${ gSystemConfig.enableFilesActivation4 == 1 ? 
                                                        `
                                                        <td id="formCategoririesListing_elementActivation4${ filesRow.id }" style="text-align: center;" class="${ filesRow.activation4 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                            <a id="linkActivation4${ filesRow.id }" class="ss-backend-links01"
                                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                        ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                                {
                                                                                                    idRecord: '${ filesRow.id }', 
                                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                                    strField:'activation4', 
                                                                                                    recordValue: '${ filesRow.activation4 == 1 ? 0 : 1}', 
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
                                                                                                            elementCSSAdd('formCategoririesListing_elementActivation4${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation4${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                        }

                                                                                                        if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                        {
                                                                                                            //Change cell color.
                                                                                                            elementCSSRemove('formCategoririesListing_elementActivation4${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation4${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                                    filesRow.activation4 == "1" ? 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                                    : 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                                } 
                                                            </a>
                                                        </td>
                                                        ` : ``
                                                    }
                                                    ${ gSystemConfig.enableFilesActivation5 == 1 ? 
                                                        `
                                                        <td id="formCategoririesListing_elementActivation5${ filesRow.id }" style="text-align: center;" class="${ filesRow.activation5 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                            <a id="linkActivation5${ filesRow.id }" class="ss-backend-links01"
                                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                                        ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                                {
                                                                                                    idRecord: '${ filesRow.id }', 
                                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                                    strField:'activation5', 
                                                                                                    recordValue: '${ filesRow.activation5 == 1 ? 0 : 1}', 
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
                                                                                                            elementCSSAdd('formCategoririesListing_elementActivation5${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation5${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                                        }

                                                                                                        if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                                        {
                                                                                                            //Change cell color.
                                                                                                            elementCSSRemove('formCategoririesListing_elementActivation5${ filesRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                            //Change link text.
                                                                                                            elementMessage01('linkActivation5${ filesRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                                    filesRow.activation5 == "1" ? 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                                    : 
                                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                                } 
                                                            </a>
                                                        </td>
                                                        ` : ``
                                                    }

                                                    <td style="text-align: center;">
                                                        <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  filesRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                                        </a>
                                                    </td>
                                                    <td style="text-align: center;">
                                                        <input type="checkbox" name="idsRecordsDelete" value="${filesRow.id}" class="ss-backend-field-checkbox" /> 
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
                                ${ gSystemConfig.enableFilesBackendPagination == 1 ? 
                                `
                                    <div class="ss-backend-paging" style="position: relative; display: block; overflow: hidden; text-align: center;">

                                        ${ /*Page numbers.*/'' }
                                        ${ gSystemConfig.enableFilesBackendPaginationNumbering == 1 ? 
                                        `
                                            <div class="ss-backend-paging-number-link-a" style="position: relative; display: block; overflow: hidden;">
                                                ${Array(this._pagingTotal).fill().map((item, pageNumberOutput)=>{
                                                    return `
                                                        ${ (pageNumberOutput + 1) == this._pageNumber ? `
                                                            ${ pageNumberOutput + 1 }
                                                        ` : `
                                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=${ pageNumberOutput + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPageCounter01") + " " + pageNumberOutput + 1 }" class="ss-backend-paging-number-link">
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
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                                </a>
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                                </a>
                                                ` : `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                                </a>
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                                </a>
                                                `
                                            }

                                            
                                            ${ this._pageNumber == this._pagingTotal ? 
                                                `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                                </a>
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") } 
                                                </a>
                                                ` : `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                                </a>
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn">
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
                        `}
                    </section>
                </div>
            </div>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(oclRecords);
            //strReturn = JSON.stringify(oclRecords.resultsCategoriesListing);
            
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
    flBackend = new FilesListing({
        idParent: idParent,
        fileType: fileType,
        pageNumber: pageNumber,
        masterPageSelect: masterPageSelect,

        messageSuccess: messageSuccess,
        messageError: messageError,
        messageAlert: messageAlert,
        nRecords: nRecords
    });

    //Build object data.
    await flBackend.build();
    */
    //----------------------
};