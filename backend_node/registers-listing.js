"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class RegistersListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        /*
        objParameters = {
                            idParent: idParent,
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
        this._idParent = objParameters.idParent;

        this._pagingNRecords = gSystemConfig.configRegistersBackendPaginationNRecords;
        this._pagingTotalRecords = 0;
        this._pagingTotal = 0;
        this._pageNumber = objParameters.pageNumber;
        if(gSystemConfig.enableRegistersBackendPagination == 1)
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

        this.objParentTableLevel1;
        this.objParentTable;
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
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;
            if(this._pageNumber)
            {
                this.queryDefault += "&pageNumber=" + this._pageNumber;
            }


            //Check table of parent id.
            this.objParentTable = await SyncSystemNS.FunctionsDB.tableFindGet(this._idParent);

            //Categories.
            if(this.objParentTable.tableName == gSystemConfig.configSystemDBTableCategories)
            {
                //Tittle - current.
                this.titleCurrent = SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].title, "db");
                
                //Meta keywords.
                this.metaKeywords += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].keywords_tags, "db"));

                //Meta description.
                if(gSystemConfig.enableCategoriesDescription == 1)
                {
                    this.metaDescription += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].description, "db"));
                }else{
                    this.metaDescription += this.titleCurrent;
                }
            }

            //Debug.
            //console.log("this.objParentTable = ", this.objParentTable); 
            //console.log("this.titleCurrent = ", this.titleCurrent);


            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersTitleMain");
            
            if(this.titleCurrent)
            {
                this.metaTitle += " - " + this.titleCurrent;
            }

            //Meta description.
            //this.metaDescription += "";

            //Meta keywords.
            //this.metaKeywords += SyncSystemNS.FunctionsGeneric.removeHTML01(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.objParentTable.tableData[0].keywords_tags, "db"));

            //Meta URL current.
            this.metaURLCurrent += gSystemConfig.configSystemURL + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackend + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendRegisters + "/";
            this.metaURLCurrent += this._idParent + "/";
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
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersTitleMain");
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
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersTitleMain");
            this.cphTitleCurrent += " - ";

            this.cphTitleCurrent += `
            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/0" }" class="ss-backend-links04">
                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRoot") }
            </a>
            `;
            if(this.titleCurrent)
            {
                this.cphTitleCurrent += " - " + this.titleCurrent;
            }
            //TODO: breadcrums.


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
        let arrSearchParameters = [];
        let arrFiltersGenericSearchParameters = [];

        let oplRecords = "";
        let oplRecordsParameters = {};
        
        let ofglRecords = "";
        let ofglRecordsParameters = {};

        
        //Debug.
        //console.log("oplRecordsParameters=", oplRecordsParameters);
        //console.log("_pagingTotalRecords=", this._pagingTotalRecords);
        //console.log("_pagingTotal=", this._pagingTotal);
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //Parameters build.
            arrSearchParameters.push("id_parent;" + this._idParent + ";i");

            oplRecordsParameters = {
                _arrSearchParameters: arrSearchParameters,
                _configSortOrder: gSystemConfig.configRegistersSort,
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Pagination.
            if(gSystemConfig.enableRegistersBackendPagination == 1)
            {
                //this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                this._pagingTotalRecords = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableRegisters, 
                                                                                            arrSearchParameters, 
                                                                                            gSystemConfig.configRegistersSort, 
                                                                                            "", 
                                                                                            "id, id_parent", 
                                                                                            3, 
                                                                                            {});

                this._pagingTotal = Math.ceil(this._pagingTotalRecords / this._pagingNRecords);


                //Parameters build - paging.
                oplRecordsParameters._objSpecialParameters._pageNumber = this._pageNumber;
                oplRecordsParameters._objSpecialParameters._pagingNRecords = this._pagingNRecords;
            }
            
            //Object build.
            oplRecords = new SyncSystemNS.ObjectRegistersListing(oplRecordsParameters);
            await oplRecords.recordsListingGet(0, 3);


            //Parameters build.
            arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableRegisters + ";s");

            ofglRecordsParameters = {
                _arrSearchParameters: arrFiltersGenericSearchParameters,
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            ofglRecords = new SyncSystemNS.ObjectFiltersGenericListing(ofglRecordsParameters);
            await ofglRecords.recordsListingGet(0, 3);


            //Filters - Type.
            if(gSystemConfig.enableRegistersType != 0)
            {
                var resultsRegistersTypeListing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 1;
                });
            }

            //Filters - Status.
            if(gSystemConfig.enableRegistersStatus != 0)
            {
                var resultsRegistersStatusListing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 2;
                });
            }
            
            //Filter results acording to filter_index.
            if(gSystemConfig.enableRegistersFilterGeneric1 != 0)
            {
                var resultsRegistersFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
            {
                var resultsRegistersFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 102;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
            {
                var resultsRegistersFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 102;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric3 != 0)
            {
                var resultsRegistersFiltersGeneric3Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 103;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric4 != 0)
            {
                var resultsRegistersFiltersGeneric4Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 104;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric5 != 0)
            {
                var resultsRegistersFiltersGeneric5Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 105;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric6 != 0)
            {
                var resultsRegistersFiltersGeneric6Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 106;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric7 != 0)
            {
                var resultsRegistersFiltersGeneric7Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 107;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric8 != 0)
            {
                var resultsRegistersFiltersGeneric8Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 108;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric9 != 0)
            {
                var resultsRegistersFiltersGeneric9Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 109;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric10 != 0)
            {
                var resultsRegistersFiltersGeneric10Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 110;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric11 != 0)
            {
                var resultsRegistersFiltersGeneric11Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 111;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric12 != 0)
            {
                var resultsRegistersFiltersGeneric12Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 112;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric12 != 0)
            {
                var resultsRegistersFiltersGeneric12Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 112;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric13 != 0)
            {
                var resultsRegistersFiltersGeneric13Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 113;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric14 != 0)
            {
                var resultsRegistersFiltersGeneric14Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 114;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric15 != 0)
            {
                var resultsRegistersFiltersGeneric15Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 115;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric16 != 0)
            {
                var resultsRegistersFiltersGeneric16Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 116;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric17 != 0)
            {
                var resultsRegistersFiltersGeneric17Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 117;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric18 != 0)
            {
                var resultsRegistersFiltersGeneric18Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 118;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric19 != 0)
            {
                var resultsRegistersFiltersGeneric19Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 119;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric20 != 0)
            {
                var resultsRegistersFiltersGeneric20Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 120;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric21 != 0)
            {
                var resultsRegistersFiltersGeneric21Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 121;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric22 != 0)
            {
                var resultsRegistersFiltersGeneric22Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 122;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric22 != 0)
            {
                var resultsRegistersFiltersGeneric22Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 122;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric23 != 0)
            {
                var resultsRegistersFiltersGeneric23Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 123;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric24 != 0)
            {
                var resultsRegistersFiltersGeneric24Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 124;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric25 != 0)
            {
                var resultsRegistersFiltersGeneric25Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 125;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric26 != 0)
            {
                var resultsRegistersFiltersGeneric26Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 126;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric27 != 0)
            {
                var resultsRegistersFiltersGeneric27Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 127;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric28 != 0)
            {
                var resultsRegistersFiltersGeneric28Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 128;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric29 != 0)
            {
                var resultsRegistersFiltersGeneric29Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 129;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric30 != 0)
            {
                var resultsRegistersFiltersGeneric30Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 130;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric31 != 0)
            {
                var resultsRegistersFiltersGeneric31Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 131;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric32 != 0)
            {
                var resultsRegistersFiltersGeneric32Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 132;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric32 != 0)
            {
                var resultsRegistersFiltersGeneric32Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 132;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric33 != 0)
            {
                var resultsRegistersFiltersGeneric33Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 133;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric34 != 0)
            {
                var resultsRegistersFiltersGeneric34Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 134;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric35 != 0)
            {
                var resultsRegistersFiltersGeneric35Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 135;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric36 != 0)
            {
                var resultsRegistersFiltersGeneric36Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 136;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric37 != 0)
            {
                var resultsRegistersFiltersGeneric37Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 137;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric38 != 0)
            {
                var resultsRegistersFiltersGeneric38Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 138;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric39 != 0)
            {
                var resultsRegistersFiltersGeneric39Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 139;
                });
            }
            if(gSystemConfig.enableRegistersFilterGeneric40 != 0)
            {
                var resultsRegistersFiltersGeneric40Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 140;
                });
            }
            


            //Build HTML.
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
            <script>
                //Debug.
                //alert(document.location);
                //alert(window.location.hostname);
                //alert(window.location.host);
                //alert(window.location.origin);
            </script>


            <section class="ss-backend-layout-section-data01">
            ${oplRecords.resultsRegistersListing == "" ? `
                <div class="ss-backend-alert ss-backend-layout-div-records-empty">
                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage1") }
                </div>
            ` : `
                <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                    <button 
                        id="registers_delete" 
                        name="registers_delete" 
                        onclick="elementMessage01('formRegistersListing_method', 'DELETE');
                                formSubmit('formRegistersListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/?_method=DELETE');
                                " 
                        class="ss-backend-btn-base ss-backend-btn-action-cancel" 
                        style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                    </button>
                </div>

                <form id="formRegistersListing" name="formRegistersListing" method="POST" action="" enctype="application/x-www-form-urlencoded">
                    <input type="hidden" id="formRegistersListing_method" name="_method" value="">

                    <input type="hidden" id="formRegistersListing_strTable" name="strTable" value="${ gSystemConfig.configSystemDBTableRegisters }" />
                    
                    <input type="hidden" id="formRegistersListing_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="formRegistersListing_pageReturn" name="pageReturn" value="${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters }" />
                    <input type="hidden" id="formRegistersListing_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="formRegistersListing_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                <tr>
                                    ${ gSystemConfig.enableRegistersSortOrder == 1 ? 
                                    `
                                    <td style="width: 40px; text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                    </td>
                                    ` : ``
                                    }

                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDateCreated") }  
                                    </td>

                                    ${ gSystemConfig.enableRegistersImageMain == 1 ? 
                                    `
                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }  
                                    </td>
                                    ` : ``
                                    }

                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersRegister") }  
                                    </td>

                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                    </td>

                                    ${ gSystemConfig.enableRegistersStatus == 1 ? 
                                        `
                                        <td style="width: 100px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersStatus") }  
                                        </td>
                                        ` : ``
                                    }

                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivationA") }  
                                    </td>
                                    ${ gSystemConfig.enableRegistersActivation1 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation1") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableRegistersActivation2 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation2") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableRegistersActivation3 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation3") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableRegistersActivation4 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation4") }  
                                        </td>
                                        ` : ``
                                    }
                                    ${ gSystemConfig.enableRegistersActivation5 == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation5") }  
                                        </td>
                                        ` : ``
                                    }

                                    ${ gSystemConfig.enableRegistersRestrictedAccess == 1 ? 
                                        `
                                        <td style="width: 40px; text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccessA") }  
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
                            ${ oplRecords.resultsRegistersListing.map((registersRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        ${ gSystemConfig.enableRegistersSortOrder == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.valueMaskRead(registersRow.sort_order, "", 3, null) } 
                                        </td>
                                        ` : ``
                                        }

                                        <td style="text-align: center;">
                                            ${ SyncSystemNS.FunctionsGeneric.dateRead01(registersRow.date_creation, 
                                                                                        gSystemConfig.configBackendDateFormat, 
                                                                                        0, 
                                                                                        3) }
                                        </td>

                                        ${ gSystemConfig.enableRegistersImageMain == 1 ? 
                                        `
                                        <td style="text-align: center;">
                                            ${ registersRow.image_main !== "" ? 
                                            `
                                                ${ /*No pop-up.*/'' }
                                                ${ gSystemConfig.configImagePopup == 0 ? 
                                                `
                                                    <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + registersRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.title, "db") }" class="ss-backend-images-listing" />
                                                ` : ``
                                                }

                                                ${ /*GLightbox.*/'' }
                                                ${ gSystemConfig.configImagePopup == 4 ? 
                                                `
                                                    <a href="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + registersRow.image_main + "?v=" + this.cacheClear }"
                                                       title="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.title, "db") }"
                                                       class="glightbox_registers_image_main${ registersRow.id }"
                                                       data-glightbox="title:${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.title, "db") };">

                                                        <img src="${ gSystemConfig.configSystemURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + registersRow.image_main + "?v=" + this.cacheClear }" alt="${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.title, "db") }" class="ss-backend-images-listing" />
                                                    </a>
                                                    <script>
                                                        gLightboxBackendConfigOptions.selector = "glightbox_registers_image_main${ registersRow.id }";
                                                        //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                        //data-glightbox="title: Title example.; description: Description example."
                                                        var glightboxRegistersImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                    </script>
                                                ` : ``
                                                }
                                            ` : ``
                                            }
                                        </td>
                                        ` : ``
                                        }
                                        
                                        <td style="text-align: left;">
                                            ${ gSystemConfig.enableRegistersNameFull == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameFull") }
                                                    </strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.name_full, "db") } 
                                                </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableRegistersNameFirst == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameFirst") }
                                                    </strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.name_first, "db") } 
                                                </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableRegistersNameLast == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameLast") }
                                                    </strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.name_last, "db") } 
                                                </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableRegistersCompanyNameLegal == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersCompanyNameLegal") }
                                                    </strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.company_name_legal, "db") } 
                                                </div>
                                                ` : ``
                                            }

                                            ${ gSystemConfig.enableRegistersCompanyNameAlias == 1 ? 
                                                `
                                                <div>
                                                    <strong>
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersCompanyNameAlias") }
                                                    </strong>
                                                    ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersRow.company_name_alias, "db") } 
                                                </div>
                                                ` : ``
                                            }
                                        </td>

                                        <td style="text-align: center;">
                                            ${ /*SyncSystemNS.FunctionsGeneric.categoryConfigSelect(registersRow.category_type, 4)*/'' }
                                            
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + gSystemConfig.configRouteBackendDetails + "/" + registersRow.id + "/" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a> 
                                            <!--a href="/${ gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendRegisters + "/" + gSystemConfig.configRouteFrontendDetails + "/" + registersRow.id + "/" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDetailsView") }
                                            </a--> ${ /*TODO: Change address to access frontend.*/ '' }


                                            ${ /*Content.*/ '' }
                                            ${ gSystemConfig.enableRegistersContent == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + registersRow.id + "/?masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertContent") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Images.*/ '' }
                                            ${ gSystemConfig.enableRegistersImages == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + registersRow.id + "/?fileType=1&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertImages") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Videos.*/ '' }
                                            ${ gSystemConfig.enableRegistersVideos == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + registersRow.id + "/?fileType=2&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertVideos") }
                                                    </a> 
                                                ` : ``
                                            }
                                            
                                            ${ /*Files.*/ '' }
                                            ${ gSystemConfig.enableRegistersFiles == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + registersRow.id + "/?fileType=3&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertFiles") }
                                                    </a> 
                                                ` : ``
                                            }

                                            ${ /*Zip files.*/ '' }
                                            ${ gSystemConfig.enableRegistersZip == 1 ? 
                                                `
                                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + registersRow.id + "/?fileType=4&masterPageSelect=layout-backend-blank" }" target="_blank" class="ss-backend-links01" style="position: relative; display: block;">
                                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemInsertFilesZip") }
                                                    </a> 
                                                ` : ``
                                            }
                                        </td>

                                        ${ gSystemConfig.enableRegistersStatus == 1 ? 
                                            `
                                            <td style="text-align: center;">
                                                ${ registersRow.id_status == 0 ? `
                                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }
                                                ` : `
                                                    ${ ofglRecords.resultsFiltersGenericListing.filter(function(objFiltered){
                                                        return objFiltered.id == registersRow.id_status;
                                                    }).map(function(objMapped){
                                                        //return objMapped.title
                                                        return SyncSystemNS.FunctionsGeneric.contentMaskRead(objMapped.title, "db");
                                                    }) }

                                                    ${ /*registersRow.id_status*/ '' }
                                                ` }
                                            </td>
                                            ` : ``
                                        }
    
                                        <td id="formRegistersListing_elementActivation${ registersRow.id }" style="text-align: center;" class="${ registersRow.activation == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                            <a id="linkActivation${ registersRow.id }" class="ss-backend-links01" 
                                                onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                         ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ registersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableRegisters }', 
                                                                                        strField:'activation', 
                                                                                        recordValue: '${ registersRow.activation == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formRegistersListing_elementActivation${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formRegistersListing_elementActivation${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                    registersRow.activation == "1" ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                } 
                                            </a>
                                        </td>
                                        ${ gSystemConfig.enableRegistersActivation1 == 1 ? 
                                            `
                                            <td id="formRegistersListing_elementActivation1${ registersRow.id }" style="text-align: center;" class="${ registersRow.activation1 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation1${ registersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ registersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableRegisters }', 
                                                                                        strField:'activation1', 
                                                                                        recordValue: '${ registersRow.activation1 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formRegistersListing_elementActivation1${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formRegistersListing_elementActivation1${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation1${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        registersRow.activation1 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableRegistersActivation2 == 1 ? 
                                            `
                                            <td id="formRegistersListing_elementActivation2${ registersRow.id }" style="text-align: center;" class="${ registersRow.activation2 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation2${ registersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ registersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableRegisters }', 
                                                                                        strField:'activation2', 
                                                                                        recordValue: '${ registersRow.activation2 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formRegistersListing_elementActivation2${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formRegistersListing_elementActivation2${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation2${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        registersRow.activation2 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableRegistersActivation3 == 1 ? 
                                            `
                                            <td id="formRegistersListing_elementActivation3${ registersRow.id }" style="text-align: center;" class="${ registersRow.activation3 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation3${ registersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ registersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableRegisters }', 
                                                                                        strField:'activation3', 
                                                                                        recordValue: '${ registersRow.activation3 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formRegistersListing_elementActivation3${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formRegistersListing_elementActivation3${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation3${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        registersRow.activation3 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableRegistersActivation4 == 1 ? 
                                            `
                                            <td id="formRegistersListing_elementActivation4${ registersRow.id }" style="text-align: center;" class="${ registersRow.activation4 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation4${ registersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ registersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableRegisters }', 
                                                                                        strField:'activation4', 
                                                                                        recordValue: '${ registersRow.activation4 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formRegistersListing_elementActivation4${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formRegistersListing_elementActivation4${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation4${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        registersRow.activation4 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
                                        ${ gSystemConfig.enableRegistersActivation5 == 1 ? 
                                            `
                                            <td id="formRegistersListing_elementActivation5${ registersRow.id }" style="text-align: center;" class="${ registersRow.activation5 == 1 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkActivation5${ registersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ registersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableRegisters }', 
                                                                                        strField:'activation5', 
                                                                                        recordValue: '${ registersRow.activation5 == 1 ? 0 : 1}', 
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
                                                                                                elementCSSAdd('formRegistersListing_elementActivation5${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSRemove('formRegistersListing_elementActivation5${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkActivation5${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A") }');
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
                                                        registersRow.activation5 == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1A")
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0A") 
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }

                                        ${ gSystemConfig.enableRegistersRestrictedAccess == 1 ? 
                                            `
                                            <td id="formRegistersListing_elementRestrictedAccess${ registersRow.id }" style="text-align: center;" class="${ registersRow.restricted_access == 0 ? "" : "ss-backend-table-bg-deactive"}">
                                                <a id="linkRestrictedAccess${ registersRow.id }" class="ss-backend-links01"
                                                    onclick="htmlGenericStyle01('updtProgressGeneric', 'display', 'block');
                                                             ajaxRecordsPatch01_async('${ gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords }/',
                                                                                    {
                                                                                        idRecord: '${ registersRow.id }', 
                                                                                        strTable: '${ gSystemConfig.configSystemDBTableRegisters }', 
                                                                                        strField:'restricted_access', 
                                                                                        recordValue: '${ registersRow.restricted_access == 1 ? 0 : 1}', 
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
                                                                                                elementCSSRemove('formRegistersListing_elementRestrictedAccess${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkRestrictedAccess${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0A") }');
                                                                                            }

                                                                                            if(_resObjReturn.objReturn.recordUpdatedValue == '1')
                                                                                            {
                                                                                                //Change cell color.
                                                                                                elementCSSAdd('formRegistersListing_elementRestrictedAccess${ registersRow.id }', 'ss-backend-table-bg-deactive');

                                                                                                //Change link text.
                                                                                                elementMessage01('linkRestrictedAccess${ registersRow.id }', '${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1A") }');
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
                                                        registersRow.restricted_access == "1" ? 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1A") 
                                                        : 
                                                        SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0A")
                                                    } 
                                                </a>
                                            </td>
                                            ` : ``
                                        }
        
                                        <td style="text-align: center;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + gSystemConfig.configRouteBackendActionEdit + "/" +  registersRow.id + "/?" + this.queryDefault }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <!--input type="checkbox" name="idsRecordsDelete[]" value="${registersRow.id}" class="ss-backend-field-checkbox" /--> 
                                            <input type="checkbox" name="idsRecordsDelete" value="${registersRow.id}" class="ss-backend-field-checkbox" /> 
                                            <!--input type="checkbox" name="arrIdsRecordsDelete" value="${registersRow.id}" class="ss-backend-field-checkbox" /--> 
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
                    ${ gSystemConfig.enableRegistersBackendPagination == 1 ? 
                    `
                        <div class="ss-backend-paging" style="position: relative; display: block; overflow: hidden; text-align: center;">

                            ${ /*Page numbers.*/'' }
                            ${ gSystemConfig.enableRegistersBackendPaginationNumbering == 1 ? 
                            `
                                <div class="ss-backend-paging-number-link-a" style="position: relative; display: block; overflow: hidden;">
                                    ${Array(this._pagingTotal).fill().map((item, pageNumberOutput)=>{
                                        return `
                                            ${ (pageNumberOutput + 1) == this._pageNumber ? `
                                                ${ pageNumberOutput + 1 }
                                            ` : `
                                                <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=${ pageNumberOutput + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPageCounter01") + " " + pageNumberOutput + 1 }" class="ss-backend-paging-number-link">
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
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=1" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingFirst") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) - 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingPrevious") } 
                                    </a>
                                    `
                                }

                                
                                ${ this._pageNumber == this._pagingTotal ? 
                                    `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn" style="visibility: hidden;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") } 
                                    </a>
                                    ` : `
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=${ parseFloat(this._pageNumber) + 1 }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") }" class="ss-backend-paging-btn">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingNext") } 
                                    </a>
                                    <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" +  this._idParent }?pageNumber=${ this._pagingTotal }" title="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendPagingLast") }" class="ss-backend-paging-btn">
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
            ` }
            </section>


            ${ /*Form.*/'' }
            <section class="ss-backend-layout-section-form01">
                <form id="formRegisters" name="formRegisters" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters }" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden;">
                        <script>
                            //Debug.
                            //webpackDebugTest(); //webpack debug


                            //Reorder table rows.
                            //TODO: Create variable in config to enable it.
                            document.addEventListener('DOMContentLoaded', function() {
                                inputDataReorder([${ gSystemConfig.configRegistersInputOrder.map((arrayRow)=>{
                                                    return `"${ arrayRow }"`}).join(",") 
                                                }]); //necessary to map the array in order to display as an array inside template literals

                            }, false);
                        </script>

                        <table id="input_table_registers" class="ss-backend-table-input01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersTitleTable") } 
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01">
                                
                            </thead>
                            <tbody class="ss-backend-table-listing-text01">
                                ${ gSystemConfig.enableRegistersSortOrder == 1 ? 
                                `
                                <tr id="inputRowRegisters_sort_order" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrder") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_sort_order" name="sort_order" class="ss-backend-field-numeric01" maxlength="10" value="0" />
                                        <script>
                                            Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_sort_order");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersType == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_id_type" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersType") }: 
                                        </td>
                                        <td>
                                            <select id="registers_id_type" name="id_type" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersTypeListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableRegistersBindRegisterUser == 1 ? 
                                `
                                <tr id="inputRowRegisters_id_register_user" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersRU") }: 
                                    </td>
                                    <td>
                                        <select id="registers_id_register_user" name="id_register_user" class="ss-backend-field-dropdown01">
                                            <option value="0" selected="true">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="registers_id_register_user" name="id_register_user" value="0" />
                                `
                                }

                                ${ gSystemConfig.enableRegistersRegisterType == 1 ? 
                                `
                                <tr id="inputRowRegisters_register_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersRegisterType") }: 
                                    </td>
                                    <td>
                                        <select id="registers_register_type" name="register_type" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersRegisterType1") }</option>
                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersRegisterType2") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : `
                                <input type="hidden" id="registers_register_type" name="register_type" value="0" />
                                `
                                }

                                ${ gSystemConfig.enableRegistersNameTitle == 1 ? 
                                `
                                <tr id="inputRowRegisters_name_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <select id="registers_name_title" name="name_title" class="ss-backend-field-dropdown01">
                                            <option value="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameTitle1") }" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameTitle1") }</option>
                                            <option value="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameTitle2") }">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameTitle2") }</option>
                                            <option value="${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameTitle3") }"></option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNameFull == 1 ? 
                                `
                                <tr id="inputRowRegisters_name_full" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameFull") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_name_full" name="name_full" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNameFirst == 1 ? 
                                `
                                <tr id="inputRowRegisters_name_first" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameFirst") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_name_first" name="name_first" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNameLast == 1 ? 
                                `
                                <tr id="inputRowRegisters_name_last" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNameLast") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_name_last" name="name_last" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersCompanyNameLegal == 1 ? 
                                `
                                <tr id="inputRowRegisters_company_name_legal" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersCompanyNameLegal") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_company_name_legal" name="company_name_legal" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersCompanyNameAlias == 1 ? 
                                `
                                <tr id="inputRowRegisters_company_name_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersCompanyNameAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_company_name_alias" name="company_name_alias" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDescription == 1 ? 
                                `
                                <tr id="inputRowRegisters_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDescription") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="registers_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="registers_description" name="description" class="ss-backend-field-text-area01"></textarea>
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
                                            <textarea id="registers_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#registers_description");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="registers_description" name="description" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#registers_description",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#registers_description";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                         ` : ``}
                                     </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.configRegistersURLAlias == 1 ? 
                                `
                                <tr id="inputRowRegisters_url_alias" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLAlias") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_url_alias" name="url_alias" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersKeywordsTags == 1 ? 
                                `
                                <tr id="inputRowRegisters_keywords_tags" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywords") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_keywords_tags" name="keywords_tags" class="ss-backend-field-text-area01"></textarea>
                                        <div>
                                            (${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemKeywordsInstruction01") })
                                        </div>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableRegistersMetaDescription == 1 ? 
                                `
                                <tr id="inputRowRegisters_meta_description" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaDescription") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_meta_description" name="meta_description" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersMetaTitle == 1 ? 
                                `
                                <tr id="inputRowRegisters_meta_title" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemMetaTitle") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_meta_title" name="meta_title" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDateBirth != 0 ? 
                                `
                                <tr id="inputRowRegisters_date_birth" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDateBirth") }: 
                                    </td>
                                    <td>
                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.enableRegistersDateBirth == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date_birth_day" name="date_birth_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date_birth_month" name="date_birth_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date_birth_year" name="date_birth_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date_birth_month" name="date_birth_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date_birth_day" name="date_birth_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: 4}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date_birth_year" name="date_birth_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: 4}).map((arrayRow)=>{
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
                                        ${ /*TODO: Think about a logic that takes account jsDatepickerBirthBackendConfigOptions.dateSelected as default value, if field is required.*/'' }
                                        ${ gSystemConfig.enableRegistersDateBirth == 11 ? 
                                            `
                                            <input type="text" id="registers_date_birth" name="date_birth" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDateBirth = datepicker("#registers_date_birth", jsDatepickerBirthBackendConfigOptions);
                                            </script>
                                            ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersGender == 1 ? 
                                `
                                <tr id="inputRowRegisters_gender" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender") }: 
                                    </td>
                                    <td>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender" checked value="0" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender0") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender" value="1" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender1") }
                                        </label>
                                        <label class="ss-backend-field-radio-label">
                                            <input type="radio" name="gender" value="2" class="ss-backend-field-radio" />
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemGender2") }
                                        </label>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersHeight == 1 ? 
                                `
                                <tr id="inputRowRegisters_height" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersHeight") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_height" name="height" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                        ${ gSystemConfig.configSystemHeight }

                                        <script>
                                            Inputmask(inputmaskDecimalBackendConfigOptions).mask("registers_height");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersWeight == 1 ? 
                                `
                                <tr id="inputRowRegisters_weight" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersWeight") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_weight" name="weight" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                        ${ gSystemConfig.configSystemWeight }

                                        <script>
                                            Inputmask(inputmaskDecimalBackendConfigOptions).mask("registers_weight");
                                        </script>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocumentType == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentType") }: 
                                    </td>
                                    <td>
                                        <select id="registers_document_type" name="document_type" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentType1") }</option>
                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentType55") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocument == 1 ? 
                                `
                                <tr id="inputRowRegisters_document" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocument") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_document" name="document" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocument1Type == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_type1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocument1Type") }: 
                                    </td>
                                    <td>
                                        <select id="registers_document1_type1" name="document1_type1" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentType1") }</option>
                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentType55") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocument1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_document1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocument1") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_document1" name="document1" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocument2Type == 1 ? 
                                `
                                <tr id="inputRowRegisters_document2_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocument2Type") }: 
                                    </td>
                                    <td>
                                        <select id="registers_document2_type" name="document2_type" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentType1") }</option>
                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentType55") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocument2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_document2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocument2") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_document2" name="document2" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }


                                ${ gSystemConfig.enableRegistersDocumentCompanyType == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_company_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompanyType") }: 
                                    </td>
                                    <td>
                                        <select id="registers_document_company_type" name="document_company_type" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompanyType1") }</option>
                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompanyType55") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocumentCompany == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_company" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompany") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_document_company" name="document_company" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocumentCompany1Type == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_company_type1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompany1Type") }: 
                                    </td>
                                    <td>
                                        <select id="registers_document_company1_type1" name="document_company1_type1" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompanyType1") }</option>
                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompanyType55") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocumentCompany1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_company1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompany1") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_document_company1" name="document_company1" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocumentCompany2Type == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_company2_type" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompany2Type") }: 
                                    </td>
                                    <td>
                                        <select id="registers_document_company2_type" name="document_company2_type" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompanyType1") }</option>
                                            <option value="2">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompanyType55") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersDocumentCompany2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_document_company2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDocumentCompany2") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_document_company2" name="document_company2" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersZIPCode == 1 ? 
                                `
                                <tr id="inputRowRegisters_zip_code" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressZipCode") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_zip_code" name="zip_code" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersAddressStreet == 1 ? 
                                `
                                <tr id="inputRowRegisters_address_street" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressStreet") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_address_street" name="address_street" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersAddressNumber == 1 ? 
                                `
                                <tr id="inputRowRegisters_address_number" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressNumber") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_address_number" name="address_number" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersAddressComplement == 1 ? 
                                `
                                <tr id="inputRowRegisters_address_complement" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressComplement") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_address_complement" name="address_complement" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersNeighborhood == 1 ? 
                                `
                                <tr id="inputRowRegisters_neighborhood" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressNeighborhood") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_neighborhood" name="neighborhood" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersDistrict == 1 ? 
                                `
                                <tr id="inputRowRegisters_district" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressDistrict") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_district" name="district" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersCounty == 1 ? 
                                `
                                <tr id="inputRowRegisters_county" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCounty") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_county" name="county" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersCity == 1 ? 
                                `
                                <tr id="inputRowRegisters_city" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCity") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_city" name="city" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersState == 1 ? 
                                `
                                <tr id="inputRowRegisters_state" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressState") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_state" name="state" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersCountry == 1 ? 
                                `
                                <tr id="inputRowRegisters_country" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemAddressCountry") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_country" name="country" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                
                                ${ gSystemConfig.enableRegistersLocationReference == 1 ? 
                                `
                                <tr id="inputRowRegisters_location_reference" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersLocationReference") }: 
                                    </td>
                                    <td>
                                        ${ /*No formatting*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 1 ? `
                                            <textarea id="registers_location_reference" name="location_reference" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``}


                                        ${ /*Quill*/'' }
                                        ${ gSystemConfig.configBackendTextBox == 13 ? `
                                            <textarea id="registers_location_reference" name="location_reference" class="ss-backend-field-text-area01"></textarea>
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
                                            <textarea id="registers_location_reference" name="location_reference" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                new FroalaEditor("#registers_location_reference");
                                            </script>
                                         ` : ``}


                                         ${ /*TinyMCE*/'' }
                                         ${ gSystemConfig.configBackendTextBox == 17 || gSystemConfig.configBackendTextBox == 18 ? `
                                            <textarea id="registers_location_reference" name="location_reference" class="ss-backend-field-text-area01"></textarea>
                                            <script>
                                                /*
                                                tinymce.init({
                                                    selector: "#registers_location_reference",
                                                });
                                                */ /*working*/

                                                tinyMCEBackendConfig.selector = "#registers_location_reference";
                                                tinymce.init(tinyMCEBackendConfig);
                                            </script>
                                         ` : ``}
                                     </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersLocationMap == 1 ? 
                                `
                                <tr id="inputRowRegisters_location_map" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersLocationMap") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_location_map" name="location_map" class="ss-backend-field-text-area01"></textarea>
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersWebsite == 1 ? 
                                `
                                <tr id="inputRowRegisters_website" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemWebsite") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_website" name="website" class="ss-backend-field-text-area-url"></textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersPhone1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_phone1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersPhone1") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableRegistersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="registers_phone1_international_code" name="phone1_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="" />
                                        ` : ``
                                        }
                                        (<input type="text" id="registers_phone1_area_code" name="phone1_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="" />)
                                        <input type="text" id="registers_phone1" name="phone1" class="ss-backend-field-tel01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersPhone2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_phone2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersPhone2") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableRegistersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="registers_phone2_international_code" name="phone2_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="" />
                                        ` : ``
                                        }
                                        (<input type="text" id="registers_phone2_area_code" name="phone2_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="" />)
                                        <input type="text" id="registers_phone2" name="phone2" class="ss-backend-field-tel01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersPhone3 == 1 ? 
                                `
                                <tr id="inputRowRegisters_phone3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersPhone3") }: 
                                    </td>
                                    <td>
                                        ${ gSystemConfig.enableRegistersPhoneInternationalCode == 1 ? 
                                        `
                                            +<input type="text" id="registers_phone3_international_code" name="phone3_international_code" class="ss-backend-field-tel-ac01" maxlength="3" value="" />
                                        ` : ``
                                        }
                                        (<input type="text" id="registers_phone3_area_code" name="phone3_area_code" class="ss-backend-field-tel-ac01" maxlength="10" value="" />)
                                        <input type="text" id="registers_phone3" name="phone3" class="ss-backend-field-tel01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersUsername == 1 ? 
                                `
                                <tr id="inputRowRegisters_username" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersUsername") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_username" name="username" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersEmail == 1 ? 
                                `
                                <tr id="inputRowRegisters_email" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEmail") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_email" name="email" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.configRegistersPassword == 1 ? 
                                `
                                <tr id="inputRowRegisters_password" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemPassword") }: 
                                    </td>
                                    <td>
                                        <input type="password" id="registers_password" name="password" class="ss-backend-field-text01" maxlength="255" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Generic filters.*/'' }
                                ${ gSystemConfig.enableRegistersFilterGeneric1 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric1") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric1 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric1Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric1" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric1 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric1" name="idsRegistersFiltersGeneric1" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric1Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric1 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric1" name="idsRegistersFiltersGeneric1" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric1Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric1 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric1Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric1" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric2 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric2") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric2 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric2Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric2" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric2 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric2" name="idsRegistersFiltersGeneric2" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric2Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric2 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric2" name="idsRegistersFiltersGeneric2" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric2Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric2 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric2Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric2" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric3 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric3") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric3 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric3Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric3" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric3 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric3" name="idsRegistersFiltersGeneric3" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric3Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric3 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric3" name="idsRegistersFiltersGeneric3" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric3Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric3 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric3Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric3" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric4 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric4") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric4 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric4Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric4" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric4 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric4" name="idsRegistersFiltersGeneric4" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric4Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric4 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric4" name="idsRegistersFiltersGeneric4" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric4Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric4 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric4Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric4" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric5 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric5") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric5 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric5Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric5" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric5 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric5" name="idsRegistersFiltersGeneric5" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric5Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric5 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric5" name="idsRegistersFiltersGeneric5" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric5Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric5 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric5Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric5" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric6 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric6") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric6 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric6Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric6" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric6 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric6" name="idsRegistersFiltersGeneric6" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric6Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric6 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric6" name="idsRegistersFiltersGeneric6" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric6Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric6 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric6Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric6" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric7 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric7") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric7 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric7Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric7" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric7 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric7" name="idsRegistersFiltersGeneric7" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric7Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric7 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric7" name="idsRegistersFiltersGeneric7" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric7Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric7 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric7Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric7" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric8 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric8") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric8 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric8Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric8" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric8 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric8" name="idsRegistersFiltersGeneric8" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric8Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric8 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric8" name="idsRegistersFiltersGeneric8" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric8Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric8 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric8Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric8" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric9 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric9") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric9 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric9Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric9" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric9 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric9" name="idsRegistersFiltersGeneric9" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric9Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric9 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric9" name="idsRegistersFiltersGeneric9" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric9Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric9 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric9Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric9" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric10 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric10") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric10 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric10Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric10" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric10 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric10" name="idsRegistersFiltersGeneric10" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric10Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric10 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric10" name="idsRegistersFiltersGeneric10" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric10Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric10 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric10Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric10" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric11 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter11" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric11") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric11 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric11Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric11" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric11 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric11" name="idsRegistersFiltersGeneric11" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric11Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric11 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric11" name="idsRegistersFiltersGeneric11" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric11Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric11 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric11Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric11" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric12 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter12" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric12") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric12 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric12Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric12" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric12 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric12" name="idsRegistersFiltersGeneric12" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric12Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric12 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric12" name="idsRegistersFiltersGeneric12" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric12Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric12 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric12Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric12" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric13 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter13" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric13") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric13 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric13Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric13" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric13 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric13" name="idsRegistersFiltersGeneric13" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric13Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric13 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric13" name="idsRegistersFiltersGeneric13" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric13Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric13 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric13Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric13" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric14 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter14" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric14") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric14 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric14Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric14" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric14 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric14" name="idsRegistersFiltersGeneric14" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric14Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric14 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric14" name="idsRegistersFiltersGeneric14" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric14Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric14 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric14Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric14" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric15 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter15" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric15") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric15 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric15Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric15" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric15 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric15" name="idsRegistersFiltersGeneric15" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric15Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric15 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric15" name="idsRegistersFiltersGeneric15" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric15Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric15 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric15Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric15" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric16 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter16" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric16") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric16 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric16Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric16" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric16 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric16" name="idsRegistersFiltersGeneric16" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric16Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric16 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric16" name="idsRegistersFiltersGeneric16" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric16Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric16 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric16Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric16" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric17 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter17" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric17") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric17 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric17Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric17" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric17 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric17" name="idsRegistersFiltersGeneric17" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric17Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric17 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric17" name="idsRegistersFiltersGeneric17" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric17Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric17 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric17Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric17" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric18 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter18" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric18") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric18 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric18Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric18" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric18 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric18" name="idsRegistersFiltersGeneric18" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric18Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric18 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric18" name="idsRegistersFiltersGeneric18" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric18Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric18 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric18Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric18" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric19 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter19" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric19") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric19 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric19Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric19" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric19 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric19" name="idsRegistersFiltersGeneric19" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric19Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric19 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric19" name="idsRegistersFiltersGeneric19" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric19Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric19 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric19Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric19" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric20 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter20" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric20") }teste: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric20 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric20Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric20" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric20 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric20" name="idsRegistersFiltersGeneric20" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric20Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric20 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric20" name="idsRegistersFiltersGeneric20" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric20Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric20 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric20Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric20" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric21 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter21" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric21") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric21 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric21Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric21" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric21 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric21" name="idsRegistersFiltersGeneric21" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric21Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric21 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric21" name="idsRegistersFiltersGeneric21" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric21Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric21 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric21Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric21" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric22 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter22" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric22") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric22 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric22Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric22" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric22 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric22" name="idsRegistersFiltersGeneric22" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric22Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric22 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric22" name="idsRegistersFiltersGeneric22" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric22Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric22 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric22Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric22" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric23 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter23" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric23") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric23 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric23Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric23" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric23 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric23" name="idsRegistersFiltersGeneric23" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric23Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric23 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric23" name="idsRegistersFiltersGeneric23" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric23Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric23 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric23Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric23" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric24 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter24" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric24") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric24 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric24Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric24" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric24 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric24" name="idsRegistersFiltersGeneric24" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric24Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric24 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric24" name="idsRegistersFiltersGeneric24" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric24Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric24 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric24Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric24" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric25 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter25" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric25") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric25 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric25Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric25" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric25 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric25" name="idsRegistersFiltersGeneric25" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric25Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric25 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric25" name="idsRegistersFiltersGeneric25" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric25Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric25 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric25Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric25" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric26 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter26" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric26") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric26 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric26Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric26" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric26 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric26" name="idsRegistersFiltersGeneric26" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric26Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric26 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric26" name="idsRegistersFiltersGeneric26" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric26Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric26 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric26Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric26" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric27 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter27" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric27") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric27 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric27Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric27" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric27 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric27" name="idsRegistersFiltersGeneric27" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric27Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric27 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric27" name="idsRegistersFiltersGeneric27" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric27Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric27 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric27Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric27" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric28 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter28" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric28") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric28 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric28Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric28" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric28 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric28" name="idsRegistersFiltersGeneric28" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric28Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric28 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric28" name="idsRegistersFiltersGeneric28" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric28Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric28 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric28Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric28" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric29 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter29" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric29") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric29 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric29Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric29" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric29 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric29" name="idsRegistersFiltersGeneric29" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric29Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric29 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric29" name="idsRegistersFiltersGeneric29" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric29Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric29 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric29Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric29" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric30 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter30" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric30") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric30 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric30Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric30" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric30 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric30" name="idsRegistersFiltersGeneric30" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric30Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric30 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric30" name="idsRegistersFiltersGeneric30" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric30Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric30 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric30Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric30" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric31 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter31" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric31") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric31 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric31Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric31" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric31 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric31" name="idsRegistersFiltersGeneric31" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric31Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric31 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric31" name="idsRegistersFiltersGeneric31" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric31Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric31 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric31Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric31" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric32 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter32" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric32") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric32 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric32Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric32" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric32 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric32" name="idsRegistersFiltersGeneric32" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric32Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric32 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric32" name="idsRegistersFiltersGeneric32" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric32Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric32 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric32Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric32" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric33 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter33" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric33") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric33 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric33Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric33" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric33 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric33" name="idsRegistersFiltersGeneric33" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric33Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric33 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric33" name="idsRegistersFiltersGeneric33" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric33Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric33 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric33Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric33" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric34 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter34" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric34") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric34 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric34Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric34" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric34 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric34" name="idsRegistersFiltersGeneric34" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric34Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric34 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric34" name="idsRegistersFiltersGeneric34" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric34Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric34 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric34Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric34" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric35 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter35" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric35") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric35 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric35Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric35" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric35 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric35" name="idsRegistersFiltersGeneric35" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric35Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric35 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric35" name="idsRegistersFiltersGeneric35" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric35Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric35 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric35Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric35" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric36 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter36" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric36") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric36 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric36Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric36" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric36 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric36" name="idsRegistersFiltersGeneric36" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric36Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric36 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric36" name="idsRegistersFiltersGeneric36" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric36Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric36 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric36Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric36" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric37 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter37" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric37") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric37 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric37Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric37" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric37 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric37" name="idsRegistersFiltersGeneric37" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric37Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric37 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric37" name="idsRegistersFiltersGeneric37" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric37Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric37 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric37Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric37" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric38 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter38" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric38") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric38 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric38Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric38" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric38 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric38" name="idsRegistersFiltersGeneric38" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric38Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric38 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric38" name="idsRegistersFiltersGeneric38" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric38Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric38 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric38Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric38" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric39 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter39" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric39") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric39 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric39Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric39" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric39 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric39" name="idsRegistersFiltersGeneric39" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric39Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric39 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric39" name="idsRegistersFiltersGeneric39" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric39Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric39 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric39Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric39" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFilterGeneric40 != 0 ? 
                                `
                                <tr id="inputRowRegisters_generic_filter40" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFilterGeneric40") }: 
                                    </td>
                                    <td>
                                        ${ /*Checkbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric40 == 1 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric40Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-checkbox-label">
                                                        <input type="checkbox" name="idsRegistersFiltersGeneric40" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-checkbox" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
                                                    </label>
                                                `;
                                            }).join("")}
                                        ` : ``
                                        }

                                        ${ /*Listbox.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric40 == 2 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric40" name="idsRegistersFiltersGeneric40" class="ss-backend-field-listbox01" size="5" multiple="multiple">
                                                ${resultsRegistersFiltersGeneric40Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Dropdown.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric40 == 3 ? 
                                        `
                                            <select id="idsRegistersFiltersGeneric40" name="idsRegistersFiltersGeneric40" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersFiltersGeneric40Listing.map((registersFiltersGenericRow)=>{
                                                    return `
                                                        <option value="${ registersFiltersGenericRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }</option>
                                                    `;
                                                }).join("")}
                                            </select>
                                        ` : ``
                                        }

                                        ${ /*Radio.*/'' }
                                        ${ gSystemConfig.enableRegistersFilterGeneric40 == 4 ? 
                                        `
                                            ${resultsRegistersFiltersGeneric40Listing.map((registersFiltersGenericRow)=>{
                                                return `
                                                    <label class="ss-backend-field-radio-label">
                                                        <input type="radio" name="idsRegistersFiltersGeneric40" value="${ registersFiltersGenericRow.id }" class="ss-backend-field-radio" /> ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(registersFiltersGenericRow.title, "db") }
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
                                ${ gSystemConfig.enableRegistersInfo1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo1FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info1";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo1FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info1" name="info1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo1FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info1" name="info1" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo2FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info2";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo2FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info2" name="info2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo2FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info2" name="info2" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo3 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo3FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info3";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo3FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info3" name="info3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo3FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info3" name="info3" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo4 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo4FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info4";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo4FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info4" name="info4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo4FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info4" name="info4" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo5 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo5FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info5";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo5FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info5" name="info5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo5FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info5" name="info5" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo6 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo6FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info6" name="info6" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info6";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo6FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info6" name="info6" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo6FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info6" name="info6" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo7 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo7FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info7" name="info7" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info7";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo7FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info7" name="info7" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo7FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info7" name="info7" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo8 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo8FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info8" name="info8" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info8";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo8FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info8" name="info8" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo8FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info8" name="info8" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo9 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo9FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info9" name="info9" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info9";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo9FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info9" name="info9" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo9FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info9" name="info9" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo10 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo10FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info10" name="info10" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info10";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo10FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info10" name="info10" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo10FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info10" name="info10" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo11 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info11" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo11") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo11FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info11" name="info11" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo11FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info11" name="info11" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info11" name="info11" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info11";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo11FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info11" name="info11" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo11FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info11" name="info11" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo12 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info12" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo12") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo12FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info12" name="info12" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo12FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info12" name="info12" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info12" name="info12" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info12";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo12FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info12" name="info12" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo12FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info12" name="info12" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo13 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info13" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo13") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo13FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info13" name="info13" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo13FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info13" name="info13" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info13" name="info13" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info13";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo13FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info13" name="info13" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo13FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info13" name="info13" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo14 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info14" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo14") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo14FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info14" name="info14" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo14FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info14" name="info14" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info14" name="info14" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info14";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo14FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info14" name="info14" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo14FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info14" name="info14" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo15 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info15" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo15") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo15FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info15" name="info15" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo15FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info15" name="info15" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info15" name="info15" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info15";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo15FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info15" name="info15" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo15FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info15" name="info15" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo16 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info16" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo16") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo16FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info16" name="info16" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo16FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info16" name="info16" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info16" name="info16" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info16";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo16FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info16" name="info16" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo16FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info16" name="info16" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo17 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info17" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo17") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo17FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info17" name="info17" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo17FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info17" name="info17" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info17" name="info17" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info17";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo17FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info17" name="info17" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo17FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info17" name="info17" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo18 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info18" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo18") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo18FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info18" name="info18" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo18FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info18" name="info18" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info18" name="info18" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info18";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo18FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info18" name="info18" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo18FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info18" name="info18" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo19 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info19" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo19") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo19FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info19" name="info19" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo19FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info19" name="info19" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info19" name="info19" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info19";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo19FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info19" name="info19" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo19FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info19" name="info19" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersInfo20 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info20" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfo20") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfo20FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info20" name="info20" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfo20FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info20" name="info20" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info20" name="info20" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info20";
                                                    tinymce.init(tinyMCEBackendConfig);
                                                </script>
                                             ` : ``
                                            }
                                        ` : ``
                                        }

                                        ${ /*Single line (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo20FieldType == 11 ? 
                                        `
                                            <input type="text" id="registers_info20" name="info20" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline (encrypted).*/'' }
                                        ${ gSystemConfig.configRegistersInfo20FieldType == 12 ? 
                                        `
                                            <textarea id="registers_info20" name="info20" class="ss-backend-field-text-area01"></textarea>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Information (small) fields.*/'' }
                                ${ gSystemConfig.enableRegistersInfoS1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS1") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small1" name="info_small1" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS1FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small1" name="info_small1" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small1";
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

                                ${ gSystemConfig.enableRegistersInfoS2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS2") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small2" name="info_small2" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS2FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small2" name="info_small2" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small2";
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

                                ${ gSystemConfig.enableRegistersInfoS3 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS3") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small3" name="info_small3" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS3FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small3" name="info_small3" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small3";
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

                                ${ gSystemConfig.enableRegistersInfoS4 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS4") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small4" name="info_small4" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS4FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small4" name="info_small4" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small4";
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

                                ${ gSystemConfig.enableRegistersInfoS5 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS5") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small5" name="info_small5" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS5FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small5" name="info_small5" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small5";
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

                                ${ gSystemConfig.enableRegistersInfoS6 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small6" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS6") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS6FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small6" name="info_small6" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS6FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small6" name="info_small6" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small6" name="info_small6" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small6";
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

                                ${ gSystemConfig.enableRegistersInfoS7 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small7" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS7") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS7FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small7" name="info_small7" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS7FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small7" name="info_small7" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small7" name="info_small7" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small7";
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

                                ${ gSystemConfig.enableRegistersInfoS8 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small8" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS8") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS8FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small8" name="info_small8" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS8FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small8" name="info_small8" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small8" name="info_small8" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small8";
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

                                ${ gSystemConfig.enableRegistersInfoS9 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small9" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS9") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS9FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small9" name="info_small9" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS9FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small9" name="info_small9" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small9" name="info_small9" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small9";
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
                                
                                ${ gSystemConfig.enableRegistersInfoS10 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small10" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS10") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS10FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small10" name="info_small10" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS10FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small10" name="info_small10" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small10" name="info_small10" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small10";
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

                                ${ gSystemConfig.enableRegistersInfoS11 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small11" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS11") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS11FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small11" name="info_small11" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS11FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small11" name="info_small11" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small11" name="info_small11" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small11";
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

                                ${ gSystemConfig.enableRegistersInfoS12 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small12" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS12") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS12FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small12" name="info_small12" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS12FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small12" name="info_small12" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small12" name="info_small12" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small12";
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

                                ${ gSystemConfig.enableRegistersInfoS13 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small13" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS13") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS13FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small13" name="info_small13" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS13FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small13" name="info_small13" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small13" name="info_small13" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small13";
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

                                ${ gSystemConfig.enableRegistersInfoS14 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small14" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS14") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS14FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small14" name="info_small14" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS14FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small14" name="info_small14" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small14" name="info_small14" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small14";
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

                                ${ gSystemConfig.enableRegistersInfoS15 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small15" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS15") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS15FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small15" name="info_small15" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS15FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small15" name="info_small15" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small15" name="info_small15" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small15";
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

                                ${ gSystemConfig.enableRegistersInfoS16 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small16" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS16") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS16FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small16" name="info_small16" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS16FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small16" name="info_small16" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small16" name="info_small16" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small16";
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

                                ${ gSystemConfig.enableRegistersInfoS17 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small17" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS17") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS17FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small17" name="info_small17" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS17FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small17" name="info_small17" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small17" name="info_small17" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small17";
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

                                ${ gSystemConfig.enableRegistersInfoS18 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small18" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS18") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS18FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small18" name="info_small18" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS18FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small18" name="info_small18" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small18" name="info_small18" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small18";
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

                                ${ gSystemConfig.enableRegistersInfoS19 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small19" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS19") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS19FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small19" name="info_small19" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS19FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small19" name="info_small19" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small19" name="info_small19" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small19";
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
                                
                                ${ gSystemConfig.enableRegistersInfoS20 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small20" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS20") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS20FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small20" name="info_small20" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS20FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small20" name="info_small20" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small20" name="info_small20" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small20";
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

                                ${ gSystemConfig.enableRegistersInfoS21 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small21" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS21") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS21FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small21" name="info_small21" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS21FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small21" name="info_small21" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small21" name="info_small21" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small21";
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

                                ${ gSystemConfig.enableRegistersInfoS22 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small22" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS22") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS22FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small22" name="info_small22" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS22FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small22" name="info_small22" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small22" name="info_small22" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small22";
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

                                ${ gSystemConfig.enableRegistersInfoS23 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small23" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS23") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS23FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small23" name="info_small23" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS23FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small23" name="info_small23" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small23" name="info_small23" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small23";
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

                                ${ gSystemConfig.enableRegistersInfoS24 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small24" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS24") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS24FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small24" name="info_small24" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS24FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small24" name="info_small24" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small24" name="info_small24" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small24";
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

                                ${ gSystemConfig.enableRegistersInfoS25 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small25" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS25") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS25FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small25" name="info_small25" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS25FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small25" name="info_small25" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small25" name="info_small25" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small25";
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

                                ${ gSystemConfig.enableRegistersInfoS26 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small26" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS26") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS26FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small26" name="info_small26" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS26FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small26" name="info_small26" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small26" name="info_small26" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small26";
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

                                ${ gSystemConfig.enableRegistersInfoS27 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small27" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS27") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS27FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small27" name="info_small27" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS27FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small27" name="info_small27" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small27" name="info_small27" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small27";
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

                                ${ gSystemConfig.enableRegistersInfoS28 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small28" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS28") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS28FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small28" name="info_small28" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS28FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small28" name="info_small28" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small28" name="info_small28" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small28";
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

                                ${ gSystemConfig.enableRegistersInfoS29 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small29" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS29") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS29FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small29" name="info_small29" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS29FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small29" name="info_small29" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small29" name="info_small29" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small29";
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
                                
                                ${ gSystemConfig.enableRegistersInfoS30 == 1 ? 
                                `
                                <tr id="inputRowRegisters_info_small30" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersInfoS30") }: 
                                    </td>
                                    <td>
                                        ${ /*Single line.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS30FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_info_small30" name="info_small30" class="ss-backend-field-text01" value="" />
                                        ` : ``
                                        }

                                        ${ /*Multiline.*/'' }
                                        ${ gSystemConfig.configRegistersInfoS30FieldType == 2 ? 
                                        `
                                            ${ /*No formatting.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 1 ? 
                                            `
                                                <textarea id="registers_info_small30" name="info_small30" class="ss-backend-field-text-area01"></textarea>
                                            ` : ``
                                            }

                                            ${ /*TinyMCE.*/'' }
                                            ${ gSystemConfig.configBackendTextBox == 17 | gSystemConfig.configBackendTextBox == 18 ? 
                                            `
                                                <textarea id="registers_info_small30" name="info_small30" class="ss-backend-field-text-area01"></textarea>
                                                <script>
                                                    tinyMCEBackendConfig.selector = "#registers_info_small30";
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

                                ${ /*Number fields.*/'' }
                                ${ gSystemConfig.enableRegistersNumber1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumber1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumber1FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumber1FieldType == 2 || gSystemConfig.configRegistersNumber1FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number1" name="number1" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("registers_number1")*/'' }
                                            <script>
                                                //var  selector = document.getElementById("registers_number1");

                                                //var im = new Inputmask("99-9999999");
                                                //im.mask(selector);

                                                //Inputmask("9", { repeat: 10 }).mask(selector);

                                                //if(typeof window !== 'undefined')
                                                //{
                                                    //Inputmask("9", { repeat: 10 }).mask(selector);
                                                //}


                                                //Inputmask("9", { repeat: 10 }).mask("registers_number1"); //debug //working
                                                /*Inputmask("(.999){+|1},00", {
                                                    /*positionCaretOnClick: "radixFocus",
                                                    radixPoint: ",",
                                                    _radixDance: true,
                                                    numericInput: true,
                                                    placeholder: "0",
                                                }).mask("registers_number1");*/

                                                /*
                                                Inputmask({
                                                    //mask: "9[.99]{0,}",
                                                    //mask: "9[.99]",
                                                    //repeat: *,
                                                    greedy: false,
                                                    //numericInput: true

                                                    //R$
                                                    groupSeparator: ".",
                                                    radixPoint: ",",

                                                    //$
                                                    //groupSeparator: ",",
                                                    //radixPoint: ".",

                                                    alias: "numeric",
                                                    //alias: "currency",
                                                    //alias: "decimal",
                                                    digits: 2,
                                                    autoGroup: true,
                                                    digitsOptional: false,
                                                    allowMinus: false
                                                }).mask("registers_number1");
                                                */ //working

                                                /*Inputmask('Regex', {
                                                    regex: "^[0-9]{1,6}(\\.\\d{1,2})?$"
                                                }).mask("registers_number1");
                                                */


                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configRegistersNumber1FieldType == 3 ? 
                                        `
                                            <input type="text" id="registers_number1" name="number1" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("registers_number1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumber2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumber2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumber2FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumber2FieldType == 2 || gSystemConfig.configRegistersNumber2FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number2" name="number2" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("registers_number2")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configRegistersNumber2FieldType == 3 ? 
                                        `
                                            <input type="text" id="registers_number2" name="number2" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("registers_number2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumber3 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumber3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumber3FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumber3FieldType == 2 || gSystemConfig.configRegistersNumber3FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number3" name="number3" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("registers_number3")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configRegistersNumber3FieldType == 3 ? 
                                        `
                                            <input type="text" id="registers_number3" name="number3" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("registers_number3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumber4 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumber4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumber4FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumber4FieldType == 2 || gSystemConfig.configRegistersNumber4FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number4" name="number4" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("registers_number4")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configRegistersNumber4FieldType == 3 ? 
                                        `
                                            <input type="text" id="registers_number4" name="number4" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("registers_number4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumber5 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumber5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumber5FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumber5FieldType == 2 || gSystemConfig.configRegistersNumber5FieldType == 4 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number5" name="number5" class="ss-backend-field-currency01" value="0" maxlength="45" />
                                            
                                            ${ /*Inputmask("9", { repeat: 10 }).mask("registers_number5")*/'' }
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*Decimal.*/'' }
                                        ${ gSystemConfig.configRegistersNumber5FieldType == 3 ? 
                                        `
                                            <input type="text" id="registers_number5" name="number5" class="ss-backend-field-numeric02" value="0" maxlength="34" />
                                            <script>
                                                Inputmask(inputmaskDecimalBackendConfigOptions).mask("registers_number5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Number (small) fields.*/'' }
                                ${ gSystemConfig.enableRegistersNumberS1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number_small1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumberS1") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS1FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number_small1" name="number_small1" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number_small1");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS1FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number_small1" name="number_small1" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number_small1");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumberS2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number_small2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumberS2") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS2FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number_small2" name="number_small2" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number_small2");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS2FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number_small2" name="number_small2" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number_small2");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumberS3 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number_small3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumberS3") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS3FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number_small3" name="number_small3" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number_small3");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS3FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number_small3" name="number_small3" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number_small3");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumberS4 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number_small4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumberS4") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS4FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number_small4" name="number_small4" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number_small4");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS4FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number_small4" name="number_small4" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number_small4");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersNumberS5 == 1 ? 
                                `
                                <tr id="inputRowRegisters_number_small5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersNumberS5") }: 
                                    </td>
                                    <td>
                                        ${ /*General number.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS5FieldType == 1 ? 
                                        `
                                            <input type="text" id="registers_number_small5" name="number_small5" class="ss-backend-field-numeric01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskGenericBackendConfigOptions).mask("registers_number_small5");
                                            </script>
                                        ` : ``
                                        }

                                        ${ /*System currency.*/'' }
                                        ${ gSystemConfig.configRegistersNumberS5FieldType == 2 ? 
                                        `
                                            ${ gSystemConfig.configSystemCurrency }
                                            <input type="text" id="registers_number_small5" name="number_small5" class="ss-backend-field-currency01" value="0" maxlength="9" />
                                            <script>
                                                Inputmask(inputmaskCurrencyBackendConfigOptions).mask("registers_number_small5");
                                            </script>
                                        ` : ``
                                        }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*URL fields.*/'' }
                                ${ gSystemConfig.enableRegistersURL1 != 0 ? 
                                `
                                <tr id="inputRowRegisters_url1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersURL1") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_url1" name="url1" class="ss-backend-field-text-area-url"></textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersURL2 != 0 ? 
                                `
                                <tr id="inputRowRegisters_url2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersURL2") }: 
                                    </td>
                                    <td>
                                    <textarea id="registers_url2" name="url2" class="ss-backend-field-text-area-url"></textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersURL3 != 0 ? 
                                `
                                <tr id="inputRowRegisters_url3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersURL3") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_url3" name="url3" class="ss-backend-field-text-area-url"></textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersURL4 != 0 ? 
                                `
                                <tr id="inputRowRegisters_url4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersURL4") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_url4" name="url4" class="ss-backend-field-text-area-url"></textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersURL5 != 0 ? 
                                `
                                <tr id="inputRowRegisters_url5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersURL5") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_url5" name="url5" class="ss-backend-field-text-area-url"></textarea>
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemURLInstructions1") }
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ /*Date fields.*/'' }
                                ${ gSystemConfig.enableRegistersDate1 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate1") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate1FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    ${  /*Debug.*/
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                        ''
                                                        /*SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1)*/
                                                    }
                                                    <select id="registers_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date1_month" name="date1_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date1_day" name="date1_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date1_year" name="date1_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate1FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date1" name="date1" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate1 = datepicker("#registers_date1", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate1Type == 1 || gSystemConfig.configRegistersDate1Type == 2 | gSystemConfig.configRegistersDate1Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate1Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate1Type == 5 || gSystemConfig.configRegistersDate1Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate1Type == 6 || gSystemConfig.configRegistersDate1Type == 66 ? 
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
                                        ${ gSystemConfig.configRegistersDate1Type == 2 || gSystemConfig.configRegistersDate1Type == 3 || gSystemConfig.configRegistersDate1Type == 55 || gSystemConfig.configRegistersDate1Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date1_hour" name="date1_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date1_minute" name="date1_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate1Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date1_seconds" name="date1_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate1Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate2 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate2") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate2FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date2_month" name="date2_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date2_day" name="date2_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date2_year" name="date2_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate2FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date2" name="date2" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate2 = datepicker("#registers_date2", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate2Type == 1 || gSystemConfig.configRegistersDate2Type == 2 | gSystemConfig.configRegistersDate2Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate2Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate2Type == 5 || gSystemConfig.configRegistersDate2Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate2Type == 6 || gSystemConfig.configRegistersDate2Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate2Type == 2 || gSystemConfig.configRegistersDate2Type == 3 || gSystemConfig.configRegistersDate2Type == 55 || gSystemConfig.configRegistersDate2Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date2_hour" name="date2_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date2_minute" name="date2_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate2Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date2_seconds" name="date2_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate2Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate3 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate3") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate3FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date3_month" name="date3_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date3_day" name="date3_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date3_year" name="date3_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate3FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date3" name="date3" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate3 = datepicker("#registers_date3", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate3Type == 1 || gSystemConfig.configRegistersDate3Type == 2 | gSystemConfig.configRegistersDate3Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate3Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate3Type == 5 || gSystemConfig.configRegistersDate3Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate3Type == 6 || gSystemConfig.configRegistersDate3Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate3Type == 2 || gSystemConfig.configRegistersDate3Type == 3 || gSystemConfig.configRegistersDate3Type == 55 || gSystemConfig.configRegistersDate3Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date3_hour" name="date3_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date3_minute" name="date3_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate3Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date3_seconds" name="date3_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate3Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate4 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate4") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate4FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date4_month" name="date4_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date4_day" name="date4_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date4_year" name="date4_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate4FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date4" name="date4" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate4 = datepicker("#registers_date4", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate4Type == 1 || gSystemConfig.configRegistersDate4Type == 2 | gSystemConfig.configRegistersDate4Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate4Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate4Type == 5 || gSystemConfig.configRegistersDate4Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate4Type == 6 || gSystemConfig.configRegistersDate4Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate4Type == 2 || gSystemConfig.configRegistersDate4Type == 3 || gSystemConfig.configRegistersDate4Type == 55 || gSystemConfig.configRegistersDate4Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date4_hour" name="date4_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date4_minute" name="date4_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate4Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date4_seconds" name="date4_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate4Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate5 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate5") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate5FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date5_month" name="date5_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date5_day" name="date5_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date5_year" name="date5_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate5FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date5" name="date5" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate5 = datepicker("#registers_date5", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate5Type == 1 || gSystemConfig.configRegistersDate5Type == 2 | gSystemConfig.configRegistersDate5Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate5Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate5Type == 5 || gSystemConfig.configRegistersDate5Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate5Type == 6 || gSystemConfig.configRegistersDate5Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate5Type == 2 || gSystemConfig.configRegistersDate5Type == 3 || gSystemConfig.configRegistersDate5Type == 55 || gSystemConfig.configRegistersDate5Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date5_hour" name="date5_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date5_minute" name="date5_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate5Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date5_seconds" name="date5_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate5Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate6 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date6" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate6") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate6FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date6_day" name="date6_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date6_month" name="date6_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date6_year" name="date6_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date6_month" name="date6_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date6_day" name="date6_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date6_year" name="date6_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate6FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date6" name="date6" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate6 = datepicker("#registers_date6", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate6Type == 1 || gSystemConfig.configRegistersDate6Type == 2 | gSystemConfig.configRegistersDate6Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate6Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate6Type == 5 || gSystemConfig.configRegistersDate6Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate6Type == 6 || gSystemConfig.configRegistersDate6Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate6Type == 2 || gSystemConfig.configRegistersDate6Type == 3 || gSystemConfig.configRegistersDate6Type == 55 || gSystemConfig.configRegistersDate6Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date6_hour" name="date6_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date6_minute" name="date6_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate6Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date6_seconds" name="date6_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate6Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate7 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date7" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate7") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate7FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date7_day" name="date7_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date7_month" name="date7_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date7_year" name="date7_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date7_month" name="date7_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date7_day" name="date7_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date7_year" name="date7_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate7FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date7" name="date7" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate7 = datepicker("#registers_date7", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate7Type == 1 || gSystemConfig.configRegistersDate7Type == 2 | gSystemConfig.configRegistersDate7Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate7Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate7Type == 5 || gSystemConfig.configRegistersDate7Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate7Type == 6 || gSystemConfig.configRegistersDate7Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate7Type == 2 || gSystemConfig.configRegistersDate7Type == 3 || gSystemConfig.configRegistersDate7Type == 55 || gSystemConfig.configRegistersDate7Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date7_hour" name="date7_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date7_minute" name="date7_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate7Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date7_seconds" name="date7_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate7Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate8 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date8" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate8") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate8FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date8_day" name="date8_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date8_month" name="date8_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date8_year" name="date8_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date8_month" name="date8_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date8_day" name="date8_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date8_year" name="date8_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate8FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date8" name="date8" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate8 = datepicker("#registers_date8", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate8Type == 1 || gSystemConfig.configRegistersDate8Type == 2 | gSystemConfig.configRegistersDate8Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate8Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate8Type == 5 || gSystemConfig.configRegistersDate8Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate8Type == 6 || gSystemConfig.configRegistersDate8Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate8Type == 2 || gSystemConfig.configRegistersDate8Type == 3 || gSystemConfig.configRegistersDate8Type == 55 || gSystemConfig.configRegistersDate8Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date8_hour" name="date8_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date8_minute" name="date8_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate8Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date8_seconds" name="date8_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate8Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate9 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date9" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate9") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate9FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date9_day" name="date9_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date9_month" name="date9_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date9_year" name="date9_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date9_month" name="date9_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date9_day" name="date9_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date9_year" name="date9_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate9FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date9" name="date9" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate9 = datepicker("#registers_date9", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate9Type == 1 || gSystemConfig.configRegistersDate9Type == 2 | gSystemConfig.configRegistersDate9Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate9Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate9Type == 5 || gSystemConfig.configRegistersDate9Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate9Type == 6 || gSystemConfig.configRegistersDate9Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate9Type == 2 || gSystemConfig.configRegistersDate9Type == 3 || gSystemConfig.configRegistersDate9Type == 55 || gSystemConfig.configRegistersDate9Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date9_hour" name="date9_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date9_minute" name="date9_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate9Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date9_seconds" name="date9_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate9Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersDate10 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_date10" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersDate10") }: 
                                        </td>
                                        <td>

                                        ${ /*Dropdown menu.*/'' }
                                        ${ gSystemConfig.configRegistersDate10FieldType == 2 ? 
                                            `
                                            ${ gSystemConfig.configBackendDateFormat == 1 ? 
                                                `
                                                    <select id="registers_date10_day" name="date10_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date10_month" name="date10_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date10_year" name="date10_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowYear == arrayRow ? ' selected' : ''}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                ` : `
                                                    <select id="registers_date10_month" name="date10_month" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("mm", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowMonth == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date10_day" name="date10_day" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("d", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
                                                            return `
                                                                <option value="${ arrayRow }"
                                                                    ${ this.dateNowDay == arrayRow ? ' selected' : ``}
                                                                >${ arrayRow }</option>
                                                            `}).join(",") }
                                                    </select>
                                                    /
                                                    <select id="registers_date10_year" name="date10_year" class="ss-backend-field-dropdown01">
                                                        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
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
                                        ${ gSystemConfig.configRegistersDate10FieldType == 11 ? 
                                            `
                                            <input type="text" id="registers_date10" name="date10" class="ss-backend-field-date01" autocomplete="off" value="" />
                                            <script>
                                                const dpDate10 = datepicker("#registers_date10", 
                                                    ${ /*Generic date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate10Type == 1 || gSystemConfig.configRegistersDate10Type == 2 | gSystemConfig.configRegistersDate10Type == 3 ? 
                                                        `
                                                        jsDatepickerGenericBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Birth date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate10Type == 4 ? 
                                                        `
                                                        jsDatepickerBirthBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*Task date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate10Type == 5 || gSystemConfig.configRegistersDate10Type == 55 ? 
                                                        `
                                                        jsDatepickerTaskBackendConfigOptions
                                                        ` : ``
                                                    }

                                                    ${ /*History date.*/'' }
                                                    ${ gSystemConfig.configRegistersDate10Type == 6 || gSystemConfig.configRegistersDate10Type == 66 ? 
                                                        `
                                                        jsDatepickerHistoryBackendConfigOptions
                                                        ` : ``
                                                    }
                                                );
                                            </script>
                                            ` : ``
                                        }

                                        ${ /*Complete and Semi-complete date.*/'' }
                                        ${ gSystemConfig.configRegistersDate10Type == 2 || gSystemConfig.configRegistersDate10Type == 3 || gSystemConfig.configRegistersDate10Type == 55 || gSystemConfig.configRegistersDate10Type == 66 ? 
                                            `
                                             - 
                                            <select id="registers_date10_hour" name="date10_hour" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("h", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowHour == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            :
                                            <select id="registers_date10_minute" name="date10_minute" class="ss-backend-field-dropdown01">
                                                ${SyncSystemNS.FunctionsGeneric.timeTableFill01("m", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
                                                    return `
                                                        <option value="${ arrayRow }"
                                                            ${ this.dateNowMinute == arrayRow ? ' selected' : ``}
                                                        >${ arrayRow }</option>
                                                    `}).join(",") }
                                            </select>
                                            ${ gSystemConfig.configRegistersDate10Type == 2 ? 
                                                `
                                                :
                                                <select id="registers_date10_seconds" name="date10_seconds" class="ss-backend-field-dropdown01">
                                                    ${SyncSystemNS.FunctionsGeneric.timeTableFill01("s", 1, {dateType: gSystemConfig.configRegistersDate10Type}).map((arrayRow)=>{
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

                                ${ gSystemConfig.enableRegistersImageMain == 1 ? 
                                `
                                <tr id="inputRowRegisters_image_main" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImage") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_image_main" name="image_main" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }
                                ${ gSystemConfig.enableRegistersImageMainCaption == 1 ? 
                                `
                                <tr id="inputRowRegisters_image_main_caption" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemImageCaption") }: 
                                    </td>
                                    <td>
                                        <input type="text" id="registers_image_main_caption" name="image_main_caption" class="ss-backend-field-text01" value="" />
                                    </td>
                                </tr>
                                ` : ``
                                }      
                                
                                ${ gSystemConfig.enableRegistersImageLogo == 1 ? 
                                `
                                <tr id="inputRowRegisters_image_logo" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersImageLogo") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_image_logo" name="image_logo" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersImageBanner == 1 ? 
                                `
                                <tr id="inputRowRegisters_image_banner" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersImageBanner") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_image_banner" name="image_banner" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFile1 == 1 ? 
                                `
                                <tr id="inputRowRegisters_file1" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFile1") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_file1" name="file1" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFile2 == 1 ? 
                                `
                                <tr id="inputRowRegisters_file2" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFile2") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_file2" name="file2" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFile3 == 1 ? 
                                `
                                <tr id="inputRowRegisters_file3" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFile3") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_file3" name="file3" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFile4 == 1 ? 
                                `
                                <tr id="inputRowRegisters_file4" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFile4") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_file4" name="file4" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                ${ gSystemConfig.enableRegistersFile5 == 1 ? 
                                `
                                <tr id="inputRowRegisters_file5" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersFile5") }: 
                                    </td>
                                    <td>
                                        <input type="file" id="registers_file5" name="file5" class="ss-backend-field-file-upload" />
                                    </td>
                                </tr>
                                ` : ``
                                }

                                <tr id="inputRowRegisters_activation" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation") }: 
                                    </td>
                                    <td>
                                        <select id="registers_activation" name="activation" class="ss-backend-field-dropdown01">
                                            <option value="1" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                            <option value="0">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                        </select>
                                    </td>
                                </tr>

                                ${ gSystemConfig.enableRegistersActivation1 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_activation1" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation1") }: 
                                        </td>
                                        <td>
                                            <select id="registers_activation1" name="activation1" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableRegistersActivation2 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_activation2" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation2") }: 
                                        </td>
                                        <td>
                                            <select id="registers_activation2" name="activation2" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableRegistersActivation3 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_activation3" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation3") }: 
                                        </td>
                                        <td>
                                            <select id="registers_activation3" name="activation3" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableRegistersActivation4 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_activation4" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation4") }: 
                                        </td>
                                        <td>
                                            <select id="registers_activation4" name="activation4" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableRegistersActivation5 == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_activation5" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersActivation5") }: 
                                        </td>
                                        <td>
                                            <select id="registers_activation5" name="activation5" class="ss-backend-field-dropdown01">
                                                <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation1") }</option>
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActivation0") }</option>
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableRegistersStatus == 1 ? 
                                    `
                                    <tr id="inputRowRegisters_id_status" class="ss-backend-table-bg-light">
                                        <td class="ss-backend-table-bg-medium">
                                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendRegistersStatus") }: 
                                        </td>
                                        <td>
                                            <select id="registers_id_status" name="id_status" class="ss-backend-field-dropdown01">
                                                <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDropDownSelectNone") }</option>
                                                ${resultsRegistersStatusListing.map((statusRow)=>{
                                                    return `
                                                        <option value="${ statusRow.id }">${ SyncSystemNS.FunctionsGeneric.contentMaskRead(statusRow.title, "db") }</option>
                                                    `;
                                                }).join("") }
                                            </select>
                                        </td>
                                    </tr>
                                    ` : ``
                                }

                                ${ gSystemConfig.enableRegistersRestrictedAccess == 1 ? 
                                `
                                <tr id="inputRowRegisters_id_restricted_access" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess") }: 
                                    </td>
                                    <td>
                                        <select id="registers_restricted_access" name="restricted_access" class="ss-backend-field-dropdown01">
                                            <option value="0" selected>${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess0") }</option>
                                            <option value="1">${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRestrictedAccess1") }</option>
                                        </select>
                                    </td>
                                </tr>
                                ` : ``
                                }
    
                                ${ gSystemConfig.enableRegistersNotes == 1 ? 
                                `
                                <tr id="inputRowRegisters_notes" class="ss-backend-table-bg-light">
                                    <td class="ss-backend-table-bg-medium">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemNotesInternal") }: 
                                    </td>
                                    <td>
                                        <textarea id="registers_notes" name="notes" class="ss-backend-field-text-area01"></textarea>
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
                        <button id="registers_include" name="registers_include" class="ss-backend-btn-base ss-backend-btn-action-execute" style="float: left;">
                            ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonSend") }
                        </button>
                    </div>

                    <input type="hidden" id="registers_id_parent" name="id_parent" value="${ this._idParent }" />
                    <input type="hidden" id="registers_id_activity" name="id_activity" value="0" />

                    <input type="hidden" id="registers_id_register1" name="id_register1" value="0" />
                    <input type="hidden" id="registers_id_register2" name="id_register2" value="0" />
                    <input type="hidden" id="registers_id_register3" name="id_register3" value="0" />
                    <input type="hidden" id="registers_id_register4" name="id_register4" value="0" />
                    <input type="hidden" id="registers_id_register5" name="id_register5" value="0" />

                    <input type="hidden" id="registers_id_street" name="id_street" value="0" />
                    <input type="hidden" id="registers_id_district" name="id_district" value="0" />
                    <input type="hidden" id="registers_id_county" name="id_county" value="0" />
                    <input type="hidden" id="registers_id_city" name="id_city" value="0" />
                    <input type="hidden" id="registers_id_state" name="id_state" value="0" />
                    <input type="hidden" id="registers_id_country" name="id_country" value="0" />
                    
                    <input type="hidden" id="registers_idParent" name="idParent" value="${ this._idParent }" />
                    <input type="hidden" id="registers_pageNumber" name="pageNumber" value="${ this._pageNumber }" />
                    <input type="hidden" id="registers_masterPageSelect" name="masterPageSelect" value="${ this._masterPageSelect }" />
                </form>
            </section>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(oplRecords);
            //strReturn = JSON.stringify(oplRecords.resultsContentListing);
            
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

};