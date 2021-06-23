"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class PublicationsEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbPublications: idTbPublications,
                            idType: idType,

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
        this._idTbPublications = objParameters.idTbPublications;
        this._idType = objParameters.idType;

        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enablePublicationsBackendPagination == 1)
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
        this.opdRecord = "";
        this.opdRecordParameters = {};

        this.arrFiltersGenericSearchParameters = [];
        this.ofglRecords = "";
        this.ofglRecordsParameters = {};

        this.resultsPublicationsFiltersGeneric1Listing;
        this.resultsPublicationsFiltersGeneric2Listing;
        this.resultsPublicationsFiltersGeneric3Listing;
        this.resultsPublicationsFiltersGeneric4Listing;
        this.resultsPublicationsFiltersGeneric5Listing;
        this.resultsPublicationsFiltersGeneric6Listing;
        this.resultsPublicationsFiltersGeneric7Listing;
        this.resultsPublicationsFiltersGeneric8Listing;
        this.resultsPublicationsFiltersGeneric9Listing;
        this.resultsPublicationsFiltersGeneric10Listing;

        //this.resultsPublicationsTypeListing;
        this.resultsPublicationsStatusListing;
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
            this.arrSearchParameters.push("id;" + this._idTbPublications + ";i"); 

            this.opdRecordParameters = {
                _arrSearchParameters: this.arrSearchParameters,
                _idTbPublications: this._idTbPublications,
                _terminal: 0,
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            this.opdRecord = new SyncSystemNS.ObjectPublicationsDetails(this.opdRecordParameters);
            await this.opdRecord.recordDetailsGet(0, 3);
            //console.log("this.opdRecord=", this.opdRecord);


            //Parameters build.
            this.arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTablePublications + ";s");

            this.ofglRecordsParameters = {
                _arrSearchParameters: this.arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            this.ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(this.ofglRecordsParameters);
            await this.ofglRecords.recordsListingGet(0, 3);

            
            //Filters - Type.
            /*
            if(gSystemConfig.enablePublicationsType != 0)
            {
                this.resultsPublicationsTypeListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 1;
                });
            }
            */

            //Filters - Status.
            if(gSystemConfig.enablePublicationsStatus != 0)
            {
                this.resultsPublicationsStatusListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }

            //Filter results acording to filter_index.
            if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
            {
                this.resultsPublicationsFiltersGeneric1Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
            {
                this.resultsPublicationsFiltersGeneric2Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 102;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric3 != 0)
            {
                this.resultsPublicationsFiltersGeneric3Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 103;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric4 != 0)
            {
                this.resultsPublicationsFiltersGeneric4Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 104;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric5 != 0)
            {
                this.resultsPublicationsFiltersGeneric5Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 105;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric6 != 0)
            {
                this.resultsPublicationsFiltersGeneric6Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 106;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric7 != 0)
            {
                this.resultsPublicationsFiltersGeneric7Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 107;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric8 != 0)
            {
                this.resultsPublicationsFiltersGeneric8Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 108;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric9 != 0)
            {
                this.resultsPublicationsFiltersGeneric9Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 109;
                });
            }
            if(gSystemConfig.enablePublicationsFilterGeneric10 != 0)
            {
                this.resultsPublicationsFiltersGeneric10Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 110;
                });
            }
            
            
            //Parent ID Records.
            if(gSystemConfig.enablePublicationsIdParentEdit == 1)
            {



                //Check table of parent id.
                this.objParentTableLevel1 = await SyncSystemNS.FunctionsDB.tableFindGet(this.opdRecord.tblPublicationsIdParent);

                //Categories.
                if(this.objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories)
                {
                    //Category type / publication type.
                    let objParentTableLevel1CategoryType = 0;
                    if(this.opdRecord.tblPublicationsIdType != "" && this.opdRecord.tblPublicationsIdType !== null && this.opdRecord.tblPublicationsIdType !== undefined)
                    {
                        switch(this.opdRecord.tblPublicationsIdType)
                        {
                            case 1:
                                objParentTableLevel1CategoryType = "3";
                                break;
                            case 2:
                                objParentTableLevel1CategoryType = "4";
                                break;
                            case 3:
                                objParentTableLevel1CategoryType = "5";
                                break;
                            case 4:
                                objParentTableLevel1CategoryType = "6";
                        }


                        //Debug.
                        //console.log("objParentTableLevel1CategoryType=", objParentTableLevel1CategoryType); 
                        //console.log("this.objParentTable.tableData[0].category_type = ", this.objParentTable.tableData[0].category_type);
                    }


                    this.objParentTable = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                            //["category_type;3;i"], 
                                                                                            ["category_type;" + objParentTableLevel1CategoryType + ";i"], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "", 
                                                                                            "id, title", 
                                                                                            1);
                }


                //Debug.
                //console.log("this.objParentTableLevel1=", this.objParentTableLevel1);
                //console.log("this.opdRecord.tblPublicationsIdType=", this.opdRecord.tblPublicationsIdType);
            }


            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Tittle - current.
            this.titleCurrent = this.opdRecord.tblPublicationsTitle;


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsTitleEdit");
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendPublications + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbPublications + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsTitleEdit");

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
                ${ this.opdRecord.tblPublicationsImageMain != "" ? 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/t" + this.opdRecord.tblPublicationsImageMain + "?v=" + this.cacheClear }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsTitleEdit");
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
        let opdRecord = this.opdRecord;
        let objParentTableLevel1 = this.objParentTableLevel1;
        let objParentTable = this.objParentTable;

        let resultsPublicationsFiltersGeneric1Listing = this.resultsPublicationsFiltersGeneric1Listing;
        let resultsPublicationsFiltersGeneric2Listing = this.resultsPublicationsFiltersGeneric2Listing;
        let resultsPublicationsFiltersGeneric3Listing = this.resultsPublicationsFiltersGeneric3Listing;
        let resultsPublicationsFiltersGeneric4Listing = this.resultsPublicationsFiltersGeneric4Listing;
        let resultsPublicationsFiltersGeneric5Listing = this.resultsPublicationsFiltersGeneric5Listing;
        let resultsPublicationsFiltersGeneric6Listing = this.resultsPublicationsFiltersGeneric6Listing;
        let resultsPublicationsFiltersGeneric7Listing = this.resultsPublicationsFiltersGeneric7Listing;
        let resultsPublicationsFiltersGeneric8Listing = this.resultsPublicationsFiltersGeneric8Listing;
        let resultsPublicationsFiltersGeneric9Listing = this.resultsPublicationsFiltersGeneric9Listing;
        let resultsPublicationsFiltersGeneric10Listing = this.resultsPublicationsFiltersGeneric10Listing;

        //let resultsPublicationsTypeListing = this.resultsPublicationsTypeListing;
        let resultsPublicationsStatusListing = this.resultsPublicationsStatusListing;


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
                    /*"opdRecord.arrIdsCategoriesFiltersGenericBinding=" + opdRecord.arrIdsCategoriesFiltersGenericBinding + "<br />" +*/
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
                <form id="formPublicationsEdit" name="formPublicationsEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendPublications + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formPublicationsEdit_method" name="_method" value="PUT">

                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configPublicationsInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_publications" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsTitleTableEdit") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enablePublicationsIdParentEdit == 1 ? 
                                `
                                <tr id="inputRowPublications_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        ${ /*TODO: Convert to ajax.*/'' }
                                        <select id="publications_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                            <option value="0"${ opdRecord.tblPublicationsIdParent == 0 ? ` selected` : `` }>
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                            </option>
                                            ${ objParentTable.map((recordRow)=>{
                                                return `
                                                    <option value="${ recordRow.id }"${ opdRecord.tblPublicationsIdParent == recordRow.id ? ` selected` : `` }>
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                    </option>
                                                `
                                            }) }
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="publications_id_parent" name="id_parent" value="${ opdRecord.tblPublicationsIdParent }" />
                                `
                                }

                                ${ gSystemConfig.enablePublicationsSortOrder == 1 ? 
                                `
                                <tr id="inputRowPublications_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="publications_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ opdRecord.tblPublicationsSortOrder_print }" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("publications_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowPublications_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsRU") }: 
                                    </td>
                                    <td>
                                        <select id="publications_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="publications_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                ${ gSystemConfig.enablePublicationsDateStart != 1 ? 
                                `
                                <tr id="inputRowPublications_date_start" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDataStart") }: 
                                    </td>
                                    <td>
                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.enablePublicationsDateStart == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    ${  /*Debug.*/
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                        ''
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                    }
                                                    <select id="publications_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateStartDateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateStartDateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDateStartDateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="publications_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateStartDateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateStartDateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDateStartDateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.enablePublicationsDateStart == 11 ? 
                                            `
                                            <input type="text" id="publications_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblPublicationsDateStart_print }" />
                                            <script>
                                                const dpDateStart = datepicker("#publications_date1", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateStartType == 1 || gSystemConfig.configPublicationsDateStartType == 2 | gSystemConfig.configPublicationsDateStartType == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateStartType == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateStartType == 5 || gSystemConfig.configPublicationsDateStartType == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateStartType == 6 || gSystemConfig.configPublicationsDateStartType == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                                //$("#date1").datepicker();


                                                //Debug.
                                                //alert(jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBaseBackendConfigOptions=", jsDatepickerBaseBackendConfigOptions);
                                                //console.log("jsDatepickerGenericBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBirthBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerTaskBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerHistoryBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configPublicationsDateStartType == 2 || gSystemConfig.configPublicationsDateStartType == 3 || gSystemConfig.configPublicationsDateStartType == 55 || gSystemConfig.configPublicationsDateStartType == 66 ? 
                                            `
                                             - 
                                            <select id="publications_date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDateStartDateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="publications_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDateStartDateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configPublicationsDateStartType == 2 ? 
                                                `
                                                :
                                                <select id="publications_date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configPublicationsDateStartType}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblPublicationsDateStartDateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enablePublicationsDateEnd != 1 ? 
                                `
                                <tr id="inputRowPublications_code" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDataEnd") }: 
                                    </td>
                                    <td>
                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.enablePublicationsDateEnd == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    ${  /*Debug.*/
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                        ''
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                    }
                                                    <select id="publications_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateEndDateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateEndDateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDateEndDateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="publications_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateEndDateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDateEndDateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDateEndDateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.enablePublicationsDateEnd == 11 ? 
                                            `
                                            <input type="text" id="publications_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblPublicationsDateEnd_print }" />
                                            <script>
                                                const dpDateEnd = datepicker("#publications_date1", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateEndType == 1 || gSystemConfig.configPublicationsDateEndType == 2 | gSystemConfig.configPublicationsDateEndType == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateEndType == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateEndType == 5 || gSystemConfig.configPublicationsDateEndType == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDateEndType == 6 || gSystemConfig.configPublicationsDateEndType == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                                //$("#date1").datepicker();


                                                //Debug.
                                                //alert(jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBaseBackendConfigOptions=", jsDatepickerBaseBackendConfigOptions);
                                                //console.log("jsDatepickerGenericBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBirthBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerTaskBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerHistoryBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configPublicationsDateEndType == 2 || gSystemConfig.configPublicationsDateEndType == 3 || gSystemConfig.configPublicationsDateEndType == 55 || gSystemConfig.configPublicationsDateEndType == 66 ? 
                                            `
                                             - 
                                            <select id="publications_date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDateEndDateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="publications_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDateEndDateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configPublicationsDateEndType == 2 ? 
                                                `
                                                :
                                                <select id="publications_date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configPublicationsDateEndType}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblPublicationsDateEndDateSecond == arrayRow ? ' selected' : ``}
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

                                <tr id="inputRowPublications_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="publications_title" name="title" class="ss-backend-field-text01" maxlength="255" value="${ opdRecord.tblPublicationsTitle }" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enablePublicationsDescription == 1 ? 
                                `
                                <tr id="inputRowPublications_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDescription") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="publications_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsDescription_edit }</textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="publications_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsDescription_edit }</textarea>
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
                                            <textarea id="publications_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsDescription_edit }</textarea>
                                            <script>
                                                new FroalaEditor("#publications_description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="publications_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsDescription_edit }</textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#publications_description",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#publications_description";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                         ` : ``}
                                     </td>
                                </tr>
                                ` : ``
                                }


                                ${ gSystemConfig.configPublicationsURLAlias == 1 ? 
                                `
                                <tr id="inputRowPublications_url_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="publications_url_alias" name="url_alias" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsURLAlias }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsKeywordsTags == 1 ? 
                                `
                                <tr id="inputRowPublications_keywords_tags" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsKeywordsTags }</textarea>
                                        <div>
                                            (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywordsInstruction01") })
                                        </div>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enablePublicationsMetaDescription == 1 ? 
                                `
                                <tr id="inputRowPublications_meta_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_meta_description" name="meta_description" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsMetaDescription_edit }</textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsMetaTitle == 1 ? 
                                `
                                <tr id="inputRowPublications_meta_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="publications_meta_title" name="meta_title" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsMetaTitle }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Generic filters.*/'' }
                                ${ gSystemConfig.enablePublicationsFilterGeneric1 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric1") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric1 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric1Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric1" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric1Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric1 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric1" name="idsPublicationsFiltersGeneric1" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric1Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric1Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric1 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric1" name="idsPublicationsFiltersGeneric1" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric1Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric1Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric1Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric1 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric1Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric1" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric1Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric2 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric2") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric2 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric2Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric2" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric2Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric2 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric2" name="idsPublicationsFiltersGeneric2" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric2Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric2Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric2 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric2" name="idsPublicationsFiltersGeneric2" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric2Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric2Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric2Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric2 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric2Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric2" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric2Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric3 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric3") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric3 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric3Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric3" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric3Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric3 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric3" name="idsPublicationsFiltersGeneric3" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric3Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric3Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric3 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric3" name="idsPublicationsFiltersGeneric3" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric3Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric3Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric3Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric3 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric3Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric3" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric3Binding.includes("0") ? ` selected` : `` } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric4 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric4") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric4 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric4Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric4" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric4Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric4 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric4" name="idsPublicationsFiltersGeneric4" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric4Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric4Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric4 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric4" name="idsPublicationsFiltersGeneric4" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric4Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric4Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric4Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric4 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric4Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric4" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric4Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric5 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric5") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric5 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric5Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric5" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric5Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric5 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric5" name="idsPublicationsFiltersGeneric5" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric5Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric5Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric5 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric5" name="idsPublicationsFiltersGeneric5" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric5Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric5Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric5Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric5 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric5Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric5" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric5Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric6 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric6") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric6 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric6Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric6" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric6Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric6 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric6" name="idsPublicationsFiltersGeneric6" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric6Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric6Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric6 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric6" name="idsPublicationsFiltersGeneric6" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric6Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric6Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric6Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric6 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric6Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric6" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric6Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric7 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric7") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric7 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric7Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric7" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric7Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric7 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric7" name="idsPublicationsFiltersGeneric7" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric7Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric7Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric7 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric7" name="idsPublicationsFiltersGeneric7" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric7Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric7Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric7Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric7 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric7Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric7" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric7Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric8 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric8") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric8 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric8Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric8" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric8Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric8 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric8" name="idsPublicationsFiltersGeneric8" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric8Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric8Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric8 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric8" name="idsPublicationsFiltersGeneric8" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric8Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric8Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric8 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric8Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric8" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric8Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric9 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric9") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric9 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric9Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric9" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric9Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric9 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric9" name="idsPublicationsFiltersGeneric9" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric9Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric9Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric9 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric9" name="idsPublicationsFiltersGeneric9" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsPublicationsFiltersGeneric9Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric9Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric9Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric9 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric9Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric9" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric9Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsFilterGeneric10 != 0 ? 
                                `
                                <tr id="inputRowPublications_generic_filter10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFilterGeneric10") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric10 == 1 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric10Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsPublicationsFiltersGeneric10" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric10Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric10 == 2 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric10" name="idsPublicationsFiltersGeneric10" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsPublicationsFiltersGeneric10Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric10Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric10 == 3 ? 
                                        `
                                            <select id="idsPublicationsFiltersGeneric10" name="idsPublicationsFiltersGeneric10" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsFiltersGeneric10Listing.map((publicationsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric10Binding.includes(publicationsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enablePublicationsFilterGeneric10 == 4 ? 
                                        `
                                            ${resultsPublicationsFiltersGeneric10Listing.map((publicationsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsPublicationsFiltersGeneric10" value="${ publicationsFiltersGenericRow.id }"${ opdRecord.arrIdsPublicationsFiltersGeneric10Binding.includes(publicationsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }
                                
                                ${ /*Information fields.*/'' }
                                ${ gSystemConfig.enablePublicationsInfo1 == 1 ? 
                                `
                                <tr id="inputRowPublications_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info1" name="info1" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info1" name="info1" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info1" name="info1" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo1_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info1" name="info1" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info1" name="info1" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo1_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo2 == 1 ? 
                                `
                                <tr id="inputRowPublications_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info2" name="info2" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info2" name="info2" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info2" name="info2" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo2_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info2" name="info2" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info2" name="info2" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo2_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo3 == 1 ? 
                                `
                                <tr id="inputRowPublications_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info3" name="info3" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info3" name="info3" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info3" name="info3" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo3_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info3" name="info3" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info3" name="info3" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo3_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo4 == 1 ? 
                                `
                                <tr id="inputRowPublications_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info4" name="info4" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info4" name="info4" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info4" name="info4" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo4_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info4" name="info4" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info4" name="info4" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo4_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo5 == 1 ? 
                                `
                                <tr id="inputRowPublications_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info5" name="info5" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info5" name="info5" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info5" name="info5" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo5_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info5" name="info5" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info5" name="info5" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo5_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo6 == 1 ? 
                                `
                                <tr id="inputRowPublications_info6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo6FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info6" name="info6" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info6" name="info6" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo6_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info6" name="info6" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo6_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info6";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo6FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info6" name="info6" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo6FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info6" name="info6" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo6_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo7 == 1 ? 
                                `
                                <tr id="inputRowPublications_info7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo7FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info7" name="info7" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info7" name="info7" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo7_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info7" name="info7" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo7_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info7";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo7FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info7" name="info7" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo7FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info7" name="info7" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo7_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo8 == 1 ? 
                                `
                                <tr id="inputRowPublications_info8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo8FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info8" name="info8" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info8" name="info8" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo8_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info8" name="info8" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo8_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info8";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo8FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info8" name="info8" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo8FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info8" name="info8" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo8_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo9 == 1 ? 
                                `
                                <tr id="inputRowPublications_info9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo9FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info9" name="info9" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info9" name="info9" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo9_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info9" name="info9" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo9_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info9";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo9FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info9" name="info9" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo9FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info9" name="info9" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo9_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsInfo10 == 1 ? 
                                `
                                <tr id="inputRowPublications_info10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsInfo10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo10FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_info10" name="info10" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configPublicationsInfo10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="publications_info10" name="info10" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo10_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="publications_info10" name="info10" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo10_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#publications_info10";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo10FieldType == 11 ? 
                                        `
                                            <input type="text" id="publications_info10" name="info10" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configPublicationsInfo10FieldType == 12 ? 
                                        `
                                            <textarea id="publications_info10" name="info10" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsInfo10_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsSource == 1 ? 
                                `
                                <tr id="inputRowPublications_source" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsSource") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="publications_source" name="source" class="ss-backend-field-text01" maxlength="255" value="${ opdRecord.tblPublicationsSource }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsSourceURL == 1 ? 
                                `
                                <tr id="inputRowPublications_source_url" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsSourceURL") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_source_url" name="source_url" class="ss-backend-field-text-area-url">${ opdRecord.tblPublicationsSourceURL_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                
                                ${ /*Number fields.*/'' }
                                ${ gSystemConfig.enablePublicationsNumber1 == 1 ? 
                                `
                                <tr id="inputRowPublications_number1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsNumber1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber1FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_number1" name="number1" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("publications_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber1FieldType == 2 || gSystemConfig.configPublicationsNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="publications_number1" name="number1" class="ss-backend-field-currency01" value="${ opdRecord.tblPublicationsNumber1_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("publications_number1")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("publications_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="publications_number1" name="number1" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("publications_number1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsNumber2 == 1 ? 
                                `
                                <tr id="inputRowPublications_number2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsNumber2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber2FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_number2" name="number2" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("publications_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber2FieldType == 2 || gSystemConfig.configPublicationsNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="publications_number2" name="number2" class="ss-backend-field-currency01" value="${ opdRecord.tblPublicationsNumber2_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("publications_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("publications_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="publications_number2" name="number2" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("publications_number2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsNumber3 == 1 ? 
                                `
                                <tr id="inputRowPublications_number3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsNumber3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber3FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_number3" name="number3" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("publications_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber3FieldType == 2 || gSystemConfig.configPublicationsNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="publications_number3" name="number3" class="ss-backend-field-currency01" value="${ opdRecord.tblPublicationsNumber3_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("publications_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("publications_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="publications_number3" name="number3" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("publications_number3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsNumber4 == 1 ? 
                                `
                                <tr id="inputRowPublications_number4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsNumber4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber4FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_number4" name="number4" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("publications_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber4FieldType == 2 || gSystemConfig.configPublicationsNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="publications_number4" name="number4" class="ss-backend-field-currency01" value="${ opdRecord.tblPublicationsNumber4_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("publications_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("publications_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="publications_number4" name="number4" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("publications_number4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsNumber5 == 1 ? 
                                `
                                <tr id="inputRowPublications_number5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsNumber5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber5FieldType == 1 ? 
                                        `
                                            <input type="text" id="publications_number5" name="number5" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("publications_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber5FieldType == 2 || gSystemConfig.configPublicationsNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="publications_number5" name="number5" class="ss-backend-field-currency01" value="${ opdRecord.tblPublicationsNumber5_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("publications_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("publications_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configPublicationsNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="publications_number5" name="number5" class="ss-backend-field-numeric02" value="${ opdRecord.tblPublicationsNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("publications_number5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*URL fields.*/'' }
                                ${ gSystemConfig.enablePublicationsURL1 != 1 ? 
                                `
                                <tr id="inputRowPublications_url1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsURL1") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_url1" name="url1" class="ss-backend-field-text-area-url">${ opdRecord.tblPublicationsURL1_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsURL2 != 1 ? 
                                `
                                <tr id="inputRowPublications_url2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsURL2") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_url2" name="url2" class="ss-backend-field-text-area-url">${ opdRecord.tblPublicationsURL2_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsURL3 != 1 ? 
                                `
                                <tr id="inputRowPublications_url3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsURL3") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_url3" name="url3" class="ss-backend-field-text-area-url">${ opdRecord.tblPublicationsURL3_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsURL4 != 1 ? 
                                `
                                <tr id="inputRowPublications_url4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsURL4") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_url4" name="url4" class="ss-backend-field-text-area-url">${ opdRecord.tblPublicationsURL4_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsURL5 != 1 ? 
                                `
                                <tr id="inputRowPublications_url5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsURL5") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_url5" name="url5" class="ss-backend-field-text-area-url">${ opdRecord.tblPublicationsURL5_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsDate1 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_date1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDate1") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configPublicationsDate1FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    ${  /*Debug.*/
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                        ''
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                    }
                                                    <select id="publications_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate1DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="publications_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate1DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configPublicationsDate1FieldType == 11 ? 
                                            `
                                            <input type="text" id="publications_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblPublicationsDate1_print }" />
                                            <script>
                                                const dpDate1 = datepicker("#publications_date1", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate1Type == 1 || gSystemConfig.configPublicationsDate1Type == 2 | gSystemConfig.configPublicationsDate1Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate1Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate1Type == 5 || gSystemConfig.configPublicationsDate1Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate1Type == 6 || gSystemConfig.configPublicationsDate1Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                                //$("#date1").datepicker();


                                                //Debug.
                                                //alert(jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBaseBackendConfigOptions=", jsDatepickerBaseBackendConfigOptions);
                                                //console.log("jsDatepickerGenericBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerBirthBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerTaskBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                                //console.log("jsDatepickerHistoryBackendConfigOptions=", jsDatepickerGenericBackendConfigOptions);
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configPublicationsDate1Type == 2 || gSystemConfig.configPublicationsDate1Type == 3 || gSystemConfig.configPublicationsDate1Type == 55 || gSystemConfig.configPublicationsDate1Type == 66 ? 
                                            `
                                             - 
                                            <select id="publications_date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate1DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="publications_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate1DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configPublicationsDate1Type == 2 ? 
                                                `
                                                :
                                                <select id="publications_date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configPublicationsDate1Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblPublicationsDate1DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enablePublicationsDate2 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_date2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDate2") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configPublicationsDate2FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="publications_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate2DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="publications_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate2DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configPublicationsDate2FieldType == 11 ? 
                                            `
                                            <input type="text" id="publications_date2" name="date2" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblPublicationsDate2_print }" />
                                            <script>
                                                const dpDate2 = datepicker("#publications_date2", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate2Type == 1 || gSystemConfig.configPublicationsDate2Type == 2 | gSystemConfig.configPublicationsDate2Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate2Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate2Type == 5 || gSystemConfig.configPublicationsDate2Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate2Type == 6 || gSystemConfig.configPublicationsDate2Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configPublicationsDate2Type == 2 || gSystemConfig.configPublicationsDate2Type == 3 || gSystemConfig.configPublicationsDate2Type == 55 || gSystemConfig.configPublicationsDate2Type == 66 ? 
                                            `
                                             - 
                                            <select id="publications_date2_hour" name="date2_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate2DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="publications_date2_minute" name="date2_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate2DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configPublicationsDate2Type == 2 ? 
                                                `
                                                :
                                                <select id="publications_date2_seconds" name="date2_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configPublicationsDate2Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblPublicationsDate2DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enablePublicationsDate3 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_date3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDate3") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configPublicationsDate3FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="publications_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate3DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="publications_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate3DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configPublicationsDate3FieldType == 11 ? 
                                            `
                                            <input type="text" id="publications_date3" name="date3" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblPublicationsDate3_print }" />
                                            <script>
                                                const dpDate3 = datepicker("#publications_date3", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate3Type == 1 || gSystemConfig.configPublicationsDate3Type == 2 | gSystemConfig.configPublicationsDate3Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate3Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate3Type == 5 || gSystemConfig.configPublicationsDate3Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate3Type == 6 || gSystemConfig.configPublicationsDate3Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configPublicationsDate3Type == 2 || gSystemConfig.configPublicationsDate3Type == 3 || gSystemConfig.configPublicationsDate3Type == 55 || gSystemConfig.configPublicationsDate3Type == 66 ? 
                                            `
                                             - 
                                            <select id="publications_date3_hour" name="date3_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate3DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="publications_date3_minute" name="date3_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate3DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configPublicationsDate3Type == 2 ? 
                                                `
                                                :
                                                <select id="publications_date3_seconds" name="date3_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configPublicationsDate3Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblPublicationsDate3DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enablePublicationsDate4 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_date4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDate4") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configPublicationsDate4FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="publications_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate4DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="publications_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate4DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configPublicationsDate4FieldType == 11 ? 
                                            `
                                            <input type="text" id="publications_date4" name="date4" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblPublicationsDate4_print }" />
                                            <script>
                                                const dpDate4 = datepicker("#publications_date4", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate4Type == 1 || gSystemConfig.configPublicationsDate4Type == 2 | gSystemConfig.configPublicationsDate4Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate4Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate4Type == 5 || gSystemConfig.configPublicationsDate4Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate4Type == 6 || gSystemConfig.configPublicationsDate4Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configPublicationsDate4Type == 2 || gSystemConfig.configPublicationsDate4Type == 3 || gSystemConfig.configPublicationsDate4Type == 55 || gSystemConfig.configPublicationsDate4Type == 66 ? 
                                            `
                                             - 
                                            <select id="publications_date4_hour" name="date4_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate4DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="publications_date4_minute" name="date4_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate4DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configPublicationsDate4Type == 2 ? 
                                                `
                                                :
                                                <select id="publications_date4_seconds" name="date4_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configPublicationsDate4Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblPublicationsDate4DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enablePublicationsDate5 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_date5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsDate5") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configPublicationsDate5FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="publications_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate5DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="publications_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblPublicationsDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="publications_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblPublicationsDate5DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configPublicationsDate5FieldType == 11 ? 
                                            `
                                            <input type="text" id="publications_date5" name="date5" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblPublicationsDate5_print }" />
                                            <script>
                                                const dpDate5 = datepicker("#publications_date5", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate5Type == 1 || gSystemConfig.configPublicationsDate5Type == 2 | gSystemConfig.configPublicationsDate5Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate5Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate5Type == 5 || gSystemConfig.configPublicationsDate5Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configPublicationsDate5Type == 6 || gSystemConfig.configPublicationsDate5Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configPublicationsDate5Type == 2 || gSystemConfig.configPublicationsDate5Type == 3 || gSystemConfig.configPublicationsDate5Type == 55 || gSystemConfig.configPublicationsDate5Type == 66 ? 
                                            `
                                             - 
                                            <select id="publications_date5_hour" name="date5_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate5DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="publications_date5_minute" name="date5_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblPublicationsDate5DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configPublicationsDate5Type == 2 ? 
                                                `
                                                :
                                                <select id="publications_date5_seconds" name="date5_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configPublicationsDate5Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblPublicationsDate5DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enablePublicationsImageMain == 1 ? 
                                `
                                <tr id="inputRowPublications_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="publications_image_main" name="image_main" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblPublicationsImageMain != "" ? 
                                        `
                                        <img id="imgPublicationsImageMain" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblPublicationsImageMain + "?v=" + this.cacheClear }" alt="${ opdRecord.tblPublicationsTitle }" class="ss-backend-images-edit" />
                                        <div id="divPublicationsImageMainDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ opdRecord.tblPublicationsID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTablePublications }', 
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
                                                                                    htmlGenericStyle01('imgPublicationsImageMain', 'display', 'none');
                                                                                    htmlGenericStyle01('divPublicationsImageMainDelete', 'display', 'none');

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
                                ${ gSystemConfig.enablePublicationsImageMainCaption == 1 ? 
                                `
                                <tr id="inputRowPublications_image_main_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="publications_image_main_caption" name="image_main_caption" class="ss-backend-field-text01" value="${ opdRecord.tblPublicationsImageMainCaption }" />
                                    </td>
                                </tr>
                                ` : ``
                                }                                

                                ${ gSystemConfig.enablePublicationsFile1 == 1 ? 
                                `
                                <tr id="inputRowPublications_file1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFile1") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="publications_file1" name="file1" class="ss-backend-field-file-upload" />
                                        ${ opdRecord.tblPublicationsFile1 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configPublicationsFile1Type == 1 ? 
                                            `
                                                <img id="imgPublicationsFile1" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblPublicationsFile1 }" alt="${ opdRecord.tblPublicationsFile1 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile1Type == 3 ? 
                                            `
                                                <a id="imgPublicationsFile1" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile1Type == 34 ? 
                                            `
                                                <a id="imgPublicationsFile1" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divPublicationsFile1Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblPublicationsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTablePublications }', 
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
                                                                                        htmlGenericStyle01('imgPublicationsFile1', 'display', 'none');
                                                                                        htmlGenericStyle01('divPublicationsFile1Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configPublicationsFile1Type == 1 ? 
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

                                ${ gSystemConfig.enablePublicationsFile2 == 1 ? 
                                `
                                <tr id="inputRowPublications_file2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFile2") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="publications_file2" name="file2" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblPublicationsFile2 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configPublicationsFile2Type == 1 ? 
                                            `
                                                <img id="imgPublicationsFile2" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblPublicationsFile2 }" alt="${ opdRecord.tblPublicationsFile2 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile2Type == 3 ? 
                                            `
                                                <a id="imgPublicationsFile2" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile2Type == 34 ? 
                                            `
                                                <a id="imgPublicationsFile2" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divPublicationsFile2Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblPublicationsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTablePublications }', 
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
                                                                                        htmlGenericStyle01('imgPublicationsFile2', 'display', 'none');
                                                                                        htmlGenericStyle01('divPublicationsFile2Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configPublicationsFile2Type == 1 ? 
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

                                ${ gSystemConfig.enablePublicationsFile3 == 1 ? 
                                `
                                <tr id="inputRowPublications_file3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFile3") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="publications_file3" name="file3" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblPublicationsFile3 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configPublicationsFile3Type == 1 ? 
                                            `
                                                <img id="imgPublicationsFile3" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblPublicationsFile3 }" alt="${ opdRecord.tblPublicationsFile3 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile3Type == 3 ? 
                                            `
                                                <a id="imgPublicationsFile3" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile3Type == 34 ? 
                                            `
                                                <a id="imgPublicationsFile3" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divPublicationsFile3Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblPublicationsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTablePublications }', 
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
                                                                                        htmlGenericStyle01('imgPublicationsFile3', 'display', 'none');
                                                                                        htmlGenericStyle01('divPublicationsFile3Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configPublicationsFile3Type == 1 ? 
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

                                ${ gSystemConfig.enablePublicationsFile4 == 1 ? 
                                `
                                <tr id="inputRowPublications_file4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFile4") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="publications_file4" name="file4" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblPublicationsFile4 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configPublicationsFile4Type == 1 ? 
                                            `
                                                <img id="imgPublicationsFile4" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblPublicationsFile4 }" alt="${ opdRecord.tblPublicationsFile4 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile4Type == 3 ? 
                                            `
                                                <a id="imgPublicationsFile4" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile4Type == 34 ? 
                                            `
                                                <a id="imgPublicationsFile4" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divPublicationsFile4Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblPublicationsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTablePublications }', 
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
                                                                                        htmlGenericStyle01('imgPublicationsFile4', 'display', 'none');
                                                                                        htmlGenericStyle01('divPublicationsFile4Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configPublicationsFile4Type == 1 ? 
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

                                ${ gSystemConfig.enablePublicationsFile5 == 1 ? 
                                `
                                <tr id="inputRowPublications_file5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsFile5") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="publications_file5" name="file5" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblPublicationsFile5 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configPublicationsFile5Type == 1 ? 
                                            `
                                                <img id="imgPublicationsFile5" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblPublicationsFile5 }" alt="${ opdRecord.tblPublicationsFile5 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile5Type == 3 ? 
                                            `
                                                <a id="imgPublicationsFile5" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configPublicationsFile5Type == 34 ? 
                                            `
                                                <a id="imgPublicationsFile5" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblPublicationsFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblPublicationsFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divPublicationsFile5Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblPublicationsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTablePublications }', 
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
                                                                                        htmlGenericStyle01('imgPublicationsFile5', 'display', 'none');
                                                                                        htmlGenericStyle01('divPublicationsFile5Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configPublicationsFile5Type == 1 ? 
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

                                <tr id="inputRowPublications_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="publications_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1"${ opdRecord.tblPublicationsActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ opdRecord.tblPublicationsActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                        ${ /*opdRecord.tblPublicationsActivation_print*/ '' }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enablePublicationsActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="publications_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblPublicationsActivation1 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblPublicationsActivation1 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="publications_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblPublicationsActivation2 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblPublicationsActivation2 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="publications_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblPublicationsActivation3 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblPublicationsActivation3 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="publications_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblPublicationsActivation4 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblPublicationsActivation4 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowPublications_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="publications_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblPublicationsActivation5 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblPublicationsActivation5 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsStatus == 1 ? 
                                    `
                                    <tr id="inputRowPublications_id_status" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPublicationsStatus") }: 
                                        </td>
                                        <td>
                                            <select id="publications_id_status" name="id_status" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.tblPublicationsIdStatus == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsPublicationsStatusListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }"${ opdRecord.tblPublicationsIdStatus == statusRow.id ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enablePublicationsRestrictedAccess == 1 ? 
                                `
                                <tr id="inputRowPublications_id_restricted_access" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess") }: 
                                    </td>
                                    <td>
                                        <select id="publications_restricted_access" name="restricted_access" class="ss-backend-field-dropdown01">
                                            <option value="0"${ opdRecord.tblPublicationsRestrictedAccess == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0") }</option>
                                            <option value="1"${ opdRecord.tblPublicationsRestrictedAccess == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enablePublicationsNotes == 1 ? 
                                `
                                <tr id="inputRowPublications_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="publications_notes" name="notes" class="ss-backend-field-text-area01">${ opdRecord.tblPublicationsNotes_edit }</textarea>
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
                        <button id="publications_include" name="publications_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>

                    <input type="hidden" id="publications_id" name="id" value="${ opdRecord.tblPublicationsID }" />
                    <input type="hidden" id="publications_id_type" name="id_type" value="${ opdRecord.tblPublicationsIdType }" />
                    
                    <input type="hidden" id="publications_idParent" name="idParent" value="${ opdRecord.tblPublicationsIdParent }" />
                    <input type="hidden" id="publications_idType" name="idType" value="${ opdRecord.tblPublicationsIdType }" />
                    <input type="hidden" id="publications_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="publications_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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
    let peBackend = new PublicationsEdit({
        idTbPublications: idTbPublications,

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