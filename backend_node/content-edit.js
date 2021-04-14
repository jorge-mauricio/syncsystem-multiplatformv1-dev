"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class ContentEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbContent: idTbContent,

                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert,
                        }
        */


        //Properties.
        //----------------------
        this._idTbContent = objParameters.idTbContent;
        
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
        this.ocdRecord = "";
        this.ocdRecordParameters = {
            _arrSearchParameters: this.arrSearchParameters,
            _idTbContent: this._idTbContent,
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
            this.arrSearchParameters.push("id;" + this._idTbContent + ";i"); 


            //Build objects.
            this.ocdRecord = new SyncSystemNS.ObjectContentDetails(this.ocdRecordParameters);
            await this.ocdRecord.recordDetailsGet(0, 3);
            //console.log("this.ocdRecord=", this.ocdRecord);


            //Parent ID Records.
            if(gSystemConfig.enableContentIdParentEdit == 1)
            {
                //Check table of parent id.
                this.objParentTableLevel1 = await SyncSystemNS.FunctionsDB.tableFindGet(this.ocdRecord.tblContentIdParent);
                let objParentTableRecord;

                //Categories.
                if(this.objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories)
                {
                    this.objParentTable = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                            ["category_type;1;i"], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "", 
                                                                                            "id, title", 
                                                                                            1);

                    objParentTableRecord = this.objParentTable.filter((objRecordRow)=>{
                        return objRecordRow.id == this.ocdRecord.tblContentIdParent
                    });
                    this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(objParentTableRecord.title, "db");
                    //Debug.
                    console.log("objParentTableRecord=", objParentTableRecord);
                                                                        
                }

                //Publications.
                //["category_type;3;oi", "category_type;4;oi", "category_type;5;oi", "category_type;6;oi"]
                if(this.objParentTableLevel1.tableName == gSystemConfig.configSystemDBTablePublications)
                {
                    this.objParentTable = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTablePublications, 
                                                                                            [], 
                                                                                            gSystemConfig.configPublicationsSort, 
                                                                                            "", 
                                                                                            "id, title", 
                                                                                            1);

                    objParentTableRecord = this.objParentTable.filter((objRecordRow)=>{
                        return objRecordRow.id == this.ocdRecord.tblContentIdParent
                    })[0];
                    this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(objParentTableRecord.title, "db");
                    
                    //Debug.
                    //console.log("objParentTableRecord=", objParentTableRecord);
                    //console.log("objParentTableRecord.title=", objParentTableRecord[0].title);
                    //console.log("objParentTableRecord.title=", objParentTableRecord.title);
                }


                //Debug.
                //console.log("this.objParentTableLevel1=", this.objParentTableLevel1);
            }


            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            //if(this._pageNumber)
            //{
                //this.queryDefault += "&pageNumber=" + this._pageNumber;
            //}


            //Tittle - current.
            //this.titleCurrent = this.ocdRecord.tblContentContentText;


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleEdit");
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendContent + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbContent + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleEdit");

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
                ${ this.ocdRecord.tblContentFile != "" ? 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.ocdRecord.tblContentFile + "?v=" + this.cacheClear }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleEdit");
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
        let ocdRecord = this.ocdRecord;
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
                ${ /*Content.*/'' }
                ${ ocdRecord.tblContentContentType == 1 || ocdRecord.tblContentContentType == 2 || ocdRecord.tblContentContentType == 3 || ocdRecord.tblContentContentType == 4 || ocdRecord.tblContentContentType == 7 ?
                `
                    <form id="formContentEdit" name="formContentEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                        <input type="hidden" id="formContentEdit_method" name="_method" value="PUT">

                        <div style="position: relative; display: block; overflow: hidden;">
                            <script>
                                //Debug.
                                //webpackDebugTest(); //webpack debug

                            </script>

                            <table id="inputTableContent" class="ss-backend-table-input01">
                                <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentTitleTableEdit") } 
                                </caption>
                                <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                    
                                </thead>
                                <tbody class="ss-backend-table-listing-text01">
                                    ${ gSystemConfig.enableContentIdParentEdit == 1 ? 
                                    `
                                    <tr id="inputRowContent_id_parent" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                        </td>
                                        <td>
                                            ${ /*Categories | Publications.*/'' }
                                            ${ objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories || objParentTableLevel1.tableName == gSystemConfig.configSystemDBTablePublications ? 
                                            `
                                            <select id="content_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                                <!--option value="0"${ ocdRecord.tblFilesIdParent == 0 ? ` selected` : `` }>
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                                </option-->
                                                ${ objParentTable.map((recordRow)=>{
                                                    return `
                                                        <option value="${ recordRow.id }"${ ocdRecord.tblContentIdParent == recordRow.id ? ` selected` : `` }>
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                        </option>
                                                    `
                                                }) }
                                            </select>
                                            ` : ``
                                            }

                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_id_parent" name="id_parent" value="${ ocdRecord.tblContentIdParent }" />
                                    `
                                    }

                                    ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                    `
                                    <tr id="inputRowContent_sort_order" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="content_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ ocdRecord.tblContentSortOrder }" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("content_sort_order");
                                            </script>
                                        </td>
                                    </tr>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                    `
                                    <tr id="inputRowContent_id_register_user" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                        </td>
                                        <td>
                                            <select id="content_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                                <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_id_register_user" name="id_register_user" value="0" />
                                    `
                                    }

                                    <tr id="inputRowContent_content_type" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="content_type" value="1"${ ocdRecord.tblContentContentType == 1 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="content_type" value="2"${ ocdRecord.tblContentContentType == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="content_type" value="3"${ ocdRecord.tblContentContentType == 3 ? ` checked` : `` } checked class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="content_type" value="4"${ ocdRecord.tblContentContentType == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType4") }
                                            </label>

                                            ${ gSystemConfig.enableContentHTML == 1 ? 
                                            `
                                                <label class="ss-backend-field-radio-label-horizontal">
                                                    <input type="radio" name="content_type" value="7"${ ocdRecord.tblContentContentType == 7 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentType7") }
                                                </label>
                                            ` : ``
                                            }
                                        </td>
                                    </tr>

                                    <tr id="inputRowContent_align_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="3"${ ocdRecord.tblContentAlignText == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="2"${ ocdRecord.tblContentAlignText == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="1"${ ocdRecord.tblContentAlignText == 1 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="4"${ ocdRecord.tblContentAlignText == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                            </label>
                                        </td>
                                    </tr>
                                    
                                    <tr id="inputRowContent_content_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                        </td>
                                        <td>
                                            ${ /*No formatting*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? `
                                                <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                            ` : ``}


                                            ${ /*Quill*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 13 ? `
                                                <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
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
                                                <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    new FroalaEditor("#content_content_text");
                                                </script>
                                            ` : ``}


                                            ${ /*TinyMCE*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                                <textarea id="content_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    /*
                                                    tinymce.init({
                                                        selector: "#content_content_text",
                                                    });
                                                    */ /*working*/

                                                    tinyMCEBackendConfig.selector = "#content_content_text";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                            ` : ``}
                                        </td>
                                    </tr>

                                    <tr id="inputRowContent_activation" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                        </td>
                                        <td>
                                            <select id="content_activation" name="activation" class="ss-backend-field-dropdown01">
                                                <option value="1"${ ocdRecord.tblContentActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblContentActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
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
                        
                        <input type="hidden" id="content_id" name="id" value="${ ocdRecord.tblContentID }" />
                        <input type="hidden" id="content_content_columns" name="content_columns" value="${ ocdRecord.tblContentContentColumns }" />
                        <input type="hidden" id="content_align_image" name="align_image" value="${ ocdRecord.tblContentAlignImage }" />
                        <input type="hidden" id="content_file_config" name="file_config" value="${ ocdRecord.tblContentFileConfig }" />

                        <input type="hidden" id="content_idParent" name="idParent" value="${ ocdRecord.tblContentIdParent }" />
                        <input type="hidden" id="content_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                    </form>
                `:``
                }


                ${ /*Image.*/'' }
                ${ ocdRecord.tblContentContentType == 5 || ocdRecord.tblContentContentType == 9 ?
                `
                    <form id="formContentImageEdit" name="formContentImageEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                        <input type="hidden" id="formContentImage_method" name="_method" value="PUT">

                        <div style="position: relative; display: block; overflow: hidden;">
                            <script>
                                //Debug.
                                //webpackDebugTest(); //webpack debug

                            </script>

                            <table id="inputTableContentImage" class="ss-backend-table-input01">
                                <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageTitleTableEdit") } 
                                </caption>
                                <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                    
                                </thead>
                                <tbody class="ss-backend-table-listing-text01">
                                    ${ gSystemConfig.enableContentIdParentEdit == 1 ? 
                                    `
                                    <tr id="inputRowContentImage_id_parent" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                        </td>
                                        <td>
                                            ${ /*Categories | Publications.*/'' }
                                            ${ objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories || objParentTableLevel1.tableName == gSystemConfig.configSystemDBTablePublications ? 
                                            `
                                            <select id="content_image_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                                <!--option value="0"${ ocdRecord.tblContentIdParent == 0 ? ` selected` : `` }>
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                                </option-->
                                                ${ objParentTable.map((recordRow)=>{
                                                    return `
                                                        <option value="${ recordRow.id }"${ ocdRecord.tblContentIdParent == recordRow.id ? ` selected` : `` }>
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                        </option>
                                                    `
                                                }) }
                                            </select>
                                            ` : ``
                                            }
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_image_id_parent" name="id_parent" value="${ ocdRecord.tblContentIdParent }" />
                                    `
                                    }

                                    ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                    `
                                    <tr id="inputRowContentImage_sort_order" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="content_image_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ ocdRecord.tblContentSortOrder }" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("content_image_sort_order");
                                            </script>
                                        </td>
                                    </tr>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                    `
                                    <tr id="inputRowContentImage_id_register_user" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                        </td>
                                        <td>
                                            <select id="content_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                                <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_id_register_user" name="id_register_user" value="0" />
                                    `
                                    }

                                    <tr id="inputRowContentImage_align_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="3"${ ocdRecord.tblContentAlignText == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="2"${ ocdRecord.tblContentAlignText == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="1"${ ocdRecord.tblContentAlignText == 1 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="4"${ ocdRecord.tblContentAlignText == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                            </label>
                                        </td>
                                    </tr>
                                    
                                    <tr id="inputRowContentImage_align_image" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignImage") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="3"${ ocdRecord.tblContentAlignImage == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="2"${ ocdRecord.tblContentAlignImage == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="1"${ ocdRecord.tblContentAlignImage == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="4"${ ocdRecord.tblContentAlignImage == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                            </label>
                                        </td>
                                    </tr>

                                    ${ gSystemConfig.enableContentImageNoResize == 1 ? 
                                    `
                                    <tr id="inputRowContentImage_content_type" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageNoResize") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="content_type" value="9"${ ocdRecord.tblContentContentType == 9 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageNoResizeYes") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="content_type" value="5"${ ocdRecord.tblContentContentType == 5 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentImageNoResizeNo") }
                                            </label>
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_image_content_type" name="content_type" value="0" />
                                    `
                                    }

                                    <tr id="inputRowContentImage_content_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                        </td>
                                        <td>
                                            ${ /*No formatting*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? `
                                                <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                            ` : ``}


                                            ${ /*Quill*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 13 ? `
                                                <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                            ` : ``}


                                            ${ /*FroalaEditor*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 15 ? `
                                                <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    new FroalaEditor("#content_image_content_text");
                                                </script>
                                            ` : ``}


                                            ${ /*TinyMCE*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                                <textarea id="content_image_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    /*
                                                    tinymce.init({
                                                        selector: "#content_image_content_text",
                                                    });
                                                    */ /*working*/

                                                    tinyMCEBackendConfig.selector = "#content_image_content_text";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                            ` : ``}
                                        </td>
                                    </tr>

                                    ${ gSystemConfig.enableContentURL == 1 ? 
                                    `
                                    <tr id="inputRowContentImage_content_url" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentURL") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="content_image_content_url" name="content_url" class="ss-backend-field-text-area-url" maxlength="255" value="${ ocdRecord.tblContentContentURL }" />
                                        </td>
                                    </tr>
                                    ` : ``
                                    }

                                    <tr id="inputRowContentImage_caption" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentCaption") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="content_image_caption" name="caption" class="ss-backend-field-text01" maxlength="255" value="${ ocdRecord.tblContentCaption }" />
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentImage_file" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                        </td>
                                        <td>
                                            <input type="file" id="content_image_file" name="file" class="ss-backend-field-file-upload" />
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentImage_activation" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                        </td>
                                        <td>
                                            <select id="content_image_activation" name="activation" class="ss-backend-field-dropdown01">
                                                <option value="1"${ ocdRecord.tblContentActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblContentActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                                </tfoot>
                            </table>
                        </div>
                        <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                            <button id="content_image_update" name="content_image_update" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                            </button>

                            <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                            </a>
                        </div>

                        <input type="hidden" id="content_image_id" name="id" value="${ ocdRecord.tblContentID }" />
                        <input type="hidden" id="content_image_content_columns" name="content_columns" value="${ ocdRecord.tblContentContentColumns }" />
                        <input type="hidden" id="content_image_file_config" name="file_config" value="${ ocdRecord.tblContentFileConfig }" />
    
                        <input type="hidden" id="content_image_idParent" name="idParent" value="${ ocdRecord.tblContentIdParent }" />
                        <input type="hidden" id="content_image_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                    </form>
                `:``
                }


                ${ /*Video.*/'' }
                ${ ocdRecord.tblContentContentType == 6 ?
                `
                    <form id="formContentVideoEdit" name="formContentVideoEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                        <input type="hidden" id="formContentVideoEdit_method" name="_method" value="PUT">

                        <div style="position: relative; display: block; overflow: hidden;">
                            <script>
                                //Debug.
                                //webpackDebugTest(); //webpack debug

                            </script>

                            <table id="inputTableContentVideo" class="ss-backend-table-input01">
                                <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentVideoTitleTableEdit") } 
                                </caption>
                                <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                    
                                </thead>
                                <tbody class="ss-backend-table-listing-text01">
                                    ${ gSystemConfig.enableContentIdParentEdit == 1 ? 
                                    `
                                    <tr id="inputRowContentVideo_id_parent" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                        </td>
                                        <td>
                                            ${ /*Categories | Publications.*/'' }
                                            ${ objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories || objParentTableLevel1.tableName == gSystemConfig.configSystemDBTablePublications ? 
                                            `
                                            <select id="content_video_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                                <!--option value="0"${ ocdRecord.tblContentIdParent == 0 ? ` selected` : `` }>
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                                </option-->
                                                ${ objParentTable.map((recordRow)=>{
                                                    return `
                                                        <option value="${ recordRow.id }"${ ocdRecord.tblContentIdParent == recordRow.id ? ` selected` : `` }>
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                        </option>
                                                    `
                                                }) }
                                            </select>
                                            ` : ``
                                            }
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_video_id_parent" name="id_parent" value="${ ocdRecord.tblContentIdParent }" />
                                    `
                                    }
                                
                                    ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                    `
                                    <tr id="inputRowContentVideo_sort_order" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="content_video_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ ocdRecord.tblContentSortOrder }" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("content_video_sort_order");
                                            </script>
                                        </td>
                                    </tr>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                    `
                                    <tr id="inputRowContent_id_register_user" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                        </td>
                                        <td>
                                            <select id="content_video_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                                <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_video_id_register_user" name="id_register_user" value="0" />
                                    `
                                    }

                                    <tr id="inputRowContentVideo_align_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="3"${ ocdRecord.tblContentAlignText == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="2"${ ocdRecord.tblContentAlignText == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="1"${ ocdRecord.tblContentAlignText == 1 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="4"${ ocdRecord.tblContentAlignText == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                            </label>
                                        </td>
                                    </tr>
                                    
                                    <tr id="inputRowContentVideo_align_image" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignVideo") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="3"${ ocdRecord.tblContentAlignImage == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="2"${ ocdRecord.tblContentAlignImage == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="1"${ ocdRecord.tblContentAlignImage == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="4"${ ocdRecord.tblContentAlignImage == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                            </label>
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentVideo_content_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                        </td>
                                        <td>
                                            ${ /*No formatting*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? `
                                                <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                            ` : ``}


                                            ${ /*Quill*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 13 ? `
                                                <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                            ` : ``}


                                            ${ /*FroalaEditor*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 15 ? `
                                                <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    new FroalaEditor("#content_video_content_text");
                                                </script>
                                            ` : ``}


                                            ${ /*TinyMCE*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                                <textarea id="content_video_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    /*
                                                    tinymce.init({
                                                        selector: "#content_video_content_text",
                                                    });
                                                    */ /*working*/

                                                    tinyMCEBackendConfig.selector = "#content_video_content_text";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                            ` : ``}
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentVideo_caption" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentCaption") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="content_video_caption" name="caption" class="ss-backend-field-text01" maxlength="255" value="${ ocdRecord.tblContentCaption }" />
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentVideo_file_config" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label">
                                                <input type="radio" name="file_config" value="2"${ ocdRecord.tblContentFileConfig == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label">
                                                <input type="radio" name="file_config" value="4"${ ocdRecord.tblContentFileConfig == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay4") }
                                            </label>
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentVideo_file" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                        </td>
                                        <td>
                                            <input type="file" id="content_video_file" name="file" class="ss-backend-field-file-upload" />
                                        </td>
                                    </tr>

                                    ${ gSystemConfig.enableContentFileThumbnail == 1 ? 
                                    `
                                    <tr id="inputRowContentVideo_file_thumbnail" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentFileThumbnail") }: 
                                        </td>
                                        <td>
                                            <input type="file" id="content_video_file_thumbnail" name="file_thumbnail" class="ss-backend-field-file-upload" />
                                        </td>
                                    </tr>
                                    ` : ``
                                    }

                                    <tr id="inputRowContentVideo_activation" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                        </td>
                                        <td>
                                            <select id="content_video_activation" name="activation" class="ss-backend-field-dropdown01">
                                                <option value="1"${ ocdRecord.tblContentActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblContentActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
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

                        <input type="hidden" id="content_video_id" name="id" value="${ ocdRecord.tblContentID }" />
                        <input type="hidden" id="content_video_content_columns" name="content_columns" value="${ ocdRecord.tblContentContentColumns }" />
                        <input type="hidden" id="content_video_content_type" name="content_type" value="${ ocdRecord.tblContentContentType }" />
    
                        <input type="hidden" id="content_video_idParent" name="idParent" value="${ ocdRecord.tblContentIdParent }" />
                        <input type="hidden" id="content_video_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                    </form>
                `:``
                }


                ${ /*File.*/'' }
                ${ ocdRecord.tblContentContentType == 8 ?
                `
                    <form id="formContentFileEdit" name="formContentFileEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                        <input type="hidden" id="formContentFile_method" name="_method" value="PUT">

                        <div style="position: relative; display: block; overflow: hidden;">
                            <script>
                                //Debug.
                                //webpackDebugTest(); //webpack debug

                            </script>

                            <table id="inputTableContentFile" class="ss-backend-table-input01">
                                <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentFileTitleTableEdit") } 
                                </caption>
                                <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                    
                                </thead>
                                <tbody class="ss-backend-table-listing-text01">
                                    ${ gSystemConfig.enableContentIdParentEdit == 1 ? 
                                    `
                                    <tr id="inputRowContentVideo_id_parent" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                        </td>
                                        <td>
                                            ${ /*Categories | Publications.*/'' }
                                            ${ objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories || objParentTableLevel1.tableName == gSystemConfig.configSystemDBTablePublications ? 
                                            `
                                            <select id="content_file_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                                <!--option value="0"${ ocdRecord.tblContentIdParent == 0 ? ` selected` : `` }>
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                                </option-->
                                                ${ objParentTable.map((recordRow)=>{
                                                    return `
                                                        <option value="${ recordRow.id }"${ ocdRecord.tblContentIdParent == recordRow.id ? ` selected` : `` }>
                                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                        </option>
                                                    `
                                                }) }
                                            </select>
                                            ` : ``
                                            }
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_file_id_parent" name="id_parent" value="${ ocdRecord.tblContentIdParent }" />
                                    `
                                    }
                                
                                    ${ gSystemConfig.enableContentSortOrder == 1 ? 
                                    `
                                    <tr id="inputRowContentFile_sort_order" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                        </td>
                                        <td>
                                            <input type="text" id="content_file_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ ocdRecord.tblContentSortOrder }" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("content_file_sort_order");
                                            </script>
                                        </td>
                                    </tr>
                                    ` : ``
                                    }

                                    ${ gSystemConfig.enableContentBindRegisterUser == 1 ? 
                                    `
                                    <tr id="inputRowContentFile_id_register_user" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentRU") }: 
                                        </td>
                                        <td>
                                            <select id="content_file_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                                <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_file_id_register_user" name="id_register_user" value="0" />
                                    `
                                    }

                                    <tr id="inputRowContentFile_align_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignText") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="3"${ ocdRecord.tblContentAlignText == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="2"${ ocdRecord.tblContentAlignText == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="1"${ ocdRecord.tblContentAlignText == 1 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_text" value="4"${ ocdRecord.tblContentAlignText == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                            </label>
                                        </td>
                                    </tr>

                                    ${ gSystemConfig.enableContentFileThumbnail == 1 ? 
                                    `
                                    <tr id="inputRowContentFile_align_image" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlignImage") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="3"${ ocdRecord.tblContentAlignImage == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="2"${ ocdRecord.tblContentAlignImage == 2 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign2") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="1"${ ocdRecord.tblContentAlignImage == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign1") }
                                            </label>
                                            <label class="ss-backend-field-radio-label-horizontal">
                                                <input type="radio" name="align_image" value="4"${ ocdRecord.tblContentAlignImage == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentAlign4") }
                                            </label>
                                        </td>
                                    </tr>
                                    ` : `
                                    <input type="hidden" id="content_file_align_image" name="align_image" value="0" />
                                    `}

                                    <tr id="inputRowContentFile_content_text" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentText") }: 
                                        </td>
                                        <td>
                                            ${ /*No formatting*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? `
                                                <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                            ` : ``}


                                            ${ /*Quill*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 13 ? `
                                                <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                            ` : ``}


                                            ${ /*FroalaEditor*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 15 ? `
                                                <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    new FroalaEditor("#content_file_content_text");
                                                </script>
                                            ` : ``}


                                            ${ /*TinyMCE*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                                <textarea id="content_file_content_text" name="content_text" class="ss-backend-field-text-area01">${ ocdRecord.tblContentContentText_edit }</textarea>
                                                <script>
                                                    /*
                                                    tinymce.init({
                                                        selector: "#content_file_content_text",
                                                    });
                                                    */ /*working*/

                                                    tinyMCEBackendConfig.selector = "#content_file_content_text";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                            ` : ``}
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentFile_file_config" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay") }: 
                                        </td>
                                        <td>
                                            <label class="ss-backend-field-radio-label">
                                                <input type="radio" name="file_config" value="3"${ ocdRecord.tblContentFileConfig == 3 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay3") }
                                            </label>
                                            <label class="ss-backend-field-radio-label">
                                                <input type="radio" name="file_config" value="4"${ ocdRecord.tblContentFileConfig == 4 ? ` checked` : `` } class="ss-backend-field-radio" />
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay4") }
                                            </label>
                                        </td>
                                    </tr>

                                    <tr id="inputRowContentFile_file" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                        </td>
                                        <td>
                                            <input type="file" id="content_file_file" name="file" class="ss-backend-field-file-upload" />
                                        </td>
                                    </tr>

                                    ${ gSystemConfig.enableContentFileThumbnail == 1 ? 
                                    `
                                    <tr id="inputRowContentFile_file_thumbnail" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendContentFileThumbnail") }: 
                                        </td>
                                        <td>
                                            <input type="file" id="content_file_file_thumbnail" name="file_thumbnail" class="ss-backend-field-file-upload" />
                                        </td>
                                    </tr>
                                    ` : ``
                                    }

                                    <tr id="inputRowContentFile_activation" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                        </td>
                                        <td>
                                            <select id="content_file_activation" name="activation" class="ss-backend-field-dropdown01">
                                                <option value="1"${ ocdRecord.tblContentActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ ocdRecord.tblContentActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                                </tfoot>
                            </table>
                        </div>

                        <div style="position: relative; display: block; overflow: hidden; clear: both; margin-top: 2px;">
                            <button id="content_file_update" name="content_file_update" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                            </button>

                            <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                            </a>
                        </div>

                        <input type="hidden" id="content_file_id" name="id" value="${ ocdRecord.tblContentID }" />
                        <input type="hidden" id="content_file_content_columns" name="content_columns" value="${ ocdRecord.tblContentContentColumns }" />
                        <input type="hidden" id="content_file_content_type" name="content_type" value="${ ocdRecord.tblContentContentType }" />
    
                        <input type="hidden" id="content_file_idParent" name="idParent" value="${ ocdRecord.tblContentIdParent }" />
                        <input type="hidden" id="content_file_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                    </form>
                `:``
                }


                ${ /*Columns.*/'' }
                ${ ocdRecord.tblContentContentType == 10 ?
                `
                    File Edit
                `:``
                }
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
    let ceBackend = new ContentEdit({
        idTbContent: idTbContent,

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