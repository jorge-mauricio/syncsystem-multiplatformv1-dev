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


//TODO: 
//- method to get full information about the user;
//- method to get full content based on id_parent;
module.exports = class ObjectContentDetails
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
        this.idTbContent = (objParameters.hasOwnProperty("_idTbContent")) ? objParameters._idTbContent : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsContentDetails = "";

        this.tblContentID = "";
        this.tblContentIdParent = 0;
        this.tblContentSortOrder = 0;
        this.tblContentSortOrder_print = 0;

        this.tblContentDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblContentDateTimezone = "";
        this.tblContentDateEdit = "";
        
        this.tblContentIdRegisterUser = 0;
        this.tblContentContentType = 0;
        this.tblContentContentType_print = "";
        this.tblContentContentColumns = 0;

        this.tblContentAlignText = 0;
        this.tblContentAlignImage = 0;

        this.tblContentContentText = "";
        this.tblContentContentText_edit = "";
        this.tblContentContentURL = "";
        this.tblContentContentURL_edit = "";
        this.tblContentCaption = "";
        this.tblContentCaption_edit = "";

        this.tblContentFile = "";
        this.tblContentFileSize = "";
        this.tblContentFileDuration = "";
        this.tblContentFileDuration_print = "";
        this.tblContentFileDimensions = "";
        this.tblContentFileDimensions_print = "";
        this.tblContentFileOriginalName = "";
        this.tblContentFileConfig = 0;
        this.tblContentFileConfig_print = "";
        this.tblContentFileThumbnail = "";

        this.tblContentActivation = 1;
        this.tblContentActivation_print = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectContentDetails();
    }
    //**************************************************************************************


    //Get content details according to search parameters.
    //**************************************************************************************
    /**
     * Get content listing according to search parameters.
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
            this.resultsContentDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableContent, 
                                                                            this.arrSearchParameters, 
                                                                            "", 
                                                                            "", 
                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableContent, "all", "string"), 
                                                                            1, 
                                                                            this.objSpecialParameters);


            //Define values.
            //if(this.resultsCategoryDetails[0])
            //{
                //DEV: Create logic to chech if record exist.
            //}
            this.tblContentID = this.resultsContentDetails[0].id;
            this.tblContentIdParent = this.resultsContentDetails[0].id_parent;

            this.tblContentSortOrder = this.resultsContentDetails[0].sort_order;
            this.tblContentSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblContentSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblContentDateCreation = this.resultsContentDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            this.tblContentDateTimezone = this.resultsContentDetails[0].date_timezone;
            this.tblContentDateEdit = this.resultsContentDetails[0].date_edit;

            this.tblContentIdRegisterUser = this.resultsContentDetails[0].id_register_user;

            this.tblContentContentType = this.resultsContentDetails[0].content_type;
            this.tblContentContentColumns = this.resultsContentDetails[0].content_columns;

            this.tblContentAlignText = this.resultsContentDetails[0].align_text;
            this.tblContentAlignImage = this.resultsContentDetails[0].align_image;
            
            this.tblContentContentText = FunctionsGeneric.contentMaskRead(this.resultsContentDetails[0].content_text, "db");
            this.tblContentContentText_edit = FunctionsGeneric.contentMaskRead(this.resultsContentDetails[0].content_text, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            this.tblContentContentURL = FunctionsGeneric.contentMaskRead(this.resultsContentDetails[0].content_url, "db");
            this.tblContentCaption = FunctionsGeneric.contentMaskRead(this.resultsContentDetails[0].caption, "db");
            
            this.tblContentFile = this.resultsContentDetails[0].file;
            this.tblContentFileSize = this.resultsContentDetails[0].file_size;
            this.tblContentFileDuration = this.resultsContentDetails[0].file_duration;
            this.tblContentFileDimensions = this.resultsContentDetails[0].file_dimensions;
            this.tblContentFileOriginalName = this.resultsContentDetails[0].file_original_name;

            this.tblContentFileConfig = this.resultsContentDetails[0].file_config;
            switch(this.tblContentFileConfig)
            {
                case 1:
                    this.tblContentFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay1");
                    break;
                case 2:
                    this.tblContentFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay2");
                    break;
                case 3:
                    this.tblContentFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay3");
                    break;
                case 4:
                    this.tblContentFileConfig_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDisplay4");
            }
            
            this.tblContentFileThumbnail = this.resultsContentDetails[0].file_thumbnail;

            this.tblContentActivation = this.resultsContentDetails[0].activation;
            if(this.tblContentActivation == 0)
            {
                this.tblContentActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblContentActivation == 1)
            {
                this.tblContentActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
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
    this.ocdRecord = "";
    this.ocdRecordParameters = {
        _arrSearchParameters: this.arrSearchParameters,
        _idTbContent: this._idTbContent,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.ocdRecord = new SyncSystemNS.ObjectContentDetails(this.ocdRecordParameters);
    await this.ocdRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};