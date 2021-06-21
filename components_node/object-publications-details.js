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


module.exports = class ObjectPublicationsDetails
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
        this.idTbPublications = (objParameters.hasOwnProperty("_idTbPublications")) ? objParameters._idTbPublications : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsPublicationsDetails = "";

        this.tblPublicationsID = "";
        this.tblPublicationsIdParent = "";
        this.tblPublicationsSortOrder = 0;
        this.tblPublicationsSortOrder_print = "";
        this.tblPublicationsIdType = 0; 
        this.tblPublicationsIdType_print = ""; 
    
        this.tblPublicationsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //this.tblPublicationsDateTimezone = "";
        this.tblPublicationsDateEdit = "";

        this.tblPublicationsIdRegisterUser = 0;
        this.tblPublicationsIdRegister1 = 0;
        this.tblPublicationsIdRegister2 = 0;
        this.tblPublicationsIdRegister3 = 0;
        this.tblPublicationsIdRegister4 = 0;
        this.tblPublicationsIdRegister5 = 0;

        this.tblPublicationsDateStart = null;
        this.tblPublicationsDateStart_print = "";
        this.tblPublicationsDateStartDateObj = new Date();
        this.tblPublicationsDateStartDateYear, this.tblPublicationsDateStartDateDay, this.tblPublicationsDateStartDateMonth;
        this.tblPublicationsDateStartDateHour, this.tblPublicationsDateStartDateHour_print, this.tblPublicationsDateStartDateMinute, this.tblPublicationsDateStartDateMinute_print, this.tblPublicationsDateStartDateSecond, this.tblPublicationsDateStartDateSecond_print;
            
        this.tblPublicationsDateEnd = null;
        this.tblPublicationsDateEnd_print = "";
        this.tblPublicationsDateEndDateObj = new Date();
        this.tblPublicationsDateEndDateYear, this.tblPublicationsDateEndDateDay, this.tblPublicationsDateEndDateMonth;
        this.tblPublicationsDateEndDateHour, this.tblPublicationsDateEndDateHour_print, this.tblPublicationsDateEndDateMinute, this.tblPublicationsDateEndDateMinute_print, this.tblPublicationsDateEndDateSecond, this.tblPublicationsDateEndDateSecond_print;
        
        this.tblPublicationsTitle = "";
        this.tblPublicationsDescription = "";
        this.tblPublicationsDescription_edit = "";
    
        this.tblPublicationsURLAlias = "";
        this.tblPublicationsKeywordsTags = "";
        this.tblPublicationsMetaDescription = "";
        this.tblPublicationsMetaDescription_edit = "";
        this.tblPublicationsMetaTitle = "";
        this.tblPublicationsMetaInfo = "";

        this.tblPublicationsInfo1 = "";
        this.tblPublicationsInfo1_edit = "";
        this.tblPublicationsInfo2 = "";
        this.tblPublicationsInfo2_edit = "";
        this.tblPublicationsInfo3 = "";
        this.tblPublicationsInfo3_edit = "";
        this.tblPublicationsInfo4 = "";
        this.tblPublicationsInfo4_edit = "";
        this.tblPublicationsInfo5 = "";
        this.tblPublicationsInfo5_edit = "";
        this.tblPublicationsInfo6 = "";
        this.tblPublicationsInfo6_edit = "";
        this.tblPublicationsInfo7 = "";
        this.tblPublicationsInfo7_edit = "";
        this.tblPublicationsInfo8 = "";
        this.tblPublicationsInfo8_edit = "";
        this.tblPublicationsInfo9 = "";
        this.tblPublicationsInfo9_edit = "";
        this.tblPublicationsInfo10 = "";
        this.tblPublicationsInfo10_edit = "";

        this.tblPublicationsSource = "";
        this.tblPublicationsSourceURL = "";
        this.tblPublicationsSourceURL_edit = "";

        this.tblPublicationsNumber1 = 0;
        this.tblPublicationsNumber1_print = "";
        this.tblPublicationsNumber2 = 0;
        this.tblPublicationsNumber2_print = "";
        this.tblPublicationsNumber3 = 0;
        this.tblPublicationsNumber3_print = "";
        this.tblPublicationsNumber4 = 0;
        this.tblPublicationsNumber4_print = "";
        this.tblPublicationsNumber5 = 0;
        this.tblPublicationsNumber5_print = "";
    
        this.tblPublicationsURL1 = "";
        this.tblPublicationsURL1_edit = "";
        this.tblPublicationsURL2 = "";
        this.tblPublicationsURL2_edit = "";
        this.tblPublicationsURL3 = "";
        this.tblPublicationsURL3_edit = "";
        this.tblPublicationsURL4 = "";
        this.tblPublicationsURL4_edit = "";
        this.tblPublicationsURL5 = "";
        this.tblPublicationsURL5_edit = "";
    
        this.tblPublicationsDate1 = null;
        this.tblPublicationsDate1_print = "";
        this.tblPublicationsDate1DateObj = new Date();
        this.tblPublicationsDate1DateYear, this.tblPublicationsDate1DateDay, this.tblPublicationsDate1DateMonth;
        this.tblPublicationsDate1DateHour, this.tblPublicationsDate1DateHour_print, this.tblPublicationsDate1DateMinute, this.tblPublicationsDate1DateMinute_print, this.tblPublicationsDate1DateSecond, this.tblPublicationsDate1DateSecond_print;

        this.tblPublicationsDate2 = null;
        this.tblPublicationsDate2_print = "";
        this.tblPublicationsDate2DateObj = new Date();
        this.tblPublicationsDate2DateYear, this.tblPublicationsDate2DateDay, this.tblPublicationsDate2DateMonth;
        this.tblPublicationsDate2DateHour, this.tblPublicationsDate2DateHour_print, this.tblPublicationsDate2DateMinute, this.tblPublicationsDate2DateMinute_print, this.tblPublicationsDate2DateSecond, this.tblPublicationsDate2DateSecond_print;

        this.tblPublicationsDate3 = null;
        this.tblPublicationsDate3_print = "";
        this.tblPublicationsDate3DateObj = new Date();
        this.tblPublicationsDate3DateYear, this.tblPublicationsDate3DateDay, this.tblPublicationsDate3DateMonth;
        this.tblPublicationsDate3DateHour, this.tblPublicationsDate3DateHour_print, this.tblPublicationsDate3DateMinute, this.tblPublicationsDate3DateMinute_print, this.tblPublicationsDate3DateSecond, this.tblPublicationsDate3DateSecond_print;

        this.tblPublicationsDate4 = null;
        this.tblPublicationsDate4_print = "";
        this.tblPublicationsDate4DateObj = new Date();
        this.tblPublicationsDate4DateYear, this.tblPublicationsDate4DateDay, this.tblPublicationsDate4DateMonth;
        this.tblPublicationsDate4DateHour, this.tblPublicationsDate4DateHour_print, this.tblPublicationsDate4DateMinute, this.tblPublicationsDate4DateMinute_print, this.tblPublicationsDate4DateSecond, this.tblPublicationsDate4DateSecond_print;

        this.tblPublicationsDate5 = null;
        this.tblPublicationsDate5_print = "";
        this.tblPublicationsDate5DateObj = new Date();
        this.tblPublicationsDate5DateYear, this.tblPublicationsDate5DateDay, this.tblPublicationsDate5DateMonth;
        this.tblPublicationsDate5DateHour, this.tblPublicationsDate5DateHour_print, this.tblPublicationsDate5DateMinute, this.tblPublicationsDate5DateMinute_print, this.tblPublicationsDate5DateSecond, this.tblPublicationsDate5DateSecond_print;

        this.tblPublicationsImageMain = "";
        this.tblPublicationsImageMainCaption = "";
        
        this.tblPublicationsFile1 = "";
        this.tblPublicationsFile2 = "";
        this.tblPublicationsFile3 = "";
        this.tblPublicationsFile4 = "";
        this.tblPublicationsFile5 = "";

        this.tblPublicationsActivation = 1;
        this.tblPublicationsActivation_print = "";
        this.tblPublicationsActivation1 = 0;
        this.tblPublicationsActivation1_print = "";
        this.tblPublicationsActivation2 = 0;
        this.tblPublicationsActivation2_print = "";
        this.tblPublicationsActivation3 = 0;
        this.tblPublicationsActivation3_print = "";
        this.tblPublicationsActivation4 = 0;
        this.tblPublicationsActivation4_print = "";
        this.tblPublicationsActivation5 = 0;
        this.tblPublicationsActivation5_print = "";

        this.tblPublicationsIdStatus = 0;
        this.tblPublicationsIdStatus_print = "";

        this.tblPublicationsRestrictedAccess = 0;
        this.tblPublicationsRestrictedAccess_print = "";

        this.tblPublicationsNotes = "";
        this.tblPublicationsNotes_edit = "";

        this.ofglRecords;

        this.arrIdsPublicationsFiltersGeneric1 = [];
        this.arrIdsPublicationsFiltersGeneric2 = [];
        this.arrIdsPublicationsFiltersGeneric3 = [];
        this.arrIdsPublicationsFiltersGeneric4 = [];
        this.arrIdsPublicationsFiltersGeneric5 = [];
        this.arrIdsPublicationsFiltersGeneric6 = [];
        this.arrIdsPublicationsFiltersGeneric7 = [];
        this.arrIdsPublicationsFiltersGeneric8 = [];
        this.arrIdsPublicationsFiltersGeneric9 = [];
        this.arrIdsPublicationsFiltersGeneric10 = [];

        this.objIdsPublicationsFiltersGenericBinding;

        this.objIdsPublicationsFiltersGeneric1Binding;
        this.objIdsPublicationsFiltersGeneric2Binding;
        this.objIdsPublicationsFiltersGeneric3Binding;
        this.objIdsPublicationsFiltersGeneric4Binding;
        this.objIdsPublicationsFiltersGeneric5Binding;
        this.objIdsPublicationsFiltersGeneric6Binding;
        this.objIdsPublicationsFiltersGeneric7Binding;
        this.objIdsPublicationsFiltersGeneric8Binding;
        this.objIdsPublicationsFiltersGeneric9Binding;
        this.objIdsPublicationsFiltersGeneric10Binding;

        this.objPublicationsFiltersGeneric1Binding_print;
        this.objPublicationsFiltersGeneric2Binding_print;
        this.objPublicationsFiltersGeneric3Binding_print;
        this.objPublicationsFiltersGeneric4Binding_print;
        this.objPublicationsFiltersGeneric5Binding_print;
        this.objPublicationsFiltersGeneric6Binding_print;
        this.objPublicationsFiltersGeneric7Binding_print;
        this.objPublicationsFiltersGeneric8Binding_print;
        this.objPublicationsFiltersGeneric9Binding_print;
        this.objPublicationsFiltersGeneric10Binding_print;

        this.arrIdsPublicationsFiltersGeneric1Binding = [];
        this.arrIdsPublicationsFiltersGeneric2Binding = [];
        this.arrIdsPublicationsFiltersGeneric3Binding = [];
        this.arrIdsPublicationsFiltersGeneric4Binding = [];
        this.arrIdsPublicationsFiltersGeneric5Binding = [];
        this.arrIdsPublicationsFiltersGeneric6Binding = [];
        this.arrIdsPublicationsFiltersGeneric7Binding = [];
        this.arrIdsPublicationsFiltersGeneric8Binding = [];
        this.arrIdsPublicationsFiltersGeneric9Binding = [];
        this.arrIdsPublicationsFiltersGeneric10Binding = [];
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectPublicationsDetails();
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
            this.resultsPublicationsDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTablePublications, 
                                                                                this.arrSearchParameters, 
                                                                                "", 
                                                                                "", 
                                                                                FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTablePublications, "all", "string"), 
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
            this.objIdsPublicationsFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_record;" + this.idTbPublications + ";i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                            1, 
                                                                                            {returnType: 3});

            //Filters generic - separation.                                                                                
            if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
            {
                this.objIdsPublicationsFiltersGeneric1Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 101;
                });

                if(this.objIdsPublicationsFiltersGeneric1Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric1Binding = Object.keys(this.objIdsPublicationsFiltersGeneric1Binding).map(key => this.objIdsPublicationsFiltersGeneric1Binding[key]["id_filters_generic"]);
                    //this.arrIdsPublicationsFiltersGeneric1Binding = Object.keys(this.objIdsPublicationsFiltersGeneric1Binding).map(key => this.objIdsPublicationsFiltersGeneric1Binding[key]["id_filters_generic"].toStrign());


                    if(this.arrIdsPublicationsFiltersGeneric1Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric1Binding = this.arrIdsPublicationsFiltersGeneric1Binding;
                        this.objPublicationsFiltersGeneric1Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            //return obj.filter_index == 101;

                            //for(let countArray = 0; countArray < this.arrIdsPublicationsFiltersGeneric1Binding.length; countArray++)
                            /*for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric1Binding.length; countArray++)
                            {
                                return obj.id == arrIdsPublicationsFiltersGeneric1Binding[countArray];
                            }*/
                            //return obj.id.includes(arrIdsPublicationsFiltersGeneric1Binding);
                            //return this.arrIdsPublicationsFiltersGeneric1Binding.includes(obj.id);
                            return arrIdsPublicationsFiltersGeneric1Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
            {
                this.objIdsPublicationsFiltersGeneric2Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 102;
                });

                if(this.objIdsPublicationsFiltersGeneric2Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric2Binding = Object.keys(this.objIdsPublicationsFiltersGeneric2Binding).map(key => this.objIdsPublicationsFiltersGeneric2Binding[key]["id_filters_generic"]);


                    if(this.arrIdsPublicationsFiltersGeneric2Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric2Binding = this.arrIdsPublicationsFiltersGeneric2Binding;

                        this.objPublicationsFiltersGeneric2Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric2Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enablePublicationsFilterGeneric3 != 0)
            {
                this.objIdsPublicationsFiltersGeneric3Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 103;
                });

                if(this.objIdsPublicationsFiltersGeneric3Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric3Binding = Object.keys(this.objIdsPublicationsFiltersGeneric3Binding).map(key => this.objIdsPublicationsFiltersGeneric3Binding[key]["id_filters_generic"]);

                    if(this.arrIdsPublicationsFiltersGeneric3Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric3Binding = this.arrIdsPublicationsFiltersGeneric3Binding;

                        this.objPublicationsFiltersGeneric3Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric3Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric4 != 0)
            {
                this.objIdsPublicationsFiltersGeneric4Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 104;
                });

                if(this.objIdsPublicationsFiltersGeneric4Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric4Binding = Object.keys(this.objIdsPublicationsFiltersGeneric4Binding).map(key => this.objIdsPublicationsFiltersGeneric4Binding[key]["id_filters_generic"]);


                    if(this.arrIdsPublicationsFiltersGeneric4Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric4Binding = this.arrIdsPublicationsFiltersGeneric4Binding;

                        this.objPublicationsFiltersGeneric4Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric4Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric5 != 0)
            {
                this.objIdsPublicationsFiltersGeneric5Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 105;
                });

                if(this.objIdsPublicationsFiltersGeneric5Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric5Binding = Object.keys(this.objIdsPublicationsFiltersGeneric5Binding).map(key => this.objIdsPublicationsFiltersGeneric5Binding[key]["id_filters_generic"]);

                    if(this.arrIdsPublicationsFiltersGeneric5Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric5Binding = this.arrIdsPublicationsFiltersGeneric5Binding;

                        this.objPublicationsFiltersGeneric5Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric5Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric6 != 0)
            {
                this.objIdsPublicationsFiltersGeneric6Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 106;
                });

                if(this.objIdsPublicationsFiltersGeneric6Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric6Binding = Object.keys(this.objIdsPublicationsFiltersGeneric6Binding).map(key => this.objIdsPublicationsFiltersGeneric6Binding[key]["id_filters_generic"]);

                    if(this.arrIdsPublicationsFiltersGeneric6Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric6Binding = this.arrIdsPublicationsFiltersGeneric6Binding;

                        this.objPublicationsFiltersGeneric6Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric6Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric7 != 0)
            {
                this.objIdsPublicationsFiltersGeneric7Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 107;
                });

                if(this.objIdsPublicationsFiltersGeneric7Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric7Binding = Object.keys(this.objIdsPublicationsFiltersGeneric7Binding).map(key => this.objIdsPublicationsFiltersGeneric7Binding[key]["id_filters_generic"]);

                    if(this.arrIdsPublicationsFiltersGeneric7Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric7Binding = this.arrIdsPublicationsFiltersGeneric7Binding;

                        this.objPublicationsFiltersGeneric7Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric7Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric8 != 0)
            {
                this.objIdsPublicationsFiltersGeneric8Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 108;
                });

                if(this.objIdsPublicationsFiltersGeneric8Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric8Binding = Object.keys(this.objIdsPublicationsFiltersGeneric8Binding).map(key => this.objIdsPublicationsFiltersGeneric8Binding[key]["id_filters_generic"]);

                    if(this.arrIdsPublicationsFiltersGeneric8Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric8Binding = this.arrIdsPublicationsFiltersGeneric8Binding;

                        this.objPublicationsFiltersGeneric8Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric8Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric9 != 0)
            {
                this.objIdsPublicationsFiltersGeneric9Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 109;
                });

                if(this.objIdsPublicationsFiltersGeneric9Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric9Binding = Object.keys(this.objIdsPublicationsFiltersGeneric9Binding).map(key => this.objIdsPublicationsFiltersGeneric9Binding[key]["id_filters_generic"]);

                    if(this.arrIdsPublicationsFiltersGeneric9Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric9Binding = this.arrIdsPublicationsFiltersGeneric9Binding;

                        this.objPublicationsFiltersGeneric9Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric9Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enablePublicationsFilterGeneric10 != 0)
            {
                this.objIdsPublicationsFiltersGeneric10Binding = this.objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 110;
                });

                if(this.objIdsPublicationsFiltersGeneric10Binding)
                {
                    this.arrIdsPublicationsFiltersGeneric10Binding = Object.keys(this.objIdsPublicationsFiltersGeneric10Binding).map(key => this.objIdsPublicationsFiltersGeneric10Binding[key]["id_filters_generic"]);

                    if(this.arrIdsPublicationsFiltersGeneric10Binding)
                    {
                        var arrIdsPublicationsFiltersGeneric10Binding = this.arrIdsPublicationsFiltersGeneric10Binding;

                        this.objPublicationsFiltersGeneric10Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsPublicationsFiltersGeneric10Binding.includes(obj.id);
                        });
                    }
                }
            }   


            //Debug.                                                                                            
            //console.log("this.objIdsPublicationsFiltersGenericBinding=", this.objIdsPublicationsFiltersGenericBinding);
            //console.log("this.objIdsPublicationsFiltersGeneric1Binding=", this.objIdsPublicationsFiltersGeneric1Binding);
            //console.log("this.arrIdsPublicationsFiltersGeneric1Binding=", this.arrIdsPublicationsFiltersGeneric1Binding);
            //console.log("this.arrIdsPublicationsFiltersGeneric2Binding=", this.arrIdsPublicationsFiltersGeneric2Binding);
            //console.log("this.arrIdsPublicationsFiltersGeneric3Binding=", this.arrIdsPublicationsFiltersGeneric3Binding);
            //console.log("this.arrIdsPublicationsFiltersGenericBinding=", this.arrIdsPublicationsFiltersGenericBinding);
            //console.log("this.arrIdsPublicationsFiltersGenericBinding=", this.arrIdsPublicationsFiltersGenericBinding.includes("125"));
            //console.log("JSON.parse(this.arrIdsPublicationsFiltersGenericBinding)=", JSON.parse(JSON.stringify(this.arrIdsPublicationsFiltersGenericBinding[0])));
            //console.log("this.arrIdsPublicationsFiltersGenericBinding.find=",  this.arrIdsPublicationsFiltersGenericBinding.find(objPublicationsFiltersGenericBinding => objPublicationsFiltersGenericBinding.id_filters_generic == '126'));
            //console.log("this.arrIdsPublicationsFiltersGenericBinding=", Object.keys(this.arrIdsPublicationsFiltersGenericBinding).map(key => this.arrIdsPublicationsFiltersGenericBinding[key].id_filters_generic));


            //Define values.
            //if(this.resultsPublicationsDetails[0])
            //{
                //DEV: Create logic to check if record exist.
            //}
            this.tblPublicationsID = this.resultsPublicationsDetails[0].id;
            this.tblPublicationsIdParent = this.resultsPublicationsDetails[0].id_parent;

            this.tblPublicationsSortOrder = this.resultsPublicationsDetails[0].sort_order;
            this.tblPublicationsSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblPublicationsSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblPublicationsIdType = this.resultsPublicationsDetails[0].id_type;
            switch(this.tblPublicationsIdType)
            {
                case 1:
                    this.tblPublicationsIdType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "PublicationsType1");
                    break;
                case 2:
                    this.tblPublicationsIdType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "PublicationsType2");
                    break;
                case 3:
                    this.tblPublicationsIdType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "PublicationsType3");
                    break;
                case 4:
                    this.tblPublicationsIdType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "PublicationsType4");
                    break;
            }

            this.tblPublicationsDateCreation = this.resultsPublicationsDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            //this.tblPublicationsDateTimezone = this.resultsPublicationsDetails[0].date_timezone;
            this.tblPublicationsDateEdit = this.resultsPublicationsDetails[0].date_edit;

            this.tblPublicationsIdRegisterUser = this.resultsPublicationsDetails[0].id_register_user;
            if(this.tblPublicationsIdRegisterUser != 0)
            {
                this.tblPublicationsIdRegisterUser_print = "";
            }
            this.tblPublicationsIdRegister1 = this.resultsPublicationsDetails[0].id_register1;
            if(this.tblPublicationsIdRegister1 != 0)
            {
                this.tblPublicationsIdRegister1_print = "";
            }
            this.tblPublicationsIdRegister2 = this.resultsPublicationsDetails[0].id_register2;
            if(this.tblPublicationsIdRegister2 != 0)
            {
                this.tblPublicationsIdRegister2_print = "";
            }
            this.tblPublicationsIdRegister3 = this.resultsPublicationsDetails[0].id_register3;
            if(this.tblPublicationsIdRegister3 != 0)
            {
                this.tblPublicationsIdRegister3_print = "";
            }
            this.tblPublicationsIdRegister4 = this.resultsPublicationsDetails[0].id_register4;
            if(this.tblPublicationsIdRegister4 != 0)
            {
                this.tblPublicationsIdRegister4_print = "";
            }
            this.tblPublicationsIdRegister5 = this.resultsPublicationsDetails[0].id_register5;
            if(this.tblPublicationsIdRegister5 != 0)
            {
                this.tblPublicationsIdRegister5_print = "";
            }

            this.tblPublicationsDateStart = this.resultsPublicationsDetails[0].date_start;
            if(this.tblPublicationsDateStart)
            {
                this.tblPublicationsDateStartDateObj = this.tblPublicationsDateStart;
                this.tblPublicationsDateStartDateYear = this.tblPublicationsDateStartDateObj.getFullYear();
                this.tblPublicationsDateStartDateDay = this.tblPublicationsDateStartDateObj.getDate();
                this.tblPublicationsDateStartDateMonth = (this.tblPublicationsDateStartDateObj.getMonth() + 1);
            
                this.tblPublicationsDateStartDateHour = this.tblPublicationsDateStartDateObj.getHours();
                this.tblPublicationsDateStartDateHour_print = ("0" + this.tblPublicationsDateStartDateObj.getHours()).slice(-2);

                this.tblPublicationsDateStartDateMinute = this.tblPublicationsDateStartDateObj.getMinutes();
                this.tblPublicationsDateStartDateMinute_print = ("0" + this.tblPublicationsDateStartDateObj.getMinutes()).slice(-2);

                this.tblPublicationsDateStartDateSecond = this.tblPublicationsDateStartDateObj.getSeconds();
                this.tblPublicationsDateStartDateSecond_print = ("0" + this.tblPublicationsDateStartDateObj.getSeconds()).slice(-2);

                //this.tblPublicationsDateStart_print = this.tblPublicationsDateStart;
                this.tblPublicationsDateStart_print = FunctionsGeneric.dateRead01(this.tblPublicationsDateStart, 
                                                                                    gSystemConfig.configBackendDateFormat, 
                                                                                    0, 
                                                                                    gSystemConfig.configPublicationsDateStartType);
            }

            this.tblPublicationsDateEnd = this.resultsPublicationsDetails[0].date_end;
            if(this.tblPublicationsDateEnd)
            {
                this.tblPublicationsDateEndDateObj = this.tblPublicationsDateEnd;
                this.tblPublicationsDateEndDateYear = this.tblPublicationsDateEndDateObj.getFullYear();
                this.tblPublicationsDateEndDateDay = this.tblPublicationsDateEndDateObj.getDate();
                this.tblPublicationsDateEndDateMonth = (this.tblPublicationsDateEndDateObj.getMonth() + 1);
            
                this.tblPublicationsDateEndDateHour = this.tblPublicationsDateEndDateObj.getHours();
                this.tblPublicationsDateEndDateHour_print = ("0" + this.tblPublicationsDateEndDateObj.getHours()).slice(-2);

                this.tblPublicationsDateEndDateMinute = this.tblPublicationsDateEndDateObj.getMinutes();
                this.tblPublicationsDateEndDateMinute_print = ("0" + this.tblPublicationsDateEndDateObj.getMinutes()).slice(-2);

                this.tblPublicationsDateEndDateSecond = this.tblPublicationsDateEndDateObj.getSeconds();
                this.tblPublicationsDateEndDateSecond_print = ("0" + this.tblPublicationsDateEndDateObj.getSeconds()).slice(-2);

                //this.tblPublicationsDateEnd_print = this.tblPublicationsDateEnd;
                this.tblPublicationsDateEnd_print = FunctionsGeneric.dateRead01(this.tblPublicationsDateEnd, 
                                                                                gSystemConfig.configBackendDateFormat, 
                                                                                0, 
                                                                                gSystemConfig.configPublicationsDateEndType);
            }
    
            this.tblPublicationsTitle = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].title, "db");
            this.tblPublicationsDescription = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].description, "db");
            this.tblPublicationsDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].description, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            
            this.tblPublicationsURLAlias = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url_alias, "db");
            //this.tblPublicationsKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].keywords_tags, "db");
            this.tblPublicationsKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].keywords_tags, "editTextBox=1");
            this.tblPublicationsMetaDescription = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblPublicationsMetaDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblPublicationsMetaTitle = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].meta_title, "db");
            this.tblPublicationsMetaInfo = this.resultsPublicationsDetails[0].meta_info;

            if(gSystemConfig.enablePublicationsInfo1 == 1)
            {
                if(gSystemConfig.configPublicationsInfo1FieldType == 1 || gSystemConfig.configPublicationsInfo1FieldType == 2)
                {
                    this.tblPublicationsInfo1 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info1, "db");
                    this.tblPublicationsInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo1FieldType == 11 || gSystemConfig.configPublicationsInfo1FieldType == 12)
                {
                    this.tblPublicationsInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info1, "db"), 2);
                    this.tblPublicationsInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo2 == 1)
            {
                if(gSystemConfig.configPublicationsInfo2FieldType == 1 || gSystemConfig.configPublicationsInfo2FieldType == 2)
                {
                    this.tblPublicationsInfo2 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info2, "db");
                    this.tblPublicationsInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo2FieldType == 11 || gSystemConfig.configPublicationsInfo2FieldType == 12)
                {
                    this.tblPublicationsInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info2, "db"), 2);
                    this.tblPublicationsInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo3 == 1)
            {
                if(gSystemConfig.configPublicationsInfo3FieldType == 1 || gSystemConfig.configPublicationsInfo3FieldType == 2)
                {
                    this.tblPublicationsInfo3 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info3, "db");
                    this.tblPublicationsInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo3FieldType == 11 || gSystemConfig.configPublicationsInfo3FieldType == 12)
                {
                    this.tblPublicationsInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info3, "db"), 2);
                    this.tblPublicationsInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo4 == 1)
            {
                if(gSystemConfig.configPublicationsInfo4FieldType == 1 || gSystemConfig.configPublicationsInfo4FieldType == 2)
                {
                    this.tblPublicationsInfo4 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info4, "db");
                    this.tblPublicationsInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo4FieldType == 11 || gSystemConfig.configPublicationsInfo4FieldType == 12)
                {
                    this.tblPublicationsInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info4, "db"), 2);
                    this.tblPublicationsInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo5 == 1)
            {
                if(gSystemConfig.configPublicationsInfo5FieldType == 1 || gSystemConfig.configPublicationsInfo5FieldType == 2)
                {
                    this.tblPublicationsInfo5 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info5, "db");
                    this.tblPublicationsInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo5FieldType == 11 || gSystemConfig.configPublicationsInfo5FieldType == 12)
                {
                    this.tblPublicationsInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info5, "db"), 2);
                    this.tblPublicationsInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info5, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo6 == 1)
            {
                if(gSystemConfig.configPublicationsInfo6FieldType == 1 || gSystemConfig.configPublicationsInfo6FieldType == 2)
                {
                    this.tblPublicationsInfo6 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info6, "db");
                    this.tblPublicationsInfo6_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info6, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo6FieldType == 11 || gSystemConfig.configPublicationsInfo6FieldType == 12)
                {
                    this.tblPublicationsInfo6 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info6, "db"), 2);
                    this.tblPublicationsInfo6_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info6, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo7 == 1)
            {
                if(gSystemConfig.configPublicationsInfo7FieldType == 1 || gSystemConfig.configPublicationsInfo7FieldType == 2)
                {
                    this.tblPublicationsInfo7 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info7, "db");
                    this.tblPublicationsInfo7_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info7, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo7FieldType == 11 || gSystemConfig.configPublicationsInfo7FieldType == 12)
                {
                    this.tblPublicationsInfo7 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info7, "db"), 2);
                    this.tblPublicationsInfo7_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info7, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo8 == 1)
            {
                if(gSystemConfig.configPublicationsInfo8FieldType == 1 || gSystemConfig.configPublicationsInfo8FieldType == 2)
                {
                    this.tblPublicationsInfo8 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info8, "db");
                    this.tblPublicationsInfo8_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info8, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo8FieldType == 11 || gSystemConfig.configPublicationsInfo8FieldType == 12)
                {
                    this.tblPublicationsInfo8 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info8, "db"), 2);
                    this.tblPublicationsInfo8_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info8, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo9 == 1)
            {
                if(gSystemConfig.configPublicationsInfo9FieldType == 1 || gSystemConfig.configPublicationsInfo9FieldType == 2)
                {
                    this.tblPublicationsInfo9 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info9, "db");
                    this.tblPublicationsInfo9_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info9, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo9FieldType == 11 || gSystemConfig.configPublicationsInfo9FieldType == 12)
                {
                    this.tblPublicationsInfo9 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info9, "db"), 2);
                    this.tblPublicationsInfo9_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info9, "db"), 2);
                }
            }
            if(gSystemConfig.enablePublicationsInfo10 == 1)
            {
                if(gSystemConfig.configPublicationsInfo10FieldType == 1 || gSystemConfig.configPublicationsInfo10FieldType == 2)
                {
                    this.tblPublicationsInfo10 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info10, "db");
                    this.tblPublicationsInfo10_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info10, "db");
                }

                //Encrypted.
                if(gSystemConfig.configPublicationsInfo10FieldType == 11 || gSystemConfig.configPublicationsInfo10FieldType == 12)
                {
                    this.tblPublicationsInfo10 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info10, "db"), 2);
                    this.tblPublicationsInfo10_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].info10, "db"), 2);
                }
            }

            this.tblPublicationsSource = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].source, "db");
            this.tblPublicationsSourceURL = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].source_url, "db");
            this.tblPublicationsSourceURL_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].source_url, "db");

            this.tblPublicationsNumber1 = this.resultsPublicationsDetails[0].number1;
            this.tblPublicationsNumber1_print = FunctionsGeneric.valueMaskRead(this.tblPublicationsNumber1, gSystemConfig.configSystemCurrency, gSystemConfig.configPublicationsNumber1FieldType);
            this.tblPublicationsNumber2 = this.resultsPublicationsDetails[0].number2;
            this.tblPublicationsNumber2_print = FunctionsGeneric.valueMaskRead(this.tblPublicationsNumber2, gSystemConfig.configSystemCurrency, gSystemConfig.configPublicationsNumber2FieldType);
            this.tblPublicationsNumber3 = this.resultsPublicationsDetails[0].number3;
            this.tblPublicationsNumber3_print = FunctionsGeneric.valueMaskRead(this.tblPublicationsNumber3, gSystemConfig.configSystemCurrency, gSystemConfig.configPublicationsNumber3FieldType);
            this.tblPublicationsNumber4 = this.resultsPublicationsDetails[0].number4;
            this.tblPublicationsNumber4_print = FunctionsGeneric.valueMaskRead(this.tblPublicationsNumber4, gSystemConfig.configSystemCurrency, gSystemConfig.configPublicationsNumber4FieldType);
            this.tblPublicationsNumber5 = this.resultsPublicationsDetails[0].number5;
            this.tblPublicationsNumber5_print = FunctionsGeneric.valueMaskRead(this.tblPublicationsNumber5, gSystemConfig.configSystemCurrency, gSystemConfig.configPublicationsNumber5FieldType);

            this.tblPublicationsURL1 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url1, "db");
            this.tblPublicationsURL1_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url1, "db");
            this.tblPublicationsURL2 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url2, "db");
            this.tblPublicationsURL2_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url2, "db");
            this.tblPublicationsURL3 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url3, "db");
            this.tblPublicationsURL3_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url3, "db");
            this.tblPublicationsURL4 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url4, "db");
            this.tblPublicationsURL4_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url4, "db");
            this.tblPublicationsURL5 = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url5, "db");
            this.tblPublicationsURL5_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].url5, "db");
            
            this.tblPublicationsDate1 = this.resultsPublicationsDetails[0].date1;
            if(this.tblPublicationsDate1)
            {
                this.tblPublicationsDate1DateObj = this.tblPublicationsDate1;
                this.tblPublicationsDate1DateYear = this.tblPublicationsDate1DateObj.getFullYear();
                this.tblPublicationsDate1DateDay = this.tblPublicationsDate1DateObj.getDate();
                this.tblPublicationsDate1DateMonth = (this.tblPublicationsDate1DateObj.getMonth() + 1);
            
                this.tblPublicationsDate1DateHour = this.tblPublicationsDate1DateObj.getHours();
                this.tblPublicationsDate1DateHour_print = ("0" + this.tblPublicationsDate1DateObj.getHours()).slice(-2);

                this.tblPublicationsDate1DateMinute = this.tblPublicationsDate1DateObj.getMinutes();
                this.tblPublicationsDate1DateMinute_print = ("0" + this.tblPublicationsDate1DateObj.getMinutes()).slice(-2);

                this.tblPublicationsDate1DateSecond = this.tblPublicationsDate1DateObj.getSeconds();
                this.tblPublicationsDate1DateSecond_print = ("0" + this.tblPublicationsDate1DateObj.getSeconds()).slice(-2);

                //this.tblPublicationsDate1_print = this.tblPublicationsDate1;
                this.tblPublicationsDate1_print = FunctionsGeneric.dateRead01(this.tblPublicationsDate1, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configPublicationsDate1Type);
            }

            this.tblPublicationsDate2 = this.resultsPublicationsDetails[0].date2;
            if(this.tblPublicationsDate2)
            {
                this.tblPublicationsDate2DateObj = this.tblPublicationsDate2;
                this.tblPublicationsDate2DateYear = this.tblPublicationsDate2DateObj.getFullYear();
                this.tblPublicationsDate2DateDay = this.tblPublicationsDate2DateObj.getDate();
                this.tblPublicationsDate2DateMonth = (this.tblPublicationsDate2DateObj.getMonth() + 1);
            
                this.tblPublicationsDate2DateHour = this.tblPublicationsDate2DateObj.getHours();
                this.tblPublicationsDate2DateHour_print = ("0" + this.tblPublicationsDate2DateObj.getHours()).slice(-2);

                this.tblPublicationsDate2DateMinute = this.tblPublicationsDate2DateObj.getMinutes();
                this.tblPublicationsDate2DateMinute_print = ("0" + this.tblPublicationsDate2DateObj.getMinutes()).slice(-2);

                this.tblPublicationsDate2DateSecond = this.tblPublicationsDate2DateObj.getSeconds();
                this.tblPublicationsDate2DateSecond_print = ("0" + this.tblPublicationsDate2DateObj.getSeconds()).slice(-2);

                this.tblPublicationsDate2_print = FunctionsGeneric.dateRead01(this.tblPublicationsDate2, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configPublicationsDate2Type);
            }

            this.tblPublicationsDate3 = this.resultsPublicationsDetails[0].date3;
            if(this.tblPublicationsDate3)
            {
                this.tblPublicationsDate3DateObj = this.tblPublicationsDate3;
                this.tblPublicationsDate3DateYear = this.tblPublicationsDate3DateObj.getFullYear();
                this.tblPublicationsDate3DateDay = this.tblPublicationsDate3DateObj.getDate();
                this.tblPublicationsDate3DateMonth = (this.tblPublicationsDate3DateObj.getMonth() + 1);
            
                this.tblPublicationsDate3DateHour = this.tblPublicationsDate3DateObj.getHours();
                this.tblPublicationsDate3DateHour_print = ("0" + this.tblPublicationsDate3DateObj.getHours()).slice(-2);

                this.tblPublicationsDate3DateMinute = this.tblPublicationsDate3DateObj.getMinutes();
                this.tblPublicationsDate3DateMinute_print = ("0" + this.tblPublicationsDate3DateObj.getMinutes()).slice(-2);

                this.tblPublicationsDate3DateSecond = this.tblPublicationsDate3DateObj.getSeconds();
                this.tblPublicationsDate3DateSecond_print = ("0" + this.tblPublicationsDate3DateObj.getSeconds()).slice(-2);

                this.tblPublicationsDate3_print = FunctionsGeneric.dateRead01(this.tblPublicationsDate3, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configPublicationsDate3Type);
            }

            this.tblPublicationsDate4 = this.resultsPublicationsDetails[0].date4;
            if(this.tblPublicationsDate4)
            {
                this.tblPublicationsDate4DateObj = this.tblPublicationsDate4;
                this.tblPublicationsDate4DateYear = this.tblPublicationsDate4DateObj.getFullYear();
                this.tblPublicationsDate4DateDay = this.tblPublicationsDate4DateObj.getDate();
                this.tblPublicationsDate4DateMonth = (this.tblPublicationsDate4DateObj.getMonth() + 1);
            
                this.tblPublicationsDate4DateHour = this.tblPublicationsDate4DateObj.getHours();
                this.tblPublicationsDate4DateHour_print = ("0" + this.tblPublicationsDate4DateObj.getHours()).slice(-2);

                this.tblPublicationsDate4DateMinute = this.tblPublicationsDate4DateObj.getMinutes();
                this.tblPublicationsDate4DateMinute_print = ("0" + this.tblPublicationsDate4DateObj.getMinutes()).slice(-2);

                this.tblPublicationsDate4DateSecond = this.tblPublicationsDate4DateObj.getSeconds();
                this.tblPublicationsDate4DateSecond_print = ("0" + this.tblPublicationsDate4DateObj.getSeconds()).slice(-2);

                this.tblPublicationsDate4_print = FunctionsGeneric.dateRead01(this.tblPublicationsDate4, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configPublicationsDate4Type);
            }

            this.tblPublicationsDate5 = this.resultsPublicationsDetails[0].date5;
            if(this.tblPublicationsDate5)
            {
                this.tblPublicationsDate5DateObj = this.tblPublicationsDate5;
                this.tblPublicationsDate5DateYear = this.tblPublicationsDate5DateObj.getFullYear();
                this.tblPublicationsDate5DateDay = this.tblPublicationsDate5DateObj.getDate();
                this.tblPublicationsDate5DateMonth = (this.tblPublicationsDate5DateObj.getMonth() + 1);
            
                this.tblPublicationsDate5DateHour = this.tblPublicationsDate5DateObj.getHours();
                this.tblPublicationsDate5DateHour_print = ("0" + this.tblPublicationsDate5DateObj.getHours()).slice(-2);

                this.tblPublicationsDate5DateMinute = this.tblPublicationsDate5DateObj.getMinutes();
                this.tblPublicationsDate5DateMinute_print = ("0" + this.tblPublicationsDate5DateObj.getMinutes()).slice(-2);

                this.tblPublicationsDate5DateSecond = this.tblPublicationsDate5DateObj.getSeconds();
                this.tblPublicationsDate5DateSecond_print = ("0" + this.tblPublicationsDate5DateObj.getSeconds()).slice(-2);

                this.tblPublicationsDate5_print = FunctionsGeneric.dateRead01(this.tblPublicationsDate5, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configPublicationsDate5Type);
            }
            
            this.tblPublicationsImageMain = this.resultsPublicationsDetails[0].image_main;
            this.tblPublicationsImageMainCaption = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].image_main_caption, "db");
            this.tblPublicationsFile1 = this.resultsPublicationsDetails[0].file1;
            this.tblPublicationsFile2 = this.resultsPublicationsDetails[0].file2;
            this.tblPublicationsFile3 = this.resultsPublicationsDetails[0].file3;
            this.tblPublicationsFile4 = this.resultsPublicationsDetails[0].file4;
            this.tblPublicationsFile5 = this.resultsPublicationsDetails[0].file5;

            this.tblPublicationsActivation = this.resultsPublicationsDetails[0].activation;
            if(this.tblPublicationsActivation == 0)
            {
                this.tblPublicationsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblPublicationsActivation == 1)
            {
                this.tblPublicationsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblPublicationsActivation1 = this.resultsPublicationsDetails[0].activation1;
            if(this.tblPublicationsActivation1 == 0)
            {
                this.tblPublicationsActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblPublicationsActivation1 == 1)
            {
                this.tblPublicationsActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblPublicationsActivation2 = this.resultsPublicationsDetails[0].activation2;
            if(this.tblPublicationsActivation2 == 0)
            {
                this.tblPublicationsActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblPublicationsActivation2 == 1)
            {
                this.tblPublicationsActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblPublicationsActivation3 = this.resultsPublicationsDetails[0].activation3;
            if(this.tblPublicationsActivation3 == 0)
            {
                this.tblPublicationsActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblPublicationsActivation3 == 1)
            {
                this.tblPublicationsActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblPublicationsActivation4 = this.resultsPublicationsDetails[0].activation4;
            if(this.tblPublicationsActivation4 == 0)
            {
                this.tblPublicationsActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblPublicationsActivation4 == 1)
            {
                this.tblPublicationsActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblPublicationsActivation5 = this.resultsPublicationsDetails[0].activation5;
            if(this.tblPublicationsActivation5 == 0)
            {
                this.tblPublicationsActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblPublicationsActivation5 == 1)
            {
                this.tblPublicationsActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblPublicationsIdStatus = this.resultsPublicationsDetails[0].id_status;
            if(this.tblPublicationsIdStatus == 0)
            {
                this.tblPublicationsIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblPublicationsIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblPublicationsIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }

            this.tblPublicationsRestrictedAccess = this.resultsPublicationsDetails[0].restricted_access;
            if(this.tblPublicationsRestrictedAccess == 0)
            {
                this.tblPublicationsRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess0");
            }
            if(this.tblPublicationsRestrictedAccess == 1)
            {
                this.tblPublicationsRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess1");
            }

            this.tblPublicationsNotes = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].notes, "db");
            this.tblPublicationsNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsPublicationsDetails[0].notes, "db");
    

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
        _idTbPublications: this._idTbPublications,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.opdRecord = new SyncSystemNS.ObjectFormsFieldsDetails(this.opdRecordParameters);
    await this.opdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};