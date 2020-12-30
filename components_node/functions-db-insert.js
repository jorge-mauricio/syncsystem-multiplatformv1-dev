"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
const mysql = require("mysql"); //MySQL package.
const lodash = require("lodash"); //Utils. 

const gSystemConfig = require("../config-application.js"); //System configuration.
const dbSystemCon = require("../config-application-db.js").dbSystemCon; //DB System - simple connection.
const dbSystemConPool = require("../config-application-db.js").dbSystemConPool; //DB System - pool connection.
//const SyncSystemNS = require("./syncsystem-ns.js"); //Cause error.

const FunctionsGeneric = require("./functions-generic.js");
const FunctionsDB = require("./functions-db.js");
const FunctionsCrypto = require("./functions-crypto.js");
//----------------------


/*
ref: 
https://dzone.com/articles/how-to-interact-with-a-database-using-promises-in
https://dzone.com/articles/how-to-interact-with-a-database-using-async-functi (async)
https://stackoverflow.com/questions/36547292/use-promise-to-process-mysql-return-value-in-node-js
https://stackoverflow.com/questions/40350747/node-mysql-insert-query-with-two-values
https://stackoverflow.com/questions/49829713/async-constructor-via-static-function-but-await-doesnt-work (async)
*/
module.exports = class FunctionsDBInsert
{
    //Counter.
    //**************************************************************************************
    /**
     * Counter.
     * @static
     * @param {int} _tblCounterID 
     * @param {double} _tblCounterCounterGlobal 
     * @param {string} _tblCounterDescription 
     * @returns {boolean} Returns `true` if data was inserted, else `false`.
     * @example
     * SyncSystemNS.FunctionsDBInsert.insertCounter(99, 1000,"Insert record testing");
     */
    static counterInsert(_tblCounterID, 
                        _tblCounterCounterGlobal,
                        _tblCounterDescription)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblCounterID = "";
        let tblCounterCounterGlobal = "";
        //let tblCounterDescription = "";
        let tblCounterDescription = "";
        

        let strSQLCounterInsert = "";
        //let strSQLCounterInsertParams = [];
        let strSQLCounterInsertParams = {};
        //let resultsSQLCounterInsert = null;
        //----------------------


        //Variables - values.
        //----------------------
        tblCounterID = _tblCounterID;
        tblCounterCounterGlobal = _tblCounterCounterGlobal;

        tblCounterDescription = _tblCounterDescription;
        if(tblCounterDescription != "")
        {
            //tblCounterDescription = SyncSystemNS.FunctionsGeneric.contentMaskWrite(tblCounterDescription);
            tblCounterDescription = FunctionsGeneric.contentMaskWrite(tblCounterDescription, "db_write_text");
            //tblCounterDescription = this.FunctionsGeneric.contentMaskWrite(tblCounterDescription);
        }
        //----------------------


        //Query.
        //----------------------
        //strSQLCounterInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter";
        strSQLCounterInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCounter;
        
        /*
        strSQLCounterInsert += " SET";
        strSQLCounterInsert += " id = ?,";
        strSQLCounterInsert += " counter_global = ?,";
        strSQLCounterInsert += " description = ?";
        */

        /*
        strSQLCounterInsert += " SET";
        strSQLCounterInsert += " id = :id,";
        strSQLCounterInsert += " counter_global = :counter_global,";
        strSQLCounterInsert += " description = :description";
        */

        strSQLCounterInsert += " SET ?";
        
        /*
        strSQLCounterInsert += "(";
        strSQLCounterInsert += "id, ";
        strSQLCounterInsert += "counter_global, ";
        strSQLCounterInsert += "description";
        strSQLCounterInsert += ")";
        */

        //strSQLCounterInsert += " VALUES ? ";
        //strSQLCounterInsert += " VALUES (99, 1000, 'teste') "; //debug
        //console.log("strSQLCounterInsert=" + strSQLCounterInsert); //debug
        //----------------------


        //Parameters.
        //----------------------
        /*strSQLCounterInsertParams = [
            _tblCounterID, 
            _tblCounterCounterGlobal, 
            _tblCounterDescription
        ]*/
        /*
        strSQLCounterInsertParams.push(tblCounterID);
        strSQLCounterInsertParams.push(tblCounterCounterGlobal);
        strSQLCounterInsertParams.push(tblCounterDescription);
        */

        /*
        strSQLCounterInsertParams = {
            id: tblCounterID,
            counter_global: tblCounterCounterGlobal,
            description: tblCounterDescription
        }; //working
        */
        strSQLCounterInsertParams.id = tblCounterID;
        strSQLCounterInsertParams.counter_global = tblCounterCounterGlobal;
        strSQLCounterInsertParams.description = tblCounterDescription;

        //console.log("strSQLCounterInsertParams="); //debug
        //console.log(strSQLCounterInsertParams); //debug
        //----------------------


        //Execute query.
        //----------------------
        //Promise method.
        return new Promise((resolve, reject) => {

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection) {
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    dbSystemConPoolGetConnection.query(strSQLCounterInsert, strSQLCounterInsertParams, (dbSystemError, resultsSQLCounterInsert) => { //working
                    //dbSystemCon.query(strSQLCounterInsert, strSQLCounterInsertParams, (dbSystemError, resultsSQLCounterInsert) => { //working
                    //dbSystemCon.query(strSQLCounterInsert, (dbSystemError, resultsSQLCounterInsert) => { //debug
                        dbSystemConPoolGetConnection.release();
                        
                        if(dbSystemError)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                            }
                            
                            throw dbSystemError;
                        }else{
                            //Set success flag.
                            strReturn = true;
        
        
                            if(resultsSQLCounterInsert)
                            {
                                //Success.
        
                                //Return promise.
                                resolve(strReturn);
                            }else{
                                //Error.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                                }
                                
                                //reject(new Error(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3")));
                                reject(false);
                            }
                                
        
                            //Debug.
                            //resolve(resultsSQLCounterRows);
                            //resolve(nCounter);
                            //resolve(json(resultsSQLCounterRows));//working: returns [ RowDataPacket { id: 1, counter_global: 123, description: 'Node database test' } ]
                        }
                    });
            
                }
            });

        });        
        //----------------------


        //Usage.
        //----------------------
        /*
        let insertCounterResult = false;
        SyncSystemNS.FunctionsDBInsert.insertCounter(99, 
            1000,
            "Insert testing")
            .then(function(pResults){
                //render(results)
                //console.log(pResults);
                insertCounterResult = pResults;
            })
            .catch(function(pError){
                console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3"), pError);
            });
        */
        //----------------------
    }
    //**************************************************************************************


    //Categories - insert record.
    //**************************************************************************************
    //static async categoriesInsert_async(_tblCategoriesID, _tblCategoriesDataObject)
    /**
     * Categories - insert record.
     * @static
     * @async
     * @param {object} _tblCategoriesDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async categoriesInsert_async(_tblCategoriesDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblCategoriesDataObject = {};

        //Details - default values.
        let tblCategoriesID = "";
        let tblCategoriesIdParent = 0;
        let tblCategoriesSortOrder = 0;
        let tblCategoriesCategoryType = "";

        let tblCategoriesDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblCategoriesDateTimezone = "";
        let tblCategoriesDateEdit = "";

        let tblCategoriesIdRegisterUser = 0;
        let tblCategoriesIdRegister1 = 0;
        let tblCategoriesIdRegister2 = 0;
        let tblCategoriesIdRegister3 = 0;
        let tblCategoriesIdRegister4 = 0;
        let tblCategoriesIdRegister5 = 0;

        let tblCategoriesTitle = "";
        let tblCategoriesDescription = "";

        let tblCategoriesURLAlias = "";
        let tblCategoriesKeywordsTags = "";
        let tblCategoriesMetaDescription = "";
        let tblCategoriesMetaTitle = "";
        let tblCategoriesMetaInfo = "";

        let tblCategoriesInfo1 = "";
        let tblCategoriesInfo2 = "";
        let tblCategoriesInfo3 = "";
        let tblCategoriesInfo4 = "";
        let tblCategoriesInfo5 = "";
        let tblCategoriesInfo6 = "";
        let tblCategoriesInfo7 = "";
        let tblCategoriesInfo8 = "";
        let tblCategoriesInfo9 = "";
        let tblCategoriesInfo10 = "";

        let tblCategoriesInfoSmall1 = "";
        let tblCategoriesInfoSmall2 = "";
        let tblCategoriesInfoSmall3 = "";
        let tblCategoriesInfoSmall4 = "";
        let tblCategoriesInfoSmall5 = "";

        let tblCategoriesNumber1 = 0;
        let tblCategoriesNumber2 = 0;
        let tblCategoriesNumber3 = 0;
        let tblCategoriesNumber4 = 0;
        let tblCategoriesNumber5 = 0;

        let tblCategoriesNumberSmall1 = 0;
        let tblCategoriesNumberSmall2 = 0;
        let tblCategoriesNumberSmall3 = 0;
        let tblCategoriesNumberSmall4 = 0;
        let tblCategoriesNumberSmall5 = 0;
        
        let tblCategoriesDate1 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //let tblCategoriesDate1 = null, tblCategoriesDate1Hour = "00", tblCategoriesDate1Minute = "00", tblCategoriesDate1Seconds = "00", tblCategoriesDate1Day = "", tblCategoriesDate1Month = "", tblCategoriesDate1Year = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        
        let tblCategoriesDate2 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblCategoriesDate3 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblCategoriesDate4 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblCategoriesDate5 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd

        let tblCategoriesIdItem1 = 0;
        let tblCategoriesIdItem2 = 0;
        let tblCategoriesIdItem3 = 0;
        let tblCategoriesIdItem4 = 0;
        let tblCategoriesIdItem5 = 0;

        let tblCategoriesImageMain = "";
        let tblCategoriesFile1 = "";
        let tblCategoriesFile2 = "";
        let tblCategoriesFile3 = "";
        let tblCategoriesFile4 = "";
        let tblCategoriesFile5 = "";

        let tblCategoriesActivation = 1;
        let tblCategoriesActivation1 = 0;
        let tblCategoriesActivation2 = 0;
        let tblCategoriesActivation3 = 0;
        let tblCategoriesActivation4 = 0;
        let tblCategoriesActivation5 = 0;
        
        let tblCategoriesIdStatus = 0;
        let tblCategoriesRestrictedAccess = 0;

        let tblCategoriesNotes = "";

        let arrIdsCategoriesFiltersGeneric1 = [];
        let arrIdsCategoriesFiltersGeneric2 = [];
        let arrIdsCategoriesFiltersGeneric3 = [];
        let arrIdsCategoriesFiltersGeneric4 = [];
        let arrIdsCategoriesFiltersGeneric5 = [];
        let arrIdsCategoriesFiltersGeneric6 = [];
        let arrIdsCategoriesFiltersGeneric7 = [];
        let arrIdsCategoriesFiltersGeneric8 = [];
        let arrIdsCategoriesFiltersGeneric9 = [];
        let arrIdsCategoriesFiltersGeneric10 = [];
        
        let strSQLCategoriesInsert = "";
        let strSQLCategoriesInsertParams = {};
        let resultsSQLCategoriesInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblCategoriesDataObject = _tblCategoriesDataObject;
        
        tblCategoriesID = tblCategoriesDataObject._tblCategoriesID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblCategoriesID == "" || tblCategoriesID === null || tblCategoriesID === undefined)
        {
            tblCategoriesID = await new Promise((resolve, reject)=>{
                FunctionsDB.counterUniversalUpdate_async(1)
                    .then((results)=>{
                        if(results === undefined)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                            }
                            reject(new Error("nCounterUpdate is undefined."));
                        }else{
                            //Success.
                            //resolve(nCounterUpdate);
                            resolve(results);
                        } //working
        
                    });
            });
        }
        //----------------------

        //tblCategoriesIdParent = tblCategoriesDataObject._tblCategoriesIdParent;
        tblCategoriesIdParent = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdParent") === true) ? tblCategoriesDataObject._tblCategoriesIdParent : tblCategoriesIdParent;

        //tblCategoriesSortOrder = tblCategoriesDataObject._tblCategoriesSortOrder;
        tblCategoriesSortOrder = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesSortOrder") === true) ? tblCategoriesDataObject._tblCategoriesSortOrder : tblCategoriesSortOrder;
        if(!tblCategoriesSortOrder)
        {
            tblCategoriesSortOrder = 0;
        }

        tblCategoriesCategoryType = tblCategoriesDataObject._tblCategoriesCategoryType;

        //tblCategoriesDateCreation = tblCategoriesDataObject._tblCategoriesDateCreation;
        /* 
        if(tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDateCreation") === true)
        {
            tblCategoriesDateCreation = tblCategoriesDataObject._tblCategoriesDateCreation;
        }else{
            tblCategoriesDateCreation = "";
        }
        */
        //tblCategoriesDateCreation = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDateCreation")) ?  tblCategoriesDataObject._tblCategoriesDateCreation : "";
        tblCategoriesDateCreation = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDateCreation") === true) ? tblCategoriesDataObject._tblCategoriesDateCreation : tblCategoriesDateCreation; //x = condition ? true : false (default value declared)
        if(!tblCategoriesDateCreation)
        {
            let tblCategoriesDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblCategoriesDateCreation = FunctionsGeneric.dateSQLWrite(tblCategoriesDateCreation_dateObj);
        }

        tblCategoriesDateTimezone = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDateTimezone") === true) ? tblCategoriesDataObject._tblCategoriesDateTimezone : tblCategoriesDateTimezone;
        
        tblCategoriesDateEdit = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDateEdit") === true) ? tblCategoriesDataObject._tblCategoriesDateEdit : tblCategoriesDateEdit;
        if(!tblCategoriesDateEdit)
        {
            let tblCategoriesDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblCategoriesDateEdit = FunctionsGeneric.dateSQLWrite(tblCategoriesDateEdit_dateObj);
        }

        tblCategoriesIdRegisterUser = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdRegisterUser") === true) ? tblCategoriesDataObject._tblCategoriesIdRegisterUser : tblCategoriesIdRegisterUser;
        if(!tblCategoriesIdRegisterUser)
        {
            tblCategoriesIdRegisterUser = 0;
        }
        tblCategoriesIdRegister1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdRegister1") === true) ? tblCategoriesDataObject._tblCategoriesIdRegister1 : tblCategoriesIdRegister1;
        if(!tblCategoriesIdRegister1)
        {
            tblCategoriesIdRegister1 = 0;
        }
        tblCategoriesIdRegister2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdRegister2") === true) ? tblCategoriesDataObject._tblCategoriesIdRegister2 : tblCategoriesIdRegister2;
        if(!tblCategoriesIdRegister2)
        {
            tblCategoriesIdRegister2 = 0;
        }
        tblCategoriesIdRegister3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdRegister3") === true) ? tblCategoriesDataObject._tblCategoriesIdRegister3 : tblCategoriesIdRegister3;
        if(!tblCategoriesIdRegister3)
        {
            tblCategoriesIdRegister3 = 0;
        }
        tblCategoriesIdRegister4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdRegister4") === true) ? tblCategoriesDataObject._tblCategoriesIdRegister4 : tblCategoriesIdRegister4;
        if(!tblCategoriesIdRegister4)
        {
            tblCategoriesIdRegister4 = 0;
        }
        tblCategoriesIdRegister5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdRegister5") === true) ? tblCategoriesDataObject._tblCategoriesIdRegister5 : tblCategoriesIdRegister5;
        if(!tblCategoriesIdRegister5)
        {
            tblCategoriesIdRegister5 = 0;
        }

        //tblCategoriesTitle = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesTitle") === true) ? tblCategoriesDataObject._tblCategoriesTitle : tblCategoriesTitle;
        tblCategoriesTitle = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesTitle, "db_write_text") : tblCategoriesTitle;
        tblCategoriesDescription = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesDescription, "db_write_text") : tblCategoriesDescription;
        tblCategoriesURLAlias = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesURLAlias, "db_write_text") : tblCategoriesURLAlias;
        tblCategoriesKeywordsTags = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesKeywordsTags, "db_write_text") : tblCategoriesKeywordsTags;
        tblCategoriesMetaDescription = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesMetaDescription, "db_write_text") : tblCategoriesMetaDescription;
        tblCategoriesMetaTitle = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesMetaTitle, "db_write_text") : tblCategoriesMetaTitle;
        tblCategoriesMetaInfo = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesMetaInfo, "db_write_text") : tblCategoriesMetaInfo;
        
        /*
        tblCategoriesInfo1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo1, "db_write_text") : tblCategoriesInfo1;
        tblCategoriesInfo2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo2, "db_write_text") : tblCategoriesInfo2;
        tblCategoriesInfo3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo3, "db_write_text") : tblCategoriesInfo3;
        tblCategoriesInfo4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo4, "db_write_text") : tblCategoriesInfo4;
        tblCategoriesInfo5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo5, "db_write_text") : tblCategoriesInfo5;
        tblCategoriesInfo6 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo6") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo6, "db_write_text") : tblCategoriesInfo6;
        tblCategoriesInfo7 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo7") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo7, "db_write_text") : tblCategoriesInfo7;
        tblCategoriesInfo8 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo8") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo8, "db_write_text") : tblCategoriesInfo8;
        tblCategoriesInfo9 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo9") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo9, "db_write_text") : tblCategoriesInfo9;
        tblCategoriesInfo10 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo10") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo10, "db_write_text") : tblCategoriesInfo10;
        */
        if(gSystemConfig.configCategoriesInfo1FieldType == 1 || gSystemConfig.configCategoriesInfo1FieldType == 2)
        {
            tblCategoriesInfo1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo1, "db_write_text") : tblCategoriesInfo1;
        }
        if(gSystemConfig.configCategoriesInfo1FieldType == 11 || gSystemConfig.configCategoriesInfo1FieldType == 12)
        {
            tblCategoriesInfo1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo1, "db_write_text"), 2) : tblCategoriesInfo1;
        }

        if(gSystemConfig.configCategoriesInfo2FieldType == 1 || gSystemConfig.configCategoriesInfo2FieldType == 2)
        {
            tblCategoriesInfo2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo2, "db_write_text") : tblCategoriesInfo2;
        }
        if(gSystemConfig.configCategoriesInfo2FieldType == 11 || gSystemConfig.configCategoriesInfo2FieldType == 12)
        {
            tblCategoriesInfo2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo2, "db_write_text"), 2) : tblCategoriesInfo2;
        }

        if(gSystemConfig.configCategoriesInfo3FieldType == 1 || gSystemConfig.configCategoriesInfo3FieldType == 2)
        {
            tblCategoriesInfo3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo3, "db_write_text") : tblCategoriesInfo3;
        }
        if(gSystemConfig.configCategoriesInfo3FieldType == 11 || gSystemConfig.configCategoriesInfo3FieldType == 12)
        {
            tblCategoriesInfo3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo3, "db_write_text"), 2) : tblCategoriesInfo3;
        }

        if(gSystemConfig.configCategoriesInfo4FieldType == 1 || gSystemConfig.configCategoriesInfo4FieldType == 2)
        {
            tblCategoriesInfo4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo4, "db_write_text") : tblCategoriesInfo4;
        }
        if(gSystemConfig.configCategoriesInfo4FieldType == 11 || gSystemConfig.configCategoriesInfo4FieldType == 12)
        {
            tblCategoriesInfo4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo4, "db_write_text"), 2) : tblCategoriesInfo1;
        }

        if(gSystemConfig.configCategoriesInfo5FieldType == 1 || gSystemConfig.configCategoriesInfo5FieldType == 2)
        {
            tblCategoriesInfo5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo5, "db_write_text") : tblCategoriesInfo5;
        }
        if(gSystemConfig.configCategoriesInfo5FieldType == 11 || gSystemConfig.configCategoriesInfo5FieldType == 12)
        {
            tblCategoriesInfo5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo5, "db_write_text"), 2) : tblCategoriesInfo5;
        }

        if(gSystemConfig.configCategoriesInfo6FieldType == 1 || gSystemConfig.configCategoriesInfo6FieldType == 2)
        {
            tblCategoriesInfo6 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo6") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo6, "db_write_text") : tblCategoriesInfo6;
        }
        if(gSystemConfig.configCategoriesInfo6FieldType == 11 || gSystemConfig.configCategoriesInfo6FieldType == 12)
        {
            tblCategoriesInfo6 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo6") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo6, "db_write_text"), 2) : tblCategoriesInfo6;
        }

        if(gSystemConfig.configCategoriesInfo7FieldType == 1 || gSystemConfig.configCategoriesInfo7FieldType == 2)
        {
            tblCategoriesInfo7 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo7") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo7, "db_write_text") : tblCategoriesInfo7;
        }
        if(gSystemConfig.configCategoriesInfo7FieldType == 11 || gSystemConfig.configCategoriesInfo7FieldType == 12)
        {
            tblCategoriesInfo7 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo7") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo7, "db_write_text"), 2) : tblCategoriesInfo7;
        }

        if(gSystemConfig.configCategoriesInfo8FieldType == 1 || gSystemConfig.configCategoriesInfo8FieldType == 2)
        {
            tblCategoriesInfo8 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo8") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo8, "db_write_text") : tblCategoriesInfo8;
        }
        if(gSystemConfig.configCategoriesInfo8FieldType == 11 || gSystemConfig.configCategoriesInfo8FieldType == 12)
        {
            tblCategoriesInfo8 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo8") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo8, "db_write_text"), 2) : tblCategoriesInfo8;
        }

        if(gSystemConfig.configCategoriesInfo9FieldType == 1 || gSystemConfig.configCategoriesInfo9FieldType == 2)
        {
            tblCategoriesInfo9 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo9") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo9, "db_write_text") : tblCategoriesInfo9;
        }
        if(gSystemConfig.configCategoriesInfo9FieldType == 11 || gSystemConfig.configCategoriesInfo9FieldType == 12)
        {
            tblCategoriesInfo9 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo9") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo9, "db_write_text"), 2) : tblCategoriesInfo9;
        }

        if(gSystemConfig.configCategoriesInfo10FieldType == 1 || gSystemConfig.configCategoriesInfo10FieldType == 2)
        {
            tblCategoriesInfo10 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo10") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo10, "db_write_text") : tblCategoriesInfo10;
        }
        if(gSystemConfig.configCategoriesInfo10FieldType == 11 || gSystemConfig.configCategoriesInfo10FieldType == 12)
        {
            tblCategoriesInfo10 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfo10") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfo10, "db_write_text"), 2) : tblCategoriesInfo10;
        }

        tblCategoriesInfoSmall1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfoSmall1") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfoSmall1, "db_write_text") : tblCategoriesInfoSmall1;
        tblCategoriesInfoSmall2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfoSmall2") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfoSmall2, "db_write_text") : tblCategoriesInfoSmall2;
        tblCategoriesInfoSmall3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfoSmall3") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfoSmall3, "db_write_text") : tblCategoriesInfoSmall3;
        tblCategoriesInfoSmall4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfoSmall4") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfoSmall4, "db_write_text") : tblCategoriesInfoSmall4;
        tblCategoriesInfoSmall5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesInfoSmall5") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesInfoSmall5, "db_write_text") : tblCategoriesInfoSmall5;
        
        tblCategoriesNumber1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumber1") === true && (tblCategoriesDataObject._tblCategoriesNumber1)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumber1, gSystemConfig.configCategoriesNumber1FieldType) : tblCategoriesNumber1;
        tblCategoriesNumber2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumber2") === true && (tblCategoriesDataObject._tblCategoriesNumber2)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumber2, gSystemConfig.configCategoriesNumber2FieldType) : tblCategoriesNumber2;
        tblCategoriesNumber3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumber3") === true && (tblCategoriesDataObject._tblCategoriesNumber3)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumber3, gSystemConfig.configCategoriesNumber3FieldType) : tblCategoriesNumber3;
        tblCategoriesNumber4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumber4") === true && (tblCategoriesDataObject._tblCategoriesNumber4)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumber4, gSystemConfig.configCategoriesNumber4FieldType) : tblCategoriesNumber4;
        tblCategoriesNumber5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumber5") === true && (tblCategoriesDataObject._tblCategoriesNumber5)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumber5, gSystemConfig.configCategoriesNumber5FieldType) : tblCategoriesNumber5;

        tblCategoriesNumberSmall1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumberSmall1") === true && (tblCategoriesDataObject._tblCategoriesNumberSmall1)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumberSmall1, gSystemConfig.configCategoriesNumberS1FieldType) : tblCategoriesNumberSmall1;
        tblCategoriesNumberSmall2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumberSmall2") === true && (tblCategoriesDataObject._tblCategoriesNumberSmall2)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumberSmall2, gSystemConfig.configCategoriesNumberS2FieldType) : tblCategoriesNumberSmall2;
        tblCategoriesNumberSmall3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumberSmall3") === true && (tblCategoriesDataObject._tblCategoriesNumberSmall3)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumberSmall3, gSystemConfig.configCategoriesNumberS3FieldType) : tblCategoriesNumberSmall3;
        tblCategoriesNumberSmall4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumberSmall4") === true && (tblCategoriesDataObject._tblCategoriesNumberSmall4)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumberSmall4, gSystemConfig.configCategoriesNumberS4FieldType) : tblCategoriesNumberSmall4;
        tblCategoriesNumberSmall5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNumberSmall5") === true && (tblCategoriesDataObject._tblCategoriesNumberSmall5)) ? FunctionsGeneric.valueMaskWrite(tblCategoriesDataObject._tblCategoriesNumberSmall5, gSystemConfig.configCategoriesNumberS5FieldType) : tblCategoriesNumberSmall5;
        
        tblCategoriesDate1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDate1") === true && (tblCategoriesDataObject._tblCategoriesDate1)) ? FunctionsGeneric.dateSQLWrite(tblCategoriesDataObject._tblCategoriesDate1, gSystemConfig.configBackendDateFormat) : tblCategoriesDate1;
        tblCategoriesDate2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDate2") === true && (tblCategoriesDataObject._tblCategoriesDate2)) ? FunctionsGeneric.dateSQLWrite(tblCategoriesDataObject._tblCategoriesDate2, gSystemConfig.configBackendDateFormat) : tblCategoriesDate2;
        tblCategoriesDate3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDate3") === true && (tblCategoriesDataObject._tblCategoriesDate3)) ? FunctionsGeneric.dateSQLWrite(tblCategoriesDataObject._tblCategoriesDate3, gSystemConfig.configBackendDateFormat) : tblCategoriesDate3;
        tblCategoriesDate4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDate4") === true && (tblCategoriesDataObject._tblCategoriesDate4)) ? FunctionsGeneric.dateSQLWrite(tblCategoriesDataObject._tblCategoriesDate4, gSystemConfig.configBackendDateFormat) : tblCategoriesDate4;
        tblCategoriesDate5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDate5") === true && (tblCategoriesDataObject._tblCategoriesDate5)) ? FunctionsGeneric.dateSQLWrite(tblCategoriesDataObject._tblCategoriesDate5, gSystemConfig.configBackendDateFormat) : tblCategoriesDate5;
        
        tblCategoriesIdItem1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdItem1") === true && (tblCategoriesDataObject._tblCategoriesIdItem1)) ? tblCategoriesDataObject._tblCategoriesIdItem1 : tblCategoriesIdItem1;
        tblCategoriesIdItem2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdItem2") === true && (tblCategoriesDataObject._tblCategoriesIdItem2)) ? tblCategoriesDataObject._tblCategoriesIdItem2 : tblCategoriesIdItem2;
        tblCategoriesIdItem3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdItem3") === true && (tblCategoriesDataObject._tblCategoriesIdItem3)) ? tblCategoriesDataObject._tblCategoriesIdItem3 : tblCategoriesIdItem3;
        tblCategoriesIdItem4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdItem4") === true && (tblCategoriesDataObject._tblCategoriesIdItem4)) ? tblCategoriesDataObject._tblCategoriesIdItem4 : tblCategoriesIdItem4;
        tblCategoriesIdItem5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdItem5") === true && (tblCategoriesDataObject._tblCategoriesIdItem5)) ? tblCategoriesDataObject._tblCategoriesIdItem5 : tblCategoriesIdItem5;
        
        tblCategoriesImageMain = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesImageMain") === true) ? tblCategoriesDataObject._tblCategoriesImageMain : tblCategoriesImageMain;
        tblCategoriesFile1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesFile1") === true) ? tblCategoriesDataObject._tblCategoriesFile1 : tblCategoriesFile1;
        tblCategoriesFile2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesFile2") === true) ? tblCategoriesDataObject._tblCategoriesFile2 : tblCategoriesFile2;
        tblCategoriesFile3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesFile3") === true) ? tblCategoriesDataObject._tblCategoriesFile3 : tblCategoriesFile3;
        tblCategoriesFile4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesFile4") === true) ? tblCategoriesDataObject._tblCategoriesFile4 : tblCategoriesFile4;
        tblCategoriesFile5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesFile5") === true) ? tblCategoriesDataObject._tblCategoriesFile5 : tblCategoriesFile5;
        
        tblCategoriesActivation = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesActivation") === true && (tblCategoriesDataObject._tblCategoriesActivation)) ? tblCategoriesDataObject._tblCategoriesActivation : tblCategoriesActivation;
        tblCategoriesActivation1 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesActivation1") === true && (tblCategoriesDataObject._tblCategoriesActivation1)) ? tblCategoriesDataObject._tblCategoriesActivation1 : tblCategoriesActivation1;
        tblCategoriesActivation2 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesActivation2") === true && (tblCategoriesDataObject._tblCategoriesActivation2)) ? tblCategoriesDataObject._tblCategoriesActivation2 : tblCategoriesActivation2;
        tblCategoriesActivation3 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesActivation3") === true && (tblCategoriesDataObject._tblCategoriesActivation3)) ? tblCategoriesDataObject._tblCategoriesActivation3 : tblCategoriesActivation3;
        tblCategoriesActivation4 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesActivation5") === true && (tblCategoriesDataObject._tblCategoriesActivation4)) ? tblCategoriesDataObject._tblCategoriesActivation4 : tblCategoriesActivation5;
        tblCategoriesActivation5 = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesActivation5") === true && (tblCategoriesDataObject._tblCategoriesActivation5)) ? tblCategoriesDataObject._tblCategoriesActivation5 : tblCategoriesActivation5;
        
        tblCategoriesIdStatus = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdStatus") === true && (tblCategoriesDataObject._tblCategoriesIdStatus)) ? tblCategoriesDataObject._tblCategoriesIdStatus : tblCategoriesIdStatus;
        tblCategoriesRestrictedAccess = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesRestrictedAccess") === true && (tblCategoriesDataObject._tblCategoriesRestrictedAccess)) ? tblCategoriesDataObject._tblCategoriesRestrictedAccess : tblCategoriesRestrictedAccess;
        
        //tblCategoriesNotes = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNotes") === true) ? tblCategoriesDataObject._tblCategoriesNotes : tblCategoriesNotes;
        tblCategoriesNotes = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesNotes, "db_write_text") : tblCategoriesNotes;
        
        arrIdsCategoriesFiltersGeneric1 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric1") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric1)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric1 : arrIdsCategoriesFiltersGeneric1;
        arrIdsCategoriesFiltersGeneric2 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric2") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric2)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric2 : arrIdsCategoriesFiltersGeneric2;
        arrIdsCategoriesFiltersGeneric3 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric3") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric3)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric3 : arrIdsCategoriesFiltersGeneric3;
        arrIdsCategoriesFiltersGeneric4 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric4") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric4)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric4 : arrIdsCategoriesFiltersGeneric4;
        arrIdsCategoriesFiltersGeneric5 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric5") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric5)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric5 : arrIdsCategoriesFiltersGeneric5;
        arrIdsCategoriesFiltersGeneric6 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric6") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric6)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric6 : arrIdsCategoriesFiltersGeneric6;
        arrIdsCategoriesFiltersGeneric5 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric5") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric5)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric5 : arrIdsCategoriesFiltersGeneric5;
        arrIdsCategoriesFiltersGeneric6 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric6") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric6)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric6 : arrIdsCategoriesFiltersGeneric6;
        arrIdsCategoriesFiltersGeneric7 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric7") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric7)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric7 : arrIdsCategoriesFiltersGeneric7;
        arrIdsCategoriesFiltersGeneric8 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric8") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric8)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric8 : arrIdsCategoriesFiltersGeneric8;
        arrIdsCategoriesFiltersGeneric9 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric9") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric9)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric9 : arrIdsCategoriesFiltersGeneric9;
        arrIdsCategoriesFiltersGeneric10 = (tblCategoriesDataObject.hasOwnProperty("_arrIdsCategoriesFiltersGeneric10") === true && (tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric10)) ? tblCategoriesDataObject._arrIdsCategoriesFiltersGeneric10 : arrIdsCategoriesFiltersGeneric10;
        //----------------------


        //Debug.
        //console.log("tblCategoriesDataObject=", tblCategoriesDataObject);
        //console.log("tblCategoriesSortOrder=", tblCategoriesSortOrder);
        //console.log("tblCategoriesDataObject._tblCategoriesSortOrder=", tblCategoriesDataObject._tblCategoriesSortOrder);
        //console.log("tblCategoriesDataObject._tblCategoriesCategoryType=", tblCategoriesDataObject._tblCategoriesCategoryType);

        //console.log("tblCategoriesDateCreation=", tblCategoriesDateCreation);
        //console.log("tblCategoriesDataObject._tblCategoriesDateCreation=", tblCategoriesDataObject._tblCategoriesDateCreation);
        
        //console.log("tblCategoriesNumber1=", tblCategoriesNumber1);
        //console.log("tblCategoriesDataObject._tblCategoriesNumber1=", tblCategoriesDataObject._tblCategoriesNumber1);

        //return "debug";


        //if(String(_tblCategoriesID) === "" || isNaN(_tblCategoriesID)) //check if data is not a string text
        //{
        //}


        //Query.
        //----------------------
        //strSQLCategoriesInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLCategoriesInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCategories + " ";
        strSQLCategoriesInsert += "SET ?";
        //----------------------


        //Parameters.
        //----------------------
        strSQLCategoriesInsertParams.id = tblCategoriesID;
        strSQLCategoriesInsertParams.id_parent = tblCategoriesIdParent;
        strSQLCategoriesInsertParams.sort_order = tblCategoriesSortOrder;
        strSQLCategoriesInsertParams.category_type = tblCategoriesCategoryType;

        strSQLCategoriesInsertParams.date_creation = tblCategoriesDateCreation;
        strSQLCategoriesInsertParams.date_timezone = tblCategoriesDateTimezone;
        strSQLCategoriesInsertParams.date_edit = tblCategoriesDateEdit;

        strSQLCategoriesInsertParams.id_register_user = tblCategoriesIdRegisterUser;
        strSQLCategoriesInsertParams.id_register1 = tblCategoriesIdRegister1;
        strSQLCategoriesInsertParams.id_register2 = tblCategoriesIdRegister2;
        strSQLCategoriesInsertParams.id_register3 = tblCategoriesIdRegister3;
        strSQLCategoriesInsertParams.id_register4 = tblCategoriesIdRegister4;
        strSQLCategoriesInsertParams.id_register5 = tblCategoriesIdRegister5;

        strSQLCategoriesInsertParams.title = tblCategoriesTitle;
        strSQLCategoriesInsertParams.description = tblCategoriesDescription;
        strSQLCategoriesInsertParams.url_alias = tblCategoriesURLAlias;
        strSQLCategoriesInsertParams.keywords_tags = tblCategoriesKeywordsTags;
        strSQLCategoriesInsertParams.meta_description = tblCategoriesMetaDescription;
        strSQLCategoriesInsertParams.meta_title = tblCategoriesMetaTitle;
        strSQLCategoriesInsertParams.meta_info = tblCategoriesMetaInfo;

        strSQLCategoriesInsertParams.info1 = tblCategoriesInfo1;
        strSQLCategoriesInsertParams.info2 = tblCategoriesInfo2;
        strSQLCategoriesInsertParams.info3 = tblCategoriesInfo3;
        strSQLCategoriesInsertParams.info4 = tblCategoriesInfo4;
        strSQLCategoriesInsertParams.info5 = tblCategoriesInfo5;
        strSQLCategoriesInsertParams.info6 = tblCategoriesInfo6;
        strSQLCategoriesInsertParams.info7 = tblCategoriesInfo7;
        strSQLCategoriesInsertParams.info8 = tblCategoriesInfo8;
        strSQLCategoriesInsertParams.info9 = tblCategoriesInfo9;
        strSQLCategoriesInsertParams.info10 = tblCategoriesInfo10;

        strSQLCategoriesInsertParams.info_small1 = tblCategoriesInfoSmall1;
        strSQLCategoriesInsertParams.info_small2 = tblCategoriesInfoSmall2;
        strSQLCategoriesInsertParams.info_small3 = tblCategoriesInfoSmall3;
        strSQLCategoriesInsertParams.info_small4 = tblCategoriesInfoSmall4;
        strSQLCategoriesInsertParams.info_small5 = tblCategoriesInfoSmall5;

        strSQLCategoriesInsertParams.number1 = tblCategoriesNumber1;
        strSQLCategoriesInsertParams.number2 = tblCategoriesNumber2;
        strSQLCategoriesInsertParams.number3 = tblCategoriesNumber3;
        strSQLCategoriesInsertParams.number4 = tblCategoriesNumber4;
        strSQLCategoriesInsertParams.number5 = tblCategoriesNumber5;

        strSQLCategoriesInsertParams.number_small1 = tblCategoriesNumberSmall1;
        strSQLCategoriesInsertParams.number_small2 = tblCategoriesNumberSmall2;
        strSQLCategoriesInsertParams.number_small3 = tblCategoriesNumberSmall3;
        strSQLCategoriesInsertParams.number_small4 = tblCategoriesNumberSmall4;
        strSQLCategoriesInsertParams.number_small5 = tblCategoriesNumberSmall5;

        strSQLCategoriesInsertParams.date1 = tblCategoriesDate1;
        strSQLCategoriesInsertParams.date2 = tblCategoriesDate2;
        strSQLCategoriesInsertParams.date3 = tblCategoriesDate3;
        strSQLCategoriesInsertParams.date4 = tblCategoriesDate4;
        strSQLCategoriesInsertParams.date5 = tblCategoriesDate5;
        
        strSQLCategoriesInsertParams.id_item1 = tblCategoriesIdItem1;
        strSQLCategoriesInsertParams.id_item2 = tblCategoriesIdItem2;
        strSQLCategoriesInsertParams.id_item3 = tblCategoriesIdItem3;
        strSQLCategoriesInsertParams.id_item4 = tblCategoriesIdItem4;
        strSQLCategoriesInsertParams.id_item5 = tblCategoriesIdItem5;
        
        strSQLCategoriesInsertParams.image_main = tblCategoriesImageMain;
        strSQLCategoriesInsertParams.file1 = tblCategoriesFile1;
        strSQLCategoriesInsertParams.file2 = tblCategoriesFile2;
        strSQLCategoriesInsertParams.file3 = tblCategoriesFile3;
        strSQLCategoriesInsertParams.file4 = tblCategoriesFile4;
        strSQLCategoriesInsertParams.file5 = tblCategoriesFile5;

        strSQLCategoriesInsertParams.activation = tblCategoriesActivation;
        strSQLCategoriesInsertParams.activation1 = tblCategoriesActivation1;
        strSQLCategoriesInsertParams.activation2 = tblCategoriesActivation2;
        strSQLCategoriesInsertParams.activation3 = tblCategoriesActivation3;
        strSQLCategoriesInsertParams.activation4 = tblCategoriesActivation4;
        strSQLCategoriesInsertParams.activation5 = tblCategoriesActivation5;
        
        strSQLCategoriesInsertParams.id_status = tblCategoriesIdStatus;
        strSQLCategoriesInsertParams.restricted_access = tblCategoriesRestrictedAccess;

        strSQLCategoriesInsertParams.notes = tblCategoriesNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLCategoriesInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLCategoriesInsert, strSQLCategoriesInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLCategoriesInsert, strSQLCategoriesInsertParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.release();

                        if(dbSystemError)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                            }
        
                            throw dbSystemError;
                        }else{
                            //Set success flag.
                            //strReturn = true;
        
                            if(results)
                            {
                                //Success.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage2"));
                                }
                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3")));
                            }
                                
        
                            //Debug.
                            //resolve(resultsSQLCounterRows);
                            //resolve(nCounter);
                            //resolve(json(resultsSQLCounterRows));//working: returns [ RowDataPacket { id: 1, counter_global: 123, description: 'Node database test' } ]
                        }
                    });
        
                }
            });
            
        });
        //----------------------


        //Return data treatment.
        //----------------------
        //resultsSQLCategoriesInsert object ex: 
        /*
        OkPacket {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 
        }
        */
        if(resultsSQLCategoriesInsert.affectedRows > 0)
        {
            //Record filters generic.
            //OPTIMIZE: make only one insert with multiple records

            //Filters generic 1 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric1)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric1.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric1[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 101,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });

                        //console.log("arrIdsCategoriesFiltersGeneric1[]=", arrIdsCategoriesFiltersGeneric1[countArray]);
                    }
                }
            }

            //Filters generic 2 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric2)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric2.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric2[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 102,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 3 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric3 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric3)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric3.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric3[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 103,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 4 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric4 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric4)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric4.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric4[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 104,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 5 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric5 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric5)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric5.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric5[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 105,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 6 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric6 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric6)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric6.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric6[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 106,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 7 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric7 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric7)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric7.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric7[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 107,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 8 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric8 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric8)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric8.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric8[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 108,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 9 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric9 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric9)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric9.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric9[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 109,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 10 - record.
            if(gSystemConfig.enableCategoriesFilterGeneric10 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric10)
                {
                    for(let countArray = 0; countArray < arrIdsCategoriesFiltersGeneric10.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric10[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 110,
                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }


            strReturn = true;
        }
        //----------------------


        //Debug.
        //return tblCategoriesID;
        //return resultsSQLCategoriesInsert;


        return strReturn;


        //Usage.
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
                let categoriesInsertResult = await SyncSystemNS.FunctionsDBInsert.categoriesInsert_async({
                    _tblCategoriesIdParent: "0",
                    _tblCategoriesSortOrder: "6",
                    _tblCategoriesCategoryType: "2",
                    _tblCategoriesDateCreation: "",
                    _tblCategoriesDateTimezone: "",
                    _tblCategoriesDateEdit: "",
                    _tblCategoriesIdRegisterUser: "0",
                    _tblCategoriesIdRegister1: "0",
                    _tblCategoriesIdRegister2: "0",
                    _tblCategoriesIdRegister3: "0",
                    _tblCategoriesIdRegister4: "0",
                    _tblCategoriesIdRegister5: "0",
                    _tblCategoriesTitle: "Category insert test",
                    _tblCategoriesDescription: "",
                    _tblCategoriesURLAlias: "",
                    _tblCategoriesKeywordsTags: "",
                    _tblCategoriesMetaDescription: "",
                    _tblCategoriesMetaTitle: "",
                    _tblCategoriesMetaInfo: "",
                    _tblCategoriesInfo1: "",
                    _tblCategoriesInfo2: "",
                    _tblCategoriesInfo3: "",
                    _tblCategoriesInfo4: "",
                    _tblCategoriesInfo5: "",
                    _tblCategoriesInfo6: "",
                    _tblCategoriesInfo7: "",
                    _tblCategoriesInfo8: "",
                    _tblCategoriesInfo9: "",
                    _tblCategoriesInfo10: "",
                    _tblCategoriesInfoSmall1: "",
                    _tblCategoriesInfoSmall2: "",
                    _tblCategoriesInfoSmall3: "",
                    _tblCategoriesInfoSmall4: "",
                    _tblCategoriesInfoSmall5: "",
                    _tblCategoriesNumber1: "",
                    _tblCategoriesNumber2: "",
                    _tblCategoriesNumber3: "",
                    _tblCategoriesNumber4: "",
                    _tblCategoriesNumber5: "",
                    _tblCategoriesNumberSmall1: "",
                    _tblCategoriesNumberSmall2: "",
                    _tblCategoriesNumberSmall3: "",
                    _tblCategoriesNumberSmall4: "",
                    _tblCategoriesNumberSmall5: "",
                    _tblCategoriesDate1: "",
                    _tblCategoriesDate2: "",
                    _tblCategoriesDate3: "",
                    _tblCategoriesDate4: "",
                    _tblCategoriesDate5: "",
                    _tblCategoriesIdItem1: "",
                    _tblCategoriesIdItem2: "",
                    _tblCategoriesIdItem3: "",
                    _tblCategoriesIdItem4: "",
                    _tblCategoriesIdItem5: "",
                    _tblCategoriesImageMain: "",
                    _tblCategoriesFile1: "",
                    _tblCategoriesFile2: "",
                    _tblCategoriesFile3: "",
                    _tblCategoriesFile4: "",
                    _tblCategoriesFile5: "",
                    _tblCategoriesActivation: "1",
                    _tblCategoriesActivation1: "0",
                    _tblCategoriesActivation2: "0",
                    _tblCategoriesActivation3: "0",
                    _tblCategoriesActivation4: "0",
                    _tblCategoriesActivation5: "0",
                    _tblCategoriesIdStatus: "0",
                    _tblCategoriesRestrictedAccess: "0",
                    _tblCategoriesNotes: ""
                });
                
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */
        //----------------------


        //Usage.
        //----------------------
        //----------------------
    }
    //**************************************************************************************


    //Files - insert record.
    //**************************************************************************************
    /**
     * Files - insert record.
     * @static
     * @async
     * @param {object} _tblFilesDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async filesInsert_async(_tblFilesDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblFilesDataObject = {};

        //Details - default values.
        let tblFilesID = "";
        let tblFilesIdParent = 0;
        let tblFilesSortOrder = 0;
        let tblFilesFileType = 0;
        let tblFilesFileConfig = 0;

        let tblFilesDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFilesDateTimezone = "";
        let tblFilesDateEdit = "";

        let tblFilesTitle = "";
        let tblFilesCaption = "";
        let tblFilesDescription = "";
        let tblFilesHTMLCode = "";

        let tblFilesURLAlias = "";
        let tblFilesKeywordsTags = "";
        let tblFilesMetaDescription = "";
        let tblFilesMetaTitle = "";
        let tblFilesMetaInfo = "";

        let tblFilesInfo1 = "";
        let tblFilesInfo2 = "";
        let tblFilesInfo3 = "";
        let tblFilesInfo4 = "";
        let tblFilesInfo5 = "";

        let tblFilesInfoSmall1 = "";
        let tblFilesInfoSmall2 = "";
        let tblFilesInfoSmall3 = "";
        let tblFilesInfoSmall4 = "";
        let tblFilesInfoSmall5 = "";

        let tblFilesNumber1 = 0;
        let tblFilesNumber2 = 0;
        let tblFilesNumber3 = 0;
        let tblFilesNumber4 = 0;
        let tblFilesNumber5 = 0;

        let tblFilesNumberSmall1 = 0;
        let tblFilesNumberSmall2 = 0;
        let tblFilesNumberSmall3 = 0;
        let tblFilesNumberSmall4 = 0;
        let tblFilesNumberSmall5 = 0;

        let tblFilesDate1 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFilesDate2 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFilesDate3 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFilesDate4 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFilesDate5 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd

        let tblFilesFile = "";
        let tblFilesFileSize = "";
        let tblFilesFileDuration = "";
        let tblFilesFileDimensions = "";
        let tblFilesFileOriginalName = "";
        let tblFilesFileThumbnail = "";

        let tblFilesFile1 = "";
        let tblFilesFile2 = "";
        let tblFilesFile3 = "";
        let tblFilesFile4 = "";
        let tblFilesFile5 = "";

        let tblFilesActivation = 1;
        let tblFilesActivation1 = 0;
        let tblFilesActivation2 = 0;
        let tblFilesActivation3 = 0;
        let tblFilesActivation4 = 0;
        let tblFilesActivation5 = 0;

        let tblFilesNotes = "";

        let strSQLFilesInsert = "";
        let strSQLFilesInsertParams = {};
        let resultsSQLFilesInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblFilesDataObject = _tblFilesDataObject;
        
        tblFilesID = tblFilesDataObject._tblFilesID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblFilesID == "" || tblFilesID === null || tblFilesID === undefined)
        {
            tblFilesID = await new Promise((resolve, reject)=>{
                FunctionsDB.counterUniversalUpdate_async(1)
                    .then((results)=>{
                        if(results === undefined)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                            }
                            reject(new Error("nCounterUpdate is undefined."));
                        }else{
                            //Success.
                            //resolve(nCounterUpdate);
                            resolve(results);
                        } //working
        
                    });
            });
        }
        //----------------------
        tblFilesIdParent = (tblFilesDataObject.hasOwnProperty("_tblFilesIdParent") === true) ? tblFilesDataObject._tblFilesIdParent : tblFilesIdParent;
        tblFilesSortOrder = (tblFilesDataObject.hasOwnProperty("_tblFilesSortOrder") === true) ? tblFilesDataObject._tblFilesSortOrder : tblFilesSortOrder;
        if(!tblFilesSortOrder)
        {
            tblFilesSortOrder = 0;
        }

        tblFilesFileType = tblFilesDataObject._tblFilesFileType;
        tblFilesFileConfig = tblFilesDataObject._tblFilesFileConfig;

        tblFilesDateCreation = (tblFilesDataObject.hasOwnProperty("_tblFilesDateCreation") === true) ? tblFilesDataObject._tblFilesDateCreation : tblFilesDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFilesDateCreation)
        {
            let tblFilesDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFilesDateCreation = FunctionsGeneric.dateSQLWrite(tblFilesDateCreation_dateObj);
        }

        tblFilesDateTimezone = (tblFilesDataObject.hasOwnProperty("_tblFilesDateTimezone") === true) ? tblFilesDataObject._tblFilesDateTimezone : tblFilesDateTimezone;
        
        tblFilesDateEdit = (tblFilesDataObject.hasOwnProperty("_tblFilesDateEdit") === true) ? tblFilesDataObject._tblFilesDateEdit : tblFilesDateEdit;
        if(!tblFilesDateEdit)
        {
            let tblFilesDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFilesDateEdit = FunctionsGeneric.dateSQLWrite(tblFilesDateEdit_dateObj);
        }

        tblFilesTitle = (tblFilesDataObject.hasOwnProperty("_tblFilesTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesTitle, "db_write_text") : tblFilesTitle;
        tblFilesCaption = (tblFilesDataObject.hasOwnProperty("_tblFilesCaption") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesCaption, "db_write_text") : tblFilesCaption;
        tblFilesDescription = (tblFilesDataObject.hasOwnProperty("_tblFilesDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesDescription, "db_write_text") : tblFilesDescription;
        tblFilesHTMLCode = (tblFilesDataObject.hasOwnProperty("_tblFilesHTMLCode") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesHTMLCode, "db_write_text") : tblFilesHTMLCode;
        
        tblFilesURLAlias = (tblFilesDataObject.hasOwnProperty("_tblFilesURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesURLAlias, "db_write_text") : tblFilesURLAlias;
        tblFilesKeywordsTags = (tblFilesDataObject.hasOwnProperty("_tblFilesKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesKeywordsTags, "db_write_text") : tblFilesKeywordsTags;
        tblFilesMetaDescription = (tblFilesDataObject.hasOwnProperty("_tblFilesMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesMetaDescription, "db_write_text") : tblFilesMetaDescription;
        tblFilesMetaTitle = (tblFilesDataObject.hasOwnProperty("_tblFilesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesMetaTitle, "db_write_text") : tblFilesMetaTitle;
        tblFilesMetaInfo = (tblFilesDataObject.hasOwnProperty("_tblFilesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesMetaInfo, "db_write_text") : tblFilesMetaInfo;
        
        if(gSystemConfig.configFilesInfo1FieldType == 1 || gSystemConfig.configFilesInfo1FieldType == 2)
        {
            tblFilesInfo1 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo1, "db_write_text") : tblFilesInfo1;
        }
        if(gSystemConfig.configFilesInfo1FieldType == 11 || gSystemConfig.configFilesInfo1FieldType == 12)
        {
            tblFilesInfo1 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo1, "db_write_text"), 2) : tblFilesInfo1;
        }

        if(gSystemConfig.configFilesInfo2FieldType == 1 || gSystemConfig.configFilesInfo2FieldType == 2)
        {
            tblFilesInfo2 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo2, "db_write_text") : tblFilesInfo2;
        }
        if(gSystemConfig.configFilesInfo2FieldType == 11 || gSystemConfig.configFilesInfo2FieldType == 12)
        {
            tblFilesInfo2 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo2, "db_write_text"), 2) : tblFilesInfo2;
        }

        if(gSystemConfig.configFilesInfo3FieldType == 1 || gSystemConfig.configFilesInfo3FieldType == 2)
        {
            tblFilesInfo3 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo3, "db_write_text") : tblFilesInfo3;
        }
        if(gSystemConfig.configFilesInfo3FieldType == 11 || gSystemConfig.configFilesInfo3FieldType == 12)
        {
            tblFilesInfo3 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo3, "db_write_text"), 2) : tblFilesInfo3;
        }

        if(gSystemConfig.configFilesInfo4FieldType == 1 || gSystemConfig.configFilesInfo4FieldType == 2)
        {
            tblFilesInfo4 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo4, "db_write_text") : tblFilesInfo4;
        }
        if(gSystemConfig.configFilesInfo4FieldType == 11 || gSystemConfig.configFilesInfo4FieldType == 12)
        {
            tblFilesInfo4 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo4, "db_write_text"), 2) : tblFilesInfo1;
        }

        if(gSystemConfig.configFilesInfo5FieldType == 1 || gSystemConfig.configFilesInfo5FieldType == 2)
        {
            tblFilesInfo5 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo5, "db_write_text") : tblFilesInfo5;
        }
        if(gSystemConfig.configFilesInfo5FieldType == 11 || gSystemConfig.configFilesInfo5FieldType == 12)
        {
            tblFilesInfo5 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo5, "db_write_text"), 2) : tblFilesInfo5;
        }

        if(gSystemConfig.configFilesInfo6FieldType == 1 || gSystemConfig.configFilesInfo6FieldType == 2)
        {
            tblFilesInfo6 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo6") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo6, "db_write_text") : tblFilesInfo6;
        }
        if(gSystemConfig.configFilesInfo6FieldType == 11 || gSystemConfig.configFilesInfo6FieldType == 12)
        {
            tblFilesInfo6 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo6") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo6, "db_write_text"), 2) : tblFilesInfo6;
        }

        if(gSystemConfig.configFilesInfo7FieldType == 1 || gSystemConfig.configFilesInfo7FieldType == 2)
        {
            tblFilesInfo7 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo7") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo7, "db_write_text") : tblFilesInfo7;
        }
        if(gSystemConfig.configFilesInfo7FieldType == 11 || gSystemConfig.configFilesInfo7FieldType == 12)
        {
            tblFilesInfo7 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo7") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo7, "db_write_text"), 2) : tblFilesInfo7;
        }

        if(gSystemConfig.configFilesInfo8FieldType == 1 || gSystemConfig.configFilesInfo8FieldType == 2)
        {
            tblFilesInfo8 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo8") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo8, "db_write_text") : tblFilesInfo8;
        }
        if(gSystemConfig.configFilesInfo8FieldType == 11 || gSystemConfig.configFilesInfo8FieldType == 12)
        {
            tblFilesInfo8 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo8") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo8, "db_write_text"), 2) : tblFilesInfo8;
        }

        if(gSystemConfig.configFilesInfo9FieldType == 1 || gSystemConfig.configFilesInfo9FieldType == 2)
        {
            tblFilesInfo9 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo9") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo9, "db_write_text") : tblFilesInfo9;
        }
        if(gSystemConfig.configFilesInfo9FieldType == 11 || gSystemConfig.configFilesInfo9FieldType == 12)
        {
            tblFilesInfo9 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo9") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo9, "db_write_text"), 2) : tblFilesInfo9;
        }

        if(gSystemConfig.configFilesInfo10FieldType == 1 || gSystemConfig.configFilesInfo10FieldType == 2)
        {
            tblFilesInfo10 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo10") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo10, "db_write_text") : tblFilesInfo10;
        }
        if(gSystemConfig.configFilesInfo10FieldType == 11 || gSystemConfig.configFilesInfo10FieldType == 12)
        {
            tblFilesInfo10 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfo10") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfo10, "db_write_text"), 2) : tblFilesInfo10;
        }

        tblFilesInfoSmall1 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfoSmall1") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfoSmall1, "db_write_text") : tblFilesInfoSmall1;
        tblFilesInfoSmall2 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfoSmall2") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfoSmall2, "db_write_text") : tblFilesInfoSmall2;
        tblFilesInfoSmall3 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfoSmall3") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfoSmall3, "db_write_text") : tblFilesInfoSmall3;
        tblFilesInfoSmall4 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfoSmall4") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfoSmall4, "db_write_text") : tblFilesInfoSmall4;
        tblFilesInfoSmall5 = (tblFilesDataObject.hasOwnProperty("_tblFilesInfoSmall5") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesInfoSmall5, "db_write_text") : tblFilesInfoSmall5;
        
        tblFilesNumber1 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumber1") === true && (tblFilesDataObject._tblFilesNumber1)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumber1, gSystemConfig.configFilesNumber1FieldType) : tblFilesNumber1;
        tblFilesNumber2 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumber2") === true && (tblFilesDataObject._tblFilesNumber2)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumber2, gSystemConfig.configFilesNumber2FieldType) : tblFilesNumber2;
        tblFilesNumber3 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumber3") === true && (tblFilesDataObject._tblFilesNumber3)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumber3, gSystemConfig.configFilesNumber3FieldType) : tblFilesNumber3;
        tblFilesNumber4 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumber4") === true && (tblFilesDataObject._tblFilesNumber4)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumber4, gSystemConfig.configFilesNumber4FieldType) : tblFilesNumber4;
        tblFilesNumber5 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumber5") === true && (tblFilesDataObject._tblFilesNumber5)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumber5, gSystemConfig.configFilesNumber5FieldType) : tblFilesNumber5;

        tblFilesNumberSmall1 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumberSmall1") === true && (tblFilesDataObject._tblFilesNumberSmall1)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumberSmall1, gSystemConfig.configFilesNumberS1FieldType) : tblFilesNumberSmall1;
        tblFilesNumberSmall2 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumberSmall2") === true && (tblFilesDataObject._tblFilesNumberSmall2)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumberSmall2, gSystemConfig.configFilesNumberS2FieldType) : tblFilesNumberSmall2;
        tblFilesNumberSmall3 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumberSmall3") === true && (tblFilesDataObject._tblFilesNumberSmall3)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumberSmall3, gSystemConfig.configFilesNumberS3FieldType) : tblFilesNumberSmall3;
        tblFilesNumberSmall4 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumberSmall4") === true && (tblFilesDataObject._tblFilesNumberSmall4)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumberSmall4, gSystemConfig.configFilesNumberS4FieldType) : tblFilesNumberSmall4;
        tblFilesNumberSmall5 = (tblFilesDataObject.hasOwnProperty("_tblFilesNumberSmall5") === true && (tblFilesDataObject._tblFilesNumberSmall5)) ? FunctionsGeneric.valueMaskWrite(tblFilesDataObject._tblFilesNumberSmall5, gSystemConfig.configFilesNumberS5FieldType) : tblFilesNumberSmall5;
        
        tblFilesDate1 = (tblFilesDataObject.hasOwnProperty("_tblFilesDate1") === true && (tblFilesDataObject._tblFilesDate1)) ? FunctionsGeneric.dateSQLWrite(tblFilesDataObject._tblFilesDate1, gSystemConfig.configBackendDateFormat) : tblFilesDate1;
        tblFilesDate2 = (tblFilesDataObject.hasOwnProperty("_tblFilesDate2") === true && (tblFilesDataObject._tblFilesDate2)) ? FunctionsGeneric.dateSQLWrite(tblFilesDataObject._tblFilesDate2, gSystemConfig.configBackendDateFormat) : tblFilesDate2;
        tblFilesDate3 = (tblFilesDataObject.hasOwnProperty("_tblFilesDate3") === true && (tblFilesDataObject._tblFilesDate3)) ? FunctionsGeneric.dateSQLWrite(tblFilesDataObject._tblFilesDate3, gSystemConfig.configBackendDateFormat) : tblFilesDate3;
        tblFilesDate4 = (tblFilesDataObject.hasOwnProperty("_tblFilesDate4") === true && (tblFilesDataObject._tblFilesDate4)) ? FunctionsGeneric.dateSQLWrite(tblFilesDataObject._tblFilesDate4, gSystemConfig.configBackendDateFormat) : tblFilesDate4;
        tblFilesDate5 = (tblFilesDataObject.hasOwnProperty("_tblFilesDate5") === true && (tblFilesDataObject._tblFilesDate5)) ? FunctionsGeneric.dateSQLWrite(tblFilesDataObject._tblFilesDate5, gSystemConfig.configBackendDateFormat) : tblFilesDate5;
        
        tblFilesFile = (tblFilesDataObject.hasOwnProperty("_tblFilesFile") === true) ? tblFilesDataObject._tblFilesFile : tblFilesFile;
        tblFilesFileSize = (tblFilesDataObject.hasOwnProperty("_tblFilesFileSize") === true) ? tblFilesDataObject._tblFilesFileSize : tblFilesFileSize;
        tblFilesFileDuration = (tblFilesDataObject.hasOwnProperty("_tblFilesFileDuration") === true) ? tblFilesDataObject._tblFilesFileDuration : tblFilesFileDuration;
        tblFilesFileDimensions = (tblFilesDataObject.hasOwnProperty("_tblFilesFileDimensions") === true) ? tblFilesDataObject._tblFilesFileDimensions : tblFilesFileDimensions;
        tblFilesFileOriginalName = (tblFilesDataObject.hasOwnProperty("_tblFilesFileOriginalName") === true) ? tblFilesDataObject._tblFilesFileOriginalName : tblFilesFileOriginalName;
        
        tblFilesFileThumbnail = (tblFilesDataObject.hasOwnProperty("_tblFilesFileThumbnail") === true) ? tblFilesDataObject._tblFilesFileThumbnail : tblFilesFileThumbnail;
        
        tblFilesFile1 = (tblFilesDataObject.hasOwnProperty("_tblFilesFile1") === true) ? tblFilesDataObject._tblFilesFile1 : tblFilesFile1;
        tblFilesFile2 = (tblFilesDataObject.hasOwnProperty("_tblFilesFile2") === true) ? tblFilesDataObject._tblFilesFile2 : tblFilesFile2;
        tblFilesFile3 = (tblFilesDataObject.hasOwnProperty("_tblFilesFile3") === true) ? tblFilesDataObject._tblFilesFile3 : tblFilesFile3;
        tblFilesFile4 = (tblFilesDataObject.hasOwnProperty("_tblFilesFile4") === true) ? tblFilesDataObject._tblFilesFile4 : tblFilesFile4;
        tblFilesFile5 = (tblFilesDataObject.hasOwnProperty("_tblFilesFile5") === true) ? tblFilesDataObject._tblFilesFile5 : tblFilesFile5;
        
        tblFilesActivation = (tblFilesDataObject.hasOwnProperty("_tblFilesActivation") === true && (tblFilesDataObject._tblFilesActivation)) ? tblFilesDataObject._tblFilesActivation : tblFilesActivation;
        tblFilesActivation1 = (tblFilesDataObject.hasOwnProperty("_tblFilesActivation1") === true && (tblFilesDataObject._tblFilesActivation1)) ? tblFilesDataObject._tblFilesActivation1 : tblFilesActivation1;
        tblFilesActivation2 = (tblFilesDataObject.hasOwnProperty("_tblFilesActivation2") === true && (tblFilesDataObject._tblFilesActivation2)) ? tblFilesDataObject._tblFilesActivation2 : tblFilesActivation2;
        tblFilesActivation3 = (tblFilesDataObject.hasOwnProperty("_tblFilesActivation3") === true && (tblFilesDataObject._tblFilesActivation3)) ? tblFilesDataObject._tblFilesActivation3 : tblFilesActivation3;
        tblFilesActivation4 = (tblFilesDataObject.hasOwnProperty("_tblFilesActivation5") === true && (tblFilesDataObject._tblFilesActivation4)) ? tblFilesDataObject._tblFilesActivation4 : tblFilesActivation5;
        tblFilesActivation5 = (tblFilesDataObject.hasOwnProperty("_tblFilesActivation5") === true && (tblFilesDataObject._tblFilesActivation5)) ? tblFilesDataObject._tblFilesActivation5 : tblFilesActivation5;
       
        tblFilesNotes = (tblFilesDataObject.hasOwnProperty("_tblFilesNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblFilesDataObject._tblFilesNotes, "db_write_text") : tblFilesNotes;
        //----------------------


        //Query.
        //----------------------
        strSQLFilesInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFiles + " ";
        strSQLFilesInsert += "SET ?";
        //----------------------

        
        //Parameters.
        //----------------------
        strSQLFilesInsertParams.id = tblFilesID;
        strSQLFilesInsertParams.id_parent = tblFilesIdParent;
        strSQLFilesInsertParams.sort_order = tblFilesSortOrder;
        strSQLFilesInsertParams.file_type = tblFilesFileType;
        strSQLFilesInsertParams.file_config = tblFilesFileConfig;

        strSQLFilesInsertParams.date_creation = tblFilesDateCreation;
        strSQLFilesInsertParams.date_timezone = tblFilesDateTimezone;
        strSQLFilesInsertParams.date_edit = tblFilesDateEdit;

        strSQLFilesInsertParams.title = tblFilesTitle;
        strSQLFilesInsertParams.caption = tblFilesCaption;
        strSQLFilesInsertParams.description = tblFilesDescription;
        strSQLFilesInsertParams.html_code = tblFilesHTMLCode;

        strSQLFilesInsertParams.url_alias = tblFilesURLAlias;
        strSQLFilesInsertParams.keywords_tags = tblFilesKeywordsTags;
        strSQLFilesInsertParams.meta_description = tblFilesMetaDescription;
        strSQLFilesInsertParams.meta_title = tblFilesMetaTitle;
        strSQLFilesInsertParams.meta_info = tblFilesMetaInfo;

        strSQLFilesInsertParams.info1 = tblFilesInfo1;
        strSQLFilesInsertParams.info2 = tblFilesInfo2;
        strSQLFilesInsertParams.info3 = tblFilesInfo3;
        strSQLFilesInsertParams.info4 = tblFilesInfo4;
        strSQLFilesInsertParams.info5 = tblFilesInfo5;

        strSQLFilesInsertParams.info_small1 = tblFilesInfoSmall1;
        strSQLFilesInsertParams.info_small2 = tblFilesInfoSmall2;
        strSQLFilesInsertParams.info_small3 = tblFilesInfoSmall3;
        strSQLFilesInsertParams.info_small4 = tblFilesInfoSmall4;
        strSQLFilesInsertParams.info_small5 = tblFilesInfoSmall5;

        strSQLFilesInsertParams.number1 = tblFilesNumber1;
        strSQLFilesInsertParams.number2 = tblFilesNumber2;
        strSQLFilesInsertParams.number3 = tblFilesNumber3;
        strSQLFilesInsertParams.number4 = tblFilesNumber4;
        strSQLFilesInsertParams.number5 = tblFilesNumber5;

        strSQLFilesInsertParams.number_small1 = tblFilesNumberSmall1;
        strSQLFilesInsertParams.number_small2 = tblFilesNumberSmall2;
        strSQLFilesInsertParams.number_small3 = tblFilesNumberSmall3;
        strSQLFilesInsertParams.number_small4 = tblFilesNumberSmall4;
        strSQLFilesInsertParams.number_small5 = tblFilesNumberSmall5;

        strSQLFilesInsertParams.date1 = tblFilesDate1;
        strSQLFilesInsertParams.date2 = tblFilesDate2;
        strSQLFilesInsertParams.date3 = tblFilesDate3;
        strSQLFilesInsertParams.date4 = tblFilesDate4;
        strSQLFilesInsertParams.date5 = tblFilesDate5;
        
        strSQLFilesInsertParams.file = tblFilesFile;
        strSQLFilesInsertParams.file_size = tblFilesFileSize;
        strSQLFilesInsertParams.file_duration = tblFilesFileDuration;
        strSQLFilesInsertParams.file_dimensions = tblFilesFileDimensions;
        strSQLFilesInsertParams.file_original_name = tblFilesFileOriginalName;

        strSQLFilesInsertParams.file_thumbnail = tblFilesFileThumbnail;

        strSQLFilesInsertParams.file1 = tblFilesFile1;
        strSQLFilesInsertParams.file2 = tblFilesFile2;
        strSQLFilesInsertParams.file3 = tblFilesFile3;
        strSQLFilesInsertParams.file4 = tblFilesFile4;
        strSQLFilesInsertParams.file5 = tblFilesFile5;

        strSQLFilesInsertParams.activation = tblFilesActivation;
        strSQLFilesInsertParams.activation1 = tblFilesActivation1;
        strSQLFilesInsertParams.activation2 = tblFilesActivation2;
        strSQLFilesInsertParams.activation3 = tblFilesActivation3;
        strSQLFilesInsertParams.activation4 = tblFilesActivation4;
        strSQLFilesInsertParams.activation5 = tblFilesActivation5;

        strSQLFilesInsertParams.notes = tblFilesNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFilesInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLFilesInsert, strSQLFilesInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLFilesInsert, strSQLFilesInsertParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.release();

                        if(dbSystemError)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                            }
        
                            throw dbSystemError;
                        }else{
                            //Set success flag.
                            //strReturn = true;
        
                            if(results)
                            {
                                //Success.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage2"));
                                }
                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3")));
                            }
                                
        
                            //Debug.
                            //resolve(resultsSQLCounterRows);
                            //resolve(nCounter);
                            //resolve(json(resultsSQLCounterRows));//working: returns [ RowDataPacket { id: 1, counter_global: 123, description: 'Node database test' } ]
                        }
                    });
        
                }
            });
            
        });
        //----------------------


        //Return data treatment.
        //----------------------
        //resultsSQLFilesInsert object ex: 
        /*
        OkPacket {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 
        }
        */
        if(resultsSQLFilesInsert.affectedRows > 0)
        {
            strReturn = true;
        }
        //----------------------


        //Debug.
        //return tblCategoriesID;
        //return resultsSQLCategoriesInsert;


        return strReturn;

        //Usage.
        //----------------------
        //----------------------
    }
    //**************************************************************************************



    //Filters Generic Binding - insert record.
    //**************************************************************************************
    /**
     * Filters Generic Binding - insert record.
     * @static
     * @param {object} _tblFiltersGenericBindingDataObject
     * @param {integter} returnMethod 1 - boolean | 2 - object
     * @returns {boolean} true - successfull | false - error
     */
    static async filtersGenericBindingInsert_async(_tblFiltersGenericBindingDataObject, returnMethod = 1)
    {
        //Variables.
        //----------------------
        let strReturn = false;
        let objReturn = {};

        let tblFiltersGenericBindingDataObject = {};

        //Details - default values.
        let tblFiltersGenericBindingID = "";
        let tblFiltersGenericBindingSortOrder = 0;
        let tblFiltersGenericBindingDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFiltersGenericBindingDateEdit = "";
        let tblFiltersGenericBindingIdFiltersGeneric = 0;
        let tblFiltersGenericBindingIdFilterIndex = 0;
        let tblFiltersGenericBindingIdRecord = 0;
        let tblFiltersGenericBindingNotes = "";


        let strSQLFiltersGenericBindingInsert = "";
        let strSQLFiltersGenericBindingInsertParams = {};
        let resultsSQLFiltersGenericBindingInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblFiltersGenericBindingDataObject = _tblFiltersGenericBindingDataObject;
        
        tblFiltersGenericBindingID = tblFiltersGenericBindingDataObject._tblFiltersGenericBindingID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblFiltersGenericBindingID == "" || tblFiltersGenericBindingID === null || tblFiltersGenericBindingID === undefined)
        {
            tblFiltersGenericBindingID = await new Promise((resolve, reject)=>{
                FunctionsDB.counterUniversalUpdate_async(1)
                    .then((results)=>{
                        if(results === undefined)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                            }
                            reject(new Error("nCounterUpdate is undefined."));
                        }else{
                            //Success.
                            //resolve(nCounterUpdate);
                            resolve(results);
                        } //working
        
                    });
            });
        }else{
            tblFiltersGenericBindingID = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingID") === true) ? tblFiltersGenericBindingDataObject._tblFiltersGenericBindingID : tblFiltersGenericBindingID;
            //TODO: check categoriesInsert_async and implement same condition
        }
        //----------------------


        tblFiltersGenericBindingSortOrder = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingSortOrder") === true) ? tblFiltersGenericBindingDataObject._tblFiltersGenericBindingSortOrder : tblFiltersGenericBindingSortOrder;
        if(!tblFiltersGenericBindingSortOrder)
        {
            tblFiltersGenericBindingSortOrder = 0;
        }

        tblFiltersGenericBindingDateCreation = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingDateCreation") === true) ? tblFiltersGenericBindingDataObject._tblFiltersGenericBindingDateCreation : tblFiltersGenericBindingDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFiltersGenericBindingDateCreation)
        {
            let tblFiltersGenericBindingDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFiltersGenericBindingDateCreation = FunctionsGeneric.dateSQLWrite(tblFiltersGenericBindingDateCreation_dateObj);
        }

        tblFiltersGenericBindingDateEdit = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingDateEdit") === true) ? tblFiltersGenericBindingDataObject._tblFiltersGenericBindingDateEdit : tblFiltersGenericBindingDateEdit;
        if(!tblFiltersGenericBindingDateEdit)
        {
            let tblFiltersGenericBindingDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFiltersGenericBindingDateEdit = FunctionsGeneric.dateSQLWrite(tblFiltersGenericBindingDateEdit_dateObj);
        }

        tblFiltersGenericBindingIdFiltersGeneric = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingIdFiltersGeneric") === true) ? tblFiltersGenericBindingDataObject._tblFiltersGenericBindingIdFiltersGeneric : tblFiltersGenericBindingIdFiltersGeneric;
        tblFiltersGenericBindingIdFilterIndex = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingIdFilterIndex") === true) ? tblFiltersGenericBindingDataObject._tblFiltersGenericBindingIdFilterIndex : tblFiltersGenericBindingIdFilterIndex;
        tblFiltersGenericBindingIdRecord = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingIdRecord") === true) ? tblFiltersGenericBindingDataObject._tblFiltersGenericBindingIdRecord : tblFiltersGenericBindingIdRecord;
        tblFiltersGenericBindingNotes = (tblFiltersGenericBindingDataObject.hasOwnProperty("_tblFiltersGenericBindingNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericBindingDataObject._tblFiltersGenericBindingNotes, "db_write_text") : tblFiltersGenericBindingNotes;
        //----------------------


        //Query.
        //----------------------
        //strSQLFiltersGenericBindingInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "filters_generic_binding";
        strSQLFiltersGenericBindingInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFiltersGenericBinding;
        strSQLFiltersGenericBindingInsert += " SET ?";
        //----------------------


        //Parameters.
        //----------------------
        strSQLFiltersGenericBindingInsertParams.id = tblFiltersGenericBindingID;
        strSQLFiltersGenericBindingInsertParams.sort_order = tblFiltersGenericBindingSortOrder;
        strSQLFiltersGenericBindingInsertParams.date_creation = tblFiltersGenericBindingDateCreation;
        strSQLFiltersGenericBindingInsertParams.date_edit = tblFiltersGenericBindingDateEdit;
        strSQLFiltersGenericBindingInsertParams.id_filters_generic = tblFiltersGenericBindingIdFiltersGeneric;
        strSQLFiltersGenericBindingInsertParams.id_filter_index = tblFiltersGenericBindingIdFilterIndex;
        strSQLFiltersGenericBindingInsertParams.id_record = tblFiltersGenericBindingIdRecord;
        strSQLFiltersGenericBindingInsertParams.notes = tblFiltersGenericBindingNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFiltersGenericBindingInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLFiltersGenericBindingInsert, strSQLFiltersGenericBindingInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLFiltersGenericBindingInsert, strSQLFiltersGenericBindingInsertParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.release();

                        if(dbSystemError)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                            }
        
                            throw dbSystemError;
                        }else{
                            //Set success flag.
                            //strReturn = true;
        
                            if(results)
                            {
                                //Success.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage2"));
                                }
                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3")));
                            }
                                
        
                            //Debug.
                            //resolve(resultsSQLCounterRows);
                            //resolve(nCounter);
                            //resolve(json(resultsSQLCounterRows));//working: returns [ RowDataPacket { id: 1, counter_global: 123, description: 'Node database test' } ]
                        }
                    });
        
                }
            });
            
        });
        //----------------------


        //Return data treatment.
        //----------------------
        //resultsSQLCategoriesInsert object ex: 
        /*
        OkPacket {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            serverStatus: 2,
            warningCount: 0,
            message: '',
            protocol41: true,
            changedRows: 0 
        }
        */
       if(resultsSQLFiltersGenericBindingInsert.affectedRows > 0)
       {
           //TODO: insert condition to choose return method
           strReturn = true;
       }
       //----------------------


        return strReturn;


        //Usage
        //----------------------
        /*
        await SyncSystemNS.FunctionsDBInsert.filtersGenericBindingInsert_async({
            _tblFiltersGenericBindingID: "",
            _tblFiltersGenericBindingSortOrder: "",
            _tblFiltersGenericBindingDateCreation: "",
            _tblFiltersGenericBindingDateEdit: "",
            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsCategoriesFiltersGeneric1[countArray],
            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
            _tblFiltersGenericBindingNotes: ""
        }); 
        */
        //----------------------
    }
    //**************************************************************************************
}