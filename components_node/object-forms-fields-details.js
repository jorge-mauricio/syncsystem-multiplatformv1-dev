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


module.exports = class ObjectFormsFieldsDetails
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
        this.idTbFormsFields = (objParameters.hasOwnProperty("_idTbFormsFields")) ? objParameters._idTbFormsFields : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsFormsFieldsDetails = "";

        this.tblFormsFieldsID = "";
        this.tblFormsFieldsIdForms = "";
        this.tblFormsFieldsSortOrder = 0;
        this.tblFormsFieldsSortOrder_print = 0;

        this.tblFormsFieldsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblFormsFieldsDateTimezone = "";
        this.tblFormsFieldsDateEdit = "";
    
        this.tblFormsFieldsFieldType = 0; 
        this.tblFormsFieldsFieldType_print = ""; 
    
        this.tblFormsFieldsFieldName = ""; 
        this.tblFormsFieldsFieldName_edit = ""; 
        this.tblFormsFieldsFieldNameFormatted = ""; 
        this.tblFormsFieldsFieldInstructions = ""; 
        this.tblFormsFieldsFieldInstructions_edit = ""; 
    
        this.tblFormsFieldsFieldSize = ""; 
        this.tblFormsFieldsFieldHeight = ""; 
    
        this.tblFormsFieldsFieldFilter = 0; 
    
        this.tblFormsFieldsInfoSmall1 = "";
        this.tblFormsFieldsInfoSmall1_edit = "";
        this.tblFormsFieldsInfoSmall2 = "";
        this.tblFormsFieldsInfoSmall2_edit = "";
        this.tblFormsFieldsInfoSmall3 = "";
        this.tblFormsFieldsInfoSmall3_edit = "";
        this.tblFormsFieldsInfoSmall4 = "";
        this.tblFormsFieldsInfoSmall4_edit = "";
        this.tblFormsFieldsInfoSmall5 = "";
        this.tblFormsFieldsInfoSmall5_edit = "";
    
        this.tblFormsFieldsActivation = 0;
        this.tblFormsFieldsActivation_print = "";
        this.tblFormsFieldsRequired = 0;
        this.tblFormsFieldsRequired_print = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectFormsFieldsDetails();
    }
    //**************************************************************************************
    

    //Get form field details according to search parameters.
    //**************************************************************************************
    /**
     * Get form field details according to search parameters.
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
            this.resultsFormsFieldsDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFormsFields, 
                                                                                this.arrSearchParameters, 
                                                                                "", 
                                                                                "", 
                                                                                FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFormsFields, "all", "string"), 
                                                                                1, 
                                                                                this.objSpecialParameters);


            //Define values.
            this.tblFormsFieldsID = this.resultsFormsFieldsDetails[0].id;
            this.tblFormsFieldsIdForms = this.resultsFormsFieldsDetails[0].id_forms;
            this.tblFormsFieldsSortOrder = this.resultsFormsFieldsDetails[0].sort_order;
            this.tblFormsFieldsSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblFormsFieldsSortOrder, gSystemConfig.configSystemCurrency, 3);
        
            this.tblFormsFieldsDateCreation = this.resultsFormsFieldsDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            this.tblFormsFieldsDateTimezone = this.resultsFormsFieldsDetails[0].date_timezone;
            this.tblFormsFieldsDateEdit = this.resultsFormsFieldsDetails[0].date_edit;
            
            this.tblFormsFieldsFieldType = this.resultsFormsFieldsDetails[0].field_type; 
            this.tblFormsFieldsFieldType_print = ""; 
            switch(this.tblFormsFieldsFieldType)
            {
                case 1:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType1");
                    break;
                case 2:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType2");
                    break;
                case 3:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType3");
                    break;
                case 4:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType4");
                    break;
                case 5:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType5");
                    break;
                case 6:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType6");
                    break;
                case 7:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType7");
                    break;
                case 8:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType8");
                    break;
                case 9:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType9");
                    break;
                case 10:
                    this.tblFormsFieldsFieldType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsFieldType10");
                    break;
            }
        
            this.tblFormsFieldsFieldName = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].field_name, "db"); 
            //this.tblFormsFieldsFieldName_edit = ""; 
            this.tblFormsFieldsFieldNameFormatted = this.resultsFormsFieldsDetails[0].field_name_formatted; 
            this.tblFormsFieldsFieldInstructions = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].field_instructions, "db"); 
            //this.tblFormsFieldsFieldInstructions_edit = ""; 
        
            this.tblFormsFieldsFieldSize = this.resultsFormsFieldsDetails[0].field_size; 
            this.tblFormsFieldsFieldHeight = this.resultsFormsFieldsDetails[0].field_height; 
        
            this.tblFormsFieldsFieldFilter = this.resultsFormsFieldsDetails[0].field_filter; 
        
            this.tblFormsFieldsInfoSmall1 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small1, "db");
            this.tblFormsFieldsInfoSmall1_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small1, "db");
            this.tblFormsFieldsInfoSmall2 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small2, "db");
            this.tblFormsFieldsInfoSmall2_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small2, "db");
            this.tblFormsFieldsInfoSmall3 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small3, "db");
            this.tblFormsFieldsInfoSmall3_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small3, "db");
            this.tblFormsFieldsInfoSmall4 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small4, "db");
            this.tblFormsFieldsInfoSmall4_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small4, "db");
            this.tblFormsFieldsInfoSmall5 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small5, "db");
            this.tblFormsFieldsInfoSmall5_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsDetails[0].info_small5, "db");
        
            this.tblFormsFieldsActivation = this.resultsFormsFieldsDetails[0].activation;
            if(this.tblFormsFieldsActivation == 0)
            {
                this.tblFormsFieldsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFormsFieldsActivation == 1)
            {
                this.tblFormsFieldsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            
            this.tblFormsFieldsRequired = this.resultsFormsFieldsDetails[0].required;
            if(this.tblFormsFieldsRequired == 0)
            {
                this.tblFormsFieldsRequired_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsRequired0");
            }
            if(this.tblFormsFieldsRequired == 1)
            {
                this.tblFormsFieldsRequired_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsRequired1");
            }
    
                
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
    this.offdRecord = "";
    this.offdRecordParameters = {
        _arrSearchParameters: this.arrSearchParameters,
        _idTbFormsFields: this._idTbFormsFields,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.offdRecord = new SyncSystemNS.ObjectFormsFieldsDetails(this.offdRecordParameters);
    await this.offdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};