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


module.exports = class ObjectCategoriesDetails
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
        this.idTbCategories = (objParameters.hasOwnProperty("_idTbCategories")) ? objParameters._idTbCategories : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        //this.configSortOrder = (objParameters.hasOwnProperty("_configSortOrder")) ? objParameters._configSortOrder : gSystemConfig.configCategoriesSort;
        //this.strNRecords = (objParameters.hasOwnProperty("_strNRecords")) ? objParameters._strNRecords : "";
        //this.strReturnFields = (objParameters.hasOwnProperty("_strReturnFields")) ? objParameters._strReturnFields : "*";
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsCategoryDetails = "";

        this.tblCategoriesID = "";
        this.tblCategoriesIdParent = 0;
        this.tblCategoriesSortOrder = 0;
        this.tblCategoriesSortOrder_print = 0;
        this.tblCategoriesCategoryType = 0; //Review: check categories insert to see if 0 is default value

        this.tblCategoriesDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblCategoriesDateTimezone = "";
        this.tblCategoriesDateEdit = "";

        this.tblCategoriesIdRegisterUser = 0;
        this.tblCategoriesIdRegisterUser_print = "";
        this.tblCategoriesIdRegister1 = 0;
        this.tblCategoriesIdRegister1_print = "";
        this.tblCategoriesIdRegister2 = 0;
        this.tblCategoriesIdRegister2_print = "";
        this.tblCategoriesIdRegister3 = 0;
        this.tblCategoriesIdRegister3_print = "";
        this.tblCategoriesIdRegister4 = 0;
        this.tblCategoriesIdRegister4_print = "";
        this.tblCategoriesIdRegister5 = 0;
        this.tblCategoriesIdRegister5_print = "";

        this.tblCategoriesTitle = "";
        this.tblCategoriesDescription = "";
        this.tblCategoriesDescription_edit = "";
        
        this.tblCategoriesURLAlias = "";
        this.tblCategoriesKeywordsTags = "";
        this.tblCategoriesMetaDescription = "";
        this.tblCategoriesMetaDescription_edit = "";
        this.tblCategoriesMetaTitle = "";
        this.tblCategoriesMetaInfo = "";

        this.tblCategoriesInfo1 = "";
        this.tblCategoriesInfo1_edit = "";
        this.tblCategoriesInfo2 = "";
        this.tblCategoriesInfo2_edit = "";
        this.tblCategoriesInfo3 = "";
        this.tblCategoriesInfo3_edit = "";
        this.tblCategoriesInfo4 = "";
        this.tblCategoriesInfo4_edit = "";
        this.tblCategoriesInfo5 = "";
        this.tblCategoriesInfo5_edit = "";
        this.tblCategoriesInfo6 = "";
        this.tblCategoriesInfo6_edit = "";
        this.tblCategoriesInfo7 = "";
        this.tblCategoriesInfo7_edit = "";
        this.tblCategoriesInfo8 = "";
        this.tblCategoriesInfo8_edit = "";
        this.tblCategoriesInfo9 = "";
        this.tblCategoriesInfo9_edit = "";
        this.tblCategoriesInfo10 = "";
        this.tblCategoriesInfo10_edit = "";

        this.tblCategoriesInfoSmall1 = "";
        this.tblCategoriesInfoSmall1_edit = "";
        this.tblCategoriesInfoSmall2 = "";
        this.tblCategoriesInfoSmall2_edit = "";
        this.tblCategoriesInfoSmall3 = "";
        this.tblCategoriesInfoSmall3_edit = "";
        this.tblCategoriesInfoSmall4 = "";
        this.tblCategoriesInfoSmall4_edit = "";
        this.tblCategoriesInfoSmall5 = "";
        this.tblCategoriesInfoSmall5_edit = "";

        this.tblCategoriesNumber1 = 0;
        this.tblCategoriesNumber1_print = "";
        this.tblCategoriesNumber2 = 0;
        this.tblCategoriesNumber2_print = "";
        this.tblCategoriesNumber3 = 0;
        this.tblCategoriesNumber3_print = "";
        this.tblCategoriesNumber4 = 0;
        this.tblCategoriesNumber4_print = "";
        this.tblCategoriesNumber5 = 0;
        this.tblCategoriesNumber5_print = "";

        this.tblCategoriesNumberSmall1 = 0;
        this.tblCategoriesNumberSmall1_print = "";
        this.tblCategoriesNumberSmall2 = 0;
        this.tblCategoriesNumberSmall2_print = "";
        this.tblCategoriesNumberSmall3 = 0;
        this.tblCategoriesNumberSmall3_print = "";
        this.tblCategoriesNumberSmall4 = 0;
        this.tblCategoriesNumberSmall4_print = "";
        this.tblCategoriesNumberSmall5 = 0;
        this.tblCategoriesNumberSmall5_print = "";
        
        this.tblCategoriesDate1 = null;
        this.tblCategoriesDate1_print = "";
        this.tblCategoriesDate1DateObj = new Date();
        this.tblCategoriesDate1DateYear, this.tblCategoriesDate1DateDay, this.tblCategoriesDate1DateMonth;
        this.tblCategoriesDate1DateHour, this.tblCategoriesDate1DateHour_print, this.tblCategoriesDate1DateMinute, this.tblCategoriesDate1DateMinute_print, this.tblCategoriesDate1DateSecond, this.tblCategoriesDate1DateSecond_print;

        this.tblCategoriesDate2 = null;
        this.tblCategoriesDate2_print = "";
        this.tblCategoriesDate2DateObj = new Date();
        this.tblCategoriesDate2DateYear, this.tblCategoriesDate2DateDay, this.tblCategoriesDate2DateMonth;
        this.tblCategoriesDate2DateHour, this.tblCategoriesDate2DateHour_print, this.tblCategoriesDate2DateMinute, this.tblCategoriesDate2DateMinute_print, this.tblCategoriesDate2DateSecond, this.tblCategoriesDate2DateSecond_print;

        this.tblCategoriesDate3 = null;
        this.tblCategoriesDate3_print = "";
        this.tblCategoriesDate3DateObj = new Date();
        this.tblCategoriesDate3DateYear, this.tblCategoriesDate3DateDay, this.tblCategoriesDate3DateMonth;
        this.tblCategoriesDate3DateHour, this.tblCategoriesDate3DateHour_print, this.tblCategoriesDate3DateMinute, this.tblCategoriesDate3DateMinute_print, this.tblCategoriesDate3DateSecond, this.tblCategoriesDate3DateSecond_print;

        this.tblCategoriesDate4 = null;
        this.tblCategoriesDate4_print = "";
        this.tblCategoriesDate4DateObj = new Date();
        this.tblCategoriesDate4DateYear, this.tblCategoriesDate4DateDay, this.tblCategoriesDate4DateMonth;
        this.tblCategoriesDate4DateHour, this.tblCategoriesDate4DateHour_print, this.tblCategoriesDate4DateMinute, this.tblCategoriesDate4DateMinute_print, this.tblCategoriesDate4DateSecond, this.tblCategoriesDate4DateSecond_print;

        this.tblCategoriesDate5 = null;
        this.tblCategoriesDate5_print = "";
        this.tblCategoriesDate5DateObj = new Date();
        this.tblCategoriesDate5DateYear, this.tblCategoriesDate5DateDay, this.tblCategoriesDate5DateMonth;
        this.tblCategoriesDate5DateHour, this.tblCategoriesDate5DateHour_print, this.tblCategoriesDate5DateMinute, this.tblCategoriesDate5DateMinute_print, this.tblCategoriesDate5DateSecond, this.tblCategoriesDate5DateSecond_print;

        this.tblCategoriesIdItem1 = 0;
        this.tblCategoriesIdItem2 = 0;
        this.tblCategoriesIdItem3 = 0;
        this.tblCategoriesIdItem4 = 0;
        this.tblCategoriesIdItem5 = 0;

        this.tblCategoriesImageMain = "";

        this.tblCategoriesFile1 = "";
        this.tblCategoriesFile2 = "";
        this.tblCategoriesFile3 = "";
        this.tblCategoriesFile4 = "";
        this.tblCategoriesFile5 = "";

        this.tblCategoriesActivation = 1;
        this.tblCategoriesActivation_print = "";
        this.tblCategoriesActivation1 = 0;
        this.tblCategoriesActivation1_print = "";
        this.tblCategoriesActivation2 = 0;
        this.tblCategoriesActivation2_print = "";
        this.tblCategoriesActivation3 = 0;
        this.tblCategoriesActivation3_print = "";
        this.tblCategoriesActivation4 = 0;
        this.tblCategoriesActivation4_print = "";
        this.tblCategoriesActivation5 = 0;
        this.tblCategoriesActivation5_print = "";

        this.tblCategoriesIdStatus = 0;
        this.tblCategoriesIdStatus_print = 0;

        this.tblCategoriesRestrictedAccess = 0;
        this.tblCategoriesRestrictedAccess_print = "";

        this.tblCategoriesNotes = "";
        this.tblCategoriesNotes_edit = "";

        this.ofglRecords;

        this.arrIdsCategoriesFiltersGeneric1 = [];
        this.arrIdsCategoriesFiltersGeneric2 = [];
        this.arrIdsCategoriesFiltersGeneric3 = [];
        this.arrIdsCategoriesFiltersGeneric4 = [];
        this.arrIdsCategoriesFiltersGeneric5 = [];
        this.arrIdsCategoriesFiltersGeneric6 = [];
        this.arrIdsCategoriesFiltersGeneric7 = [];
        this.arrIdsCategoriesFiltersGeneric8 = [];
        this.arrIdsCategoriesFiltersGeneric9 = [];
        this.arrIdsCategoriesFiltersGeneric10 = [];

        this.objIdsCategoriesFiltersGenericBinding;

        this.objIdsCategoriesFiltersGeneric1Binding;
        this.objIdsCategoriesFiltersGeneric2Binding;
        this.objIdsCategoriesFiltersGeneric3Binding;
        this.objIdsCategoriesFiltersGeneric4Binding;
        this.objIdsCategoriesFiltersGeneric5Binding;
        this.objIdsCategoriesFiltersGeneric6Binding;
        this.objIdsCategoriesFiltersGeneric7Binding;
        this.objIdsCategoriesFiltersGeneric8Binding;
        this.objIdsCategoriesFiltersGeneric9Binding;
        this.objIdsCategoriesFiltersGeneric10Binding;

        this.objCategoriesFiltersGeneric1Binding_print;
        this.objCategoriesFiltersGeneric2Binding_print;
        this.objCategoriesFiltersGeneric3Binding_print;
        this.objCategoriesFiltersGeneric4Binding_print;
        this.objCategoriesFiltersGeneric5Binding_print;
        this.objCategoriesFiltersGeneric6Binding_print;
        this.objCategoriesFiltersGeneric7Binding_print;
        this.objCategoriesFiltersGeneric8Binding_print;
        this.objCategoriesFiltersGeneric9Binding_print;
        this.objCategoriesFiltersGeneric10Binding_print;

        this.arrIdsCategoriesFiltersGeneric1Binding = [];
        this.arrIdsCategoriesFiltersGeneric2Binding = [];
        this.arrIdsCategoriesFiltersGeneric3Binding = [];
        this.arrIdsCategoriesFiltersGeneric4Binding = [];
        this.arrIdsCategoriesFiltersGeneric5Binding = [];
        this.arrIdsCategoriesFiltersGeneric6Binding = [];
        this.arrIdsCategoriesFiltersGeneric7Binding = [];
        this.arrIdsCategoriesFiltersGeneric8Binding = [];
        this.arrIdsCategoriesFiltersGeneric9Binding = [];
        this.arrIdsCategoriesFiltersGeneric10Binding = [];
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectCategoriesDetails();
    }
    //**************************************************************************************


    //Get category details according to search parameters.
    //**************************************************************************************
    //async recordsListingGet(idParent = null, terminal = 0, returnType = 1)
    /**
     * Get categories details according to search parameters.
     * @param {*} terminal 0 - backend | 1 - frontend
     * @param {*} returnType 1 - array | 3 - Json Object | 10 - html
     * @returns {json}
     */
    async recordDetailsGet(terminal = 0, returnType = 1)
    //static async categoriesListingGet(idParent = null, terminal = 0, returnType = 1)
    //function categoriesListingGet(idParent = null, terminal = 0, returnType = 1)
    {
        //terminal: 0 - backend | 1 - frontend
        //returnType: 1 - array | 3 - Json Object | 10 - html

        /**/
        try
        {
            //id, id_parent, sort_order, category_type, date_creation, title, image_main, activation //debug
            //this.resultsCategoriesListing = await FunctionsDB.genericTableGet02("categories", 
            this.resultsCategoryDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                this.arrSearchParameters, 
                                                                                "", 
                                                                                "", 
                                                                                FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableCategories, "all", "string"), 
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
            this.objIdsCategoriesFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_record;" + this.idTbCategories + ";i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                            1, 
                                                                                            {returnType: 3});

            //Filters generic - separation.                                                                                
            if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
            {
                this.objIdsCategoriesFiltersGeneric1Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 101;
                });

                if(this.objIdsCategoriesFiltersGeneric1Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric1Binding = Object.keys(this.objIdsCategoriesFiltersGeneric1Binding).map(key => this.objIdsCategoriesFiltersGeneric1Binding[key]["id_filters_generic"]);
                    //this.arrIdsCategoriesFiltersGeneric1Binding = Object.keys(this.objIdsCategoriesFiltersGeneric1Binding).map(key => this.objIdsCategoriesFiltersGeneric1Binding[key]["id_filters_generic"].toStrign());


                    if(this.arrIdsCategoriesFiltersGeneric1Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric1Binding = this.arrIdsCategoriesFiltersGeneric1Binding;
                        this.objCategoriesFiltersGeneric1Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            //return obj.filter_index == 101;

                            //for(let countArray = 0; countArray < this.arrIdsCategoriesFiltersGeneric1Binding.length; countArray++)
                            /*for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric1Binding.length; countArray++)
                            {
                                return obj.id == arrIdsCategoriesFiltersGeneric1Binding[countArray];
                            }*/
                            //return obj.id.includes(arrIdsCategoriesFiltersGeneric1Binding);
                            //return this.arrIdsCategoriesFiltersGeneric1Binding.includes(obj.id);
                            return arrIdsCategoriesFiltersGeneric1Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
            {
                this.objIdsCategoriesFiltersGeneric2Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 102;
                });

                if(this.objIdsCategoriesFiltersGeneric2Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric2Binding = Object.keys(this.objIdsCategoriesFiltersGeneric2Binding).map(key => this.objIdsCategoriesFiltersGeneric2Binding[key]["id_filters_generic"]);


                    if(this.arrIdsCategoriesFiltersGeneric2Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric2Binding = this.arrIdsCategoriesFiltersGeneric2Binding;

                        this.objCategoriesFiltersGeneric2Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric2Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableCategoriesFilterGeneric3 != 0)
            {
                this.objIdsCategoriesFiltersGeneric3Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 103;
                });

                if(this.objIdsCategoriesFiltersGeneric3Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric3Binding = Object.keys(this.objIdsCategoriesFiltersGeneric3Binding).map(key => this.objIdsCategoriesFiltersGeneric3Binding[key]["id_filters_generic"]);

                    if(this.arrIdsCategoriesFiltersGeneric3Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric3Binding = this.arrIdsCategoriesFiltersGeneric3Binding;

                        this.objCategoriesFiltersGeneric3Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric3Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric4 != 0)
            {
                this.objIdsCategoriesFiltersGeneric4Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 104;
                });

                if(this.objIdsCategoriesFiltersGeneric4Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric4Binding = Object.keys(this.objIdsCategoriesFiltersGeneric4Binding).map(key => this.objIdsCategoriesFiltersGeneric4Binding[key]["id_filters_generic"]);


                    if(this.arrIdsCategoriesFiltersGeneric4Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric4Binding = this.arrIdsCategoriesFiltersGeneric4Binding;

                        this.objCategoriesFiltersGeneric4Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric4Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric5 != 0)
            {
                this.objIdsCategoriesFiltersGeneric5Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 105;
                });

                if(this.objIdsCategoriesFiltersGeneric5Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric5Binding = Object.keys(this.objIdsCategoriesFiltersGeneric5Binding).map(key => this.objIdsCategoriesFiltersGeneric5Binding[key]["id_filters_generic"]);

                    if(this.arrIdsCategoriesFiltersGeneric5Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric5Binding = this.arrIdsCategoriesFiltersGeneric5Binding;

                        this.objCategoriesFiltersGeneric5Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric5Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric6 != 0)
            {
                this.objIdsCategoriesFiltersGeneric6Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 106;
                });

                if(this.objIdsCategoriesFiltersGeneric6Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric6Binding = Object.keys(this.objIdsCategoriesFiltersGeneric6Binding).map(key => this.objIdsCategoriesFiltersGeneric6Binding[key]["id_filters_generic"]);

                    if(this.arrIdsCategoriesFiltersGeneric6Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric6Binding = this.arrIdsCategoriesFiltersGeneric6Binding;

                        this.objCategoriesFiltersGeneric6Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric6Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric7 != 0)
            {
                this.objIdsCategoriesFiltersGeneric7Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 107;
                });

                if(this.objIdsCategoriesFiltersGeneric7Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric7Binding = Object.keys(this.objIdsCategoriesFiltersGeneric7Binding).map(key => this.objIdsCategoriesFiltersGeneric7Binding[key]["id_filters_generic"]);

                    if(this.arrIdsCategoriesFiltersGeneric7Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric7Binding = this.arrIdsCategoriesFiltersGeneric7Binding;

                        this.objCategoriesFiltersGeneric7Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric7Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric8 != 0)
            {
                this.objIdsCategoriesFiltersGeneric8Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 108;
                });

                if(this.objIdsCategoriesFiltersGeneric8Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric8Binding = Object.keys(this.objIdsCategoriesFiltersGeneric8Binding).map(key => this.objIdsCategoriesFiltersGeneric8Binding[key]["id_filters_generic"]);

                    if(this.arrIdsCategoriesFiltersGeneric8Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric8Binding = this.arrIdsCategoriesFiltersGeneric8Binding;

                        this.objCategoriesFiltersGeneric8Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric8Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric9 != 0)
            {
                this.objIdsCategoriesFiltersGeneric9Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 109;
                });

                if(this.objIdsCategoriesFiltersGeneric9Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric9Binding = Object.keys(this.objIdsCategoriesFiltersGeneric9Binding).map(key => this.objIdsCategoriesFiltersGeneric9Binding[key]["id_filters_generic"]);

                    if(this.arrIdsCategoriesFiltersGeneric9Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric9Binding = this.arrIdsCategoriesFiltersGeneric9Binding;

                        this.objCategoriesFiltersGeneric9Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric9Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableCategoriesFilterGeneric10 != 0)
            {
                this.objIdsCategoriesFiltersGeneric10Binding = this.objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 110;
                });

                if(this.objIdsCategoriesFiltersGeneric10Binding)
                {
                    this.arrIdsCategoriesFiltersGeneric10Binding = Object.keys(this.objIdsCategoriesFiltersGeneric10Binding).map(key => this.objIdsCategoriesFiltersGeneric10Binding[key]["id_filters_generic"]);

                    if(this.arrIdsCategoriesFiltersGeneric10Binding)
                    {
                        var arrIdsCategoriesFiltersGeneric10Binding = this.arrIdsCategoriesFiltersGeneric10Binding;

                        this.objCategoriesFiltersGeneric10Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsCategoriesFiltersGeneric10Binding.includes(obj.id);
                        });
                    }
                }
            }   


            //Debug.                                                                                            
            //console.log("this.objIdsCategoriesFiltersGenericBinding=", this.objIdsCategoriesFiltersGenericBinding);
            //console.log("this.objIdsCategoriesFiltersGeneric1Binding=", this.objIdsCategoriesFiltersGeneric1Binding);
            //console.log("this.arrIdsCategoriesFiltersGeneric1Binding=", this.arrIdsCategoriesFiltersGeneric1Binding);
            //console.log("this.arrIdsCategoriesFiltersGeneric2Binding=", this.arrIdsCategoriesFiltersGeneric2Binding);
            //console.log("this.arrIdsCategoriesFiltersGeneric3Binding=", this.arrIdsCategoriesFiltersGeneric3Binding);
            //console.log("this.arrIdsCategoriesFiltersGenericBinding=", this.arrIdsCategoriesFiltersGenericBinding);
            //console.log("this.arrIdsCategoriesFiltersGenericBinding=", this.arrIdsCategoriesFiltersGenericBinding.includes("125"));
            //console.log("JSON.parse(this.arrIdsCategoriesFiltersGenericBinding)=", JSON.parse(JSON.stringify(this.arrIdsCategoriesFiltersGenericBinding[0])));
            //console.log("this.arrIdsCategoriesFiltersGenericBinding.find=",  this.arrIdsCategoriesFiltersGenericBinding.find(objCategoriesFiltersGenericBinding => objCategoriesFiltersGenericBinding.id_filters_generic == '126'));
            //console.log("this.arrIdsCategoriesFiltersGenericBinding=", Object.keys(this.arrIdsCategoriesFiltersGenericBinding).map(key => this.arrIdsCategoriesFiltersGenericBinding[key].id_filters_generic));


            //Define values.
            //if(this.resultsCategoryDetails[0])
            //{
                //DEV: Create logic to check if record exist.
            //}
            this.tblCategoriesID = this.resultsCategoryDetails[0].id;
            this.tblCategoriesIdParent = this.resultsCategoryDetails[0].id_parent;

            this.tblCategoriesSortOrder = this.resultsCategoryDetails[0].sort_order;
            this.tblCategoriesSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblCategoriesCategoryType = this.resultsCategoryDetails[0].category_type;

            this.tblCategoriesDateCreation = this.resultsCategoryDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            this.tblCategoriesDateTimezone = this.resultsCategoryDetails[0].date_timezone;
            this.tblCategoriesDateEdit = this.resultsCategoryDetails[0].date_edit;

            this.tblCategoriesIdRegisterUser = this.resultsCategoryDetails[0].id_register_user;
            if(this.tblCategoriesIdRegisterUser != 0)
            {
                this.tblCategoriesIdRegisterUser_print = "";
            }
            this.tblCategoriesIdRegister1 = this.resultsCategoryDetails[0].id_register1;
            if(this.tblCategoriesIdRegister1 != 0)
            {
                this.tblCategoriesIdRegister1_print = "";
            }
            this.tblCategoriesIdRegister2 = this.resultsCategoryDetails[0].id_register2;
            if(this.tblCategoriesIdRegister2 != 0)
            {
                this.tblCategoriesIdRegister2_print = "";
            }
            this.tblCategoriesIdRegister3 = this.resultsCategoryDetails[0].id_register3;
            if(this.tblCategoriesIdRegister3 != 0)
            {
                this.tblCategoriesIdRegister3_print = "";
            }
            this.tblCategoriesIdRegister4 = this.resultsCategoryDetails[0].id_register4;
            if(this.tblCategoriesIdRegister4 != 0)
            {
                this.tblCategoriesIdRegister4_print = "";
            }
            this.tblCategoriesIdRegister5 = this.resultsCategoryDetails[0].id_register5;
            if(this.tblCategoriesIdRegister5 != 0)
            {
                this.tblCategoriesIdRegister5_print = "";
            }

            this.tblCategoriesTitle = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].title, "db");
            this.tblCategoriesDescription = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].description, "db");
            this.tblCategoriesDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].description, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            this.tblCategoriesURLAlias = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].url_alias, "db");
            //this.tblCategoriesKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].keywords_tags, "db");
            this.tblCategoriesKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].keywords_tags, "editTextBox=1");
            this.tblCategoriesMetaDescription = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblCategoriesMetaDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblCategoriesMetaTitle = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].meta_title, "db");
            this.tblCategoriesMetaInfo = this.resultsCategoryDetails[0].meta_info;

            if(gSystemConfig.enableCategoriesInfo1 == 1)
            {
                if(gSystemConfig.configCategoriesInfo1FieldType == 1 || gSystemConfig.configCategoriesInfo1FieldType == 2)
                {
                    this.tblCategoriesInfo1 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info1, "db");
                    this.tblCategoriesInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo1FieldType == 11 || gSystemConfig.configCategoriesInfo1FieldType == 12)
                {
                    this.tblCategoriesInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info1, "db"), 2);
                    this.tblCategoriesInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo2 == 1)
            {
                if(gSystemConfig.configCategoriesInfo2FieldType == 1 || gSystemConfig.configCategoriesInfo2FieldType == 2)
                {
                    this.tblCategoriesInfo2 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info2, "db");
                    this.tblCategoriesInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo2FieldType == 11 || gSystemConfig.configCategoriesInfo2FieldType == 12)
                {
                    this.tblCategoriesInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info2, "db"), 2);
                    this.tblCategoriesInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo3 == 1)
            {
                if(gSystemConfig.configCategoriesInfo3FieldType == 1 || gSystemConfig.configCategoriesInfo3FieldType == 2)
                {
                    this.tblCategoriesInfo3 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info3, "db");
                    this.tblCategoriesInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo3FieldType == 11 || gSystemConfig.configCategoriesInfo3FieldType == 12)
                {
                    this.tblCategoriesInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info3, "db"), 2);
                    this.tblCategoriesInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo4 == 1)
            {
                if(gSystemConfig.configCategoriesInfo4FieldType == 1 || gSystemConfig.configCategoriesInfo4FieldType == 2)
                {
                    this.tblCategoriesInfo4 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info4, "db");
                    this.tblCategoriesInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo4FieldType == 11 || gSystemConfig.configCategoriesInfo4FieldType == 12)
                {
                    this.tblCategoriesInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info4, "db"), 2);
                    this.tblCategoriesInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo5 == 1)
            {
                if(gSystemConfig.configCategoriesInfo5FieldType == 1 || gSystemConfig.configCategoriesInfo5FieldType == 2)
                {
                    this.tblCategoriesInfo5 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info5, "db");
                    this.tblCategoriesInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo5FieldType == 11 || gSystemConfig.configCategoriesInfo5FieldType == 12)
                {
                    this.tblCategoriesInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info5, "db"), 2);
                    this.tblCategoriesInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info5, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo6 == 1)
            {
                if(gSystemConfig.configCategoriesInfo6FieldType == 1 || gSystemConfig.configCategoriesInfo6FieldType == 2)
                {
                    this.tblCategoriesInfo6 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info6, "db");
                    this.tblCategoriesInfo6_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info6, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo6FieldType == 11 || gSystemConfig.configCategoriesInfo6FieldType == 12)
                {
                    this.tblCategoriesInfo6 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info6, "db"), 2);
                    this.tblCategoriesInfo6_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info6, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo7 == 1)
            {
                if(gSystemConfig.configCategoriesInfo7FieldType == 1 || gSystemConfig.configCategoriesInfo7FieldType == 2)
                {
                    this.tblCategoriesInfo7 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info7, "db");
                    this.tblCategoriesInfo7_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info7, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo7FieldType == 11 || gSystemConfig.configCategoriesInfo7FieldType == 12)
                {
                    this.tblCategoriesInfo7 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info7, "db"), 2);
                    this.tblCategoriesInfo7_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info7, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo8 == 1)
            {
                if(gSystemConfig.configCategoriesInfo8FieldType == 1 || gSystemConfig.configCategoriesInfo8FieldType == 2)
                {
                    this.tblCategoriesInfo8 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info8, "db");
                    this.tblCategoriesInfo8_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info8, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo8FieldType == 11 || gSystemConfig.configCategoriesInfo8FieldType == 12)
                {
                    this.tblCategoriesInfo8 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info8, "db"), 2);
                    this.tblCategoriesInfo8_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info8, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo9 == 1)
            {
                if(gSystemConfig.configCategoriesInfo9FieldType == 1 || gSystemConfig.configCategoriesInfo9FieldType == 2)
                {
                    this.tblCategoriesInfo9 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info9, "db");
                    this.tblCategoriesInfo9_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info9, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo9FieldType == 11 || gSystemConfig.configCategoriesInfo9FieldType == 12)
                {
                    this.tblCategoriesInfo9 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info9, "db"), 2);
                    this.tblCategoriesInfo9_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info9, "db"), 2);
                }
            }
            if(gSystemConfig.enableCategoriesInfo10 == 1)
            {
                if(gSystemConfig.configCategoriesInfo10FieldType == 1 || gSystemConfig.configCategoriesInfo10FieldType == 2)
                {
                    this.tblCategoriesInfo10 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info10, "db");
                    this.tblCategoriesInfo10_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info10, "db");
                }

                //Encrypted.
                if(gSystemConfig.configCategoriesInfo10FieldType == 11 || gSystemConfig.configCategoriesInfo10FieldType == 12)
                {
                    this.tblCategoriesInfo10 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info10, "db"), 2);
                    this.tblCategoriesInfo10_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info10, "db"), 2);
                }
            }

            this.tblCategoriesInfoSmall1 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small1, "db");
            this.tblCategoriesInfoSmall1_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small1, "db");
            this.tblCategoriesInfoSmall2 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small2, "db");
            this.tblCategoriesInfoSmall2_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small2, "db");
            this.tblCategoriesInfoSmall3 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small3, "db");
            this.tblCategoriesInfoSmall3_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small3, "db");
            this.tblCategoriesInfoSmall4 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small4, "db");
            this.tblCategoriesInfoSmall4_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small4, "db");
            this.tblCategoriesInfoSmall5 = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small5, "db");
            this.tblCategoriesInfoSmall5_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].info_small5, "db");

            this.tblCategoriesNumber1 = this.resultsCategoryDetails[0].number1;
            this.tblCategoriesNumber1_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumber1, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber1FieldType);
            this.tblCategoriesNumber2 = this.resultsCategoryDetails[0].number2;
            this.tblCategoriesNumber2_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumber2, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber2FieldType);
            this.tblCategoriesNumber3 = this.resultsCategoryDetails[0].number3;
            this.tblCategoriesNumber3_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumber3, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber3FieldType);
            this.tblCategoriesNumber4 = this.resultsCategoryDetails[0].number4;
            this.tblCategoriesNumber4_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumber4, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber4FieldType);
            this.tblCategoriesNumber5 = this.resultsCategoryDetails[0].number5;
            this.tblCategoriesNumber5_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumber5, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber5FieldType);

            this.tblCategoriesNumberSmall1 = this.resultsCategoryDetails[0].number_small1;
            this.tblCategoriesNumberSmall1_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumberSmall1, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS1FieldType);
            this.tblCategoriesNumberSmall2 = this.resultsCategoryDetails[0].number_small2;
            this.tblCategoriesNumberSmall2_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumberSmall2, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS2FieldType);
            this.tblCategoriesNumberSmall3 = this.resultsCategoryDetails[0].number_small3;
            this.tblCategoriesNumberSmall3_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumberSmall3, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS3FieldType);
            this.tblCategoriesNumberSmall4 = this.resultsCategoryDetails[0].number_small4;
            this.tblCategoriesNumberSmall4_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumberSmall4, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS4FieldType);
            this.tblCategoriesNumberSmall5 = this.resultsCategoryDetails[0].number_small5;
            this.tblCategoriesNumberSmall5_print = FunctionsGeneric.valueMaskRead(this.tblCategoriesNumberSmall5, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumberS5FieldType);
            
            this.tblCategoriesDate1 = this.resultsCategoryDetails[0].date1;
            if(this.tblCategoriesDate1)
            {
                this.tblCategoriesDate1DateObj = this.tblCategoriesDate1;
                this.tblCategoriesDate1DateYear = this.tblCategoriesDate1DateObj.getFullYear();
                this.tblCategoriesDate1DateDay = this.tblCategoriesDate1DateObj.getDate();
                this.tblCategoriesDate1DateMonth = (this.tblCategoriesDate1DateObj.getMonth() + 1);
            
                this.tblCategoriesDate1DateHour = this.tblCategoriesDate1DateObj.getHours();
                this.tblCategoriesDate1DateHour_print = ("0" + this.tblCategoriesDate1DateObj.getHours()).slice(-2);

                this.tblCategoriesDate1DateMinute = this.tblCategoriesDate1DateObj.getMinutes();
                this.tblCategoriesDate1DateMinute_print = ("0" + this.tblCategoriesDate1DateObj.getMinutes()).slice(-2);

                this.tblCategoriesDate1DateSecond = this.tblCategoriesDate1DateObj.getSeconds();
                this.tblCategoriesDate1DateSecond_print = ("0" + this.tblCategoriesDate1DateObj.getSeconds()).slice(-2);

                //this.tblCategoriesDate1_print = this.tblCategoriesDate1;
                this.tblCategoriesDate1_print = FunctionsGeneric.dateRead01(this.tblCategoriesDate1, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configCategoriesDate1Type);
            }

            this.tblCategoriesDate2 = this.resultsCategoryDetails[0].date2;
            if(this.tblCategoriesDate2)
            {
                this.tblCategoriesDate2DateObj = this.tblCategoriesDate2;
                this.tblCategoriesDate2DateYear = this.tblCategoriesDate2DateObj.getFullYear();
                this.tblCategoriesDate2DateDay = this.tblCategoriesDate2DateObj.getDate();
                this.tblCategoriesDate2DateMonth = (this.tblCategoriesDate2DateObj.getMonth() + 1);
            
                this.tblCategoriesDate2DateHour = this.tblCategoriesDate2DateObj.getHours();
                this.tblCategoriesDate2DateHour_print = ("0" + this.tblCategoriesDate2DateObj.getHours()).slice(-2);

                this.tblCategoriesDate2DateMinute = this.tblCategoriesDate2DateObj.getMinutes();
                this.tblCategoriesDate2DateMinute_print = ("0" + this.tblCategoriesDate2DateObj.getMinutes()).slice(-2);

                this.tblCategoriesDate2DateSecond = this.tblCategoriesDate2DateObj.getSeconds();
                this.tblCategoriesDate2DateSecond_print = ("0" + this.tblCategoriesDate2DateObj.getSeconds()).slice(-2);

                this.tblCategoriesDate2_print = FunctionsGeneric.dateRead01(this.tblCategoriesDate2, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configCategoriesDate2Type);
            }

            this.tblCategoriesDate3 = this.resultsCategoryDetails[0].date3;
            if(this.tblCategoriesDate3)
            {
                this.tblCategoriesDate3DateObj = this.tblCategoriesDate3;
                this.tblCategoriesDate3DateYear = this.tblCategoriesDate3DateObj.getFullYear();
                this.tblCategoriesDate3DateDay = this.tblCategoriesDate3DateObj.getDate();
                this.tblCategoriesDate3DateMonth = (this.tblCategoriesDate3DateObj.getMonth() + 1);
            
                this.tblCategoriesDate3DateHour = this.tblCategoriesDate3DateObj.getHours();
                this.tblCategoriesDate3DateHour_print = ("0" + this.tblCategoriesDate3DateObj.getHours()).slice(-2);

                this.tblCategoriesDate3DateMinute = this.tblCategoriesDate3DateObj.getMinutes();
                this.tblCategoriesDate3DateMinute_print = ("0" + this.tblCategoriesDate3DateObj.getMinutes()).slice(-2);

                this.tblCategoriesDate3DateSecond = this.tblCategoriesDate3DateObj.getSeconds();
                this.tblCategoriesDate3DateSecond_print = ("0" + this.tblCategoriesDate3DateObj.getSeconds()).slice(-2);

                this.tblCategoriesDate3_print = FunctionsGeneric.dateRead01(this.tblCategoriesDate3, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configCategoriesDate3Type);
            }

            this.tblCategoriesDate4 = this.resultsCategoryDetails[0].date4;
            if(this.tblCategoriesDate4)
            {
                this.tblCategoriesDate4DateObj = this.tblCategoriesDate4;
                this.tblCategoriesDate4DateYear = this.tblCategoriesDate4DateObj.getFullYear();
                this.tblCategoriesDate4DateDay = this.tblCategoriesDate4DateObj.getDate();
                this.tblCategoriesDate4DateMonth = (this.tblCategoriesDate4DateObj.getMonth() + 1);
            
                this.tblCategoriesDate4DateHour = this.tblCategoriesDate4DateObj.getHours();
                this.tblCategoriesDate4DateHour_print = ("0" + this.tblCategoriesDate4DateObj.getHours()).slice(-2);

                this.tblCategoriesDate4DateMinute = this.tblCategoriesDate4DateObj.getMinutes();
                this.tblCategoriesDate4DateMinute_print = ("0" + this.tblCategoriesDate4DateObj.getMinutes()).slice(-2);

                this.tblCategoriesDate4DateSecond = this.tblCategoriesDate4DateObj.getSeconds();
                this.tblCategoriesDate4DateSecond_print = ("0" + this.tblCategoriesDate4DateObj.getSeconds()).slice(-2);

                this.tblCategoriesDate4_print = FunctionsGeneric.dateRead01(this.tblCategoriesDate4, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configCategoriesDate4Type);
            }

            this.tblCategoriesDate5 = this.resultsCategoryDetails[0].date5;
            if(this.tblCategoriesDate5)
            {
                this.tblCategoriesDate5DateObj = this.tblCategoriesDate5;
                this.tblCategoriesDate5DateYear = this.tblCategoriesDate5DateObj.getFullYear();
                this.tblCategoriesDate5DateDay = this.tblCategoriesDate5DateObj.getDate();
                this.tblCategoriesDate5DateMonth = (this.tblCategoriesDate5DateObj.getMonth() + 1);
            
                this.tblCategoriesDate5DateHour = this.tblCategoriesDate5DateObj.getHours();
                this.tblCategoriesDate5DateHour_print = ("0" + this.tblCategoriesDate5DateObj.getHours()).slice(-2);

                this.tblCategoriesDate5DateMinute = this.tblCategoriesDate5DateObj.getMinutes();
                this.tblCategoriesDate5DateMinute_print = ("0" + this.tblCategoriesDate5DateObj.getMinutes()).slice(-2);

                this.tblCategoriesDate5DateSecond = this.tblCategoriesDate5DateObj.getSeconds();
                this.tblCategoriesDate5DateSecond_print = ("0" + this.tblCategoriesDate5DateObj.getSeconds()).slice(-2);

                this.tblCategoriesDate5_print = FunctionsGeneric.dateRead01(this.tblCategoriesDate5, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configCategoriesDate5Type);
            }
            
            this.tblCategoriesIdItem1 = this.resultsCategoryDetails[0].id_item1;
            this.tblCategoriesIdItem2 = this.resultsCategoryDetails[0].id_item2;
            this.tblCategoriesIdItem3 = this.resultsCategoryDetails[0].id_item3;
            this.tblCategoriesIdItem4 = this.resultsCategoryDetails[0].id_item4;
            this.tblCategoriesIdItem5 = this.resultsCategoryDetails[0].id_item5;

            this.tblCategoriesImageMain = this.resultsCategoryDetails[0].image_main;
            this.tblCategoriesFile1 = this.resultsCategoryDetails[0].file1;
            this.tblCategoriesFile2 = this.resultsCategoryDetails[0].file2;
            this.tblCategoriesFile3 = this.resultsCategoryDetails[0].file3;
            this.tblCategoriesFile4 = this.resultsCategoryDetails[0].file4;
            this.tblCategoriesFile5 = this.resultsCategoryDetails[0].file5;

            this.tblCategoriesActivation = this.resultsCategoryDetails[0].activation;
            if(this.tblCategoriesActivation == 0)
            {
                this.tblCategoriesActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblCategoriesActivation == 1)
            {
                this.tblCategoriesActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblCategoriesActivation1 = this.resultsCategoryDetails[0].activation1;
            if(this.tblCategoriesActivation1 == 0)
            {
                this.tblCategoriesActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblCategoriesActivation1 == 1)
            {
                this.tblCategoriesActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblCategoriesActivation2 = this.resultsCategoryDetails[0].activation2;
            if(this.tblCategoriesActivation2 == 0)
            {
                this.tblCategoriesActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblCategoriesActivation2 == 1)
            {
                this.tblCategoriesActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblCategoriesActivation3 = this.resultsCategoryDetails[0].activation3;
            if(this.tblCategoriesActivation3 == 0)
            {
                this.tblCategoriesActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblCategoriesActivation3 == 1)
            {
                this.tblCategoriesActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblCategoriesActivation4 = this.resultsCategoryDetails[0].activation4;
            if(this.tblCategoriesActivation4 == 0)
            {
                this.tblCategoriesActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblCategoriesActivation4 == 1)
            {
                this.tblCategoriesActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblCategoriesActivation5 = this.resultsCategoryDetails[0].activation5;
            if(this.tblCategoriesActivation5 == 0)
            {
                this.tblCategoriesActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblCategoriesActivation5 == 1)
            {
                this.tblCategoriesActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblCategoriesIdStatus = this.resultsCategoryDetails[0].id_status;
            if(this.tblCategoriesIdStatus == 0)
            {
                this.tblCategoriesIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblCategoriesIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblCategoriesIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }

            this.tblCategoriesRestrictedAccess = this.resultsCategoryDetails[0].restricted_access;
            if(this.tblCategoriesRestrictedAccess == 0)
            {
                this.tblCategoriesRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess0");
            }
            if(this.tblCategoriesRestrictedAccess == 1)
            {
                this.tblCategoriesRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess1");
            }

            this.tblCategoriesNotes = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].notes, "db");
            this.tblCategoriesNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsCategoryDetails[0].notes, "db");
    
            //this.arrIdsCategoriesFiltersGeneric1 = [];
            //this.arrIdsCategoriesFiltersGeneric2 = [];
            //this.arrIdsCategoriesFiltersGeneric3 = [];
            //this.arrIdsCategoriesFiltersGeneric4 = [];
            //this.arrIdsCategoriesFiltersGeneric5 = [];
            //this.arrIdsCategoriesFiltersGeneric6 = [];
            //this.arrIdsCategoriesFiltersGeneric7 = [];
            //this.arrIdsCategoriesFiltersGeneric8 = [];
            //this.arrIdsCategoriesFiltersGeneric9 = [];
            //this.arrIdsCategoriesFiltersGeneric10 = [];
                
            //Debug.
            //console.log("this.arrSearchParameters=", this.arrSearchParameters)
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(asyncError)
            }
        }finally{

        }
        

        /*
        return FunctionsDB.genericTableGet02("categories", 
                                            ["id_parent;0;i", "activation;1;i"], 
                                            gSystemConfig.configCategoriesSort, 
                                            "5", 
                                            "id, id_parent, sort_order, category_type, date_creation, title, activation", 
                                            1, 
                                            {}).then(function(async_result){
                                                return new ObjectCategoriesListing(async_result);
                                            });

        */
        //return new ObjectCategoriesListing();

        //return "teste2"


                                            
    }
    //**************************************************************************************


    //Usage.
    //----------------------
    /*
    this.arrSearchParameters = [];
    this.ocdRecord = "";
    this.ocdRecordParameters = {
        _arrSearchParameters: this.arrSearchParameters,
        _idTbCategories: this._idTbCategories,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.ocdRecord = new SyncSystemNS.ObjectFormsFieldsDetails(this.ocdRecordParameters);
    await this.ocdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};