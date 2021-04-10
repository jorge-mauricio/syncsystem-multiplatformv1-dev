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


module.exports = class ObjectFiltersGenericDetails
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
        this.idTbFiltersGeneric = (objParameters.hasOwnProperty("_idTbFiltersGeneric")) ? objParameters._idTbFiltersGeneric : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsFiltersGenericDetails = "";

        this.tblFiltersGenericID = "";
        this.tblFiltersGenericSortOrder = 0;
        this.tblFiltersGenericSortOrder_print = "";

        this.tbliltersGenericDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //this.tbliltersGenericDateTimezone = "";
        this.tbliltersGenericDateEdit = "";

        this.tblFiltersGenericFilterIndex = 0;     
        this.tblFiltersGenericTableName = "";
        
        this.tblFiltersGenericTitle = "";
        this.tblFiltersGenericDescription = "";
        this.tblFiltersGenericDescription_edit = "";
    
        this.tblFiltersGenericURLAlias = "";
        this.tblFiltersGenericKeywordsTags = "";
        this.tblFiltersGenericMetaDescription = "";
        this.tblFiltersGenericMetaDescription_edit = "";
        this.tblFiltersGenericMetaTitle = "";
        //this.tblFiltersGenericMetaMetaInfo = "";
    
        this.tblFiltersGenericInfoSmall1 = "";
        this.tblFiltersGenericInfoSmall1_edit = "";
        this.tblFiltersGenericInfoSmall2 = "";
        this.tblFiltersGenericInfoSmall2_edit = "";
        this.tblFiltersGenericInfoSmall3 = "";
        this.tblFiltersGenericInfoSmall3_edit = "";
        this.tblFiltersGenericInfoSmall4 = "";
        this.tblFiltersGenericInfoSmall4_edit = "";
        this.tblFiltersGenericInfoSmall5 = "";
        this.tblFiltersGenericInfoSmall5_edit = "";
    
        this.tblFiltersGenericNumberSmall1 = 0;
        this.tblFiltersGenericNumberSmall1_print = "";
        this.tblFiltersGenericNumberSmall2 = 0;
        this.tblFiltersGenericNumberSmall2_print = "";
        this.tblFiltersGenericNumberSmall3 = 0;
        this.tblFiltersGenericNumberSmall3_print = "";
        this.tblFiltersGenericNumberSmall4 = 0;
        this.tblFiltersGenericNumberSmall4_print = "";
        this.tblFiltersGenericNumberSmall5 = 0;
        this.tblFiltersGenericNumberSmall5_print = "";
    
        this.tblFiltersGenericImageMain = "";
        this.tblFiltersGenericConfigSelection = 0;
        this.tblFiltersGenericConfigSelection_print = 0;
    
        this.tblFiltersGenericActivation = "";
        this.tblFiltersGenericActivation_print = "";
        this.tblFiltersGenericActivation1 = "";
        this.tblFiltersGenericActivation1_print = "";
        this.tblFiltersGenericActivation2 = "";
        this.tblFiltersGenericActivation2_print = "";
        this.tblFiltersGenericActivation3 = "";
        this.tblFiltersGenericActivation3_print = "";
        this.tblFiltersGenericActivation4 = "";
        this.tblFiltersGenericActivation4_print = "";
        this.tblFiltersGenericActivation5 = "";
        this.tblFiltersGenericActivation5_print = "";
    
        this.tblFiltersGenericNotes = "";
        this.tblFiltersGenericNotes_edit = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectFiltersGenericDetails();
    }
    //**************************************************************************************


    //Get filters generic details according to search parameters.
    //**************************************************************************************
    /**
     * Get filters generic details according to search parameters.
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
            this.resultsFiltersGenericDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGeneric, 
                                                                                    this.arrSearchParameters, 
                                                                                    "", 
                                                                                    "", 
                                                                                    FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGeneric, "all", "string"), 
                                                                                    1, 
                                                                                    this.objSpecialParameters);


            //Define values.
            this.tblFiltersGenericID = this.resultsFiltersGenericDetails[0].id;
            this.tblFiltersGenericSortOrder = this.resultsFiltersGenericDetails[0].sort_order;
            this.tblFiltersGenericSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblFiltersGenericSortOrder, gSystemConfig.configSystemCurrency, 3);;
    
            this.tbliltersGenericDateCreation = this.resultsFiltersGenericDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            //this.tbliltersGenericDateTimezone = this.resultsFiltersGenericDetails[0].id;
            this.tbliltersGenericDateEdit = this.resultsFiltersGenericDetails[0].date_edit;
    
            this.tblFiltersGenericFilterIndex = this.resultsFiltersGenericDetails[0].filter_index; 
        
            this.tblFiltersGenericTableName = this.resultsFiltersGenericDetails[0].table_name;
            this.tblFiltersGenericTitle = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].title, "db");
            this.tblFiltersGenericDescription = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].description, "db");
            this.tblFiltersGenericDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].description, "db");
        
            this.tblFiltersGenericURLAlias = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].url_alias, "db");
            this.tblFiltersGenericKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].keywords_tags, "db");
            this.tblFiltersGenericMetaDescription = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].meta_description, "db");
            this.tblFiltersGenericMetaDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].meta_description, "db");
            this.tblFiltersGenericMetaTitle = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].meta_title, "db");
            this.tblFiltersGenericMetaMetaInfo = this.resultsFiltersGenericDetails[0].meta_info;
        
            this.tblFiltersGenericInfoSmall1 = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small1, "db");
            this.tblFiltersGenericInfoSmall1_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small1, "db");
            this.tblFiltersGenericInfoSmall2 = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small2, "db");
            this.tblFiltersGenericInfoSmall2_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small2, "db");
            this.tblFiltersGenericInfoSmall3 = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small3, "db");
            this.tblFiltersGenericInfoSmall3_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small3, "db");
            this.tblFiltersGenericInfoSmall4 = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small4, "db");
            this.tblFiltersGenericInfoSmall4_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small4, "db");
            this.tblFiltersGenericInfoSmall5 = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small5, "db");
            this.tblFiltersGenericInfoSmall5_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].info_small5, "db");
        
            this.tblFiltersGenericNumberSmall1 = this.resultsFiltersGenericDetails[0].number_small1;
            this.tblFiltersGenericNumberSmall1_print = FunctionsGeneric.valueMaskRead(this.tblFiltersGenericNumberSmall1, gSystemConfig.configSystemCurrency, gSystemConfig.configFiltersGenericNumberS1FieldType);
            this.tblFiltersGenericNumberSmall2 = this.resultsFiltersGenericDetails[0].number_small2;
            this.tblFiltersGenericNumberSmall2_print = FunctionsGeneric.valueMaskRead(this.tblFiltersGenericNumberSmall2, gSystemConfig.configSystemCurrency, gSystemConfig.configFiltersGenericNumberS2FieldType);
            this.tblFiltersGenericNumberSmall3 = this.resultsFiltersGenericDetails[0].number_small3;
            this.tblFiltersGenericNumberSmall3_print = FunctionsGeneric.valueMaskRead(this.tblFiltersGenericNumberSmall3, gSystemConfig.configSystemCurrency, gSystemConfig.configFiltersGenericNumberS3FieldType);
            this.tblFiltersGenericNumberSmall4 = this.resultsFiltersGenericDetails[0].number_small4;
            this.tblFiltersGenericNumberSmall4_print = FunctionsGeneric.valueMaskRead(this.tblFiltersGenericNumberSmall4, gSystemConfig.configSystemCurrency, gSystemConfig.configFiltersGenericNumberS4FieldType);
            this.tblFiltersGenericNumberSmall5 = this.resultsFiltersGenericDetails[0].number_small5;
            this.tblFiltersGenericNumberSmall5_print = FunctionsGeneric.valueMaskRead(this.tblFiltersGenericNumberSmall5, gSystemConfig.configSystemCurrency, gSystemConfig.configFiltersGenericNumberS5FieldType);
        
            this.tblFiltersGenericImageMain = this.resultsFiltersGenericDetails[0].image_main;
            this.tblFiltersGenericConfigSelection = this.resultsFiltersGenericDetails[0].config_selection;
            this.tblFiltersGenericConfigSelection_print = "";
            switch(this.tblFiltersGenericConfigSelection)
            {
                case 0:
                    this.tblFiltersGenericConfigSelection_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsOptionsConfigSelection0");
                    break;
                case 1:
                    this.tblFiltersGenericConfigSelection_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "FormsFieldsOptionsConfigSelection1");
                    break;
            }

            this.tblFiltersGenericActivation = this.resultsFiltersGenericDetails[0].activation;
            if(this.tblFiltersGenericActivation == 0)
            {
                this.tblFiltersGenericActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFiltersGenericActivation == 1)
            {
                this.tblFiltersGenericActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFiltersGenericActivation1 = this.resultsFiltersGenericDetails[0].activation1;
            if(this.tblFiltersGenericActivation1 == 0)
            {
                this.tblFiltersGenericActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFiltersGenericActivation1 == 1)
            {
                this.tblFiltersGenericActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFiltersGenericActivation2 = this.resultsFiltersGenericDetails[0].activation2;
            if(this.tblFiltersGenericActivation2 == 0)
            {
                this.tblFiltersGenericActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFiltersGenericActivation2 == 1)
            {
                this.tblFiltersGenericActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFiltersGenericActivation3 = this.resultsFiltersGenericDetails[0].activation3;
            if(this.tblFiltersGenericActivation3 == 0)
            {
                this.tblFiltersGenericActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFiltersGenericActivation3 == 1)
            {
                this.tblFiltersGenericActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFiltersGenericActivation4 = this.resultsFiltersGenericDetails[0].activation4;
            if(this.tblFiltersGenericActivation4 == 0)
            {
                this.tblFiltersGenericActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFiltersGenericActivation4 == 1)
            {
                this.tblFiltersGenericActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblFiltersGenericActivation5 = this.resultsFiltersGenericDetails[0].activation5;
            if(this.tblFiltersGenericActivation5 == 0)
            {
                this.tblFiltersGenericActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblFiltersGenericActivation5 == 1)
            {
                this.tblFiltersGenericActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblFiltersGenericIdStatus = this.resultsFiltersGenericDetails[0].id_status;
            if(this.tblFiltersGenericIdStatus == 0)
            {
                this.tblFiltersGenericIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblFiltersGenericIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblFiltersGenericIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }
        
            this.tblFiltersGenericNotes = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].notes, "db");
            this.tblFiltersGenericNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsFiltersGenericDetails[0].notes, "db");
            
                
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