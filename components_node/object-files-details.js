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
//----------------------


module.exports = class ObjectFilesDetails
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
        this.idTbFiles = (objParameters.hasOwnProperty("_idTbFiles")) ? objParameters._idTbFiles : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsFileDetails = "";

        this.tblFilesID = "";
        this.tblFilesIdParent = 0;
        this.tblFilesSortOrder = 0;
        this.tblFilesSortOrder_print = 0;
        this.tblFilesFileType = 0;
        this.tblFilesFileType_print = "";
        this.tblFilesFileConfig = 0;
        this.tblFilesFileConfig_print = "";

        this.tblFilesDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblFilesDateTimezone = "";
        this.tblFilesDateEdit = "";

        this.tblFilesTitle = "";
        this.tblFilesCaption = "";
        this.tblFilesDescription = "";
        this.tblFilesDescription_edit = "";
        this.tblFilesHTMLCode = "";
        this.tblFilesHTMLCode_edit = "";

        this.tblFilesURLAlias = "";
        this.tblFilesKeywordsTags = "";
        this.tblFilesMetaDescription = "";
        this.tblFilesMetaDescription_edit = "";
        this.tblFilesMetaTitle = "";
        this.tblFilesMetaInfo = "";

        this.tblFilesInfo1 = "";
        this.tblFilesInfo1_edit = "";
        this.tblFilesInfo2 = "";
        this.tblFilesInfo2_edit = "";
        this.tblFilesInfo3 = "";
        this.tblFilesInfo3_edit = "";
        this.tblFilesInfo4 = "";
        this.tblFilesInfo4_edit = "";
        this.tblFilesInfo5 = "";
        this.tblFilesInfo5_edit = "";

        this.tblFilesInfoSmall1 = "";
        this.tblFilesInfoSmall1_edit = "";
        this.tblFilesInfoSmall2 = "";
        this.tblFilesInfoSmall2_edit = "";
        this.tblFilesInfoSmall3 = "";
        this.tblFilesInfoSmall3_edit = "";
        this.tblFilesInfoSmall4 = "";
        this.tblFilesInfoSmall4_edit = "";
        this.tblFilesInfoSmall5 = "";
        this.tblFilesInfoSmall5_edit = "";

        this.tblFilesNumber1 = 0;
        this.tblFilesNumber1_print = "";
        this.tblFilesNumber2 = 0;
        this.tblFilesNumber2_print = "";
        this.tblFilesNumber3 = 0;
        this.tblFilesNumber3_print = "";
        this.tblFilesNumber4 = 0;
        this.tblFilesNumber4_print = "";
        this.tblFilesNumber5 = 0;
        this.tblFilesNumber5_print = "";

        this.tblFilesNumberSmall1 = 0;
        this.tblFilesNumberSmall1_print = "";
        this.tblFilesNumberSmall2 = 0;
        this.tblFilesNumberSmall2_print = "";
        this.tblFilesNumberSmall3 = 0;
        this.tblFilesNumberSmall3_print = "";
        this.tblFilesNumberSmall4 = 0;
        this.tblFilesNumberSmall4_print = "";
        this.tblFilesNumberSmall5 = 0;
        this.tblFilesNumberSmall5_print = "";
        
        this.tblFilesDate1 = null;
        this.tblFilesDate1_print = "";
        this.tblFilesDate1DateObj = new Date();
        this.tblFilesDate1DateYear, this.tblFilesDate1DateDay, this.tblFilesDate1DateMonth;
        this.tblFilesDate1DateHour, this.tblFilesDate1DateHour_print, this.tblFilesDate1DateMinute, this.tblFilesDate1DateMinute_print, this.tblFilesDate1DateSecond, this.tblFilesDate1DateSecond_print;

        this.tblFilesDate2 = null;
        this.tblFilesDate2_print = "";
        this.tblFilesDate2DateObj = new Date();
        this.tblFilesDate2DateYear, this.tblFilesDate2DateDay, this.tblFilesDate2DateMonth;
        this.tblFilesDate2DateHour, this.tblFilesDate2DateHour_print, this.tblFilesDate2DateMinute, this.tblFilesDate2DateMinute_print, this.tblFilesDate2DateSecond, this.tblFilesDate2DateSecond_print;

        this.tblFilesDate3 = null;
        this.tblFilesDate3_print = "";
        this.tblFilesDate3DateObj = new Date();
        this.tblFilesDate3DateYear, this.tblFilesDate3DateDay, this.tblFilesDate3DateMonth;
        this.tblFilesDate3DateHour, this.tblFilesDate3DateHour_print, this.tblFilesDate3DateMinute, this.tblFilesDate3DateMinute_print, this.tblFilesDate3DateSecond, this.tblFilesDate3DateSecond_print;

        this.tblFilesDate4 = null;
        this.tblFilesDate4_print = "";
        this.tblFilesDate4DateObj = new Date();
        this.tblFilesDate4DateYear, this.tblFilesDate4DateDay, this.tblFilesDate4DateMonth;
        this.tblFilesDate4DateHour, this.tblFilesDate4DateHour_print, this.tblFilesDate4DateMinute, this.tblFilesDate4DateMinute_print, this.tblFilesDate4DateSecond, this.tblFilesDate4DateSecond_print;

        this.tblFilesDate5 = null;
        this.tblFilesDate5_print = "";
        this.tblFilesDate5DateObj = new Date();
        this.tblFilesDate5DateYear, this.tblFilesDate5DateDay, this.tblFilesDate5DateMonth;
        this.tblFilesDate5DateHour, this.tblFilesDate5DateHour_print, this.tblFilesDate5DateMinute, this.tblFilesDate5DateMinute_print, this.tblFilesDate5DateSecond, this.tblFilesDate5DateSecond_print;

        this.tblFilesFile = "";
        this.tblFilesFileSize = "";
        this.tblFilesFileDuration = "";
        this.tblFilesFileDuration_print = "";
        this.tblFilesFileDimensions = "";
        this.tblFilesFileDimensions_print = "";
        this.tblFilesFileOriginalName = "";
        this.tblFilesFileThumbnail = "";

        this.tblFilesFile1 = "";
        this.tblFilesFile2 = "";
        this.tblFilesFile3 = "";
        this.tblFilesFile4 = "";
        this.tblFilesFile5 = "";

        this.tblFilesActivation = 1;
        this.tblFilesActivation_print = "";
        this.tblFilesActivation1 = 0;
        this.tblFilesActivation1_print = "";
        this.tblFilesActivation2 = 0;
        this.tblFilesActivation2_print = "";
        this.tblFilesActivation3 = 0;
        this.tblFilesActivation3_print = "";
        this.tblFilesActivation4 = 0;
        this.tblFilesActivation4_print = "";
        this.tblFilesActivation5 = 0;
        this.tblFilesActivation5_print = "";

        this.tblFilesNotes = "";
        this.tblFilesNotes_edit = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectFilesDetails();
    }
    //**************************************************************************************


    //Get file details according to search parameters.
    //**************************************************************************************
    /**
     * Get file listing according to search parameters.
     * @param {*} terminal 0 - backend | 1 - frontend
     * @param {*} returnType 1 - array | 3 - Json Object | 10 - html
     * @returns {json}
     */
    async recordDetailsGet(terminal = 0, returnType = 1)
    {
        //terminal: 0 - backend | 1 - frontend
        //returnType: 1 - array | 3 - Json Object | 10 - html

        /**/
        try
        {
            this.resultsFileDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiles, 
                                                                            this.arrSearchParameters, 
                                                                            "", 
                                                                            "", 
                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiles, "all", "string"), 
                                                                            1, 
                                                                            this.objSpecialParameters);


            //Define values.
            //if(this.resultsCategoryDetails[0])
            //{
                //DEV: Create logic to chech if record exist.
            //}
            this.tblFilesID = this.resultsFileDetails[0].id;
            this.tblFilesIdParent = this.resultsFileDetails[0].id_parent;

            this.tblFilesSortOrder = this.resultsFileDetails[0].sort_order;
            this.tblFilesSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblFilesSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblFilesFileType = this.resultsFileDetails[0].file_type;
            this.tblFilesFileConfig = this.resultsFileDetails[0].file_config;
            switch(this.tblFilesFileConfig)
            {
                case 1:
                    this.tblFilesFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay1");
                    break;
                case 2:
                    this.tblFilesFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay2");
                    break;
                case 3:
                    this.tblFilesFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay3");
                    break;
                case 4:
                    this.tblFilesFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay4");
            }

            this.tblFilesDateCreation = this.resultsFileDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            this.tblFilesDateTimezone = this.resultsFileDetails[0].date_timezone;
            this.tblFilesDateEdit = this.resultsFileDetails[0].date_edit;

            this.tblFilesTitle = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].title, "db");
            this.tblFilesCaption = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].caption, "db");
            this.tblFilesDescription = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].description, "db");
            this.tblFilesDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].description, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            this.tblFilesHTMLCode = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].html_code, "db");
            this.tblFilesHTMLCode_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].html_code, "db");
            
            this.tblFilesURLAlias = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].url_alias, "db");
            //this.tblFilesKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].keywords_tags, "db");
            this.tblFilesKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].keywords_tags, "editTextBox=1");
            this.tblFilesMetaDescription = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblFilesMetaDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblFilesMetaTitle = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].meta_title, "db");
            this.tblFilesMetaInfo = this.resultsFileDetails[0].meta_info;

            if(gSystemConfig.enableFilesInfo1 == 1)
            {
                if(gSystemConfig.configFilesInfo1FieldType == 1 || gSystemConfig.configFilesInfo1FieldType == 2)
                {
                    this.tblFilesInfo1 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info1, "db");
                    this.tblFilesInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configFilesInfo1FieldType == 11 || gSystemConfig.configFilesInfo1FieldType == 12)
                {
                    this.tblFilesInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info1, "db"), 2);
                    this.tblFilesInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enableFilesInfo2 == 1)
            {
                if(gSystemConfig.configFilesInfo2FieldType == 1 || gSystemConfig.configFilesInfo2FieldType == 2)
                {
                    this.tblFilesInfo2 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info2, "db");
                    this.tblFilesInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configFilesInfo2FieldType == 11 || gSystemConfig.configFilesInfo2FieldType == 12)
                {
                    this.tblFilesInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info2, "db"), 2);
                    this.tblFilesInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enableFilesInfo3 == 1)
            {
                if(gSystemConfig.configFilesInfo3FieldType == 1 || gSystemConfig.configFilesInfo3FieldType == 2)
                {
                    this.tblFilesInfo3 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info3, "db");
                    this.tblFilesInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configFilesInfo3FieldType == 11 || gSystemConfig.configFilesInfo3FieldType == 12)
                {
                    this.tblFilesInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info3, "db"), 2);
                    this.tblFilesInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enableFilesInfo4 == 1)
            {
                if(gSystemConfig.configFilesInfo4FieldType == 1 || gSystemConfig.configFilesInfo4FieldType == 2)
                {
                    this.tblFilesInfo4 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info4, "db");
                    this.tblFilesInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configFilesInfo4FieldType == 11 || gSystemConfig.configFilesInfo4FieldType == 12)
                {
                    this.tblFilesInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info4, "db"), 2);
                    this.tblFilesInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enableFilesInfo5 == 1)
            {
                if(gSystemConfig.configFilesInfo5FieldType == 1 || gSystemConfig.configFilesInfo5FieldType == 2)
                {
                    this.tblFilesInfo5 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info5, "db");
                    this.tblFilesInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configFilesInfo5FieldType == 11 || gSystemConfig.configFilesInfo5FieldType == 12)
                {
                    this.tblFilesInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info5, "db"), 2);
                    this.tblFilesInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info5, "db"), 2);
                }
            }

            this.tblFilesInfoSmall1 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small1, "db");
            this.tblFilesInfoSmall1_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small1, "db");
            this.tblFilesInfoSmall2 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small2, "db");
            this.tblFilesInfoSmall2_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small2, "db");
            this.tblFilesInfoSmall3 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small3, "db");
            this.tblFilesInfoSmall3_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small3, "db");
            this.tblFilesInfoSmall4 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small4, "db");
            this.tblFilesInfoSmall4_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small4, "db");
            this.tblFilesInfoSmall5 = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small5, "db");
            this.tblFilesInfoSmall5_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].info_small5, "db");

            this.tblFilesNumber1 = this.resultsFileDetails[0].number1;
            this.tblFilesNumber1_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumber1, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumber1FieldType);
            this.tblFilesNumber2 = this.resultsFileDetails[0].number2;
            this.tblFilesNumber2_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumber2, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumber2FieldType);
            this.tblFilesNumber3 = this.resultsFileDetails[0].number3;
            this.tblFilesNumber3_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumber3, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumber3FieldType);
            this.tblFilesNumber4 = this.resultsFileDetails[0].number4;
            this.tblFilesNumber4_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumber4, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumber4FieldType);
            this.tblFilesNumber5 = this.resultsFileDetails[0].number5;
            this.tblFilesNumber5_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumber5, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumber5FieldType);

            this.tblFilesNumberSmall1 = this.resultsFileDetails[0].number_small1;
            this.tblFilesNumberSmall1_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumberSmall1, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumberS1FieldType);
            this.tblFilesNumberSmall2 = this.resultsFileDetails[0].number_small2;
            this.tblFilesNumberSmall2_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumberSmall2, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumberS2FieldType);
            this.tblFilesNumberSmall3 = this.resultsFileDetails[0].number_small3;
            this.tblFilesNumberSmall3_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumberSmall3, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumberS3FieldType);
            this.tblFilesNumberSmall4 = this.resultsFileDetails[0].number_small4;
            this.tblFilesNumberSmall4_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumberSmall4, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumberS4FieldType);
            this.tblFilesNumberSmall5 = this.resultsFileDetails[0].number_small5;
            this.tblFilesNumberSmall5_print = FunctionsGeneric.valueMaskRead(this.tblFilesNumberSmall5, gSystemConfig.configSystemCurrency, gSystemConfig.configFilesNumberS5FieldType);
            
            this.tblFilesDate1 = this.resultsFileDetails[0].date1;
            if(this.tblFilesDate1)
            {
                this.tblFilesDate1DateObj = this.tblFilesDate1;
                this.tblFilesDate1DateYear = this.tblFilesDate1DateObj.getFullYear();
                this.tblFilesDate1DateDay = this.tblFilesDate1DateObj.getDate();
                this.tblFilesDate1DateMonth = (this.tblFilesDate1DateObj.getMonth() + 1);
            
                this.tblFilesDate1DateHour = this.tblFilesDate1DateObj.getHours();
                this.tblFilesDate1DateHour_print = ("0" + this.tblFilesDate1DateObj.getHours()).slice(-2);

                this.tblFilesDate1DateMinute = this.tblFilesDate1DateObj.getMinutes();
                this.tblFilesDate1DateMinute_print = ("0" + this.tblFilesDate1DateObj.getMinutes()).slice(-2);

                this.tblFilesDate1DateSecond = this.tblFilesDate1DateObj.getSeconds();
                this.tblFilesDate1DateSecond_print = ("0" + this.tblFilesDate1DateObj.getSeconds()).slice(-2);

                //this.tblFilesDate1_print = this.tblFilesDate1;
                this.tblFilesDate1_print = FunctionsGeneric.dateRead01(this.tblFilesDate1, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configFilesDate1Type);
            }

            this.tblFilesDate2 = this.resultsFileDetails[0].date2;
            if(this.tblFilesDate2)
            {
                this.tblFilesDate2DateObj = this.tblFilesDate2;
                this.tblFilesDate2DateYear = this.tblFilesDate2DateObj.getFullYear();
                this.tblFilesDate2DateDay = this.tblFilesDate2DateObj.getDate();
                this.tblFilesDate2DateMonth = (this.tblFilesDate2DateObj.getMonth() + 1);
            
                this.tblFilesDate2DateHour = this.tblFilesDate2DateObj.getHours();
                this.tblFilesDate2DateHour_print = ("0" + this.tblFilesDate2DateObj.getHours()).slice(-2);

                this.tblFilesDate2DateMinute = this.tblFilesDate2DateObj.getMinutes();
                this.tblFilesDate2DateMinute_print = ("0" + this.tblFilesDate2DateObj.getMinutes()).slice(-2);

                this.tblFilesDate2DateSecond = this.tblFilesDate2DateObj.getSeconds();
                this.tblFilesDate2DateSecond_print = ("0" + this.tblFilesDate2DateObj.getSeconds()).slice(-2);

                this.tblFilesDate2_print = FunctionsGeneric.dateRead01(this.tblFilesDate2, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configFilesDate1Type);
            }

            this.tblFilesDate3 = this.resultsFileDetails[0].date3;
            if(this.tblFilesDate3)
            {
                this.tblFilesDate3DateObj = this.tblFilesDate3;
                this.tblFilesDate3DateYear = this.tblFilesDate3DateObj.getFullYear();
                this.tblFilesDate3DateDay = this.tblFilesDate3DateObj.getDate();
                this.tblFilesDate3DateMonth = (this.tblFilesDate3DateObj.getMonth() + 1);
            
                this.tblFilesDate3DateHour = this.tblFilesDate3DateObj.getHours();
                this.tblFilesDate3DateHour_print = ("0" + this.tblFilesDate3DateObj.getHours()).slice(-2);

                this.tblFilesDate3DateMinute = this.tblFilesDate3DateObj.getMinutes();
                this.tblFilesDate3DateMinute_print = ("0" + this.tblFilesDate3DateObj.getMinutes()).slice(-2);

                this.tblFilesDate3DateSecond = this.tblFilesDate3DateObj.getSeconds();
                this.tblFilesDate3DateSecond_print = ("0" + this.tblFilesDate3DateObj.getSeconds()).slice(-2);

                this.tblFilesDate3_print = FunctionsGeneric.dateRead01(this.tblFilesDate3, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configFilesDate1Type);
            }

            this.tblFilesDate4 = this.resultsFileDetails[0].date4;
            if(this.tblFilesDate4)
            {
                this.tblFilesDate4DateObj = this.tblFilesDate4;
                this.tblFilesDate4DateYear = this.tblFilesDate4DateObj.getFullYear();
                this.tblFilesDate4DateDay = this.tblFilesDate4DateObj.getDate();
                this.tblFilesDate4DateMonth = (this.tblFilesDate4DateObj.getMonth() + 1);
            
                this.tblFilesDate4DateHour = this.tblFilesDate4DateObj.getHours();
                this.tblFilesDate4DateHour_print = ("0" + this.tblFilesDate4DateObj.getHours()).slice(-2);

                this.tblFilesDate4DateMinute = this.tblFilesDate4DateObj.getMinutes();
                this.tblFilesDate4DateMinute_print = ("0" + this.tblFilesDate4DateObj.getMinutes()).slice(-2);

                this.tblFilesDate4DateSecond = this.tblFilesDate4DateObj.getSeconds();
                this.tblFilesDate4DateSecond_print = ("0" + this.tblFilesDate4DateObj.getSeconds()).slice(-2);

                this.tblFilesDate4_print = FunctionsGeneric.dateRead01(this.tblFilesDate4, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configFilesDate1Type);
            }

            this.tblFilesDate5 = this.resultsFileDetails[0].date5;
            if(this.tblFilesDate5)
            {
                this.tblFilesDate5DateObj = this.tblFilesDate5;
                this.tblFilesDate5DateYear = this.tblFilesDate5DateObj.getFullYear();
                this.tblFilesDate5DateDay = this.tblFilesDate5DateObj.getDate();
                this.tblFilesDate5DateMonth = (this.tblFilesDate5DateObj.getMonth() + 1);
            
                this.tblFilesDate5DateHour = this.tblFilesDate5DateObj.getHours();
                this.tblFilesDate5DateHour_print = ("0" + this.tblFilesDate5DateObj.getHours()).slice(-2);

                this.tblFilesDate5DateMinute = this.tblFilesDate5DateObj.getMinutes();
                this.tblFilesDate5DateMinute_print = ("0" + this.tblFilesDate5DateObj.getMinutes()).slice(-2);

                this.tblFilesDate5DateSecond = this.tblFilesDate5DateObj.getSeconds();
                this.tblFilesDate5DateSecond_print = ("0" + this.tblFilesDate5DateObj.getSeconds()).slice(-2);

                this.tblFilesDate5_print = FunctionsGeneric.dateRead01(this.tblFilesDate5, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configFilesDate1Type);
            }
            

            this.tblFilesFile = this.resultsFileDetails[0].file;
            this.tblFilesFileSize = this.resultsFileDetails[0].file_size;
            this.tblFilesFileDuration = this.resultsFileDetails[0].file_duration;
            this.tblFilesFileDimensions = this.resultsFileDetails[0].file_dimensions;
            this.tblFilesFileOriginalName = this.resultsFileDetails[0].file_original_name;
            this.tblFilesFileThumbnail = this.resultsFileDetails[0].file_thumbnail;

            this.tblFilesFile1 = this.resultsFileDetails[0].file1;
            this.tblFilesFile2 = this.resultsFileDetails[0].file2;
            this.tblFilesFile3 = this.resultsFileDetails[0].file3;
            this.tblFilesFile4 = this.resultsFileDetails[0].file4;
            this.tblFilesFile5 = this.resultsFileDetails[0].file5;

            this.tblFilesActivation = this.resultsFileDetails[0].activation;
            if(this.tblFilesActivation == 0)
            {
                this.tblFilesActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFilesActivation == 1)
            {
                this.tblFilesActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFilesActivation1 = this.resultsFileDetails[0].activation1;
            if(this.tblFilesActivation1 == 0)
            {
                this.tblFilesActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFilesActivation1 == 1)
            {
                this.tblFilesActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFilesActivation2 = this.resultsFileDetails[0].activation2;
            if(this.tblFilesActivation2 == 0)
            {
                this.tblFilesActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFilesActivation2 == 1)
            {
                this.tblFilesActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFilesActivation3 = this.resultsFileDetails[0].activation3;
            if(this.tblFilesActivation3 == 0)
            {
                this.tblFilesActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFilesActivation3 == 1)
            {
                this.tblFilesActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFilesActivation4 = this.resultsFileDetails[0].activation4;
            if(this.tblFilesActivation4 == 0)
            {
                this.tblFilesActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFilesActivation4 == 1)
            {
                this.tblFilesActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFilesActivation5 = this.resultsFileDetails[0].activation5;
            if(this.tblFilesActivation5 == 0)
            {
                this.tblFilesActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFilesActivation5 == 1)
            {
                this.tblFilesActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblFilesIdStatus = this.resultsFileDetails[0].id_status;
            if(this.tblFilesIdStatus == 0)
            {
                this.tblFilesIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblFilesIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblFilesIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }

            this.tblFilesRestrictedAccess = this.resultsFileDetails[0].restricted_access;
            if(this.tblFilesRestrictedAccess == 0)
            {
                this.tblFilesRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess0");
            }
            if(this.tblFilesRestrictedAccess == 1)
            {
                this.tblFilesRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess1");
            }

            this.tblFilesNotes = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].notes, "db");
            this.tblFilesNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsFileDetails[0].notes, "db");
    
                
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
    this.ofdRecord = "";
    this.ofdRecordParameters = {
        _arrSearchParameters: this.arrSearchParameters,
        _idTbFiles: this._idTbFiles,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };


    //Parameters build.
    this.arrSearchParameters.push("id;" + this._idTbFiles + ";i"); 


    this.ofdRecord = new SyncSystemNS.ObjectFilesDetails(this.ofdRecordParameters);
    await this.ofdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};