"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class UsersEdit
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*objParameters = {
                            idTbProducts: idTbProducts,
                            pageNumber: pageNumber,
                            masterPageSelect: masterPageSelect,

                            messageSuccess: messageSuccess,
                            messageError: messageError,
                            messageAlert: messageAlert
                        };
        */


        //Properties.
        //----------------------
        this._idTbUsers = objParameters.idTbUsers;
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableUsersBackendPagination == 1)
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
        this.oudRecord = "";
        this.oudRecordParameters = {};

        this.arrFiltersGenericSearchParameters = [];
        this.ofglRecords = "";
        this.ofglRecordsParameters = {};

        this.resultsUsersTypeListing;
        this.resultsUsersStatusListing;
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
            this.arrSearchParameters.push("id;" + this._idTbUsers + ";i"); 

            this.oudRecordParameters = {
                _arrSearchParameters: this.arrSearchParameters,
                _idTbUsers: this._idTbUsers,
                _terminal: 0,
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            this.oudRecord = new SyncSystemNS.ObjectUsersDetails(this.oudRecordParameters);
            await this.oudRecord.recordDetailsGet(0, 3);
            //console.log("this.oudRecord=", this.oudRecord);


            //Parameters build.
            this.arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableUsers + ";s");

            this.ofglRecordsParameters = {
                _arrSearchParameters: this.arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            this.ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(this.ofglRecordsParameters);
            await this.ofglRecords.recordsListingGet(0, 3);

            
            //Filters - Type.
            if(gSystemConfig.enableUsersType != 0)
            {
                this.resultsUsersTypeListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 1;
                });
            }

            //Filters - Status.
            if(gSystemConfig.enableUsersStatus != 0)
            {
                this.resultsUsersStatusListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }

            
            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Tittle - current.
            this.titleCurrent = this.oudRecord.tblUsersNameFull;


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleEdit");
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendUsers + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbUsers + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleEdit");

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
                ${ this.oudRecord.tblUsersImageMain != "" ? 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/t" + this.oudRecord.tblUsersImageMain }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleEdit");
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
        let oudRecord = this.oudRecord;
        let objParentTableLevel1 = this.objParentTableLevel1;
        let objParentTable = this.objParentTable;

        let resultsUsersTypeListing = this.resultsUsersTypeListing;
        let resultsUsersStatusListing = this.resultsUsersStatusListing;


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
                <form id="formUsersEdit" name="formUsersEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formUsersEdit_method" name="_method" value="PUT">

                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configUsersInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_users" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersTitleTableEdit") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableUsersSortOrder == 1 ? 
                                `
                                <tr id="inputRowUsers_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ oudRecord.tblUsersSortOrder_print }" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("users_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersNameFull == 1 ? 
                                `
                                <tr id="inputRowUsers_name_full" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameFull") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_name_full" name="name_full" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersNameFull }" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersNameFirst == 1 ? 
                                `
                                <tr id="inputRowUsers_name_first" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameFirst") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_name_first" name="name_first" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersNameFirst }" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersNameLast == 1 ? 
                                `
                                <tr id="inputRowUsers_name_last" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersNameLast") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_name_last" name="name_last" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersNameLast }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersDateBirth != 0 ? 
                                `
                                <tr id="inputRowUsers_date_birth" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDateBirth") }: 
                                    </td>
                                    <td>
                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.enableUsersDateBirth == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="users_birth_day_day" name="birth_day_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ oudRecord.tblUsersDateBirthDateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_birth_day_month" name="birth_day_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ oudRecord.tblUsersDateBirthDateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_birth_day_year" name="birth_day_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ oudRecord.tblUsersDateBirthDateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="users_birth_day_month" name="birth_day_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ oudRecord.tblUsersDateBirthDateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_birth_day_day" name="birth_day_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ oudRecord.tblUsersDateBirthDateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="users_birth_day_year" name="birth_day_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ oudRecord.tblUsersDateBirthDateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.enableUsersDateBirth == 11 ? 
                                            `
                                            <input type="text" id="users_date_birth" name="date_birth" class="ss-backend-field-date01" autocomplete="off" value="${ oudRecord.tblUsersDateBirth_print }" />
                                            <script>
                                                const dpDateBirth = datepicker("#users_date_birth", jsDatepickerBirthBackendConfigOptions);
                                            </script>
                                            ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersGender == 1 ? 
                                `
                                <tr id="inputRowUsers_gender" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender"${ oudRecord.tblUsersGender == 0 ? ` checked` : `` } value="0" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender0") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender"${ oudRecord.tblUsersGender == 1 ? ` checked` : `` } value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender"${ oudRecord.tblUsersGender == 2 ? ` checked` : `` } value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender2") }
                                        </label>
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersDocument == 1 ? 
                                `
                                <tr id="inputRowUsers_document" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersDocument") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_document" name="document" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersDocument }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersAddress == 1 ? 
                                `
                                <tr id="inputRowUsers_address_street" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressStreet") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_address_street" name="address_street" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersAddressStreet }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_address_number" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressNumber") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_address_number" name="address_number" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersAddressNumber }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_address_complement" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressComplement") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_address_complement" name="address_complement" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersAddressComplement }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_neighborhood" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressNeighborhood") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_neighborhood" name="neighborhood" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersNeighborhood }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_district" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressDistrict") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_district" name="district" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersDistrict }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_county" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCounty") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_county" name="county" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersCounty }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_city" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCity") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_city" name="city" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersCity }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_state" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressState") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_state" name="state" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersState }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_country" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCountry") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_country" name="country" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersCountry }" />
                                    </td>
                                </tr>

                                <tr id="inputRowUsers_zip_code" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressZipCode") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_zip_code" name="zip_code" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersZipCode }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersPhone1 == 1 ? 
                                `
                                <tr id="inputRowUsers_phone1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersPhone1") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableUsersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="users_phone1_international_code" name="phone1_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="${ oudRecord.tblUsersPhone1InternationalCode }" />
                                        ` : ``
                                        }
                                        (<input type="text" id="users_phone1_area_code" name="phone1_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="${ oudRecord.tblUsersPhone1AreaCode }" />)
                                        <input type="text" id="users_phone1" name="phone1" class="ss-backend-field-tel01" maxlength="255" value="${ oudRecord.tblUsersPhone1 }" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersPhone2 == 1 ? 
                                `
                                <tr id="inputRowUsers_phone2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersPhone2") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableUsersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="users_phone2_international_code" name="phone2_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="${ oudRecord.tblUsersPhone2InternationalCode }" />
                                        ` : ``
                                        }
                                        (<input type="text" id="users_phone2_area_code" name="phone2_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="${ oudRecord.tblUsersPhone2AreaCode }" />)
                                        <input type="text" id="users_phone2" name="phone2" class="ss-backend-field-tel01" maxlength="255" value="${ oudRecord.tblUsersPhone2 }" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableUsersPhone3 == 1 ? 
                                `
                                <tr id="inputRowUsers_phone3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersPhone3") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableUsersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="users_phone3_international_code" name="phone3_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="${ oudRecord.tblUsersPhone3InternationalCode }" />
                                        ` : ``
                                        }
                                        (<input type="text" id="users_phone3_area_code" name="phone3_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="${ oudRecord.tblUsersPhone3AreaCode }" />)
                                        <input type="text" id="users_phone3" name="phone3" class="ss-backend-field-tel01" maxlength="255" value="${ oudRecord.tblUsersPhone3 }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersUsername == 1 ? 
                                `
                                <tr id="inputRowUsers_username" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersUsername") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_username" name="username" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersUsername }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersEmail == 1 ? 
                                `
                                <tr id="inputRowUsers_email" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEmail") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="users_email" name="email" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersEmail }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowUsers_password" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemPassword") }: 
                                    </td>
                                    <td>
                                        ${ /*TODO: check if show password is on.*/'' }
                                        <input type="text" id="users_password" name="password" class="ss-backend-field-text01" maxlength="255" value="${ oudRecord.tblUsersPassword_edit }" />
                                    </td>
                                </tr>

                                ${ /*Information fields.*/'' }
                                ${ gSystemConfig.enableUsersInfo1 == 1 ? 
                                `
                                <tr id="inputRowUsers_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info1" name="info1" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info1" name="info1" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info1" name="info1" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo1_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info1" name="info1" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="products_info1" name="info1" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo1_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo2 == 1 ? 
                                `
                                <tr id="inputRowUsers_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info2" name="info2" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info2" name="info2" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info2" name="info2" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo2_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info2" name="info2" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="products_info2" name="info2" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo2_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo3 == 1 ? 
                                `
                                <tr id="inputRowUsers_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info3" name="info3" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info3" name="info3" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info3" name="info3" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo3_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info3" name="info3" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="products_info3" name="info3" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo3_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo4 == 1 ? 
                                `
                                <tr id="inputRowUsers_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info4" name="info4" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info4" name="info4" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info4" name="info4" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo4_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info4" name="info4" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="products_info4" name="info4" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo4_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo5 == 1 ? 
                                `
                                <tr id="inputRowUsers_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info5" name="info5" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info5" name="info5" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info5" name="info5" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo5_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info5" name="info5" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="products_info5" name="info5" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo5_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo6 == 1 ? 
                                `
                                <tr id="inputRowUsers_info6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info6" name="info6" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info6" name="info6" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo6_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info6" name="info6" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo6_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info6";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info6" name="info6" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo6FieldType == 12 ? 
                                        `
                                            <textarea id="products_info6" name="info6" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo6_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo7 == 1 ? 
                                `
                                <tr id="inputRowUsers_info7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info7" name="info7" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info7" name="info7" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo7_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info7" name="info7" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo7_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info7";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info7" name="info7" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo7FieldType == 12 ? 
                                        `
                                            <textarea id="products_info7" name="info7" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo7_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo8 == 1 ? 
                                `
                                <tr id="inputRowUsers_info8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info8" name="info8" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info8" name="info8" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo8_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info8" name="info8" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo8_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info8";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info8" name="info8" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo8FieldType == 12 ? 
                                        `
                                            <textarea id="products_info8" name="info8" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo8_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo9 == 1 ? 
                                `
                                <tr id="inputRowUsers_info9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info9" name="info9" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info9" name="info9" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo9_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info9" name="info9" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo9_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info9";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info9" name="info9" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo9FieldType == 12 ? 
                                        `
                                            <textarea id="products_info9" name="info9" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo9_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersInfo10 == 1 ? 
                                `
                                <tr id="inputRowUsers_info10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersInfo10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info10" name="info10" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info10" name="info10" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo10_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info10" name="info10" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo10_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info10";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info10" name="info10" class="ss-backend-field-text01" value="${ oudRecord.tblUsersInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configUsersInfo10FieldType == 12 ? 
                                        `
                                            <textarea id="products_info10" name="info10" class="ss-backend-field-text-area01">${ oudRecord.tblUsersInfo10_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableUsersImageMain == 1 ? 
                                `
                                <tr id="inputRowUsers_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="users_image_main" name="image_main" class="ss-backend-field-file-upload" />

                                        ${ oudRecord.tblUsersImageMain != "" ? 
                                        `
                                        <img id="imgUsersImageMain" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + oudRecord.tblUsersImageMain }" alt="${ oudRecord.tblUsersTitle }" class="ss-backend-images-edit" />
                                        <div id="divUsersImageMainDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ oudRecord.tblUsersID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTableUsers }', 
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
                                                                                    htmlGenericStyle01('imgUsersImageMain', 'display', 'none');
                                                                                    htmlGenericStyle01('divUsersImageMainDelete', 'display', 'none');

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

                                <tr id="inputRowUsers_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="users_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1"${ oudRecord.tblUsersActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ oudRecord.tblUsersActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableUsersActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1"${ oudRecord.tblUsersActivation1 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oudRecord.tblUsersActivation1 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1"${ oudRecord.tblUsersActivation2 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oudRecord.tblUsersActivation2 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1"${ oudRecord.tblUsersActivation3 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oudRecord.tblUsersActivation3 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1"${ oudRecord.tblUsersActivation4 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oudRecord.tblUsersActivation4 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowUsers_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendUsersActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="users_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1"${ oudRecord.tblUsersActivation5 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ oudRecord.tblUsersActivation5 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableUsersNotes == 1 ? 
                                `
                                <tr id="inputRowUsers_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="users_notes" name="notes" class="ss-backend-field-text-area01">${ oudRecord.tblUsersNotes_edit }</textarea>
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
                        <button id="users_include" name="users_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>

                    <input type="hidden" id="users_id" name="id" value="${ oudRecord.tblUsersID }" />
                    <input type="hidden" id="users_id_parent" name="id_parent" value="${ oudRecord.tblUsersIdParent }" />
                    <input type="hidden" id="users_id_type" name="id_type" value="${ oudRecord.tblUsersIdType }" />
                    <input type="hidden" id="users_name_title" name="name_title" value="${ oudRecord.tblUsersNameTitle }" />
                    <input type="hidden" id="users_id_status" name="id_status" value="${ oudRecord.tblUsersIdStatus }" />

                    <input type="hidden" id="users_idParent" name="idParent" value="${ oudRecord.tblUsersIdParent }" />
                    <input type="hidden" id="users_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="users_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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