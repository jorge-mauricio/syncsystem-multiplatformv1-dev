"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
//const dbSystemCon = require("../config-application-db.js"); //DB.
//const SyncSystemNS = require("./syncsystem-ns.js"); //Node JS import method supported by jest.

const FunctionsGeneric = require("./functions-generic.js");
const FunctionsDB = require("./functions-db.js");
//----------------------


module.exports = class ObjectQuizzesOptionsListing
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
        /* 
        {
            _arrSearchParameters: [],
            _configSortOrder: "",
            _strNRecords: "",
            //_strReturnFields: "",
            _objSpecialParameters: {}
        };
        */

        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        this.configSortOrder = (objParameters.hasOwnProperty("_configSortOrder")) ? objParameters._configSortOrder : gSystemConfig.configQuizzesOptionsSort;
        this.strNRecords = (objParameters.hasOwnProperty("_strNRecords")) ? objParameters._strNRecords : "";
        //this.strReturnFields = (objParameters.hasOwnProperty("_strReturnFields")) ? objParameters._strReturnFields : "*";
        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsQuizzesOptionsListing = "";
        //----------------------
        

        /*
        return (async ()=> {
            await this.build();
            return this;
        })();
        */
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectQuizzesOptionsListing();
    }
    //**************************************************************************************
    

    //Get forms fields options listing according to search parameters.
    //**************************************************************************************
    //async recordsListingGet(idParent = null, terminal = 0, returnType = 1)
    /**
     * Get forms fields options listing according to search parameters.
     * @param {*} terminal 0 - backend | 1 - frontend
     * @param {*} returnType 1 - array | 3 - Json Object | 10 - html
     * @returns {json}
     */
    async recordsListingGet(terminal = 0, returnType = 1)
    //static async categoriesListingGet(idParent = null, terminal = 0, returnType = 1)
    //function categoriesListingGet(idParent = null, terminal = 0, returnType = 1)
    {
        //terminal: 0 - backend | 1 - frontend
        //returnType: 1 - array | 3 - Json Object | 10 - html

        try
        {
            //Debug.
            //console.log("objSpecialParameters", this.objSpecialParameters);
            //const note = await apnProvider.send(note, deviceToken)
            //console.log(note)


            this.resultsQuizzesOptionsListing = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableQuizzesOptions, 
                                                                                        this.arrSearchParameters, 
                                                                                        this.configSortOrder, 
                                                                                        this.strNRecords, 
                                                                                        FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableQuizzesOptions, "all", "string"), 
                                                                                        1, 
                                                                                        this.objSpecialParameters);

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