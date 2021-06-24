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


module.exports = class ObjectQuizzesOptionsDetails
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
        this.idTbQuizzesOptions = (objParameters.hasOwnProperty("_idTbQuizzesOptions")) ? objParameters._idTbQuizzesOptions : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsQuizzesOptionsDetails = "";

        this.tblQuizzesOptionsID = "";
        this.tblQuizzesOptionsIdQuizzes = "";
        this.tblQuizzesOptionsSortOrder = 0;
        this.tblQuizzesOptionsSortOrder_print = 0;

        this.tblQuizzesOptionsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //this.tblQuizzesOptionsDateTimezone = "";
        this.tblQuizzesOptionsDateEdit = "";

        this.tblQuizzesOptionsTitle = "";
    
        this.tblQuizzesOptionsInfo1 = "";
        this.tblQuizzesOptionsInfo1_edit = "";
        this.tblQuizzesOptionsInfo2 = "";
        this.tblQuizzesOptionsInfo2_edit = "";
        this.tblQuizzesOptionsInfo3 = "";
        this.tblQuizzesOptionsInfo3_edit = "";
        this.tblQuizzesOptionsInfo4 = "";
        this.tblQuizzesOptionsInfo4_edit = "";
        this.tblQuizzesOptionsInfo5 = "";
        this.tblQuizzesOptionsInfo5_edit = "";

        this.tblQuizzesOptionsNumber1 = 0;
        this.tblQuizzesOptionsNumber1_print = "";
        this.tblQuizzesOptionsNumber2 = 0;
        this.tblQuizzesOptionsNumber2_print = "";
        this.tblQuizzesOptionsNumber3 = 0;
        this.tblQuizzesOptionsNumber3_print = "";
        this.tblQuizzesOptionsNumber4 = 0;
        this.tblQuizzesOptionsNumber4_print = "";
        this.tblQuizzesOptionsNumber5 = 0;
        this.tblQuizzesOptionsNumber5_print = "";
    
        this.tblQuizzesOptionsImageMain = "";
    
        this.tblQuizzesOptionsActivation = 0;
        this.tblQuizzesOptionsActivation_print = "";
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectQuizzesOptionsDetails();
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
            this.resultsQuizzesOptionsDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableQuizzesOptions, 
                                                                                        this.arrSearchParameters, 
                                                                                        "", 
                                                                                        "", 
                                                                                        FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableQuizzesOptions, "all", "string"), 
                                                                                        1, 
                                                                                        this.objSpecialParameters);


            //Define values.
            this.tblQuizzesOptionsID = this.resultsQuizzesOptionsDetails[0].id;
            this.tblQuizzesOptionsIdQuizzes = this.resultsQuizzesOptionsDetails[0].id_quizzes;
            this.tblQuizzesOptionsSortOrder = this.resultsQuizzesOptionsDetails[0].sort_order;
            this.tblQuizzesOptionsSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesOptionsSortOrder, gSystemConfig.configSystemCurrency, 3);
        
            this.tblQuizzesOptionsDateCreation = this.resultsQuizzesOptionsDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            //this.tblQuizzesOptionsDateTimezone = this.resultsQuizzesOptionsDetails[0].date_timezone;
            this.tblQuizzesOptionsDateEdit = this.resultsQuizzesOptionsDetails[0].date_edit;
            
            this.tblQuizzesOptionsTitle = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].title, "db");

            if(gSystemConfig.enableQuizzesOptionsInfo1 == 1)
            {
                if(gSystemConfig.configQuizzesOptionsInfo1FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo1FieldType == 2)
                {
                    this.tblQuizzesOptionsInfo1 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info1, "db");
                    this.tblQuizzesOptionsInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesOptionsInfo1FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo1FieldType == 12)
                {
                    this.tblQuizzesOptionsInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info1, "db"), 2);
                    this.tblQuizzesOptionsInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesOptionsInfo2 == 1)
            {
                if(gSystemConfig.configQuizzesOptionsInfo2FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo2FieldType == 2)
                {
                    this.tblQuizzesOptionsInfo2 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info2, "db");
                    this.tblQuizzesOptionsInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesOptionsInfo2FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo2FieldType == 12)
                {
                    this.tblQuizzesOptionsInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info2, "db"), 2);
                    this.tblQuizzesOptionsInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesOptionsInfo3 == 1)
            {
                if(gSystemConfig.configQuizzesOptionsInfo3FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo3FieldType == 2)
                {
                    this.tblQuizzesOptionsInfo3 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info3, "db");
                    this.tblQuizzesOptionsInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesOptionsInfo3FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo3FieldType == 12)
                {
                    this.tblQuizzesOptionsInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info3, "db"), 2);
                    this.tblQuizzesOptionsInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesOptionsInfo4 == 1)
            {
                if(gSystemConfig.configQuizzesOptionsInfo4FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo4FieldType == 2)
                {
                    this.tblQuizzesOptionsInfo4 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info4, "db");
                    this.tblQuizzesOptionsInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesOptionsInfo4FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo4FieldType == 12)
                {
                    this.tblQuizzesOptionsInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info4, "db"), 2);
                    this.tblQuizzesOptionsInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enableQuizzesOptionsInfo5 == 1)
            {
                if(gSystemConfig.configQuizzesOptionsInfo5FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo5FieldType == 2)
                {
                    this.tblQuizzesOptionsInfo5 = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info5, "db");
                    this.tblQuizzesOptionsInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configQuizzesOptionsInfo5FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo5FieldType == 12)
                {
                    this.tblQuizzesOptionsInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info5, "db"), 2);
                    this.tblQuizzesOptionsInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsQuizzesOptionsDetails[0].info5, "db"), 2);
                }
            }

            this.tblQuizzesOptionsNumber1 = this.resultsQuizzesOptionsDetails[0].number1;
            this.tblQuizzesOptionsNumber1_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesOptionsNumber1, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesOptionsNumber1FieldType);
            this.tblQuizzesOptionsNumber2 = this.resultsQuizzesOptionsDetails[0].number2;
            this.tblQuizzesOptionsNumber2_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesOptionsNumber2, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesOptionsNumber2FieldType);
            this.tblQuizzesOptionsNumber3 = this.resultsQuizzesOptionsDetails[0].number3;
            this.tblQuizzesOptionsNumber3_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesOptionsNumber3, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesOptionsNumber3FieldType);
            this.tblQuizzesOptionsNumber4 = this.resultsQuizzesOptionsDetails[0].number4;
            this.tblQuizzesOptionsNumber4_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesOptionsNumber4, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesOptionsNumber4FieldType);
            this.tblQuizzesOptionsNumber5 = this.resultsQuizzesOptionsDetails[0].number5;
            this.tblQuizzesOptionsNumber5_print = FunctionsGeneric.valueMaskRead(this.tblQuizzesOptionsNumber5, gSystemConfig.configSystemCurrency, gSystemConfig.configQuizzesOptionsNumber5FieldType);
            
            this.tblQuizzesOptionsImageMain = this.resultsQuizzesOptionsDetails[0].image_main; 
            
            this.tblQuizzesOptionsActivation = this.resultsQuizzesOptionsDetails[0].activation;
            if(this.tblQuizzesOptionsActivation == 0)
            {
                this.tblQuizzesOptionsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblQuizzesOptionsActivation == 1)
            {
                this.tblQuizzesOptionsActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            
                
            //Debug.
            //console.log("this.resultsQuizzesOptionsDetails[0]=", this.resultsQuizzesOptionsDetails[0]);
            //console.log("this.tblQuizzesOptionsInfoSmall1=", this.tblQuizzesOptionsInfoSmall1);
            //console.log("this.tblQuizzesOptionsInfoSmall1_edit=", this.tblQuizzesOptionsInfoSmall1_edit);
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