"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class FilesDetails
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idTbFiles: 123, 
                            pageNumber: "", 
                            masterPageSelect: "", 

                            messageError: "", 
                            messageSuccess: "", 
                            messageAlert: "", 
                            nRecords: ""
                        }
        */


        //Properties.
        //----------------------
        this._idTbFiles = objParameters.idTbFiles;
        
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableCategoriesBackendPagination == 1)
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
        //this._nRecords = objParameters.nRecords;

        this.queryDefault = "";

        //this.contentType = "categories-default"; //categories-default | 

        this.cphTitle = ""; //text
        this.cphHead = ""; //HTML
        this.cphTitleCurrent = ""; //text
        //this.cphBody = "html body"; 
        //this.cphBody = this.cphBodyBuild(); //HTML
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

        this.arrSearchParameters = [];
        this.ofdRecord = "";
        this.ofdRecordParameters = {
            _arrSearchParameters: this.arrSearchParameters,
            _idTbFiles: this._idTbFiles,
            _terminal: 0,
            _objSpecialParameters: {returnType: 3}
        };
        //----------------------

        /*
        (async function(){ 
            try{
                //cphBody = await this.cphBodyBuild();
                await this.cphBodyBuild();
            }catch(asyncError){
                console.error(asyncError);
            }finally{
                
            }
        })();
        */
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
            //console.log("this.ofdRecord = ", this.ofdRecord);


            //Parent ID Records.
            //if(gSystemConfig.enableFilesIdParentEdit == 1)
            //{
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
            //}


            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            /*
            request({url:url, qs:propertiesObject}, function(err, response, body) {
                if(err) { console.log(err); return; }
                console.log("Get response: " + response.statusCode);
              });
              */


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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleDetails");

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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleDetails");
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
        let strReturn = "";
        let backendHTML = "";
        //let arrSearchParameters = [];
        //let arrFiltersGenericSearchParameters = [];


        //Parameters build.
        //arrSearchParameters.push("id;" + this._idTbCategories + ";i");
        //arrSearchParameters.push("activation;1;i");


        //let ocdRecord = "";
        /*let ocdRecordParameters = {
            _arrSearchParameters: arrSearchParameters,
            _terminal: 0,
            _objSpecialParameters: {returnType: 3}
        };*/
        /*
        let oclRecordsParameters = {
            _arrSearchParameters: ["id_parent;0;i", "activation;1;i"],
            _configSortOrder: gSystemConfig.configCategoriesSort,
            _strNRecords: "5",
            _objSpecialParameters: {}
        };*/ //working (debug)


        //arrSearchParameters.push("table_name;" + "categories" + ";s");

        //let ofglRecords = "";
        /*let ofglRecordsParameters = {
            _arrSearchParameters: arrFiltersGenericSearchParameters,
            _configSortOrder: "title",
            _strNRecords: "",
            _objSpecialParameters: {returnType: 3}
        };*/


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
                    /*"ocdRecord.resultsCategoryDetails=" + SyncSystemNS.FunctionsFiles.fileDelete02("f5625.pdf") + "<br />" +*/
                    /*"ocdRecord.resultsCategoryDetails=" + SyncSystemNS.FunctionsFiles.fileDelete02("612.jpg", "", gSystemConfig.configArrDefaultImageSize) + "<br />" +*/
                    /*"ocdRecord.resultsCategoryDetails=" + SyncSystemNS.FunctionsGeneric.removeHTML01("<a href='teste.html'>Teste com link</a>") + "<br />" +*/
                    /*"ocdRecord.tblCategoriesID=" + ocdRecord.tblCategoriesID + "<br />" +*/
                    /*"ocdRecord.resultsCategoryDetails=" + ocdRecord.resultsCategoryDetails + "<br />" +*/
                    /*"JSON.stringify(ocdRecord.resultsCategoryDetails)=" + JSON.stringify(ocdRecord.resultsCategoryDetails) + "<br />" +*/
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

            
            <section class="ss-backend-layout-section-form01" style="width: 100%;">
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
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesTitleTableDetails") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
    
                            <tbody class="ss-backend-table-listing-text01">
                                <tr id="inputRowFiles_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        ${ objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories ? 
                                        `
                                            ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(objParentTableLevel1.tableData[0].title, "db") }
                                        ` : ``
                                        }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFilesSortOrder == 1 ? 
                                `
                                <tr id="inputRowFiles_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        ${ ofdRecord.tblFilesSortOrder_print }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ ofdRecord.tblFilesFileType == 2 || ofdRecord.tblFilesFileType == 3 || ofdRecord.tblFilesFileType == 4 ? 
                                `
                                <tr id="inputRowFiles_file_config" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDisplay") }: 
                                    </td>
                                    <td>
                                        ${ ofdRecord.tblFilesFileConfig_print }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*File Duration.*/'' }
                                ${ ofdRecord.tblFilesFileType == 2 ? 
                                    `
                                <tr id="inputRowFiles_duration" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFileDuration") }: 
                                    </td>
                                    <td>
                                        ${ ofdRecord.tblFilesFileDuration_print }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*File Dimensions.*/'' }
                                ${ ofdRecord.tblFilesFileType == 5 ? 
                                `
                                <tr id="inputRowFiles_duration" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesFileDimensions") }: 
                                    </td>
                                    <td>
                                        ${ ofdRecord.tblFilesFileDimensions_print }
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
                                        ${ ofdRecord.tblFilesTitle }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowFiles_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesCaption") }: 
                                    </td>
                                    <td>
                                        ${ ofdRecord.tblFilesCaption }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFilesDescription == 1 ? 
                                `
                                <tr id="inputRowFiles_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesDescription") }: 
                                    </td>
                                    <td>
                                        ${ ofdRecord.tblFilesDescription }
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
                                        ${ /*TODO: parse HTML.*/'' }
                                        ${ ofdRecord.tblFilesHTMLCode }
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
                                        ${ ofdRecord.tblFilesURLAlias }
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
                                        ${ ofdRecord.tblFilesKeywordsTags }
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
                                        ${ ofdRecord.tblFilesMetaDescription }
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
                                        ${ ofdRecord.tblFilesInfo1 }
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
                                        ${ ofdRecord.tblFilesInfo2 }
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
                                        ${ ofdRecord.tblFilesInfo3 }
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
                                        ${ ofdRecord.tblFilesInfo4 }
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
                                        ${ ofdRecord.tblFilesInfo5 }
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
                                        ${ ofdRecord.tblFilesInfoSmall1 }
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
                                        ${ ofdRecord.tblFilesInfoSmall2 }
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
                                        ${ ofdRecord.tblFilesInfoSmall3 }
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
                                        ${ ofdRecord.tblFilesInfoSmall4 }
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
                                        ${ ofdRecord.tblFilesInfoSmall5 }
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
                                        ${ ofdRecord.tblFilesNumber1_print }
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
                                        ${ ofdRecord.tblFilesNumber2_print }
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
                                        ${ ofdRecord.tblFilesNumber3_print }
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
                                        ${ ofdRecord.tblFilesNumber4_print }
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
                                        ${ ofdRecord.tblFilesNumber5_print }
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
                                        ${ ofdRecord.tblFilesNumberSmall1_print }
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
                                        ${ ofdRecord.tblFilesNumberSmall2_print }
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
                                        ${ ofdRecord.tblFilesNumberSmall3_print }
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
                                        ${ ofdRecord.tblFilesNumberSmall4_print }
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
                                        ${ ofdRecord.tblFilesNumberSmall5_print }
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
                                            ${ ofdRecord.tblFilesDate1_print }
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
                                            ${ ofdRecord.tblFilesDate2_print }
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
                                            ${ ofdRecord.tblFilesDate3_print }
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
                                            ${ ofdRecord.tblFilesDate4_print }
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
                                            ${ ofdRecord.tblFilesDate5_print }
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                <tr id="inputRowFiles_file" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFile") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        ${ ofdRecord.tblFilesFile != "" ? 
                                        `
                                            <img id="imgFilesFile" 
                                                src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFile + "?v=" + this.cacheClear }" 
                                                alt="${ ofdRecord.tblCategoriesTitle }" 
                                                class="ss-backend-images-details" 
                                            />
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
                                        ${ ofdRecord.tblFilesFileThumbnail != "" ? 
                                        `
                                            <img id="imgFilesFileThumbnail" 
                                                src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + ofdRecord.tblFilesFileThumbnail + "?v=" + this.cacheClear }" 
                                                alt="${ ofdRecord.tblCategoriesTitle }" 
                                                class="ss-backend-images-details" 
                                            />
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
                                        ${ ofdRecord.tblFilesActivation_print }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableFilesActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowFiles_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendFilesActivation1") }: 
                                        </td>
                                        <td>
                                            ${ ofdRecord.tblFilesActivation1_print }
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
                                            ${ ofdRecord.tblFilesActivation2_print }
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
                                            ${ ofdRecord.tblFilesActivation3_print }
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
                                            ${ ofdRecord.tblFilesActivation4_print }
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
                                            ${ ofdRecord.tblFilesActivation5_print }
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
                                        ${ ofdRecord.tblFilesNotes }
                                    </td>
                                </tr>
                                ` : ``
                                }
                            </tbody>

                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01">

                            </tfoot>
                        </table>
                    </div>
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
    let fdBackend = new FilesDetails({
        idTbFiles: idTbFiles,
        pageNumber: pageNumber,
        masterPageSelect: masterPageSelect,

        messageSuccess: messageSuccess,
        messageError: messageError,
        messageAlert: messageAlert
    });

    //Build object data.
    await fdBackend.build();
    */
   //----------------------
};