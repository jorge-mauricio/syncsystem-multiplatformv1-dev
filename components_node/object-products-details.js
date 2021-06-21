"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
//const SyncSystemNS = require("./syncsystem-ns.js"); //Node JS import method supported by jest.

const FunctionsGeneric = require("./functions-generic.js");
const FunctionsDB = require("./functions-db.js");
const FunctionsCrypto = require("./functions-crypto.js");

const ObjectFiltersGenericListing = require("./object-filters-generic-listing.js");
//----------------------


module.exports = class ObjectProductsDetails
{
    //Construct.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        //Error handling.
        if(objParameters == undefined)
        {
            throw new Error('Error creating object: parameters missing.');
        }
        
        
        //Properties.
        //----------------------
        this.idTbProducts = (objParameters.hasOwnProperty("_idTbProducts")) ? objParameters._idTbProducts : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsProductsDetails = "";


        this.tblProductsID = "";
        this.tblProductsIdParent = "";
        this.tblProductsSortOrder = 0;
        this.tblProductsSortOrder_print = "";
        this.tblProductsIdType = 0; 
        this.tblProductsIdType_print = ""; 
    
        this.tblProductsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //this.tblProductsDateTimezone = "";
        this.tblProductsDateEdit = "";

        this.tblProductsIdRegisterUser = 0;
        this.tblProductsIdRegister1 = 0;
        this.tblProductsIdRegister2 = 0;
        this.tblProductsIdRegister3 = 0;
        this.tblProductsIdRegister4 = 0;
        this.tblProductsIdRegister5 = 0;
            
        this.tblProductsCode = "";
        this.tblProductsTitle = "";
        this.tblProductsDescription = "";
        this.tblProductsDescription_edit = "";
    
        this.tblProductsURLAlias = "";
        this.tblProductsKeywordsTags = "";
        this.tblProductsMetaDescription = "";
        this.tblProductsMetaDescription_edit = "";
        this.tblProductsMetaTitle = "";
        this.tblProductsMetaInfo = "";

        this.tblProductsInfo1 = "";
        this.tblProductsInfo1_edit = "";
        this.tblProductsInfo2 = "";
        this.tblProductsInfo2_edit = "";
        this.tblProductsInfo3 = "";
        this.tblProductsInfo3_edit = "";
        this.tblProductsInfo4 = "";
        this.tblProductsInfo4_edit = "";
        this.tblProductsInfo5 = "";
        this.tblProductsInfo5_edit = "";
        this.tblProductsInfo6 = "";
        this.tblProductsInfo6_edit = "";
        this.tblProductsInfo7 = "";
        this.tblProductsInfo7_edit = "";
        this.tblProductsInfo8 = "";
        this.tblProductsInfo8_edit = "";
        this.tblProductsInfo9 = "";
        this.tblProductsInfo9_edit = "";
        this.tblProductsInfo10 = "";
        this.tblProductsInfo10_edit = "";
        this.tblProductsInfo11 = "";
        this.tblProductsInfo11_edit = "";
        this.tblProductsInfo12 = "";
        this.tblProductsInfo12_edit = "";
        this.tblProductsInfo13 = "";
        this.tblProductsInfo13_edit = "";
        this.tblProductsInfo14 = "";
        this.tblProductsInfo14_edit = "";
        this.tblProductsInfo15 = "";
        this.tblProductsInfo15_edit = "";
        this.tblProductsInfo16 = "";
        this.tblProductsInfo16_edit = "";
        this.tblProductsInfo17 = "";
        this.tblProductsInfo17_edit = "";
        this.tblProductsInfo18 = "";
        this.tblProductsInfo18_edit = "";
        this.tblProductsInfo19 = "";
        this.tblProductsInfo19_edit = "";
        this.tblProductsInfo20 = "";
        this.tblProductsInfo20_edit = "";

        this.tblProductsInfoSmall1 = "";
        this.tblProductsInfoSmall1_edit = "";
        this.tblProductsInfoSmall2 = "";
        this.tblProductsInfoSmall2_edit = "";
        this.tblProductsInfoSmall3 = "";
        this.tblProductsInfoSmall3_edit = "";
        this.tblProductsInfoSmall4 = "";
        this.tblProductsInfoSmall4_edit = "";
        this.tblProductsInfoSmall5 = "";
        this.tblProductsInfoSmall5_edit = "";
        this.tblProductsInfoSmall6 = "";
        this.tblProductsInfoSmall6_edit = "";
        this.tblProductsInfoSmall7 = "";
        this.tblProductsInfoSmall7_edit = "";
        this.tblProductsInfoSmall8 = "";
        this.tblProductsInfoSmall8_edit = "";
        this.tblProductsInfoSmall9 = "";
        this.tblProductsInfoSmall9_edit = "";
        this.tblProductsInfoSmall10 = "";
        this.tblProductsInfoSmall10_edit = "";
        this.tblProductsInfoSmall11 = "";
        this.tblProductsInfoSmall11_edit = "";
        this.tblProductsInfoSmall12 = "";
        this.tblProductsInfoSmall12_edit = "";
        this.tblProductsInfoSmall13 = "";
        this.tblProductsInfoSmall13_edit = "";
        this.tblProductsInfoSmall14 = "";
        this.tblProductsInfoSmall14_edit = "";
        this.tblProductsInfoSmall15 = "";
        this.tblProductsInfoSmall15_edit = "";
        this.tblProductsInfoSmall16 = "";
        this.tblProductsInfoSmall16_edit = "";
        this.tblProductsInfoSmall17 = "";
        this.tblProductsInfoSmall17_edit = "";
        this.tblProductsInfoSmall18 = "";
        this.tblProductsInfoSmall18_edit = "";
        this.tblProductsInfoSmall19 = "";
        this.tblProductsInfoSmall19_edit = "";
        this.tblProductsInfoSmall20 = "";
        this.tblProductsInfoSmall20_edit = "";
        this.tblProductsInfoSmall21 = "";
        this.tblProductsInfoSmall21_edit = "";
        this.tblProductsInfoSmall22 = "";
        this.tblProductsInfoSmall22_edit = "";
        this.tblProductsInfoSmall23 = "";
        this.tblProductsInfoSmall23_edit = "";
        this.tblProductsInfoSmall24 = "";
        this.tblProductsInfoSmall24_edit = "";
        this.tblProductsInfoSmall25 = "";
        this.tblProductsInfoSmall25_edit = "";
        this.tblProductsInfoSmall26 = "";
        this.tblProductsInfoSmall26_edit = "";
        this.tblProductsInfoSmall27 = "";
        this.tblProductsInfoSmall27_edit = "";
        this.tblProductsInfoSmall28 = "";
        this.tblProductsInfoSmall28_edit = "";
        this.tblProductsInfoSmall29 = "";
        this.tblProductsInfoSmall29_edit = "";
        this.tblProductsInfoSmall30 = "";
        this.tblProductsInfoSmall30_edit = "";

        this.tblProductsValue = 0;
        this.tblProductsValue_print = "";
        this.tblProductsValue1 = 0;
        this.tblProductsValue1_print = "";
        this.tblProductsValue2 = 0;
        this.tblProductsValue2_print = "";
        this.tblProductsWeight = 0;
        this.tblProductsWeight_print = "";
        this.tblProductsCoefficient = 0;
        this.tblProductsCoefficient_print = "";

        this.tblProductsNumber1 = 0;
        this.tblProductsNumber1_print = "";
        this.tblProductsNumber2 = 0;
        this.tblProductsNumber2_print = "";
        this.tblProductsNumber3 = 0;
        this.tblProductsNumber3_print = "";
        this.tblProductsNumber4 = 0;
        this.tblProductsNumber4_print = "";
        this.tblProductsNumber5 = 0;
        this.tblProductsNumber5_print = "";
    
        this.tblProductsNumberSmall1 = 0;
        this.tblProductsNumberSmall1_print = "";
        this.tblProductsNumberSmall2 = 0;
        this.tblProductsNumberSmall2_print = "";
        this.tblProductsNumberSmall3 = 0;
        this.tblProductsNumberSmall3_print = "";
        this.tblProductsNumberSmall4 = 0;
        this.tblProductsNumberSmall4_print = "";
        this.tblProductsNumberSmall5 = 0;
        this.tblProductsNumberSmall5_print = "";

        this.tblProductsURL1 = "";
        this.tblProductsURL1_edit = "";
        this.tblProductsURL2 = "";
        this.tblProductsURL2_edit = "";
        this.tblProductsURL3 = "";
        this.tblProductsURL3_edit = "";
        this.tblProductsURL4 = "";
        this.tblProductsURL4_edit = "";
        this.tblProductsURL5 = "";
        this.tblProductsURL5_edit = "";
    
        this.tblProductsDate1 = null;
        this.tblProductsDate1_print = "";
        this.tblProductsDate1DateObj = new Date();
        this.tblProductsDate1DateYear, this.tblProductsDate1DateDay, this.tblProductsDate1DateMonth;
        this.tblProductsDate1DateHour, this.tblProductsDate1DateHour_print, this.tblProductsDate1DateMinute, this.tblProductsDate1DateMinute_print, this.tblProductsDate1DateSecond, this.tblProductsDate1DateSecond_print;

        this.tblProductsDate2 = null;
        this.tblProductsDate2_print = "";
        this.tblProductsDate2DateObj = new Date();
        this.tblProductsDate2DateYear, this.tblProductsDate2DateDay, this.tblProductsDate2DateMonth;
        this.tblProductsDate2DateHour, this.tblProductsDate2DateHour_print, this.tblProductsDate2DateMinute, this.tblProductsDate2DateMinute_print, this.tblProductsDate2DateSecond, this.tblProductsDate2DateSecond_print;

        this.tblProductsDate3 = null;
        this.tblProductsDate3_print = "";
        this.tblProductsDate3DateObj = new Date();
        this.tblProductsDate3DateYear, this.tblProductsDate3DateDay, this.tblProductsDate3DateMonth;
        this.tblProductsDate3DateHour, this.tblProductsDate3DateHour_print, this.tblProductsDate3DateMinute, this.tblProductsDate3DateMinute_print, this.tblProductsDate3DateSecond, this.tblProductsDate3DateSecond_print;

        this.tblProductsDate4 = null;
        this.tblProductsDate4_print = "";
        this.tblProductsDate4DateObj = new Date();
        this.tblProductsDate4DateYear, this.tblProductsDate4DateDay, this.tblProductsDate4DateMonth;
        this.tblProductsDate4DateHour, this.tblProductsDate4DateHour_print, this.tblProductsDate4DateMinute, this.tblProductsDate4DateMinute_print, this.tblProductsDate4DateSecond, this.tblProductsDate4DateSecond_print;

        this.tblProductsDate5 = null;
        this.tblProductsDate5_print = "";
        this.tblProductsDate5DateObj = new Date();
        this.tblProductsDate5DateYear, this.tblProductsDate5DateDay, this.tblProductsDate5DateMonth;
        this.tblProductsDate5DateHour, this.tblProductsDate5DateHour_print, this.tblProductsDate5DateMinute, this.tblProductsDate5DateMinute_print, this.tblProductsDate5DateSecond, this.tblProductsDate5DateSecond_print;

        this.tblProductsIdItem1 = 0;
        this.tblProductsIdItem2 = 0;
        this.tblProductsIdItem3 = 0;
        this.tblProductsIdItem4 = 0;
        this.tblProductsIdItem5 = 0;
        
        this.tblProductsImageMain = "";
        this.tblProductsImageMainCaption = "";
        
        this.tblProductsFile1 = "";
        this.tblProductsFile2 = "";
        this.tblProductsFile3 = "";
        this.tblProductsFile4 = "";
        this.tblProductsFile5 = "";

        this.tblProductsActivation = 1;
        this.tblProductsActivation_print = "";
        this.tblProductsActivation1 = 0;
        this.tblProductsActivation1_print = "";
        this.tblProductsActivation2 = 0;
        this.tblProductsActivation2_print = "";
        this.tblProductsActivation3 = 0;
        this.tblProductsActivation3_print = "";
        this.tblProductsActivation4 = 0;
        this.tblProductsActivation4_print = "";
        this.tblProductsActivation5 = 0;
        this.tblProductsActivation5_print = "";

        this.tblProductsIdStatus = 0;
        this.tblProductsIdStatus_print = "";

        this.tblProductsRestrictedAccess = 0;
        this.tblProductsRestrictedAccess_print = "";

        this.tblProductsNotes = "";
        this.tblProductsNotes_edit = "";

        this.ofglRecords;

        this.arrIdsProductsFiltersGeneric1 = [];
        this.arrIdsProductsFiltersGeneric2 = [];
        this.arrIdsProductsFiltersGeneric3 = [];
        this.arrIdsProductsFiltersGeneric4 = [];
        this.arrIdsProductsFiltersGeneric5 = [];
        this.arrIdsProductsFiltersGeneric6 = [];
        this.arrIdsProductsFiltersGeneric7 = [];
        this.arrIdsProductsFiltersGeneric8 = [];
        this.arrIdsProductsFiltersGeneric9 = [];
        this.arrIdsProductsFiltersGeneric10 = [];
        this.arrIdsProductsFiltersGeneric11 = [];
        this.arrIdsProductsFiltersGeneric12 = [];
        this.arrIdsProductsFiltersGeneric13 = [];
        this.arrIdsProductsFiltersGeneric14 = [];
        this.arrIdsProductsFiltersGeneric15 = [];
        this.arrIdsProductsFiltersGeneric16 = [];
        this.arrIdsProductsFiltersGeneric17 = [];
        this.arrIdsProductsFiltersGeneric18 = [];
        this.arrIdsProductsFiltersGeneric19 = [];
        this.arrIdsProductsFiltersGeneric20 = [];
        this.arrIdsProductsFiltersGeneric21 = [];
        this.arrIdsProductsFiltersGeneric22 = [];
        this.arrIdsProductsFiltersGeneric23 = [];
        this.arrIdsProductsFiltersGeneric24 = [];
        this.arrIdsProductsFiltersGeneric25 = [];
        this.arrIdsProductsFiltersGeneric26 = [];
        this.arrIdsProductsFiltersGeneric27 = [];
        this.arrIdsProductsFiltersGeneric28 = [];
        this.arrIdsProductsFiltersGeneric29 = [];
        this.arrIdsProductsFiltersGeneric30 = [];

        this.objIdsProductsFiltersGenericBinding;

        this.objIdsProductsFiltersGeneric1Binding;
        this.objIdsProductsFiltersGeneric2Binding;
        this.objIdsProductsFiltersGeneric3Binding;
        this.objIdsProductsFiltersGeneric4Binding;
        this.objIdsProductsFiltersGeneric5Binding;
        this.objIdsProductsFiltersGeneric6Binding;
        this.objIdsProductsFiltersGeneric7Binding;
        this.objIdsProductsFiltersGeneric8Binding;
        this.objIdsProductsFiltersGeneric9Binding;
        this.objIdsProductsFiltersGeneric10Binding;
        this.objIdsProductsFiltersGeneric11Binding;
        this.objIdsProductsFiltersGeneric12Binding;
        this.objIdsProductsFiltersGeneric13Binding;
        this.objIdsProductsFiltersGeneric14Binding;
        this.objIdsProductsFiltersGeneric15Binding;
        this.objIdsProductsFiltersGeneric16Binding;
        this.objIdsProductsFiltersGeneric17Binding;
        this.objIdsProductsFiltersGeneric18Binding;
        this.objIdsProductsFiltersGeneric19Binding;
        this.objIdsProductsFiltersGeneric20Binding;
        this.objIdsProductsFiltersGeneric21Binding;
        this.objIdsProductsFiltersGeneric22Binding;
        this.objIdsProductsFiltersGeneric23Binding;
        this.objIdsProductsFiltersGeneric24Binding;
        this.objIdsProductsFiltersGeneric25Binding;
        this.objIdsProductsFiltersGeneric26Binding;
        this.objIdsProductsFiltersGeneric27Binding;
        this.objIdsProductsFiltersGeneric28Binding;
        this.objIdsProductsFiltersGeneric29Binding;
        this.objIdsProductsFiltersGeneric30Binding;

        this.objProductsFiltersGeneric1Binding_print;
        this.objProductsFiltersGeneric2Binding_print;
        this.objProductsFiltersGeneric3Binding_print;
        this.objProductsFiltersGeneric4Binding_print;
        this.objProductsFiltersGeneric5Binding_print;
        this.objProductsFiltersGeneric6Binding_print;
        this.objProductsFiltersGeneric7Binding_print;
        this.objProductsFiltersGeneric8Binding_print;
        this.objProductsFiltersGeneric9Binding_print;
        this.objProductsFiltersGeneric10Binding_print;
        this.objProductsFiltersGeneric11Binding_print;
        this.objProductsFiltersGeneric12Binding_print;
        this.objProductsFiltersGeneric13Binding_print;
        this.objProductsFiltersGeneric14Binding_print;
        this.objProductsFiltersGeneric15Binding_print;
        this.objProductsFiltersGeneric16Binding_print;
        this.objProductsFiltersGeneric17Binding_print;
        this.objProductsFiltersGeneric18Binding_print;
        this.objProductsFiltersGeneric19Binding_print;
        this.objProductsFiltersGeneric20Binding_print;
        this.objProductsFiltersGeneric21Binding_print;
        this.objProductsFiltersGeneric22Binding_print;
        this.objProductsFiltersGeneric23Binding_print;
        this.objProductsFiltersGeneric24Binding_print;
        this.objProductsFiltersGeneric25Binding_print;
        this.objProductsFiltersGeneric26Binding_print;
        this.objProductsFiltersGeneric27Binding_print;
        this.objProductsFiltersGeneric28Binding_print;
        this.objProductsFiltersGeneric29Binding_print;
        this.objProductsFiltersGeneric30Binding_print;

        this.arrIdsProductsFiltersGeneric1Binding = [];
        this.arrIdsProductsFiltersGeneric2Binding = [];
        this.arrIdsProductsFiltersGeneric3Binding = [];
        this.arrIdsProductsFiltersGeneric4Binding = [];
        this.arrIdsProductsFiltersGeneric5Binding = [];
        this.arrIdsProductsFiltersGeneric6Binding = [];
        this.arrIdsProductsFiltersGeneric7Binding = [];
        this.arrIdsProductsFiltersGeneric8Binding = [];
        this.arrIdsProductsFiltersGeneric9Binding = [];
        this.arrIdsProductsFiltersGeneric10Binding = [];
        this.arrIdsProductsFiltersGeneric11Binding = [];
        this.arrIdsProductsFiltersGeneric12Binding = [];
        this.arrIdsProductsFiltersGeneric13Binding = [];
        this.arrIdsProductsFiltersGeneric14Binding = [];
        this.arrIdsProductsFiltersGeneric15Binding = [];
        this.arrIdsProductsFiltersGeneric16Binding = [];
        this.arrIdsProductsFiltersGeneric17Binding = [];
        this.arrIdsProductsFiltersGeneric18Binding = [];
        this.arrIdsProductsFiltersGeneric19Binding = [];
        this.arrIdsProductsFiltersGeneric20Binding = [];
        this.arrIdsProductsFiltersGeneric21Binding = [];
        this.arrIdsProductsFiltersGeneric22Binding = [];
        this.arrIdsProductsFiltersGeneric23Binding = [];
        this.arrIdsProductsFiltersGeneric24Binding = [];
        this.arrIdsProductsFiltersGeneric25Binding = [];
        this.arrIdsProductsFiltersGeneric26Binding = [];
        this.arrIdsProductsFiltersGeneric27Binding = [];
        this.arrIdsProductsFiltersGeneric28Binding = [];
        this.arrIdsProductsFiltersGeneric29Binding = [];
        this.arrIdsProductsFiltersGeneric30Binding = [];
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectProductsDetails();
    }
    //**************************************************************************************


    //Get product details according to search parameters.
    //**************************************************************************************
    //async recordsListingGet(idParent = null, terminal = 0, returnType = 1)
    /**
     * Get product details according to search parameters.
     * @param {*} terminal 0 - backend | 1 - frontend
     * @param {*} returnType 1 - array | 3 - Json Object | 10 - html
     * @returns {json}
     */
    async recordDetailsGet(terminal = 0, returnType = 1)
    {
        //terminal: 0 - backend | 1 - frontend
        //returnType: 1 - array | 3 - Json Object | 10 - html

        try
        {
            this.resultsProductsDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableProducts, 
                                                                                this.arrSearchParameters, 
                                                                                "", 
                                                                                "", 
                                                                                FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableProducts, "all", "string"), 
                                                                                1, 
                                                                                this.objSpecialParameters);

            //Filters generic. 
            this.ofglRecords = new ObjectFiltersGenericListing({
                _arrSearchParameters: [],
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            });
            await this.ofglRecords.recordsListingGet(0, 3);

            //Filters generic bindings.
            this.objIdsProductsFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_record;" + this.idTbProducts + ";i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                            1, 
                                                                                            {returnType: 3});

            //Filters generic - separation.                                                                                
            if(gSystemConfig.enableProductsFilterGeneric1 != 0)
            {
                this.objIdsProductsFiltersGeneric1Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 101;
                });

                if(this.objIdsProductsFiltersGeneric1Binding)
                {
                    this.arrIdsProductsFiltersGeneric1Binding = Object.keys(this.objIdsProductsFiltersGeneric1Binding).map(key => this.objIdsProductsFiltersGeneric1Binding[key]["id_filters_generic"]);
                    //this.arrIdsProductsFiltersGeneric1Binding = Object.keys(this.objIdsProductsFiltersGeneric1Binding).map(key => this.objIdsProductsFiltersGeneric1Binding[key]["id_filters_generic"].toStrign());


                    if(this.arrIdsProductsFiltersGeneric1Binding)
                    {
                        var arrIdsProductsFiltersGeneric1Binding = this.arrIdsProductsFiltersGeneric1Binding;
                        this.objProductsFiltersGeneric1Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            //return obj.filter_index == 101;

                            //for(let countArray = 0; countArray < this.arrIdsProductsFiltersGeneric1Binding.length; countArray++)
                            /*for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric1Binding.length; countArray++)
                            {
                                return obj.id == arrIdsProductsFiltersGeneric1Binding[countArray];
                            }*/
                            //return obj.id.includes(arrIdsProductsFiltersGeneric1Binding);
                            //return this.arrIdsProductsFiltersGeneric1Binding.includes(obj.id);
                            return arrIdsProductsFiltersGeneric1Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric2 != 0)
            {
                this.objIdsProductsFiltersGeneric2Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 102;
                });

                if(this.objIdsProductsFiltersGeneric2Binding)
                {
                    this.arrIdsProductsFiltersGeneric2Binding = Object.keys(this.objIdsProductsFiltersGeneric2Binding).map(key => this.objIdsProductsFiltersGeneric2Binding[key]["id_filters_generic"]);


                    if(this.arrIdsProductsFiltersGeneric2Binding)
                    {
                        var arrIdsProductsFiltersGeneric2Binding = this.arrIdsProductsFiltersGeneric2Binding;

                        this.objProductsFiltersGeneric2Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric2Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableProductsFilterGeneric3 != 0)
            {
                this.objIdsProductsFiltersGeneric3Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 103;
                });

                if(this.objIdsProductsFiltersGeneric3Binding)
                {
                    this.arrIdsProductsFiltersGeneric3Binding = Object.keys(this.objIdsProductsFiltersGeneric3Binding).map(key => this.objIdsProductsFiltersGeneric3Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric3Binding)
                    {
                        var arrIdsProductsFiltersGeneric3Binding = this.arrIdsProductsFiltersGeneric3Binding;

                        this.objProductsFiltersGeneric3Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric3Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric4 != 0)
            {
                this.objIdsProductsFiltersGeneric4Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 104;
                });

                if(this.objIdsProductsFiltersGeneric4Binding)
                {
                    this.arrIdsProductsFiltersGeneric4Binding = Object.keys(this.objIdsProductsFiltersGeneric4Binding).map(key => this.objIdsProductsFiltersGeneric4Binding[key]["id_filters_generic"]);


                    if(this.arrIdsProductsFiltersGeneric4Binding)
                    {
                        var arrIdsProductsFiltersGeneric4Binding = this.arrIdsProductsFiltersGeneric4Binding;

                        this.objProductsFiltersGeneric4Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric4Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric5 != 0)
            {
                this.objIdsProductsFiltersGeneric5Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 105;
                });

                if(this.objIdsProductsFiltersGeneric5Binding)
                {
                    this.arrIdsProductsFiltersGeneric5Binding = Object.keys(this.objIdsProductsFiltersGeneric5Binding).map(key => this.objIdsProductsFiltersGeneric5Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric5Binding)
                    {
                        var arrIdsProductsFiltersGeneric5Binding = this.arrIdsProductsFiltersGeneric5Binding;

                        this.objProductsFiltersGeneric5Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric5Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric6 != 0)
            {
                this.objIdsProductsFiltersGeneric6Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 106;
                });

                if(this.objIdsProductsFiltersGeneric6Binding)
                {
                    this.arrIdsProductsFiltersGeneric6Binding = Object.keys(this.objIdsProductsFiltersGeneric6Binding).map(key => this.objIdsProductsFiltersGeneric6Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric6Binding)
                    {
                        var arrIdsProductsFiltersGeneric6Binding = this.arrIdsProductsFiltersGeneric6Binding;

                        this.objProductsFiltersGeneric6Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric6Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric7 != 0)
            {
                this.objIdsProductsFiltersGeneric7Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 107;
                });

                if(this.objIdsProductsFiltersGeneric7Binding)
                {
                    this.arrIdsProductsFiltersGeneric7Binding = Object.keys(this.objIdsProductsFiltersGeneric7Binding).map(key => this.objIdsProductsFiltersGeneric7Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric7Binding)
                    {
                        var arrIdsProductsFiltersGeneric7Binding = this.arrIdsProductsFiltersGeneric7Binding;

                        this.objProductsFiltersGeneric7Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric7Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric8 != 0)
            {
                this.objIdsProductsFiltersGeneric8Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 108;
                });

                if(this.objIdsProductsFiltersGeneric8Binding)
                {
                    this.arrIdsProductsFiltersGeneric8Binding = Object.keys(this.objIdsProductsFiltersGeneric8Binding).map(key => this.objIdsProductsFiltersGeneric8Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric8Binding)
                    {
                        var arrIdsProductsFiltersGeneric8Binding = this.arrIdsProductsFiltersGeneric8Binding;

                        this.objProductsFiltersGeneric8Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric8Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric9 != 0)
            {
                this.objIdsProductsFiltersGeneric9Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 109;
                });

                if(this.objIdsProductsFiltersGeneric9Binding)
                {
                    this.arrIdsProductsFiltersGeneric9Binding = Object.keys(this.objIdsProductsFiltersGeneric9Binding).map(key => this.objIdsProductsFiltersGeneric9Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric9Binding)
                    {
                        var arrIdsProductsFiltersGeneric9Binding = this.arrIdsProductsFiltersGeneric9Binding;

                        this.objProductsFiltersGeneric9Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric9Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric10 != 0)
            {
                this.objIdsProductsFiltersGeneric10Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 110;
                });

                if(this.objIdsProductsFiltersGeneric10Binding)
                {
                    this.arrIdsProductsFiltersGeneric10Binding = Object.keys(this.objIdsProductsFiltersGeneric10Binding).map(key => this.objIdsProductsFiltersGeneric10Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric10Binding)
                    {
                        var arrIdsProductsFiltersGeneric10Binding = this.arrIdsProductsFiltersGeneric10Binding;

                        this.objProductsFiltersGeneric10Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric10Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric11 != 0)
            {
                this.objIdsProductsFiltersGeneric11Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 111;
                });

                if(this.objIdsProductsFiltersGeneric11Binding)
                {
                    this.arrIdsProductsFiltersGeneric11Binding = Object.keys(this.objIdsProductsFiltersGeneric11Binding).map(key => this.objIdsProductsFiltersGeneric11Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric11Binding)
                    {
                        var arrIdsProductsFiltersGeneric11Binding = this.arrIdsProductsFiltersGeneric11Binding;
                        this.objProductsFiltersGeneric11Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric11Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric12 != 0)
            {
                this.objIdsProductsFiltersGeneric12Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 112;
                });

                if(this.objIdsProductsFiltersGeneric12Binding)
                {
                    this.arrIdsProductsFiltersGeneric12Binding = Object.keys(this.objIdsProductsFiltersGeneric12Binding).map(key => this.objIdsProductsFiltersGeneric12Binding[key]["id_filters_generic"]);


                    if(this.arrIdsProductsFiltersGeneric12Binding)
                    {
                        var arrIdsProductsFiltersGeneric12Binding = this.arrIdsProductsFiltersGeneric12Binding;

                        this.objProductsFiltersGeneric12Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric12Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableProductsFilterGeneric13 != 0)
            {
                this.objIdsProductsFiltersGeneric13Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 113;
                });

                if(this.objIdsProductsFiltersGeneric13Binding)
                {
                    this.arrIdsProductsFiltersGeneric13Binding = Object.keys(this.objIdsProductsFiltersGeneric13Binding).map(key => this.objIdsProductsFiltersGeneric13Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric13Binding)
                    {
                        var arrIdsProductsFiltersGeneric13Binding = this.arrIdsProductsFiltersGeneric13Binding;

                        this.objProductsFiltersGeneric13Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric13Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric14 != 0)
            {
                this.objIdsProductsFiltersGeneric14Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 114;
                });

                if(this.objIdsProductsFiltersGeneric14Binding)
                {
                    this.arrIdsProductsFiltersGeneric14Binding = Object.keys(this.objIdsProductsFiltersGeneric14Binding).map(key => this.objIdsProductsFiltersGeneric14Binding[key]["id_filters_generic"]);


                    if(this.arrIdsProductsFiltersGeneric14Binding)
                    {
                        var arrIdsProductsFiltersGeneric14Binding = this.arrIdsProductsFiltersGeneric14Binding;

                        this.objProductsFiltersGeneric14Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric14Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric15 != 0)
            {
                this.objIdsProductsFiltersGeneric15Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 115;
                });

                if(this.objIdsProductsFiltersGeneric15Binding)
                {
                    this.arrIdsProductsFiltersGeneric15Binding = Object.keys(this.objIdsProductsFiltersGeneric15Binding).map(key => this.objIdsProductsFiltersGeneric15Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric15Binding)
                    {
                        var arrIdsProductsFiltersGeneric15Binding = this.arrIdsProductsFiltersGeneric15Binding;

                        this.objProductsFiltersGeneric15Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric15Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric16 != 0)
            {
                this.objIdsProductsFiltersGeneric16Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 116;
                });

                if(this.objIdsProductsFiltersGeneric16Binding)
                {
                    this.arrIdsProductsFiltersGeneric16Binding = Object.keys(this.objIdsProductsFiltersGeneric16Binding).map(key => this.objIdsProductsFiltersGeneric16Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric16Binding)
                    {
                        var arrIdsProductsFiltersGeneric16Binding = this.arrIdsProductsFiltersGeneric16Binding;

                        this.objProductsFiltersGeneric16Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric16Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric17 != 0)
            {
                this.objIdsProductsFiltersGeneric17Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 117;
                });

                if(this.objIdsProductsFiltersGeneric17Binding)
                {
                    this.arrIdsProductsFiltersGeneric17Binding = Object.keys(this.objIdsProductsFiltersGeneric17Binding).map(key => this.objIdsProductsFiltersGeneric17Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric17Binding)
                    {
                        var arrIdsProductsFiltersGeneric17Binding = this.arrIdsProductsFiltersGeneric17Binding;

                        this.objProductsFiltersGeneric17Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric17Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric18 != 0)
            {
                this.objIdsProductsFiltersGeneric18Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 118;
                });

                if(this.objIdsProductsFiltersGeneric18Binding)
                {
                    this.arrIdsProductsFiltersGeneric18Binding = Object.keys(this.objIdsProductsFiltersGeneric18Binding).map(key => this.objIdsProductsFiltersGeneric18Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric18Binding)
                    {
                        var arrIdsProductsFiltersGeneric18Binding = this.arrIdsProductsFiltersGeneric18Binding;

                        this.objProductsFiltersGeneric18Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric18Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric19 != 0)
            {
                this.objIdsProductsFiltersGeneric19Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 119;
                });

                if(this.objIdsProductsFiltersGeneric19Binding)
                {
                    this.arrIdsProductsFiltersGeneric19Binding = Object.keys(this.objIdsProductsFiltersGeneric19Binding).map(key => this.objIdsProductsFiltersGeneric19Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric19Binding)
                    {
                        var arrIdsProductsFiltersGeneric19Binding = this.arrIdsProductsFiltersGeneric19Binding;

                        this.objProductsFiltersGeneric19Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric19Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric20 != 0)
            {
                this.objIdsProductsFiltersGeneric20Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 120;
                });

                if(this.objIdsProductsFiltersGeneric20Binding)
                {
                    this.arrIdsProductsFiltersGeneric20Binding = Object.keys(this.objIdsProductsFiltersGeneric20Binding).map(key => this.objIdsProductsFiltersGeneric20Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric20Binding)
                    {
                        var arrIdsProductsFiltersGeneric20Binding = this.arrIdsProductsFiltersGeneric20Binding;

                        this.objProductsFiltersGeneric20Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric20Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric21 != 0)
            {
                this.objIdsProductsFiltersGeneric21Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 121;
                });

                if(this.objIdsProductsFiltersGeneric21Binding)
                {
                    this.arrIdsProductsFiltersGeneric21Binding = Object.keys(this.objIdsProductsFiltersGeneric21Binding).map(key => this.objIdsProductsFiltersGeneric21Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric21Binding)
                    {
                        var arrIdsProductsFiltersGeneric21Binding = this.arrIdsProductsFiltersGeneric21Binding;
                        this.objProductsFiltersGeneric21Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric21Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric22 != 0)
            {
                this.objIdsProductsFiltersGeneric22Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 122;
                });

                if(this.objIdsProductsFiltersGeneric22Binding)
                {
                    this.arrIdsProductsFiltersGeneric22Binding = Object.keys(this.objIdsProductsFiltersGeneric22Binding).map(key => this.objIdsProductsFiltersGeneric22Binding[key]["id_filters_generic"]);


                    if(this.arrIdsProductsFiltersGeneric22Binding)
                    {
                        var arrIdsProductsFiltersGeneric22Binding = this.arrIdsProductsFiltersGeneric22Binding;

                        this.objProductsFiltersGeneric22Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric22Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableProductsFilterGeneric23 != 0)
            {
                this.objIdsProductsFiltersGeneric23Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 123;
                });

                if(this.objIdsProductsFiltersGeneric23Binding)
                {
                    this.arrIdsProductsFiltersGeneric23Binding = Object.keys(this.objIdsProductsFiltersGeneric23Binding).map(key => this.objIdsProductsFiltersGeneric23Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric23Binding)
                    {
                        var arrIdsProductsFiltersGeneric23Binding = this.arrIdsProductsFiltersGeneric23Binding;

                        this.objProductsFiltersGeneric23Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric23Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric24 != 0)
            {
                this.objIdsProductsFiltersGeneric24Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 124;
                });

                if(this.objIdsProductsFiltersGeneric24Binding)
                {
                    this.arrIdsProductsFiltersGeneric24Binding = Object.keys(this.objIdsProductsFiltersGeneric24Binding).map(key => this.objIdsProductsFiltersGeneric24Binding[key]["id_filters_generic"]);


                    if(this.arrIdsProductsFiltersGeneric24Binding)
                    {
                        var arrIdsProductsFiltersGeneric24Binding = this.arrIdsProductsFiltersGeneric24Binding;

                        this.objProductsFiltersGeneric24Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric24Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric25 != 0)
            {
                this.objIdsProductsFiltersGeneric25Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 125;
                });

                if(this.objIdsProductsFiltersGeneric25Binding)
                {
                    this.arrIdsProductsFiltersGeneric25Binding = Object.keys(this.objIdsProductsFiltersGeneric25Binding).map(key => this.objIdsProductsFiltersGeneric25Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric25Binding)
                    {
                        var arrIdsProductsFiltersGeneric25Binding = this.arrIdsProductsFiltersGeneric25Binding;

                        this.objProductsFiltersGeneric25Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric25Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric26 != 0)
            {
                this.objIdsProductsFiltersGeneric26Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 126;
                });

                if(this.objIdsProductsFiltersGeneric26Binding)
                {
                    this.arrIdsProductsFiltersGeneric26Binding = Object.keys(this.objIdsProductsFiltersGeneric26Binding).map(key => this.objIdsProductsFiltersGeneric26Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric26Binding)
                    {
                        var arrIdsProductsFiltersGeneric26Binding = this.arrIdsProductsFiltersGeneric26Binding;

                        this.objProductsFiltersGeneric26Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric26Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric27 != 0)
            {
                this.objIdsProductsFiltersGeneric27Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 127;
                });

                if(this.objIdsProductsFiltersGeneric27Binding)
                {
                    this.arrIdsProductsFiltersGeneric27Binding = Object.keys(this.objIdsProductsFiltersGeneric27Binding).map(key => this.objIdsProductsFiltersGeneric27Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric27Binding)
                    {
                        var arrIdsProductsFiltersGeneric27Binding = this.arrIdsProductsFiltersGeneric27Binding;

                        this.objProductsFiltersGeneric27Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric27Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric28 != 0)
            {
                this.objIdsProductsFiltersGeneric28Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 128;
                });

                if(this.objIdsProductsFiltersGeneric28Binding)
                {
                    this.arrIdsProductsFiltersGeneric28Binding = Object.keys(this.objIdsProductsFiltersGeneric28Binding).map(key => this.objIdsProductsFiltersGeneric28Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric28Binding)
                    {
                        var arrIdsProductsFiltersGeneric28Binding = this.arrIdsProductsFiltersGeneric28Binding;

                        this.objProductsFiltersGeneric28Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric28Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric29 != 0)
            {
                this.objIdsProductsFiltersGeneric29Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 129;
                });

                if(this.objIdsProductsFiltersGeneric29Binding)
                {
                    this.arrIdsProductsFiltersGeneric29Binding = Object.keys(this.objIdsProductsFiltersGeneric29Binding).map(key => this.objIdsProductsFiltersGeneric29Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric29Binding)
                    {
                        var arrIdsProductsFiltersGeneric29Binding = this.arrIdsProductsFiltersGeneric29Binding;

                        this.objProductsFiltersGeneric29Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric29Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableProductsFilterGeneric30 != 0)
            {
                this.objIdsProductsFiltersGeneric30Binding = this.objIdsProductsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 130;
                });

                if(this.objIdsProductsFiltersGeneric30Binding)
                {
                    this.arrIdsProductsFiltersGeneric30Binding = Object.keys(this.objIdsProductsFiltersGeneric30Binding).map(key => this.objIdsProductsFiltersGeneric30Binding[key]["id_filters_generic"]);

                    if(this.arrIdsProductsFiltersGeneric30Binding)
                    {
                        var arrIdsProductsFiltersGeneric30Binding = this.arrIdsProductsFiltersGeneric30Binding;

                        this.objProductsFiltersGeneric30Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsProductsFiltersGeneric30Binding.includes(obj.id);
                        });
                    }
                }
            }   


            //Debug.                                                                                            
            //console.log("this.objIdsProductsFiltersGenericBinding=", this.objIdsProductsFiltersGenericBinding);
            //console.log("this.objIdsProductsFiltersGeneric1Binding=", this.objIdsProductsFiltersGeneric1Binding);
            //console.log("this.arrIdsProductsFiltersGeneric1Binding=", this.arrIdsProductsFiltersGeneric1Binding);
            //console.log("this.arrIdsProductsFiltersGeneric2Binding=", this.arrIdsProductsFiltersGeneric2Binding);
            //console.log("this.arrIdsProductsFiltersGeneric3Binding=", this.arrIdsProductsFiltersGeneric3Binding);
            //console.log("this.arrIdsProductsFiltersGenericBinding=", this.arrIdsProductsFiltersGenericBinding);
            //console.log("this.arrIdsProductsFiltersGenericBinding=", this.arrIdsProductsFiltersGenericBinding.includes("125"));
            //console.log("JSON.parse(this.arrIdsProductsFiltersGenericBinding)=", JSON.parse(JSON.stringify(this.arrIdsProductsFiltersGenericBinding[0])));
            //console.log("this.arrIdsProductsFiltersGenericBinding.find=",  this.arrIdsProductsFiltersGenericBinding.find(objProductsFiltersGenericBinding => objProductsFiltersGenericBinding.id_filters_generic == '126'));
            //console.log("this.arrIdsProductsFiltersGenericBinding=", Object.keys(this.arrIdsProductsFiltersGenericBinding).map(key => this.arrIdsProductsFiltersGenericBinding[key].id_filters_generic));


            //Define values.
            //if(this.resultsProductsDetails[0])
            //{
                //DEV: Create logic to check if record exist.
            //}
            this.tblProductsID = this.resultsProductsDetails[0].id;
            this.tblProductsIdParent = this.resultsProductsDetails[0].id_parent;

            this.tblProductsSortOrder = this.resultsProductsDetails[0].sort_order;
            this.tblProductsSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblProductsSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblProductsProductsIdType = this.resultsProductsDetails[0].id_type;

            this.tblProductsDateCreation = this.resultsProductsDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            //this.tblProductsDateTimezone = this.resultsProductsDetails[0].date_timezone;
            this.tblProductsDateEdit = this.resultsProductsDetails[0].date_edit;

            this.tblProductsIdRegisterUser = this.resultsProductsDetails[0].id_register_user;
            if(this.tblProductsIdRegisterUser != 0)
            {
                this.tblProductsIdRegisterUser_print = "";
            }
            this.tblProductsIdRegister1 = this.resultsProductsDetails[0].id_register1;
            if(this.tblProductsIdRegister1 != 0)
            {
                this.tblProductsIdRegister1_print = "";
            }
            this.tblProductsIdRegister2 = this.resultsProductsDetails[0].id_register2;
            if(this.tblProductsIdRegister2 != 0)
            {
                this.tblProductsIdRegister2_print = "";
            }
            this.tblProductsIdRegister3 = this.resultsProductsDetails[0].id_register3;
            if(this.tblProductsIdRegister3 != 0)
            {
                this.tblProductsIdRegister3_print = "";
            }
            this.tblProductsIdRegister4 = this.resultsProductsDetails[0].id_register4;
            if(this.tblProductsIdRegister4 != 0)
            {
                this.tblProductsIdRegister4_print = "";
            }
            this.tblProductsIdRegister5 = this.resultsProductsDetails[0].id_register5;
            if(this.tblProductsIdRegister5 != 0)
            {
                this.tblProductsIdRegister5_print = "";
            }

            this.tblProductsCode = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].code, "db");
            this.tblProductsTitle = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].title, "db");
            this.tblProductsDescription = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].description, "db");
            this.tblProductsDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].description, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            
            this.tblProductsURLAlias = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url_alias, "db");
            //this.tblProductsKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].keywords_tags, "db");
            this.tblProductsKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].keywords_tags, "editTextBox=1");
            this.tblProductsMetaDescription = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblProductsMetaDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblProductsMetaTitle = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].meta_title, "db");
            this.tblProductsMetaInfo = this.resultsProductsDetails[0].meta_info;

            if(gSystemConfig.enableProductsInfo1 == 1)
            {
                if(gSystemConfig.configProductsInfo1FieldType == 1 || gSystemConfig.configProductsInfo1FieldType == 2)
                {
                    this.tblProductsInfo1 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info1, "db");
                    this.tblProductsInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo1FieldType == 11 || gSystemConfig.configProductsInfo1FieldType == 12)
                {
                    this.tblProductsInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info1, "db"), 2);
                    this.tblProductsInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo2 == 1)
            {
                if(gSystemConfig.configProductsInfo2FieldType == 1 || gSystemConfig.configProductsInfo2FieldType == 2)
                {
                    this.tblProductsInfo2 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info2, "db");
                    this.tblProductsInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo2FieldType == 11 || gSystemConfig.configProductsInfo2FieldType == 12)
                {
                    this.tblProductsInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info2, "db"), 2);
                    this.tblProductsInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo3 == 1)
            {
                if(gSystemConfig.configProductsInfo3FieldType == 1 || gSystemConfig.configProductsInfo3FieldType == 2)
                {
                    this.tblProductsInfo3 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info3, "db");
                    this.tblProductsInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo3FieldType == 11 || gSystemConfig.configProductsInfo3FieldType == 12)
                {
                    this.tblProductsInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info3, "db"), 2);
                    this.tblProductsInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo4 == 1)
            {
                if(gSystemConfig.configProductsInfo4FieldType == 1 || gSystemConfig.configProductsInfo4FieldType == 2)
                {
                    this.tblProductsInfo4 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info4, "db");
                    this.tblProductsInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo4FieldType == 11 || gSystemConfig.configProductsInfo4FieldType == 12)
                {
                    this.tblProductsInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info4, "db"), 2);
                    this.tblProductsInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo5 == 1)
            {
                if(gSystemConfig.configProductsInfo5FieldType == 1 || gSystemConfig.configProductsInfo5FieldType == 2)
                {
                    this.tblProductsInfo5 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info5, "db");
                    this.tblProductsInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo5FieldType == 11 || gSystemConfig.configProductsInfo5FieldType == 12)
                {
                    this.tblProductsInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info5, "db"), 2);
                    this.tblProductsInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info5, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo6 == 1)
            {
                if(gSystemConfig.configProductsInfo6FieldType == 1 || gSystemConfig.configProductsInfo6FieldType == 2)
                {
                    this.tblProductsInfo6 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info6, "db");
                    this.tblProductsInfo6_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info6, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo6FieldType == 11 || gSystemConfig.configProductsInfo6FieldType == 12)
                {
                    this.tblProductsInfo6 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info6, "db"), 2);
                    this.tblProductsInfo6_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info6, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo7 == 1)
            {
                if(gSystemConfig.configProductsInfo7FieldType == 1 || gSystemConfig.configProductsInfo7FieldType == 2)
                {
                    this.tblProductsInfo7 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info7, "db");
                    this.tblProductsInfo7_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info7, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo7FieldType == 11 || gSystemConfig.configProductsInfo7FieldType == 12)
                {
                    this.tblProductsInfo7 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info7, "db"), 2);
                    this.tblProductsInfo7_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info7, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo8 == 1)
            {
                if(gSystemConfig.configProductsInfo8FieldType == 1 || gSystemConfig.configProductsInfo8FieldType == 2)
                {
                    this.tblProductsInfo8 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info8, "db");
                    this.tblProductsInfo8_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info8, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo8FieldType == 11 || gSystemConfig.configProductsInfo8FieldType == 12)
                {
                    this.tblProductsInfo8 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info8, "db"), 2);
                    this.tblProductsInfo8_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info8, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo9 == 1)
            {
                if(gSystemConfig.configProductsInfo9FieldType == 1 || gSystemConfig.configProductsInfo9FieldType == 2)
                {
                    this.tblProductsInfo9 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info9, "db");
                    this.tblProductsInfo9_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info9, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo9FieldType == 11 || gSystemConfig.configProductsInfo9FieldType == 12)
                {
                    this.tblProductsInfo9 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info9, "db"), 2);
                    this.tblProductsInfo9_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info9, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo10 == 1)
            {
                if(gSystemConfig.configProductsInfo10FieldType == 1 || gSystemConfig.configProductsInfo10FieldType == 2)
                {
                    this.tblProductsInfo10 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info10, "db");
                    this.tblProductsInfo10_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info10, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo10FieldType == 11 || gSystemConfig.configProductsInfo10FieldType == 12)
                {
                    this.tblProductsInfo10 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info10, "db"), 2);
                    this.tblProductsInfo10_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info10, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo11 == 1)
            {
                if(gSystemConfig.configProductsInfo11FieldType == 1 || gSystemConfig.configProductsInfo11FieldType == 2)
                {
                    this.tblProductsInfo11 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info11, "db");
                    this.tblProductsInfo11_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info11, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo11FieldType == 11 || gSystemConfig.configProductsInfo11FieldType == 12)
                {
                    this.tblProductsInfo11 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info11, "db"), 2);
                    this.tblProductsInfo11_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info11, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo12 == 1)
            {
                if(gSystemConfig.configProductsInfo12FieldType == 1 || gSystemConfig.configProductsInfo12FieldType == 2)
                {
                    this.tblProductsInfo12 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info12, "db");
                    this.tblProductsInfo12_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info12, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo12FieldType == 11 || gSystemConfig.configProductsInfo12FieldType == 12)
                {
                    this.tblProductsInfo12 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info12, "db"), 2);
                    this.tblProductsInfo12_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info12, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo13 == 1)
            {
                if(gSystemConfig.configProductsInfo13FieldType == 1 || gSystemConfig.configProductsInfo13FieldType == 2)
                {
                    this.tblProductsInfo13 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info13, "db");
                    this.tblProductsInfo13_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info13, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo13FieldType == 11 || gSystemConfig.configProductsInfo13FieldType == 12)
                {
                    this.tblProductsInfo13 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info13, "db"), 2);
                    this.tblProductsInfo13_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info13, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo14 == 1)
            {
                if(gSystemConfig.configProductsInfo14FieldType == 1 || gSystemConfig.configProductsInfo14FieldType == 2)
                {
                    this.tblProductsInfo14 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info14, "db");
                    this.tblProductsInfo14_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info14, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo14FieldType == 11 || gSystemConfig.configProductsInfo14FieldType == 12)
                {
                    this.tblProductsInfo14 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info14, "db"), 2);
                    this.tblProductsInfo14_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info14, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo15 == 1)
            {
                if(gSystemConfig.configProductsInfo15FieldType == 1 || gSystemConfig.configProductsInfo15FieldType == 2)
                {
                    this.tblProductsInfo15 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info15, "db");
                    this.tblProductsInfo15_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info15, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo15FieldType == 11 || gSystemConfig.configProductsInfo15FieldType == 12)
                {
                    this.tblProductsInfo15 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info15, "db"), 2);
                    this.tblProductsInfo15_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info15, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo16 == 1)
            {
                if(gSystemConfig.configProductsInfo16FieldType == 1 || gSystemConfig.configProductsInfo16FieldType == 2)
                {
                    this.tblProductsInfo16 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info16, "db");
                    this.tblProductsInfo16_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info16, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo16FieldType == 11 || gSystemConfig.configProductsInfo16FieldType == 12)
                {
                    this.tblProductsInfo16 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info16, "db"), 2);
                    this.tblProductsInfo16_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info16, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo17 == 1)
            {
                if(gSystemConfig.configProductsInfo17FieldType == 1 || gSystemConfig.configProductsInfo17FieldType == 2)
                {
                    this.tblProductsInfo17 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info17, "db");
                    this.tblProductsInfo17_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info17, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo17FieldType == 11 || gSystemConfig.configProductsInfo17FieldType == 12)
                {
                    this.tblProductsInfo17 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info17, "db"), 2);
                    this.tblProductsInfo17_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info17, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo18 == 1)
            {
                if(gSystemConfig.configProductsInfo18FieldType == 1 || gSystemConfig.configProductsInfo18FieldType == 2)
                {
                    this.tblProductsInfo18 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info18, "db");
                    this.tblProductsInfo18_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info18, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo18FieldType == 11 || gSystemConfig.configProductsInfo18FieldType == 12)
                {
                    this.tblProductsInfo18 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info18, "db"), 2);
                    this.tblProductsInfo18_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info18, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo19 == 1)
            {
                if(gSystemConfig.configProductsInfo19FieldType == 1 || gSystemConfig.configProductsInfo19FieldType == 2)
                {
                    this.tblProductsInfo19 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info19, "db");
                    this.tblProductsInfo19_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info19, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo19FieldType == 11 || gSystemConfig.configProductsInfo19FieldType == 12)
                {
                    this.tblProductsInfo19 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info19, "db"), 2);
                    this.tblProductsInfo19_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info19, "db"), 2);
                }
            }
            if(gSystemConfig.enableProductsInfo20 == 1)
            {
                if(gSystemConfig.configProductsInfo20FieldType == 1 || gSystemConfig.configProductsInfo20FieldType == 2)
                {
                    this.tblProductsInfo20 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info20, "db");
                    this.tblProductsInfo20_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info20, "db");
                }

                //Encrypted.
                if(gSystemConfig.configProductsInfo20FieldType == 11 || gSystemConfig.configProductsInfo20FieldType == 12)
                {
                    this.tblProductsInfo20 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info20, "db"), 2);
                    this.tblProductsInfo20_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info20, "db"), 2);
                }
            }

            this.tblProductsInfoSmall1 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small1, "db");
            this.tblProductsInfoSmall1_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small1, "db");
            this.tblProductsInfoSmall2 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small2, "db");
            this.tblProductsInfoSmall2_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small2, "db");
            this.tblProductsInfoSmall3 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small3, "db");
            this.tblProductsInfoSmall3_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small3, "db");
            this.tblProductsInfoSmall4 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small4, "db");
            this.tblProductsInfoSmall4_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small4, "db");
            this.tblProductsInfoSmall5 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small5, "db");
            this.tblProductsInfoSmall5_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small5, "db");
            this.tblProductsInfoSmall6 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small6, "db");
            this.tblProductsInfoSmall6_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small6, "db");
            this.tblProductsInfoSmall7 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small7, "db");
            this.tblProductsInfoSmall7_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small7, "db");
            this.tblProductsInfoSmall8 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small8, "db");
            this.tblProductsInfoSmall8_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small8, "db");
            this.tblProductsInfoSmall9 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small9, "db");
            this.tblProductsInfoSmall9_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small9, "db");
            this.tblProductsInfoSmall10 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small10, "db");
            this.tblProductsInfoSmall10_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small10, "db");
            this.tblProductsInfoSmall11 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small11, "db");
            this.tblProductsInfoSmall11_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small11, "db");
            this.tblProductsInfoSmall12 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small12, "db");
            this.tblProductsInfoSmall12_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small12, "db");
            this.tblProductsInfoSmall13 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small13, "db");
            this.tblProductsInfoSmall13_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small13, "db");
            this.tblProductsInfoSmall14 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small14, "db");
            this.tblProductsInfoSmall14_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small14, "db");
            this.tblProductsInfoSmall15 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small15, "db");
            this.tblProductsInfoSmall15_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small15, "db");
            this.tblProductsInfoSmall16 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small16, "db");
            this.tblProductsInfoSmall16_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small16, "db");
            this.tblProductsInfoSmall17 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small17, "db");
            this.tblProductsInfoSmall17_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small17, "db");
            this.tblProductsInfoSmall18 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small18, "db");
            this.tblProductsInfoSmall18_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small18, "db");
            this.tblProductsInfoSmall19 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small19, "db");
            this.tblProductsInfoSmall19_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small19, "db");
            this.tblProductsInfoSmall20 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small20, "db");
            this.tblProductsInfoSmall20_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small20, "db");
            this.tblProductsInfoSmall21 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small21, "db");
            this.tblProductsInfoSmall21_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small21, "db");
            this.tblProductsInfoSmall22 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small22, "db");
            this.tblProductsInfoSmall22_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small22, "db");
            this.tblProductsInfoSmall23 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small23, "db");
            this.tblProductsInfoSmall23_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small23, "db");
            this.tblProductsInfoSmall24 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small24, "db");
            this.tblProductsInfoSmall24_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small24, "db");
            this.tblProductsInfoSmall25 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small25, "db");
            this.tblProductsInfoSmall25_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small25, "db");
            this.tblProductsInfoSmall26 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small26, "db");
            this.tblProductsInfoSmall26_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small26, "db");
            this.tblProductsInfoSmall27 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small27, "db");
            this.tblProductsInfoSmall27_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small27, "db");
            this.tblProductsInfoSmall28 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small28, "db");
            this.tblProductsInfoSmall28_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small28, "db");
            this.tblProductsInfoSmall29 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small29, "db");
            this.tblProductsInfoSmall29_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small29, "db");
            this.tblProductsInfoSmall30 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small30, "db");
            this.tblProductsInfoSmall30_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].info_small30, "db");

            this.tblProductsValue = this.resultsProductsDetails[0].value;
            this.tblProductsValue_print = FunctionsGeneric.valueMaskRead(this.tblProductsValue, gSystemConfig.configSystemCurrency, 2);
            this.tblProductsValue1 = this.resultsProductsDetails[0].value1;
            this.tblProductsValue1_print = FunctionsGeneric.valueMaskRead(this.tblProductsValue1, gSystemConfig.configSystemCurrency, 2);
            this.tblProductsValue2 = this.resultsProductsDetails[0].value2;
            this.tblProductsValue2_print = FunctionsGeneric.valueMaskRead(this.tblProductsValue2, gSystemConfig.configSystemCurrency, 2);
            this.tblProductsWeight = this.resultsProductsDetails[0].weight;
            this.tblProductsWeight_print = FunctionsGeneric.valueMaskRead(this.tblProductsWeight, gSystemConfig.configSystemCurrency, 3);
            this.tblProductsCoefficient = this.resultsProductsDetails[0].coefficient;
            this.tblProductsCoefficient_print = FunctionsGeneric.valueMaskRead(this.tblProductsCoefficient, gSystemConfig.configSystemCurrency, 3);

            this.tblProductsNumber1 = this.resultsProductsDetails[0].number1;
            this.tblProductsNumber1_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumber1, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumber1FieldType);
            this.tblProductsNumber2 = this.resultsProductsDetails[0].number2;
            this.tblProductsNumber2_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumber2, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumber2FieldType);
            this.tblProductsNumber3 = this.resultsProductsDetails[0].number3;
            this.tblProductsNumber3_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumber3, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumber3FieldType);
            this.tblProductsNumber4 = this.resultsProductsDetails[0].number4;
            this.tblProductsNumber4_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumber4, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumber4FieldType);
            this.tblProductsNumber5 = this.resultsProductsDetails[0].number5;
            this.tblProductsNumber5_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumber5, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumber5FieldType);

            this.tblProductsNumberSmall1 = this.resultsProductsDetails[0].number_small1;
            this.tblProductsNumberSmall1_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumberSmall1, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumberS1FieldType);
            this.tblProductsNumberSmall2 = this.resultsProductsDetails[0].number_small2;
            this.tblProductsNumberSmall2_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumberSmall2, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumberS2FieldType);
            this.tblProductsNumberSmall3 = this.resultsProductsDetails[0].number_small3;
            this.tblProductsNumberSmall3_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumberSmall3, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumberS3FieldType);
            this.tblProductsNumberSmall4 = this.resultsProductsDetails[0].number_small4;
            this.tblProductsNumberSmall4_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumberSmall4, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumberS4FieldType);
            this.tblProductsNumberSmall5 = this.resultsProductsDetails[0].number_small5;
            this.tblProductsNumberSmall5_print = FunctionsGeneric.valueMaskRead(this.tblProductsNumberSmall5, gSystemConfig.configSystemCurrency, gSystemConfig.configProductsNumberS5FieldType);
            
            this.tblProductsURL1 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url1, "db");
            this.tblProductsURL1_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url1, "db");
            this.tblProductsURL2 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url2, "db");
            this.tblProductsURL2_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url2, "db");
            this.tblProductsURL3 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url3, "db");
            this.tblProductsURL3_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url3, "db");
            this.tblProductsURL4 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url4, "db");
            this.tblProductsURL4_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url4, "db");
            this.tblProductsURL5 = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url5, "db");
            this.tblProductsURL5_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].url5, "db");
            
            this.tblProductsDate1 = this.resultsProductsDetails[0].date1;
            if(this.tblProductsDate1)
            {
                this.tblProductsDate1DateObj = this.tblProductsDate1;
                this.tblProductsDate1DateYear = this.tblProductsDate1DateObj.getFullYear();
                this.tblProductsDate1DateDay = this.tblProductsDate1DateObj.getDate();
                this.tblProductsDate1DateMonth = (this.tblProductsDate1DateObj.getMonth() + 1);
            
                this.tblProductsDate1DateHour = this.tblProductsDate1DateObj.getHours();
                this.tblProductsDate1DateHour_print = ("0" + this.tblProductsDate1DateObj.getHours()).slice(-2);

                this.tblProductsDate1DateMinute = this.tblProductsDate1DateObj.getMinutes();
                this.tblProductsDate1DateMinute_print = ("0" + this.tblProductsDate1DateObj.getMinutes()).slice(-2);

                this.tblProductsDate1DateSecond = this.tblProductsDate1DateObj.getSeconds();
                this.tblProductsDate1DateSecond_print = ("0" + this.tblProductsDate1DateObj.getSeconds()).slice(-2);

                //this.tblProductsDate1_print = this.tblProductsDate1;
                this.tblProductsDate1_print = FunctionsGeneric.dateRead01(this.tblProductsDate1, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configProductsDate1Type);
            }

            this.tblProductsDate2 = this.resultsProductsDetails[0].date2;
            if(this.tblProductsDate2)
            {
                this.tblProductsDate2DateObj = this.tblProductsDate2;
                this.tblProductsDate2DateYear = this.tblProductsDate2DateObj.getFullYear();
                this.tblProductsDate2DateDay = this.tblProductsDate2DateObj.getDate();
                this.tblProductsDate2DateMonth = (this.tblProductsDate2DateObj.getMonth() + 1);
            
                this.tblProductsDate2DateHour = this.tblProductsDate2DateObj.getHours();
                this.tblProductsDate2DateHour_print = ("0" + this.tblProductsDate2DateObj.getHours()).slice(-2);

                this.tblProductsDate2DateMinute = this.tblProductsDate2DateObj.getMinutes();
                this.tblProductsDate2DateMinute_print = ("0" + this.tblProductsDate2DateObj.getMinutes()).slice(-2);

                this.tblProductsDate2DateSecond = this.tblProductsDate2DateObj.getSeconds();
                this.tblProductsDate2DateSecond_print = ("0" + this.tblProductsDate2DateObj.getSeconds()).slice(-2);

                this.tblProductsDate2_print = FunctionsGeneric.dateRead01(this.tblProductsDate2, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configProductsDate2Type);
            }

            this.tblProductsDate3 = this.resultsProductsDetails[0].date3;
            if(this.tblProductsDate3)
            {
                this.tblProductsDate3DateObj = this.tblProductsDate3;
                this.tblProductsDate3DateYear = this.tblProductsDate3DateObj.getFullYear();
                this.tblProductsDate3DateDay = this.tblProductsDate3DateObj.getDate();
                this.tblProductsDate3DateMonth = (this.tblProductsDate3DateObj.getMonth() + 1);
            
                this.tblProductsDate3DateHour = this.tblProductsDate3DateObj.getHours();
                this.tblProductsDate3DateHour_print = ("0" + this.tblProductsDate3DateObj.getHours()).slice(-2);

                this.tblProductsDate3DateMinute = this.tblProductsDate3DateObj.getMinutes();
                this.tblProductsDate3DateMinute_print = ("0" + this.tblProductsDate3DateObj.getMinutes()).slice(-2);

                this.tblProductsDate3DateSecond = this.tblProductsDate3DateObj.getSeconds();
                this.tblProductsDate3DateSecond_print = ("0" + this.tblProductsDate3DateObj.getSeconds()).slice(-2);

                this.tblProductsDate3_print = FunctionsGeneric.dateRead01(this.tblProductsDate3, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configProductsDate3Type);
            }

            this.tblProductsDate4 = this.resultsProductsDetails[0].date4;
            if(this.tblProductsDate4)
            {
                this.tblProductsDate4DateObj = this.tblProductsDate4;
                this.tblProductsDate4DateYear = this.tblProductsDate4DateObj.getFullYear();
                this.tblProductsDate4DateDay = this.tblProductsDate4DateObj.getDate();
                this.tblProductsDate4DateMonth = (this.tblProductsDate4DateObj.getMonth() + 1);
            
                this.tblProductsDate4DateHour = this.tblProductsDate4DateObj.getHours();
                this.tblProductsDate4DateHour_print = ("0" + this.tblProductsDate4DateObj.getHours()).slice(-2);

                this.tblProductsDate4DateMinute = this.tblProductsDate4DateObj.getMinutes();
                this.tblProductsDate4DateMinute_print = ("0" + this.tblProductsDate4DateObj.getMinutes()).slice(-2);

                this.tblProductsDate4DateSecond = this.tblProductsDate4DateObj.getSeconds();
                this.tblProductsDate4DateSecond_print = ("0" + this.tblProductsDate4DateObj.getSeconds()).slice(-2);

                this.tblProductsDate4_print = FunctionsGeneric.dateRead01(this.tblProductsDate4, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configProductsDate4Type);
            }

            this.tblProductsDate5 = this.resultsProductsDetails[0].date5;
            if(this.tblProductsDate5)
            {
                this.tblProductsDate5DateObj = this.tblProductsDate5;
                this.tblProductsDate5DateYear = this.tblProductsDate5DateObj.getFullYear();
                this.tblProductsDate5DateDay = this.tblProductsDate5DateObj.getDate();
                this.tblProductsDate5DateMonth = (this.tblProductsDate5DateObj.getMonth() + 1);
            
                this.tblProductsDate5DateHour = this.tblProductsDate5DateObj.getHours();
                this.tblProductsDate5DateHour_print = ("0" + this.tblProductsDate5DateObj.getHours()).slice(-2);

                this.tblProductsDate5DateMinute = this.tblProductsDate5DateObj.getMinutes();
                this.tblProductsDate5DateMinute_print = ("0" + this.tblProductsDate5DateObj.getMinutes()).slice(-2);

                this.tblProductsDate5DateSecond = this.tblProductsDate5DateObj.getSeconds();
                this.tblProductsDate5DateSecond_print = ("0" + this.tblProductsDate5DateObj.getSeconds()).slice(-2);

                this.tblProductsDate5_print = FunctionsGeneric.dateRead01(this.tblProductsDate5, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configProductsDate5Type);
            }
            
            this.tblProductsIdItem1 = this.resultsProductsDetails[0].id_item1;
            this.tblProductsIdItem2 = this.resultsProductsDetails[0].id_item2;
            this.tblProductsIdItem3 = this.resultsProductsDetails[0].id_item3;
            this.tblProductsIdItem4 = this.resultsProductsDetails[0].id_item4;
            this.tblProductsIdItem5 = this.resultsProductsDetails[0].id_item5;

            this.tblProductsImageMain = this.resultsProductsDetails[0].image_main;
            this.tblProductsImageMainCaption = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].image_main_caption, "db");
            this.tblProductsFile1 = this.resultsProductsDetails[0].file1;
            this.tblProductsFile2 = this.resultsProductsDetails[0].file2;
            this.tblProductsFile3 = this.resultsProductsDetails[0].file3;
            this.tblProductsFile4 = this.resultsProductsDetails[0].file4;
            this.tblProductsFile5 = this.resultsProductsDetails[0].file5;

            this.tblProductsActivation = this.resultsProductsDetails[0].activation;
            if(this.tblProductsActivation == 0)
            {
                this.tblProductsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblProductsActivation == 1)
            {
                this.tblProductsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblProductsActivation1 = this.resultsProductsDetails[0].activation1;
            if(this.tblProductsActivation1 == 0)
            {
                this.tblProductsActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblProductsActivation1 == 1)
            {
                this.tblProductsActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblProductsActivation2 = this.resultsProductsDetails[0].activation2;
            if(this.tblProductsActivation2 == 0)
            {
                this.tblProductsActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblProductsActivation2 == 1)
            {
                this.tblProductsActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblProductsActivation3 = this.resultsProductsDetails[0].activation3;
            if(this.tblProductsActivation3 == 0)
            {
                this.tblProductsActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblProductsActivation3 == 1)
            {
                this.tblProductsActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblProductsActivation4 = this.resultsProductsDetails[0].activation4;
            if(this.tblProductsActivation4 == 0)
            {
                this.tblProductsActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblProductsActivation4 == 1)
            {
                this.tblProductsActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblProductsActivation5 = this.resultsProductsDetails[0].activation5;
            if(this.tblProductsActivation5 == 0)
            {
                this.tblProductsActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblProductsActivation5 == 1)
            {
                this.tblProductsActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblProductsIdStatus = this.resultsProductsDetails[0].id_status;
            if(this.tblProductsIdStatus == 0)
            {
                this.tblProductsIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblProductsIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblProductsIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }

            this.tblProductsRestrictedAccess = this.resultsProductsDetails[0].restricted_access;
            if(this.tblProductsRestrictedAccess == 0)
            {
                this.tblProductsRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess0");
            }
            if(this.tblProductsRestrictedAccess == 1)
            {
                this.tblProductsRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess1");
            }

            this.tblProductsNotes = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].notes, "db");
            this.tblProductsNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsProductsDetails[0].notes, "db");
    

            //Debug.
            //console.log("this.arrSearchParameters=", this.arrSearchParameters)
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(asyncError)
            }
        }finally{

        }
    }
    //**************************************************************************************


    //Usage.
    //----------------------
    /*
    this.arrSearchParameters = [];
    this.opdRecord = "";
    this.opdRecordParameters = {
        _arrSearchParameters: this.arrSearchParameters,
        _idTbProducts: this._idTbProducts,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.opdRecord = new SyncSystemNS.ObjectFormsFieldsDetails(this.opdRecordParameters);
    await this.opdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};