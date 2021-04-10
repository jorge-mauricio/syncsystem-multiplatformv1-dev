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
        /*
        let filesInsertResult = await new Promise((resolve, reject)=>{
            SyncSystemNS.FunctionsDBInsert.filesInsert_async({
                _tblFilesID: tblFilesID,
                _tblFilesIdParent: tblFilesIdParent,
                _tblFilesSortOrder: tblFilesSortOrder,
                _tblFilesFileType: tblFilesFileType,
                _tblFilesFileConfig: tblFilesFileConfig,
                _tblFilesDateCreation: "",
                _tblFilesDateTimezone: "",
                _tblFilesDateEdit: "",
                _tblFilesTitle: tblFilesTitle,
                _tblFilesCaption: tblFilesCaption,
                _tblFilesDescription: tblFilesDescription,
                _tblFilesHTMLCode: tblFilesHTMLCode,
                _tblFilesURLAlias: tblFilesURLAlias,
                _tblFilesKeywordsTags: tblFilesKeywordsTags,
                _tblFilesMetaDescription: tblFilesMetaDescription,
                _tblFilesMetaTitle: tblFilesMetaTitle,
                _tblFilesMetaInfo: "",
                _tblFilesInfo1: tblFilesInfo1,
                _tblFilesInfo2: tblFilesInfo2,
                _tblFilesInfo3: tblFilesInfo3,
                _tblFilesInfo4: tblFilesInfo4,
                _tblFilesInfo5: tblFilesInfo5,
                _tblFilesInfoSmall1: tblFilesInfoSmall1,
                _tblFilesInfoSmall2: tblFilesInfoSmall2,
                _tblFilesInfoSmall3: tblFilesInfoSmall3,
                _tblFilesInfoSmall4: tblFilesInfoSmall4,
                _tblFilesInfoSmall5: tblFilesInfoSmall5,
                _tblFilesNumber1: tblFilesNumber1,
                _tblFilesNumber2: tblFilesNumber2,
                _tblFilesNumber3: tblFilesNumber3,
                _tblFilesNumber4: tblFilesNumber4,
                _tblFilesNumber5: tblFilesNumber5,
                _tblFilesNumberSmall1: tblFilesNumberSmall1,
                _tblFilesNumberSmall2: tblFilesNumberSmall2,
                _tblFilesNumberSmall3: tblFilesNumberSmall3,
                _tblFilesNumberSmall4: tblFilesNumberSmall4,
                _tblFilesNumberSmall5: tblFilesNumberSmall5,
                _tblFilesDate1: tblFilesDate1,
                _tblFilesDate2: tblFilesDate2,
                _tblFilesDate3: tblFilesDate3,
                _tblFilesDate4: tblFilesDate4,
                _tblFilesDate5: tblFilesDate5,
                _tblFilesFile: tblFilesFile,
                _tblFilesFileSize: tblFilesFileSize,
                _tblFilesFileDuration: tblFilesFileDuration,
                _tblFilesFileDimensions: tblFilesFileDimensions,
                _tblFilesFileOriginalName: tblFilesFileOriginalName,
                _tblFilesFileThumbnail: tblFilesFileThumbnail,
                _tblFilesFile1: tblFilesImageFile1,
                _tblFilesFile2: tblFilesImageFile2,
                _tblFilesFile3: tblFilesImageFile3,
                _tblFilesFile4: tblFilesImageFile4,
                _tblFilesFile5: tblFilesImageFile5,
                _tblFilesActivation: tblFilesActivation,
                _tblFilesActivation1: tblFilesActivation1,
                _tblFilesActivation2: tblFilesActivation2,
                _tblFilesActivation3: tblFilesActivation3,
                _tblFilesActivation4: tblFilesActivation4,
                _tblFilesActivation5: tblFilesActivation5,
                _tblFilesNotes: tblFilesNotes
            }).then((results)=>{
                if(results === undefined)
                {
                    //Error.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3"));
                    }
                    reject(new Error("nCounterUpdate is undefined."));
                }else{

                    //Success.
                    //resolve(nCounterUpdate);
                    resolve(results);
                } //working
            });
        }); 
        */           
        //----------------------
    }
    //**************************************************************************************


    //Content - insert record.
    //**************************************************************************************
    /**
     * Content - insert record.
     * @static
     * @async
     * @param {object} _tblContentDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async contentInsert_async(_tblContentDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblContentDataObject = {};

        //Details - default values.
        let tblContentID = "";
        let tblContentIdParent = "";
        let tblContentSortOrder = 0;
    
        let tblContentDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblContentDateTimezone = "";
        let tblContentDateEdit = "";

        let tblContentIdRegisterUser = 0; 
        let tblContentContentType = 0; 
        let tblContentContentColumns = 0; 
    
        let tblContentAlignText = 0; 
        let tblContentAlignImage = 0; 
    
        let tblContentContentText = "";
        let tblContentContentURL = "";
        let tblContentCaption = "";
    
        let tblContentFile = "";
        let tblContentFileSize = "";
        let tblContentFileDuration = "";
        let tblContentFileDimensions = "";
        let tblContentFileOriginalName = "";
        let tblContentFileConfig = 0;
        let tblContentFileThumbnail = "";
    
        let tblContentActivation = "";
    
        let strSQLContentInsert = "";
        let strSQLContentInsertParams = {};
        let resultsSQLContentInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblContentDataObject = _tblContentDataObject;
        
        tblContentID = tblContentDataObject._tblContentID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblContentID == "" || tblContentID === null || tblContentID === undefined)
        {
            tblContentID = await new Promise((resolve, reject)=>{
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
        tblContentIdParent = (tblContentDataObject.hasOwnProperty("_tblContentIdParent") === true) ? tblContentDataObject._tblContentIdParent : tblContentIdParent;
        tblContentSortOrder = (tblContentDataObject.hasOwnProperty("_tblContentSortOrder") === true) ? tblContentDataObject._tblContentSortOrder : tblContentSortOrder;
        if(!tblContentSortOrder)
        {
            tblContentSortOrder = 0;
        }

        tblContentDateCreation = (tblContentDataObject.hasOwnProperty("_tblContentDateCreation") === true) ? tblContentDataObject._tblContentDateCreation : tblContentDateCreation; //x = condition ? true : false (default value declared)
        if(!tblContentDateCreation)
        {
            let tblContentDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblContentDateCreation = FunctionsGeneric.dateSQLWrite(tblContentDateCreation_dateObj);
        }

        tblContentDateTimezone = (tblContentDataObject.hasOwnProperty("_tblContentDateTimezone") === true) ? tblContentDataObject._tblContentDateTimezone : tblContentDateTimezone;
        
        tblContentDateEdit = (tblContentDataObject.hasOwnProperty("_tblContentDateEdit") === true) ? tblContentDataObject._tblContentDateEdit : tblContentDateEdit;
        if(!tblContentDateEdit)
        {
            let tblContentDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblContentDateEdit = FunctionsGeneric.dateSQLWrite(tblContentDateEdit_dateObj);
        }

        tblContentIdRegisterUser = tblContentDataObject._tblContentIdRegisterUser;
        tblContentContentType = tblContentDataObject._tblContentContentType;
        tblContentContentColumns = tblContentDataObject._tblContentContentColumns;

        tblContentAlignText = tblContentDataObject._tblContentAlignText;
        tblContentAlignImage = tblContentDataObject._tblContentAlignImage;

        tblContentContentText = (tblContentDataObject.hasOwnProperty("_tblContentContentText") === true) ? FunctionsGeneric.contentMaskWrite(tblContentDataObject._tblContentContentText, "db_write_text") : tblContentContentText;
        tblContentContentURL = (tblContentDataObject.hasOwnProperty("_tblContentContentURL") === true) ? FunctionsGeneric.contentMaskWrite(tblContentDataObject._tblContentContentURL, "db_write_text") : tblContentContentURL;
        tblContentCaption = (tblContentDataObject.hasOwnProperty("_tblContentCaption") === true) ? FunctionsGeneric.contentMaskWrite(tblContentDataObject._tblContentCaption, "db_write_text") : tblContentCaption;
        
        tblContentFile = (tblContentDataObject.hasOwnProperty("_tblContentFile") === true) ? tblContentDataObject._tblContentFile : tblContentFile;
        tblContentFileSize = (tblContentDataObject.hasOwnProperty("_tblContentFileSize") === true) ? tblContentDataObject._tblContentFileSize : tblContentFileSize;
        tblContentFileDuration = (tblContentDataObject.hasOwnProperty("_tblContentFileDuration") === true) ? tblContentDataObject._tblContentFileDuration : tblContentFileDuration;
        tblContentFileDimensions = (tblContentDataObject.hasOwnProperty("_tblContentFileDimensions") === true) ? tblContentDataObject._tblContentFileDimensions : tblContentFileDimensions;
        tblContentFileOriginalName = (tblContentDataObject.hasOwnProperty("_tblContentFileOriginalName") === true) ? tblContentDataObject._tblContentFileOriginalName : tblContentFileOriginalName;
        
        tblContentFileConfig = tblContentDataObject._tblContentFileConfig;
        
        tblContentFileThumbnail = (tblContentDataObject.hasOwnProperty("_tblContentFileThumbnail") === true) ? tblContentDataObject._tblContentFileThumbnail : tblContentFileThumbnail;
        
        tblContentActivation = (tblContentDataObject.hasOwnProperty("_tblContentActivation") === true && (tblContentDataObject._tblContentActivation)) ? tblContentDataObject._tblContentActivation : tblContentActivation;
        //----------------------


        //Query.
        //----------------------
        strSQLContentInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableContent + " ";
        strSQLContentInsert += "SET ?";
        //----------------------

        
        //Parameters.
        //----------------------
        strSQLContentInsertParams.id = tblContentID;
        strSQLContentInsertParams.id_parent = tblContentIdParent;
        strSQLContentInsertParams.sort_order = tblContentSortOrder;

        strSQLContentInsertParams.date_creation = tblContentDateCreation;
        strSQLContentInsertParams.date_timezone = tblContentDateTimezone;
        strSQLContentInsertParams.date_edit = tblContentDateEdit;

        strSQLContentInsertParams.id_register_user = tblContentIdRegisterUser;
        strSQLContentInsertParams.content_type = tblContentContentType;
        strSQLContentInsertParams.content_columns = tblContentContentColumns;

        strSQLContentInsertParams.align_text = tblContentAlignText;
        strSQLContentInsertParams.align_image = tblContentAlignImage;

        strSQLContentInsertParams.content_text = tblContentContentText;
        strSQLContentInsertParams.content_url = tblContentContentURL;
        strSQLContentInsertParams.caption = tblContentCaption;

        strSQLContentInsertParams.file = tblContentFile;
        strSQLContentInsertParams.file_size = tblContentFileSize;
        strSQLContentInsertParams.file_duration = tblContentFileDuration;
        strSQLContentInsertParams.file_dimensions = tblContentFileDimensions;
        strSQLContentInsertParams.file_original_name = tblContentFileOriginalName;
        strSQLContentInsertParams.file_config = tblContentFileConfig;
        strSQLContentInsertParams.file_thumbnail = tblContentFileThumbnail;

        strSQLContentInsertParams.activation = tblContentActivation;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLContentInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLContentInsert, strSQLContentInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLContentInsert, strSQLContentInsertParams, (dbSystemError, results) => {
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
        //resultsSQLContentInsert object ex: 
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
        if(resultsSQLContentInsert.affectedRows > 0)
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
        /*
        let contentInsertResult = await new Promise((resolve, reject)=>{
            SyncSystemNS.FunctionsDBInsert.contentInsert_async({
                _tblContentID: tblContentID,
                _tblContentIdParent: tblContentIdParent,
                _tblContentSortOrder: tblContentSortOrder,
                _tblContentDateCreation: "",
                _tblContentDateTimezone: "",
                _tblContentDateEdit: "",
                _tblContentIdRegisterUser: tblContentIdRegisterUser,
                _tblContentContentType: tblContentContentType,
                _tblContentContentColumns: tblContentContentColumns,
                _tblContentAlignText: tblContentAlignText,
                _tblContentAlignImage: tblContentAlignImage,
                _tblContentContentText: tblContentContentText,
                _tblContentContentURL: tblContentContentURL,
                _tblContentCaption: tblContentCaption,
                _tblContentFile: tblContentFile,
                _tblContentFileSize: tblContentFileSize,
                _tblContentFileDuration: tblContentFileDuration,
                _tblContentFileDimensions: tblContentFileDimensions,
                _tblContentFileOriginalName: tblContentFileOriginalName,
                _tblContentFileConfig: tblContentFileConfig,
                _tblContentFileThumbnail: tblContentFileThumbnail,
                _tblContentActivation: tblContentActivation
            }).then((results)=>{
                if(results === undefined)
                {
                    //Error.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3"));
                    }
                    reject(new Error("nCounterUpdate is undefined."));
                }else{

                    //Success.
                    //resolve(nCounterUpdate);
                    resolve(results);
                } //working
            });
        });     
        */       
        //----------------------
    }
    //**************************************************************************************


    //Products - insert record.
    //**************************************************************************************
    /**
     * Products - insert record.
     * @static
     * @async
     * @param {object} _tblProductsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async productsInsert_async(_tblProductsDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblProductsDataObject = {};

        //Details - default values.
        let tblProductsID = "";
        let tblProductsIdParent = "";
        let tblProductsSortOrder = 0;
        let tblProductsIdType = 0; 
    
        let tblProductsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //let tblProductsDateTimezone = "";
        let tblProductsDateEdit = "";

        let tblProductsIdRegisterUser = 0;
        let tblProductsIdRegister1 = 0;
        let tblProductsIdRegister2 = 0;
        let tblProductsIdRegister3 = 0;
        let tblProductsIdRegister4 = 0;
        let tblProductsIdRegister5 = 0;

        let tblProductsCode = "";
        let tblProductsTitle = "";
        let tblProductsDescription = "";
    
        let tblProductsURLAlias = "";
        let tblProductsKeywordsTags = "";
        let tblProductsMetaDescription = "";
        let tblProductsMetaTitle = "";
        let tblProductsMetaInfo = "";

        let tblProductsInfo1 = "";
        let tblProductsInfo2 = "";
        let tblProductsInfo3 = "";
        let tblProductsInfo4 = "";
        let tblProductsInfo5 = "";
        let tblProductsInfo6 = "";
        let tblProductsInfo7 = "";
        let tblProductsInfo8 = "";
        let tblProductsInfo9 = "";
        let tblProductsInfo10 = "";
        let tblProductsInfo11 = "";
        let tblProductsInfo12 = "";
        let tblProductsInfo13 = "";
        let tblProductsInfo14 = "";
        let tblProductsInfo15 = "";
        let tblProductsInfo16 = "";
        let tblProductsInfo17 = "";
        let tblProductsInfo18 = "";
        let tblProductsInfo19 = "";
        let tblProductsInfo20 = "";
    
        let tblProductsInfoSmall1 = "";
        let tblProductsInfoSmall2 = "";
        let tblProductsInfoSmall3 = "";
        let tblProductsInfoSmall4 = "";
        let tblProductsInfoSmall5 = "";
        let tblProductsInfoSmall6 = "";
        let tblProductsInfoSmall7 = "";
        let tblProductsInfoSmall8 = "";
        let tblProductsInfoSmall9 = "";
        let tblProductsInfoSmall10 = "";
        let tblProductsInfoSmall11 = "";
        let tblProductsInfoSmall12 = "";
        let tblProductsInfoSmall13 = "";
        let tblProductsInfoSmall14 = "";
        let tblProductsInfoSmall15 = "";
        let tblProductsInfoSmall16 = "";
        let tblProductsInfoSmall17 = "";
        let tblProductsInfoSmall18 = "";
        let tblProductsInfoSmall19 = "";
        let tblProductsInfoSmall20 = "";
        let tblProductsInfoSmall21 = "";
        let tblProductsInfoSmall22 = "";
        let tblProductsInfoSmall23 = "";
        let tblProductsInfoSmall24 = "";
        let tblProductsInfoSmall25 = "";
        let tblProductsInfoSmall26 = "";
        let tblProductsInfoSmall27 = "";
        let tblProductsInfoSmall28 = "";
        let tblProductsInfoSmall29 = "";
        let tblProductsInfoSmall30 = "";

        let tblProductsValue = 0;
        let tblProductsValue1 = 0;
        let tblProductsValue2 = 0;
        let tblProductsWeight = 0;
        let tblProductsCoefficient = 0;
        
        let tblProductsNumber1 = 0;
        let tblProductsNumber2 = 0;
        let tblProductsNumber3 = 0;
        let tblProductsNumber4 = 0;
        let tblProductsNumber5 = 0;

        let tblProductsNumberSmall1 = 0;
        let tblProductsNumberSmall2 = 0;
        let tblProductsNumberSmall3 = 0;
        let tblProductsNumberSmall4 = 0;
        let tblProductsNumberSmall5 = 0;

        let tblProductsURL1 = "";
        let tblProductsURL2 = "";
        let tblProductsURL3 = "";
        let tblProductsURL4 = "";
        let tblProductsURL5 = "";
            
        let tblProductsDate1 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblProductsDate2 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblProductsDate3 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblProductsDate4 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblProductsDate5 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd

        let tblProductsIdItem1 = 0;
        let tblProductsIdItem2 = 0;
        let tblProductsIdItem3 = 0;
        let tblProductsIdItem4 = 0;
        let tblProductsIdItem5 = 0;

        let tblProductsImageMain = "";
        let tblProductsImageMainCaption = "";
        let tblProductsFile1 = "";
        let tblProductsFile2 = "";
        let tblProductsFile3 = "";
        let tblProductsFile4 = "";
        let tblProductsFile5 = "";

        let tblProductsActivation = 1;
        let tblProductsActivation1 = 0;
        let tblProductsActivation2 = 0;
        let tblProductsActivation3 = 0;
        let tblProductsActivation4 = 0;
        let tblProductsActivation5 = 0;
        
        let tblProductsIdStatus = 0;
        let tblProductsRestrictedAccess = 0;

        let tblProductsNotes = "";

        let arrIdsProductsFiltersGeneric1 = [];
        let arrIdsProductsFiltersGeneric2 = [];
        let arrIdsProductsFiltersGeneric3 = [];
        let arrIdsProductsFiltersGeneric4 = [];
        let arrIdsProductsFiltersGeneric5 = [];
        let arrIdsProductsFiltersGeneric6 = [];
        let arrIdsProductsFiltersGeneric7 = [];
        let arrIdsProductsFiltersGeneric8 = [];
        let arrIdsProductsFiltersGeneric9 = [];
        let arrIdsProductsFiltersGeneric10 = [];
        let arrIdsProductsFiltersGeneric11 = [];
        let arrIdsProductsFiltersGeneric12 = [];
        let arrIdsProductsFiltersGeneric13 = [];
        let arrIdsProductsFiltersGeneric14 = [];
        let arrIdsProductsFiltersGeneric15 = [];
        let arrIdsProductsFiltersGeneric16 = [];
        let arrIdsProductsFiltersGeneric17 = [];
        let arrIdsProductsFiltersGeneric18 = [];
        let arrIdsProductsFiltersGeneric19 = [];
        let arrIdsProductsFiltersGeneric20 = [];
        let arrIdsProductsFiltersGeneric21 = [];
        let arrIdsProductsFiltersGeneric22 = [];
        let arrIdsProductsFiltersGeneric23 = [];
        let arrIdsProductsFiltersGeneric24 = [];
        let arrIdsProductsFiltersGeneric25 = [];
        let arrIdsProductsFiltersGeneric26 = [];
        let arrIdsProductsFiltersGeneric27 = [];
        let arrIdsProductsFiltersGeneric28 = [];
        let arrIdsProductsFiltersGeneric29 = [];
        let arrIdsProductsFiltersGeneric30 = [];
            
        let strSQLProductsInsert = "";
        let strSQLProductsInsertParams = {};
        let resultsSQLProductsInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblProductsDataObject = _tblProductsDataObject;
        
        tblProductsID = tblProductsDataObject._tblProductsID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblProductsID == "" || tblProductsID === null || tblProductsID === undefined)
        {
            tblProductsID = await new Promise((resolve, reject)=>{
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

        //tblProductsIdParent = tblProductsDataObject._tblProductsIdParent;
        tblProductsIdParent = (tblProductsDataObject.hasOwnProperty("_tblProductsIdParent") === true) ? tblProductsDataObject._tblProductsIdParent : tblProductsIdParent;

        //tblProductsSortOrder = tblProductsDataObject._tblProductsSortOrder;
        tblProductsSortOrder = (tblProductsDataObject.hasOwnProperty("_tblProductsSortOrder") === true) ? tblProductsDataObject._tblProductsSortOrder : tblProductsSortOrder;
        if(!tblProductsSortOrder)
        {
            tblProductsSortOrder = 0;
        }

        tblProductsIdType = tblProductsDataObject._tblProductsIdType;

        tblProductsDateCreation = (tblProductsDataObject.hasOwnProperty("_tblProductsDateCreation") === true) ? tblProductsDataObject._tblProductsDateCreation : tblProductsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblProductsDateCreation)
        {
            let tblProductsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblProductsDateCreation = FunctionsGeneric.dateSQLWrite(tblProductsDateCreation_dateObj);
        }

        //tblProductsDateTimezone = (tblProductsDataObject.hasOwnProperty("_tblProductsDateTimezone") === true) ? tblProductsDataObject._tblProductsDateTimezone : tblProductsDateTimezone;
        
        tblProductsDateEdit = (tblProductsDataObject.hasOwnProperty("_tblProductsDateEdit") === true) ? tblProductsDataObject._tblProductsDateEdit : tblProductsDateEdit;
        if(!tblProductsDateEdit)
        {
            let tblProductsDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblProductsDateEdit = FunctionsGeneric.dateSQLWrite(tblProductsDateEdit_dateObj);
        }

        tblProductsIdRegisterUser = (tblProductsDataObject.hasOwnProperty("_tblProductsIdRegisterUser") === true) ? tblProductsDataObject._tblProductsIdRegisterUser : tblProductsIdRegisterUser;
        if(!tblProductsIdRegisterUser)
        {
            tblProductsIdRegisterUser = 0;
        }
        tblProductsIdRegister1 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdRegister1") === true) ? tblProductsDataObject._tblProductsIdRegister1 : tblProductsIdRegister1;
        if(!tblProductsIdRegister1)
        {
            tblProductsIdRegister1 = 0;
        }
        tblProductsIdRegister2 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdRegister2") === true) ? tblProductsDataObject._tblProductsIdRegister2 : tblProductsIdRegister2;
        if(!tblProductsIdRegister2)
        {
            tblProductsIdRegister2 = 0;
        }
        tblProductsIdRegister3 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdRegister3") === true) ? tblProductsDataObject._tblProductsIdRegister3 : tblProductsIdRegister3;
        if(!tblProductsIdRegister3)
        {
            tblProductsIdRegister3 = 0;
        }
        tblProductsIdRegister4 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdRegister4") === true) ? tblProductsDataObject._tblProductsIdRegister4 : tblProductsIdRegister4;
        if(!tblProductsIdRegister4)
        {
            tblProductsIdRegister4 = 0;
        }
        tblProductsIdRegister5 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdRegister5") === true) ? tblProductsDataObject._tblProductsIdRegister5 : tblProductsIdRegister5;
        if(!tblProductsIdRegister5)
        {
            tblProductsIdRegister5 = 0;
        }

        tblProductsCode = (tblProductsDataObject.hasOwnProperty("_tblProductsCode") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsCode, "db_write_text") : tblProductsCode;
        tblProductsTitle = (tblProductsDataObject.hasOwnProperty("_tblProductsTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsTitle, "db_write_text") : tblProductsTitle;
        tblProductsDescription = (tblProductsDataObject.hasOwnProperty("_tblProductsDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsDescription, "db_write_text") : tblProductsDescription;
        
        tblProductsURLAlias = (tblProductsDataObject.hasOwnProperty("_tblProductsURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsURLAlias, "db_write_text") : tblProductsURLAlias;
        tblProductsKeywordsTags = (tblProductsDataObject.hasOwnProperty("_tblProductsKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsKeywordsTags, "db_write_text") : tblProductsKeywordsTags;
        tblProductsMetaDescription = (tblProductsDataObject.hasOwnProperty("_tblProductsMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsMetaDescription, "db_write_text") : tblProductsMetaDescription;
        tblProductsMetaTitle = (tblProductsDataObject.hasOwnProperty("_tblProductsMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsMetaTitle, "db_write_text") : tblProductsMetaTitle;
        tblProductsMetaInfo = (tblProductsDataObject.hasOwnProperty("_tblProductsMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsMetaInfo, "db_write_text") : tblProductsMetaInfo;
        
        if(gSystemConfig.configProductsInfo1FieldType == 1 || gSystemConfig.configProductsInfo1FieldType == 2)
        {
            tblProductsInfo1 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo1, "db_write_text") : tblProductsInfo1;
        }
        if(gSystemConfig.configProductsInfo1FieldType == 11 || gSystemConfig.configProductsInfo1FieldType == 12)
        {
            tblProductsInfo1 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo1, "db_write_text"), 2) : tblProductsInfo1;
        }

        if(gSystemConfig.configProductsInfo2FieldType == 1 || gSystemConfig.configProductsInfo2FieldType == 2)
        {
            tblProductsInfo2 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo2, "db_write_text") : tblProductsInfo2;
        }
        if(gSystemConfig.configProductsInfo2FieldType == 11 || gSystemConfig.configProductsInfo2FieldType == 12)
        {
            tblProductsInfo2 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo2, "db_write_text"), 2) : tblProductsInfo2;
        }

        if(gSystemConfig.configProductsInfo3FieldType == 1 || gSystemConfig.configProductsInfo3FieldType == 2)
        {
            tblProductsInfo3 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo3, "db_write_text") : tblProductsInfo3;
        }
        if(gSystemConfig.configProductsInfo3FieldType == 11 || gSystemConfig.configProductsInfo3FieldType == 12)
        {
            tblProductsInfo3 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo3, "db_write_text"), 2) : tblProductsInfo3;
        }

        if(gSystemConfig.configProductsInfo4FieldType == 1 || gSystemConfig.configProductsInfo4FieldType == 2)
        {
            tblProductsInfo4 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo4, "db_write_text") : tblProductsInfo4;
        }
        if(gSystemConfig.configProductsInfo4FieldType == 11 || gSystemConfig.configProductsInfo4FieldType == 12)
        {
            tblProductsInfo4 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo4, "db_write_text"), 2) : tblProductsInfo1;
        }

        if(gSystemConfig.configProductsInfo5FieldType == 1 || gSystemConfig.configProductsInfo5FieldType == 2)
        {
            tblProductsInfo5 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo5, "db_write_text") : tblProductsInfo5;
        }
        if(gSystemConfig.configProductsInfo5FieldType == 11 || gSystemConfig.configProductsInfo5FieldType == 12)
        {
            tblProductsInfo5 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo5, "db_write_text"), 2) : tblProductsInfo5;
        }

        if(gSystemConfig.configProductsInfo6FieldType == 1 || gSystemConfig.configProductsInfo6FieldType == 2)
        {
            tblProductsInfo6 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo6") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo6, "db_write_text") : tblProductsInfo6;
        }
        if(gSystemConfig.configProductsInfo6FieldType == 11 || gSystemConfig.configProductsInfo6FieldType == 12)
        {
            tblProductsInfo6 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo6") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo6, "db_write_text"), 2) : tblProductsInfo6;
        }

        if(gSystemConfig.configProductsInfo7FieldType == 1 || gSystemConfig.configProductsInfo7FieldType == 2)
        {
            tblProductsInfo7 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo7") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo7, "db_write_text") : tblProductsInfo7;
        }
        if(gSystemConfig.configProductsInfo7FieldType == 11 || gSystemConfig.configProductsInfo7FieldType == 12)
        {
            tblProductsInfo7 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo7") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo7, "db_write_text"), 2) : tblProductsInfo7;
        }

        if(gSystemConfig.configProductsInfo8FieldType == 1 || gSystemConfig.configProductsInfo8FieldType == 2)
        {
            tblProductsInfo8 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo8") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo8, "db_write_text") : tblProductsInfo8;
        }
        if(gSystemConfig.configProductsInfo8FieldType == 11 || gSystemConfig.configProductsInfo8FieldType == 12)
        {
            tblProductsInfo8 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo8") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo8, "db_write_text"), 2) : tblProductsInfo8;
        }

        if(gSystemConfig.configProductsInfo9FieldType == 1 || gSystemConfig.configProductsInfo9FieldType == 2)
        {
            tblProductsInfo9 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo9") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo9, "db_write_text") : tblProductsInfo9;
        }
        if(gSystemConfig.configProductsInfo9FieldType == 11 || gSystemConfig.configProductsInfo9FieldType == 12)
        {
            tblProductsInfo9 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo9") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo9, "db_write_text"), 2) : tblProductsInfo9;
        }

        if(gSystemConfig.configProductsInfo10FieldType == 1 || gSystemConfig.configProductsInfo10FieldType == 2)
        {
            tblProductsInfo10 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo10") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo10, "db_write_text") : tblProductsInfo10;
        }
        if(gSystemConfig.configProductsInfo10FieldType == 11 || gSystemConfig.configProductsInfo10FieldType == 12)
        {
            tblProductsInfo10 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo10") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo10, "db_write_text"), 2) : tblProductsInfo10;
        }

        if(gSystemConfig.configProductsInfo11FieldType == 1 || gSystemConfig.configProductsInfo11FieldType == 2)
        {
            tblProductsInfo11 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo11") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo11, "db_write_text") : tblProductsInfo11;
        }
        if(gSystemConfig.configProductsInfo11FieldType == 11 || gSystemConfig.configProductsInfo11FieldType == 12)
        {
            tblProductsInfo11 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo11") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo11, "db_write_text"), 2) : tblProductsInfo11;
        }

        if(gSystemConfig.configProductsInfo12FieldType == 1 || gSystemConfig.configProductsInfo12FieldType == 2)
        {
            tblProductsInfo12 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo12") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo12, "db_write_text") : tblProductsInfo12;
        }
        if(gSystemConfig.configProductsInfo12FieldType == 11 || gSystemConfig.configProductsInfo12FieldType == 12)
        {
            tblProductsInfo12 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo12") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo12, "db_write_text"), 2) : tblProductsInfo12;
        }

        if(gSystemConfig.configProductsInfo13FieldType == 1 || gSystemConfig.configProductsInfo13FieldType == 2)
        {
            tblProductsInfo13 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo13") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo13, "db_write_text") : tblProductsInfo13;
        }
        if(gSystemConfig.configProductsInfo13FieldType == 11 || gSystemConfig.configProductsInfo13FieldType == 12)
        {
            tblProductsInfo13 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo13") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo13, "db_write_text"), 2) : tblProductsInfo13;
        }

        if(gSystemConfig.configProductsInfo14FieldType == 1 || gSystemConfig.configProductsInfo14FieldType == 2)
        {
            tblProductsInfo14 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo14") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo14, "db_write_text") : tblProductsInfo14;
        }
        if(gSystemConfig.configProductsInfo14FieldType == 11 || gSystemConfig.configProductsInfo14FieldType == 12)
        {
            tblProductsInfo14 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo14") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo14, "db_write_text"), 2) : tblProductsInfo11;
        }

        if(gSystemConfig.configProductsInfo15FieldType == 1 || gSystemConfig.configProductsInfo15FieldType == 2)
        {
            tblProductsInfo15 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo15") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo15, "db_write_text") : tblProductsInfo15;
        }
        if(gSystemConfig.configProductsInfo15FieldType == 11 || gSystemConfig.configProductsInfo15FieldType == 12)
        {
            tblProductsInfo15 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo11") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo15, "db_write_text"), 2) : tblProductsInfo15;
        }

        if(gSystemConfig.configProductsInfo16FieldType == 1 || gSystemConfig.configProductsInfo16FieldType == 2)
        {
            tblProductsInfo16 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo16") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo16, "db_write_text") : tblProductsInfo16;
        }
        if(gSystemConfig.configProductsInfo16FieldType == 11 || gSystemConfig.configProductsInfo16FieldType == 12)
        {
            tblProductsInfo16 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo16") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo16, "db_write_text"), 2) : tblProductsInfo16;
        }

        if(gSystemConfig.configProductsInfo17FieldType == 1 || gSystemConfig.configProductsInfo17FieldType == 2)
        {
            tblProductsInfo17 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo17") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo17, "db_write_text") : tblProductsInfo17;
        }
        if(gSystemConfig.configProductsInfo17FieldType == 11 || gSystemConfig.configProductsInfo17FieldType == 12)
        {
            tblProductsInfo17 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo17") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo17, "db_write_text"), 2) : tblProductsInfo17;
        }

        if(gSystemConfig.configProductsInfo18FieldType == 1 || gSystemConfig.configProductsInfo18FieldType == 2)
        {
            tblProductsInfo18 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo18") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo18, "db_write_text") : tblProductsInfo18;
        }
        if(gSystemConfig.configProductsInfo18FieldType == 11 || gSystemConfig.configProductsInfo18FieldType == 12)
        {
            tblProductsInfo18 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo18") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo18, "db_write_text"), 2) : tblProductsInfo18;
        }

        if(gSystemConfig.configProductsInfo19FieldType == 1 || gSystemConfig.configProductsInfo19FieldType == 2)
        {
            tblProductsInfo19 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo19") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo19, "db_write_text") : tblProductsInfo19;
        }
        if(gSystemConfig.configProductsInfo19FieldType == 11 || gSystemConfig.configProductsInfo19FieldType == 12)
        {
            tblProductsInfo19 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo19") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo19, "db_write_text"), 2) : tblProductsInfo19;
        }

        if(gSystemConfig.configProductsInfo20FieldType == 1 || gSystemConfig.configProductsInfo20FieldType == 2)
        {
            tblProductsInfo20 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo20") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo20, "db_write_text") : tblProductsInfo20;
        }
        if(gSystemConfig.configProductsInfo20FieldType == 11 || gSystemConfig.configProductsInfo20FieldType == 12)
        {
            tblProductsInfo20 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfo20") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfo20, "db_write_text"), 2) : tblProductsInfo20;
        }
        
        tblProductsInfoSmall1 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall1") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall1, "db_write_text") : tblProductsInfoSmall1;
        tblProductsInfoSmall2 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall2") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall2, "db_write_text") : tblProductsInfoSmall2;
        tblProductsInfoSmall3 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall3") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall3, "db_write_text") : tblProductsInfoSmall3;
        tblProductsInfoSmall4 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall4") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall4, "db_write_text") : tblProductsInfoSmall4;
        tblProductsInfoSmall5 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall5") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall5, "db_write_text") : tblProductsInfoSmall5;
        tblProductsInfoSmall6 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall6") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall6, "db_write_text") : tblProductsInfoSmall6;
        tblProductsInfoSmall7 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall7") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall7, "db_write_text") : tblProductsInfoSmall7;
        tblProductsInfoSmall8 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall8") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall8, "db_write_text") : tblProductsInfoSmall8;
        tblProductsInfoSmall9 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall9") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall9, "db_write_text") : tblProductsInfoSmall9;
        tblProductsInfoSmall10 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall10") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall10, "db_write_text") : tblProductsInfoSmall10;
        tblProductsInfoSmall11 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall11") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall11, "db_write_text") : tblProductsInfoSmall11;
        tblProductsInfoSmall12 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall12") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall12, "db_write_text") : tblProductsInfoSmall12;
        tblProductsInfoSmall13 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall13") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall13, "db_write_text") : tblProductsInfoSmall13;
        tblProductsInfoSmall14 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall14") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall14, "db_write_text") : tblProductsInfoSmall14;
        tblProductsInfoSmall15 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall15") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall15, "db_write_text") : tblProductsInfoSmall15;
        tblProductsInfoSmall16 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall16") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall16, "db_write_text") : tblProductsInfoSmall16;
        tblProductsInfoSmall17 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall17") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall17, "db_write_text") : tblProductsInfoSmall17;
        tblProductsInfoSmall18 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall18") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall18, "db_write_text") : tblProductsInfoSmall18;
        tblProductsInfoSmall19 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall19") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall19, "db_write_text") : tblProductsInfoSmall19;
        tblProductsInfoSmall20 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall20") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall20, "db_write_text") : tblProductsInfoSmall20;
        tblProductsInfoSmall21 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall21") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall21, "db_write_text") : tblProductsInfoSmall21;
        tblProductsInfoSmall22 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall22") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall22, "db_write_text") : tblProductsInfoSmall22;
        tblProductsInfoSmall23 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall23") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall23, "db_write_text") : tblProductsInfoSmall23;
        tblProductsInfoSmall24 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall24") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall24, "db_write_text") : tblProductsInfoSmall24;
        tblProductsInfoSmall25 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall25") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall25, "db_write_text") : tblProductsInfoSmall25;
        tblProductsInfoSmall26 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall26") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall26, "db_write_text") : tblProductsInfoSmall26;
        tblProductsInfoSmall27 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall27") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall27, "db_write_text") : tblProductsInfoSmall27;
        tblProductsInfoSmall28 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall28") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall28, "db_write_text") : tblProductsInfoSmall28;
        tblProductsInfoSmall29 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall29") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall29, "db_write_text") : tblProductsInfoSmall29;
        tblProductsInfoSmall30 = (tblProductsDataObject.hasOwnProperty("_tblProductsInfoSmall30") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsInfoSmall30, "db_write_text") : tblProductsInfoSmall30;

        tblProductsValue = (tblProductsDataObject.hasOwnProperty("_tblProductsValue") === true && (tblProductsDataObject._tblProductsValue)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsValue, 2) : tblProductsValue;
        tblProductsValue1 = (tblProductsDataObject.hasOwnProperty("_tblProductsValue1") === true && (tblProductsDataObject._tblProductsValue1)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsValue1, 2) : tblProductsValue1;
        tblProductsValue2 = (tblProductsDataObject.hasOwnProperty("_tblProductsValue2") === true && (tblProductsDataObject._tblProductsValue2)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsValue2, 2) : tblProductsValue2;
        tblProductsWeight = (tblProductsDataObject.hasOwnProperty("_tblProductsWeight") === true && (tblProductsDataObject._tblProductsWeight)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsWeight, 3) : tblProductsWeight;
        tblProductsCoefficient = (tblProductsDataObject.hasOwnProperty("_tblProductsCoefficient") === true && (tblProductsDataObject._tblProductsCoefficient)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsCoefficient, 3) : tblProductsCoefficient;
        
        tblProductsNumber1 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumber1") === true && (tblProductsDataObject._tblProductsNumber1)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumber1, gSystemConfig.configProductsNumber1FieldType) : tblProductsNumber1;
        tblProductsNumber2 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumber2") === true && (tblProductsDataObject._tblProductsNumber2)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumber2, gSystemConfig.configProductsNumber2FieldType) : tblProductsNumber2;
        tblProductsNumber3 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumber3") === true && (tblProductsDataObject._tblProductsNumber3)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumber3, gSystemConfig.configProductsNumber3FieldType) : tblProductsNumber3;
        tblProductsNumber4 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumber4") === true && (tblProductsDataObject._tblProductsNumber4)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumber4, gSystemConfig.configProductsNumber4FieldType) : tblProductsNumber4;
        tblProductsNumber5 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumber5") === true && (tblProductsDataObject._tblProductsNumber5)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumber5, gSystemConfig.configProductsNumber5FieldType) : tblProductsNumber5;
        
        tblProductsNumberSmall1 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumberSmall1") === true && (tblProductsDataObject._tblProductsNumberSmall1)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumberSmall1, gSystemConfig.configProductsNumberS1FieldType) : tblProductsNumberSmall1;
        tblProductsNumberSmall2 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumberSmall2") === true && (tblProductsDataObject._tblProductsNumberSmall2)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumberSmall2, gSystemConfig.configProductsNumberS2FieldType) : tblProductsNumberSmall2;
        tblProductsNumberSmall3 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumberSmall3") === true && (tblProductsDataObject._tblProductsNumberSmall3)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumberSmall3, gSystemConfig.configProductsNumberS3FieldType) : tblProductsNumberSmall3;
        tblProductsNumberSmall4 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumberSmall4") === true && (tblProductsDataObject._tblProductsNumberSmall4)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumberSmall4, gSystemConfig.configProductsNumberS4FieldType) : tblProductsNumberSmall4;
        tblProductsNumberSmall5 = (tblProductsDataObject.hasOwnProperty("_tblProductsNumberSmall5") === true && (tblProductsDataObject._tblProductsNumberSmall5)) ? FunctionsGeneric.valueMaskWrite(tblProductsDataObject._tblProductsNumberSmall5, gSystemConfig.configProductsNumberS5FieldType) : tblProductsNumberSmall5;
        
        tblProductsURL1 = (tblProductsDataObject.hasOwnProperty("_tblProductsURL1") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsURL1, "db_write_text") : tblProductsURL1;
        tblProductsURL2 = (tblProductsDataObject.hasOwnProperty("_tblProductsURL2") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsURL2, "db_write_text") : tblProductsURL2;
        tblProductsURL3 = (tblProductsDataObject.hasOwnProperty("_tblProductsURL3") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsURL3, "db_write_text") : tblProductsURL3;
        tblProductsURL4 = (tblProductsDataObject.hasOwnProperty("_tblProductsURL4") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsURL4, "db_write_text") : tblProductsURL4;
        tblProductsURL5 = (tblProductsDataObject.hasOwnProperty("_tblProductsURL5") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsURL5, "db_write_text") : tblProductsURL5;
        
        tblProductsDate1 = (tblProductsDataObject.hasOwnProperty("_tblProductsDate1") === true && (tblProductsDataObject._tblProductsDate1)) ? FunctionsGeneric.dateSQLWrite(tblProductsDataObject._tblProductsDate1, gSystemConfig.configBackendDateFormat) : tblProductsDate1;
        tblProductsDate2 = (tblProductsDataObject.hasOwnProperty("_tblProductsDate2") === true && (tblProductsDataObject._tblProductsDate2)) ? FunctionsGeneric.dateSQLWrite(tblProductsDataObject._tblProductsDate2, gSystemConfig.configBackendDateFormat) : tblProductsDate2;
        tblProductsDate3 = (tblProductsDataObject.hasOwnProperty("_tblProductsDate3") === true && (tblProductsDataObject._tblProductsDate3)) ? FunctionsGeneric.dateSQLWrite(tblProductsDataObject._tblProductsDate3, gSystemConfig.configBackendDateFormat) : tblProductsDate3;
        tblProductsDate4 = (tblProductsDataObject.hasOwnProperty("_tblProductsDate4") === true && (tblProductsDataObject._tblProductsDate4)) ? FunctionsGeneric.dateSQLWrite(tblProductsDataObject._tblProductsDate4, gSystemConfig.configBackendDateFormat) : tblProductsDate4;
        tblProductsDate5 = (tblProductsDataObject.hasOwnProperty("_tblProductsDate5") === true && (tblProductsDataObject._tblProductsDate5)) ? FunctionsGeneric.dateSQLWrite(tblProductsDataObject._tblProductsDate5, gSystemConfig.configBackendDateFormat) : tblProductsDate5;
        
        tblProductsIdItem1 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdItem1") === true && (tblProductsDataObject._tblProductsIdItem1)) ? tblProductsDataObject._tblProductsIdItem1 : tblProductsIdItem1;
        tblProductsIdItem2 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdItem2") === true && (tblProductsDataObject._tblProductsIdItem2)) ? tblProductsDataObject._tblProductsIdItem2 : tblProductsIdItem2;
        tblProductsIdItem3 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdItem3") === true && (tblProductsDataObject._tblProductsIdItem3)) ? tblProductsDataObject._tblProductsIdItem3 : tblProductsIdItem3;
        tblProductsIdItem4 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdItem4") === true && (tblProductsDataObject._tblProductsIdItem4)) ? tblProductsDataObject._tblProductsIdItem4 : tblProductsIdItem4;
        tblProductsIdItem5 = (tblProductsDataObject.hasOwnProperty("_tblProductsIdItem5") === true && (tblProductsDataObject._tblProductsIdItem5)) ? tblProductsDataObject._tblProductsIdItem5 : tblProductsIdItem5;
        
        tblProductsImageMain = (tblProductsDataObject.hasOwnProperty("_tblProductsImageMain") === true) ? tblProductsDataObject._tblProductsImageMain : tblProductsImageMain;
        tblProductsImageMainCaption = (tblProductsDataObject.hasOwnProperty("_tblProductsImageMainCaption") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsImageMainCaption, "db_write_text") : tblProductsImageMainCaption;
        tblProductsFile1 = (tblProductsDataObject.hasOwnProperty("_tblProductsFile1") === true) ? tblProductsDataObject._tblProductsFile1 : tblProductsFile1;
        tblProductsFile2 = (tblProductsDataObject.hasOwnProperty("_tblProductsFile2") === true) ? tblProductsDataObject._tblProductsFile2 : tblProductsFile2;
        tblProductsFile3 = (tblProductsDataObject.hasOwnProperty("_tblProductsFile3") === true) ? tblProductsDataObject._tblProductsFile3 : tblProductsFile3;
        tblProductsFile4 = (tblProductsDataObject.hasOwnProperty("_tblProductsFile4") === true) ? tblProductsDataObject._tblProductsFile4 : tblProductsFile4;
        tblProductsFile5 = (tblProductsDataObject.hasOwnProperty("_tblProductsFile5") === true) ? tblProductsDataObject._tblProductsFile5 : tblProductsFile5;
        
        tblProductsActivation = (tblProductsDataObject.hasOwnProperty("_tblProductsActivation") === true && (tblProductsDataObject._tblProductsActivation)) ? tblProductsDataObject._tblProductsActivation : tblProductsActivation;
        tblProductsActivation1 = (tblProductsDataObject.hasOwnProperty("_tblProductsActivation1") === true && (tblProductsDataObject._tblProductsActivation1)) ? tblProductsDataObject._tblProductsActivation1 : tblProductsActivation1;
        tblProductsActivation2 = (tblProductsDataObject.hasOwnProperty("_tblProductsActivation2") === true && (tblProductsDataObject._tblProductsActivation2)) ? tblProductsDataObject._tblProductsActivation2 : tblProductsActivation2;
        tblProductsActivation3 = (tblProductsDataObject.hasOwnProperty("_tblProductsActivation3") === true && (tblProductsDataObject._tblProductsActivation3)) ? tblProductsDataObject._tblProductsActivation3 : tblProductsActivation3;
        tblProductsActivation4 = (tblProductsDataObject.hasOwnProperty("_tblProductsActivation5") === true && (tblProductsDataObject._tblProductsActivation4)) ? tblProductsDataObject._tblProductsActivation4 : tblProductsActivation5;
        tblProductsActivation5 = (tblProductsDataObject.hasOwnProperty("_tblProductsActivation5") === true && (tblProductsDataObject._tblProductsActivation5)) ? tblProductsDataObject._tblProductsActivation5 : tblProductsActivation5;
        
        tblProductsIdStatus = (tblProductsDataObject.hasOwnProperty("_tblProductsIdStatus") === true && (tblProductsDataObject._tblProductsIdStatus)) ? tblProductsDataObject._tblProductsIdStatus : tblProductsIdStatus;
        tblProductsRestrictedAccess = (tblProductsDataObject.hasOwnProperty("_tblProductsRestrictedAccess") === true && (tblProductsDataObject._tblProductsRestrictedAccess)) ? tblProductsDataObject._tblProductsRestrictedAccess : tblProductsRestrictedAccess;
        
        tblProductsNotes = (tblProductsDataObject.hasOwnProperty("_tblProductsNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblProductsDataObject._tblProductsNotes, "db_write_text") : tblProductsNotes;
        
        arrIdsProductsFiltersGeneric1 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric1") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric1)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric1 : arrIdsProductsFiltersGeneric1;
        arrIdsProductsFiltersGeneric2 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric2") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric2)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric2 : arrIdsProductsFiltersGeneric2;
        arrIdsProductsFiltersGeneric3 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric3") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric3)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric3 : arrIdsProductsFiltersGeneric3;
        arrIdsProductsFiltersGeneric4 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric4") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric4)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric4 : arrIdsProductsFiltersGeneric4;
        arrIdsProductsFiltersGeneric5 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric5") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric5)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric5 : arrIdsProductsFiltersGeneric5;
        arrIdsProductsFiltersGeneric6 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric6") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric6)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric6 : arrIdsProductsFiltersGeneric6;
        arrIdsProductsFiltersGeneric5 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric5") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric5)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric5 : arrIdsProductsFiltersGeneric5;
        arrIdsProductsFiltersGeneric6 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric6") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric6)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric6 : arrIdsProductsFiltersGeneric6;
        arrIdsProductsFiltersGeneric7 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric7") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric7)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric7 : arrIdsProductsFiltersGeneric7;
        arrIdsProductsFiltersGeneric8 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric8") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric8)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric8 : arrIdsProductsFiltersGeneric8;
        arrIdsProductsFiltersGeneric9 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric9") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric9)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric9 : arrIdsProductsFiltersGeneric9;
        arrIdsProductsFiltersGeneric10 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric10") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric10)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric10 : arrIdsProductsFiltersGeneric10;
        arrIdsProductsFiltersGeneric11 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric11") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric11)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric11 : arrIdsProductsFiltersGeneric11;
        arrIdsProductsFiltersGeneric12 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric12") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric12)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric12 : arrIdsProductsFiltersGeneric12;
        arrIdsProductsFiltersGeneric13 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric13") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric13)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric13 : arrIdsProductsFiltersGeneric13;
        arrIdsProductsFiltersGeneric14 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric14") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric14)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric14 : arrIdsProductsFiltersGeneric14;
        arrIdsProductsFiltersGeneric15 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric15") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric15)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric15 : arrIdsProductsFiltersGeneric15;
        arrIdsProductsFiltersGeneric16 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric16") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric16)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric16 : arrIdsProductsFiltersGeneric16;
        arrIdsProductsFiltersGeneric15 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric15") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric15)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric15 : arrIdsProductsFiltersGeneric15;
        arrIdsProductsFiltersGeneric16 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric16") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric16)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric16 : arrIdsProductsFiltersGeneric16;
        arrIdsProductsFiltersGeneric17 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric17") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric17)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric17 : arrIdsProductsFiltersGeneric17;
        arrIdsProductsFiltersGeneric18 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric18") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric18)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric18 : arrIdsProductsFiltersGeneric18;
        arrIdsProductsFiltersGeneric19 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric19") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric19)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric19 : arrIdsProductsFiltersGeneric19;
        arrIdsProductsFiltersGeneric20 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric20") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric20)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric20 : arrIdsProductsFiltersGeneric20;
        arrIdsProductsFiltersGeneric21 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric21") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric21)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric21 : arrIdsProductsFiltersGeneric21;
        arrIdsProductsFiltersGeneric22 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric22") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric22)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric22 : arrIdsProductsFiltersGeneric22;
        arrIdsProductsFiltersGeneric23 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric23") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric23)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric23 : arrIdsProductsFiltersGeneric23;
        arrIdsProductsFiltersGeneric24 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric24") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric24)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric24 : arrIdsProductsFiltersGeneric24;
        arrIdsProductsFiltersGeneric25 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric25") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric25)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric25 : arrIdsProductsFiltersGeneric25;
        arrIdsProductsFiltersGeneric26 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric26") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric26)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric26 : arrIdsProductsFiltersGeneric26;
        arrIdsProductsFiltersGeneric25 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric25") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric25)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric25 : arrIdsProductsFiltersGeneric25;
        arrIdsProductsFiltersGeneric26 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric26") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric26)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric26 : arrIdsProductsFiltersGeneric26;
        arrIdsProductsFiltersGeneric27 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric27") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric27)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric27 : arrIdsProductsFiltersGeneric27;
        arrIdsProductsFiltersGeneric28 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric28") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric28)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric28 : arrIdsProductsFiltersGeneric28;
        arrIdsProductsFiltersGeneric29 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric29") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric29)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric29 : arrIdsProductsFiltersGeneric29;
        arrIdsProductsFiltersGeneric30 = (tblProductsDataObject.hasOwnProperty("_arrIdsProductsFiltersGeneric30") === true && (tblProductsDataObject._arrIdsProductsFiltersGeneric30)) ? tblProductsDataObject._arrIdsProductsFiltersGeneric30 : arrIdsProductsFiltersGeneric30;
        //----------------------


        //Debug.
        //console.log("tblProductsDataObject=", tblProductsDataObject);


        //Query.
        //----------------------
        //strSQLProductsInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLProductsInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableProducts + " ";
        strSQLProductsInsert += "SET ?";
        //----------------------


        //Parameters.
        //----------------------
        strSQLProductsInsertParams.id = tblProductsID;
        strSQLProductsInsertParams.id_parent = tblProductsIdParent;
        strSQLProductsInsertParams.sort_order = tblProductsSortOrder;
        strSQLProductsInsertParams.id_type = tblProductsIdType;

        strSQLProductsInsertParams.date_creation = tblProductsDateCreation;
        //strSQLProductsInsertParams.date_timezone = tblProductsDateTimezone;
        strSQLProductsInsertParams.date_edit = tblProductsDateEdit;

        strSQLProductsInsertParams.id_register_user = tblProductsIdRegisterUser;
        strSQLProductsInsertParams.id_register1 = tblProductsIdRegister1;
        strSQLProductsInsertParams.id_register2 = tblProductsIdRegister2;
        strSQLProductsInsertParams.id_register3 = tblProductsIdRegister3;
        strSQLProductsInsertParams.id_register4 = tblProductsIdRegister4;
        strSQLProductsInsertParams.id_register5 = tblProductsIdRegister5;

        strSQLProductsInsertParams.code = tblProductsCode;
        strSQLProductsInsertParams.title = tblProductsTitle;
        strSQLProductsInsertParams.description = tblProductsDescription;

        strSQLProductsInsertParams.url_alias = tblProductsURLAlias;
        strSQLProductsInsertParams.keywords_tags = tblProductsKeywordsTags;
        strSQLProductsInsertParams.meta_description = tblProductsMetaDescription;
        strSQLProductsInsertParams.meta_title = tblProductsMetaTitle;
        strSQLProductsInsertParams.meta_info = tblProductsMetaInfo;

        strSQLProductsInsertParams.info1 = tblProductsInfo1;
        strSQLProductsInsertParams.info2 = tblProductsInfo2;
        strSQLProductsInsertParams.info3 = tblProductsInfo3;
        strSQLProductsInsertParams.info4 = tblProductsInfo4;
        strSQLProductsInsertParams.info5 = tblProductsInfo5;
        strSQLProductsInsertParams.info6 = tblProductsInfo6;
        strSQLProductsInsertParams.info7 = tblProductsInfo7;
        strSQLProductsInsertParams.info8 = tblProductsInfo8;
        strSQLProductsInsertParams.info9 = tblProductsInfo9;
        strSQLProductsInsertParams.info10 = tblProductsInfo10;
        strSQLProductsInsertParams.info11 = tblProductsInfo11;
        strSQLProductsInsertParams.info12 = tblProductsInfo12;
        strSQLProductsInsertParams.info13 = tblProductsInfo13;
        strSQLProductsInsertParams.info14 = tblProductsInfo14;
        strSQLProductsInsertParams.info15 = tblProductsInfo15;
        strSQLProductsInsertParams.info16 = tblProductsInfo16;
        strSQLProductsInsertParams.info17 = tblProductsInfo17;
        strSQLProductsInsertParams.info18 = tblProductsInfo18;
        strSQLProductsInsertParams.info19 = tblProductsInfo19;
        strSQLProductsInsertParams.info20 = tblProductsInfo20;

        strSQLProductsInsertParams.info_small1 = tblProductsInfoSmall1;
        strSQLProductsInsertParams.info_small2 = tblProductsInfoSmall2;
        strSQLProductsInsertParams.info_small3 = tblProductsInfoSmall3;
        strSQLProductsInsertParams.info_small4 = tblProductsInfoSmall4;
        strSQLProductsInsertParams.info_small5 = tblProductsInfoSmall5;
        strSQLProductsInsertParams.info_small6 = tblProductsInfoSmall6;
        strSQLProductsInsertParams.info_small7 = tblProductsInfoSmall7;
        strSQLProductsInsertParams.info_small8 = tblProductsInfoSmall8;
        strSQLProductsInsertParams.info_small9 = tblProductsInfoSmall9;
        strSQLProductsInsertParams.info_small10 = tblProductsInfoSmall10;
        strSQLProductsInsertParams.info_small11 = tblProductsInfoSmall11;
        strSQLProductsInsertParams.info_small12 = tblProductsInfoSmall12;
        strSQLProductsInsertParams.info_small13 = tblProductsInfoSmall13;
        strSQLProductsInsertParams.info_small14 = tblProductsInfoSmall14;
        strSQLProductsInsertParams.info_small15 = tblProductsInfoSmall15;
        strSQLProductsInsertParams.info_small16 = tblProductsInfoSmall16;
        strSQLProductsInsertParams.info_small17 = tblProductsInfoSmall17;
        strSQLProductsInsertParams.info_small18 = tblProductsInfoSmall18;
        strSQLProductsInsertParams.info_small19 = tblProductsInfoSmall19;
        strSQLProductsInsertParams.info_small20 = tblProductsInfoSmall20;
        strSQLProductsInsertParams.info_small21 = tblProductsInfoSmall21;
        strSQLProductsInsertParams.info_small22 = tblProductsInfoSmall22;
        strSQLProductsInsertParams.info_small23 = tblProductsInfoSmall23;
        strSQLProductsInsertParams.info_small24 = tblProductsInfoSmall24;
        strSQLProductsInsertParams.info_small25 = tblProductsInfoSmall25;
        strSQLProductsInsertParams.info_small26 = tblProductsInfoSmall26;
        strSQLProductsInsertParams.info_small27 = tblProductsInfoSmall27;
        strSQLProductsInsertParams.info_small28 = tblProductsInfoSmall28;
        strSQLProductsInsertParams.info_small29 = tblProductsInfoSmall29;
        strSQLProductsInsertParams.info_small30 = tblProductsInfoSmall30;

        strSQLProductsInsertParams.value = tblProductsValue;
        strSQLProductsInsertParams.value1 = tblProductsValue1;
        strSQLProductsInsertParams.value2 = tblProductsValue2;
        strSQLProductsInsertParams.weight = tblProductsWeight;
        strSQLProductsInsertParams.coefficient = tblProductsCoefficient;

        strSQLProductsInsertParams.number1 = tblProductsNumber1;
        strSQLProductsInsertParams.number2 = tblProductsNumber2;
        strSQLProductsInsertParams.number3 = tblProductsNumber3;
        strSQLProductsInsertParams.number4 = tblProductsNumber4;
        strSQLProductsInsertParams.number5 = tblProductsNumber5;

        strSQLProductsInsertParams.number_small1 = tblProductsNumberSmall1;
        strSQLProductsInsertParams.number_small2 = tblProductsNumberSmall2;
        strSQLProductsInsertParams.number_small3 = tblProductsNumberSmall3;
        strSQLProductsInsertParams.number_small4 = tblProductsNumberSmall4;
        strSQLProductsInsertParams.number_small5 = tblProductsNumberSmall5;

        strSQLProductsInsertParams.url1 = tblProductsURL1;
        strSQLProductsInsertParams.url2 = tblProductsURL2;
        strSQLProductsInsertParams.url3 = tblProductsURL3;
        strSQLProductsInsertParams.url4 = tblProductsURL4;
        strSQLProductsInsertParams.url5 = tblProductsURL5;

        strSQLProductsInsertParams.date1 = tblProductsDate1;
        strSQLProductsInsertParams.date2 = tblProductsDate2;
        strSQLProductsInsertParams.date3 = tblProductsDate3;
        strSQLProductsInsertParams.date4 = tblProductsDate4;
        strSQLProductsInsertParams.date5 = tblProductsDate5;
        
        strSQLProductsInsertParams.id_item1 = tblProductsIdItem1;
        strSQLProductsInsertParams.id_item2 = tblProductsIdItem2;
        strSQLProductsInsertParams.id_item3 = tblProductsIdItem3;
        strSQLProductsInsertParams.id_item4 = tblProductsIdItem4;
        strSQLProductsInsertParams.id_item5 = tblProductsIdItem5;
        
        strSQLProductsInsertParams.image_main = tblProductsImageMain;
        strSQLProductsInsertParams.image_main_caption = tblProductsImageMainCaption;
        strSQLProductsInsertParams.file1 = tblProductsFile1;
        strSQLProductsInsertParams.file2 = tblProductsFile2;
        strSQLProductsInsertParams.file3 = tblProductsFile3;
        strSQLProductsInsertParams.file4 = tblProductsFile4;
        strSQLProductsInsertParams.file5 = tblProductsFile5;

        strSQLProductsInsertParams.activation = tblProductsActivation;
        strSQLProductsInsertParams.activation1 = tblProductsActivation1;
        strSQLProductsInsertParams.activation2 = tblProductsActivation2;
        strSQLProductsInsertParams.activation3 = tblProductsActivation3;
        strSQLProductsInsertParams.activation4 = tblProductsActivation4;
        strSQLProductsInsertParams.activation5 = tblProductsActivation5;
        
        strSQLProductsInsertParams.id_status = tblProductsIdStatus;
        strSQLProductsInsertParams.restricted_access = tblProductsRestrictedAccess;

        strSQLProductsInsertParams.notes = tblProductsNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLProductsInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLProductsInsert, strSQLProductsInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLProductsInsert, strSQLProductsInsertParams, (dbSystemError, results) => {
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
        //resultsSQLProductsInsert object ex: 
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
        if(resultsSQLProductsInsert.affectedRows > 0)
        {
            //Record filters generic.
            //OPTIMIZE: make only one insert with multiple records

            //Filters generic 1 - record.
            if(gSystemConfig.enableProductsFilterGeneric1 != 0)
            {
                if(arrIdsProductsFiltersGeneric1)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric1.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric1[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 101,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });

                        //console.log("arrIdsProductsFiltersGeneric1[]=", arrIdsProductsFiltersGeneric1[countArray]);
                    }
                }
            }

            //Filters generic 2 - record.
            if(gSystemConfig.enableProductsFilterGeneric2 != 0)
            {
                if(arrIdsProductsFiltersGeneric2)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric2.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric2[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 102,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 3 - record.
            if(gSystemConfig.enableProductsFilterGeneric3 != 0)
            {
                if(arrIdsProductsFiltersGeneric3)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric3.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric3[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 103,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 4 - record.
            if(gSystemConfig.enableProductsFilterGeneric4 != 0)
            {
                if(arrIdsProductsFiltersGeneric4)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric4.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric4[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 104,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 5 - record.
            if(gSystemConfig.enableProductsFilterGeneric5 != 0)
            {
                if(arrIdsProductsFiltersGeneric5)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric5.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric5[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 105,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 6 - record.
            if(gSystemConfig.enableProductsFilterGeneric6 != 0)
            {
                if(arrIdsProductsFiltersGeneric6)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric6.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric6[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 106,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 7 - record.
            if(gSystemConfig.enableProductsFilterGeneric7 != 0)
            {
                if(arrIdsProductsFiltersGeneric7)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric7.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric7[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 107,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 8 - record.
            if(gSystemConfig.enableProductsFilterGeneric8 != 0)
            {
                if(arrIdsProductsFiltersGeneric8)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric8.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric8[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 108,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 9 - record.
            if(gSystemConfig.enableProductsFilterGeneric9 != 0)
            {
                if(arrIdsProductsFiltersGeneric9)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric9.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric9[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 109,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 10 - record.
            if(gSystemConfig.enableProductsFilterGeneric10 != 0)
            {
                if(arrIdsProductsFiltersGeneric10)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric10.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric10[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 110,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 11 - record.
            if(gSystemConfig.enableProductsFilterGeneric11 != 0)
            {
                if(arrIdsProductsFiltersGeneric11)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric11.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric11[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 111,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });

                        //console.log("arrIdsProductsFiltersGeneric11[]=", arrIdsProductsFiltersGeneric11[countArray]);
                    }
                }
            }

            //Filters generic 12 - record.
            if(gSystemConfig.enableProductsFilterGeneric12 != 0)
            {
                if(arrIdsProductsFiltersGeneric12)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric12.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric12[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 112,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 13 - record.
            if(gSystemConfig.enableProductsFilterGeneric13 != 0)
            {
                if(arrIdsProductsFiltersGeneric13)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric13.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric13[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 113,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });

                        //Debug.
                        //console.log("arrIdsProductsFiltersGeneric13=", arrIdsProductsFiltersGeneric13[countArray]);
                    }
                }

                //Debug.
                //console.log("tblProductsID=", tblProductsID);
                //console.log("arrIdsProductsFiltersGeneric13=", arrIdsProductsFiltersGeneric13);
            }

            //Filters generic 14 - record.
            if(gSystemConfig.enableProductsFilterGeneric14 != 0)
            {
                if(arrIdsProductsFiltersGeneric14)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric14.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric14[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 114,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 15 - record.
            if(gSystemConfig.enableProductsFilterGeneric15 != 0)
            {
                if(arrIdsProductsFiltersGeneric15)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric15.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric15[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 115,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 16 - record.
            if(gSystemConfig.enableProductsFilterGeneric16 != 0)
            {
                if(arrIdsProductsFiltersGeneric16)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric16.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric16[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 116,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 17 - record.
            if(gSystemConfig.enableProductsFilterGeneric17 != 0)
            {
                if(arrIdsProductsFiltersGeneric17)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric17.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric17[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 117,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 18 - record.
            if(gSystemConfig.enableProductsFilterGeneric18 != 0)
            {
                if(arrIdsProductsFiltersGeneric18)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric18.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric18[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 118,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 19 - record.
            if(gSystemConfig.enableProductsFilterGeneric19 != 0)
            {
                if(arrIdsProductsFiltersGeneric19)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric19.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric19[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 119,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 20 - record.
            if(gSystemConfig.enableProductsFilterGeneric20 != 0)
            {
                if(arrIdsProductsFiltersGeneric20)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric20.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric20[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 120,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 21 - record.
            if(gSystemConfig.enableProductsFilterGeneric21 != 0)
            {
                if(arrIdsProductsFiltersGeneric21)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric21.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric21[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 121,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });

                        //console.log("arrIdsProductsFiltersGeneric21[]=", arrIdsProductsFiltersGeneric21[countArray]);
                    }
                }
            }

            //Filters generic 22 - record.
            if(gSystemConfig.enableProductsFilterGeneric22 != 0)
            {
                if(arrIdsProductsFiltersGeneric22)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric22.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric22[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 122,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 23 - record.
            if(gSystemConfig.enableProductsFilterGeneric23 != 0)
            {
                if(arrIdsProductsFiltersGeneric23)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric23.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric23[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 123,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 24 - record.
            if(gSystemConfig.enableProductsFilterGeneric24 != 0)
            {
                if(arrIdsProductsFiltersGeneric24)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric24.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric24[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 124,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 25 - record.
            if(gSystemConfig.enableProductsFilterGeneric25 != 0)
            {
                if(arrIdsProductsFiltersGeneric25)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric25.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric25[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 125,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 26 - record.
            if(gSystemConfig.enableProductsFilterGeneric26 != 0)
            {
                if(arrIdsProductsFiltersGeneric26)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric26.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric26[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 126,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 27 - record.
            if(gSystemConfig.enableProductsFilterGeneric27 != 0)
            {
                if(arrIdsProductsFiltersGeneric27)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric27.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric27[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 127,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 28 - record.
            if(gSystemConfig.enableProductsFilterGeneric28 != 0)
            {
                if(arrIdsProductsFiltersGeneric28)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric28.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric28[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 128,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 29 - record.
            if(gSystemConfig.enableProductsFilterGeneric29 != 0)
            {
                if(arrIdsProductsFiltersGeneric29)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric29.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric29[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 129,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 30 - record.
            if(gSystemConfig.enableProductsFilterGeneric30 != 0)
            {
                if(arrIdsProductsFiltersGeneric30)
                {
                    for(let countArray = 0; countArray < arrIdsProductsFiltersGeneric30.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsProductsFiltersGeneric30[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 130,
                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }


            strReturn = true;
        }
        //----------------------


        //Debug.
        //return tblProductsID;
        //return resultsSQLProductsInsert;


        return strReturn;


        //Usage.
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
                let productsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.productsInsert_async({
                    _tblProductsID: tblProductsID,
                    _tblProductsIdParent: tblProductsIdParent,
                    _tblProductsSortOrder: tblProductsSortOrder,
                    _tblProductsIdType: tblProductsIdType,
                    _tblProductsDateCreation: "",
                    _tblProductsDateTimezone: "",
                    _tblProductsDateEdit: "",
                    _tblProductsIdRegisterUser: "0",
                    _tblProductsIdRegister1: "0",
                    _tblProductsIdRegister2: "0",
                    _tblProductsIdRegister3: "0",
                    _tblProductsIdRegister4: "0",
                    _tblProductsIdRegister5: "0",
                    _tblProductsCode: tblProductsCode,
                    _tblProductsTitle: tblProductsTitle,
                    _tblProductsDescription: tblProductsDescription,
                    _tblProductsURLAlias: tblProductsURLAlias,
                    _tblProductsKeywordsTags: tblProductsKeywordsTags,
                    _tblProductsMetaDescription: tblProductsMetaDescription,
                    _tblProductsMetaTitle: tblProductsMetaTitle,
                    _tblProductsMetaInfo: "",
                    _tblProductsInfo1: tblProductsInfo1,
                    _tblProductsInfo2: tblProductsInfo2,
                    _tblProductsInfo3: tblProductsInfo3,
                    _tblProductsInfo4: tblProductsInfo4,
                    _tblProductsInfo5: tblProductsInfo5,
                    _tblProductsInfo6: tblProductsInfo6,
                    _tblProductsInfo7: tblProductsInfo7,
                    _tblProductsInfo8: tblProductsInfo8,
                    _tblProductsInfo9: tblProductsInfo9,
                    _tblProductsInfo10: tblProductsInfo10,
                    _tblProductsInfo11: tblProductsInfo11,
                    _tblProductsInfo12: tblProductsInfo12,
                    _tblProductsInfo13: tblProductsInfo13,
                    _tblProductsInfo14: tblProductsInfo14,
                    _tblProductsInfo15: tblProductsInfo15,
                    _tblProductsInfo16: tblProductsInfo16,
                    _tblProductsInfo17: tblProductsInfo17,
                    _tblProductsInfo18: tblProductsInfo18,
                    _tblProductsInfo19: tblProductsInfo19,
                    _tblProductsInfo20: tblProductsInfo20,
                    _tblProductsInfoSmall1: tblProductsInfoSmall1,
                    _tblProductsInfoSmall2: tblProductsInfoSmall2,
                    _tblProductsInfoSmall3: tblProductsInfoSmall3,
                    _tblProductsInfoSmall4: tblProductsInfoSmall4,
                    _tblProductsInfoSmall5: tblProductsInfoSmall5,
                    _tblProductsInfoSmall6: tblProductsInfoSmall6,
                    _tblProductsInfoSmall7: tblProductsInfoSmall7,
                    _tblProductsInfoSmall8: tblProductsInfoSmall8,
                    _tblProductsInfoSmall9: tblProductsInfoSmall9,
                    _tblProductsInfoSmall10: tblProductsInfoSmall10,
                    _tblProductsInfoSmall11: tblProductsInfoSmall11,
                    _tblProductsInfoSmall12: tblProductsInfoSmall12,
                    _tblProductsInfoSmall13: tblProductsInfoSmall13,
                    _tblProductsInfoSmall14: tblProductsInfoSmall14,
                    _tblProductsInfoSmall15: tblProductsInfoSmall15,
                    _tblProductsInfoSmall16: tblProductsInfoSmall16,
                    _tblProductsInfoSmall17: tblProductsInfoSmall17,
                    _tblProductsInfoSmall18: tblProductsInfoSmall18,
                    _tblProductsInfoSmall19: tblProductsInfoSmall19,
                    _tblProductsInfoSmall20: tblProductsInfoSmall20,
                    _tblProductsInfoSmall21: tblProductsInfoSmall21,
                    _tblProductsInfoSmall22: tblProductsInfoSmall22,
                    _tblProductsInfoSmall23: tblProductsInfoSmall23,
                    _tblProductsInfoSmall24: tblProductsInfoSmall24,
                    _tblProductsInfoSmall25: tblProductsInfoSmall25,
                    _tblProductsInfoSmall26: tblProductsInfoSmall26,
                    _tblProductsInfoSmall27: tblProductsInfoSmall27,
                    _tblProductsInfoSmall28: tblProductsInfoSmall28,
                    _tblProductsInfoSmall29: tblProductsInfoSmall29,
                    _tblProductsInfoSmall30: tblProductsInfoSmall30,
                    _tblProductsValue: tblProductsValue,
                    _tblProductsValue1: tblProductsValue1,
                    _tblProductsValue2: tblProductsValue2,
                    _tblProductsWeight: tblProductsWeight,
                    _tblProductsCoefficient: tblProductsCoefficient,
                    _tblProductsNumber1: tblProductsNumber1,
                    _tblProductsNumber2: tblProductsNumber2,
                    _tblProductsNumber3: tblProductsNumber3,
                    _tblProductsNumber4: tblProductsNumber4,
                    _tblProductsNumber5: tblProductsNumber5,
                    _tblProductsNumberSmall1: tblProductsNumberSmall1,
                    _tblProductsNumberSmall2: tblProductsNumberSmall2,
                    _tblProductsNumberSmall3: tblProductsNumberSmall3,
                    _tblProductsNumberSmall4: tblProductsNumberSmall4,
                    _tblProductsNumberSmall5: tblProductsNumberSmall5,
                    _tblProductsURL1: tblProductsURL1,
                    _tblProductsURL2: tblProductsURL2,
                    _tblProductsURL3: tblProductsURL3,
                    _tblProductsURL4: tblProductsURL4,
                    _tblProductsURL5: tblProductsURL5,
                    _tblProductsDate1: tblProductsDate1,
                    _tblProductsDate2: tblProductsDate2,
                    _tblProductsDate3: tblProductsDate3,
                    _tblProductsDate4: tblProductsDate4,
                    _tblProductsDate5: tblProductsDate5,
                    _tblProductsIdItem1: "",
                    _tblProductsIdItem2: "",
                    _tblProductsIdItem3: "",
                    _tblProductsIdItem4: "",
                    _tblProductsIdItem5: "",
                    _tblProductsImageMain: tblProductsImageMain,
                    _tblProductsImageMainCaption: tblProductsImageMainCaption,
                    _tblProductsFile1: tblProductsImageFile1,
                    _tblProductsFile2: tblProductsImageFile2,
                    _tblProductsFile3: tblProductsImageFile3,
                    _tblProductsFile4: tblProductsImageFile4,
                    _tblProductsFile5: tblProductsImageFile5,
                    _tblProductsActivation: tblProductsActivation,
                    _tblProductsActivation1: tblProductsActivation1,
                    _tblProductsActivation2: tblProductsActivation2,
                    _tblProductsActivation3: tblProductsActivation3,
                    _tblProductsActivation4: tblProductsActivation4,
                    _tblProductsActivation5: tblProductsActivation5,
                    _tblProductsIdStatus: tblProductsIdStatus,
                    _tblProductsRestrictedAccess: tblProductsRestrictedAccess,
                    _tblProductsNotes: tblProductsNotes,
                    _arrIdsProductsFiltersGeneric1: arrIdsProductsFiltersGeneric1,
                    _arrIdsProductsFiltersGeneric2: arrIdsProductsFiltersGeneric2,
                    _arrIdsProductsFiltersGeneric3: arrIdsProductsFiltersGeneric3,
                    _arrIdsProductsFiltersGeneric4: arrIdsProductsFiltersGeneric4,
                    _arrIdsProductsFiltersGeneric5: arrIdsProductsFiltersGeneric5,
                    _arrIdsProductsFiltersGeneric6: arrIdsProductsFiltersGeneric6,
                    _arrIdsProductsFiltersGeneric7: arrIdsProductsFiltersGeneric7,
                    _arrIdsProductsFiltersGeneric8: arrIdsProductsFiltersGeneric8,
                    _arrIdsProductsFiltersGeneric9: arrIdsProductsFiltersGeneric9,
                    _arrIdsProductsFiltersGeneric10: arrIdsProductsFiltersGeneric10,
                    _arrIdsProductsFiltersGeneric11: arrIdsProductsFiltersGeneric11,
                    _arrIdsProductsFiltersGeneric12: arrIdsProductsFiltersGeneric12,
                    _arrIdsProductsFiltersGeneric13: arrIdsProductsFiltersGeneric13,
                    _arrIdsProductsFiltersGeneric14: arrIdsProductsFiltersGeneric14,
                    _arrIdsProductsFiltersGeneric15: arrIdsProductsFiltersGeneric15,
                    _arrIdsProductsFiltersGeneric16: arrIdsProductsFiltersGeneric16,
                    _arrIdsProductsFiltersGeneric17: arrIdsProductsFiltersGeneric17,
                    _arrIdsProductsFiltersGeneric18: arrIdsProductsFiltersGeneric18,
                    _arrIdsProductsFiltersGeneric19: arrIdsProductsFiltersGeneric19,
                    _arrIdsProductsFiltersGeneric20: arrIdsProductsFiltersGeneric20,
                    _arrIdsProductsFiltersGeneric21: arrIdsProductsFiltersGeneric21,
                    _arrIdsProductsFiltersGeneric22: arrIdsProductsFiltersGeneric22,
                    _arrIdsProductsFiltersGeneric23: arrIdsProductsFiltersGeneric23,
                    _arrIdsProductsFiltersGeneric24: arrIdsProductsFiltersGeneric24,
                    _arrIdsProductsFiltersGeneric25: arrIdsProductsFiltersGeneric25,
                    _arrIdsProductsFiltersGeneric26: arrIdsProductsFiltersGeneric26,
                    _arrIdsProductsFiltersGeneric27: arrIdsProductsFiltersGeneric27,
                    _arrIdsProductsFiltersGeneric28: arrIdsProductsFiltersGeneric28,
                    _arrIdsProductsFiltersGeneric29: arrIdsProductsFiltersGeneric29,
                    _arrIdsProductsFiltersGeneric30: arrIdsProductsFiltersGeneric30
                });
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */
        //----------------------
    }
    //**************************************************************************************
    

    //Publications - insert record.
    //**************************************************************************************
    /**
     * Publications - insert record.
     * @static
     * @async
     * @param {object} _tblPublicationsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async publicationsInsert_async(_tblPublicationsDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblPublicationsDataObject = {};

        //Details - default values.
        let tblPublicationsID = "";
        let tblPublicationsIdParent = "";
        let tblPublicationsSortOrder = 0;
        let tblPublicationsIdType = 0; 
    
        let tblPublicationsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblPublicationsDateEdit = "";

        let tblPublicationsIdRegisterUser = 0;
        let tblPublicationsIdRegister1 = 0;
        let tblPublicationsIdRegister2 = 0;
        let tblPublicationsIdRegister3 = 0;
        let tblPublicationsIdRegister4 = 0;
        let tblPublicationsIdRegister5 = 0;

        let tblPublicationsDateStart = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblPublicationsDateEnd = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd

        let tblPublicationsTitle = "";
        let tblPublicationsDescription = "";
    
        let tblPublicationsURLAlias = "";
        let tblPublicationsKeywordsTags = "";
        let tblPublicationsMetaDescription = "";
        let tblPublicationsMetaTitle = "";
        let tblPublicationsMetaInfo = "";

        let tblPublicationsInfo1 = "";
        let tblPublicationsInfo2 = "";
        let tblPublicationsInfo3 = "";
        let tblPublicationsInfo4 = "";
        let tblPublicationsInfo5 = "";
        let tblPublicationsInfo6 = "";
        let tblPublicationsInfo7 = "";
        let tblPublicationsInfo8 = "";
        let tblPublicationsInfo9 = "";
        let tblPublicationsInfo10 = "";
    
        let tblPublicationsSource = "";
        let tblPublicationsSourceURL = "";
        
        let tblPublicationsNumber1 = 0;
        let tblPublicationsNumber2 = 0;
        let tblPublicationsNumber3 = 0;
        let tblPublicationsNumber4 = 0;
        let tblPublicationsNumber5 = 0;

        let tblPublicationsURL1 = "";
        let tblPublicationsURL2 = "";
        let tblPublicationsURL3 = "";
        let tblPublicationsURL4 = "";
        let tblPublicationsURL5 = "";
            
        let tblPublicationsDate1 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblPublicationsDate2 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblPublicationsDate3 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblPublicationsDate4 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblPublicationsDate5 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd

        let tblPublicationsImageMain = "";
        let tblPublicationsImageMainCaption = "";
        let tblPublicationsFile1 = "";
        let tblPublicationsFile2 = "";
        let tblPublicationsFile3 = "";
        let tblPublicationsFile4 = "";
        let tblPublicationsFile5 = "";

        let tblPublicationsActivation = 1;
        let tblPublicationsActivation1 = 0;
        let tblPublicationsActivation2 = 0;
        let tblPublicationsActivation3 = 0;
        let tblPublicationsActivation4 = 0;
        let tblPublicationsActivation5 = 0;
        
        let tblPublicationsIdStatus = 0;
        let tblPublicationsRestrictedAccess = 0;

        let tblPublicationsNotes = "";

        let arrIdsPublicationsFiltersGeneric1 = [];
        let arrIdsPublicationsFiltersGeneric2 = [];
        let arrIdsPublicationsFiltersGeneric3 = [];
        let arrIdsPublicationsFiltersGeneric4 = [];
        let arrIdsPublicationsFiltersGeneric5 = [];
        let arrIdsPublicationsFiltersGeneric6 = [];
        let arrIdsPublicationsFiltersGeneric7 = [];
        let arrIdsPublicationsFiltersGeneric8 = [];
        let arrIdsPublicationsFiltersGeneric9 = [];
        let arrIdsPublicationsFiltersGeneric10 = [];
            
        let strSQLPublicationsInsert = "";
        let strSQLPublicationsInsertParams = {};
        let resultsSQLPublicationsInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblPublicationsDataObject = _tblPublicationsDataObject;
        
        tblPublicationsID = tblPublicationsDataObject._tblPublicationsID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblPublicationsID == "" || tblPublicationsID === null || tblPublicationsID === undefined)
        {
            tblPublicationsID = await new Promise((resolve, reject)=>{
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

        //tblPublicationsIdParent = tblPublicationsDataObject._tblPublicationsIdParent;
        tblPublicationsIdParent = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdParent") === true) ? tblPublicationsDataObject._tblPublicationsIdParent : tblPublicationsIdParent;

        //tblPublicationsSortOrder = tblPublicationsDataObject._tblPublicationsSortOrder;
        tblPublicationsSortOrder = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsSortOrder") === true) ? tblPublicationsDataObject._tblPublicationsSortOrder : tblPublicationsSortOrder;
        if(!tblPublicationsSortOrder)
        {
            tblPublicationsSortOrder = 0;
        }

        tblPublicationsIdType = tblPublicationsDataObject._tblPublicationsIdType;

        tblPublicationsDateCreation = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDateCreation") === true) ? tblPublicationsDataObject._tblPublicationsDateCreation : tblPublicationsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblPublicationsDateCreation)
        {
            let tblPublicationsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblPublicationsDateCreation = FunctionsGeneric.dateSQLWrite(tblPublicationsDateCreation_dateObj);
        }

        //tblPublicationsDateTimezone = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDateTimezone") === true) ? tblPublicationsDataObject._tblPublicationsDateTimezone : tblPublicationsDateTimezone;
        
        tblPublicationsDateEdit = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDateEdit") === true) ? tblPublicationsDataObject._tblPublicationsDateEdit : tblPublicationsDateEdit;
        if(!tblPublicationsDateEdit)
        {
            let tblPublicationsDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblPublicationsDateEdit = FunctionsGeneric.dateSQLWrite(tblPublicationsDateEdit_dateObj);
        }

        tblPublicationsIdRegisterUser = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdRegisterUser") === true) ? tblPublicationsDataObject._tblPublicationsIdRegisterUser : tblPublicationsIdRegisterUser;
        if(!tblPublicationsIdRegisterUser)
        {
            tblPublicationsIdRegisterUser = 0;
        }
        tblPublicationsIdRegister1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdRegister1") === true) ? tblPublicationsDataObject._tblPublicationsIdRegister1 : tblPublicationsIdRegister1;
        if(!tblPublicationsIdRegister1)
        {
            tblPublicationsIdRegister1 = 0;
        }
        tblPublicationsIdRegister2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdRegister2") === true) ? tblPublicationsDataObject._tblPublicationsIdRegister2 : tblPublicationsIdRegister2;
        if(!tblPublicationsIdRegister2)
        {
            tblPublicationsIdRegister2 = 0;
        }
        tblPublicationsIdRegister3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdRegister3") === true) ? tblPublicationsDataObject._tblPublicationsIdRegister3 : tblPublicationsIdRegister3;
        if(!tblPublicationsIdRegister3)
        {
            tblPublicationsIdRegister3 = 0;
        }
        tblPublicationsIdRegister4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdRegister4") === true) ? tblPublicationsDataObject._tblPublicationsIdRegister4 : tblPublicationsIdRegister4;
        if(!tblPublicationsIdRegister4)
        {
            tblPublicationsIdRegister4 = 0;
        }
        tblPublicationsIdRegister5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdRegister5") === true) ? tblPublicationsDataObject._tblPublicationsIdRegister5 : tblPublicationsIdRegister5;
        if(!tblPublicationsIdRegister5)
        {
            tblPublicationsIdRegister5 = 0;
        }

        tblPublicationsDateStart = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDateStart") === true && (tblPublicationsDataObject._tblPublicationsDateStart)) ? FunctionsGeneric.dateSQLWrite(tblPublicationsDataObject._tblPublicationsDateStart, gSystemConfig.configBackendDateFormat) : tblPublicationsDateStart;
        tblPublicationsDateEnd = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDateEnd") === true && (tblPublicationsDataObject._tblPublicationsDateEnd)) ? FunctionsGeneric.dateSQLWrite(tblPublicationsDataObject._tblPublicationsDateEnd, gSystemConfig.configBackendDateFormat) : tblPublicationsDateEnd;
        
        tblPublicationsTitle = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsTitle, "db_write_text") : tblPublicationsTitle;
        tblPublicationsDescription = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsDescription, "db_write_text") : tblPublicationsDescription;
        
        tblPublicationsURLAlias = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsURLAlias, "db_write_text") : tblPublicationsURLAlias;
        tblPublicationsKeywordsTags = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsKeywordsTags, "db_write_text") : tblPublicationsKeywordsTags;
        tblPublicationsMetaDescription = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsMetaDescription, "db_write_text") : tblPublicationsMetaDescription;
        tblPublicationsMetaTitle = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsMetaTitle, "db_write_text") : tblPublicationsMetaTitle;
        tblPublicationsMetaInfo = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsMetaInfo, "db_write_text") : tblPublicationsMetaInfo;
        
        if(gSystemConfig.configPublicationsInfo1FieldType == 1 || gSystemConfig.configPublicationsInfo1FieldType == 2)
        {
            tblPublicationsInfo1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo1, "db_write_text") : tblPublicationsInfo1;
        }
        if(gSystemConfig.configPublicationsInfo1FieldType == 11 || gSystemConfig.configPublicationsInfo1FieldType == 12)
        {
            tblPublicationsInfo1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo1, "db_write_text"), 2) : tblPublicationsInfo1;
        }

        if(gSystemConfig.configPublicationsInfo2FieldType == 1 || gSystemConfig.configPublicationsInfo2FieldType == 2)
        {
            tblPublicationsInfo2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo2, "db_write_text") : tblPublicationsInfo2;
        }
        if(gSystemConfig.configPublicationsInfo2FieldType == 11 || gSystemConfig.configPublicationsInfo2FieldType == 12)
        {
            tblPublicationsInfo2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo2, "db_write_text"), 2) : tblPublicationsInfo2;
        }

        if(gSystemConfig.configPublicationsInfo3FieldType == 1 || gSystemConfig.configPublicationsInfo3FieldType == 2)
        {
            tblPublicationsInfo3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo3, "db_write_text") : tblPublicationsInfo3;
        }
        if(gSystemConfig.configPublicationsInfo3FieldType == 11 || gSystemConfig.configPublicationsInfo3FieldType == 12)
        {
            tblPublicationsInfo3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo3, "db_write_text"), 2) : tblPublicationsInfo3;
        }

        if(gSystemConfig.configPublicationsInfo4FieldType == 1 || gSystemConfig.configPublicationsInfo4FieldType == 2)
        {
            tblPublicationsInfo4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo4, "db_write_text") : tblPublicationsInfo4;
        }
        if(gSystemConfig.configPublicationsInfo4FieldType == 11 || gSystemConfig.configPublicationsInfo4FieldType == 12)
        {
            tblPublicationsInfo4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo4, "db_write_text"), 2) : tblPublicationsInfo1;
        }

        if(gSystemConfig.configPublicationsInfo5FieldType == 1 || gSystemConfig.configPublicationsInfo5FieldType == 2)
        {
            tblPublicationsInfo5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo5, "db_write_text") : tblPublicationsInfo5;
        }
        if(gSystemConfig.configPublicationsInfo5FieldType == 11 || gSystemConfig.configPublicationsInfo5FieldType == 12)
        {
            tblPublicationsInfo5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo5, "db_write_text"), 2) : tblPublicationsInfo5;
        }

        if(gSystemConfig.configPublicationsInfo6FieldType == 1 || gSystemConfig.configPublicationsInfo6FieldType == 2)
        {
            tblPublicationsInfo6 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo6") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo6, "db_write_text") : tblPublicationsInfo6;
        }
        if(gSystemConfig.configPublicationsInfo6FieldType == 11 || gSystemConfig.configPublicationsInfo6FieldType == 12)
        {
            tblPublicationsInfo6 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo6") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo6, "db_write_text"), 2) : tblPublicationsInfo6;
        }

        if(gSystemConfig.configPublicationsInfo7FieldType == 1 || gSystemConfig.configPublicationsInfo7FieldType == 2)
        {
            tblPublicationsInfo7 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo7") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo7, "db_write_text") : tblPublicationsInfo7;
        }
        if(gSystemConfig.configPublicationsInfo7FieldType == 11 || gSystemConfig.configPublicationsInfo7FieldType == 12)
        {
            tblPublicationsInfo7 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo7") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo7, "db_write_text"), 2) : tblPublicationsInfo7;
        }

        if(gSystemConfig.configPublicationsInfo8FieldType == 1 || gSystemConfig.configPublicationsInfo8FieldType == 2)
        {
            tblPublicationsInfo8 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo8") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo8, "db_write_text") : tblPublicationsInfo8;
        }
        if(gSystemConfig.configPublicationsInfo8FieldType == 11 || gSystemConfig.configPublicationsInfo8FieldType == 12)
        {
            tblPublicationsInfo8 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo8") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo8, "db_write_text"), 2) : tblPublicationsInfo8;
        }

        if(gSystemConfig.configPublicationsInfo9FieldType == 1 || gSystemConfig.configPublicationsInfo9FieldType == 2)
        {
            tblPublicationsInfo9 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo9") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo9, "db_write_text") : tblPublicationsInfo9;
        }
        if(gSystemConfig.configPublicationsInfo9FieldType == 11 || gSystemConfig.configPublicationsInfo9FieldType == 12)
        {
            tblPublicationsInfo9 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo9") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo9, "db_write_text"), 2) : tblPublicationsInfo9;
        }

        if(gSystemConfig.configPublicationsInfo10FieldType == 1 || gSystemConfig.configPublicationsInfo10FieldType == 2)
        {
            tblPublicationsInfo10 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo10") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo10, "db_write_text") : tblPublicationsInfo10;
        }
        if(gSystemConfig.configPublicationsInfo10FieldType == 11 || gSystemConfig.configPublicationsInfo10FieldType == 12)
        {
            tblPublicationsInfo10 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsInfo10") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsInfo10, "db_write_text"), 2) : tblPublicationsInfo10;
        }

        tblPublicationsSource = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsSource") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsSource, "db_write_text") : tblPublicationsSource;
        tblPublicationsSourceURL = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsSourceURL") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsSourceURL, "db_write_text") : tblPublicationsSourceURL;

        tblPublicationsNumber1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsNumber1") === true && (tblPublicationsDataObject._tblPublicationsNumber1)) ? FunctionsGeneric.valueMaskWrite(tblPublicationsDataObject._tblPublicationsNumber1, gSystemConfig.configPublicationsNumber1FieldType) : tblPublicationsNumber1;
        tblPublicationsNumber2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsNumber2") === true && (tblPublicationsDataObject._tblPublicationsNumber2)) ? FunctionsGeneric.valueMaskWrite(tblPublicationsDataObject._tblPublicationsNumber2, gSystemConfig.configPublicationsNumber2FieldType) : tblPublicationsNumber2;
        tblPublicationsNumber3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsNumber3") === true && (tblPublicationsDataObject._tblPublicationsNumber3)) ? FunctionsGeneric.valueMaskWrite(tblPublicationsDataObject._tblPublicationsNumber3, gSystemConfig.configPublicationsNumber3FieldType) : tblPublicationsNumber3;
        tblPublicationsNumber4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsNumber4") === true && (tblPublicationsDataObject._tblPublicationsNumber4)) ? FunctionsGeneric.valueMaskWrite(tblPublicationsDataObject._tblPublicationsNumber4, gSystemConfig.configPublicationsNumber4FieldType) : tblPublicationsNumber4;
        tblPublicationsNumber5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsNumber5") === true && (tblPublicationsDataObject._tblPublicationsNumber5)) ? FunctionsGeneric.valueMaskWrite(tblPublicationsDataObject._tblPublicationsNumber5, gSystemConfig.configPublicationsNumber5FieldType) : tblPublicationsNumber5;
        
        tblPublicationsURL1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsURL1") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsURL1, "db_write_text") : tblPublicationsURL1;
        tblPublicationsURL2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsURL2") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsURL2, "db_write_text") : tblPublicationsURL2;
        tblPublicationsURL3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsURL3") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsURL3, "db_write_text") : tblPublicationsURL3;
        tblPublicationsURL4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsURL4") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsURL4, "db_write_text") : tblPublicationsURL4;
        tblPublicationsURL5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsURL5") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsURL5, "db_write_text") : tblPublicationsURL5;
        
        tblPublicationsDate1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDate1") === true && (tblPublicationsDataObject._tblPublicationsDate1)) ? FunctionsGeneric.dateSQLWrite(tblPublicationsDataObject._tblPublicationsDate1, gSystemConfig.configBackendDateFormat) : tblPublicationsDate1;
        tblPublicationsDate2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDate2") === true && (tblPublicationsDataObject._tblPublicationsDate2)) ? FunctionsGeneric.dateSQLWrite(tblPublicationsDataObject._tblPublicationsDate2, gSystemConfig.configBackendDateFormat) : tblPublicationsDate2;
        tblPublicationsDate3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDate3") === true && (tblPublicationsDataObject._tblPublicationsDate3)) ? FunctionsGeneric.dateSQLWrite(tblPublicationsDataObject._tblPublicationsDate3, gSystemConfig.configBackendDateFormat) : tblPublicationsDate3;
        tblPublicationsDate4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDate4") === true && (tblPublicationsDataObject._tblPublicationsDate4)) ? FunctionsGeneric.dateSQLWrite(tblPublicationsDataObject._tblPublicationsDate4, gSystemConfig.configBackendDateFormat) : tblPublicationsDate4;
        tblPublicationsDate5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDate5") === true && (tblPublicationsDataObject._tblPublicationsDate5)) ? FunctionsGeneric.dateSQLWrite(tblPublicationsDataObject._tblPublicationsDate5, gSystemConfig.configBackendDateFormat) : tblPublicationsDate5;
        
        tblPublicationsImageMain = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsImageMain") === true) ? tblPublicationsDataObject._tblPublicationsImageMain : tblPublicationsImageMain;
        tblPublicationsImageMainCaption = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsImageMainCaption") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsImageMainCaption, "db_write_text") : tblPublicationsImageMainCaption;
        tblPublicationsFile1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsFile1") === true) ? tblPublicationsDataObject._tblPublicationsFile1 : tblPublicationsFile1;
        tblPublicationsFile2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsFile2") === true) ? tblPublicationsDataObject._tblPublicationsFile2 : tblPublicationsFile2;
        tblPublicationsFile3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsFile3") === true) ? tblPublicationsDataObject._tblPublicationsFile3 : tblPublicationsFile3;
        tblPublicationsFile4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsFile4") === true) ? tblPublicationsDataObject._tblPublicationsFile4 : tblPublicationsFile4;
        tblPublicationsFile5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsFile5") === true) ? tblPublicationsDataObject._tblPublicationsFile5 : tblPublicationsFile5;
        
        tblPublicationsActivation = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsActivation") === true && (tblPublicationsDataObject._tblPublicationsActivation)) ? tblPublicationsDataObject._tblPublicationsActivation : tblPublicationsActivation;
        tblPublicationsActivation1 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsActivation1") === true && (tblPublicationsDataObject._tblPublicationsActivation1)) ? tblPublicationsDataObject._tblPublicationsActivation1 : tblPublicationsActivation1;
        tblPublicationsActivation2 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsActivation2") === true && (tblPublicationsDataObject._tblPublicationsActivation2)) ? tblPublicationsDataObject._tblPublicationsActivation2 : tblPublicationsActivation2;
        tblPublicationsActivation3 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsActivation3") === true && (tblPublicationsDataObject._tblPublicationsActivation3)) ? tblPublicationsDataObject._tblPublicationsActivation3 : tblPublicationsActivation3;
        tblPublicationsActivation4 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsActivation5") === true && (tblPublicationsDataObject._tblPublicationsActivation4)) ? tblPublicationsDataObject._tblPublicationsActivation4 : tblPublicationsActivation5;
        tblPublicationsActivation5 = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsActivation5") === true && (tblPublicationsDataObject._tblPublicationsActivation5)) ? tblPublicationsDataObject._tblPublicationsActivation5 : tblPublicationsActivation5;
        
        tblPublicationsIdStatus = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdStatus") === true && (tblPublicationsDataObject._tblPublicationsIdStatus)) ? tblPublicationsDataObject._tblPublicationsIdStatus : tblPublicationsIdStatus;
        tblPublicationsRestrictedAccess = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsRestrictedAccess") === true && (tblPublicationsDataObject._tblPublicationsRestrictedAccess)) ? tblPublicationsDataObject._tblPublicationsRestrictedAccess : tblPublicationsRestrictedAccess;
        
        tblPublicationsNotes = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblPublicationsDataObject._tblPublicationsNotes, "db_write_text") : tblPublicationsNotes;
        
        arrIdsPublicationsFiltersGeneric1 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric1") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric1)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric1 : arrIdsPublicationsFiltersGeneric1;
        arrIdsPublicationsFiltersGeneric2 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric2") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric2)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric2 : arrIdsPublicationsFiltersGeneric2;
        arrIdsPublicationsFiltersGeneric3 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric3") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric3)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric3 : arrIdsPublicationsFiltersGeneric3;
        arrIdsPublicationsFiltersGeneric4 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric4") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric4)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric4 : arrIdsPublicationsFiltersGeneric4;
        arrIdsPublicationsFiltersGeneric5 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric5") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric5)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric5 : arrIdsPublicationsFiltersGeneric5;
        arrIdsPublicationsFiltersGeneric6 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric6") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric6)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric6 : arrIdsPublicationsFiltersGeneric6;
        arrIdsPublicationsFiltersGeneric5 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric5") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric5)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric5 : arrIdsPublicationsFiltersGeneric5;
        arrIdsPublicationsFiltersGeneric6 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric6") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric6)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric6 : arrIdsPublicationsFiltersGeneric6;
        arrIdsPublicationsFiltersGeneric7 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric7") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric7)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric7 : arrIdsPublicationsFiltersGeneric7;
        arrIdsPublicationsFiltersGeneric8 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric8") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric8)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric8 : arrIdsPublicationsFiltersGeneric8;
        arrIdsPublicationsFiltersGeneric9 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric9") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric9)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric9 : arrIdsPublicationsFiltersGeneric9;
        arrIdsPublicationsFiltersGeneric10 = (tblPublicationsDataObject.hasOwnProperty("_arrIdsPublicationsFiltersGeneric10") === true && (tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric10)) ? tblPublicationsDataObject._arrIdsPublicationsFiltersGeneric10 : arrIdsPublicationsFiltersGeneric10;
        //----------------------


        //Debug.
        //console.log("tblPublicationsDataObject=", tblPublicationsDataObject);


        //Query.
        //----------------------
        //strSQLPublicationsInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLPublicationsInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTablePublications + " ";
        strSQLPublicationsInsert += "SET ?";
        //----------------------


        //Parameters.
        //----------------------
        strSQLPublicationsInsertParams.id = tblPublicationsID;
        strSQLPublicationsInsertParams.id_parent = tblPublicationsIdParent;
        strSQLPublicationsInsertParams.sort_order = tblPublicationsSortOrder;
        strSQLPublicationsInsertParams.id_type = tblPublicationsIdType;

        strSQLPublicationsInsertParams.date_creation = tblPublicationsDateCreation;
        //strSQLPublicationsInsertParams.date_timezone = tblPublicationsDateTimezone;
        strSQLPublicationsInsertParams.date_edit = tblPublicationsDateEdit;

        strSQLPublicationsInsertParams.id_register_user = tblPublicationsIdRegisterUser;
        strSQLPublicationsInsertParams.id_register1 = tblPublicationsIdRegister1;
        strSQLPublicationsInsertParams.id_register2 = tblPublicationsIdRegister2;
        strSQLPublicationsInsertParams.id_register3 = tblPublicationsIdRegister3;
        strSQLPublicationsInsertParams.id_register4 = tblPublicationsIdRegister4;
        strSQLPublicationsInsertParams.id_register5 = tblPublicationsIdRegister5;

        strSQLPublicationsInsertParams.date_start = tblPublicationsDateStart;
        strSQLPublicationsInsertParams.date_end = tblPublicationsDateEnd;

        strSQLPublicationsInsertParams.title = tblPublicationsTitle;
        strSQLPublicationsInsertParams.description = tblPublicationsDescription;

        strSQLPublicationsInsertParams.url_alias = tblPublicationsURLAlias;
        strSQLPublicationsInsertParams.keywords_tags = tblPublicationsKeywordsTags;
        strSQLPublicationsInsertParams.meta_description = tblPublicationsMetaDescription;
        strSQLPublicationsInsertParams.meta_title = tblPublicationsMetaTitle;
        strSQLPublicationsInsertParams.meta_info = tblPublicationsMetaInfo;

        strSQLPublicationsInsertParams.info1 = tblPublicationsInfo1;
        strSQLPublicationsInsertParams.info2 = tblPublicationsInfo2;
        strSQLPublicationsInsertParams.info3 = tblPublicationsInfo3;
        strSQLPublicationsInsertParams.info4 = tblPublicationsInfo4;
        strSQLPublicationsInsertParams.info5 = tblPublicationsInfo5;
        strSQLPublicationsInsertParams.info6 = tblPublicationsInfo6;
        strSQLPublicationsInsertParams.info7 = tblPublicationsInfo7;
        strSQLPublicationsInsertParams.info8 = tblPublicationsInfo8;
        strSQLPublicationsInsertParams.info9 = tblPublicationsInfo9;
        strSQLPublicationsInsertParams.info10 = tblPublicationsInfo10;

        strSQLPublicationsInsertParams.source = tblPublicationsSource;
        strSQLPublicationsInsertParams.source_url = tblPublicationsSourceURL;
        
        strSQLPublicationsInsertParams.number1 = tblPublicationsNumber1;
        strSQLPublicationsInsertParams.number2 = tblPublicationsNumber2;
        strSQLPublicationsInsertParams.number3 = tblPublicationsNumber3;
        strSQLPublicationsInsertParams.number4 = tblPublicationsNumber4;
        strSQLPublicationsInsertParams.number5 = tblPublicationsNumber5;

        strSQLPublicationsInsertParams.url1 = tblPublicationsURL1;
        strSQLPublicationsInsertParams.url2 = tblPublicationsURL2;
        strSQLPublicationsInsertParams.url3 = tblPublicationsURL3;
        strSQLPublicationsInsertParams.url4 = tblPublicationsURL4;
        strSQLPublicationsInsertParams.url5 = tblPublicationsURL5;

        strSQLPublicationsInsertParams.date1 = tblPublicationsDate1;
        strSQLPublicationsInsertParams.date2 = tblPublicationsDate2;
        strSQLPublicationsInsertParams.date3 = tblPublicationsDate3;
        strSQLPublicationsInsertParams.date4 = tblPublicationsDate4;
        strSQLPublicationsInsertParams.date5 = tblPublicationsDate5;
        
        strSQLPublicationsInsertParams.image_main = tblPublicationsImageMain;
        strSQLPublicationsInsertParams.image_main_caption = tblPublicationsImageMainCaption;
        strSQLPublicationsInsertParams.file1 = tblPublicationsFile1;
        strSQLPublicationsInsertParams.file2 = tblPublicationsFile2;
        strSQLPublicationsInsertParams.file3 = tblPublicationsFile3;
        strSQLPublicationsInsertParams.file4 = tblPublicationsFile4;
        strSQLPublicationsInsertParams.file5 = tblPublicationsFile5;

        strSQLPublicationsInsertParams.activation = tblPublicationsActivation;
        strSQLPublicationsInsertParams.activation1 = tblPublicationsActivation1;
        strSQLPublicationsInsertParams.activation2 = tblPublicationsActivation2;
        strSQLPublicationsInsertParams.activation3 = tblPublicationsActivation3;
        strSQLPublicationsInsertParams.activation4 = tblPublicationsActivation4;
        strSQLPublicationsInsertParams.activation5 = tblPublicationsActivation5;
        
        strSQLPublicationsInsertParams.id_status = tblPublicationsIdStatus;
        strSQLPublicationsInsertParams.restricted_access = tblPublicationsRestrictedAccess;

        strSQLPublicationsInsertParams.notes = tblPublicationsNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLPublicationsInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLPublicationsInsert, strSQLPublicationsInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLPublicationsInsert, strSQLPublicationsInsertParams, (dbSystemError, results) => {
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
        //resultsSQLPublicationsInsert object ex: 
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
        if(resultsSQLPublicationsInsert.affectedRows > 0)
        {
            //Record filters generic.
            //OPTIMIZE: make only one insert with multiple records

            //Filters generic 1 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric1)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric1.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric1[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 101,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });

                        //console.log("arrIdsPublicationsFiltersGeneric1[]=", arrIdsPublicationsFiltersGeneric1[countArray]);
                    }
                }
            }

            //Filters generic 2 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric2)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric2.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric2[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 102,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 3 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric3 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric3)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric3.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric3[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 103,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 4 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric4 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric4)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric4.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric4[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 104,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 5 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric5 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric5)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric5.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric5[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 105,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 6 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric6 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric6)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric6.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric6[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 106,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 7 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric7 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric7)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric7.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric7[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 107,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 8 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric8 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric8)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric8.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric8[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 108,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 9 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric9 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric9)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric9.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric9[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 109,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }

            //Filters generic 10 - record.
            if(gSystemConfig.enablePublicationsFilterGeneric10 != 0)
            {
                if(arrIdsPublicationsFiltersGeneric10)
                {
                    for(let countArray = 0; countArray < arrIdsPublicationsFiltersGeneric10.length; countArray++)
                    {
                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                            _tblFiltersGenericBindingID: "",
                            _tblFiltersGenericBindingSortOrder: "",
                            _tblFiltersGenericBindingDateCreation: "",
                            _tblFiltersGenericBindingDateEdit: "",
                            _tblFiltersGenericBindingIdFiltersGeneric: arrIdsPublicationsFiltersGeneric10[countArray],
                            _tblFiltersGenericBindingIdFilterIndex: 110,
                            _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                            _tblFiltersGenericBindingNotes: ""
                        });
                    }
                }
            }


            strReturn = true;
        }
        //----------------------


        //Debug.
        //return tblPublicationsID;
        //return resultsSQLPublicationsInsert;


        return strReturn;


        //Usage.
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
                let publicationsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.publicationsInsert_async({
                    _tblPublicationsID: tblPublicationsID,
                    _tblPublicationsIdParent: tblPublicationsIdParent,
                    _tblPublicationsSortOrder: tblPublicationsSortOrder,
                    _tblPublicationsIdType: tblPublicationsIdType,
                    _tblPublicationsDateCreation: "",
                    _tblPublicationsDateEdit: "",
                    _tblPublicationsIdRegisterUser: "0",
                    _tblPublicationsIdRegister1: "0",
                    _tblPublicationsIdRegister2: "0",
                    _tblPublicationsIdRegister3: "0",
                    _tblPublicationsIdRegister4: "0",
                    _tblPublicationsIdRegister5: "0",
                    _tblPublicationsDateStart: tblPublicationsDateStart,
                    _tblPublicationsDateEnd: tblPublicationsDateEnd,
                    _tblPublicationsTitle: tblPublicationsTitle,
                    _tblPublicationsDescription: tblPublicationsDescription,
                    _tblPublicationsURLAlias: tblPublicationsURLAlias,
                    _tblPublicationsKeywordsTags: tblPublicationsKeywordsTags,
                    _tblPublicationsMetaDescription: tblPublicationsMetaDescription,
                    _tblPublicationsMetaTitle: tblPublicationsMetaTitle,
                    _tblPublicationsMetaInfo: "",
                    _tblPublicationsInfo1: tblPublicationsInfo1,
                    _tblPublicationsInfo2: tblPublicationsInfo2,
                    _tblPublicationsInfo3: tblPublicationsInfo3,
                    _tblPublicationsInfo4: tblPublicationsInfo4,
                    _tblPublicationsInfo5: tblPublicationsInfo5,
                    _tblPublicationsInfo6: tblPublicationsInfo6,
                    _tblPublicationsInfo7: tblPublicationsInfo7,
                    _tblPublicationsInfo8: tblPublicationsInfo8,
                    _tblPublicationsInfo9: tblPublicationsInfo9,
                    _tblPublicationsInfo10: tblPublicationsInfo10,
                    _tblPublicationsSource: tblPublicationsSource,
                    _tblPublicationsSourceURL: tblPublicationsSourceURL,
                    _tblPublicationsNumber1: tblPublicationsNumber1,
                    _tblPublicationsNumber2: tblPublicationsNumber2,
                    _tblPublicationsNumber3: tblPublicationsNumber3,
                    _tblPublicationsNumber4: tblPublicationsNumber4,
                    _tblPublicationsNumber5: tblPublicationsNumber5,
                    _tblPublicationsURL1: tblPublicationsURL1,
                    _tblPublicationsURL2: tblPublicationsURL2,
                    _tblPublicationsURL3: tblPublicationsURL3,
                    _tblPublicationsURL4: tblPublicationsURL4,
                    _tblPublicationsURL5: tblPublicationsURL5,
                    _tblPublicationsDate1: tblPublicationsDate1,
                    _tblPublicationsDate2: tblPublicationsDate2,
                    _tblPublicationsDate3: tblPublicationsDate3,
                    _tblPublicationsDate4: tblPublicationsDate4,
                    _tblPublicationsDate5: tblPublicationsDate5,
                    _tblPublicationsImageMain: tblPublicationsImageMain,
                    _tblPublicationsImageMainCaption: tblPublicationsImageMainCaption,
                    _tblPublicationsFile1: tblPublicationsImageFile1,
                    _tblPublicationsFile2: tblPublicationsImageFile2,
                    _tblPublicationsFile3: tblPublicationsImageFile3,
                    _tblPublicationsFile4: tblPublicationsImageFile4,
                    _tblPublicationsFile5: tblPublicationsImageFile5,
                    _tblPublicationsActivation: tblPublicationsActivation,
                    _tblPublicationsActivation1: tblPublicationsActivation1,
                    _tblPublicationsActivation2: tblPublicationsActivation2,
                    _tblPublicationsActivation3: tblPublicationsActivation3,
                    _tblPublicationsActivation4: tblPublicationsActivation4,
                    _tblPublicationsActivation5: tblPublicationsActivation5,
                    _tblPublicationsIdStatus: tblPublicationsIdStatus,
                    _tblPublicationsRestrictedAccess: tblPublicationsRestrictedAccess,
                    _tblPublicationsNotes: tblPublicationsNotes,
                    _arrIdsPublicationsFiltersGeneric1: arrIdsPublicationsFiltersGeneric1,
                    _arrIdsPublicationsFiltersGeneric2: arrIdsPublicationsFiltersGeneric2,
                    _arrIdsPublicationsFiltersGeneric3: arrIdsPublicationsFiltersGeneric3,
                    _arrIdsPublicationsFiltersGeneric4: arrIdsPublicationsFiltersGeneric4,
                    _arrIdsPublicationsFiltersGeneric5: arrIdsPublicationsFiltersGeneric5,
                    _arrIdsPublicationsFiltersGeneric6: arrIdsPublicationsFiltersGeneric6,
                    _arrIdsPublicationsFiltersGeneric7: arrIdsPublicationsFiltersGeneric7,
                    _arrIdsPublicationsFiltersGeneric8: arrIdsPublicationsFiltersGeneric8,
                    _arrIdsPublicationsFiltersGeneric9: arrIdsPublicationsFiltersGeneric9,
                    _arrIdsPublicationsFiltersGeneric10: arrIdsPublicationsFiltersGeneric10,
                });
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */
        //----------------------
    }
    //**************************************************************************************
    

    //Forms - insert record.
    //**************************************************************************************
    /**
     * Forms - insert record.
     * @static
     * @async
     * @param {object} _tblFormsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async formsInsert_async(_tblFormsDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblFormsDataObject = {};

        //Details - default values.
        let tblFormsID = "";
        let tblFormsIdParent = "";
        let tblFormsSortOrder = 0;
    
        let tblFormsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFormsDateTimezone = "";
        let tblFormsDateEdit = "";

        let tblFormsIdRegisterUser = 0; 

        let tblFormsFormTitle = ""; 
        let tblFormsFormSubject = ""; 

        let tblFormsRecipientName = ""; 
        let tblFormsRecipientEmail = ""; 
        let tblFormsRecipientEmailCopy = ""; 
    
        let tblFormsSenderName = "";
        let tblFormsSenderEmail = "";
        let tblFormsSenderConfig = "";
    
        let tblFormsEmailFormat = 0;
        let tblFormsMessageSuccess = "";
        let tblFormsActivation = 0;
        let tblFormsNotes = "";
        
        let strSQLFormsInsert = "";
        let strSQLFormsInsertParams = {};
        let resultsSQLFormsInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblFormsDataObject = _tblFormsDataObject;
        
        tblFormsID = tblFormsDataObject._tblFormsID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblFormsID == "" || tblFormsID === null || tblFormsID === undefined)
        {
            tblFormsID = await new Promise((resolve, reject)=>{
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
        tblFormsIdParent = (tblFormsDataObject.hasOwnProperty("_tblFormsIdParent") === true) ? tblFormsDataObject._tblFormsIdParent : tblFormsIdParent;
        tblFormsSortOrder = (tblFormsDataObject.hasOwnProperty("_tblFormsSortOrder") === true) ? tblFormsDataObject._tblFormsSortOrder : tblFormsSortOrder;
        if(!tblFormsSortOrder)
        {
            tblFormsSortOrder = 0;
        }

        tblFormsDateCreation = (tblFormsDataObject.hasOwnProperty("_tblFormsDateCreation") === true) ? tblFormsDataObject._tblFormsDateCreation : tblFormsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFormsDateCreation)
        {
            let tblFormsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsDateCreation = FunctionsGeneric.dateSQLWrite(tblFormsDateCreation_dateObj);
        }

        tblFormsDateTimezone = (tblFormsDataObject.hasOwnProperty("_tblFormsDateTimezone") === true) ? tblFormsDataObject._tblFormsDateTimezone : tblFormsDateTimezone;
        
        tblFormsDateEdit = (tblFormsDataObject.hasOwnProperty("_tblFormsDateEdit") === true) ? tblFormsDataObject._tblFormsDateEdit : tblFormsDateEdit;
        if(!tblFormsDateEdit)
        {
            let tblFormsDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsDateEdit = FunctionsGeneric.dateSQLWrite(tblFormsDateEdit_dateObj);
        }

        tblFormsIdRegisterUser = tblFormsDataObject._tblFormsIdRegisterUser;

        tblFormsFormTitle = (tblFormsDataObject.hasOwnProperty("_tblFormsFormTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsFormTitle, "db_write_text") : tblFormsFormTitle;
        tblFormsFormSubject = (tblFormsDataObject.hasOwnProperty("_tblFormsFormSubject") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsFormSubject, "db_write_text") : tblFormsFormSubject;
        
        tblFormsRecipientName = (tblFormsDataObject.hasOwnProperty("_tblFormsRecipientName") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsRecipientName, "db_write_text") : tblFormsRecipientName;
        tblFormsRecipientEmail = (tblFormsDataObject.hasOwnProperty("_tblFormsRecipientEmail") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsRecipientEmail, "db_write_text") : tblFormsRecipientEmail;
        tblFormsRecipientEmailCopy = (tblFormsDataObject.hasOwnProperty("_tblFormsRecipientEmailCopy") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsRecipientEmailCopy, "db_write_text") : tblFormsRecipientEmailCopy;
        
        tblFormsSenderName = (tblFormsDataObject.hasOwnProperty("_tblFormsSenderName") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsSenderName, "db_write_text") : tblFormsSenderName;
        tblFormsSenderEmail = (tblFormsDataObject.hasOwnProperty("_tblFormsSenderEmail") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsSenderEmail, "db_write_text") : tblFormsSenderEmail;
        tblFormsSenderConfig = (tblFormsDataObject.hasOwnProperty("_tblFormsSenderConfig") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsSenderConfig, "db_write_text") : tblFormsSenderConfig;
        
        tblFormsEmailFormat = tblFormsDataObject._tblFormsEmailFormat;
        tblFormsMessageSuccess = (tblFormsDataObject.hasOwnProperty("_tblFormsMessageSuccess") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsMessageSuccess, "db_write_text") : tblFormsMessageSuccess;
        tblFormsActivation = (tblFormsDataObject.hasOwnProperty("_tblFormsActivation") === true && (tblFormsDataObject._tblFormsActivation)) ? tblFormsDataObject._tblFormsActivation : tblFormsActivation;
        tblFormsNotes = (tblFormsDataObject.hasOwnProperty("_tblFormsNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsNotes, "db_write_text") : tblFormsNotes;
        //----------------------


        //Query.
        //----------------------
        strSQLFormsInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableForms + " ";
        strSQLFormsInsert += "SET ?";
        //----------------------

        
        //Parameters.
        //----------------------
        strSQLFormsInsertParams.id = tblFormsID;
        strSQLFormsInsertParams.id_parent = tblFormsIdParent;
        strSQLFormsInsertParams.sort_order = tblFormsSortOrder;

        strSQLFormsInsertParams.date_creation = tblFormsDateCreation;
        strSQLFormsInsertParams.date_timezone = tblFormsDateTimezone;
        strSQLFormsInsertParams.date_edit = tblFormsDateEdit;

        strSQLFormsInsertParams.id_register_user = tblFormsIdRegisterUser;

        strSQLFormsInsertParams.form_title = tblFormsFormTitle;
        strSQLFormsInsertParams.form_subject = tblFormsFormSubject;

        strSQLFormsInsertParams.recipient_name = tblFormsRecipientName;
        strSQLFormsInsertParams.recipient_email = tblFormsRecipientEmail;
        strSQLFormsInsertParams.recipient_email_copy = tblFormsRecipientEmailCopy;

        strSQLFormsInsertParams.sender_name = tblFormsSenderName;
        strSQLFormsInsertParams.sender_email = tblFormsSenderEmail;
        strSQLFormsInsertParams.sender_config = tblFormsSenderConfig;

        strSQLFormsInsertParams.email_format = tblFormsEmailFormat;
        strSQLFormsInsertParams.message_success = tblFormsMessageSuccess;
        strSQLFormsInsertParams.activation = tblFormsActivation;
        strSQLFormsInsertParams.notes = tblFormsNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFormsInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLFormsInsert, strSQLFormsInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLFormsInsert, strSQLFormsInsertParams, (dbSystemError, results) => {
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
        //resultsSQLFormsInsert object ex: 
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
        if(resultsSQLFormsInsert.affectedRows > 0)
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
        /*
        (async function(){ //async marks the block
            try{ 
            let formsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.formsInsert_async({
                    _tblFormsID: tblFormsID,
                    _tblFormsIdParent: tblFormsIdParent,
                    _tblFormsSortOrder: tblFormsSortOrder,
                    _tblFormsDateCreation: "",
                    _tblFormsDateTimezone: "",
                    _tblFormsDateEdit: "",
                    _tblFormsIdRegisterUser: tblFormsIdRegisterUser,
                    _tblFormsFormTitle: tblFormsFormTitle,
                    _tblFormsFormSubject: tblFormsFormSubject,
                    _tblFormsRecipientName: tblFormsRecipientName,
                    _tblFormsRecipientEmail: tblFormsRecipientEmail,
                    _tblFormsRecipientEmailCopy: tblFormsRecipientEmailCopy,
                    _tblFormsSenderName: tblFormsSenderName,
                    _tblFormsSenderEmail: tblFormsSenderEmail,
                    _tblFormsSenderConfig: tblFormsSenderConfig,
                    _tblFormsEmailFormat: tblFormsEmailFormat,
                    _tblFormsMessageSuccess: tblFormsMessageSuccess,
                    _tblFormsActivation: tblFormsActivation,
                    _tblFormsNotes: tblFormsNotes
                });
                
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */       
        //----------------------
    }
    //**************************************************************************************
    

    //Forms Fields - insert record.
    //**************************************************************************************
    /**
     * Forms Fields - insert record.
     * @static
     * @async
     * @param {object} _tblFormsFieldsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async formsFieldsInsert_async(_tblFormsFieldsDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblFormsFieldsDataObject = {};

        //Details - default values.
        let tblFormsFieldsID = "";
        let tblFormsFieldsIdForms = "";
        let tblFormsFieldsSortOrder = 0;
    
        let tblFormsFieldsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFormsFieldsDateTimezone = "";
        let tblFormsFieldsDateEdit = "";

        let tblFormsFieldsFieldType = 0; 

        let tblFormsFieldsFieldName = ""; 
        let tblFormsFieldsFieldNameFormatted = ""; 
        let tblFormsFieldsFieldInstructions = ""; 
    
        let tblFormsFieldsFieldSize = ""; 
        let tblFormsFieldsFieldHeight = ""; 
    
        let tblFormsFieldsFieldFilter = 0; 
    
        let tblFormsFieldsInfoSmall1 = "";
        let tblFormsFieldsInfoSmall2 = "";
        let tblFormsFieldsInfoSmall3 = "";
        let tblFormsFieldsInfoSmall4 = "";
        let tblFormsFieldsInfoSmall5 = "";
    
        let tblFormsFieldsActivation = 0;
        let tblFormsFieldsRequired = 0;
            
        let strSQLFormsFieldsInsert = "";
        let strSQLFormsFieldsInsertParams = {};
        let resultsSQLFormsFieldsInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblFormsFieldsDataObject = _tblFormsFieldsDataObject;
        
        tblFormsFieldsID = tblFormsFieldsDataObject._tblFormsFieldsID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblFormsFieldsID == "" || tblFormsFieldsID === null || tblFormsFieldsID === undefined)
        {
            tblFormsFieldsID = await new Promise((resolve, reject)=>{
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
        tblFormsFieldsIdForms = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsIdForms") === true) ? tblFormsFieldsDataObject._tblFormsFieldsIdForms : tblFormsFieldsIdForms;
        tblFormsFieldsSortOrder = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsSortOrder") === true) ? tblFormsFieldsDataObject._tblFormsFieldsSortOrder : tblFormsFieldsSortOrder;
        if(!tblFormsFieldsSortOrder)
        {
            tblFormsFieldsSortOrder = 0;
        }

        tblFormsFieldsDateCreation = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsDateCreation") === true) ? tblFormsFieldsDataObject._tblFormsFieldsDateCreation : tblFormsFieldsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFormsFieldsDateCreation)
        {
            let tblFormsFieldsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsFieldsDateCreation = FunctionsGeneric.dateSQLWrite(tblFormsFieldsDateCreation_dateObj);
        }

        tblFormsFieldsDateTimezone = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsDateTimezone") === true) ? tblFormsFieldsDataObject._tblFormsFieldsDateTimezone : tblFormsFieldsDateTimezone;
        
        tblFormsFieldsDateEdit = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsDateEdit") === true) ? tblFormsFieldsDataObject._tblFormsFieldsDateEdit : tblFormsFieldsDateEdit;
        if(!tblFormsFieldsDateEdit)
        {
            let tblFormsFieldsDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsFieldsDateEdit = FunctionsGeneric.dateSQLWrite(tblFormsFieldsDateEdit_dateObj);
        }

        //tblFormsFieldsFieldType = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsFieldType") === true && (tblFormsFieldsDataObject._tblFormsFieldsFieldType)) ? tblFormsFieldsDataObject._tblFormsFieldsFieldType : tblFormsFieldsFieldType;
        tblFormsFieldsFieldType = tblFormsFieldsDataObject._tblFormsFieldsFieldType;
        //console.log("tblFormsFieldsFieldType(insert)=", tblFormsFieldsFieldType);
        tblFormsFieldsFieldName = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsFieldName") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsFieldName, "db_write_text") : tblFormsFieldsFieldName;
        tblFormsFieldsFieldNameFormatted = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsFieldNameFormatted") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsFieldNameFormatted, "db_write_text") : tblFormsFieldsFieldNameFormatted;
        tblFormsFieldsFieldInstructions = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsFieldInstructions") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsFieldInstructions, "db_write_text") : tblFormsFieldsFieldInstructions;
        
        tblFormsFieldsFieldSize = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsFieldSize") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsFieldSize, "db_write_text") : tblFormsFieldsFieldSize;
        tblFormsFieldsFieldHeight = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsFieldHeight") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsFieldHeight, "db_write_text") : tblFormsFieldsFieldHeight;
        
        tblFormsFieldsFieldFilter = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsFieldFilter") === true && (tblFormsFieldsDataObject._tblFormsFieldsFieldFilter)) ? tblFormsFieldsDataObject._tblFormsFieldsFieldFilter : tblFormsFieldsFieldFilter;

        tblFormsFieldsInfoSmall1 = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsInfoSmall1") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsInfoSmall1, "db_write_text") : tblFormsFieldsInfoSmall1;
        tblFormsFieldsInfoSmall2 = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsInfoSmall2") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsInfoSmall2, "db_write_text") : tblFormsFieldsInfoSmall2;
        tblFormsFieldsInfoSmall3 = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsInfoSmall3") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsInfoSmall3, "db_write_text") : tblFormsFieldsInfoSmall3;
        tblFormsFieldsInfoSmall4 = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsInfoSmall4") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsInfoSmall4, "db_write_text") : tblFormsFieldsInfoSmall4;
        tblFormsFieldsInfoSmall5 = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsInfoSmall5") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsDataObject._tblFormsFieldsInfoSmall5, "db_write_text") : tblFormsFieldsInfoSmall5;

        tblFormsFieldsActivation = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsActivation") === true && (tblFormsFieldsDataObject._tblFormsFieldsActivation)) ? tblFormsFieldsDataObject._tblFormsFieldsActivation : tblFormsFieldsActivation;
        tblFormsFieldsRequired = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsRequired") === true && (tblFormsFieldsDataObject._tblFormsFieldsRequired)) ? tblFormsFieldsDataObject._tblFormsFieldsRequired : tblFormsFieldsRequired;
        //----------------------


        //Query.
        //----------------------
        strSQLFormsFieldsInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFormsFields + " ";
        strSQLFormsFieldsInsert += "SET ?";
        //----------------------

        
        //Parameters.
        //----------------------
        strSQLFormsFieldsInsertParams.id = tblFormsFieldsID;
        strSQLFormsFieldsInsertParams.id_forms = tblFormsFieldsIdForms;
        strSQLFormsFieldsInsertParams.sort_order = tblFormsFieldsSortOrder;

        strSQLFormsFieldsInsertParams.date_creation = tblFormsFieldsDateCreation;
        strSQLFormsFieldsInsertParams.date_timezone = tblFormsFieldsDateTimezone;
        strSQLFormsFieldsInsertParams.date_edit = tblFormsFieldsDateEdit;

        strSQLFormsFieldsInsertParams.field_type = tblFormsFieldsFieldType;

        strSQLFormsFieldsInsertParams.field_name = tblFormsFieldsFieldName;
        strSQLFormsFieldsInsertParams.field_name_formatted = tblFormsFieldsFieldNameFormatted;
        strSQLFormsFieldsInsertParams.field_instructions = tblFormsFieldsFieldInstructions;

        strSQLFormsFieldsInsertParams.field_size = tblFormsFieldsFieldSize;
        strSQLFormsFieldsInsertParams.field_height = tblFormsFieldsFieldHeight;
        
        strSQLFormsFieldsInsertParams.field_filter = tblFormsFieldsFieldFilter;

        strSQLFormsFieldsInsertParams.info_small1 = tblFormsFieldsInfoSmall1;
        strSQLFormsFieldsInsertParams.info_small2 = tblFormsFieldsInfoSmall2;
        strSQLFormsFieldsInsertParams.info_small3 = tblFormsFieldsInfoSmall3;
        strSQLFormsFieldsInsertParams.info_small4 = tblFormsFieldsInfoSmall4;
        strSQLFormsFieldsInsertParams.info_small5 = tblFormsFieldsInfoSmall5;

        strSQLFormsFieldsInsertParams.activation = tblFormsFieldsActivation;
        strSQLFormsFieldsInsertParams.required = tblFormsFieldsRequired;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFormsFieldsInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLFormsFieldsInsert, strSQLFormsFieldsInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLFormsFieldsInsert, strSQLFormsFieldsInsertParams, (dbSystemError, results) => {
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
        //resultsSQLFormsInsert object ex: 
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
       if(resultsSQLFormsFieldsInsert.affectedRows > 0)
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
        /*
        (async function(){ //async marks the block
            try{ 
            let formsFieldsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.formsFieldsInsert_async({
                    _tblFormsFieldsID: tblFormsFieldsID,
                    _tblFormsFieldsIdForms: tblFormsFieldsIdForms,
                    _tblFormsFieldsSortOrder: tblFormsFieldsSortOrder,
                    _tblFormsDateCreation: "",
                    _tblFormsDateTimezone: "",
                    _tblFormsDateEdit: "",
                    _tblFormsFieldsFieldType: tblFormsFieldsFieldType,
                    _tblFormsFieldsFieldName: tblFormsFieldsFieldName,
                    _tblFormsFieldsFieldNameFormatted: tblFormsFieldsFieldNameFormatted,
                    _tblFormsFieldsFieldInstructions: tblFormsFieldsFieldInstructions,
                    _tblFormsFieldsFieldSize: tblFormsFieldsFieldSize,
                    _tblFormsFieldsFieldHeight: tblFormsFieldsFieldHeight,
                    _tblFormsFieldsFieldFilter: tblFormsFieldsFieldFilter,
                    _tblFormsFieldsInfoSmall1: tblFormsFieldsInfoSmall1,
                    _tblFormsFieldsInfoSmall2: tblFormsFieldsInfoSmall2,
                    _tblFormsFieldsInfoSmall3: tblFormsFieldsInfoSmall3,
                    _tblFormsFieldsInfoSmall4: tblFormsFieldsInfoSmall4,
                    _tblFormsFieldsInfoSmall5: tblFormsFieldsInfoSmall5,
                    _tblFormsFieldsActivation: tblFormsFieldsActivation,
                    _tblFormsFieldsRequired: tblFormsFieldsRequired
                });
                
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */       
        //----------------------
    }
    //**************************************************************************************


    //Forms Fields Options - insert record.
    //**************************************************************************************
    /**
     * Forms Fields Options - insert record.
     * @static
     * @async
     * @param {object} _tblFormsFieldsOptionsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async formsFieldsOptionsInsert_async(_tblFormsFieldsOptionsDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblFormsFieldsOptionsDataObject = {};

        //Details - default values.
        let tblFormsFieldsOptionsID = "";
        let tblFormsFieldsOptionsIdFormsFields = "";
        let tblFormsFieldsOptionsSortOrder = 0;
        
        let tblFormsFieldsOptionsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblFormsFieldsOptionsDateTimezone = "";
        let tblFormsFieldsOptionsDateEdit = "";

        let tblFormsFieldsOptionsOptionName = ""; 
        let tblFormsFieldsOptionsOptionNameFormatted = ""; 
    
        let tblFormsFieldsOptionsConfigSelection = 0; 

        let tblFormsFieldsOptionsInfoSmall1 = "";
        let tblFormsFieldsOptionsInfoSmall2 = "";
        let tblFormsFieldsOptionsInfoSmall3 = "";
        let tblFormsFieldsOptionsInfoSmall4 = "";
        let tblFormsFieldsOptionsInfoSmall5 = "";
    
        let tblFormsFieldsOptionsImageMain = "";
    
        let tblFormsFieldsOptionsActivation = 0;
                
        let strSQLFormsFieldsOptionsInsert = "";
        let strSQLFormsFieldsOptionsInsertParams = {};
        let resultsSQLFormsFieldsOptionsInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblFormsFieldsOptionsDataObject = _tblFormsFieldsOptionsDataObject;
        
        tblFormsFieldsOptionsID = tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblFormsFieldsOptionsID == "" || tblFormsFieldsOptionsID === null || tblFormsFieldsOptionsID === undefined)
        {
            tblFormsFieldsOptionsID = await new Promise((resolve, reject)=>{
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
        tblFormsFieldsOptionsIdFormsFields = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsIdFormsFields") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsIdFormsFields : tblFormsFieldsOptionsIdFormsFields;
        tblFormsFieldsOptionsSortOrder = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsSortOrder") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsSortOrder : tblFormsFieldsOptionsSortOrder;
        if(!tblFormsFieldsOptionsSortOrder)
        {
            tblFormsFieldsOptionsSortOrder = 0;
        }

        tblFormsFieldsOptionsDateCreation = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsDateCreation") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsDateCreation : tblFormsFieldsOptionsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFormsFieldsOptionsDateCreation)
        {
            let tblFormsFieldsOptionsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsFieldsOptionsDateCreation = FunctionsGeneric.dateSQLWrite(tblFormsFieldsOptionsDateCreation_dateObj);
        }

        tblFormsFieldsOptionsDateTimezone = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsDateTimezone") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsDateTimezone : tblFormsFieldsOptionsDateTimezone;
        
        tblFormsFieldsOptionsDateEdit = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsDateEdit") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsDateEdit : tblFormsFieldsOptionsDateEdit;
        if(!tblFormsFieldsOptionsDateEdit)
        {
            let tblFormsFieldsOptionsDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsFieldsOptionsDateEdit = FunctionsGeneric.dateSQLWrite(tblFormsFieldsOptionsDateEdit_dateObj);
        }

        tblFormsFieldsOptionsOptionName = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsOptionName") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsOptionName, "db_write_text") : tblFormsFieldsOptionsOptionName;
        tblFormsFieldsOptionsOptionNameFormatted = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsOptionNameFormatted") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsOptionNameFormatted, "db_write_text") : tblFormsFieldsOptionsOptionNameFormatted;
        
        tblFormsFieldsOptionsConfigSelection = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsConfigSelection") === true && (tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsConfigSelection)) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsConfigSelection : tblFormsFieldsOptionsConfigSelection;

        tblFormsFieldsOptionsInfoSmall1 = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsInfoSmall1") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsInfoSmall1, "db_write_text") : tblFormsFieldsOptionsInfoSmall1;
        tblFormsFieldsOptionsInfoSmall2 = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsInfoSmall2") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsInfoSmall2, "db_write_text") : tblFormsFieldsOptionsInfoSmall2;
        tblFormsFieldsOptionsInfoSmall3 = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsInfoSmall3") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsInfoSmall3, "db_write_text") : tblFormsFieldsOptionsInfoSmall3;
        tblFormsFieldsOptionsInfoSmall4 = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsInfoSmall4") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsInfoSmall4, "db_write_text") : tblFormsFieldsOptionsInfoSmall4;
        tblFormsFieldsOptionsInfoSmall5 = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsInfoSmall5") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsInfoSmall5, "db_write_text") : tblFormsFieldsOptionsInfoSmall5;

        tblFormsFieldsOptionsImageMain = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsImageMain") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsImageMain : tblFormsFieldsOptionsImageMain;
        
        tblFormsFieldsOptionsActivation = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsActivation") === true && (tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsActivation)) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsActivation : tblFormsFieldsOptionsActivation;
        //----------------------


        //Query.
        //----------------------
        strSQLFormsFieldsOptionsInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFormsFieldsOptions + " ";
        strSQLFormsFieldsOptionsInsert += "SET ?";
        //----------------------

        
        //Parameters.
        //----------------------
        strSQLFormsFieldsOptionsInsertParams.id = tblFormsFieldsOptionsID;
        strSQLFormsFieldsOptionsInsertParams.id_forms_fields = tblFormsFieldsOptionsIdFormsFields;
        strSQLFormsFieldsOptionsInsertParams.sort_order = tblFormsFieldsOptionsSortOrder;

        strSQLFormsFieldsOptionsInsertParams.date_creation = tblFormsFieldsOptionsDateCreation;
        strSQLFormsFieldsOptionsInsertParams.date_timezone = tblFormsFieldsOptionsDateTimezone;
        strSQLFormsFieldsOptionsInsertParams.date_edit = tblFormsFieldsOptionsDateEdit;

        strSQLFormsFieldsOptionsInsertParams.option_name = tblFormsFieldsOptionsOptionName;
        strSQLFormsFieldsOptionsInsertParams.option_name_formatted = tblFormsFieldsOptionsOptionNameFormatted;

        strSQLFormsFieldsOptionsInsertParams.config_selection = tblFormsFieldsOptionsConfigSelection;
        
        strSQLFormsFieldsOptionsInsertParams.info_small1 = tblFormsFieldsOptionsInfoSmall1;
        strSQLFormsFieldsOptionsInsertParams.info_small2 = tblFormsFieldsOptionsInfoSmall2;
        strSQLFormsFieldsOptionsInsertParams.info_small3 = tblFormsFieldsOptionsInfoSmall3;
        strSQLFormsFieldsOptionsInsertParams.info_small4 = tblFormsFieldsOptionsInfoSmall4;
        strSQLFormsFieldsOptionsInsertParams.info_small5 = tblFormsFieldsOptionsInfoSmall5;

        strSQLFormsFieldsOptionsInsertParams.image_main = tblFormsFieldsOptionsImageMain;
        
        strSQLFormsFieldsOptionsInsertParams.activation = tblFormsFieldsOptionsActivation;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFormsFieldsOptionsInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLFormsFieldsOptionsInsert, strSQLFormsFieldsOptionsInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLFormsFieldsOptionsInsert, strSQLFormsFieldsOptionsInsertParams, (dbSystemError, results) => {
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
        //resultsSQLFormsInsert object ex: 
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
       if(resultsSQLFormsFieldsOptionsInsert.affectedRows > 0)
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
        /*
        (async function(){ //async marks the block
            try{ 
            let formsFieldsOptionsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.formsFieldsOptionsInsert_async({
                    _tblFormsFieldsOptionsID: tblFormsFieldsOptionsID,
                    _tblFormsFieldsOptionsIdFormsFields: tblFormsFieldsOptionsIdFormsFields,
                    _tblFormsFieldsOptionsSortOrder: tblFormsFieldsOptionsSortOrder,
                    _tblFormsFieldsOptionsDateCreation: "",
                    _tblFormsFieldsOptionsDateTimezone: "",
                    _tblFormsFieldsOptionsDateEdit: "",
                    _tblFormsFieldsOptionsOptionName: tblFormsFieldsOptionsOptionName,
                    _tblFormsFieldsOptionsOptionNameFormatted: tblFormsFieldsOptionsOptionNameFormatted,
                    _tblFormsFieldsOptionsConfigSelection: tblFormsFieldsOptionsConfigSelection,
                    _tblFormsFieldsOptionsInfoSmall1: tblFormsFieldsOptionsInfoSmall1,
                    _tblFormsFieldsOptionsInfoSmall2: tblFormsFieldsOptionsInfoSmall2,
                    _tblFormsFieldsOptionsInfoSmall3: tblFormsFieldsOptionsInfoSmall3,
                    _tblFormsFieldsOptionsInfoSmall4: tblFormsFieldsOptionsInfoSmall4,
                    _tblFormsFieldsOptionsInfoSmall5: tblFormsFieldsOptionsInfoSmall5,
                    _tblFormsFieldsOptionsImageMain: tblFormsFieldsOptionsImageMain,
                    _tblFormsFieldsOptionsActivation: tblFormsFieldsOptionsActivation
                });
                
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */       
        //----------------------
    }
    //**************************************************************************************


    //Filters Generic - insert record.
    //**************************************************************************************
    /**
     * Filters Generic - insert record.
     * @static
     * @async
     * @param {object} _tblFiltersGenericDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async filtersGenericInsert_async(_tblFiltersGenericDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblFiltersGenericDataObject = {};

        //Details - default values.
        let tblFiltersGenericID = "";
        let tblFiltersGenericSortOrder = 0;
            
        let tblFiltersGenericDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //let tblFiltersGenericDateTimezone = "";
        let tblFiltersGenericDateEdit = "";

        let tblFiltersGenericFilterIndex = 0;
        
        let tblFiltersGenericTableName = "";
        let tblFiltersGenericTitle = "";
        let tblFiltersGenericDescription = "";

        let tblFiltersGenericURLAlias = "";
        let tblFiltersGenericKeywordsTags = "";
        let tblFiltersGenericMetaDescription = "";
        let tblFiltersGenericMetaTitle = "";
        let tblFiltersGenericMetaInfo = "";
    
        let tblFiltersGenericInfoSmall1 = "";
        let tblFiltersGenericInfoSmall2 = "";
        let tblFiltersGenericInfoSmall3 = "";
        let tblFiltersGenericInfoSmall4 = "";
        let tblFiltersGenericInfoSmall5 = "";
    
        let tblFiltersGenericNumberSmall1 = 0;
        let tblFiltersGenericNumberSmall2 = 0;
        let tblFiltersGenericNumberSmall3 = 0;
        let tblFiltersGenericNumberSmall4 = 0;
        let tblFiltersGenericNumberSmall5 = 0;
    
        let tblFiltersGenericImageMain = "";
        let tblFiltersGenericConfigSelection = 0;
    
        let tblFiltersGenericActivation = "";
        let tblFiltersGenericActivation1 = "";
        let tblFiltersGenericActivation2 = "";
        let tblFiltersGenericActivation3 = "";
        let tblFiltersGenericActivation4 = "";
        let tblFiltersGenericActivation5 = "";
    
        let tblFiltersGenericNotes = "";
                    
        let strSQLFiltersGenericInsert = "";
        let strSQLFiltersGenericInsertParams = {};
        let resultsSQLFiltersGenericInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblFiltersGenericDataObject = _tblFiltersGenericDataObject;
        
        tblFiltersGenericID = tblFiltersGenericDataObject._tblFiltersGenericID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblFiltersGenericID == "" || tblFiltersGenericID === null || tblFiltersGenericID === undefined)
        {
            tblFiltersGenericID = await new Promise((resolve, reject)=>{
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
        tblFiltersGenericSortOrder = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericSortOrder") === true) ? tblFiltersGenericDataObject._tblFiltersGenericSortOrder : tblFiltersGenericSortOrder;
        if(!tblFiltersGenericSortOrder)
        {
            tblFiltersGenericSortOrder = 0;
        }

        tblFiltersGenericDateCreation = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericDateCreation") === true) ? tblFiltersGenericDataObject._tblFiltersGenericDateCreation : tblFiltersGenericDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFiltersGenericDateCreation)
        {
            let tblFiltersGenericDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFiltersGenericDateCreation = FunctionsGeneric.dateSQLWrite(tblFiltersGenericDateCreation_dateObj);
        }

        //tblFiltersGenericDateTimezone = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericDateTimezone") === true) ? tblFiltersGenericDataObject._tblFiltersGenericDateTimezone : tblFiltersGenericDateTimezone;
        
        tblFiltersGenericDateEdit = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericDateEdit") === true) ? tblFiltersGenericDataObject._tblFiltersGenericDateEdit : tblFiltersGenericDateEdit;
        if(!tblFiltersGenericDateEdit)
        {
            let tblFiltersGenericDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFiltersGenericDateEdit = FunctionsGeneric.dateSQLWrite(tblFiltersGenericDateEdit_dateObj);
        }

        tblFiltersGenericFilterIndex = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericFilterIndex") === true) ? tblFiltersGenericDataObject._tblFiltersGenericFilterIndex : tblFiltersGenericFilterIndex;

        tblFiltersGenericTableName = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericTableName") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericTableName, "db_write_text") : tblFiltersGenericTableName;
        tblFiltersGenericTitle = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericTitle, "db_write_text") : tblFiltersGenericTitle;
        tblFiltersGenericDescription = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericDescription, "db_write_text") : tblFiltersGenericDescription;
        
        tblFiltersGenericTitle = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericTitle, "db_write_text") : tblFiltersGenericTitle;
        tblFiltersGenericDescription = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericDescription, "db_write_text") : tblFiltersGenericDescription;
        tblFiltersGenericURLAlias = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericURLAlias, "db_write_text") : tblFiltersGenericURLAlias;
        tblFiltersGenericKeywordsTags = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericKeywordsTags, "db_write_text") : tblFiltersGenericKeywordsTags;
        tblFiltersGenericMetaDescription = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericMetaDescription, "db_write_text") : tblFiltersGenericMetaDescription;
        tblFiltersGenericMetaTitle = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericMetaTitle, "db_write_text") : tblFiltersGenericMetaTitle;
        tblFiltersGenericMetaInfo = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericMetaInfo, "db_write_text") : tblFiltersGenericMetaInfo;
        
        tblFiltersGenericInfoSmall1 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericInfoSmall1") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericInfoSmall1, "db_write_text") : tblFiltersGenericInfoSmall1;
        tblFiltersGenericInfoSmall2 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericInfoSmall2") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericInfoSmall2, "db_write_text") : tblFiltersGenericInfoSmall2;
        tblFiltersGenericInfoSmall3 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericInfoSmall3") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericInfoSmall3, "db_write_text") : tblFiltersGenericInfoSmall3;
        tblFiltersGenericInfoSmall4 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericInfoSmall4") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericInfoSmall4, "db_write_text") : tblFiltersGenericInfoSmall4;
        tblFiltersGenericInfoSmall5 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericInfoSmall5") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericInfoSmall5, "db_write_text") : tblFiltersGenericInfoSmall5;

        tblFiltersGenericNumberSmall1 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericNumberSmall1") === true && (tblFiltersGenericDataObject._tblFiltersGenericNumberSmall1)) ? FunctionsGeneric.valueMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericNumberSmall1, gSystemConfig.configFiltersGenericNumberS1FieldType) : tblFiltersGenericNumberSmall1;
        tblFiltersGenericNumberSmall2 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericNumberSmall2") === true && (tblFiltersGenericDataObject._tblFiltersGenericNumberSmall2)) ? FunctionsGeneric.valueMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericNumberSmall2, gSystemConfig.configFiltersGenericNumberS2FieldType) : tblFiltersGenericNumberSmall2;
        tblFiltersGenericNumberSmall3 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericNumberSmall3") === true && (tblFiltersGenericDataObject._tblFiltersGenericNumberSmall3)) ? FunctionsGeneric.valueMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericNumberSmall3, gSystemConfig.configFiltersGenericNumberS3FieldType) : tblFiltersGenericNumberSmall3;
        tblFiltersGenericNumberSmall4 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericNumberSmall4") === true && (tblFiltersGenericDataObject._tblFiltersGenericNumberSmall4)) ? FunctionsGeneric.valueMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericNumberSmall4, gSystemConfig.configFiltersGenericNumberS4FieldType) : tblFiltersGenericNumberSmall4;
        tblFiltersGenericNumberSmall5 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericNumberSmall5") === true && (tblFiltersGenericDataObject._tblFiltersGenericNumberSmall5)) ? FunctionsGeneric.valueMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericNumberSmall5, gSystemConfig.configFiltersGenericNumberS5FieldType) : tblFiltersGenericNumberSmall5;
        
        tblFiltersGenericImageMain = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericImageMain") === true) ? tblFiltersGenericDataObject._tblFiltersGenericImageMain : tblFiltersGenericImageMain;
        tblFiltersGenericConfigSelection = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericConfigSelection") === true && (tblFiltersGenericDataObject._tblFiltersGenericConfigSelection)) ? tblFiltersGenericDataObject._tblFiltersGenericConfigSelection : tblFiltersGenericConfigSelection;
        
        tblFiltersGenericActivation = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericActivation") === true && (tblFiltersGenericDataObject._tblFiltersGenericActivation)) ? tblFiltersGenericDataObject._tblFiltersGenericActivation : tblFiltersGenericActivation;
        tblFiltersGenericActivation1 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericActivation1") === true && (tblFiltersGenericDataObject._tblFiltersGenericActivation1)) ? tblFiltersGenericDataObject._tblFiltersGenericActivation1 : tblFiltersGenericActivation1;
        tblFiltersGenericActivation2 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericActivation2") === true && (tblFiltersGenericDataObject._tblFiltersGenericActivation2)) ? tblFiltersGenericDataObject._tblFiltersGenericActivation2 : tblFiltersGenericActivation2;
        tblFiltersGenericActivation3 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericActivation3") === true && (tblFiltersGenericDataObject._tblFiltersGenericActivation3)) ? tblFiltersGenericDataObject._tblFiltersGenericActivation3 : tblFiltersGenericActivation3;
        tblFiltersGenericActivation4 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericActivation5") === true && (tblFiltersGenericDataObject._tblFiltersGenericActivation4)) ? tblFiltersGenericDataObject._tblFiltersGenericActivation4 : tblFiltersGenericActivation5;
        tblFiltersGenericActivation5 = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericActivation5") === true && (tblFiltersGenericDataObject._tblFiltersGenericActivation5)) ? tblFiltersGenericDataObject._tblFiltersGenericActivation5 : tblFiltersGenericActivation5;

        tblFiltersGenericNotes = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblFiltersGenericDataObject._tblFiltersGenericNotes, "db_write_text") : tblFiltersGenericNotes;
        //----------------------


        //Query.
        //----------------------
        strSQLFiltersGenericInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFiltersGeneric + " ";
        strSQLFiltersGenericInsert += "SET ?";
        //----------------------

        
        //Parameters.
        //----------------------
        strSQLFiltersGenericInsertParams.id = tblFiltersGenericID;
        strSQLFiltersGenericInsertParams.sort_order = tblFiltersGenericSortOrder;

        strSQLFiltersGenericInsertParams.date_creation = tblFiltersGenericDateCreation;
        //strSQLFiltersGenericInsertParams.date_timezone = tblFiltersGenericDateTimezone;
        strSQLFiltersGenericInsertParams.date_edit = tblFiltersGenericDateEdit;

        strSQLFiltersGenericInsertParams.filter_index = tblFiltersGenericFilterIndex;

        strSQLFiltersGenericInsertParams.table_name = tblFiltersGenericTableName;
        strSQLFiltersGenericInsertParams.title = tblFiltersGenericTitle;
        strSQLFiltersGenericInsertParams.description = tblFiltersGenericDescription;

        strSQLFiltersGenericInsertParams.url_alias = tblFiltersGenericURLAlias;
        strSQLFiltersGenericInsertParams.keywords_tags = tblFiltersGenericKeywordsTags;
        strSQLFiltersGenericInsertParams.meta_description = tblFiltersGenericMetaDescription;
        strSQLFiltersGenericInsertParams.meta_title = tblFiltersGenericMetaTitle;
        strSQLFiltersGenericInsertParams.meta_info = tblFiltersGenericMetaInfo;

        strSQLFiltersGenericInsertParams.info_small1 = tblFiltersGenericInfoSmall1;
        strSQLFiltersGenericInsertParams.info_small2 = tblFiltersGenericInfoSmall2;
        strSQLFiltersGenericInsertParams.info_small3 = tblFiltersGenericInfoSmall3;
        strSQLFiltersGenericInsertParams.info_small4 = tblFiltersGenericInfoSmall4;
        strSQLFiltersGenericInsertParams.info_small5 = tblFiltersGenericInfoSmall5;

        strSQLFiltersGenericInsertParams.number_small1 = tblFiltersGenericNumberSmall1;
        strSQLFiltersGenericInsertParams.number_small2 = tblFiltersGenericNumberSmall2;
        strSQLFiltersGenericInsertParams.number_small3 = tblFiltersGenericNumberSmall3;
        strSQLFiltersGenericInsertParams.number_small4 = tblFiltersGenericNumberSmall4;
        strSQLFiltersGenericInsertParams.number_small5 = tblFiltersGenericNumberSmall5;

        strSQLFiltersGenericInsertParams.image_main = tblFiltersGenericImageMain;
        strSQLFiltersGenericInsertParams.config_selection = tblFiltersGenericConfigSelection;
        
        strSQLFiltersGenericInsertParams.activation = tblFiltersGenericActivation;
        strSQLFiltersGenericInsertParams.activation1 = tblFiltersGenericActivation1;
        strSQLFiltersGenericInsertParams.activation2 = tblFiltersGenericActivation2;
        strSQLFiltersGenericInsertParams.activation3 = tblFiltersGenericActivation3;
        strSQLFiltersGenericInsertParams.activation4 = tblFiltersGenericActivation4;
        strSQLFiltersGenericInsertParams.activation5 = tblFiltersGenericActivation5;

        strSQLFiltersGenericInsertParams.notes = tblFiltersGenericNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFiltersGenericInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLFiltersGenericInsert, strSQLFiltersGenericInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLFiltersGenericInsert, strSQLFiltersGenericInsertParams, (dbSystemError, results) => {
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
        //resultsSQLFormsInsert object ex: 
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
       if(resultsSQLFiltersGenericInsert.affectedRows > 0)
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
        /*
        (async function(){ //async marks the block
            try{ 
            let filtersGenericInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.filtersGenericInsert_async({
                    _tblFiltersGenericID: tblFiltersGenericID,
                    _tblFiltersGenericSortOrder: tblFiltersGenericSortOrder,
                    _tblFiltersGenericFilterIndex: tblFiltersGenericFilterIndex,
                    _tblFiltersGenericDateCreation: "",
                    //_tblFiltersGenericDateTimezone: "",
                    _tblFiltersGenericDateEdit: "",
                    _tblFiltersGenericTableName: tblFiltersGenericTableName,
                    _tblFiltersGenericTitle: tblFiltersGenericTitle,
                    _tblFiltersGenericDescription: tblFiltersGenericDescription,
                    _tblFiltersGenericURLAlias: tblFiltersGenericURLAlias,
                    _tblFiltersGenericKeywordsTags: tblFiltersGenericKeywordsTags,
                    _tblFiltersGenericMetaDescription: tblFiltersGenericMetaDescription,
                    _tblFiltersGenericMetaTitle: tblFiltersGenericMetaTitle,
                    _tblFiltersGenericMetaMetaInfo: "",
                    _tblFiltersGenericInfoSmall1: tblFiltersGenericInfoSmall1,
                    _tblFiltersGenericInfoSmall2: tblFiltersGenericInfoSmall2,
                    _tblFiltersGenericInfoSmall3: tblFiltersGenericInfoSmall3,
                    _tblFiltersGenericInfoSmall4: tblFiltersGenericInfoSmall4,
                    _tblFiltersGenericInfoSmall5: tblFiltersGenericInfoSmall5,
                    _tblFiltersGenericNumberSmall1: tblFiltersGenericNumberSmall1,
                    _tblFiltersGenericNumberSmall2: tblFiltersGenericNumberSmall2,
                    _tblFiltersGenericNumberSmall3: tblFiltersGenericNumberSmall3,
                    _tblFiltersGenericNumberSmall4: tblFiltersGenericNumberSmall4,
                    _tblFiltersGenericNumberSmall5: tblFiltersGenericNumberSmall5,
                    _tblFiltersGenericImageMain: tblFiltersGenericImageMain,
                    _tblFiltersGenericConfigSelection: tblFiltersGenericConfigSelection,
                    _tblFiltersGenericActivation: tblFiltersGenericActivation,
                    _tblFiltersGenericActivation1: tblFiltersGenericActivation1,
                    _tblFiltersGenericActivation2: tblFiltersGenericActivation2,
                    _tblFiltersGenericActivation3: tblFiltersGenericActivation3,
                    _tblFiltersGenericActivation4: tblFiltersGenericActivation4,
                    _tblFiltersGenericActivation5: tblFiltersGenericActivation5,
                    _tblFiltersGenericNotes: tblFiltersGenericNotes
                });
                
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */       
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


    //Users - insert record.
    //**************************************************************************************
    /**
     * Users - insert record.
     * @static
     * @async
     * @param {object} _tblUsersDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async usersInsert_async(_tblUsersDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblUsersDataObject = {};

        //Details - default values.
        let tblUsersID = "";
        let tblUsersIdParent = "";
        let tblUsersSortOrder = 0;
    
        let tblUsersDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblUsersDateTimezone = "";
        let tblUsersDateEdit = "";

        let tblUsersIdType = 0; 
        let tblUsersNameTitle = "";
        let tblUsersNameFull = "";
        let tblUsersNameFirst = "";
        let tblUsersNameLast = "";
    
        let tblUsersDateBirth = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblUsersGender = 0; 

        let tblUsersDocument = "";
        let tblUsersAddressStreet = "";
        let tblUsersAddressNumber = "";
        let tblUsersAddressComplement = "";
        let tblUsersNeighborhood = "";
        let tblUsersDistrict = "";
        let tblUsersCounty = "";
        let tblUsersCity = "";
        let tblUsersState = "";
        let tblUsersCountry = "";
        let tblUsersZipCode = "";
    
        let tblUsersPhone1InternationalCode = "";
        let tblUsersPhone1AreaCode = "";
        let tblUsersPhone1 = "";
    
        let tblUsersPhone2InternationalCode = "";
        let tblUsersPhone2AreaCode = "";
        let tblUsersPhone2 = "";
    
        let tblUsersPhone3InternationalCode = "";
        let tblUsersPhone3AreaCode = "";
        let tblUsersPhone3 = "";
    
        let tblUsersUsername = "";
        let tblUsersEmail = "";
        let tblUsersPassword = "";
        let tblUsersPasswordHint = "";
        let tblUsersPasswordLength = "";
        
        let tblUsersInfo1 = "";
        let tblUsersInfo2 = "";
        let tblUsersInfo3 = "";
        let tblUsersInfo4 = "";
        let tblUsersInfo5 = "";
        let tblUsersInfo6 = "";
        let tblUsersInfo7 = "";
        let tblUsersInfo8 = "";
        let tblUsersInfo9 = "";
        let tblUsersInfo10 = "";

        let tblUsersImageMain = "";

        let tblUsersActivation = 1;
        let tblUsersActivation1 = 0;
        let tblUsersActivation2 = 0;
        let tblUsersActivation3 = 0;
        let tblUsersActivation4 = 0;
        let tblUsersActivation5 = 0;
        
        let tblUsersIdStatus = 0;
        let tblUsersNotes = "";

        let strSQLUsersInsert = "";
        let strSQLUsersInsertParams = {};
        let resultsSQLUsersInsert = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblUsersDataObject = _tblUsersDataObject;
        
        tblUsersID = tblUsersDataObject._tblUsersID;
        //Check if id was passed. If not, create one.
        //----------------------
        if(tblUsersID == "" || tblUsersID === null || tblUsersID === undefined)
        {
            tblUsersID = await new Promise((resolve, reject)=>{
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

        //tblUsersIdParent = tblUsersDataObject._tblUsersIdParent;
        tblUsersIdParent = (tblUsersDataObject.hasOwnProperty("_tblUsersIdParent") === true) ? tblUsersDataObject._tblUsersIdParent : tblUsersIdParent;

        //tblUsersSortOrder = tblUsersDataObject._tblUsersSortOrder;
        tblUsersSortOrder = (tblUsersDataObject.hasOwnProperty("_tblUsersSortOrder") === true) ? tblUsersDataObject._tblUsersSortOrder : tblUsersSortOrder;
        if(!tblUsersSortOrder)
        {
            tblUsersSortOrder = 0;
        }

        tblUsersDateCreation = (tblUsersDataObject.hasOwnProperty("_tblUsersDateCreation") === true) ? tblUsersDataObject._tblUsersDateCreation : tblUsersDateCreation; //x = condition ? true : false (default value declared)
        if(!tblUsersDateCreation)
        {
            let tblUsersDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblUsersDateCreation = FunctionsGeneric.dateSQLWrite(tblUsersDateCreation_dateObj);
        }

        tblUsersDateTimezone = (tblUsersDataObject.hasOwnProperty("_tblUsersDateTimezone") === true) ? tblUsersDataObject._tblUsersDateTimezone : tblUsersDateTimezone;
        
        tblUsersDateEdit = (tblUsersDataObject.hasOwnProperty("_tblUsersDateEdit") === true) ? tblUsersDataObject._tblUsersDateEdit : tblUsersDateEdit;
        if(!tblUsersDateEdit)
        {
            let tblUsersDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblUsersDateEdit = FunctionsGeneric.dateSQLWrite(tblUsersDateEdit_dateObj);
        }

        tblUsersIdType = tblUsersDataObject._tblUsersIdType;
        
        tblUsersNameTitle = (tblUsersDataObject.hasOwnProperty("_tblUsersNameTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersNameTitle, "db_write_text") : tblUsersNameTitle;
        tblUsersNameFull = (tblUsersDataObject.hasOwnProperty("_tblUsersNameFull") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersNameFull, "db_write_text") : tblUsersNameFull;
        tblUsersNameFirst = (tblUsersDataObject.hasOwnProperty("_tblUsersNameFirst") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersNameFirst, "db_write_text") : tblUsersNameFirst;
        tblUsersNameLast = (tblUsersDataObject.hasOwnProperty("_tblUsersNameLast") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersNameLast, "db_write_text") : tblUsersNameLast;
        
        tblUsersDateBirth = (tblUsersDataObject.hasOwnProperty("_tblUsersDateBirth") === true && (tblUsersDataObject._tblUsersDateBirth)) ? FunctionsGeneric.dateSQLWrite(tblUsersDataObject._tblUsersDateBirth, gSystemConfig.configBackendDateFormat) : tblUsersDateBirth;
        tblUsersGender = (tblUsersDataObject.hasOwnProperty("_tblUsersGender") === true) ? tblUsersDataObject._tblUsersGender : tblUsersGender;
        if(!tblUsersGender)
        {
            tblUsersGender = 0;
        }

        tblUsersDocument = (tblUsersDataObject.hasOwnProperty("_tblUsersDocument") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersDocument, "db_write_text") : tblUsersDocument;
        tblUsersAddressStreet = (tblUsersDataObject.hasOwnProperty("_tblUsersAddressStreet") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersAddressStreet, "db_write_text") : tblUsersAddressStreet;
        tblUsersAddressNumber = (tblUsersDataObject.hasOwnProperty("_tblUsersAddressNumber") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersAddressNumber, "db_write_text") : tblUsersAddressNumber;
        tblUsersAddressComplement = (tblUsersDataObject.hasOwnProperty("_tblUsersAddressComplement") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersAddressComplement, "db_write_text") : tblUsersAddressComplement;
        tblUsersNeighborhood = (tblUsersDataObject.hasOwnProperty("_tblUsersNeighborhood") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersNeighborhood, "db_write_text") : tblUsersNeighborhood;
        tblUsersDistrict = (tblUsersDataObject.hasOwnProperty("_tblUsersDistrict") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersDistrict, "db_write_text") : tblUsersDistrict;
        tblUsersCounty = (tblUsersDataObject.hasOwnProperty("_tblUsersCounty") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersCounty, "db_write_text") : tblUsersCounty;
        tblUsersCity = (tblUsersDataObject.hasOwnProperty("_tblUsersCity") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersCity, "db_write_text") : tblUsersCity;
        tblUsersState = (tblUsersDataObject.hasOwnProperty("_tblUsersState") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersState, "db_write_text") : tblUsersState;
        tblUsersCountry = (tblUsersDataObject.hasOwnProperty("_tblUsersCountry") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersCountry, "db_write_text") : tblUsersCountry;
        tblUsersZipCode = (tblUsersDataObject.hasOwnProperty("_tblUsersZipCode") === true) ? FunctionsGeneric.removeNonNumerical(tblUsersDataObject._tblUsersZipCode) : tblUsersZipCode;

        tblUsersPhone1InternationalCode = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone1InternationalCode") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone1InternationalCode, "db_write_text") : tblUsersPhone1InternationalCode;
        tblUsersPhone1AreaCode = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone1AreaCode") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone1AreaCode, "db_write_text") : tblUsersPhone1AreaCode;
        tblUsersPhone1 = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone1") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone1, "db_write_text") : tblUsersPhone1;

        tblUsersPhone2InternationalCode = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone2InternationalCode") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone2InternationalCode, "db_write_text") : tblUsersPhone2InternationalCode;
        tblUsersPhone2AreaCode = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone2AreaCode") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone2AreaCode, "db_write_text") : tblUsersPhone2AreaCode;
        tblUsersPhone2 = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone2") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone2, "db_write_text") : tblUsersPhone2;

        tblUsersPhone3InternationalCode = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone3InternationalCode") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone3InternationalCode, "db_write_text") : tblUsersPhone3InternationalCode;
        tblUsersPhone3AreaCode = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone3AreaCode") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone3AreaCode, "db_write_text") : tblUsersPhone3AreaCode;
        tblUsersPhone3 = (tblUsersDataObject.hasOwnProperty("_tblUsersPhone3") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPhone3, "db_write_text") : tblUsersPhone3;
        
        tblUsersUsername = (tblUsersDataObject.hasOwnProperty("_tblUsersUsername") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersUsername, "db_write_text") : tblUsersUsername;
        tblUsersEmail = (tblUsersDataObject.hasOwnProperty("_tblUsersEmail") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersEmail, "db_write_text") : tblUsersEmail;
        
        //tblUsersPassword = (tblUsersDataObject.hasOwnProperty("_tblUsersPassword") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPassword, "db_write_text") : tblUsersPassword;
        tblUsersPassword = (tblUsersDataObject.hasOwnProperty("_tblUsersPassword") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPassword, "db_write_text"), 2) : tblUsersPassword;

        tblUsersPasswordHint = (tblUsersDataObject.hasOwnProperty("_tblUsersPasswordHint") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPasswordHint, "db_write_text") : tblUsersPasswordHint;
        tblUsersPasswordLength = (tblUsersDataObject.hasOwnProperty("_tblUsersPasswordLength") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersPasswordLength, "db_write_text") : tblUsersPasswordLength;

        if(gSystemConfig.configUsersInfo1FieldType == 1 || gSystemConfig.configUsersInfo1FieldType == 2)
        {
            tblUsersInfo1 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo1, "db_write_text") : tblUsersInfo1;
        }
        if(gSystemConfig.configUsersInfo1FieldType == 11 || gSystemConfig.configUsersInfo1FieldType == 12)
        {
            tblUsersInfo1 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo1, "db_write_text"), 2) : tblUsersInfo1;
        }

        if(gSystemConfig.configUsersInfo2FieldType == 1 || gSystemConfig.configUsersInfo2FieldType == 2)
        {
            tblUsersInfo2 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo2, "db_write_text") : tblUsersInfo2;
        }
        if(gSystemConfig.configUsersInfo2FieldType == 11 || gSystemConfig.configUsersInfo2FieldType == 12)
        {
            tblUsersInfo2 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo2, "db_write_text"), 2) : tblUsersInfo2;
        }

        if(gSystemConfig.configUsersInfo3FieldType == 1 || gSystemConfig.configUsersInfo3FieldType == 2)
        {
            tblUsersInfo3 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo3, "db_write_text") : tblUsersInfo3;
        }
        if(gSystemConfig.configUsersInfo3FieldType == 11 || gSystemConfig.configUsersInfo3FieldType == 12)
        {
            tblUsersInfo3 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo3, "db_write_text"), 2) : tblUsersInfo3;
        }

        if(gSystemConfig.configUsersInfo4FieldType == 1 || gSystemConfig.configUsersInfo4FieldType == 2)
        {
            tblUsersInfo4 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo4, "db_write_text") : tblUsersInfo4;
        }
        if(gSystemConfig.configUsersInfo4FieldType == 11 || gSystemConfig.configUsersInfo4FieldType == 12)
        {
            tblUsersInfo4 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo4, "db_write_text"), 2) : tblUsersInfo1;
        }

        if(gSystemConfig.configUsersInfo5FieldType == 1 || gSystemConfig.configUsersInfo5FieldType == 2)
        {
            tblUsersInfo5 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo5, "db_write_text") : tblUsersInfo5;
        }
        if(gSystemConfig.configUsersInfo5FieldType == 11 || gSystemConfig.configUsersInfo5FieldType == 12)
        {
            tblUsersInfo5 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo5, "db_write_text"), 2) : tblUsersInfo5;
        }

        if(gSystemConfig.configUsersInfo6FieldType == 1 || gSystemConfig.configUsersInfo6FieldType == 2)
        {
            tblUsersInfo6 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo6") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo6, "db_write_text") : tblUsersInfo6;
        }
        if(gSystemConfig.configUsersInfo6FieldType == 11 || gSystemConfig.configUsersInfo6FieldType == 12)
        {
            tblUsersInfo6 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo6") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo6, "db_write_text"), 2) : tblUsersInfo6;
        }

        if(gSystemConfig.configUsersInfo7FieldType == 1 || gSystemConfig.configUsersInfo7FieldType == 2)
        {
            tblUsersInfo7 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo7") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo7, "db_write_text") : tblUsersInfo7;
        }
        if(gSystemConfig.configUsersInfo7FieldType == 11 || gSystemConfig.configUsersInfo7FieldType == 12)
        {
            tblUsersInfo7 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo7") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo7, "db_write_text"), 2) : tblUsersInfo7;
        }

        if(gSystemConfig.configUsersInfo8FieldType == 1 || gSystemConfig.configUsersInfo8FieldType == 2)
        {
            tblUsersInfo8 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo8") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo8, "db_write_text") : tblUsersInfo8;
        }
        if(gSystemConfig.configUsersInfo8FieldType == 11 || gSystemConfig.configUsersInfo8FieldType == 12)
        {
            tblUsersInfo8 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo8") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo8, "db_write_text"), 2) : tblUsersInfo8;
        }

        if(gSystemConfig.configUsersInfo9FieldType == 1 || gSystemConfig.configUsersInfo9FieldType == 2)
        {
            tblUsersInfo9 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo9") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo9, "db_write_text") : tblUsersInfo9;
        }
        if(gSystemConfig.configUsersInfo9FieldType == 11 || gSystemConfig.configUsersInfo9FieldType == 12)
        {
            tblUsersInfo9 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo9") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo9, "db_write_text"), 2) : tblUsersInfo9;
        }

        if(gSystemConfig.configUsersInfo10FieldType == 1 || gSystemConfig.configUsersInfo10FieldType == 2)
        {
            tblUsersInfo10 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo10") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo10, "db_write_text") : tblUsersInfo10;
        }
        if(gSystemConfig.configUsersInfo10FieldType == 11 || gSystemConfig.configUsersInfo10FieldType == 12)
        {
            tblUsersInfo10 = (tblUsersDataObject.hasOwnProperty("_tblUsersInfo10") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersInfo10, "db_write_text"), 2) : tblUsersInfo10;
        }

        tblUsersImageMain = (tblUsersDataObject.hasOwnProperty("_tblUsersImageMain") === true) ? tblUsersDataObject._tblUsersImageMain : tblUsersImageMain;
        
        tblUsersActivation = (tblUsersDataObject.hasOwnProperty("_tblUsersActivation") === true && (tblUsersDataObject._tblUsersActivation)) ? tblUsersDataObject._tblUsersActivation : tblUsersActivation;
        tblUsersActivation1 = (tblUsersDataObject.hasOwnProperty("_tblUsersActivation1") === true && (tblUsersDataObject._tblUsersActivation1)) ? tblUsersDataObject._tblUsersActivation1 : tblUsersActivation1;
        tblUsersActivation2 = (tblUsersDataObject.hasOwnProperty("_tblUsersActivation2") === true && (tblUsersDataObject._tblUsersActivation2)) ? tblUsersDataObject._tblUsersActivation2 : tblUsersActivation2;
        tblUsersActivation3 = (tblUsersDataObject.hasOwnProperty("_tblUsersActivation3") === true && (tblUsersDataObject._tblUsersActivation3)) ? tblUsersDataObject._tblUsersActivation3 : tblUsersActivation3;
        tblUsersActivation4 = (tblUsersDataObject.hasOwnProperty("_tblUsersActivation5") === true && (tblUsersDataObject._tblUsersActivation4)) ? tblUsersDataObject._tblUsersActivation4 : tblUsersActivation5;
        tblUsersActivation5 = (tblUsersDataObject.hasOwnProperty("_tblUsersActivation5") === true && (tblUsersDataObject._tblUsersActivation5)) ? tblUsersDataObject._tblUsersActivation5 : tblUsersActivation5;
        
        tblUsersIdStatus = (tblUsersDataObject.hasOwnProperty("_tblUsersIdStatus") === true && (tblUsersDataObject._tblUsersIdStatus)) ? tblUsersDataObject._tblUsersIdStatus : tblUsersIdStatus;
        tblUsersNotes = (tblUsersDataObject.hasOwnProperty("_tblUsersNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblUsersDataObject._tblUsersNotes, "db_write_text") : tblUsersNotes;
        //----------------------


        //Debug.
        //console.log("tblUsersDataObject=", tblUsersDataObject);


        //Query.
        //----------------------
        //strSQLUsersInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLUsersInsert += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableUsers + " ";
        strSQLUsersInsert += "SET ?";
        //----------------------


        //Parameters.
        //----------------------
        strSQLUsersInsertParams.id = tblUsersID;
        strSQLUsersInsertParams.id_parent = tblUsersIdParent;
        strSQLUsersInsertParams.sort_order = tblUsersSortOrder;

        strSQLUsersInsertParams.date_creation = tblUsersDateCreation;
        strSQLUsersInsertParams.date_timezone = tblUsersDateTimezone;
        strSQLUsersInsertParams.date_edit = tblUsersDateEdit;

        strSQLUsersInsertParams.id_type = tblUsersIdType;
        strSQLUsersInsertParams.name_title = tblUsersNameTitle;
        strSQLUsersInsertParams.name_full = tblUsersNameFull;
        strSQLUsersInsertParams.name_first = tblUsersNameFirst;
        strSQLUsersInsertParams.name_last = tblUsersNameLast;

        strSQLUsersInsertParams.date_birth = tblUsersDateBirth;
        strSQLUsersInsertParams.gender = tblUsersGender;
        strSQLUsersInsertParams.document = tblUsersDocument;

        strSQLUsersInsertParams.address_street = tblUsersAddressStreet;
        strSQLUsersInsertParams.address_number = tblUsersAddressNumber;
        strSQLUsersInsertParams.address_complement = tblUsersAddressComplement;
        strSQLUsersInsertParams.neighborhood = tblUsersNeighborhood;
        strSQLUsersInsertParams.district = tblUsersDistrict;
        strSQLUsersInsertParams.county = tblUsersCounty;
        strSQLUsersInsertParams.city = tblUsersCity;
        strSQLUsersInsertParams.state = tblUsersState;
        strSQLUsersInsertParams.country = tblUsersCountry;
        strSQLUsersInsertParams.zip_code = tblUsersZipCode;

        strSQLUsersInsertParams.phone1_international_code = tblUsersPhone1InternationalCode;
        strSQLUsersInsertParams.phone1_area_code = tblUsersPhone1AreaCode;
        strSQLUsersInsertParams.phone1 = tblUsersPhone1;

        strSQLUsersInsertParams.phone2_international_code = tblUsersPhone2InternationalCode;
        strSQLUsersInsertParams.phone2_area_code = tblUsersPhone2AreaCode;
        strSQLUsersInsertParams.phone2 = tblUsersPhone2;

        strSQLUsersInsertParams.phone3_international_code = tblUsersPhone3InternationalCode;
        strSQLUsersInsertParams.phone3_area_code = tblUsersPhone3AreaCode;
        strSQLUsersInsertParams.phone3 = tblUsersPhone3;

        strSQLUsersInsertParams.username = tblUsersUsername;
        strSQLUsersInsertParams.email = tblUsersEmail;
        strSQLUsersInsertParams.password = tblUsersPassword;
        strSQLUsersInsertParams.password_hint = tblUsersPasswordHint;
        strSQLUsersInsertParams.password_length = tblUsersPasswordLength;

        strSQLUsersInsertParams.info1 = tblUsersInfo1;
        strSQLUsersInsertParams.info2 = tblUsersInfo2;
        strSQLUsersInsertParams.info3 = tblUsersInfo3;
        strSQLUsersInsertParams.info4 = tblUsersInfo4;
        strSQLUsersInsertParams.info5 = tblUsersInfo5;
        strSQLUsersInsertParams.info6 = tblUsersInfo6;
        strSQLUsersInsertParams.info7 = tblUsersInfo7;
        strSQLUsersInsertParams.info8 = tblUsersInfo8;
        strSQLUsersInsertParams.info9 = tblUsersInfo9;
        strSQLUsersInsertParams.info10 = tblUsersInfo10;
        
        strSQLUsersInsertParams.image_main = tblUsersImageMain;
        strSQLUsersInsertParams.activation = tblUsersActivation;
        strSQLUsersInsertParams.activation1 = tblUsersActivation1;
        strSQLUsersInsertParams.activation2 = tblUsersActivation2;
        strSQLUsersInsertParams.activation3 = tblUsersActivation3;
        strSQLUsersInsertParams.activation4 = tblUsersActivation4;
        strSQLUsersInsertParams.activation5 = tblUsersActivation5;
        
        strSQLUsersInsertParams.id_status = tblUsersIdStatus;
        strSQLUsersInsertParams.notes = tblUsersNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLUsersInsert = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLUsersInsert, strSQLUsersInsertParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLUsersInsert, strSQLUsersInsertParams, (dbSystemError, results) => {
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
        //resultsSQLUsersInsert object ex: 
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
        if(resultsSQLUsersInsert.affectedRows > 0)
        {
            strReturn = true;
        }
        //----------------------


        //Debug.
        //return tblUsersID;
        //return resultsSQLUsersInsert;


        return strReturn;


        //Usage.
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
                let usersInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.usersInsert_async({
                    _tblUsersID: tblUsersID,
                    _tblUsersIdParent: tblUsersIdParent,
                    _tblUsersSortOrder: tblUsersSortOrder,
                    _tblUsersDateCreation: "",
                    _tblUsersDateTimezone: "",
                    _tblUsersDateEdit: "",
                    _tblUsersIdType: tblUsersIdType,
                    _tblUsersNameTitle: tblUsersNameTitle,
                    _tblUsersNameFull: tblUsersNameFull,
                    _tblUsersNameFirst: tblUsersNameFirst,
                    _tblUsersNameLast: tblUsersNameLast,
                    _tblUsersDateBirth: tblUsersDateBirth,
                    _tblUsersGender: tblUsersGender,
                    _tblUsersDocument: tblUsersDocument,
                    _tblUsersAddressStreet: tblUsersAddressStreet,
                    _tblUsersAddressNumber: tblUsersAddressNumber,
                    _tblUsersAddressComplement: tblUsersAddressComplement,
                    _tblUsersNeighborhood: tblUsersNeighborhood,
                    _tblUsersDistrict: tblUsersDistrict,
                    _tblUsersCounty: tblUsersCounty,
                    _tblUsersCity: tblUsersCity,
                    _tblUsersState: tblUsersState,
                    _tblUsersCountry: tblUsersCountry,
                    _tblUsersZipCode: tblUsersZipCode,
                    _tblUsersPhone1InternationalCode: tblUsersPhone1InternationalCode,
                    _tblUsersPhone1AreaCode: tblUsersPhone1AreaCode,
                    _tblUsersPhone1: tblUsersPhone1,
                    _tblUsersPhone2InternationalCode: tblUsersPhone2InternationalCode,
                    _tblUsersPhone2AreaCode: tblUsersPhone2AreaCode,
                    _tblUsersPhone2: tblUsersPhone2,
                    _tblUsersPhone3InternationalCode: tblUsersPhone3InternationalCode,
                    _tblUsersPhone3AreaCode: tblUsersPhone3AreaCode,
                    _tblUsersPhone3: tblUsersPhone3,
                    _tblUsersUsername: tblUsersUsername,
                    _tblUsersEmail: tblUsersEmail,
                    _tblUsersPassword: tblUsersPassword,
                    _tblUsersPasswordHint: tblUsersPasswordHint,
                    _tblUsersPasswordLength: tblUsersPasswordLength,
                    _tblUsersInfo1: tblUsersInfo1,
                    _tblUsersInfo2: tblUsersInfo2,
                    _tblUsersInfo3: tblUsersInfo3,
                    _tblUsersInfo4: tblUsersInfo4,
                    _tblUsersInfo5: tblUsersInfo5,
                    _tblUsersInfo6: tblUsersInfo6,
                    _tblUsersInfo7: tblUsersInfo7,
                    _tblUsersInfo8: tblUsersInfo8,
                    _tblUsersInfo9: tblUsersInfo9,
                    _tblUsersInfo10: tblUsersInfo10,
                    _tblUsersImageMain: tblUsersImageMain,
                    _tblUsersActivation: tblUsersActivation,
                    _tblUsersActivation1: tblUsersActivation1,
                    _tblUsersActivation2: tblUsersActivation2,
                    _tblUsersActivation3: tblUsersActivation3,
                    _tblUsersActivation4: tblUsersActivation4,
                    _tblUsersActivation5: tblUsersActivation5,
                    _tblUsersIdStatus: tblUsersIdStatus,
                    _tblUsersNotes: tblUsersNotes
                });
            }catch(aError){
                //console.error(aError);
            }finally{
        
            }
        })()
        */
        //----------------------
    }
    //**************************************************************************************
}