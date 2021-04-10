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


module.exports = class ObjectFormsFieldsOptionsDetails
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
        //Debug.
        //console.log("objParameters=", objParameters);
        
        
        //Properties.
        //----------------------
        this.idTbFormsFieldsOptions = (objParameters.hasOwnProperty("_idTbFormsFieldsOptions")) ? objParameters._idTbFormsFieldsOptions : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsFormsFieldsOptionsDetails = "";

        this.tblFormsFieldsOptionsID = "";
        this.tblFormsFieldsOptionsIdFormsFields = "";
        this.tblFormsFieldsOptionsSortOrder = 0;
        this.tblFormsFieldsOptionsSortOrder_print = 0;

        this.tblFormsFieldsOptionsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblFormsFieldsOptionsDateTimezone = "";
        this.tblFormsFieldsOptionsDateEdit = "";

        this.tblFormsFieldsOptionsOptionName = ""; 
        this.tblFormsFieldsOptionsOptionNameFormatted = ""; 
    
        this.tblFormsFieldsOptionsConfigSelection = 0; //0 - not selected | 1 - selected
        this.tblFormsFieldsOptionsConfigSelection_print = "";

        this.tblFormsFieldsOptionsInfoSmall1 = "";
        this.tblFormsFieldsOptionsInfoSmall1_edit = "";
        this.tblFormsFieldsOptionsInfoSmall2 = "";
        this.tblFormsFieldsOptionsInfoSmall2_edit = "";
        this.tblFormsFieldsOptionsInfoSmall3 = "";
        this.tblFormsFieldsOptionsInfoSmall3_edit = "";
        this.tblFormsFieldsOptionsInfoSmall4 = "";
        this.tblFormsFieldsOptionsInfoSmall4_edit = "";
        this.tblFormsFieldsOptionsInfoSmall5 = "";
        this.tblFormsFieldsOptionsInfoSmall5_edit = "";
    
        this.tblFormsFieldsOptionsImageMain = "";
    
        this.tblFormsFieldsOptionsActivation = 0;
        this.tblFormsFieldsOptionsActivation_print = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectFormsFieldsOptionsDetails();
    }
    //**************************************************************************************


    //Get form field options details according to search parameters.
    //**************************************************************************************
    /**
     * Get form field options details according to search parameters.
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
            this.resultsFormsFieldsOptionsDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFormsFieldsOptions, 
                                                                                        this.arrSearchParameters, 
                                                                                        "", 
                                                                                        "", 
                                                                                        FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFormsFieldsOptions, "all", "string"), 
                                                                                        1, 
                                                                                        this.objSpecialParameters);


            //Define values.
            this.tblFormsFieldsOptionsID = this.resultsFormsFieldsOptionsDetails[0].id;
            this.tblFormsFieldsOptionsIdFormsFields = this.resultsFormsFieldsOptionsDetails[0].id_forms_fields;
            this.tblFormsFieldsOptionsSortOrder = this.resultsFormsFieldsOptionsDetails[0].sort_order;
            this.tblFormsFieldsOptionsSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblFormsFieldsOptionsSortOrder, gSystemConfig.configSystemCurrency, 3);
        
            this.tblFormsFieldsOptionsDateCreation = this.resultsFormsFieldsOptionsDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            this.tblFormsFieldsOptionsDateTimezone = this.resultsFormsFieldsOptionsDetails[0].date_timezone;
            this.tblFormsFieldsOptionsDateEdit = this.resultsFormsFieldsOptionsDetails[0].date_edit;
            
        
            this.tblFormsFieldsOptionsOptionName = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].option_name, "db"); 
            this.tblFormsFieldsOptionsOptionNameFormatted = this.resultsFormsFieldsOptionsDetails[0].option_name_formatted ; 

            this.tblFormsFieldsOptionsConfigSelection = this.resultsFormsFieldsOptionsDetails[0].config_selection; 
            this.tblFormsFieldsOptionsConfigSelection_print = ""; 
            switch(this.tblFormsFieldsOptionsConfigSelection)
            {
                case 0:
                    this.tblFormsFieldsOptionsConfigSelection_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsOptionsConfigSelection0");
                    break;
                case 1:
                    this.tblFormsFieldsOptionsConfigSelection_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsOptionsConfigSelection1");
                    break;
            }
            
            this.tblFormsFieldsOptionsInfoSmall1 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small1, "db");
            this.tblFormsFieldsOptionsInfoSmall1_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small1, "db");
            this.tblFormsFieldsOptionsInfoSmall2 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small2, "db");
            this.tblFormsFieldsOptionsInfoSmall2_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small2, "db");
            this.tblFormsFieldsOptionsInfoSmall3 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small3, "db");
            this.tblFormsFieldsOptionsInfoSmall3_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small3, "db");
            this.tblFormsFieldsOptionsInfoSmall4 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small4, "db");
            this.tblFormsFieldsOptionsInfoSmall4_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small4, "db");
            this.tblFormsFieldsOptionsInfoSmall5 = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small5, "db");
            this.tblFormsFieldsOptionsInfoSmall5_edit = FunctionsGeneric.contentMaskRead(this.resultsFormsFieldsOptionsDetails[0].info_small5, "db");
        
            this.tblFormsFieldsOptionsImageMain = this.resultsFormsFieldsOptionsDetails[0].image_main; 
            
            this.tblFormsFieldsOptionsActivation = this.resultsFormsFieldsOptionsDetails[0].activation;
            if(this.tblFormsFieldsOptionsActivation == 0)
            {
                this.tblFormsFieldsOptionsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFormsFieldsOptionsActivation == 1)
            {
                this.tblFormsFieldsOptionsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            
                
            //Debug.
            //console.log("this.resultsFormsFieldsOptionsDetails[0]=", this.resultsFormsFieldsOptionsDetails[0]);
            //console.log("this.tblFormsFieldsOptionsInfoSmall1=", this.tblFormsFieldsOptionsInfoSmall1);
            //console.log("this.tblFormsFieldsOptionsInfoSmall1_edit=", this.tblFormsFieldsOptionsInfoSmall1_edit);
            //console.log("this.arrSearchParameters=", this.arrSearchParameters);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(asyncError)
            }
        }finally{

        }
    }
    //**************************************************************************************
    
};