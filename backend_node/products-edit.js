"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class ProductsEdit
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
        this._idTbProducts = objParameters.idTbProducts;
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableProductsBackendPagination == 1)
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

        this.resultsProductsFiltersGeneric1Listing;
        this.resultsProductsFiltersGeneric2Listing;
        this.resultsProductsFiltersGeneric3Listing;
        this.resultsProductsFiltersGeneric4Listing;
        this.resultsProductsFiltersGeneric5Listing;
        this.resultsProductsFiltersGeneric6Listing;
        this.resultsProductsFiltersGeneric7Listing;
        this.resultsProductsFiltersGeneric8Listing;
        this.resultsProductsFiltersGeneric9Listing;
        this.resultsProductsFiltersGeneric10Listing;
        this.resultsProductsFiltersGeneric11Listing;
        this.resultsProductsFiltersGeneric12Listing;
        this.resultsProductsFiltersGeneric13Listing;
        this.resultsProductsFiltersGeneric14Listing;
        this.resultsProductsFiltersGeneric15Listing;
        this.resultsProductsFiltersGeneric16Listing;
        this.resultsProductsFiltersGeneric17Listing;
        this.resultsProductsFiltersGeneric18Listing;
        this.resultsProductsFiltersGeneric19Listing;
        this.resultsProductsFiltersGeneric20Listing;
        this.resultsProductsFiltersGeneric21Listing;
        this.resultsProductsFiltersGeneric22Listing;
        this.resultsProductsFiltersGeneric23Listing;
        this.resultsProductsFiltersGeneric24Listing;
        this.resultsProductsFiltersGeneric25Listing;
        this.resultsProductsFiltersGeneric26Listing;
        this.resultsProductsFiltersGeneric27Listing;
        this.resultsProductsFiltersGeneric28Listing;
        this.resultsProductsFiltersGeneric29Listing;
        this.resultsProductsFiltersGeneric30Listing;

        this.resultsProductsTypeListing;
        this.resultsProductsStatusListing;
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
            this.arrSearchParameters.push("id;" + this._idTbProducts + ";i"); 

            this.opdRecordParameters = {
                _arrSearchParameters: this.arrSearchParameters,
                _idTbProducts: this._idTbProducts,
                _terminal: 0,
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            this.opdRecord = new SyncSystemNS.ObjectProductsDetails(this.opdRecordParameters);
            await this.opdRecord.recordDetailsGet(0, 3);
            //console.log("this.opdRecord=", this.opdRecord);


            //Parameters build.
            this.arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableProducts + ";s");

            this.ofglRecordsParameters = {
                _arrSearchParameters: this.arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            this.ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(this.ofglRecordsParameters);
            await this.ofglRecords.recordsListingGet(0, 3);

            
            //Filters - Type.
            if(gSystemConfig.enableProductsType != 0)
            {
                this.resultsProductsTypeListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 1;
                });
            }

            //Filters - Status.
            if(gSystemConfig.enableProductsStatus != 0)
            {
                this.resultsProductsStatusListing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }

            //Filter results acording to filter_index.
            if(gSystemConfig.enableProductsFilterGeneric1 != 0)
            {
                this.resultsProductsFiltersGeneric1Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric2 != 0)
            {
                this.resultsProductsFiltersGeneric2Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 102;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric3 != 0)
            {
                this.resultsProductsFiltersGeneric3Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 103;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric4 != 0)
            {
                this.resultsProductsFiltersGeneric4Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 104;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric5 != 0)
            {
                this.resultsProductsFiltersGeneric5Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 105;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric6 != 0)
            {
                this.resultsProductsFiltersGeneric6Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 106;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric7 != 0)
            {
                this.resultsProductsFiltersGeneric7Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 107;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric8 != 0)
            {
                this.resultsProductsFiltersGeneric8Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 108;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric9 != 0)
            {
                this.resultsProductsFiltersGeneric9Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 109;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric10 != 0)
            {
                this.resultsProductsFiltersGeneric10Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 110;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric11 != 0)
            {
                this.resultsProductsFiltersGeneric11Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 111;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric12 != 0)
            {
                this.resultsProductsFiltersGeneric12Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 112;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric13 != 0)
            {
                this.resultsProductsFiltersGeneric13Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 113;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric14 != 0)
            {
                this.resultsProductsFiltersGeneric14Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 114;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric15 != 0)
            {
                this.resultsProductsFiltersGeneric15Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 115;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric16 != 0)
            {
                this.resultsProductsFiltersGeneric16Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 116;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric17 != 0)
            {
                this.resultsProductsFiltersGeneric17Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 117;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric18 != 0)
            {
                this.resultsProductsFiltersGeneric18Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 118;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric19 != 0)
            {
                this.resultsProductsFiltersGeneric19Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 119;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric20 != 0)
            {
                this.resultsProductsFiltersGeneric20Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 120;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric21 != 0)
            {
                this.resultsProductsFiltersGeneric21Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 121;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric22 != 0)
            {
                this.resultsProductsFiltersGeneric22Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 122;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric23 != 0)
            {
                this.resultsProductsFiltersGeneric23Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 123;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric24 != 0)
            {
                this.resultsProductsFiltersGeneric24Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 124;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric25 != 0)
            {
                this.resultsProductsFiltersGeneric25Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 125;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric26 != 0)
            {
                this.resultsProductsFiltersGeneric26Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 126;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric27 != 0)
            {
                this.resultsProductsFiltersGeneric27Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 127;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric28 != 0)
            {
                this.resultsProductsFiltersGeneric28Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 128;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric29 != 0)
            {
                this.resultsProductsFiltersGeneric29Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 129;
                });
            }
            if(gSystemConfig.enableProductsFilterGeneric30 != 0)
            {
                this.resultsProductsFiltersGeneric30Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 130;
                });
            }
            
            
            //Parent ID Records.
            if(gSystemConfig.enableProductsIdParentEdit == 1)
            {
                //Check table of parent id.
                this.objParentTableLevel1 = await SyncSystemNS.FunctionsDB.tableFindGet(this.opdRecord.tblProductsIdParent);

                //Categories.
                if(this.objParentTableLevel1.tableName == gSystemConfig.configSystemDBTableCategories)
                {
                    this.objParentTable = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                            ["category_type;2;i"], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "", 
                                                                                            "id, title", 
                                                                                            1);
                }


                //Debug.
                //console.log("this.objParentTableLevel1=", this.objParentTableLevel1);
            }


            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Tittle - current.
            this.titleCurrent = this.opdRecord.tblProductsTitle;


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsTitleEdit");
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
            this.metaURLCurrent += gSystemConfig.configRouteBackendProducts + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendActionEdit + "/";
            this.metaURLCurrent += this._idTbProducts + "/";

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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsTitleEdit");

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
                ${ this.opdRecord.tblProductsImageMain != "" ? 
                    `
                        <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/t" + this.opdRecord.tblProductsImageMain + "?v=" + this.cacheClear }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsTitleEdit");
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

        let resultsProductsFiltersGeneric1Listing = this.resultsProductsFiltersGeneric1Listing;
        let resultsProductsFiltersGeneric2Listing = this.resultsProductsFiltersGeneric2Listing;
        let resultsProductsFiltersGeneric3Listing = this.resultsProductsFiltersGeneric3Listing;
        let resultsProductsFiltersGeneric4Listing = this.resultsProductsFiltersGeneric4Listing;
        let resultsProductsFiltersGeneric5Listing = this.resultsProductsFiltersGeneric5Listing;
        let resultsProductsFiltersGeneric6Listing = this.resultsProductsFiltersGeneric6Listing;
        let resultsProductsFiltersGeneric7Listing = this.resultsProductsFiltersGeneric7Listing;
        let resultsProductsFiltersGeneric8Listing = this.resultsProductsFiltersGeneric8Listing;
        let resultsProductsFiltersGeneric9Listing = this.resultsProductsFiltersGeneric9Listing;
        let resultsProductsFiltersGeneric10Listing = this.resultsProductsFiltersGeneric10Listing;
        let resultsProductsFiltersGeneric11Listing = this.resultsProductsFiltersGeneric11Listing;
        let resultsProductsFiltersGeneric12Listing = this.resultsProductsFiltersGeneric12Listing;
        let resultsProductsFiltersGeneric13Listing = this.resultsProductsFiltersGeneric13Listing;
        let resultsProductsFiltersGeneric14Listing = this.resultsProductsFiltersGeneric14Listing;
        let resultsProductsFiltersGeneric15Listing = this.resultsProductsFiltersGeneric15Listing;
        let resultsProductsFiltersGeneric16Listing = this.resultsProductsFiltersGeneric16Listing;
        let resultsProductsFiltersGeneric17Listing = this.resultsProductsFiltersGeneric17Listing;
        let resultsProductsFiltersGeneric18Listing = this.resultsProductsFiltersGeneric18Listing;
        let resultsProductsFiltersGeneric19Listing = this.resultsProductsFiltersGeneric19Listing;
        let resultsProductsFiltersGeneric20Listing = this.resultsProductsFiltersGeneric20Listing;
        let resultsProductsFiltersGeneric21Listing = this.resultsProductsFiltersGeneric21Listing;
        let resultsProductsFiltersGeneric22Listing = this.resultsProductsFiltersGeneric22Listing;
        let resultsProductsFiltersGeneric23Listing = this.resultsProductsFiltersGeneric23Listing;
        let resultsProductsFiltersGeneric24Listing = this.resultsProductsFiltersGeneric24Listing;
        let resultsProductsFiltersGeneric25Listing = this.resultsProductsFiltersGeneric25Listing;
        let resultsProductsFiltersGeneric26Listing = this.resultsProductsFiltersGeneric26Listing;
        let resultsProductsFiltersGeneric27Listing = this.resultsProductsFiltersGeneric27Listing;
        let resultsProductsFiltersGeneric28Listing = this.resultsProductsFiltersGeneric28Listing;
        let resultsProductsFiltersGeneric29Listing = this.resultsProductsFiltersGeneric29Listing;
        let resultsProductsFiltersGeneric30Listing = this.resultsProductsFiltersGeneric30Listing;

        let resultsProductsTypeListing = this.resultsProductsTypeListing;
        let resultsProductsStatusListing = this.resultsProductsStatusListing;


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
                <form id="formProductsEdit" name="formProductsEdit" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/" + gSystemConfig.configRouteBackendActionEdit }/?_method=PUT" enctype="multipart/form-data">
                    <input type="hidden" id="formProductsEdit_method" name="_method" value="PUT">

                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configProductsInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_products" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsTitleTableEdit") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableProductsIdParentEdit == 1 ? 
                                `
                                <tr id="inputRowProducts_id_parent" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemParentLink") }: 
                                    </td>
                                    <td>
                                        ${ /*TODO: Convert to ajax.*/'' }
                                        <select id="products_id_parent" name="id_parent" class="ss-backend-field-dropdown01">
                                            <option value="0"${ opdRecord.tblProductsIdParent == 0 ? ` selected` : `` }>
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectRoot") }
                                            </option>
                                            ${ objParentTable.map((recordRow)=>{
                                                return `
                                                    <option value="${ recordRow.id }"${ opdRecord.tblProductsIdParent == recordRow.id ? ` selected` : `` }>
                                                        ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(recordRow.title, "db") }
                                                    </option>
                                                `
                                            }) }
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="products_id_parent" name="id_parent" value="${ opdRecord.tblProductsIdParent }" />
                                `
                                }

                                ${ gSystemConfig.enableProductsSortOrder == 1 ? 
                                `
                                <tr id="inputRowProducts_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="${ opdRecord.tblProductsSortOrder_print }" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("products_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsType == 1 ? 
                                    `
                                    <tr id="inputRowProducts_id_type" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsType") }: 
                                        </td>
                                        <td>
                                            <select id="products_id_type" name="id_type" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.tblProductsIdType == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsTypeListing.map((typeRow)=>{
                                                    return `
                                                        <option value="${ typeRow.id }"${ opdRecord.tblProductsIdType == typeRow.id ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(typeRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableProductsBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowProducts_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsRU") }: 
                                    </td>
                                    <td>
                                        <select id="products_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="products_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                ${ gSystemConfig.enableProductsCode == 1 ? 
                                `
                                <tr id="inputRowProducts_code" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsCode") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_code" name="code" class="ss-backend-field-text01" maxlength="255" value="${ opdRecord.tblProductsCode }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowProducts_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_title" name="title" class="ss-backend-field-text01" maxlength="255" value="${ opdRecord.tblProductsTitle }" />
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableProductsDescription == 1 ? 
                                `
                                <tr id="inputRowProducts_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsDescription") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="products_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblProductsDescription_edit }</textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="products_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblProductsDescription_edit }</textarea>
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
                                            <textarea id="products_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblProductsDescription_edit }</textarea>
                                            <script>
                                                new FroalaEditor("#products_description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="products_description" name="description" class="ss-backend-field-text-area01">${ opdRecord.tblProductsDescription_edit }</textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#products_description",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#products_description";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                         ` : ``}
                                     </td>
                                </tr>
                                ` : ``
                                }


                                ${ gSystemConfig.configProductsURLAlias == 1 ? 
                                `
                                <tr id="inputRowProducts_url_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_url_alias" name="url_alias" class="ss-backend-field-text01" value="${ opdRecord.tblProductsURLAlias }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsKeywordsTags == 1 ? 
                                `
                                <tr id="inputRowProducts_keywords_tags" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01">${ opdRecord.tblProductsKeywordsTags }</textarea>
                                        <div>
                                            (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywordsInstruction01") })
                                        </div>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableProductsMetaDescription == 1 ? 
                                `
                                <tr id="inputRowProducts_meta_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_meta_description" name="meta_description" class="ss-backend-field-text-area01">${ opdRecord.tblProductsMetaDescription_edit }</textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsMetaTitle == 1 ? 
                                `
                                <tr id="inputRowProducts_meta_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_meta_title" name="meta_title" class="ss-backend-field-text01" value="${ opdRecord.tblProductsMetaTitle }" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Generic filters.*/'' }
                                ${ gSystemConfig.enableProductsFilterGeneric1 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric1") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric1 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric1Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric1" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric1Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric1 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric1" name="idsProductsFiltersGeneric1" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric1Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric1Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric1 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric1" name="idsProductsFiltersGeneric1" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric1Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric1Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric1Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric1 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric1Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric1" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric1Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric2 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric2") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric2 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric2Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric2" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric2Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric2 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric2" name="idsProductsFiltersGeneric2" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric2Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric2Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric2 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric2" name="idsProductsFiltersGeneric2" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric2Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric2Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric2Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric2 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric2Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric2" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric2Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric3 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric3") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric3 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric3Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric3" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric3Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric3 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric3" name="idsProductsFiltersGeneric3" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric3Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric3Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric3 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric3" name="idsProductsFiltersGeneric3" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric3Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric3Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric3Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric3 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric3Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric3" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric3Binding.includes("0") ? ` selected` : `` } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric4 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric4") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric4 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric4Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric4" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric4Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric4 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric4" name="idsProductsFiltersGeneric4" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric4Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric4Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric4 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric4" name="idsProductsFiltersGeneric4" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric4Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric4Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric4Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric4 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric4Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric4" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric4Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric5 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric5") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric5 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric5Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric5" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric5Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric5 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric5" name="idsProductsFiltersGeneric5" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric5Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric5Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric5 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric5" name="idsProductsFiltersGeneric5" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric5Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric5Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric5Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric5 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric5Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric5" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric5Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric6 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric6") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric6 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric6Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric6" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric6Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric6 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric6" name="idsProductsFiltersGeneric6" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric6Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric6Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric6 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric6" name="idsProductsFiltersGeneric6" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric6Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric6Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric6Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric6 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric6Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric6" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric6Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric7 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric7") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric7 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric7Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric7" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric7Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric7 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric7" name="idsProductsFiltersGeneric7" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric7Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric7Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric7 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric7" name="idsProductsFiltersGeneric7" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric7Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric7Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric7Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric7 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric7Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric7" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric7Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric8 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric8") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric8 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric8Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric8" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric8Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric8 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric8" name="idsProductsFiltersGeneric8" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric8Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric8Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric8 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric8" name="idsProductsFiltersGeneric8" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric8Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric8Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric8 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric8Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric8" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric8Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric9 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric9") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric9 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric9Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric9" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric9Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric9 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric9" name="idsProductsFiltersGeneric9" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric9Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric9Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric9 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric9" name="idsProductsFiltersGeneric9" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric9Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric9Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric9Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric9 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric9Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric9" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric9Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric10 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric10") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric10 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric10Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric10" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric10Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric10 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric10" name="idsProductsFiltersGeneric10" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric10Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric10Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric10 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric10" name="idsProductsFiltersGeneric10" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric10Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric10Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric10 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric10Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric10" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric10Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric11 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter11" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric11") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric11 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric11Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric11" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric11Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric11 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric11" name="idsProductsFiltersGeneric11" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric11Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric11Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric11 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric11" name="idsProductsFiltersGeneric11" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric11Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric11Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric11Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric11 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric11Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric11" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric11Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric12 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter12" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric12") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric12 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric12Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric12" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric12Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric12 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric12" name="idsProductsFiltersGeneric12" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric12Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric12Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric12 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric12" name="idsProductsFiltersGeneric12" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric12Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric12Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric12Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric12 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric12Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric12" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric12Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric13 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter13" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric13") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric13 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric13Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric13" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric13Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric13 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric13" name="idsProductsFiltersGeneric13" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric13Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric13Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric13 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric13" name="idsProductsFiltersGeneric13" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric13Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric13Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric13Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric13 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric13Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric13" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric13Binding.includes("0") ? ` selected` : `` } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric14 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter14" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric14") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric14 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric14Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric14" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric14Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric14 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric14" name="idsProductsFiltersGeneric14" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric14Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric14Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric14 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric14" name="idsProductsFiltersGeneric14" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric14Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric14Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric14Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric14 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric14Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric14" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric14Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric15 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter15" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric15") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric15 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric15Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric15" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric15Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric15 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric15" name="idsProductsFiltersGeneric15" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric15Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric15Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric15 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric15" name="idsProductsFiltersGeneric15" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric15Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric15Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric15Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric15 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric15Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric15" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric15Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric16 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter16" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric16") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric16 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric16Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric16" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric16Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric16 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric16" name="idsProductsFiltersGeneric16" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric16Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric16Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric16 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric16" name="idsProductsFiltersGeneric16" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric16Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric16Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric16Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric16 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric16Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric16" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric16Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric17 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter17" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric17") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric17 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric17Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric17" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric17Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric17 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric17" name="idsProductsFiltersGeneric17" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric17Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric17Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric17 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric17" name="idsProductsFiltersGeneric17" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric17Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric17Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric17Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric17 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric17Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric17" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric17Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric18 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter18" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric18") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric18 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric18Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric18" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric18Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric18 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric18" name="idsProductsFiltersGeneric18" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric18Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric18Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric18 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric18" name="idsProductsFiltersGeneric18" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric18Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric18Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric18 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric18Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric18" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric18Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric19 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter19" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric19") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric19 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric19Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric19" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric19Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric19 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric19" name="idsProductsFiltersGeneric19" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric19Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric19Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric19 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric19" name="idsProductsFiltersGeneric19" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric19Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric19Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric19Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric19 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric19Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric19" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric19Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric20 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter20" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric20") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric20 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric20Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric20" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric20Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric20 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric20" name="idsProductsFiltersGeneric20" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric20Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric20Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneri20 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneri20" name="idsProductsFiltersGeneri20" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneri20Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneri20Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneri20 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneri20Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneri20" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric110Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric21 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter21" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric21") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric21 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric21Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric21" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric21Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric21 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric21" name="idsProductsFiltersGeneric21" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric21Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric21Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric21 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric21" name="idsProductsFiltersGeneric21" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric21Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric21Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric21Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric21 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric21Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric21" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric21Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric22 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter22" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric22") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric22 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric22Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric22" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric22Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric22 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric22" name="idsProductsFiltersGeneric22" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric22Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric22Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric22 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric22" name="idsProductsFiltersGeneric22" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric22Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric22Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric22Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric22 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric22Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric22" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric22Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric23 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter23" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric23") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric23 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric23Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric23" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric23Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric23 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric23" name="idsProductsFiltersGeneric23" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric23Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric23Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric23 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric23" name="idsProductsFiltersGeneric23" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric23Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric23Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric23Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric23 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric23Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric23" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric23Binding.includes("0") ? ` selected` : `` } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric24 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter24" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric24") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric24 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric24Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric24" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric24Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric24 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric24" name="idsProductsFiltersGeneric24" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric24Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric24Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric24 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric24" name="idsProductsFiltersGeneric24" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric24Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric24Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric24Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric24 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric24Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric24" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric24Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric25 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter25" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric25") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric25 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric25Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric25" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric25Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric25 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric25" name="idsProductsFiltersGeneric25" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric25Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric25Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric25 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric25" name="idsProductsFiltersGeneric25" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric25Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric25Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric25Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric25 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric25Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric25" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric25Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric26 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter26" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric26") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric26 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric26Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric26" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric26Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric26 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric26" name="idsProductsFiltersGeneric26" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric26Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric26Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric26 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric26" name="idsProductsFiltersGeneric26" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric26Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric26Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric26Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric26 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric26Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric26" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric26Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric27 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter27" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric27") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric27 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric27Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric27" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric27Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric27 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric27" name="idsProductsFiltersGeneric27" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric27Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric27Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric27 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric27" name="idsProductsFiltersGeneric27" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric27Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric27Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric27Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric27 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric27Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric27" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric27Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric28 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter28" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric28") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric28 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric28Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric28" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric28Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric28 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric28" name="idsProductsFiltersGeneric28" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric28Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric28Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric28 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric28" name="idsProductsFiltersGeneric28" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric28Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric28Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric28 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric28Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric28" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric28Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric29 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter29" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric29") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric29 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric29Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric29" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric29Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric29 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric29" name="idsProductsFiltersGeneric29" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric29Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric29Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric29 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric29" name="idsProductsFiltersGeneric29" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.arrIdsProductsFiltersGeneric29Binding.includes("0") ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric29Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric29Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric29 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric29Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric29" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric29Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsFilterGeneric30 != 0 ? 
                                `
                                <tr id="inputRowProducts_generic_filter30" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFilterGeneric30") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric30 == 1 ? 
                                        `
                                            ${resultsProductsFiltersGeneric30Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsProductsFiltersGeneric30" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric30Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric30 == 2 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric30" name="idsProductsFiltersGeneric30" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsProductsFiltersGeneric30Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric30Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric30 == 3 ? 
                                        `
                                            <select id="idsProductsFiltersGeneric30" name="idsProductsFiltersGeneric30" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsFiltersGeneric30Listing.map((productsFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric30Binding.includes(productsFiltersGenericRow.id.toString()) ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableProductsFilterGeneric30 == 4 ? 
                                        `
                                            ${resultsProductsFiltersGeneric30Listing.map((productsFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsProductsFiltersGeneric30" value="${ productsFiltersGenericRow.id }"${ opdRecord.arrIdsProductsFiltersGeneric30Binding.includes(productsFiltersGenericRow.id.toString()) ? " checked" : "" } class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(productsFiltersGenericRow.title, "db") }
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
                                ${ gSystemConfig.enableProductsInfo1 == 1 ? 
                                `
                                <tr id="inputRowProducts_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info1" name="info1" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info1" name="info1" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info1" name="info1" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo1_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info1" name="info1" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="products_info1" name="info1" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo1_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo2 == 1 ? 
                                `
                                <tr id="inputRowProducts_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info2" name="info2" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info2" name="info2" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info2" name="info2" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo2_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info2" name="info2" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="products_info2" name="info2" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo2_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo3 == 1 ? 
                                `
                                <tr id="inputRowProducts_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info3" name="info3" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info3" name="info3" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info3" name="info3" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo3_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info3" name="info3" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="products_info3" name="info3" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo3_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo4 == 1 ? 
                                `
                                <tr id="inputRowProducts_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info4" name="info4" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info4" name="info4" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info4" name="info4" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo4_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info4" name="info4" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="products_info4" name="info4" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo4_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo5 == 1 ? 
                                `
                                <tr id="inputRowProducts_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info5" name="info5" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info5" name="info5" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info5" name="info5" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo5_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info5" name="info5" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="products_info5" name="info5" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo5_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo6 == 1 ? 
                                `
                                <tr id="inputRowProducts_info6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo6FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info6" name="info6" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info6" name="info6" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo6_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info6" name="info6" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo6_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info6";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo6FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info6" name="info6" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo6FieldType == 12 ? 
                                        `
                                            <textarea id="products_info6" name="info6" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo6_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo7 == 1 ? 
                                `
                                <tr id="inputRowProducts_info7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo7FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info7" name="info7" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info7" name="info7" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo7_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info7" name="info7" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo7_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info7";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo7FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info7" name="info7" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo7FieldType == 12 ? 
                                        `
                                            <textarea id="products_info7" name="info7" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo7_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo8 == 1 ? 
                                `
                                <tr id="inputRowProducts_info8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo8FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info8" name="info8" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info8" name="info8" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo8_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info8" name="info8" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo8_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info8";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo8FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info8" name="info8" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo8FieldType == 12 ? 
                                        `
                                            <textarea id="products_info8" name="info8" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo8_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo9 == 1 ? 
                                `
                                <tr id="inputRowProducts_info9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo9FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info9" name="info9" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info9" name="info9" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo9_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info9" name="info9" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo9_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info9";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo9FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info9" name="info9" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo9FieldType == 12 ? 
                                        `
                                            <textarea id="products_info9" name="info9" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo9_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo10 == 1 ? 
                                `
                                <tr id="inputRowProducts_info10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo10FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info10" name="info10" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info10" name="info10" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo10_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info10" name="info10" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo10_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info10";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo10FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info10" name="info10" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo10FieldType == 12 ? 
                                        `
                                            <textarea id="products_info10" name="info10" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo10_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo11 == 1 ? 
                                `
                                <tr id="inputRowProducts_info11" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo11") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo11FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info11" name="info11" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo11_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo11FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info11" name="info11" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo11_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info11" name="info11" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo11_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info11";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo11FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info11" name="info11" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo11_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo11FieldType == 12 ? 
                                        `
                                            <textarea id="products_info11" name="info11" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo11_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo12 == 1 ? 
                                `
                                <tr id="inputRowProducts_info12" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo12") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo12FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info12" name="info12" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo12_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo12FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info12" name="info12" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo12_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info12" name="info12" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo12_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info12";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo12FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info12" name="info12" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo12_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo12FieldType == 12 ? 
                                        `
                                            <textarea id="products_info12" name="info12" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo12_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo13 == 1 ? 
                                `
                                <tr id="inputRowProducts_info13" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo13") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo13FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info13" name="info13" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo13_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo13FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info13" name="info13" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo13_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info13" name="info13" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo13_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info13";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo13FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info13" name="info13" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo13_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo13FieldType == 12 ? 
                                        `
                                            <textarea id="products_info13" name="info13" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo13_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo14 == 1 ? 
                                `
                                <tr id="inputRowProducts_info14" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo14") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo14FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info14" name="info14" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo14_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo14FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info14" name="info14" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo14_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info14" name="info14" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo14_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info14";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo14FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info14" name="info14" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo14_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo14FieldType == 12 ? 
                                        `
                                            <textarea id="products_info14" name="info14" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo14_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo15 == 1 ? 
                                `
                                <tr id="inputRowProducts_info15" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo15") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo15FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info15" name="info15" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo15_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo15FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info15" name="info15" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo15_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info15" name="info15" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo15_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info15";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo15FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info15" name="info15" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo15_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo15FieldType == 12 ? 
                                        `
                                            <textarea id="products_info15" name="info15" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo15_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo16 == 1 ? 
                                `
                                <tr id="inputRowProducts_info16" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo16") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo16FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info16" name="info16" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo16_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo16FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info16" name="info16" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo16_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info16" name="info16" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo16_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info16";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo16FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info16" name="info16" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo16_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo16FieldType == 12 ? 
                                        `
                                            <textarea id="products_info16" name="info16" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo16_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo17 == 1 ? 
                                `
                                <tr id="inputRowProducts_info17" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo17") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo17FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info17" name="info17" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo17_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo17FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info17" name="info17" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo17_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info17" name="info17" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo17_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info17";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo17FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info17" name="info17" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo17_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo17FieldType == 12 ? 
                                        `
                                            <textarea id="products_info17" name="info17" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo17_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo18 == 1 ? 
                                `
                                <tr id="inputRowProducts_info18" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo18") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo18FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info18" name="info18" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo18_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo18FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info18" name="info18" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo18_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info18" name="info18" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo18_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info18";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo18FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info18" name="info18" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo18_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo18FieldType == 12 ? 
                                        `
                                            <textarea id="products_info18" name="info18" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo18_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo19 == 1 ? 
                                `
                                <tr id="inputRowProducts_info19" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo19") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo19FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info19" name="info19" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo19_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo19FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info19" name="info19" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo19_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info19" name="info19" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo19_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info19";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo19FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info19" name="info19" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo19_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo19FieldType == 12 ? 
                                        `
                                            <textarea id="products_info19" name="info19" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo19_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsInfo20 == 1 ? 
                                `
                                <tr id="inputRowProducts_info20" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfo20") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfo20FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info20" name="info20" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo20_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfo20FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info20" name="info20" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo20_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info20" name="info20" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo20_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info20";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo20FieldType == 11 ? 
                                        `
                                            <input type="text" id="products_info20" name="info20" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfo20_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configProductsInfo20FieldType == 12 ? 
                                        `
                                            <textarea id="products_info20" name="info20" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfo20_edit }</textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Information (small) fields.*/'' }
                                ${ gSystemConfig.enableProductsInfoS1 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small1" name="info_small1" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall1_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall1_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small1" name="info_small1" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall1_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small1";
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

                                ${ gSystemConfig.enableProductsInfoS2 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small2" name="info_small2" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall2_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall2_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small2" name="info_small2" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall2_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small2";
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

                                ${ gSystemConfig.enableProductsInfoS3 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small3" name="info_small3" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall3_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall3_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small3" name="info_small3" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall3_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small3";
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

                                ${ gSystemConfig.enableProductsInfoS4 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small4" name="info_small4" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall4_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall4_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small4" name="info_small4" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall4_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small4";
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

                                ${ gSystemConfig.enableProductsInfoS5 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small5" name="info_small5" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall5_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall5_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small5" name="info_small5" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall5_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small5";
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

                                ${ gSystemConfig.enableProductsInfoS6 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS6FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small6" name="info_small6" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall6_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small6" name="info_small6" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall6_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small6" name="info_small6" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall6_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small6";
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

                                ${ gSystemConfig.enableProductsInfoS7 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS7FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small7" name="info_small7" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall7_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small7" name="info_small7" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall7_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small7" name="info_small7" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall7_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small7";
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

                                ${ gSystemConfig.enableProductsInfoS8 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS8FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small8" name="info_small8" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall8_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small8" name="info_small8" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall8_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small8" name="info_small8" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall8_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small8";
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

                                ${ gSystemConfig.enableProductsInfoS9 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS9FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small9" name="info_small9" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall9_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small9" name="info_small9" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall9_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small9" name="info_small9" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall9_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small9";
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
                                
                                ${ gSystemConfig.enableProductsInfoS10 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS10FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small10" name="info_small10" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall10_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small10" name="info_small10" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall10_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small10" name="info_small10" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall10_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small10";
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

                                ${ gSystemConfig.enableProductsInfoS11 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small11" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS11") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS11FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small11" name="info_small11" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall11_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS11FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small11" name="info_small11" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall11_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small11" name="info_small11" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall11_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small11";
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

                                ${ gSystemConfig.enableProductsInfoS12 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small12" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS12") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS12FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small12" name="info_small12" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall12_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS12FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small12" name="info_small12" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall12_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small12" name="info_small12" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall12_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small12";
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

                                ${ gSystemConfig.enableProductsInfoS13 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small13" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS13") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS13FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small13" name="info_small13" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall13_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS13FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small13" name="info_small13" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall13_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small13" name="info_small13" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall13_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small13";
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

                                ${ gSystemConfig.enableProductsInfoS14 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small14" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS14") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS14FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small14" name="info_small14" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall14_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS14FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small14" name="info_small14" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall14_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small14" name="info_small14" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall14_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small14";
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

                                ${ gSystemConfig.enableProductsInfoS15 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small15" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS15") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS15FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small15" name="info_small15" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall15_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS15FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small15" name="info_small15" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall15_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small15" name="info_small15" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall15_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small15";
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

                                ${ gSystemConfig.enableProductsInfoS16 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small16" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS16") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS16FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small16" name="info_small16" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall16_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS16FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small16" name="info_small16" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall16_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small16" name="info_small16" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall16_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small16";
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

                                ${ gSystemConfig.enableProductsInfoS17 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small17" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS17") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS17FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small17" name="info_small17" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall17_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS17FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small17" name="info_small17" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall17_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small17" name="info_small17" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall17_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small17";
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

                                ${ gSystemConfig.enableProductsInfoS18 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small18" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS18") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS18FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small18" name="info_small18" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall18_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS18FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small18" name="info_small18" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall18_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small18" name="info_small18" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall18_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small18";
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

                                ${ gSystemConfig.enableProductsInfoS19 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small19" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS19") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS19FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small19" name="info_small19" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall19_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS19FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small19" name="info_small19" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall19_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small19" name="info_small19" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall19_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small19";
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
                                
                                ${ gSystemConfig.enableProductsInfoS20 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small20" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS20") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS20FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small20" name="info_small20" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall20_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS20FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small20" name="info_small20" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall20_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small20" name="info_small20" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall20_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small20";
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

                                ${ gSystemConfig.enableProductsInfoS21 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small21" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS21") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS21FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small21" name="info_small21" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall21_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS21FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small21" name="info_small21" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall21_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small21" name="info_small21" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall21_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small21";
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

                                ${ gSystemConfig.enableProductsInfoS22 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small22" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS22") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS22FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small22" name="info_small22" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall22_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS22FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small22" name="info_small22" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall22_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small22" name="info_small22" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall22_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small22";
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

                                ${ gSystemConfig.enableProductsInfoS23 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small23" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS23") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS23FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small23" name="info_small23" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall23_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS23FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small23" name="info_small23" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall23_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small23" name="info_small23" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall23_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small23";
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

                                ${ gSystemConfig.enableProductsInfoS24 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small24" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS24") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS24FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small24" name="info_small24" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall24_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS24FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small24" name="info_small24" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall24_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small24" name="info_small24" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall24_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small24";
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

                                ${ gSystemConfig.enableProductsInfoS25 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small25" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS25") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS25FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small25" name="info_small25" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall25_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS25FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small25" name="info_small25" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall25_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small25" name="info_small25" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall25_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small25";
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

                                ${ gSystemConfig.enableProductsInfoS26 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small26" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS26") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS26FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small26" name="info_small26" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall26_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS26FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small26" name="info_small26" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall26_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small26" name="info_small26" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall26_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small26";
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

                                ${ gSystemConfig.enableProductsInfoS27 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small27" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS27") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS27FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small27" name="info_small27" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall27_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS27FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small27" name="info_small27" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall27_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small27" name="info_small27" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall27_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small27";
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

                                ${ gSystemConfig.enableProductsInfoS28 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small28" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS28") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS28FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small28" name="info_small28" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall28_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS28FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small28" name="info_small28" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall28_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small28" name="info_small28" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall28_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small28";
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

                                ${ gSystemConfig.enableProductsInfoS29 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small29" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS29") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS29FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small29" name="info_small29" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall29_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS29FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small29" name="info_small29" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall29_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small29" name="info_small29" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall29_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small29";
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
                                
                                ${ gSystemConfig.enableProductsInfoS30 == 1 ? 
                                `
                                <tr id="inputRowProducts_info_small30" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsInfoS30") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configProductsInfoS30FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_info_small30" name="info_small30" class="ss-backend-field-text01" value="${ opdRecord.tblProductsInfoSmall30_edit }" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configProductsInfoS30FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="products_info_small30" name="info_small30" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall30_edit }</textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="products_info_small30" name="info_small30" class="ss-backend-field-text-area01">${ opdRecord.tblProductsInfoSmall30_edit }</textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#products_info_small30";
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

                                ${ gSystemConfig.enableProductsValue == 1 ? 
                                `
                                <tr id="inputRowProducts_value" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsValue") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.configSystemCurrency }
                                        <input type="text" id="products_value" name="value" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsValue_print }" maxlength="45" />
                                        
                                        <script>
                                            Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_value");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsValue1 == 1 ? 
                                `
                                <tr id="inputRowProducts_value1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsValue1") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.configSystemCurrency }
                                        <input type="text" id="products_value1" name="value1" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsValue1_print }" maxlength="45" />
                                        
                                        <script>
                                            Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_value1");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsValue2 == 1 ? 
                                `
                                <tr id="inputRowProducts_value2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsValue2") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.configSystemCurrency }
                                        <input type="text" id="products_value2" name="value2" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsValue2_print }" maxlength="45" />
                                        
                                        <script>
                                            Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_value2");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsWeight == 1 ? 
                                `
                                <tr id="inputRowProducts_weight" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsWeight") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_weight" name="weight" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsWeight_print }" maxlength="34" />
                                        ${ gSystemConfig.configSystemWeight }

                                        <script>
                                            Inputmask(inputmaskDecimalBackendConfigOptions).mask("products_weight");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }
                                
                                ${ gSystemConfig.enableProductsCoefficient == 1 ? 
                                `
                                <tr id="inputRowProducts_coefficient" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsCoefficient") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_coefficient" name="coefficient" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsCoefficient_print }" maxlength="34" />
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsCoefficientInstructions") }

                                        <script>
                                            Inputmask(inputmaskDecimalBackendConfigOptions).mask("products_coefficient");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Number fields.*/'' }
                                ${ gSystemConfig.enableProductsNumber1 == 1 ? 
                                `
                                <tr id="inputRowProducts_number1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumber1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumber1FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number1" name="number1" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumber1FieldType == 2 || gSystemConfig.configProductsNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number1" name="number1" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumber1_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("products_number1")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configProductsNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="products_number1" name="number1" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber1_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("products_number1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumber2 == 1 ? 
                                `
                                <tr id="inputRowProducts_number2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumber2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumber2FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number2" name="number2" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumber2FieldType == 2 || gSystemConfig.configProductsNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number2" name="number2" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumber2_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("products_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configProductsNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="products_number2" name="number2" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber2_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("products_number2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumber3 == 1 ? 
                                `
                                <tr id="inputRowProducts_number3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumber3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumber3FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number3" name="number3" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumber3FieldType == 2 || gSystemConfig.configProductsNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number3" name="number3" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumber3_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("products_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configProductsNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="products_number3" name="number3" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber3_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("products_number3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumber4 == 1 ? 
                                `
                                <tr id="inputRowProducts_number4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumber4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumber4FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number4" name="number4" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumber4FieldType == 2 || gSystemConfig.configProductsNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number4" name="number4" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumber4_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("products_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configProductsNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="products_number4" name="number4" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber4_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("products_number4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumber5 == 1 ? 
                                `
                                <tr id="inputRowProducts_number5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumber5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumber5FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number5" name="number5" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumber5FieldType == 2 || gSystemConfig.configProductsNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number5" name="number5" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumber5_print }" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("products_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configProductsNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="products_number5" name="number5" class="ss-backend-field-numeric02" value="${ opdRecord.tblProductsNumber5_print }" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("products_number5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Number (small) fields.*/'' }
                                ${ gSystemConfig.enableProductsNumberS1 == 1 ? 
                                `
                                <tr id="inputRowProducts_number_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumberS1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumberS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="${ opdRecord.tblProductsNumberSmall1_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number_small1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumberS1FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number_small1" name="number_small1" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumberSmall1_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number_small1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumberS2 == 1 ? 
                                `
                                <tr id="inputRowProducts_number_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumberS2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumberS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="${ opdRecord.tblProductsNumberSmall2_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number_small2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumberS2FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number_small2" name="number_small2" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumberSmall2_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number_small2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumberS3 == 1 ? 
                                `
                                <tr id="inputRowProducts_number_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumberS3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumberS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="${ opdRecord.tblProductsNumberSmall3_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number_small3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumberS3FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number_small3" name="number_small3" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumberSmall3_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number_small3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumberS4 == 1 ? 
                                `
                                <tr id="inputRowProducts_number_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumberS4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumberS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="${ opdRecord.tblProductsNumberSmall4_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number_small4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumberS4FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number_small4" name="number_small4" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumberSmall4_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number_small4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsNumberS5 == 1 ? 
                                `
                                <tr id="inputRowProducts_number_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsNumberS5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configProductsNumberS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="products_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="${ opdRecord.tblProductsNumberSmall5_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("products_number_small5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configProductsNumberS5FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="products_number_small5" name="number_small5" class="ss-backend-field-currency01" value="${ opdRecord.tblProductsNumberSmall5_print }" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("products_number_small5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*URL fields.*/'' }
                                ${ gSystemConfig.enableProductsURL1 != 0 ? 
                                `
                                <tr id="inputRowProducts_url1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsURL1") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_url1" name="url1" class="ss-backend-field-text-area-url">${ opdRecord.tblProductsURL1_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsURL2 != 0 ? 
                                `
                                <tr id="inputRowProducts_url2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsURL2") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_url2" name="url2" class="ss-backend-field-text-area-url">${ opdRecord.tblProductsURL2_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsURL3 != 0 ? 
                                `
                                <tr id="inputRowProducts_url3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsURL3") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_url3" name="url3" class="ss-backend-field-text-area-url">${ opdRecord.tblProductsURL3_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsURL4 != 0 ? 
                                `
                                <tr id="inputRowProducts_url4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsURL4") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_url4" name="url4" class="ss-backend-field-text-area-url">${ opdRecord.tblProductsURL4_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsURL5 != 0 ? 
                                `
                                <tr id="inputRowProducts_url5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsURL5") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_url5" name="url5" class="ss-backend-field-text-area-url">${ opdRecord.tblProductsURL5_edit }</textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableProductsDate1 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_date1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsDate1") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configProductsDate1FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    ${  /*Debug.*/
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                        ''
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                    }
                                                    <select id="products_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate1DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="products_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate1DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate1DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate1DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configProductsDate1FieldType == 11 ? 
                                            `
                                            <input type="text" id="products_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblProductsDate1_print }" />
                                            <script>
                                                const dpDate1 = datepicker("#products_date1", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configProductsDate1Type == 1 || gSystemConfig.configProductsDate1Type == 2 | gSystemConfig.configProductsDate1Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configProductsDate1Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configProductsDate1Type == 5 || gSystemConfig.configProductsDate1Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configProductsDate1Type == 6 || gSystemConfig.configProductsDate1Type == 66 ? 
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
                                        ${ gSystemConfig.configProductsDate1Type == 2 || gSystemConfig.configProductsDate1Type == 3 || gSystemConfig.configProductsDate1Type == 55 || gSystemConfig.configProductsDate1Type == 66 ? 
                                            `
                                             - 
                                            <select id="products_date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate1DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="products_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate1DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configProductsDate1Type == 2 ? 
                                                `
                                                :
                                                <select id="products_date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configProductsDate1Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblProductsDate1DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enableProductsDate2 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_date2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsDate2") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configProductsDate2FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="products_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate2DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="products_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate2DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate2DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate2DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configProductsDate2FieldType == 11 ? 
                                            `
                                            <input type="text" id="products_date2" name="date2" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblProductsDate2_print }" />
                                            <script>
                                                const dpDate2 = datepicker("#products_date2", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configProductsDate2Type == 1 || gSystemConfig.configProductsDate2Type == 2 | gSystemConfig.configProductsDate2Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configProductsDate2Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configProductsDate2Type == 5 || gSystemConfig.configProductsDate2Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configProductsDate2Type == 6 || gSystemConfig.configProductsDate2Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configProductsDate2Type == 2 || gSystemConfig.configProductsDate2Type == 3 || gSystemConfig.configProductsDate2Type == 55 || gSystemConfig.configProductsDate2Type == 66 ? 
                                            `
                                             - 
                                            <select id="products_date2_hour" name="date2_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate2DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="products_date2_minute" name="date2_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate2DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configProductsDate2Type == 2 ? 
                                                `
                                                :
                                                <select id="products_date2_seconds" name="date2_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configProductsDate2Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblProductsDate2DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enableProductsDate3 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_date3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsDate3") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configProductsDate3FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="products_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate3DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="products_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate3DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate3DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate3DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configProductsDate3FieldType == 11 ? 
                                            `
                                            <input type="text" id="products_date3" name="date3" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblProductsDate3_print }" />
                                            <script>
                                                const dpDate3 = datepicker("#products_date3", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configProductsDate3Type == 1 || gSystemConfig.configProductsDate3Type == 2 | gSystemConfig.configProductsDate3Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configProductsDate3Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configProductsDate3Type == 5 || gSystemConfig.configProductsDate3Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configProductsDate3Type == 6 || gSystemConfig.configProductsDate3Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configProductsDate3Type == 2 || gSystemConfig.configProductsDate3Type == 3 || gSystemConfig.configProductsDate3Type == 55 || gSystemConfig.configProductsDate3Type == 66 ? 
                                            `
                                             - 
                                            <select id="products_date3_hour" name="date3_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate3DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="products_date3_minute" name="date3_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate3DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configProductsDate3Type == 2 ? 
                                                `
                                                :
                                                <select id="products_date3_seconds" name="date3_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configProductsDate3Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblProductsDate3DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enableProductsDate4 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_date4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsDate4") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configProductsDate4FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="products_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate4DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="products_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate4DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate4DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate4DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configProductsDate4FieldType == 11 ? 
                                            `
                                            <input type="text" id="products_date4" name="date4" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblProductsDate4_print }" />
                                            <script>
                                                const dpDate4 = datepicker("#products_date4", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configProductsDate4Type == 1 || gSystemConfig.configProductsDate4Type == 2 | gSystemConfig.configProductsDate4Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configProductsDate4Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configProductsDate4Type == 5 || gSystemConfig.configProductsDate4Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configProductsDate4Type == 6 || gSystemConfig.configProductsDate4Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configProductsDate4Type == 2 || gSystemConfig.configProductsDate4Type == 3 || gSystemConfig.configProductsDate4Type == 55 || gSystemConfig.configProductsDate4Type == 66 ? 
                                            `
                                             - 
                                            <select id="products_date4_hour" name="date4_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate4DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="products_date4_minute" name="date4_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate4DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configProductsDate4Type == 2 ? 
                                                `
                                                :
                                                <select id="products_date4_seconds" name="date4_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configProductsDate4Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblProductsDate4DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enableProductsDate5 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_date5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsDate5") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configProductsDate5FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="products_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate5DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="products_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowMonth == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate5DateMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowDay == arrayRow ? ' selected' : ``*/'' }
                                                                    ${ opdRecord.tblProductsDate5DateDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="products_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ /*this.dateNowYear == arrayRow ? ' selected' : ''*/'' }
                                                                    ${ opdRecord.tblProductsDate5DateYear == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                `
                                            }
                                            ` : ``
                                        }

                                        ${ /*js-datepicker.*/'' }
                                        ${ gSystemConfig.configProductsDate5FieldType == 11 ? 
                                            `
                                            <input type="text" id="products_date5" name="date5" class="ss-backend-field-date01" autocomplete="off" value="${ opdRecord.tblProductsDate5_print }" />
                                            <script>
                                                const dpDate5 = datepicker("#products_date5", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configProductsDate5Type == 1 || gSystemConfig.configProductsDate5Type == 2 | gSystemConfig.configProductsDate5Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configProductsDate5Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configProductsDate5Type == 5 || gSystemConfig.configProductsDate5Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configProductsDate5Type == 6 || gSystemConfig.configProductsDate5Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configProductsDate5Type == 2 || gSystemConfig.configProductsDate5Type == 3 || gSystemConfig.configProductsDate5Type == 55 || gSystemConfig.configProductsDate5Type == 66 ? 
                                            `
                                             - 
                                            <select id="products_date5_hour" name="date5_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowHour == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate5DateHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="products_date5_minute" name="date5_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ /*this.dateNowMinute == arrayRow ? ' selected' : ``*/'' }
                                                            ${ opdRecord.tblProductsDate5DateMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configProductsDate5Type == 2 ? 
                                                `
                                                :
                                                <select id="products_date5_seconds" name="date5_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configProductsDate5Type}).map((arrayRow)=>{
                                                        return `
                                                            <option value="${ arrayRow }"
                                                                ${ /*this.dateNowSecond == arrayRow ? ' selected' : ``*/'' }
                                                                ${ opdRecord.tblProductsDate5DateSecond == arrayRow ? ' selected' : ``}
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

                                ${ gSystemConfig.enableProductsImageMain == 1 ? 
                                `
                                <tr id="inputRowProducts_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="products_image_main" name="image_main" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblProductsImageMain != "" ? 
                                        `
                                        <img id="imgProductsImageMain" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblProductsImageMain + "?v=" + this.cacheClear }" alt="${ opdRecord.tblProductsTitle }" class="ss-backend-images-edit" />
                                        <div id="divProductsImageMainDelete" style="position: relative; display: inline-block;">
                                            <a class="ss-backend-delete01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                            {
                                                                                idRecord: '${ opdRecord.tblProductsID }', 
                                                                                strTable: '${ gSystemConfig.configSystemDBTableProducts }', 
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
                                                                                    htmlGenericStyle01('imgProductsImageMain', 'display', 'none');
                                                                                    htmlGenericStyle01('divProductsImageMainDelete', 'display', 'none');

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
                                ${ gSystemConfig.enableProductsImageMainCaption == 1 ? 
                                `
                                <tr id="inputRowProducts_image_main_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="products_image_main_caption" name="image_main_caption" class="ss-backend-field-text01" value="${ opdRecord.tblProductsImageMainCaption }" />
                                    </td>
                                </tr>
                                ` : ``
                                }                                

                                ${ gSystemConfig.enableProductsFile1 == 1 ? 
                                `
                                <tr id="inputRowProducts_file1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFile1") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="products_file1" name="file1" class="ss-backend-field-file-upload" />
                                        ${ opdRecord.tblProductsFile1 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configProductsFile1Type == 1 ? 
                                            `
                                                <img id="imgProductsFile1" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblProductsFile1 + "?v=" + this.cacheClear }" alt="${ opdRecord.tblProductsFile1 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configProductsFile1Type == 3 ? 
                                            `
                                                <a id="imgProductsFile1" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configProductsFile1Type == 34 ? 
                                            `
                                                <a id="imgProductsFile1" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile1 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile1 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divProductsFile1Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblProductsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableProducts }', 
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
                                                                                        htmlGenericStyle01('imgProductsFile1', 'display', 'none');
                                                                                        htmlGenericStyle01('divProductsFile1Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configProductsFile1Type == 1 ? 
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

                                ${ gSystemConfig.enableProductsFile2 == 1 ? 
                                `
                                <tr id="inputRowProducts_file2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFile2") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="products_file2" name="file2" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblProductsFile2 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configProductsFile2Type == 1 ? 
                                            `
                                                <img id="imgProductsFile2" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblProductsFile2 + "?v=" + this.cacheClear }" alt="${ opdRecord.tblProductsFile2 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configProductsFile2Type == 3 ? 
                                            `
                                                <a id="imgProductsFile2" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configProductsFile2Type == 34 ? 
                                            `
                                                <a id="imgProductsFile2" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile2 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile2 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divProductsFile2Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblProductsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableProducts }', 
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
                                                                                        htmlGenericStyle01('imgProductsFile2', 'display', 'none');
                                                                                        htmlGenericStyle01('divProductsFile2Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configProductsFile2Type == 1 ? 
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

                                ${ gSystemConfig.enableProductsFile3 == 1 ? 
                                `
                                <tr id="inputRowProducts_file3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFile3") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="products_file3" name="file3" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblProductsFile3 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configProductsFile3Type == 1 ? 
                                            `
                                                <img id="imgProductsFile3" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblProductsFile3 + "?v=" + this.cacheClear }" alt="${ opdRecord.tblProductsFile3 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configProductsFile3Type == 3 ? 
                                            `
                                                <a id="imgProductsFile3" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configProductsFile3Type == 34 ? 
                                            `
                                                <a id="imgProductsFile3" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile3 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile3 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divProductsFile3Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblProductsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableProducts }', 
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
                                                                                        htmlGenericStyle01('imgProductsFile3', 'display', 'none');
                                                                                        htmlGenericStyle01('divProductsFile3Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configProductsFile3Type == 1 ? 
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

                                ${ gSystemConfig.enableProductsFile4 == 1 ? 
                                `
                                <tr id="inputRowProducts_file4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFile4") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="products_file4" name="file4" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblProductsFile4 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configProductsFile4Type == 1 ? 
                                            `
                                                <img id="imgProductsFile4" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblProductsFile4 + "?v=" + this.cacheClear }" alt="${ opdRecord.tblProductsFile4 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configProductsFile4Type == 3 ? 
                                            `
                                                <a id="imgProductsFile4" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configProductsFile4Type == 34 ? 
                                            `
                                                <a id="imgProductsFile4" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile4 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile4 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divProductsFile4Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblProductsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableProducts }', 
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
                                                                                        htmlGenericStyle01('imgProductsFile4', 'display', 'none');
                                                                                        htmlGenericStyle01('divProductsFile4Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configProductsFile4Type == 1 ? 
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

                                ${ gSystemConfig.enableProductsFile5 == 1 ? 
                                `
                                <tr id="inputRowProducts_file5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsFile5") }: 
                                    </td>
                                    <td style="display: flex; align-items: center;">
                                        <input type="file" id="products_file5" name="file5" class="ss-backend-field-file-upload" />

                                        ${ opdRecord.tblProductsFile5 != "" ? 
                                        `
                                            ${ /*Image.*/ '' }
                                            ${ gSystemConfig.configProductsFile5Type == 1 ? 
                                            `
                                                <img id="imgProductsFile5" src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + opdRecord.tblProductsFile5 + "?v=" + this.cacheClear }" alt="${ opdRecord.tblProductsFile5 }" class="ss-backend-images-edit" />
                                            ` : ``
                                            }

                                            ${ /*File (download).*/ '' }
                                            ${ gSystemConfig.configProductsFile5Type == 3 ? 
                                            `
                                                <a id="imgProductsFile5" download href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            ${ /*File (open direct).*/ '' }
                                            ${ gSystemConfig.configProductsFile5Type == 34 ? 
                                            `
                                                <a id="imgProductsFile5" href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/" + opdRecord.tblProductsFile5 }" target="_blank" class="ss-backend-links01 ss-backend-images-edit">
                                                    ${ opdRecord.tblProductsFile5 }
                                                </a>
                                            ` : ``
                                            }

                                            <div id="divProductsFile5Delete" style="position: relative; display: inline-block;">
                                                <a class="ss-backend-delete01" 
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                    ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                {
                                                                                    idRecord: '${ opdRecord.tblProductsID }', 
                                                                                    strTable: '${ gSystemConfig.configSystemDBTableProducts }', 
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
                                                                                        htmlGenericStyle01('imgProductsFile5', 'display', 'none');
                                                                                        htmlGenericStyle01('divProductsFile5Delete', 'display', 'none');
    
                                                                                        //Success message.
                                                                                        elementMessage01('divMessageSuccess', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage6") }');
    
                                                                                    }else{
                                                                                        //Show error.
                                                                                        elementMessage01('divMessageError', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageAPI2e") }');
                                                                                    }
    
                                                                                    //Hide ajax progress bar.
                                                                                    htmlGenericStyle01('updtProgressGeneric', 'display', 'none');
                                                                                });">

                                                    
                                                    ${ gSystemConfig.configProductsFile5Type == 1 ? 
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

                                <tr id="inputRowProducts_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="products_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1"${ opdRecord.tblProductsActivation == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0"${ opdRecord.tblProductsActivation == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                        ${ /*opdRecord.tblProductsActivation_print*/ '' }
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableProductsActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="products_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblProductsActivation1 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblProductsActivation1 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableProductsActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="products_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblProductsActivation2 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblProductsActivation2 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableProductsActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="products_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblProductsActivation3 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblProductsActivation3 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableProductsActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="products_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblProductsActivation4 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblProductsActivation4 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableProductsActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowProducts_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="products_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1"${ opdRecord.tblProductsActivation5 == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0"${ opdRecord.tblProductsActivation5 == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableProductsStatus == 1 ? 
                                    `
                                    <tr id="inputRowProducts_id_status" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendProductsStatus") }: 
                                        </td>
                                        <td>
                                            <select id="products_id_status" name="id_status" class="ss-backend-field-dropdown01">
                                                <option value="0"${ opdRecord.tblProductsIdStatus == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsProductsStatusListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }"${ opdRecord.tblProductsIdStatus == statusRow.id ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableProductsRestrictedAccess == 1 ? 
                                `
                                <tr id="inputRowProducts_id_restricted_access" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess") }: 
                                    </td>
                                    <td>
                                        <select id="products_restricted_access" name="restricted_access" class="ss-backend-field-dropdown01">
                                            <option value="0"${ opdRecord.tblProductsRestrictedAccess == 0 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0") }</option>
                                            <option value="1"${ opdRecord.tblProductsRestrictedAccess == 1 ? ` selected` : `` }>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableProductsNotes == 1 ? 
                                `
                                <tr id="inputRowProducts_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="products_notes" name="notes" class="ss-backend-field-text-area01">${ opdRecord.tblProductsNotes_edit }</textarea>
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
                        <button id="products_include" name="products_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonUpdate") }
                        </button>

                        <a onclick="history.go(-1);" class="ss-backend-btn-base ss-backend-btn-action-alert" style="float: right;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonBack") }
                        </a>
                    </div>

                    <input type="hidden" id="products_id" name="id" value="${ opdRecord.tblProductsID }" />
                    <input type="hidden" id="products_idParent" name="idParent" value="${ opdRecord.tblProductsIdParent }" />
                    <input type="hidden" id="products_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="products_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
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