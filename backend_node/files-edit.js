"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class FilesEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbFiles: idTbFiles,
                            fileType: fileType,

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
        this._idTbFiles = objParameters.idTbFiles;
        this._fileType = objParameters.fileType;
        
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
        this.ofdRecord = "";
        this.ofdRecordParameters = {
            _arrSearchParameters: this.arrSearchParameters,
            _idTbFiles: this._idTbFiles,
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
            this.arrSearchParameters.push("id;" + this._idTbFiles + ";i"); 


            //Build objects.
            this.ofdRecord = new SyncSystemNS.ObjectFilesDetails(this.ofdRecordParameters);
            await this.ofdRecord.recordDetailsGet(0, 3);
            //console.log("this.ocdRecord=", this.ocdRecord);


            //Parent ID Records.
            if(gSystemConfig.enableFilesIdParentEdit == 1)
            {
                //Check table of parent id.
                this.objParentTableLevel1 = await SyncSystemNS.FunctionsDB.tableFindGet(this.ofdRecord.tblFilesIdParent);

                //Categories.
                if(this.objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories)
                {
                    this.objParentTable = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                                [], 
                                                                                                gSystemConfig.configCategoriesSort, 
                                                                                                "", 
                                                                                                "id, title", 
                                                                                                1);
                }


                //Debug.
                //console.log("this.objParentTableLevel1=", this.objParentTableLevel1);
            }


            //Default query.
            this.queryDefault += "fileType=" + this._fileType;
            this.queryDefault += "&masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Tittle - current.
            this.titleCurrent = this.ofdRecord.tblFilesCaption;


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleMain");
            if(this.titleCurrent)
            {
                this.metaTitle += " - " + this.titleCurrent;
            }

            //Meta description.
            this.metaDescription += this.ofdRecord.tblFilesDescription;

            //Meta keywords.
            this.metaKeywords += this.ofdRecord.tblFilesKeywordsTags;

            //Meta URL current.
            this.metaURLCurrent += gSystemConfig.configSystemURL + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackend + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendFiles + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbFiles + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleEdit");

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
                ${ this.ofdRecord.tblFilesFile != "" ? 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.ofdRecord.tblFilesFile + "?v=" + this.cacheClear }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                    ` : 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png" }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                    `
                }
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleEdit");
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
        let ofdRecord = this.ofdRecord;
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
                    
                    /*"this.objCategoriesIdParent=" + this.objCategoriesIdParent + "<br />" +*/
                    /*"ocdRecord.arrIdsCategoriesFiltersGenericBinding=" + ocdRecord.arrIdsCategoriesFiltersGenericBinding + "<br />" +*/
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
                <form id="formFilesEdit" name="formFilesEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formFilesEdit_method" name="_method" value="PUT">
                    
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to able it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configFilesInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_files" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleTableEdit") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
    
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableFilesIdParentEdit == 1 ? 
                                `
                                <tr id="inputRowFiles_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        ${ /*TODO: Convert to ajax.*/'' }

                                        ${ /*Categories.*/'' }
                                        ${ objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories ? 
                                        `
                                        <select id="files_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                            <!--option value="0"${ ofdRecord.tblFilesIdParent == 0 ? ` selected` : `` }>
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                            </option-->
                                            ${ objParentTable.map((recordRow)=>{
                                                return `
                                                    <option value="${ recordRow.id }"${ ofdRecord.tblFilesIdParent == recordRow.id ? ` selected` : `` }>
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                    </option>
                                                `
                                            }) }
                                        </select>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableFilesSortOrder == 1 ? 
                                `
                                <tr id="inputRowFiles_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="files_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ ofdRecord.tblFilesSortOrder }" />
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
                                            <input type="radio" name="file_config" value="1"${ ofdRecord.tblFilesFileConfig == 1 ? ` checked` : `` } class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="2"${ ofdRecord.tblFilesFileConfig == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay2") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="3"${ ofdRecord.tblFilesFileConfig == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="4"${ ofdRecord.tblFilesFileConfig == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                            <input type="radio" name="file_config" value="3"${ ofdRecord.tblFilesFileConfig == 4 ? ` checked` : `` } checked class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay3") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="file_config" value="4"${ ofdRecord.tblFilesFileConfig == 5 ? ` checked` : `` } class="ss-backend-field-radio" />
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
                                        <input type="text" id="files_title" name="title" class="ss-backend-field-text01" maxlength="255" value="${ ofdRecord.tblFilesTitle }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowFiles_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="files_caption" name="caption" class="ss-backend-field-text01" maxlength="255" value="${ ofdRecord.tblFilesCaption }" />
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
                                            <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesDescription_edit }</textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesDescription_edit }</textarea>
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
                                            <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesDescription_edit }</textarea>
                                            <script>
                                                new FroalaEditor("#files_description");
                                            </script>
                                        ` : ``}


                                        ${ /*TinyMCE*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="files_description" name="description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesDescription_edit }</textarea>
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
                                        <textarea id="files_html_code" name="html_code" class="ss-backend-field-text-area-html ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesHTMLCode_edit }</textarea>
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
                                        <input type="text" id="files_url_alias" name="url_alias" class="ss-backend-field-text01 ss-backend-field-text-area-html-column" value="${ ofdRecord.tblFilesURLAlias }" />
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
                                        <textarea id="files_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesKeywordsTags }</textarea>
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
                                        <textarea id="files_meta_description" name="meta_description" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesMetaDescription_edit }</textarea>
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
                                            <input type="text" id="files_info1" name="info1" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info1" name="info1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info1" name="info1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo1_edit }</textarea>
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
                                            <input type="text" id="files_info1" name="info1" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configFilesInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="files_info1" name="info1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo1_edit }</textarea>
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
                                            <input type="text" id="files_info2" name="info2" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info2" name="info2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info2" name="info2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo2_edit }</textarea>
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
                                            <input type="text" id="files_info2" name="info2" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configFilesInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="files_info2" name="info2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo2_edit }</textarea>
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
                                            <input type="text" id="files_info3" name="info3" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info3" name="info3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info3" name="info3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo3_edit }</textarea>
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
                                            <input type="text" id="files_info3" name="info3" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configFilesInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="files_info3" name="info3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo3_edit }</textarea>
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
                                            <input type="text" id="files_info4" name="info4" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info4" name="info4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info4" name="info4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo4_edit }</textarea>
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
                                            <input type="text" id="files_info4" name="info4" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configFilesInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="files_info4" name="info4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo4_edit }</textarea>
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
                                            <input type="text" id="files_info5" name="info5" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info5" name="info5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info5" name="info5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo5_edit }</textarea>
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
                                            <input type="text" id="files_info5" name="info5" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configFilesInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="files_info5" name="info5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfo5_edit }</textarea>
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
                                            <input type="text" id="files_info_small1" name="info_small1" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfoSmall1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info_small1" name="info_small1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info_small1" name="info_small1" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall1_edit }</textarea>
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
                                            <input type="text" id="files_info_small2" name="info_small2" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfoSmall2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info_small2" name="info_small2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info_small2" name="info_small2" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall2_edit }</textarea>
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
                                            <input type="text" id="files_info_small3" name="info_small3" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfoSmall3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info_small3" name="info_small3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info_small3" name="info_small3" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall3_edit }</textarea>
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
                                            <input type="text" id="files_info_small4" name="info_small4" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfoSmall4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info_small4" name="info_small4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info_small4" name="info_small4" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall4_edit }</textarea>
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
                                            <input type="text" id="files_info_small5" name="info_small5" class="ss-backend-field-text01" value="${ ofdRecord.tblFilesInfoSmall5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configFilesInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="files_info_small5" name="info_small5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="files_info_small5" name="info_small5" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesInfoSmall5_edit }</textarea>
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
                                            <input type="text" id="files_number1" name="number1" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumber1FieldType == 2 || gSystemConfig.configFilesNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number1" name="number1" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumber1_print }" maxlength="45" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configFilesNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="files_number1" name="number1" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber1_print }" maxlength="34" />
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
                                            <input type="text" id="files_number2" name="number2" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumber2FieldType == 2 || gSystemConfig.configFilesNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number2" name="number2" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumber2_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("files_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configFilesNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="files_number2" name="number2" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber2_print }" maxlength="34" />
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
                                            <input type="text" id="files_number3" name="number3" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumber3FieldType == 2 || gSystemConfig.configFilesNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number3" name="number3" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumber3_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("files_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configFilesNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="files_number3" name="number3" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber3_print }" maxlength="34" />
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
                                            <input type="text" id="files_number4" name="number4" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumber4FieldType == 2 || gSystemConfig.configFilesNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number4" name="number4" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumber4_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("files_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configFilesNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="files_number4" name="number4" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber4_print }" maxlength="34" />
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
                                            <input type="text" id="files_number5" name="number5" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumber5FieldType == 2 || gSystemConfig.configFilesNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number5" name="number5" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumber5_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("files_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("files_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configFilesNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="files_number5" name="number5" class="ss-backend-field-numeric02" value="${ ofdRecord.tblFilesNumber5_print }" maxlength="34" />
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
                                            <input type="text" id="files_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="${ ofdRecord.tblFilesNumberSmall1_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumberS1FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number_small1" name="number_small1" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumberSmall1_print }" maxlength="9" />
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
                                            <input type="text" id="files_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="${ ofdRecord.tblFilesNumberSmall2_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumberS2FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number_small2" name="number_small2" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumberSmall2_print }" maxlength="9" />
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
                                            <input type="text" id="files_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="${ ofdRecord.tblFilesNumberSmall3_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumberS3FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number_small3" name="number_small3" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumberSmall3_print }" maxlength="9" />
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
                                            <input type="text" id="files_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="${ ofdRecord.tblFilesNumberSmall4_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumberS4FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number_small4" name="number_small4" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumberSmall4_print }" maxlength="9" />
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
                                            <input type="text" id="files_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="${ ofdRecord.tblFilesNumberSmall5_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("files_number_small5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configFilesNumberS5FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="files_number_small5" name="number_small5" class="ss-backend-field-currency01" value="${ ofdRecord.tblFilesNumberSmall5_print }" maxlength="9" />
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
                                                    <select id="files_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate1DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="files_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate1DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="files_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="${ ofdRecord.tblFilesDate1_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate1DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="files_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate1DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ofdRecord.tblFilesDate1DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate2DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="files_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate2DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="files_date2" name="date2" class="ss-backend-field-date01" autocomplete="off" value="${ ofdRecord.tblFilesDate2_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate2DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="files_date2_minute" name="date2_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate2DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ofdRecord.tblFilesDate2DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate3DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="files_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate3DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="files_date3" name="date3" class="ss-backend-field-date01" autocomplete="off" value="${ ofdRecord.tblFilesDate3_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate3DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="files_date3_minute" name="date3_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate3DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ofdRecord.tblFilesDate3DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate4DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="files_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate4DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="files_date4" name="date4" class="ss-backend-field-date01" autocomplete="off" value="${ ofdRecord.tblFilesDate4_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate4DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="files_date4_minute" name="date4_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate4DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ofdRecord.tblFilesDate4DateSecond == arrayRow ? ' selected' : ``}
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
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate5DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="files_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ ofdRecord.tblFilesDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="files_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ ofdRecord.tblFilesDate5DateYear == arrayRow ? ' selected' : ``}
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
                                            <input type="text" id="files_date5" name="date5" class="ss-backend-field-date01" autocomplete="off" value="${ ofdRecord.tblFilesDate5_print }" />
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
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate5DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="files_date5_minute" name="date5_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configFilesDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ ofdRecord.tblFilesDate5DateMinute == arrayRow ? ' selected' : ``}
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
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ ofdRecord.tblFilesDate5DateSecond == arrayRow ? ' selected' : ``}
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="files_file" name="file" class="ss-backend-field-file-upload" />
                                        ${ ofdRecord.tblFilesFile != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ ofdRecord.tblFilesFileType == 1 ? 
                                            `
                                                <img id="imgFilesFile" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFile + "?v=" + this.cacheClear }" 
                                                    alt="${ ofdRecord.tblFilesCaption }" 
                                                    class="ss-backend-images-edit" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*Video.*/ '' }
                                            ${ ofdRecord.tblFilesFileType == 2 ? 
                                            `
                                                <a id="imgFilesFile" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile }" 
                                                    title="${ ofdRecord.tblFilesCaption }" 
                                                    target="_blank" 
                                                    class="ss-backend-links01 ss-backend-images-edit">
                                                        ${ ofdRecord.tblFilesFile }
                                                </a>
                                            ` : ``
                                            }


                                            ${ /*Files.*/ '' }
                                            ${ ofdRecord.tblFilesFileType == 3 ? 
                                            `
                                                ${ /*Download link.*/'' }
                                                ${ ofdRecord.tblFilesFileConfig == 3 ? 
                                                `
                                                    <a id="imgFilesFile" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile }" 
                                                        title="${ ofdRecord.tblFilesCaption }" 
                                                        target="_blank" 
                                                        class="ss-backend-links01 ss-backend-images-edit">
                                                            ${ ofdRecord.tblFilesFile }
                                                    </a>
                                                ` : ``
                                                }


                                                ${ /*Open on media.*/'' }
                                                ${ ofdRecord.tblFilesFileConfig == 4 ? 
                                                `
                                                    <a id="imgFilesFile" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile }" 
                                                        title="${ ofdRecord.tblFilesCaption }" 
                                                        target="_blank" 
                                                        class="ss-backend-links01 ss-backend-images-edit">
                                                            ${ ofdRecord.tblFilesFile }
                                                    </a>
                                                ` : ``
                                                }

                                                ${ /*Zip.*/ '' }
                                                ${ ofdRecord.tblFilesFileType == 4 ? 
                                                `
                                                    <a id="imgFilesFile" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile }" 
                                                        title="${ ofdRecord.tblFilesCaption }" 
                                                        target="_blank" 
                                                        class="ss-backend-links01 ss-backend-images-edit">
                                                            ${ ofdRecord.tblFilesFile }
                                                    </a>
                                                ` : ``
                                                }

                                            ` : ``
                                            }

                                            <div id="divFilesFileDelete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ofdRecord.tblFilesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                    strField:'file', 
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
                                                                                        htmlGenericStyle01('imgFilesFile', 'display', 'none');
                                                                                        htmlGenericStyle01('divFilesFileDelete', 'display', 'none');

                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');

                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }

                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") }
                                                </a>
                                            </div>
                                        ` : ``
                                        }
                                        
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFilesThumbnails == 1 ? 
                                `
                                <tr id="inputRowFiles_file_thumbnail" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFileThumbnail") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="files_file_thumbnail" name="file_thumbnail" class="ss-backend-field-file-upload" />
                                        ${ ofdRecord.tblFilesFileThumbnail != "" ? 
                                        `
                                        <img id="imgFilesFileThumbnail" 
                                            src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFileThumbnail + "?v=" + this.cacheClear }" 
                                            alt="${ ofdRecord.tblFilesCaption }" 
                                            class="ss-backend-images-edit" 
                                        />
                                        <div id="divFilesFileThumbnailDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ ofdRecord.tblFilesID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                strField:'file_thumbnail', 
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
                                                                                    htmlGenericStyle01('imgFilesFileThumbnail', 'display', 'none');
                                                                                    htmlGenericStyle01('divFilesFileThumbnailDelete', 'display', 'none');

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

                                ${ gSystemConfig.enableFilesFile1 == 1 ? 
                                `
                                <tr id="inputRowFiles_file1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFile1") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="files_file1" name="file1" class="ss-backend-field-file-upload" />
                                        ${ ofdRecord.tblFilesFile1 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configFilesFile1Type == 1 ? 
                                            `
                                                <img id="imgFilesFile1" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFile1 + "?v=" + this.cacheClear }" 
                                                    alt="${ ofdRecord.tblFilesFile1 }" 
                                                    class="ss-backend-images-edit" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configFilesFile1Type == 3 ? 
                                            `
                                                <a id="imgFilesFile1" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configFilesFile1Type == 34 ? 
                                            `
                                                <a id="imgFilesFile1" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divFilesFile1Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ofdRecord.tblFilesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                    strField:'file1', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgFilesFile1', 'display', 'none');
                                                                                        htmlGenericStyle01('divFilesFile1Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configFilesFile1Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="files_file2" name="file2" class="ss-backend-field-file-upload" />

                                        ${ ofdRecord.tblFilesFile2 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configFilesFile2Type == 1 ? 
                                            `
                                                <img id="imgFilesFile2" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFile2 + "?v=" + this.cacheClear }" 
                                                    alt="${ ofdRecord.tblFilesFile2 }" 
                                                    class="ss-backend-images-edit" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configFilesFile2Type == 3 ? 
                                            `
                                                <a id="imgFilesFile2" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configFilesFile2Type == 34 ? 
                                            `
                                                <a id="imgFilesFile2" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divFilesFile2Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ofdRecord.tblFilesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                    strField:'File2', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgFilesFile2', 'display', 'none');
                                                                                        htmlGenericStyle01('divFilesFile2Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configFilesFile2Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="files_file3" name="file3" class="ss-backend-field-file-upload" />

                                        ${ ofdRecord.tblFilesFile3 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configFilesFile3Type == 1 ? 
                                            `
                                                <img id="imgFilesFile3" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFile3 + "?v=" + this.cacheClear }" 
                                                    alt="${ ofdRecord.tblFilesFile3 }" 
                                                    class="ss-backend-images-edit" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configFilesFile3Type == 3 ? 
                                            `
                                                <a id="imgFilesFile3" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configFilesFile3Type == 34 ? 
                                            `
                                                <a id="imgFilesFile3" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divFilesFile3Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ofdRecord.tblFilesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                    strField:'File3', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgFilesFile3', 'display', 'none');
                                                                                        htmlGenericStyle01('divFilesFile3Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configFilesFile3Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="files_file4" name="file4" class="ss-backend-field-file-upload" />

                                        ${ ofdRecord.tblFilesFile4 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configFilesFile4Type == 1 ? 
                                            `
                                                <img id="imgFilesFile4" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFile4 + "?v=" + this.cacheClear }" 
                                                    alt="${ ofdRecord.tblFilesFile4 }" 
                                                    class="ss-backend-images-edit" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configFilesFile4Type == 3 ? 
                                            `
                                                <a id="imgFilesFile4" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configFilesFile4Type == 34 ? 
                                            `
                                                <a id="imgFilesFile4" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divFilesFile4Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ofdRecord.tblFilesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                    strField:'File4', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgFilesFile4', 'display', 'none');
                                                                                        htmlGenericStyle01('divFilesFile4Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configFilesFile4Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="files_file5" name="file5" class="ss-backend-field-file-upload" />

                                        ${ ofdRecord.tblFilesFile5 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configFilesFile5Type == 1 ? 
                                            `
                                                <img id="imgFilesFile5" 
                                                    src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFile5 + "?v=" + this.cacheClear }" 
                                                    alt="${ ofdRecord.tblFilesFile5 }" 
                                                    class="ss-backend-images-edit" 
                                                />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configFilesFile5Type == 3 ? 
                                            `
                                                <a id="imgFilesFile5" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configFilesFile5Type == 34 ? 
                                            `
                                                <a id="imgFilesFile5" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + ofdRecord.tblFilesFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ ofdRecord.tblFilesFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divFilesFile5Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ ofdRecord.tblFilesID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableFiles }', 
                                                                                    strField:'File5', 
                                                                                    recordValue: '', 
                                                                                    patchType: 'fileDelete', 
                                                                                    ajaxFunction: true, 
                                                                                    apiKey: '${ SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2) }'
                                                                                }, 
                                                                                async function(_resObjReturn){
                                                                                    //alert(JSON.stringify(_resObjReturn));
                                                                                    
                                                                                    if(_resObjReturn.objReturn.returnStatus == true)
                                                                                    {
                                                                                        //Hide elements.
                                                                                        htmlGenericStyle01('imgFilesFile5', 'display', 'none');
                                                                                        htmlGenericStyle01('divFilesFile5Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configFilesFile5Type == 1 ? 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageDelete") } ${ /*Image*/ '' }
                                                    ` : 
                                                    `
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFileDelete") } ${ /*File*/ '' }
                                                    `
                                                    }
                                                </a>
                                            </div>

                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowFiles_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="categories_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1"${ ofdRecord.tblFilesActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ ofdRecord.tblFilesActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                        ${ /*ofdRecord.tblFilesActivation_print*/ '' }
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
                                                <option value="1"${ ofdRecord.tblFilesActivation1 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ofdRecord.tblFilesActivation1 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ofdRecord.tblFilesActivation2 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ofdRecord.tblFilesActivation2 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ofdRecord.tblFilesActivation3 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ofdRecord.tblFilesActivation3 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ofdRecord.tblFilesActivation4 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ofdRecord.tblFilesActivation4 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                                <option value="1"${ ofdRecord.tblFilesActivation5 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ofdRecord.tblFilesActivation5 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                        <textarea id="files_notes" name="notes" class="ss-backend-field-text-area01 ss-backend-field-text-area-html-column">${ ofdRecord.tblFilesNotes_edit }</textarea>
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
                        <button id="files_include" name="files_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>
                
                    <input type="hidden" id="files_id" name="id" value="${ ofdRecord.tblFilesID }" />
                    <input type="hidden" id="files_file_type" name="file_type" value="${ ofdRecord.tblFilesFileType }" />

                    <input type="hidden" id="files_idParent" name="idParent" value="${ ofdRecord.tblFilesIdParent }" />
                    <input type="hidden" id="files_fileType" name="fileType" value="${ this._fileType }" />

                    <input type="hidden" id="files_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="files_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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