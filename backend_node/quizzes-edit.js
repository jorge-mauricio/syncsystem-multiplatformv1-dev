"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class QuizzesEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbQuizzes: idTbQuizzes,

                            pageNumber: pageNumber,
                            masterPageSelect: masterPageSelect,
                            cookiesData: cookiesData,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert
                        };
        */


        //Properties.
        //----------------------
        this._idTbQuizzes = objParameters.idTbQuizzes;
        this._idType = objParameters.idType;

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
        this.oqdRecord = "";
        this.oqdRecordParameters = {};

        this.arrFiltersGenericSearchParameters = [];
        this.ofglRecords = "";
        this.ofglRecordsParameters = {};

        //this.resultsQuizzesTypeListing;
        this.resultsQuizzesStatusListing;
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
            this.arrSearchParameters.push("id;" + this._idTbQuizzes + ";i"); 

            this.oqdRecordParameters = {
                _arrSearchParameters: this.arrSearchParameters,
                _idTbQuizzes: this._idTbQuizzes,
                _terminal: 0,
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            this.oqdRecord = new SyncSystemNS.ObjectQuizzesDetails(this.oqdRecordParameters);
            await this.oqdRecord.recordDetailsGet(0, 3);
            //console.log("this.oqdRecord=", this.oqdRecord);


            //Parameters build.
            this.arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableQuizzes + ";s");

            this.ofglRecordsParameters = {
                _arrSearchParameters: this.arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            this.ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(this.ofglRecordsParameters);
            await this.ofglRecords.recordsListingGet(0, 3);

            
            //Filters - Status.
            if(gSystemConfig.enableQuizzesStatus != 0)
            {
                this.resultsQuizzesStatusListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }

            
            //Parent ID Records.
            if(gSystemConfig.enableQuizzesIdParentEdit == 1)
            {
                //Check table of parent id.
                this.objParentTableLevel1 = await SyncSystemNS.FunctionsDB.tableFindGet(this.oqdRecord.tblQuizzesIdParent);

                //Categories.
                if(this.objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories)
                {
                    //Category type / publication type.
                    let objParentTableLevel1CategoryType = 0;
                    if(this.oqdRecord.tblQuizzesIdType != "" && this.oqdRecord.tblQuizzesIdType !== null && this.oqdRecord.tblQuizzesIdType !== undefined)
                    {
                        switch(this.oqdRecord.tblQuizzesIdType)
                        {
                            case 1:
                                objParentTableLevel1CategoryType = "7";
                                break;
                            case 2:
                                objParentTableLevel1CategoryType = "17";
                                break;
                        }


                        //Debug.
                        console.log("objParentTableLevel1CategoryType=", objParentTableLevel1CategoryType); 
                        //console.log("this.objParentTable.tableData[0].category_type = ", this.objParentTable.tableData[0].category_type);
                    }


                    this.objParentTable = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                            //["category_type;" + this.oqdRecord.tblQuizzesIdType + ";i"], 
                                                                                            ["category_type;" + objParentTableLevel1CategoryType + ";i"], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "", 
                                                                                            "id, title", 
                                                                                            1);
                }


                //Debug.
                //console.log("this.objParentTableLevel1=", this.objParentTableLevel1);
                //console.log("this.oqdRecord.tblQuizzesIdType=", this.oqdRecord.tblQuizzesIdType);
            }


            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Tittle - current.
            this.titleCurrent = this.oqdRecord.tblQuizzesTitle;


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleEdit");
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendQuizzes + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbQuizzes + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleEdit");

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
                ${ this.oqdRecord.tblQuizzesImageMain != "" ? 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/t" + this.oqdRecord.tblQuizzesImageMain + "?v=" + this.cacheClear }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleEdit");
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
        let oqdRecord = this.oqdRecord;
        let objParentTableLevel1 = this.objParentTableLevel1;
        let objParentTable = this.objParentTable;

        //let resultsQuizzesTypeListing = this.resultsQuizzesTypeListing;
        let resultsQuizzesStatusListing = this.resultsQuizzesStatusListing;


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
                    /*"oqdRecord.arrIdsCategoriesFiltersGenericBinding=" + oqdRecord.arrIdsCategoriesFiltersGenericBinding + "<br />" +*/
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
                <form id="formQuizzesEdit" name="formQuizzesEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formQuizzesEdit_method" name="_method" value="PUT">

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
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesTitleTableEdit") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableQuizzesIdParentEdit == 1 ? 
                                `
                                <tr id="inputRowQuizzes_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        ${ /*TODO: Convert to ajax.*/'' }
                                        <select id="quizzes_id_parent" name="id_parent" class="ss-backend-field-droqdown01">
                                            <option value="0"${ oqdRecord.tblQuizzesIdParent == 0 ? ` selected` : `` }>
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                            </option>
                                            ${ objParentTable.map((recordRow)=>{
                                                return `
                                                    <option value="${ recordRow.id }"${ oqdRecord.tblQuizzesIdParent == recordRow.id ? ` selected` : `` }>
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                    </option>
                                                `
                                            }) }
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="quizzes_id_parent" name="id_parent" value="${ oqdRecord.tblQuizzesIdParent }" />
                                `
                                }

                                ${ gSystemConfig.enableQuizzesSortOrder == 1 ? 
                                `
                                <tr id="inputRowQuizzes_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ oqdRecord.tblQuizzesSortOrder_print }" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_sort_order");
                                        </script>
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
                                        <select id="quizzes_id_register_user" name="id_register_user" class="ss-backend-field-droqdown01">
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
                                        <input type="text" id="quizzes_title" name="title" class="ss-backend-field-text01" maxlength="255" value="${ oqdRecord.tblQuizzesTitle }" />
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
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesDescription_edit }</textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesDescription_edit }</textarea>
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
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesDescription_edit }</textarea>
                                            <script>
                                                new FroalaEditor("#quizzes_description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="quizzes_description" name="description" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesDescription_edit }</textarea>
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
                                        <input type="text" id="quizzes_url_alias" name="url_alias" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesURLAlias }" />
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
                                        <textarea id="quizzes_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesKeywordsTags }</textarea>
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
                                        <textarea id="quizzes_meta_description" name="meta_description" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesMetaDescription_edit }</textarea>
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
                                        <input type="text" id="quizzes_meta_title" name="meta_title" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesMetaTitle }" />
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
                                            <input type="text" id="quizzes_info1" name="info1" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info1" name="info1" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info1" name="info1" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo1_edit }</textarea>
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
                                            <input type="text" id="quizzes_info1" name="info1" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info1" name="info1" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo1_edit }</textarea>
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
                                            <input type="text" id="quizzes_info2" name="info2" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info2" name="info2" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info2" name="info2" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo2_edit }</textarea>
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
                                            <input type="text" id="quizzes_info2" name="info2" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info2" name="info2" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo2_edit }</textarea>
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
                                            <input type="text" id="quizzes_info3" name="info3" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info3" name="info3" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info3" name="info3" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo3_edit }</textarea>
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
                                            <input type="text" id="quizzes_info3" name="info3" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info3" name="info3" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo3_edit }</textarea>
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
                                            <input type="text" id="quizzes_info4" name="info4" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info4" name="info4" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info4" name="info4" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo4_edit }</textarea>
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
                                            <input type="text" id="quizzes_info4" name="info4" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info4" name="info4" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo4_edit }</textarea>
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
                                            <input type="text" id="quizzes_info5" name="info5" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configQuizzesInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="quizzes_info5" name="info5" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="quizzes_info5" name="info5" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo5_edit }</textarea>
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
                                            <input type="text" id="quizzes_info5" name="info5" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configQuizzesInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="quizzes_info5" name="info5" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesInfo5_edit }</textarea>
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
                                            <input type="text" id="quizzes_number1" name="number1" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber1FieldType == 2 || gSystemConfig.configQuizzesNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number1" name="number1" class="ss-backend-field-currency01" value="${ oqdRecord.tblQuizzesNumber1_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number1")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number1" name="number1" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber1_print }" maxlength="34" />
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
                                            <input type="text" id="quizzes_number2" name="number2" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber2FieldType == 2 || gSystemConfig.configQuizzesNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number2" name="number2" class="ss-backend-field-currency01" value="${ oqdRecord.tblQuizzesNumber2_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number2" name="number2" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber2_print }" maxlength="34" />
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
                                            <input type="text" id="quizzes_number3" name="number3" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber3FieldType == 2 || gSystemConfig.configQuizzesNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number3" name="number3" class="ss-backend-field-currency01" value="${ oqdRecord.tblQuizzesNumber3_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number3" name="number3" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber3_print }" maxlength="34" />
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
                                            <input type="text" id="quizzes_number4" name="number4" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber4FieldType == 2 || gSystemConfig.configQuizzesNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number4" name="number4" class="ss-backend-field-currency01" value="${ oqdRecord.tblQuizzesNumber4_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number4" name="number4" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber4_print }" maxlength="34" />
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
                                            <input type="text" id="quizzes_number5" name="number5" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("quizzes_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber5FieldType == 2 || gSystemConfig.configQuizzesNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="quizzes_number5" name="number5" class="ss-backend-field-currency01" value="${ oqdRecord.tblQuizzesNumber5_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("quizzes_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("quizzes_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configQuizzesNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="quizzes_number5" name="number5" class="ss-backend-field-numeric02" value="${ oqdRecord.tblQuizzesNumber5_print }" maxlength="34" />
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
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="quizzes_image_main" name="image_main" class="ss-backend-field-file-upload" />

                                        ${ oqdRecord.tblQuizzesImageMain != "" ? 
                                        `
                                        <img id="imgQuizzesImageMain" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + oqdRecord.tblQuizzesImageMain + "?v=" + this.cacheClear }" alt="${ oqdRecord.tblQuizzesTitle }" class="ss-backend-images-edit" />
                                        <div id="divQuizzesImageMainDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ oqdRecord.tblQuizzesID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTableQuizzes }', 
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
                                                                                    htmlGenericStyle01('imgQuizzesImageMain', 'display', 'none');
                                                                                    htmlGenericStyle01('divQuizzesImageMainDelete', 'display', 'none');

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
                                ${ gSystemConfig.enableQuizzesImageMainCaption == 1 ? 
                                `
                                <tr id="inputRowQuizzes_image_main_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="quizzes_image_main_caption" name="image_main_caption" class="ss-backend-field-text01" value="${ oqdRecord.tblQuizzesImageMainCaption }" />
                                    </td>
                                </tr>
                                ` : ``
                                }                                


                                <tr id="inputRowQuizzes_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="quizzes_activation" name="activation" class="ss-backend-field-droqdown01">
                                            <option value="1"${ oqdRecord.tblQuizzesActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ oqdRecord.tblQuizzesActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                        ${ /*oqdRecord.tblQuizzesActivation_print*/ '' }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableQuizzesActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowQuizzes_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendQuizzesActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="quizzes_activation1" name="activation1" class="ss-backend-field-droqdown01">
                                                <option value="1"${ oqdRecord.tblQuizzesActivation1 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oqdRecord.tblQuizzesActivation1 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <select id="quizzes_activation2" name="activation2" class="ss-backend-field-droqdown01">
                                                <option value="1"${ oqdRecord.tblQuizzesActivation2 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oqdRecord.tblQuizzesActivation2 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <select id="quizzes_activation3" name="activation3" class="ss-backend-field-droqdown01">
                                                <option value="1"${ oqdRecord.tblQuizzesActivation3 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oqdRecord.tblQuizzesActivation3 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <select id="quizzes_activation4" name="activation4" class="ss-backend-field-droqdown01">
                                                <option value="1"${ oqdRecord.tblQuizzesActivation4 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oqdRecord.tblQuizzesActivation4 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <select id="quizzes_activation5" name="activation5" class="ss-backend-field-droqdown01">
                                                <option value="1"${ oqdRecord.tblQuizzesActivation5 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oqdRecord.tblQuizzesActivation5 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
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
                                            <select id="quizzes_id_status" name="id_status" class="ss-backend-field-droqdown01">
                                                <option value="0"${ oqdRecord.tblQuizzesIdStatus == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsQuizzesStatusListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }"${ oqdRecord.tblQuizzesIdStatus == statusRow.id ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
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
                                        <textarea id="quizzes_notes" name="notes" class="ss-backend-field-text-area01">${ oqdRecord.tblQuizzesNotes_edit }</textarea>
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
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>

                    <input type="hidden" id="quizzes_id" name="id" value="${ oqdRecord.tblQuizzesID }" />
                    <input type="hidden" id="quizzes_id_type" name="id_type" value="${ oqdRecord.tblQuizzesIdType }" />
                    
                    <input type="hidden" id="quizzes_idParent" name="idParent" value="${ oqdRecord.tblQuizzesIdParent }" />
                    <input type="hidden" id="quizzes_idType" name="idType" value="${ oqdRecord.tblQuizzesIdType }" />
                    <input type="hidden" id="quizzes_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="quizzes_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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


    //Usage.
    //----------------------
    /*
    let ceBackend = new QuizzesEdit({
        idTbQuizzes: idTbQuizzes,

        masterPageSelect: masterPageSelect,

        messageSuccess: messageSuccess,
        messageError: messageError,
        messageAlert: messageAlert
    });


    //Build object data.
    await ceBackend.build();
    */
    //----------------------
};