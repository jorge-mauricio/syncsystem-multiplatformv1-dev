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


module.exports = class ObjectQuizzesDetails
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
        this.idTbQuizzes = (objParameters.hasOwnProperty("_idTbQuizzes")) ? objParameters._idTbQuizzes : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsQuizzesDetails = "";

        this.tblQuizzesID = "";
        this.tblQuizzesIdParent = "";
        this.tblQuizzesSortOrder = 0;
        this.tblQuizzesSortOrder_print = "";
    
        this.tblQuizzesDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //this.tblQuizzesDateTimezone = "";
        this.tblQuizzesDateEdit = "";

        this.tblQuizzesIdType = 0; 
        this.tblQuizzesIdType_print = ""; 

        this.tblQuizzesIdRegisterUser = 0;

        this.tblQuizzesTitle = "";
        this.tblQuizzesDescription = "";
        this.tblQuizzesDescription_edit = "";
    
        this.tblQuizzesURLAlias = "";
        this.tblQuizzesKeywordsTags = "";
        this.tblQuizzesMetaDescription = "";
        this.tblQuizzesMetaDescription_edit = "";
        this.tblQuizzesMetaTitle = "";
        this.tblQuizzesMetaInfo = "";

        this.tblQuizzesInfo1 = "";
        this.tblQuizzesInfo1_edit = "";
        this.tblQuizzesInfo2 = "";
        this.tblQuizzesInfo2_edit = "";
        this.tblQuizzesInfo3 = "";
        this.tblQuizzesInfo3_edit = "";
        this.tblQuizzesInfo4 = "";
        this.tblQuizzesInfo4_edit = "";
        this.tblQuizzesInfo5 = "";
        this.tblQuizzesInfo5_edit = "";

        this.tblQuizzesNumber1 = 0;
        this.tblQuizzesNumber1_print = "";
        this.tblQuizzesNumber2 = 0;
        this.tblQuizzesNumber2_print = "";
        this.tblQuizzesNumber3 = 0;
        this.tblQuizzesNumber3_print = "";
        this.tblQuizzesNumber4 = 0;
        this.tblQuizzesNumber4_print = "";
        this.tblQuizzesNumber5 = 0;
        this.tblQuizzesNumber5_print = "";

        this.tblQuizzesImageMain = "";
        this.tblQuizzesImageMainCaption = "";
        
        this.tblQuizzesActivation = 1;
        this.tblQuizzesActivation_print = "";
        this.tblQuizzesActivation1 = 0;
        this.tblQuizzesActivation1_print = "";
        this.tblQuizzesActivation2 = 0;
        this.tblQuizzesActivation2_print = "";
        this.tblQuizzesActivation3 = 0;
        this.tblQuizzesActivation3_print = "";
        this.tblQuizzesActivation4 = 0;
        this.tblQuizzesActivation4_print = "";
        this.tblQuizzesActivation5 = 0;
        this.tblQuizzesActivation5_print = "";

        this.tblQuizzesIdStatus = 0;
        this.tblQuizzesIdStatus_print = "";

        this.tblQuizzesNotes = "";
        this.tblQuizzesNotes_edit = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectQuizzesDetails();
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
            this.resultsQuizzesDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableQuizzes, 
                                                                                this.arrSearchParameters, 
                                                                                "", 
                                                                                "", 
                                                                                FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableQuizzes, "all", "string"), 
                                                                                1, 
                                                                                this.objSpecialParameters);


            //Debug.                                                                                            
            //console.log("this.objIdsQuizzesFiltersGenericBinding=", this.objIdsQuizzesFiltersGenericBinding);
            //console.log("this.objIdsQuizzesFiltersGeneric1Binding=", this.objIdsQuizzesFiltersGeneric1Binding);
            //console.log("this.arrIdsQuizzesFiltersGeneric1Binding=", this.arrIdsQuizzesFiltersGeneric1Binding);
            //console.log("this.arrIdsQuizzesFiltersGeneric2Binding=", this.arrIdsQuizzesFiltersGeneric2Binding);
            //console.log("this.arrIdsQuizzesFiltersGeneric3Binding=", this.arrIdsQuizzesFiltersGeneric3Binding);
            //console.log("this.arrIdsQuizzesFiltersGenericBinding=", this.arrIdsQuizzesFiltersGenericBinding);
            //console.log("this.arrIdsQuizzesFiltersGenericBinding=", this.arrIdsQuizzesFiltersGenericBinding.includes("125"));
            //console.log("JSON.parse(this.arrIdsQuizzesFiltersGenericBinding)=", JSON.parse(JSON.stringify(this.arrIdsQuizzesFiltersGenericBinding[0])));
            //console.log("this.arrIdsQuizzesFiltersGenericBinding.find=",  this.arrIdsQuizzesFiltersGenericBinding.find(objQuizzesFiltersGenericBinding => objQuizzesFiltersGenericBinding.id_filters_generic == '126'));
            //console.log("this.arrIdsQuizzesFiltersGenericBinding=", Object.keys(this.arrIdsQuizzesFiltersGenericBinding).map(key => this.arrIdsQuizzesFiltersGenericBinding[key].id_filters_generic));


            //Define values.
            //if(this.resultsQuizzesDetails[0])
            //{
                //DEV: Create logic to check if record exist.
            //}
            this.tblQuizzesID = this.resultsQuizzesDetails[0].id;
            this.tblQuizzesIdParent = this.resultsQuizzesDetails[0].id_parent;

            this.tblQuizzesSortOrder = this.resultsQuizzesDetails[0].sort_order;
            this.tblQuizzesSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblQuizzesDateCreation = this.resultsQuizzesDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            //this.tblQuizzesDateTimezone = this.resultsQuizzesDetails[0].date_timezone;
            this.tblQuizzesDateEdit = this.resultsQuizzesDetails[0].date_edit;

            this.tblQuizzesIdType = this.resultsQuizzesDetails[0].id_type;
            switch(this.tblQuizzesIdType)
            {
                case 1:
                    this.tblQuizzesIdType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "QuizzesType1");
                    break;
                case 2:
                    this.tblQuizzesIdType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "QuizzesType2");
                    break;
                case 3:
                    this.tblQuizzesIdType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "QuizzesType3");
                    break;
            }

            this.tblQuizzesIdRegisterUser = this.resultsQuizzesDetails[0].id_register_user;
            if(this.tblQuizzesIdRegisterUser != 0)
            {
                this.tblQuizzesIdRegisterUser_print = "";
            }

            this.tblQuizzesTitle = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].title, "db");
            this.tblQuizzesDescription = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].description, "db");
            this.tblQuizzesDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].description, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            
            this.tblQuizzesURLAlias = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].url_alias, "db");
            //this.tblQuizzesKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].keywords_tags, "db");
            this.tblQuizzesKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].keywords_tags, "editTextBox=1");
            this.tblQuizzesMetaDescription = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblQuizzesMetaDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblQuizzesMetaTitle = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].meta_title, "db");
            this.tblQuizzesMetaInfo = this.resultsQuizzesDetails[0].meta_info;

            if(gSystemConfig.enableQuizzesInfo1 == 1)
            {
                if(gSystemConfig.configQuizzesInfo1FieldType == 1 || gSystemConfig.configQuizzesInfo1FieldType == 2)
                {
                    this.tblQuizzesInfo1 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info1, "db");
                    this.tblQuizzesInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesInfo1FieldType == 11 || gSystemConfig.configQuizzesInfo1FieldType == 12)
                {
                    this.tblQuizzesInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info1, "db"), 2);
                    this.tblQuizzesInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesInfo2 == 1)
            {
                if(gSystemConfig.configQuizzesInfo2FieldType == 1 || gSystemConfig.configQuizzesInfo2FieldType == 2)
                {
                    this.tblQuizzesInfo2 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info2, "db");
                    this.tblQuizzesInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesInfo2FieldType == 11 || gSystemConfig.configQuizzesInfo2FieldType == 12)
                {
                    this.tblQuizzesInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info2, "db"), 2);
                    this.tblQuizzesInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesInfo3 == 1)
            {
                if(gSystemConfig.configQuizzesInfo3FieldType == 1 || gSystemConfig.configQuizzesInfo3FieldType == 2)
                {
                    this.tblQuizzesInfo3 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info3, "db");
                    this.tblQuizzesInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesInfo3FieldType == 11 || gSystemConfig.configQuizzesInfo3FieldType == 12)
                {
                    this.tblQuizzesInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info3, "db"), 2);
                    this.tblQuizzesInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesInfo4 == 1)
            {
                if(gSystemConfig.configQuizzesInfo4FieldType == 1 || gSystemConfig.configQuizzesInfo4FieldType == 2)
                {
                    this.tblQuizzesInfo4 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info4, "db");
                    this.tblQuizzesInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesInfo4FieldType == 11 || gSystemConfig.configQuizzesInfo4FieldType == 12)
                {
                    this.tblQuizzesInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info4, "db"), 2);
                    this.tblQuizzesInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesInfo5 == 1)
            {
                if(gSystemConfig.configQuizzesInfo5FieldType == 1 || gSystemConfig.configQuizzesInfo5FieldType == 2)
                {
                    this.tblQuizzesInfo5 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info5, "db");
                    this.tblQuizzesInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesInfo5FieldType == 11 || gSystemConfig.configQuizzesInfo5FieldType == 12)
                {
                    this.tblQuizzesInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info5, "db"), 2);
                    this.tblQuizzesInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].info5, "db"), 2);
                }
            }

            this.tblQuizzesSource = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].source, "db");
            this.tblQuizzesSourceURL = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].source_url, "db");
            this.tblQuizzesSourceURL_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].source_url, "db");

            this.tblQuizzesNumber1 = this.resultsQuizzesDetails[0].number1;
            this.tblQuizzesNumber1_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesNumber1, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesNumber1FieldType);
            this.tblQuizzesNumber2 = this.resultsQuizzesDetails[0].number2;
            this.tblQuizzesNumber2_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesNumber2, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesNumber2FieldType);
            this.tblQuizzesNumber3 = this.resultsQuizzesDetails[0].number3;
            this.tblQuizzesNumber3_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesNumber3, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesNumber3FieldType);
            this.tblQuizzesNumber4 = this.resultsQuizzesDetails[0].number4;
            this.tblQuizzesNumber4_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesNumber4, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesNumber4FieldType);
            this.tblQuizzesNumber5 = this.resultsQuizzesDetails[0].number5;
            this.tblQuizzesNumber5_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesNumber5, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesNumber5FieldType);

            this.tblQuizzesImageMain = this.resultsQuizzesDetails[0].image_main;
            this.tblQuizzesImageMainCaption = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].image_main_caption, "db");

            this.tblQuizzesActivation = this.resultsQuizzesDetails[0].activation;
            if(this.tblQuizzesActivation == 0)
            {
                this.tblQuizzesActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblQuizzesActivation == 1)
            {
                this.tblQuizzesActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblQuizzesActivation1 = this.resultsQuizzesDetails[0].activation1;
            if(this.tblQuizzesActivation1 == 0)
            {
                this.tblQuizzesActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblQuizzesActivation1 == 1)
            {
                this.tblQuizzesActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblQuizzesActivation2 = this.resultsQuizzesDetails[0].activation2;
            if(this.tblQuizzesActivation2 == 0)
            {
                this.tblQuizzesActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblQuizzesActivation2 == 1)
            {
                this.tblQuizzesActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblQuizzesActivation3 = this.resultsQuizzesDetails[0].activation3;
            if(this.tblQuizzesActivation3 == 0)
            {
                this.tblQuizzesActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblQuizzesActivation3 == 1)
            {
                this.tblQuizzesActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblQuizzesActivation4 = this.resultsQuizzesDetails[0].activation4;
            if(this.tblQuizzesActivation4 == 0)
            {
                this.tblQuizzesActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblQuizzesActivation4 == 1)
            {
                this.tblQuizzesActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblQuizzesActivation5 = this.resultsQuizzesDetails[0].activation5;
            if(this.tblQuizzesActivation5 == 0)
            {
                this.tblQuizzesActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblQuizzesActivation5 == 1)
            {
                this.tblQuizzesActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblQuizzesIdStatus = this.resultsQuizzesDetails[0].id_status;
            if(this.tblQuizzesIdStatus == 0)
            {
                this.tblQuizzesIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblQuizzesIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblQuizzesIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }

            this.tblQuizzesNotes = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].notes, "db");
            this.tblQuizzesNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesDetails[0].notes, "db");
    

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
        _idTbQuizzes: this._idTbQuizzes,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.opdRecord = new SyncSystemNS.ObjectFormsFieldsDetails(this.opdRecordParameters);
    await this.opdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};