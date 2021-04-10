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


module.exports = class ObjectFormsDetails
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
        this.idTbForms = (objParameters.hasOwnProperty("_idTbForms")) ? objParameters._idTbForms : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsFormsDetails = "";

        this.tblFormsID = "";
        this.tblFormsIdParent = 0;
        this.tblFormsSortOrder = 0;
        this.tblFormsSortOrder_print = 0;

        this.tblFormsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblFormsDateTimezone = "";
        this.tblFormsDateEdit = "";
        
        this.tblFormsIdRegisterUser = 0;

        this.tblFormsFormTitle = "";
        this.tblFormsFormTitle_edit = "";
        this.tblFormsFormSubject = "";
        this.tblFormsFormSubject_edit = "";

        this.tblFormsRecipientName = "";
        this.tblFormsRecipientName_edit = "";
        this.tblFormsRecipientEmail = "";
        this.tblFormsRecipientEmail_edit = "";
        this.tblFormsRecipientEmailCopy = "";
        this.tblFormsRecipientEmailCopy_edit = "";

        this.tblFormsSenderName = "";
        this.tblFormsSenderName_edit = "";
        this.tblFormsSenderEmail = "";
        this.tblFormsSenderEmail_edit = "";
        this.tblFormsSenderConfig = "";

        this.tblFormsEmailFormat = "";
        this.tblFormsEmailFormat_print = "";

        this.tblFormsMessageSuccess = "";
        this.tblFormsMessageSuccess_edit = "";

        this.tblFormsActivation = 1;
        this.tblFormsActivation_print = "";

        this.tblFormsNotes = "";
        this.tblFormsNotes_edit = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectFormsDetails();
    }
    //**************************************************************************************


    //Get form details according to search parameters.
    //**************************************************************************************
    /**
     * Get form details according to search parameters.
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
            this.resultsFormsDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableForms, 
                                                                            this.arrSearchParameters, 
                                                                            "", 
                                                                            "", 
                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableForms, "all", "string"), 
                                                                            1, 
                                                                            this.objSpecialParameters);


            //Define values.
            //if(this.resultsCategoryDetails[0])
            //{
                //DEV: Create logic to chech if record exist.
            //}
            this.tblFormsID = this.resultsFormsDetails[0].id;
            this.tblFormsIdParent = this.resultsFormsDetails[0].id_parent;

            this.tblFormsSortOrder = this.resultsFormsDetails[0].sort_order;
            this.tblFormsSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblFormsSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblFormsDateCreation = this.resultsFormsDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            this.tblFormsDateTimezone = this.resultsFormsDetails[0].date_timezone;
            this.tblFormsDateEdit = this.resultsFormsDetails[0].date_edit;

            this.tblFormsIdRegisterUser = this.resultsFormsDetails[0].id_register_user;

            this.tblFormsFormTitle = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].form_title, "db");
            this.tblFormsFormSubject = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].form_subject, "db");
            
            this.tblFormsRecipientName = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].recipient_name, "db");
            this.tblFormsRecipientEmail = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].recipient_email, "db");
            this.tblFormsRecipientEmailCopy = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].recipient_email_copy, "db");
            
            this.tblFormsSenderName = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].sender_name, "db");
            this.tblFormsSenderEmail = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].sender_email, "db");
            this.tblFormsSenderConfig = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].sender_config, "db");
            
            this.tblFormsEmailFormat = this.resultsFormsDetails[0].email_format;
            switch(this.tblFormsFileConfig)
            {
                case 0:
                    this.tblFormsFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemEmailFormat0");
                    break;
                case 1:
                    this.tblFormsFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemEmailFormat1");
            }

            this.tblFormsMessageSuccess = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].message_success, "db");
            this.tblFormsMessageSuccess_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].message_success, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal

            this.tblFormsActivation = this.resultsFormsDetails[0].activation;
            if(this.tblFormsActivation == 0)
            {
                this.tblFormsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFormsActivation == 1)
            {
                this.tblFormsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFormsNotes = FunctionsGeneric.contentMaskRead(this.resultsFormsDetails[0].notes, "db");
            
    
                
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
        _idTbForms: this._idTbForms,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.ofdRecord = new SyncSystemNS.ObjectFormsDetails(this.ofdRecordParameters);
    await this.ofdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};