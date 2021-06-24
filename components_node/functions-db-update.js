"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
const mysql = require("mysql"); //MySQL package.
const lodash = require("lodash"); //Utils. 

const gSystemConfig = require("../config-application.js"); //System configuration.
//const dbSystemCon = require("../config-application-db.js").dbSystemCon; //DB System - simple connection.
const dbSystemConPool = require("../config-application-db.js").dbSystemConPool; //DB System - pool connection.
//const SyncSystemNS = require("./syncsystem-ns.js"); //Cause error.

const FunctionsGeneric = require("./functions-generic.js");
const FunctionsDB = require("./functions-db.js");
const FunctionsDBInsert = require("./functions-db-insert.js");
const FunctionsDBDelete = require("./functions-db-delete.js");
const FunctionsCrypto = require("./functions-crypto.js");

const ObjectFiltersGenericListing = require("./object-filters-generic-listing.js");
//----------------------


module.exports = class FunctionsDBUpdate
{
    //Function to update a generic record field.
    //**************************************************************************************
    /**
     * Function to update a generic record field.
     * @static
     * @async
     * @param {string} strTable
     * @param {string} strField
     * @param {string} recordValue
     * @param {array} arrSearchParameters
     */
    static async updateRecordGeneric10(strTable, 
    strField, 
    recordValue, 
    arrSearchParameters)
    {
        //arrSearchParameters: ["fieldNameSearch1;fieldValueSearch1;fieldTypeSearch1", "fieldNameSearch2;fieldValueSearch2;fieldTypeSearch2", "fieldNameSearch3;fieldValueSearch3;fieldTypeSearch3"]
            //typeFieldSearch1: s (string) | i (integer) | d (date) | dif (initial date and final date) | ids (id IN)


        //Variables.
        //----------------------
        //let strReturn = false;
        let objReturn = {returnStatus: false, nRecords: 0};

        let strSQLRecordsGenericUpdate = "";
        let strSQLRecordsGenericUpdateParams = [];
        let resultsSQLRecordsGenericUpdate = null;

        let strOperator = "";
        //----------------------


        //Query.
        //----------------------
        strSQLRecordsGenericUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + FunctionsGeneric.contentMaskWrite(strTable, "db_sanitize") + " ";
        strSQLRecordsGenericUpdate += "SET ";
        strSQLRecordsGenericUpdate += FunctionsGeneric.contentMaskWrite(strField, "db_sanitize") + " = ?";
        strSQLRecordsGenericUpdateParams.push(recordValue);
        //----------------------

        //Parameters.
        //----------------------
        for(let countArray = 0; countArray < arrSearchParameters.length; countArray++)
        {
            //Variables.
            let arrSearchParametersInfo = arrSearchParameters[countArray].split(";");
            let searchParametersFieldName = arrSearchParametersInfo[0];
            let searchParametersFieldValue = arrSearchParametersInfo[1];
            let searchParametersFieldType = arrSearchParametersInfo[2];

            //Operator selection.
            if(countArray == 0)
            {
                strOperator = "WHERE"
            }else{
                strOperator = "AND"
            }

            //Integer.
            if(searchParametersFieldType == "i")
            {
                strSQLRecordsGenericUpdate += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " = ?";
                strSQLRecordsGenericUpdateParams.push(searchParametersFieldValue);
            }

            //ids.
            if(searchParametersFieldType == "ids")
            {
                let arrIds = searchParametersFieldValue.split(",");

                //strSQLRecordsGenericDelete += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " IN (?,?)"; //debug
                strSQLRecordsGenericUpdate += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " IN (" + "?".repeat(arrIds.length).split("").join(",") + ")";
                //strSQLRecordsGenericDeleteParams.push(searchParametersFieldValue);
                //strSQLRecordsGenericDeleteParams.push(649); //debug
                //strSQLRecordsGenericDeleteParams.push(650); //debug

                for(let countArrayParameters = 0; countArrayParameters < arrIds.length; countArrayParameters++)
                {
                    strSQLRecordsGenericUpdateParams.push(arrIds[countArrayParameters]);
                    //console.log("arrIds[]=", arrIds[countArrayParameters]);
                }
            }

            //Debug.
            //print("arrSearchParameters=" + arrSearchParameters[countArray]);
            //print("searchParametersFieldName=" + searchParametersFieldName);
            //print("searchParametersFieldValue=" + searchParametersFieldValue);
            //print("searchParametersFieldType=" + searchParametersFieldType);
        }
        //console.log("strSQLRecordsGenericUpdate=", strSQLRecordsGenericUpdate);
        //----------------------


        //Execute query.
        //----------------------
        return new Promise((resolve, reject) => {
            
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection) {
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage10e"));
                    }
                    throw dbSystemPoolError;
                }else{
                    //dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
                    dbSystemConPoolGetConnection.query(strSQLRecordsGenericUpdate, strSQLRecordsGenericUpdateParams, (dbSystemError, resultsSQLGenericTableRows) => {
                        dbSystemConPoolGetConnection.release();
        
                        if(dbSystemError)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                            }
                            throw dbSystemError;
        
                            //return reject(dbSystemError);
                        }else{
                            //Select the counter number.

                            resultsSQLRecordsGenericUpdate = resultsSQLGenericTableRows;
                            //console.log("resultsSQLRecordsGenericUpdate=", resultsSQLRecordsGenericUpdate);
                            objReturn.nRecords = resultsSQLRecordsGenericUpdate.affectedRows;
                            
                            if(resultsSQLRecordsGenericUpdate === undefined)
                            {
                                //Error.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                                }
        
                                //reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9")));
                                reject(objReturn);
                                //reject(new Error("nCounter is undefined."));
                            }else{
                                //Success.
                                objReturn.returnStatus = true;
                                //resolve(resultsSQLRecordsGenericDelete);
                                resolve(objReturn);
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
        let updateRecordsGeneric10Result = await SyncSystemNS.FunctionsDBUpdate.deleteRecordsGeneric10(strTable, 
            strField, 
            recordValue, 
            ["id;"+ idRecord + ";i"]);
        */
        //----------------------
    }
    //**************************************************************************************


    //Category - update record.
    //**************************************************************************************
    /**
     * Category - update record.
     * @static
     * @async
     * @param {object} _tblCategoriesDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async categoryUpdate_async(_tblCategoriesDataObject)
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

        let arrFiltersGenericSearchParameters = [];
        let ofglRecords = "";
        let ofglRecordsParameters = {};

        let resultsCategoriesFiltersGeneric1Listing;
        let resultsCategoriesFiltersGeneric2Listing;
        let resultsCategoriesFiltersGeneric3Listing;
        let resultsCategoriesFiltersGeneric4Listing;
        let resultsCategoriesFiltersGeneric5Listing;
        let resultsCategoriesFiltersGeneric6Listing;
        let resultsCategoriesFiltersGeneric7Listing;
        let resultsCategoriesFiltersGeneric8Listing;
        let resultsCategoriesFiltersGeneric9Listing;
        let resultsCategoriesFiltersGeneric10Listing;

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

        let objIdsCategoriesFiltersGenericBinding;
        
        let strSQLCategoriesUpdate = "";
        let strSQLCategoriesUpdateParams = {};
        let resultsSQLCategoriesUpdate = null;
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblCategoriesDataObject = _tblCategoriesDataObject;
        tblCategoriesID = tblCategoriesDataObject._tblCategoriesID;

        tblCategoriesIdParent = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesIdParent") === true) ? tblCategoriesDataObject._tblCategoriesIdParent : tblCategoriesIdParent;
        tblCategoriesSortOrder = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesSortOrder") === true) ? tblCategoriesDataObject._tblCategoriesSortOrder : tblCategoriesSortOrder;
        if(!tblCategoriesSortOrder)
        {
            tblCategoriesSortOrder = 0;
        }

        tblCategoriesCategoryType = tblCategoriesDataObject._tblCategoriesCategoryType;

        /*
        tblCategoriesDateCreation = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDateCreation") === true) ? tblCategoriesDataObject._tblCategoriesDateCreation : tblCategoriesDateCreation; //x = condition ? true : false (default value declared)
        if(!tblCategoriesDateCreation)
        {
            let tblCategoriesDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblCategoriesDateCreation = FunctionsGeneric.dateSQLWrite(tblCategoriesDateCreation_dateObj);
        }
        */

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

        tblCategoriesTitle = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesTitle, "db_write_text") : tblCategoriesTitle;
        tblCategoriesDescription = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesDescription, "db_write_text") : tblCategoriesDescription;
        tblCategoriesURLAlias = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesURLAlias, "db_write_text") : tblCategoriesURLAlias;
        tblCategoriesKeywordsTags = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesKeywordsTags, "db_write_text") : tblCategoriesKeywordsTags;
        tblCategoriesMetaDescription = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesMetaDescription, "db_write_text") : tblCategoriesMetaDescription;
        tblCategoriesMetaTitle = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesMetaTitle, "db_write_text") : tblCategoriesMetaTitle;
        tblCategoriesMetaInfo = (tblCategoriesDataObject.hasOwnProperty("_tblCategoriesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblCategoriesDataObject._tblCategoriesMetaInfo, "db_write_text") : tblCategoriesMetaInfo;
        
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


        //Query.
        //----------------------
        //strSQLCategoriesUpdate += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLCategoriesUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCategories + " ";
        strSQLCategoriesUpdate += "SET ? ";
        strSQLCategoriesUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLCategoriesUpdateParams.id = tblCategoriesID;
        strSQLCategoriesUpdateParams.id_parent = tblCategoriesIdParent;
        strSQLCategoriesUpdateParams.sort_order = tblCategoriesSortOrder;
        strSQLCategoriesUpdateParams.category_type = tblCategoriesCategoryType;

        //strSQLCategoriesUpdateParams.date_creation = tblCategoriesDateCreation;
        strSQLCategoriesUpdateParams.date_timezone = tblCategoriesDateTimezone;
        strSQLCategoriesUpdateParams.date_edit = tblCategoriesDateEdit;

        strSQLCategoriesUpdateParams.id_register_user = tblCategoriesIdRegisterUser;
        strSQLCategoriesUpdateParams.id_register1 = tblCategoriesIdRegister1;
        strSQLCategoriesUpdateParams.id_register2 = tblCategoriesIdRegister2;
        strSQLCategoriesUpdateParams.id_register3 = tblCategoriesIdRegister3;
        strSQLCategoriesUpdateParams.id_register4 = tblCategoriesIdRegister4;
        strSQLCategoriesUpdateParams.id_register5 = tblCategoriesIdRegister5;

        strSQLCategoriesUpdateParams.title = tblCategoriesTitle;
        strSQLCategoriesUpdateParams.description = tblCategoriesDescription;
        strSQLCategoriesUpdateParams.url_alias = tblCategoriesURLAlias;
        strSQLCategoriesUpdateParams.keywords_tags = tblCategoriesKeywordsTags;
        strSQLCategoriesUpdateParams.meta_description = tblCategoriesMetaDescription;
        strSQLCategoriesUpdateParams.meta_title = tblCategoriesMetaTitle;
        strSQLCategoriesUpdateParams.meta_info = tblCategoriesMetaInfo;

        strSQLCategoriesUpdateParams.info1 = tblCategoriesInfo1;
        strSQLCategoriesUpdateParams.info2 = tblCategoriesInfo2;
        strSQLCategoriesUpdateParams.info3 = tblCategoriesInfo3;
        strSQLCategoriesUpdateParams.info4 = tblCategoriesInfo4;
        strSQLCategoriesUpdateParams.info5 = tblCategoriesInfo5;
        strSQLCategoriesUpdateParams.info6 = tblCategoriesInfo6;
        strSQLCategoriesUpdateParams.info7 = tblCategoriesInfo7;
        strSQLCategoriesUpdateParams.info8 = tblCategoriesInfo8;
        strSQLCategoriesUpdateParams.info9 = tblCategoriesInfo9;
        strSQLCategoriesUpdateParams.info10 = tblCategoriesInfo10;

        strSQLCategoriesUpdateParams.info_small1 = tblCategoriesInfoSmall1;
        strSQLCategoriesUpdateParams.info_small2 = tblCategoriesInfoSmall2;
        strSQLCategoriesUpdateParams.info_small3 = tblCategoriesInfoSmall3;
        strSQLCategoriesUpdateParams.info_small4 = tblCategoriesInfoSmall4;
        strSQLCategoriesUpdateParams.info_small5 = tblCategoriesInfoSmall5;

        strSQLCategoriesUpdateParams.number1 = tblCategoriesNumber1;
        strSQLCategoriesUpdateParams.number2 = tblCategoriesNumber2;
        strSQLCategoriesUpdateParams.number3 = tblCategoriesNumber3;
        strSQLCategoriesUpdateParams.number4 = tblCategoriesNumber4;
        strSQLCategoriesUpdateParams.number5 = tblCategoriesNumber5;

        strSQLCategoriesUpdateParams.number_small1 = tblCategoriesNumberSmall1;
        strSQLCategoriesUpdateParams.number_small2 = tblCategoriesNumberSmall2;
        strSQLCategoriesUpdateParams.number_small3 = tblCategoriesNumberSmall3;
        strSQLCategoriesUpdateParams.number_small4 = tblCategoriesNumberSmall4;
        strSQLCategoriesUpdateParams.number_small5 = tblCategoriesNumberSmall5;

        strSQLCategoriesUpdateParams.date1 = tblCategoriesDate1;
        strSQLCategoriesUpdateParams.date2 = tblCategoriesDate2;
        strSQLCategoriesUpdateParams.date3 = tblCategoriesDate3;
        strSQLCategoriesUpdateParams.date4 = tblCategoriesDate4;
        strSQLCategoriesUpdateParams.date5 = tblCategoriesDate5;
        
        strSQLCategoriesUpdateParams.id_item1 = tblCategoriesIdItem1;
        strSQLCategoriesUpdateParams.id_item2 = tblCategoriesIdItem2;
        strSQLCategoriesUpdateParams.id_item3 = tblCategoriesIdItem3;
        strSQLCategoriesUpdateParams.id_item4 = tblCategoriesIdItem4;
        strSQLCategoriesUpdateParams.id_item5 = tblCategoriesIdItem5;
        
        if(tblCategoriesImageMain)
        {
            strSQLCategoriesUpdateParams.image_main = tblCategoriesImageMain;
        }
        if(tblCategoriesFile1)
        {
            strSQLCategoriesUpdateParams.file1 = tblCategoriesFile1;
        }
        if(tblCategoriesFile2)
        {
            strSQLCategoriesUpdateParams.file2 = tblCategoriesFile2;
        }
        if(tblCategoriesFile3)
        {
            strSQLCategoriesUpdateParams.file3 = tblCategoriesFile3;
        }
        if(tblCategoriesFile4)
        {
            strSQLCategoriesUpdateParams.file4 = tblCategoriesFile4;
        }
        if(tblCategoriesFile5)
        {
            strSQLCategoriesUpdateParams.file5 = tblCategoriesFile5;
        }

        strSQLCategoriesUpdateParams.activation = tblCategoriesActivation;
        strSQLCategoriesUpdateParams.activation1 = tblCategoriesActivation1;
        strSQLCategoriesUpdateParams.activation2 = tblCategoriesActivation2;
        strSQLCategoriesUpdateParams.activation3 = tblCategoriesActivation3;
        strSQLCategoriesUpdateParams.activation4 = tblCategoriesActivation4;
        strSQLCategoriesUpdateParams.activation5 = tblCategoriesActivation5;
        
        strSQLCategoriesUpdateParams.id_status = tblCategoriesIdStatus;
        strSQLCategoriesUpdateParams.restricted_access = tblCategoriesRestrictedAccess;

        strSQLCategoriesUpdateParams.notes = tblCategoriesNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLCategoriesUpdate = await new Promise((resolve, reject)=>{

            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLCategoriesUpdate, strSQLCategoriesUpdateParams, (dbSystemError, results) => {
                    dbSystemConPoolGetConnection.query(strSQLCategoriesUpdate, [strSQLCategoriesUpdateParams, tblCategoriesID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLCategoriesUpdate.affectedRows > 0)
        {
            //Variables - define values.
            //----------------------
            try
            {
                //Parameters build.
                arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableCategories + ";s");
                ofglRecordsParameters = {
                    _arrSearchParameters: arrFiltersGenericSearchParameters,
                    _configSortOrder: "title",
                    _strNRecords: "",
                    _objSpecialParameters: {returnType: 3}
                };
        
                //Object build.
                ofglRecords = new ObjectFiltersGenericListing(ofglRecordsParameters);
                await ofglRecords.recordsListingGet(0, 3);


                //Bindings search.
                objIdsCategoriesFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_record;" + tblCategoriesID + ";i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                            1, 
                                                                                            {returnType: 3});

                //Filter results acording to filter_index.
                if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
                {
                    resultsCategoriesFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 101;
                    });

                    /*objIdsCategoriesFiltersGeneric1Binding = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                        return obj.id_filter_index == 101;
                    });*/
                }
                if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
                {
                    resultsCategoriesFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
                {
                    resultsCategoriesFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric3 != 0)
                {
                    resultsCategoriesFiltersGeneric3Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 103;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric4 != 0)
                {
                    resultsCategoriesFiltersGeneric4Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 104;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric5 != 0)
                {
                    resultsCategoriesFiltersGeneric5Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 105;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric6 != 0)
                {
                    resultsCategoriesFiltersGeneric6Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 106;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric7 != 0)
                {
                    resultsCategoriesFiltersGeneric7Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 107;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric8 != 0)
                {
                    resultsCategoriesFiltersGeneric8Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 108;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric9 != 0)
                {
                    resultsCategoriesFiltersGeneric9Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 109;
                    });
                }
                if(gSystemConfig.enableCategoriesFilterGeneric10 != 0)
                {
                    resultsCategoriesFiltersGeneric10Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 110;
                    });
                }


                //Filters generic 1 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric1)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric1Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric1Listing[countArray].id.toString() && obj.id_filter_index == 101;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric1.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric1.includes(resultsCategoriesFiltersGeneric1Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric1Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 101,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 2 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric2)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric2Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric2Listing[countArray].id.toString() && obj.id_filter_index == 102;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric2.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric2.includes(resultsCategoriesFiltersGeneric2Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric2Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 102,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 3 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric3 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric3)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric3Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric3Listing[countArray].id.toString() && obj.id_filter_index == 103;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric3.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric3.includes(resultsCategoriesFiltersGeneric3Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric3Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 103,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 4 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric4 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric4)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric4Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric4Listing[countArray].id.toString() && obj.id_filter_index == 104;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric4.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric4.includes(resultsCategoriesFiltersGeneric4Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric4Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 104,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 5 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric5 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric5)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric5Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric5Listing[countArray].id.toString() && obj.id_filter_index == 105;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric5.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric5.includes(resultsCategoriesFiltersGeneric5Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric5Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 105,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 6 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric6 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric6)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric6Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric6Listing[countArray].id.toString() && obj.id_filter_index == 106;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric6.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric6.includes(resultsCategoriesFiltersGeneric6Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric6Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 106,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 7 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric7 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric7)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric7Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric7Listing[countArray].id.toString() && obj.id_filter_index == 107;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric7.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric7.includes(resultsCategoriesFiltersGeneric7Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric7Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 107,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 8 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric8 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric8)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric8Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric8Listing[countArray].id.toString() && obj.id_filter_index == 108;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric8.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric8.includes(resultsCategoriesFiltersGeneric8Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric8Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 108,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 9 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric9 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric9)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric9Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric9Listing[countArray].id.toString() && obj.id_filter_index == 109;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric9.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric9.includes(resultsCategoriesFiltersGeneric9Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric9Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 109,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 10 - update.
                if(gSystemConfig.enableCategoriesFilterGeneric10 != 0)
                {
                    if(arrIdsCategoriesFiltersGeneric10)
                    {

                        for(let countArray = 0; countArray < resultsCategoriesFiltersGeneric10Listing.length; countArray++)
                        {
                            //Variables.
                            let categoriesFiltersGenericCheck = null;
                            let flagCategoriesFiltersGenericInsert = true;

                            //Check records already selected.
                            categoriesFiltersGenericCheck = objIdsCategoriesFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsCategoriesFiltersGeneric10Listing[countArray].id.toString() && obj.id_filter_index == 110;
                            });
                            
                            //Update or delete existing bindings.
                            if(categoriesFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsCategoriesFiltersGeneric10.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagCategoriesFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsCategoriesFiltersGeneric10.includes(resultsCategoriesFiltersGeneric10Listing[countArray].id.toString()))
                            {
                                if(flagCategoriesFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsCategoriesFiltersGeneric10Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 110,
                                        _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

            }catch(aError){
                if(gSystemConfig.configDebug === true)
                {
                    console.log("aError=", aError);
                }
            }finally{
    
            }
            //----------------------
    

            strReturn = true;
        }
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let categoryUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.categoryUpdate_async({
                    _tblCategoriesID: tblCategoriesID,
                    _tblCategoriesIdParent: tblCategoriesIdParent,
                    _tblCategoriesSortOrder: tblCategoriesSortOrder,
                    _tblCategoriesCategoryType: tblCategoriesCategoryType,
                    _tblCategoriesDateCreation: "",
                    _tblCategoriesDateTimezone: "",
                    _tblCategoriesDateEdit: "",
                    _tblCategoriesIdRegisterUser: "0",
                    _tblCategoriesIdRegister1: "0",
                    _tblCategoriesIdRegister2: "0",
                    _tblCategoriesIdRegister3: "0",
                    _tblCategoriesIdRegister4: "0",
                    _tblCategoriesIdRegister5: "0",
                    _tblCategoriesTitle: tblCategoriesTitle,
                    _tblCategoriesDescription: tblCategoriesDescription,
                    _tblCategoriesURLAlias: tblCategoriesURLAlias,
                    _tblCategoriesKeywordsTags: tblCategoriesKeywordsTags,
                    _tblCategoriesMetaDescription: tblCategoriesMetaDescription,
                    _tblCategoriesMetaTitle: tblCategoriesMetaTitle,
                    _tblCategoriesMetaInfo: "",
                    _tblCategoriesInfo1: tblCategoriesInfo1,
                    _tblCategoriesInfo2: tblCategoriesInfo2,
                    _tblCategoriesInfo3: tblCategoriesInfo3,
                    _tblCategoriesInfo4: tblCategoriesInfo4,
                    _tblCategoriesInfo5: tblCategoriesInfo5,
                    _tblCategoriesInfo6: tblCategoriesInfo6,
                    _tblCategoriesInfo7: tblCategoriesInfo7,
                    _tblCategoriesInfo8: tblCategoriesInfo8,
                    _tblCategoriesInfo9: tblCategoriesInfo9,
                    _tblCategoriesInfo10: tblCategoriesInfo10,
                    _tblCategoriesInfoSmall1: tblCategoriesInfoSmall1,
                    _tblCategoriesInfoSmall2: tblCategoriesInfoSmall2,
                    _tblCategoriesInfoSmall3: tblCategoriesInfoSmall3,
                    _tblCategoriesInfoSmall4: tblCategoriesInfoSmall4,
                    _tblCategoriesInfoSmall5: tblCategoriesInfoSmall5,
                    _tblCategoriesNumber1: tblCategoriesNumber1,
                    _tblCategoriesNumber2: tblCategoriesNumber2,
                    _tblCategoriesNumber3: tblCategoriesNumber3,
                    _tblCategoriesNumber4: tblCategoriesNumber4,
                    _tblCategoriesNumber5: tblCategoriesNumber5,
                    _tblCategoriesNumberSmall1: tblCategoriesNumberSmall1,
                    _tblCategoriesNumberSmall2: tblCategoriesNumberSmall2,
                    _tblCategoriesNumberSmall3: tblCategoriesNumberSmall3,
                    _tblCategoriesNumberSmall4: tblCategoriesNumberSmall4,
                    _tblCategoriesNumberSmall5: tblCategoriesNumberSmall5,
                    _tblCategoriesDate1: tblCategoriesDate1,
                    _tblCategoriesDate2: tblCategoriesDate2,
                    _tblCategoriesDate3: tblCategoriesDate3,
                    _tblCategoriesDate4: tblCategoriesDate4,
                    _tblCategoriesDate5: tblCategoriesDate5,
                    _tblCategoriesIdItem1: "",
                    _tblCategoriesIdItem2: "",
                    _tblCategoriesIdItem3: "",
                    _tblCategoriesIdItem4: "",
                    _tblCategoriesIdItem5: "",
                    _tblCategoriesImageMain: tblCategoriesImageMain,
                    _tblCategoriesFile1: tblCategoriesImageFile1,
                    _tblCategoriesFile2: tblCategoriesImageFile2,
                    _tblCategoriesFile3: tblCategoriesImageFile3,
                    _tblCategoriesFile4: tblCategoriesImageFile4,
                    _tblCategoriesFile5: tblCategoriesImageFile5,
                    _tblCategoriesActivation: tblCategoriesActivation,
                    _tblCategoriesActivation1: tblCategoriesActivation1,
                    _tblCategoriesActivation2: tblCategoriesActivation2,
                    _tblCategoriesActivation3: tblCategoriesActivation3,
                    _tblCategoriesActivation4: tblCategoriesActivation4,
                    _tblCategoriesActivation5: tblCategoriesActivation5,
                    _tblCategoriesIdStatus: tblCategoriesIdStatus,
                    _tblCategoriesRestrictedAccess: tblCategoriesRestrictedAccess,
                    _tblCategoriesNotes: tblCategoriesNotes,
                    _arrIdsCategoriesFiltersGeneric1: arrIdsCategoriesFiltersGeneric1,
                    _arrIdsCategoriesFiltersGeneric2: arrIdsCategoriesFiltersGeneric2,
                    _arrIdsCategoriesFiltersGeneric3: arrIdsCategoriesFiltersGeneric3,
                    _arrIdsCategoriesFiltersGeneric4: arrIdsCategoriesFiltersGeneric4,
                    _arrIdsCategoriesFiltersGeneric5: arrIdsCategoriesFiltersGeneric5,
                    _arrIdsCategoriesFiltersGeneric6: arrIdsCategoriesFiltersGeneric6,
                    _arrIdsCategoriesFiltersGeneric7: arrIdsCategoriesFiltersGeneric7,
                    _arrIdsCategoriesFiltersGeneric8: arrIdsCategoriesFiltersGeneric8,
                    _arrIdsCategoriesFiltersGeneric9: arrIdsCategoriesFiltersGeneric9,
                    _arrIdsCategoriesFiltersGeneric10: arrIdsCategoriesFiltersGeneric10
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


    //File - update record.
    //**************************************************************************************
    /**
     * File - update record.
     * @static
     * @async
     * @param {object} _tblFilesDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async fileUpdate_async(_tblFilesDataObject)
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
        
        let strSQLFilesUpdate = "";
        let strSQLFilesUpdateParams = {};
        let resultsSQLFilesUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {

            //Debug.
            //console.log("ofglRecords=", ofglRecords);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblFilesDataObject = _tblFilesDataObject;
        tblFilesID = tblFilesDataObject._tblFilesID;

        tblFilesIdParent = (tblFilesDataObject.hasOwnProperty("_tblFilesIdParent") === true) ? tblFilesDataObject._tblFilesIdParent : tblFilesIdParent;
        tblFilesSortOrder = (tblFilesDataObject.hasOwnProperty("_tblFilesSortOrder") === true) ? tblFilesDataObject._tblFilesSortOrder : tblFilesSortOrder;
        if(!tblFilesSortOrder)
        {
            tblFilesSortOrder = 0;
        }

        tblFilesFileType = tblFilesDataObject._tblFilesFileType;
        tblFilesFileConfig = tblFilesDataObject._tblFilesFileConfig;

        /*
        tblFilesDateCreation = (tblFilesDataObject.hasOwnProperty("_tblFilesDateCreation") === true) ? tblFilesDataObject._tblFilesDateCreation : tblFilesDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFilesDateCreation)
        {
            let tblFilesDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFilesDateCreation = FunctionsGeneric.dateSQLWrite(tblFilesDateCreation_dateObj);
        }
        */

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
        strSQLFilesUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFiles + " ";
        strSQLFilesUpdate += "SET ? ";
        strSQLFilesUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLFilesUpdateParams.id = tblFilesID;
        strSQLFilesUpdateParams.id_parent = tblFilesIdParent;
        strSQLFilesUpdateParams.sort_order = tblFilesSortOrder;
        strSQLFilesUpdateParams.file_type = tblFilesFileType;
        strSQLFilesUpdateParams.file_config = tblFilesFileConfig;

        //strSQLFilesUpdateParams.date_creation = tblFilesDateCreation;
        strSQLFilesUpdateParams.date_timezone = tblFilesDateTimezone;
        strSQLFilesUpdateParams.date_edit = tblFilesDateEdit;

        strSQLFilesUpdateParams.title = tblFilesTitle;
        strSQLFilesUpdateParams.caption = tblFilesCaption;
        strSQLFilesUpdateParams.description = tblFilesDescription;
        strSQLFilesUpdateParams.html_code = tblFilesHTMLCode;

        strSQLFilesUpdateParams.url_alias = tblFilesURLAlias;
        strSQLFilesUpdateParams.keywords_tags = tblFilesKeywordsTags;
        strSQLFilesUpdateParams.meta_description = tblFilesMetaDescription;
        strSQLFilesUpdateParams.meta_title = tblFilesMetaTitle;
        strSQLFilesUpdateParams.meta_info = tblFilesMetaInfo;

        strSQLFilesUpdateParams.info1 = tblFilesInfo1;
        strSQLFilesUpdateParams.info2 = tblFilesInfo2;
        strSQLFilesUpdateParams.info3 = tblFilesInfo3;
        strSQLFilesUpdateParams.info4 = tblFilesInfo4;
        strSQLFilesUpdateParams.info5 = tblFilesInfo5;

        strSQLFilesUpdateParams.info_small1 = tblFilesInfoSmall1;
        strSQLFilesUpdateParams.info_small2 = tblFilesInfoSmall2;
        strSQLFilesUpdateParams.info_small3 = tblFilesInfoSmall3;
        strSQLFilesUpdateParams.info_small4 = tblFilesInfoSmall4;
        strSQLFilesUpdateParams.info_small5 = tblFilesInfoSmall5;

        strSQLFilesUpdateParams.number1 = tblFilesNumber1;
        strSQLFilesUpdateParams.number2 = tblFilesNumber2;
        strSQLFilesUpdateParams.number3 = tblFilesNumber3;
        strSQLFilesUpdateParams.number4 = tblFilesNumber4;
        strSQLFilesUpdateParams.number5 = tblFilesNumber5;

        strSQLFilesUpdateParams.number_small1 = tblFilesNumberSmall1;
        strSQLFilesUpdateParams.number_small2 = tblFilesNumberSmall2;
        strSQLFilesUpdateParams.number_small3 = tblFilesNumberSmall3;
        strSQLFilesUpdateParams.number_small4 = tblFilesNumberSmall4;
        strSQLFilesUpdateParams.number_small5 = tblFilesNumberSmall5;

        strSQLFilesUpdateParams.date1 = tblFilesDate1;
        strSQLFilesUpdateParams.date2 = tblFilesDate2;
        strSQLFilesUpdateParams.date3 = tblFilesDate3;
        strSQLFilesUpdateParams.date4 = tblFilesDate4;
        strSQLFilesUpdateParams.date5 = tblFilesDate5;
        
        if(tblFilesFile)
        {
            strSQLFilesUpdateParams.file = tblFilesFile;
            strSQLFilesUpdateParams.file_size = tblFilesFileSize;
            strSQLFilesUpdateParams.file_duration = tblFilesFileDuration;
            strSQLFilesUpdateParams.file_dimensions = tblFilesFileDimensions;
            strSQLFilesUpdateParams.file_original_name = tblFilesFileOriginalName;
        }

        if(tblFilesFileThumbnail)
        {
        strSQLFilesUpdateParams.file_thumbnail = tblFilesFileThumbnail;
        }

        if(tblFilesFile1)
        {
            strSQLFilesUpdateParams.file1 = tblFilesFile1;
        }
        if(tblFilesFile2)
        {
            strSQLFilesUpdateParams.file2 = tblFilesFile2;
        }
        if(tblFilesFile3)
        {
            strSQLFilesUpdateParams.file3 = tblFilesFile3;
        }
        if(tblFilesFile4)
        {
            strSQLFilesUpdateParams.file4 = tblFilesFile4;
        }
        if(tblFilesFile5)
        {
            strSQLFilesUpdateParams.file5 = tblFilesFile5;
        }

        strSQLFilesUpdateParams.activation = tblFilesActivation;
        strSQLFilesUpdateParams.activation1 = tblFilesActivation1;
        strSQLFilesUpdateParams.activation2 = tblFilesActivation2;
        strSQLFilesUpdateParams.activation3 = tblFilesActivation3;
        strSQLFilesUpdateParams.activation4 = tblFilesActivation4;
        strSQLFilesUpdateParams.activation5 = tblFilesActivation5;

        strSQLFilesUpdateParams.notes = tblFilesNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFilesUpdate = await new Promise((resolve, reject)=>{
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    dbSystemConPoolGetConnection.query(strSQLFilesUpdate, [strSQLFilesUpdateParams, tblFilesID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    //console.log("fileUpdate_async=true");
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLFilesUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //Debug.
        //console.log("resultsSQLFilesUpdate=", resultsSQLFilesUpdate);
        //console.log("tblFilesID=", tblFilesID);
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let fileUpdateResult = await new Promise((resolve, reject)=>{
            SyncSystemNS.FunctionsDBUpdate.fileUpdate_async({
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
                _tblFilesFileThumbnail: tblFilesFileThumbnail,
                _tblFilesFileSize: tblFilesFileSize,
                _tblFilesFileDuration: tblFilesFileDuration,
                _tblFilesFileDimensions: tblFilesFileDimensions,
                _tblFilesFileOriginalName: tblFilesFileOriginalName,
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
                        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8"));
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
    

    //Content - update record.
    //**************************************************************************************
    /**
     * Content - update record.
     * @static
     * @async
     * @param {object} _tblContentDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async contentUpdate_async(_tblContentDataObject)
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
        
        let strSQLContentUpdate = "";
        let strSQLContentUpdateParams = {};
        let resultsSQLContentUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {

            //Debug.
            //console.log("ofglRecords=", ofglRecords);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblContentDataObject = _tblContentDataObject;

        tblContentID = tblContentDataObject._tblContentID;
        tblContentIdParent = (tblContentDataObject.hasOwnProperty("_tblContentIdParent") === true) ? tblContentDataObject._tblContentIdParent : tblContentIdParent;
        tblContentSortOrder = (tblContentDataObject.hasOwnProperty("_tblContentSortOrder") === true) ? tblContentDataObject._tblContentSortOrder : tblContentSortOrder;
        if(!tblContentSortOrder)
        {
            tblContentSortOrder = 0;
        }

        /*
        tblContentDateCreation = (tblContentDataObject.hasOwnProperty("_tblContentDateCreation") === true) ? tblContentDataObject._tblContentDateCreation : tblContentDateCreation; //x = condition ? true : false (default value declared)
        if(!tblContentDateCreation)
        {
            let tblContentDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblContentDateCreation = FunctionsGeneric.dateSQLWrite(tblContentDateCreation_dateObj);
        }
        */

        tblContentDateTimezone = (tblContentDataObject.hasOwnProperty("_tblContentDateTimezone") === true) ? tblContentDataObject._tblContentDateTimezone : tblContentDateTimezone;
            
        tblContentDateEdit = (tblContentDataObject.hasOwnProperty("_tblContentDateEdit") === true) ? tblContentDataObject._tblContentDateEdit : tblContentDateEdit;
        if(!tblContentDateEdit)
        {
            let tblContentDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblContentDateEdit = FunctionsGeneric.dateSQLWrite(tblContentDateEdit_dateObj);
        }

        tblContentIdRegisterUser = tblContentDataObject._tblContentIdRegisterUser;
        tblContentContentType = tblContentDataObject._tblContentContentType;
        //tblContentContentColumns = tblContentDataObject._tblContentContentColumns;
        tblContentContentColumns = (tblContentDataObject.hasOwnProperty("_tblContentContentColumns") === true && (tblContentDataObject._tblContentContentColumns) && tblContentDataObject._tblContentContentColumns !== "undefined") ? tblContentDataObject._tblContentContentColumns : tblContentContentColumns;

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
        strSQLContentUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableContent + " ";
        strSQLContentUpdate += "SET ? ";
        strSQLContentUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLContentUpdateParams.id = tblContentID;
        strSQLContentUpdateParams.id_parent = tblContentIdParent;
        strSQLContentUpdateParams.sort_order = tblContentSortOrder;

        //strSQLContentUpdateParams.date_creation = tblContentDateCreation;
        strSQLContentUpdateParams.date_timezone = tblContentDateTimezone;
        strSQLContentUpdateParams.date_edit = tblContentDateEdit;

        strSQLContentUpdateParams.id_register_user = tblContentIdRegisterUser;
        strSQLContentUpdateParams.content_type = tblContentContentType;
        strSQLContentUpdateParams.content_columns = tblContentContentColumns;

        strSQLContentUpdateParams.align_text = tblContentAlignText;
        strSQLContentUpdateParams.align_image = tblContentAlignImage;

        strSQLContentUpdateParams.content_text = tblContentContentText;
        strSQLContentUpdateParams.content_url = tblContentContentURL;
        strSQLContentUpdateParams.caption = tblContentCaption;

        if(tblContentFile != "")
        {
            strSQLContentUpdateParams.file = tblContentFile;
            strSQLContentUpdateParams.file_size = tblContentFileSize;
            strSQLContentUpdateParams.file_duration = tblContentFileDuration;
            strSQLContentUpdateParams.file_dimensions = tblContentFileDimensions;
            strSQLContentUpdateParams.file_original_name = tblContentFileOriginalName;
            strSQLContentUpdateParams.file_config = tblContentFileConfig;
        }

        if(tblContentFileThumbnail != "")
        {
            strSQLContentUpdateParams.file_thumbnail = tblContentFileThumbnail;
        }
        
        strSQLContentUpdateParams.activation = tblContentActivation;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLContentUpdate = await new Promise((resolve, reject)=>{
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    dbSystemConPoolGetConnection.query(strSQLContentUpdate, [strSQLContentUpdateParams, tblContentID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    //console.log("fileUpdate_async=true");
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLContentUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //Debug.
        //console.log("resultsSQLContentUpdate=", resultsSQLContentUpdate);
        //console.log("tblContentID=", tblContentID);
        //console.log("strSQLContentUpdateParams=", strSQLContentUpdateParams);
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
            let fileUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.fileUpdate_async({
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
                            console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8"));
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


    //Products - update record.
    //**************************************************************************************
    /**
     * Products - update record.
     * @static
     * @async
     * @param {object} _tblProductsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async productsUpdate_async(_tblProductsDataObject)
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

        let arrFiltersGenericSearchParameters = [];
        let ofglRecords = "";
        let ofglRecordsParameters = {};

        let resultsProductsFiltersGeneric1Listing;
        let resultsProductsFiltersGeneric2Listing;
        let resultsProductsFiltersGeneric3Listing;
        let resultsProductsFiltersGeneric4Listing;
        let resultsProductsFiltersGeneric5Listing;
        let resultsProductsFiltersGeneric6Listing;
        let resultsProductsFiltersGeneric7Listing;
        let resultsProductsFiltersGeneric8Listing;
        let resultsProductsFiltersGeneric9Listing;
        let resultsProductsFiltersGeneric10Listing;
        let resultsProductsFiltersGeneric11Listing;
        let resultsProductsFiltersGeneric12Listing;
        let resultsProductsFiltersGeneric13Listing;
        let resultsProductsFiltersGeneric14Listing;
        let resultsProductsFiltersGeneric15Listing;
        let resultsProductsFiltersGeneric16Listing;
        let resultsProductsFiltersGeneric17Listing;
        let resultsProductsFiltersGeneric18Listing;
        let resultsProductsFiltersGeneric19Listing;
        let resultsProductsFiltersGeneric20Listing;
        let resultsProductsFiltersGeneric21Listing;
        let resultsProductsFiltersGeneric22Listing;
        let resultsProductsFiltersGeneric23Listing;
        let resultsProductsFiltersGeneric24Listing;
        let resultsProductsFiltersGeneric25Listing;
        let resultsProductsFiltersGeneric26Listing;
        let resultsProductsFiltersGeneric27Listing;
        let resultsProductsFiltersGeneric28Listing;
        let resultsProductsFiltersGeneric29Listing;
        let resultsProductsFiltersGeneric30Listing;

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

        let objIdsProductsFiltersGenericBinding;

        let strSQLProductsUpdate = "";
        let strSQLProductsUpdateParams = {};
        let resultsSQLProductsUpdate = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblProductsDataObject = _tblProductsDataObject;
        tblProductsID = tblProductsDataObject._tblProductsID;

        tblProductsIdParent = (tblProductsDataObject.hasOwnProperty("_tblProductsIdParent") === true) ? tblProductsDataObject._tblProductsIdParent : tblProductsIdParent;

        //tblProductsSortOrder = tblProductsDataObject._tblProductsSortOrder;
        tblProductsSortOrder = (tblProductsDataObject.hasOwnProperty("_tblProductsSortOrder") === true) ? tblProductsDataObject._tblProductsSortOrder : tblProductsSortOrder;
        if(!tblProductsSortOrder)
        {
            tblProductsSortOrder = 0;
        }

        //tblProductsIdType = tblProductsDataObject._tblProductsIdType;
        tblProductsIdType = (tblProductsDataObject.hasOwnProperty("_tblProductsIdType") === true && (tblProductsDataObject._tblProductsIdType)) ? tblProductsDataObject._tblProductsIdType : tblProductsIdType;

        /*tblProductsDateCreation = (tblProductsDataObject.hasOwnProperty("_tblProductsDateCreation") === true) ? tblProductsDataObject._tblProductsDateCreation : tblProductsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblProductsDateCreation)
        {
            let tblProductsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblProductsDateCreation = FunctionsGeneric.dateSQLWrite(tblProductsDateCreation_dateObj);
        }*/

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


        //Query.
        //----------------------
        //strSQLCategoriesUpdate += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLProductsUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableProducts + " ";
        strSQLProductsUpdate += "SET ? ";
        strSQLProductsUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLProductsUpdateParams.id = tblProductsID;
        strSQLProductsUpdateParams.id_parent = tblProductsIdParent;
        strSQLProductsUpdateParams.sort_order = tblProductsSortOrder;
        strSQLProductsUpdateParams.id_type = tblProductsIdType;

        //strSQLProductsUpdateParams.date_creation = tblProductsDateCreation;
        //strSQLProductsUpdateParams.date_timezone = tblProductsDateTimezone;
        strSQLProductsUpdateParams.date_edit = tblProductsDateEdit;

        strSQLProductsUpdateParams.id_register_user = tblProductsIdRegisterUser;
        strSQLProductsUpdateParams.id_register1 = tblProductsIdRegister1;
        strSQLProductsUpdateParams.id_register2 = tblProductsIdRegister2;
        strSQLProductsUpdateParams.id_register3 = tblProductsIdRegister3;
        strSQLProductsUpdateParams.id_register4 = tblProductsIdRegister4;
        strSQLProductsUpdateParams.id_register5 = tblProductsIdRegister5;

        strSQLProductsUpdateParams.code = tblProductsCode;
        strSQLProductsUpdateParams.title = tblProductsTitle;
        strSQLProductsUpdateParams.description = tblProductsDescription;

        strSQLProductsUpdateParams.url_alias = tblProductsURLAlias;
        strSQLProductsUpdateParams.keywords_tags = tblProductsKeywordsTags;
        strSQLProductsUpdateParams.meta_description = tblProductsMetaDescription;
        strSQLProductsUpdateParams.meta_title = tblProductsMetaTitle;
        strSQLProductsUpdateParams.meta_info = tblProductsMetaInfo;

        strSQLProductsUpdateParams.info1 = tblProductsInfo1;
        strSQLProductsUpdateParams.info2 = tblProductsInfo2;
        strSQLProductsUpdateParams.info3 = tblProductsInfo3;
        strSQLProductsUpdateParams.info4 = tblProductsInfo4;
        strSQLProductsUpdateParams.info5 = tblProductsInfo5;
        strSQLProductsUpdateParams.info6 = tblProductsInfo6;
        strSQLProductsUpdateParams.info7 = tblProductsInfo7;
        strSQLProductsUpdateParams.info8 = tblProductsInfo8;
        strSQLProductsUpdateParams.info9 = tblProductsInfo9;
        strSQLProductsUpdateParams.info10 = tblProductsInfo10;
        strSQLProductsUpdateParams.info11 = tblProductsInfo11;
        strSQLProductsUpdateParams.info12 = tblProductsInfo12;
        strSQLProductsUpdateParams.info13 = tblProductsInfo13;
        strSQLProductsUpdateParams.info14 = tblProductsInfo14;
        strSQLProductsUpdateParams.info15 = tblProductsInfo15;
        strSQLProductsUpdateParams.info16 = tblProductsInfo16;
        strSQLProductsUpdateParams.info17 = tblProductsInfo17;
        strSQLProductsUpdateParams.info18 = tblProductsInfo18;
        strSQLProductsUpdateParams.info19 = tblProductsInfo19;
        strSQLProductsUpdateParams.info20 = tblProductsInfo20;

        strSQLProductsUpdateParams.info_small1 = tblProductsInfoSmall1;
        strSQLProductsUpdateParams.info_small2 = tblProductsInfoSmall2;
        strSQLProductsUpdateParams.info_small3 = tblProductsInfoSmall3;
        strSQLProductsUpdateParams.info_small4 = tblProductsInfoSmall4;
        strSQLProductsUpdateParams.info_small5 = tblProductsInfoSmall5;
        strSQLProductsUpdateParams.info_small6 = tblProductsInfoSmall6;
        strSQLProductsUpdateParams.info_small7 = tblProductsInfoSmall7;
        strSQLProductsUpdateParams.info_small8 = tblProductsInfoSmall8;
        strSQLProductsUpdateParams.info_small9 = tblProductsInfoSmall9;
        strSQLProductsUpdateParams.info_small10 = tblProductsInfoSmall10;
        strSQLProductsUpdateParams.info_small11 = tblProductsInfoSmall11;
        strSQLProductsUpdateParams.info_small12 = tblProductsInfoSmall12;
        strSQLProductsUpdateParams.info_small13 = tblProductsInfoSmall13;
        strSQLProductsUpdateParams.info_small14 = tblProductsInfoSmall14;
        strSQLProductsUpdateParams.info_small15 = tblProductsInfoSmall15;
        strSQLProductsUpdateParams.info_small16 = tblProductsInfoSmall16;
        strSQLProductsUpdateParams.info_small17 = tblProductsInfoSmall17;
        strSQLProductsUpdateParams.info_small18 = tblProductsInfoSmall18;
        strSQLProductsUpdateParams.info_small19 = tblProductsInfoSmall19;
        strSQLProductsUpdateParams.info_small20 = tblProductsInfoSmall20;
        strSQLProductsUpdateParams.info_small21 = tblProductsInfoSmall21;
        strSQLProductsUpdateParams.info_small22 = tblProductsInfoSmall22;
        strSQLProductsUpdateParams.info_small23 = tblProductsInfoSmall23;
        strSQLProductsUpdateParams.info_small24 = tblProductsInfoSmall24;
        strSQLProductsUpdateParams.info_small25 = tblProductsInfoSmall25;
        strSQLProductsUpdateParams.info_small26 = tblProductsInfoSmall26;
        strSQLProductsUpdateParams.info_small27 = tblProductsInfoSmall27;
        strSQLProductsUpdateParams.info_small28 = tblProductsInfoSmall28;
        strSQLProductsUpdateParams.info_small29 = tblProductsInfoSmall29;
        strSQLProductsUpdateParams.info_small30 = tblProductsInfoSmall30;

        strSQLProductsUpdateParams.value = tblProductsValue;
        strSQLProductsUpdateParams.value1 = tblProductsValue1;
        strSQLProductsUpdateParams.value2 = tblProductsValue2;
        strSQLProductsUpdateParams.weight = tblProductsWeight;
        strSQLProductsUpdateParams.coefficient = tblProductsCoefficient;

        strSQLProductsUpdateParams.number1 = tblProductsNumber1;
        strSQLProductsUpdateParams.number2 = tblProductsNumber2;
        strSQLProductsUpdateParams.number3 = tblProductsNumber3;
        strSQLProductsUpdateParams.number4 = tblProductsNumber4;
        strSQLProductsUpdateParams.number5 = tblProductsNumber5;

        strSQLProductsUpdateParams.number_small1 = tblProductsNumberSmall1;
        strSQLProductsUpdateParams.number_small2 = tblProductsNumberSmall2;
        strSQLProductsUpdateParams.number_small3 = tblProductsNumberSmall3;
        strSQLProductsUpdateParams.number_small4 = tblProductsNumberSmall4;
        strSQLProductsUpdateParams.number_small5 = tblProductsNumberSmall5;

        strSQLProductsUpdateParams.url1 = tblProductsURL1;
        strSQLProductsUpdateParams.url2 = tblProductsURL2;
        strSQLProductsUpdateParams.url3 = tblProductsURL3;
        strSQLProductsUpdateParams.url4 = tblProductsURL4;
        strSQLProductsUpdateParams.url5 = tblProductsURL5;

        strSQLProductsUpdateParams.date1 = tblProductsDate1;
        strSQLProductsUpdateParams.date2 = tblProductsDate2;
        strSQLProductsUpdateParams.date3 = tblProductsDate3;
        strSQLProductsUpdateParams.date4 = tblProductsDate4;
        strSQLProductsUpdateParams.date5 = tblProductsDate5;
        
        strSQLProductsUpdateParams.id_item1 = tblProductsIdItem1;
        strSQLProductsUpdateParams.id_item2 = tblProductsIdItem2;
        strSQLProductsUpdateParams.id_item3 = tblProductsIdItem3;
        strSQLProductsUpdateParams.id_item4 = tblProductsIdItem4;
        strSQLProductsUpdateParams.id_item5 = tblProductsIdItem5;
        
        if(tblProductsImageMain)
        {
            strSQLProductsUpdateParams.image_main = tblProductsImageMain;
        }

        strSQLProductsUpdateParams.image_main_caption = tblProductsImageMainCaption;

        if(tblProductsFile1)
        {
            strSQLProductsUpdateParams.file1 = tblProductsFile1;
        }
        if(tblProductsFile2)
        {
            strSQLProductsUpdateParams.file2 = tblProductsFile2;
        }
        if(tblProductsFile3)
        {
            strSQLProductsUpdateParams.file3 = tblProductsFile3;
        }
        if(tblProductsFile4)
        {
            strSQLProductsUpdateParams.file4 = tblProductsFile4;
        }
        if(tblProductsFile5)
        {
            strSQLProductsUpdateParams.file5 = tblProductsFile5;
        }

        strSQLProductsUpdateParams.activation = tblProductsActivation;
        strSQLProductsUpdateParams.activation1 = tblProductsActivation1;
        strSQLProductsUpdateParams.activation2 = tblProductsActivation2;
        strSQLProductsUpdateParams.activation3 = tblProductsActivation3;
        strSQLProductsUpdateParams.activation4 = tblProductsActivation4;
        strSQLProductsUpdateParams.activation5 = tblProductsActivation5;
        
        strSQLProductsUpdateParams.id_status = tblProductsIdStatus;
        strSQLProductsUpdateParams.restricted_access = tblProductsRestrictedAccess;

        strSQLProductsUpdateParams.notes = tblProductsNotes;
        //----------------------


        //Execute query.
        //----------------------
        try
        {
            resultsSQLProductsUpdate = await new Promise((resolve, reject)=>{
                dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                    if(dbSystemPoolError)
                    {
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                        }
                        throw dbSystemPoolError;
                    }else{

                        //dbSystemCon.query(strSQLProductsUpdate, strSQLProductsUpdateParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.query(strSQLProductsUpdate, [strSQLProductsUpdateParams, tblProductsID], (dbSystemError, results) => {
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
                                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    }

                                    //Return promise.
                                    resolve(results);
                                }else{
                                    //Error.
                                    //reject(false);
                                    reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Return data treatment.
        //----------------------
        if(resultsSQLProductsUpdate.affectedRows > 0)
        {
            //Variables - define values.
            //----------------------
            try
            {
                //Parameters build.
                arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableProducts + ";s");
                ofglRecordsParameters = {
                    _arrSearchParameters: arrFiltersGenericSearchParameters,
                    _configSortOrder: "title",
                    _strNRecords: "",
                    _objSpecialParameters: {returnType: 3}
                };
        
                //Object build.
                ofglRecords = new ObjectFiltersGenericListing(ofglRecordsParameters);
                await ofglRecords.recordsListingGet(0, 3);


                //Bindings search.
                objIdsProductsFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                        ["id_record;" + tblProductsID + ";i"], 
                                                                                        "", 
                                                                                        "", 
                                                                                        FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                        1, 
                                                                                        {returnType: 3});

                //Filter results acording to filter_index.
                if(gSystemConfig.enableProductsFilterGeneric1 != 0)
                {
                    resultsProductsFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 101;
                    });

                    /*objIdsProductsFiltersGeneric1Binding = objIdsProductsFiltersGenericBinding.filter(function(obj){
                        return obj.id_filter_index == 101;
                    });*/
                }
                if(gSystemConfig.enableProductsFilterGeneric2 != 0)
                {
                    resultsProductsFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric2 != 0)
                {
                    resultsProductsFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric3 != 0)
                {
                    resultsProductsFiltersGeneric3Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 103;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric4 != 0)
                {
                    resultsProductsFiltersGeneric4Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 104;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric5 != 0)
                {
                    resultsProductsFiltersGeneric5Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 105;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric6 != 0)
                {
                    resultsProductsFiltersGeneric6Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 106;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric7 != 0)
                {
                    resultsProductsFiltersGeneric7Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 107;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric8 != 0)
                {
                    resultsProductsFiltersGeneric8Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 108;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric9 != 0)
                {
                    resultsProductsFiltersGeneric9Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 109;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric10 != 0)
                {
                    resultsProductsFiltersGeneric10Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 110;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric11 != 0)
                {
                    resultsProductsFiltersGeneric11Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 111;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric12 != 0)
                {
                    resultsProductsFiltersGeneric12Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 112;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric13 != 0)
                {
                    resultsProductsFiltersGeneric13Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 113;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric14 != 0)
                {
                    resultsProductsFiltersGeneric14Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 114;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric15 != 0)
                {
                    resultsProductsFiltersGeneric15Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 115;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric16 != 0)
                {
                    resultsProductsFiltersGeneric16Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 116;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric17 != 0)
                {
                    resultsProductsFiltersGeneric17Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 117;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric18 != 0)
                {
                    resultsProductsFiltersGeneric18Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 118;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric19 != 0)
                {
                    resultsProductsFiltersGeneric19Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 119;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric20 != 0)
                {
                    resultsProductsFiltersGeneric20Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 120;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric21 != 0)
                {
                    resultsProductsFiltersGeneric21Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 121;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric22 != 0)
                {
                    resultsProductsFiltersGeneric22Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 122;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric23 != 0)
                {
                    resultsProductsFiltersGeneric23Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 123;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric24 != 0)
                {
                    resultsProductsFiltersGeneric24Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 124;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric25 != 0)
                {
                    resultsProductsFiltersGeneric25Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 125;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric26 != 0)
                {
                    resultsProductsFiltersGeneric26Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 126;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric27 != 0)
                {
                    resultsProductsFiltersGeneric27Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 127;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric28 != 0)
                {
                    resultsProductsFiltersGeneric28Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 128;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric29 != 0)
                {
                    resultsProductsFiltersGeneric29Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 129;
                    });
                }
                if(gSystemConfig.enableProductsFilterGeneric30 != 0)
                {
                    resultsProductsFiltersGeneric30Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 130;
                    });
                }


                //Debug.
                //console.log("ofglRecords=", ofglRecords);
            }catch(aError){
                if(gSystemConfig.configDebug === true)
                {
                    console.log("Error try/catch block (Products Filters Generic)");
                    console.log("aError=", aError);
                }
            }finally{

            }
            //----------------------



            //(async function(){
                //Filters generic 1 - update.
                if(gSystemConfig.enableProductsFilterGeneric1 != 0)
                {
                    if(arrIdsProductsFiltersGeneric1)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric1Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            /*productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_filters_generic;" + resultsProductsFiltersGeneric1Listing[countArray].id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;101;i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            "id, id_filters_generic",
                                                                                            1);*/

                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                //return obj.id_filters_generic == resultsProductsFiltersGeneric1Listing[countArray].id.toString() ;
                                return obj.id_filters_generic == resultsProductsFiltersGeneric1Listing[countArray].id.toString() && obj.id_filter_index == 101;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            //if(objIdsProductsFiltersGeneric1Binding.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric1.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                //if(arrIdsProductsFiltersGeneric1.includes(objIdsProductsFiltersGeneric1Binding[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    //await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ objIdsProductsFiltersGeneric1Binding[0].id + ";i"]);
                                }

                                //Debug.
                                //console.log("status=full");
                                //console.log("productsFiltersGenericCheck=", productsFiltersGenericCheck);
                                //console.log("productsFiltersGenericCheck[0].id=", productsFiltersGenericCheck[0].id);
                                //console.log("includes=", arrIdsProductsFiltersGeneric1.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()));
                            }else{

                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric1.includes(resultsProductsFiltersGeneric1Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric1Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 101,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }


                            //Debug.
                            //let tblFiltersGenericBindingIDAwait = await FunctionsDB.counterUniversalUpdate_async(1);
                            
                            //console.log("resultsProductsFiltersGeneric1Listing[].id=", resultsProductsFiltersGeneric1Listing[countArray].id);
                            //console.log("tblFiltersGenericBindingIDAwait=", tblFiltersGenericBindingIDAwait);
                            //console.log("flagProductsFiltersGenericInsert=", flagProductsFiltersGenericInsert);
                            //console.log("objIdsProductsFiltersGeneric1Binding=", objIdsProductsFiltersGeneric1Binding);
                            //console.log("objIdsProductsFiltersGenericBinding=", objIdsProductsFiltersGenericBinding);
                            //console.log("productsFiltersGenericCheck=", productsFiltersGenericCheck);
                            
                        }

                        //Debug.
                        //console.log("resultsProductsFiltersGeneric1Listing=", resultsProductsFiltersGeneric1Listing);
                    }
                }


                //Filters generic 2 - update.
                /*
                if(gSystemConfig.enableProductsFilterGeneric2 != 0)
                {
                    if(arrIdsProductsFiltersGeneric2)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric2Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_filters_generic;" + resultsProductsFiltersGeneric2Listing[countArray].id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;102;i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            "id, id_filters_generic",
                                                                                            1);
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric2.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }

                                //Debug.
                                //console.log("status=full");
                                //console.log("productsFiltersGenericCheck=", productsFiltersGenericCheck);
                                //console.log("productsFiltersGenericCheck[0].id=", productsFiltersGenericCheck[0].id);
                                //console.log("includes=", arrIdsProductsFiltersGeneric1.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()));
                            }else{

                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric2.includes(resultsProductsFiltersGeneric1Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric2Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 102,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }


                            //Debug.
                            //let tblFiltersGenericBindingIDAwait = await FunctionsDB.counterUniversalUpdate_async(1);
                            
                            //console.log("resultsProductsFiltersGeneric1Listing[].id=", resultsProductsFiltersGeneric1Listing[countArray].id);
                            //console.log("tblFiltersGenericBindingIDAwait=", tblFiltersGenericBindingIDAwait);
                            console.log("flagProductsFiltersGenericInsert=", flagProductsFiltersGenericInsert);
                        }

                        //Debug.
                        //console.log("resultsProductsFiltersGeneric1Listing=", resultsProductsFiltersGeneric1Listing);
                    }
                }
                */
                //Filters generic 2 - update.
                if(gSystemConfig.enableProductsFilterGeneric2 != 0)
                {
                    if(arrIdsProductsFiltersGeneric2)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric2Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric2Listing[countArray].id.toString() && obj.id_filter_index == 102;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric2.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric2.includes(resultsProductsFiltersGeneric2Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric2Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 102,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 3 - update.
                if(gSystemConfig.enableProductsFilterGeneric3 != 0)
                {
                    if(arrIdsProductsFiltersGeneric3)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric3Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric3Listing[countArray].id.toString() && obj.id_filter_index == 103;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric3.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric3.includes(resultsProductsFiltersGeneric3Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric3Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 103,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 4 - update.
                if(gSystemConfig.enableProductsFilterGeneric4 != 0)
                {
                    if(arrIdsProductsFiltersGeneric4)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric4Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric4Listing[countArray].id.toString() && obj.id_filter_index == 104;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric4.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric4.includes(resultsProductsFiltersGeneric4Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric4Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 104,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 5 - update.
                if(gSystemConfig.enableProductsFilterGeneric5 != 0)
                {
                    if(arrIdsProductsFiltersGeneric5)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric5Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric5Listing[countArray].id.toString() && obj.id_filter_index == 105;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric5.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric5.includes(resultsProductsFiltersGeneric5Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric5Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 105,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 6 - update.
                if(gSystemConfig.enableProductsFilterGeneric6 != 0)
                {
                    if(arrIdsProductsFiltersGeneric6)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric6Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric6Listing[countArray].id.toString() && obj.id_filter_index == 106;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric6.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric6.includes(resultsProductsFiltersGeneric6Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric6Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 106,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 7 - update.
                if(gSystemConfig.enableProductsFilterGeneric7 != 0)
                {
                    if(arrIdsProductsFiltersGeneric7)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric7Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric7Listing[countArray].id.toString() && obj.id_filter_index == 107;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric7.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric7.includes(resultsProductsFiltersGeneric7Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric7Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 107,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 8 - update.
                if(gSystemConfig.enableProductsFilterGeneric8 != 0)
                {
                    if(arrIdsProductsFiltersGeneric8)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric8Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric8Listing[countArray].id.toString() && obj.id_filter_index == 108;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric8.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric8.includes(resultsProductsFiltersGeneric8Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric8Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 108,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 9 - update.
                if(gSystemConfig.enableProductsFilterGeneric9 != 0)
                {
                    if(arrIdsProductsFiltersGeneric9)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric9Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric9Listing[countArray].id.toString() && obj.id_filter_index == 109;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric9.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric9.includes(resultsProductsFiltersGeneric9Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric9Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 109,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 10 - update.
                if(gSystemConfig.enableProductsFilterGeneric10 != 0)
                {
                    if(arrIdsProductsFiltersGeneric10)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric10Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric10Listing[countArray].id.toString() && obj.id_filter_index == 110;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric10.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric10.includes(resultsProductsFiltersGeneric10Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric10Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 110,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 11 - update.
                if(gSystemConfig.enableProductsFilterGeneric11 != 0)
                {
                    if(arrIdsProductsFiltersGeneric11)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric11Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric11Listing[countArray].id.toString() && obj.id_filter_index == 111;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric11.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric11.includes(resultsProductsFiltersGeneric11Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric11Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 111,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 12 - update.
                if(gSystemConfig.enableProductsFilterGeneric12 != 0)
                {
                    if(arrIdsProductsFiltersGeneric12)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric12Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric12Listing[countArray].id.toString() && obj.id_filter_index == 112;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric12.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric12.includes(resultsProductsFiltersGeneric12Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric12Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 112,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 13 - update.
                if(gSystemConfig.enableProductsFilterGeneric13 != 0)
                {
                    if(arrIdsProductsFiltersGeneric13)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric13Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric13Listing[countArray].id.toString() && obj.id_filter_index == 113;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric13.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric13.includes(resultsProductsFiltersGeneric13Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric13Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 113,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 14 - update.
                if(gSystemConfig.enableProductsFilterGeneric14 != 0)
                {
                    if(arrIdsProductsFiltersGeneric14)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric14Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric14Listing[countArray].id.toString() && obj.id_filter_index == 114;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric14.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric14.includes(resultsProductsFiltersGeneric14Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric14Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 114,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 15 - update.
                if(gSystemConfig.enableProductsFilterGeneric15 != 0)
                {
                    if(arrIdsProductsFiltersGeneric15)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric15Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric15Listing[countArray].id.toString() && obj.id_filter_index == 115;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric15.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric15.includes(resultsProductsFiltersGeneric15Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric15Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 115,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 16 - update.
                if(gSystemConfig.enableProductsFilterGeneric16 != 0)
                {
                    if(arrIdsProductsFiltersGeneric16)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric16Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric16Listing[countArray].id.toString() && obj.id_filter_index == 116;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric16.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric16.includes(resultsProductsFiltersGeneric16Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric16Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 116,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 17 - update.
                if(gSystemConfig.enableProductsFilterGeneric17 != 0)
                {
                    if(arrIdsProductsFiltersGeneric17)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric17Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric17Listing[countArray].id.toString() && obj.id_filter_index == 117;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric17.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric17.includes(resultsProductsFiltersGeneric17Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric17Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 117,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 18 - update.
                if(gSystemConfig.enableProductsFilterGeneric18 != 0)
                {
                    if(arrIdsProductsFiltersGeneric18)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric18Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric18Listing[countArray].id.toString() && obj.id_filter_index == 118;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric18.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric18.includes(resultsProductsFiltersGeneric18Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric18Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 118,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 19 - update.
                if(gSystemConfig.enableProductsFilterGeneric19 != 0)
                {
                    if(arrIdsProductsFiltersGeneric19)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric19Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric19Listing[countArray].id.toString() && obj.id_filter_index == 119;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric19.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric19.includes(resultsProductsFiltersGeneric19Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric19Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 119,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 20 - update.
                if(gSystemConfig.enableProductsFilterGeneric20 != 0)
                {
                    if(arrIdsProductsFiltersGeneric20)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric20Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric20Listing[countArray].id.toString() && obj.id_filter_index == 120;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric20.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric20.includes(resultsProductsFiltersGeneric20Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric20Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 120,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 21 - update.
                if(gSystemConfig.enableProductsFilterGeneric21 != 0)
                {
                    if(arrIdsProductsFiltersGeneric21)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric21Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric21Listing[countArray].id.toString() && obj.id_filter_index == 121;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric21.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric21.includes(resultsProductsFiltersGeneric21Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric21Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 121,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 22 - update.
                if(gSystemConfig.enableProductsFilterGeneric22 != 0)
                {
                    if(arrIdsProductsFiltersGeneric22)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric22Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric22Listing[countArray].id.toString() && obj.id_filter_index == 122;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric22.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric22.includes(resultsProductsFiltersGeneric22Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric22Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 122,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 23 - update.
                if(gSystemConfig.enableProductsFilterGeneric23 != 0)
                {
                    if(arrIdsProductsFiltersGeneric23)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric23Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric23Listing[countArray].id.toString() && obj.id_filter_index == 123;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric23.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric23.includes(resultsProductsFiltersGeneric23Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric23Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 123,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 24 - update.
                if(gSystemConfig.enableProductsFilterGeneric24 != 0)
                {
                    if(arrIdsProductsFiltersGeneric24)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric24Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric24Listing[countArray].id.toString() && obj.id_filter_index == 124;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric24.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric24.includes(resultsProductsFiltersGeneric24Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric24Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 124,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 25 - update.
                if(gSystemConfig.enableProductsFilterGeneric25 != 0)
                {
                    if(arrIdsProductsFiltersGeneric25)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric25Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric25Listing[countArray].id.toString() && obj.id_filter_index == 125;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric25.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric25.includes(resultsProductsFiltersGeneric25Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric25Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 125,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 26 - update.
                if(gSystemConfig.enableProductsFilterGeneric26 != 0)
                {
                    if(arrIdsProductsFiltersGeneric26)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric26Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric26Listing[countArray].id.toString() && obj.id_filter_index == 126;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric26.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric26.includes(resultsProductsFiltersGeneric26Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric26Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 126,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 27 - update.
                if(gSystemConfig.enableProductsFilterGeneric27 != 0)
                {
                    if(arrIdsProductsFiltersGeneric27)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric27Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric27Listing[countArray].id.toString() && obj.id_filter_index == 127;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric27.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric27.includes(resultsProductsFiltersGeneric27Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric27Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 127,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 28 - update.
                if(gSystemConfig.enableProductsFilterGeneric28 != 0)
                {
                    if(arrIdsProductsFiltersGeneric28)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric28Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric28Listing[countArray].id.toString() && obj.id_filter_index == 128;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric28.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric28.includes(resultsProductsFiltersGeneric28Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric28Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 128,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 29 - update.
                if(gSystemConfig.enableProductsFilterGeneric29 != 0)
                {
                    if(arrIdsProductsFiltersGeneric29)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric29Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric29Listing[countArray].id.toString() && obj.id_filter_index == 129;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric29.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric29.includes(resultsProductsFiltersGeneric29Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric29Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 129,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 30 - update.
                if(gSystemConfig.enableProductsFilterGeneric30 != 0)
                {
                    if(arrIdsProductsFiltersGeneric30)
                    {

                        for(let countArray = 0; countArray < resultsProductsFiltersGeneric30Listing.length; countArray++)
                        {
                            //Variables.
                            let productsFiltersGenericCheck = null;
                            let flagProductsFiltersGenericInsert = true;

                            //Check records already selected.
                            productsFiltersGenericCheck = objIdsProductsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsProductsFiltersGeneric30Listing[countArray].id.toString() && obj.id_filter_index == 130;
                            });
                            
                            //Update or delete existing bindings.
                            if(productsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsProductsFiltersGeneric30.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagProductsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsProductsFiltersGeneric30.includes(resultsProductsFiltersGeneric30Listing[countArray].id.toString()))
                            {
                                if(flagProductsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsProductsFiltersGeneric30Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 130,
                                        _tblFiltersGenericBindingIdRecord: tblProductsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }


            //})();


            strReturn = true;
        }
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let productsUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.productsUpdate_async({
                    _tblProductsID: tblProductsID,
                    _tblProductsIdParent: tblProductsIdParent,
                    _tblProductsSortOrder: tblProductsSortOrder,
                    _tblProductsIdType: tblProductsIdType,
                    _tblProductsDateCreation: "",
                    //_tblProductsDateTimezone: "",
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
    

    //Publications - update record.
    //**************************************************************************************
    /**
     * Publications - update record.
     * @static
     * @async
     * @param {object} _tblPublicationsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async publicationsUpdate_async(_tblPublicationsDataObject)
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
        //let tblPublicationsDateTimezone = "";
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

        let arrFiltersGenericSearchParameters = [];
        let ofglRecords = "";
        let ofglRecordsParameters = {};

        let resultsPublicationsFiltersGeneric1Listing;
        let resultsPublicationsFiltersGeneric2Listing;
        let resultsPublicationsFiltersGeneric3Listing;
        let resultsPublicationsFiltersGeneric4Listing;
        let resultsPublicationsFiltersGeneric5Listing;
        let resultsPublicationsFiltersGeneric6Listing;
        let resultsPublicationsFiltersGeneric7Listing;
        let resultsPublicationsFiltersGeneric8Listing;
        let resultsPublicationsFiltersGeneric9Listing;
        let resultsPublicationsFiltersGeneric10Listing;

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

        let objIdsPublicationsFiltersGenericBinding;

        let strSQLPublicationsUpdate = "";
        let strSQLPublicationsUpdateParams = {};
        let resultsSQLPublicationsUpdate = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblPublicationsDataObject = _tblPublicationsDataObject;
        tblPublicationsID = tblPublicationsDataObject._tblPublicationsID;

        tblPublicationsIdParent = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsIdParent") === true) ? tblPublicationsDataObject._tblPublicationsIdParent : tblPublicationsIdParent;

        //tblPublicationsSortOrder = tblPublicationsDataObject._tblPublicationsSortOrder;
        tblPublicationsSortOrder = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsSortOrder") === true) ? tblPublicationsDataObject._tblPublicationsSortOrder : tblPublicationsSortOrder;
        if(!tblPublicationsSortOrder)
        {
            tblPublicationsSortOrder = 0;
        }

        tblPublicationsIdType = tblPublicationsDataObject._tblPublicationsIdType;

        /*tblPublicationsDateCreation = (tblPublicationsDataObject.hasOwnProperty("_tblPublicationsDateCreation") === true) ? tblPublicationsDataObject._tblPublicationsDateCreation : tblPublicationsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblPublicationsDateCreation)
        {
            let tblPublicationsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblPublicationsDateCreation = FunctionsGeneric.dateSQLWrite(tblPublicationsDateCreation_dateObj);
        }*/

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


        //Query.
        //----------------------
        //strSQLCategoriesUpdate += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLPublicationsUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTablePublications + " ";
        strSQLPublicationsUpdate += "SET ? ";
        strSQLPublicationsUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLPublicationsUpdateParams.id = tblPublicationsID;

        //strSQLPublicationsUpdateParams.id = tblPublicationsID;
        strSQLPublicationsUpdateParams.id_parent = tblPublicationsIdParent;
        strSQLPublicationsUpdateParams.sort_order = tblPublicationsSortOrder;
        strSQLPublicationsUpdateParams.id_type = tblPublicationsIdType;

        //strSQLPublicationsUpdateParams.date_creation = tblPublicationsDateCreation;
        //strSQLPublicationsUpdateParams.date_timezone = tblPublicationsDateTimezone;
        strSQLPublicationsUpdateParams.date_edit = tblPublicationsDateEdit;

        strSQLPublicationsUpdateParams.id_register_user = tblPublicationsIdRegisterUser;
        strSQLPublicationsUpdateParams.id_register1 = tblPublicationsIdRegister1;
        strSQLPublicationsUpdateParams.id_register2 = tblPublicationsIdRegister2;
        strSQLPublicationsUpdateParams.id_register3 = tblPublicationsIdRegister3;
        strSQLPublicationsUpdateParams.id_register4 = tblPublicationsIdRegister4;
        strSQLPublicationsUpdateParams.id_register5 = tblPublicationsIdRegister5;

        strSQLPublicationsUpdateParams.date_start = tblPublicationsDateStart;
        strSQLPublicationsUpdateParams.date_end = tblPublicationsDateEnd;

        strSQLPublicationsUpdateParams.title = tblPublicationsTitle;
        strSQLPublicationsUpdateParams.description = tblPublicationsDescription;

        strSQLPublicationsUpdateParams.url_alias = tblPublicationsURLAlias;
        strSQLPublicationsUpdateParams.keywords_tags = tblPublicationsKeywordsTags;
        strSQLPublicationsUpdateParams.meta_description = tblPublicationsMetaDescription;
        strSQLPublicationsUpdateParams.meta_title = tblPublicationsMetaTitle;
        strSQLPublicationsUpdateParams.meta_info = tblPublicationsMetaInfo;

        strSQLPublicationsUpdateParams.info1 = tblPublicationsInfo1;
        strSQLPublicationsUpdateParams.info2 = tblPublicationsInfo2;
        strSQLPublicationsUpdateParams.info3 = tblPublicationsInfo3;
        strSQLPublicationsUpdateParams.info4 = tblPublicationsInfo4;
        strSQLPublicationsUpdateParams.info5 = tblPublicationsInfo5;
        strSQLPublicationsUpdateParams.info6 = tblPublicationsInfo6;
        strSQLPublicationsUpdateParams.info7 = tblPublicationsInfo7;
        strSQLPublicationsUpdateParams.info8 = tblPublicationsInfo8;
        strSQLPublicationsUpdateParams.info9 = tblPublicationsInfo9;
        strSQLPublicationsUpdateParams.info10 = tblPublicationsInfo10;

        strSQLPublicationsUpdateParams.source = tblPublicationsSource;
        strSQLPublicationsUpdateParams.source_url = tblPublicationsSourceURL;
        
        strSQLPublicationsUpdateParams.number1 = tblPublicationsNumber1;
        strSQLPublicationsUpdateParams.number2 = tblPublicationsNumber2;
        strSQLPublicationsUpdateParams.number3 = tblPublicationsNumber3;
        strSQLPublicationsUpdateParams.number4 = tblPublicationsNumber4;
        strSQLPublicationsUpdateParams.number5 = tblPublicationsNumber5;

        strSQLPublicationsUpdateParams.url1 = tblPublicationsURL1;
        strSQLPublicationsUpdateParams.url2 = tblPublicationsURL2;
        strSQLPublicationsUpdateParams.url3 = tblPublicationsURL3;
        strSQLPublicationsUpdateParams.url4 = tblPublicationsURL4;
        strSQLPublicationsUpdateParams.url5 = tblPublicationsURL5;

        strSQLPublicationsUpdateParams.date1 = tblPublicationsDate1;
        strSQLPublicationsUpdateParams.date2 = tblPublicationsDate2;
        strSQLPublicationsUpdateParams.date3 = tblPublicationsDate3;
        strSQLPublicationsUpdateParams.date4 = tblPublicationsDate4;
        strSQLPublicationsUpdateParams.date5 = tblPublicationsDate5;
        
        if(tblPublicationsImageMain)
        {
            strSQLPublicationsUpdateParams.image_main = tblPublicationsImageMain;
        }

        strSQLPublicationsUpdateParams.image_main_caption = tblPublicationsImageMainCaption;

        if(tblPublicationsFile1)
        {
            strSQLPublicationsUpdateParams.file1 = tblPublicationsFile1;
        }
        if(tblPublicationsFile2)
        {
            strSQLPublicationsUpdateParams.file2 = tblPublicationsFile2;
        }
        if(tblPublicationsFile3)
        {
            strSQLPublicationsUpdateParams.file3 = tblPublicationsFile3;
        }
        if(tblPublicationsFile4)
        {
            strSQLPublicationsUpdateParams.file4 = tblPublicationsFile4;
        }
        if(tblPublicationsFile5)
        {
            strSQLPublicationsUpdateParams.file5 = tblPublicationsFile5;
        }

        strSQLPublicationsUpdateParams.activation = tblPublicationsActivation;
        strSQLPublicationsUpdateParams.activation1 = tblPublicationsActivation1;
        strSQLPublicationsUpdateParams.activation2 = tblPublicationsActivation2;
        strSQLPublicationsUpdateParams.activation3 = tblPublicationsActivation3;
        strSQLPublicationsUpdateParams.activation4 = tblPublicationsActivation4;
        strSQLPublicationsUpdateParams.activation5 = tblPublicationsActivation5;
        
        strSQLPublicationsUpdateParams.id_status = tblPublicationsIdStatus;
        strSQLPublicationsUpdateParams.restricted_access = tblPublicationsRestrictedAccess;

        strSQLPublicationsUpdateParams.notes = tblPublicationsNotes;
        //----------------------


        //Execute query.
        //----------------------
        try
        {
            resultsSQLPublicationsUpdate = await new Promise((resolve, reject)=>{
                dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                    if(dbSystemPoolError)
                    {
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                        }
                        throw dbSystemPoolError;
                    }else{

                        //dbSystemCon.query(strSQLPublicationsUpdate, strSQLPublicationsUpdateParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.query(strSQLPublicationsUpdate, [strSQLPublicationsUpdateParams, tblPublicationsID], (dbSystemError, results) => {
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
                                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    }

                                    //Return promise.
                                    resolve(results);
                                }else{
                                    //Error.
                                    //reject(false);
                                    reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Return data treatment.
        //----------------------
        if(resultsSQLPublicationsUpdate.affectedRows > 0)
        {
            //Variables - define values.
            //----------------------
            try
            {
                //Parameters build.
                arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTablePublications + ";s");
                ofglRecordsParameters = {
                    _arrSearchParameters: arrFiltersGenericSearchParameters,
                    _configSortOrder: "title",
                    _strNRecords: "",
                    _objSpecialParameters: {returnType: 3}
                };
        
                //Object build.
                ofglRecords = new ObjectFiltersGenericListing(ofglRecordsParameters);
                await ofglRecords.recordsListingGet(0, 3);


                //Bindings search.
                objIdsPublicationsFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_record;" + tblPublicationsID + ";i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                            1, 
                                                                                            {returnType: 3});

                //Filter results acording to filter_index.
                if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
                {
                    resultsPublicationsFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 101;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
                {
                    resultsPublicationsFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
                {
                    resultsPublicationsFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric3 != 0)
                {
                    resultsPublicationsFiltersGeneric3Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 103;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric4 != 0)
                {
                    resultsPublicationsFiltersGeneric4Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 104;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric5 != 0)
                {
                    resultsPublicationsFiltersGeneric5Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 105;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric6 != 0)
                {
                    resultsPublicationsFiltersGeneric6Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 106;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric7 != 0)
                {
                    resultsPublicationsFiltersGeneric7Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 107;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric8 != 0)
                {
                    resultsPublicationsFiltersGeneric8Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 108;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric9 != 0)
                {
                    resultsPublicationsFiltersGeneric9Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 109;
                    });
                }
                if(gSystemConfig.enablePublicationsFilterGeneric10 != 0)
                {
                    resultsPublicationsFiltersGeneric10Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 110;
                    });
                }


                //Debug.
                //console.log("ofglRecords=", ofglRecords);
            }catch(aError){
                if(gSystemConfig.configDebug === true)
                {
                    console.log("Error try/catch block (Publications Filters Generic)");
                    console.log("aError=", aError);
                }
            }finally{

            }
            //----------------------


            //(async function(){
                //Filters generic 1 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric1)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric1Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric1Listing[countArray].id.toString() && obj.id_filter_index == 101;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric1.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }

                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric1.includes(resultsPublicationsFiltersGeneric1Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric1Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 101,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 2 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric2)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric2Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric2Listing[countArray].id.toString() && obj.id_filter_index == 102;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric2.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric2.includes(resultsPublicationsFiltersGeneric2Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric2Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 102,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 3 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric3 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric3)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric3Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric3Listing[countArray].id.toString() && obj.id_filter_index == 103;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric3.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric3.includes(resultsPublicationsFiltersGeneric3Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric3Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 103,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 4 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric4 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric4)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric4Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric4Listing[countArray].id.toString() && obj.id_filter_index == 104;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric4.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric4.includes(resultsPublicationsFiltersGeneric4Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric4Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 104,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 5 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric5 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric5)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric5Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric5Listing[countArray].id.toString() && obj.id_filter_index == 105;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric5.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric5.includes(resultsPublicationsFiltersGeneric5Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric5Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 105,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 6 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric6 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric6)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric6Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric6Listing[countArray].id.toString() && obj.id_filter_index == 106;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric6.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric6.includes(resultsPublicationsFiltersGeneric6Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric6Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 106,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 7 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric7 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric7)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric7Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric7Listing[countArray].id.toString() && obj.id_filter_index == 107;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric7.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric7.includes(resultsPublicationsFiltersGeneric7Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric7Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 107,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 8 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric8 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric8)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric8Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric8Listing[countArray].id.toString() && obj.id_filter_index == 108;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric8.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric8.includes(resultsPublicationsFiltersGeneric8Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric8Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 108,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 9 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric9 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric9)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric9Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric9Listing[countArray].id.toString() && obj.id_filter_index == 109;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric9.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric9.includes(resultsPublicationsFiltersGeneric9Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric9Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 109,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 10 - update.
                if(gSystemConfig.enablePublicationsFilterGeneric10 != 0)
                {
                    if(arrIdsPublicationsFiltersGeneric10)
                    {

                        for(let countArray = 0; countArray < resultsPublicationsFiltersGeneric10Listing.length; countArray++)
                        {
                            //Variables.
                            let publicationsFiltersGenericCheck = null;
                            let flagPublicationsFiltersGenericInsert = true;

                            //Check records already selected.
                            publicationsFiltersGenericCheck = objIdsPublicationsFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsPublicationsFiltersGeneric10Listing[countArray].id.toString() && obj.id_filter_index == 110;
                            });
                            
                            //Update or delete existing bindings.
                            if(publicationsFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsPublicationsFiltersGeneric10.includes(publicationsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagPublicationsFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ publicationsFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsPublicationsFiltersGeneric10.includes(resultsPublicationsFiltersGeneric10Listing[countArray].id.toString()))
                            {
                                if(flagPublicationsFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsPublicationsFiltersGeneric10Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 110,
                                        _tblFiltersGenericBindingIdRecord: tblPublicationsID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
            //})();


            strReturn = true;
        }
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let publicationsUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.publicationsUpdate_async({
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


    //Registers - update record.
    //**************************************************************************************
    /**
     * Registers - update record.
     * @static
     * @async
     * @param {object} _tblRegistersDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async registersUpdate_async(_tblRegistersDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblRegistersDataObject = {};

        //Details - default values.
        let tblRegistersID = "";
        let tblRegistersIdParent = "";
        let tblRegistersSortOrder = 0;

        let tblRegistersDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDateTimezone = "";
        let tblRegistersDateEdit = "";

        let tblRegistersIdType = 0; 
        let tblRegistersIdActivity = 0; 

        let tblRegistersIdRegisterUser = 0;
        let tblRegistersIdRegister1 = 0;
        let tblRegistersIdRegister2 = 0;
        let tblRegistersIdRegister3 = 0;
        let tblRegistersIdRegister4 = 0;
        let tblRegistersIdRegister5 = 0;

        let tblRegistersType = 0;

        let tblRegistersNameTitle = "";
        let tblRegistersNameFull = "";
        let tblRegistersNameFirst = "";
        let tblRegistersNameLast = "";
    
        let tblRegistersCompanyNameLegal = "";
        let tblRegistersCompanyNameAlias = "";
    
        let tblRegistersDescription = "";
    
        let tblRegistersURLAlias = "";
        let tblRegistersKeywordsTags = "";
        let tblRegistersMetaDescription = "";
        let tblRegistersMetaTitle = "";
        let tblRegistersMetaInfo = "";

        let tblRegistersDateBirth = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersGender = 0; 
        let tblRegistersHeight = 0; 
        let tblRegistersWeight = 0; 

        let tblRegistersDocumentType = 0;
        let tblRegistersDocument = "";
        let tblRegistersDocument1Type = 0;
        let tblRegistersDocument1 = "";
        let tblRegistersDocument2Type = 0;
        let tblRegistersDocument2 = "";
    
        let tblRegistersDocumentCompanyType = 0;
        let tblRegistersDocumentCompany1 = "";
        let tblRegistersDocumentCompany1Type = 0;
        let tblRegistersDocumentCompany2 = "";
        let tblRegistersDocumentCompany2Type = 0;
        let tblRegistersDocumentCompany = "";
    
        let tblRegistersZipCode = "";
        let tblRegistersAddressStreet = "";
        let tblRegistersAddressNumber = "";
        let tblRegistersAddressComplement = "";
        let tblRegistersNeighborhood = "";
        let tblRegistersDistrict = "";
        let tblRegistersCounty = "";
        let tblRegistersCity = "";
        let tblRegistersState = "";
        let tblRegistersCountry = "";
    
        let tblRegistersIdStreet = 0;
        let tblRegistersIdNeighborhood = 0;
        let tblRegistersIdDistrict = 0;
        let tblRegistersIdCounty = 0;
        let tblRegistersIdCity = 0;
        let tblRegistersIdState = 0;
        let tblRegistersIdCountry = 0;   
        
        let tblRegistersLocationReference = "";
        let tblRegistersLocationMap = "";
    
        let tblRegistersPhone1InternationalCode = "";
        let tblRegistersPhone1AreaCode = "";
        let tblRegistersPhone1 = "";
    
        let tblRegistersPhone2InternationalCode = "";
        let tblRegistersPhone2AreaCode = "";
        let tblRegistersPhone2 = "";
    
        let tblRegistersPhone3InternationalCode = "";
        let tblRegistersPhone3AreaCode = "";
        let tblRegistersPhone3 = "";
    
        let tblRegistersWebsite = "";
    
        let tblRegistersUsername = "";
        let tblRegistersEmail = "";
        let tblRegistersPassword = "";
        let tblRegistersPasswordHint = "";
        let tblRegistersPasswordLength = "";
                
        let tblRegistersInfo1 = "";
        let tblRegistersInfo2 = "";
        let tblRegistersInfo3 = "";
        let tblRegistersInfo4 = "";
        let tblRegistersInfo5 = "";
        let tblRegistersInfo6 = "";
        let tblRegistersInfo7 = "";
        let tblRegistersInfo8 = "";
        let tblRegistersInfo9 = "";
        let tblRegistersInfo10 = "";
        let tblRegistersInfo11 = "";
        let tblRegistersInfo12 = "";
        let tblRegistersInfo13 = "";
        let tblRegistersInfo14 = "";
        let tblRegistersInfo15 = "";
        let tblRegistersInfo16 = "";
        let tblRegistersInfo17 = "";
        let tblRegistersInfo18 = "";
        let tblRegistersInfo19 = "";
        let tblRegistersInfo20 = "";
    
        let tblRegistersInfoSmall1 = "";
        let tblRegistersInfoSmall2 = "";
        let tblRegistersInfoSmall3 = "";
        let tblRegistersInfoSmall4 = "";
        let tblRegistersInfoSmall5 = "";
        let tblRegistersInfoSmall6 = "";
        let tblRegistersInfoSmall7 = "";
        let tblRegistersInfoSmall8 = "";
        let tblRegistersInfoSmall9 = "";
        let tblRegistersInfoSmall10 = "";
        let tblRegistersInfoSmall11 = "";
        let tblRegistersInfoSmall12 = "";
        let tblRegistersInfoSmall13 = "";
        let tblRegistersInfoSmall14 = "";
        let tblRegistersInfoSmall15 = "";
        let tblRegistersInfoSmall16 = "";
        let tblRegistersInfoSmall17 = "";
        let tblRegistersInfoSmall18 = "";
        let tblRegistersInfoSmall19 = "";
        let tblRegistersInfoSmall20 = "";
        let tblRegistersInfoSmall21 = "";
        let tblRegistersInfoSmall22 = "";
        let tblRegistersInfoSmall23 = "";
        let tblRegistersInfoSmall24 = "";
        let tblRegistersInfoSmall25 = "";
        let tblRegistersInfoSmall26 = "";
        let tblRegistersInfoSmall27 = "";
        let tblRegistersInfoSmall28 = "";
        let tblRegistersInfoSmall29 = "";
        let tblRegistersInfoSmall30 = "";

        let tblRegistersNumber1 = 0;
        let tblRegistersNumber2 = 0;
        let tblRegistersNumber3 = 0;
        let tblRegistersNumber4 = 0;
        let tblRegistersNumber5 = 0;

        let tblRegistersNumberSmall1 = 0;
        let tblRegistersNumberSmall2 = 0;
        let tblRegistersNumberSmall3 = 0;
        let tblRegistersNumberSmall4 = 0;
        let tblRegistersNumberSmall5 = 0;

        let tblRegistersURL1 = "";
        let tblRegistersURL2 = "";
        let tblRegistersURL3 = "";
        let tblRegistersURL4 = "";
        let tblRegistersURL5 = "";
            
        let tblRegistersDate1 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate2 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate3 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate4 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate5 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate6 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate7 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate8 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate9 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        let tblRegistersDate10 = null; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd

        let tblRegistersImageMain = "";
        let tblRegistersImageMainCaption = "";
        let tblRegistersImageLogo = "";
        let tblRegistersImageBanner = "";

        let tblRegistersFile1 = "";
        let tblRegistersFile2 = "";
        let tblRegistersFile3 = "";
        let tblRegistersFile4 = "";
        let tblRegistersFile5 = "";

        let tblRegistersActivation = 1;
        let tblRegistersActivation1 = 0;
        let tblRegistersActivation2 = 0;
        let tblRegistersActivation3 = 0;
        let tblRegistersActivation4 = 0;
        let tblRegistersActivation5 = 0;
        
        let tblRegistersIdStatus = 0;
        let tblRegistersRestrictedAccess = 0;
        let tblRegistersNotes = "";

        let arrFiltersGenericSearchParameters = [];
        let ofglRecords = "";
        let ofglRecordsParameters = {};

        let resultsRegistersFiltersGeneric1Listing;
        let resultsRegistersFiltersGeneric2Listing;
        let resultsRegistersFiltersGeneric3Listing;
        let resultsRegistersFiltersGeneric4Listing;
        let resultsRegistersFiltersGeneric5Listing;
        let resultsRegistersFiltersGeneric6Listing;
        let resultsRegistersFiltersGeneric7Listing;
        let resultsRegistersFiltersGeneric8Listing;
        let resultsRegistersFiltersGeneric9Listing;
        let resultsRegistersFiltersGeneric10Listing;
        let resultsRegistersFiltersGeneric11Listing;
        let resultsRegistersFiltersGeneric12Listing;
        let resultsRegistersFiltersGeneric13Listing;
        let resultsRegistersFiltersGeneric14Listing;
        let resultsRegistersFiltersGeneric15Listing;
        let resultsRegistersFiltersGeneric16Listing;
        let resultsRegistersFiltersGeneric17Listing;
        let resultsRegistersFiltersGeneric18Listing;
        let resultsRegistersFiltersGeneric19Listing;
        let resultsRegistersFiltersGeneric20Listing;
        let resultsRegistersFiltersGeneric21Listing;
        let resultsRegistersFiltersGeneric22Listing;
        let resultsRegistersFiltersGeneric23Listing;
        let resultsRegistersFiltersGeneric24Listing;
        let resultsRegistersFiltersGeneric25Listing;
        let resultsRegistersFiltersGeneric26Listing;
        let resultsRegistersFiltersGeneric27Listing;
        let resultsRegistersFiltersGeneric28Listing;
        let resultsRegistersFiltersGeneric29Listing;
        let resultsRegistersFiltersGeneric30Listing;
        let resultsRegistersFiltersGeneric31Listing;
        let resultsRegistersFiltersGeneric32Listing;
        let resultsRegistersFiltersGeneric33Listing;
        let resultsRegistersFiltersGeneric34Listing;
        let resultsRegistersFiltersGeneric35Listing;
        let resultsRegistersFiltersGeneric36Listing;
        let resultsRegistersFiltersGeneric37Listing;
        let resultsRegistersFiltersGeneric38Listing;
        let resultsRegistersFiltersGeneric39Listing;
        let resultsRegistersFiltersGeneric40Listing;

        let arrIdsRegistersFiltersGeneric1 = [];
        let arrIdsRegistersFiltersGeneric2 = [];
        let arrIdsRegistersFiltersGeneric3 = [];
        let arrIdsRegistersFiltersGeneric4 = [];
        let arrIdsRegistersFiltersGeneric5 = [];
        let arrIdsRegistersFiltersGeneric6 = [];
        let arrIdsRegistersFiltersGeneric7 = [];
        let arrIdsRegistersFiltersGeneric8 = [];
        let arrIdsRegistersFiltersGeneric9 = [];
        let arrIdsRegistersFiltersGeneric10 = [];
        let arrIdsRegistersFiltersGeneric11 = [];
        let arrIdsRegistersFiltersGeneric12 = [];
        let arrIdsRegistersFiltersGeneric13 = [];
        let arrIdsRegistersFiltersGeneric14 = [];
        let arrIdsRegistersFiltersGeneric15 = [];
        let arrIdsRegistersFiltersGeneric16 = [];
        let arrIdsRegistersFiltersGeneric17 = [];
        let arrIdsRegistersFiltersGeneric18 = [];
        let arrIdsRegistersFiltersGeneric19 = [];
        let arrIdsRegistersFiltersGeneric20 = [];
        let arrIdsRegistersFiltersGeneric21 = [];
        let arrIdsRegistersFiltersGeneric22 = [];
        let arrIdsRegistersFiltersGeneric23 = [];
        let arrIdsRegistersFiltersGeneric24 = [];
        let arrIdsRegistersFiltersGeneric25 = [];
        let arrIdsRegistersFiltersGeneric26 = [];
        let arrIdsRegistersFiltersGeneric27 = [];
        let arrIdsRegistersFiltersGeneric28 = [];
        let arrIdsRegistersFiltersGeneric29 = [];
        let arrIdsRegistersFiltersGeneric30 = [];
        let arrIdsRegistersFiltersGeneric31 = [];
        let arrIdsRegistersFiltersGeneric32 = [];
        let arrIdsRegistersFiltersGeneric33 = [];
        let arrIdsRegistersFiltersGeneric34 = [];
        let arrIdsRegistersFiltersGeneric35 = [];
        let arrIdsRegistersFiltersGeneric36 = [];
        let arrIdsRegistersFiltersGeneric37 = [];
        let arrIdsRegistersFiltersGeneric38 = [];
        let arrIdsRegistersFiltersGeneric39 = [];
        let arrIdsRegistersFiltersGeneric40 = [];

        let objIdsRegistersFiltersGenericBinding;

        let strSQLRegistersUpdate = "";
        let strSQLRegistersUpdateParams = {};
        let resultsSQLRegistersUpdate = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblRegistersDataObject = _tblRegistersDataObject;
        tblRegistersID = tblRegistersDataObject._tblRegistersID;

        tblRegistersIdParent = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdParent") === true) ? tblRegistersDataObject._tblRegistersIdParent : tblRegistersIdParent;

        //tblRegistersSortOrder = tblRegistersDataObject._tblRegistersSortOrder;
        tblRegistersSortOrder = (tblRegistersDataObject.hasOwnProperty("_tblRegistersSortOrder") === true) ? tblRegistersDataObject._tblRegistersSortOrder : tblRegistersSortOrder;
        if(!tblRegistersSortOrder)
        {
            tblRegistersSortOrder = 0;
        }

        /*tblRegistersDateCreation = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDateCreation") === true) ? tblRegistersDataObject._tblRegistersDateCreation : tblRegistersDateCreation; //x = condition ? true : false (default value declared)
        if(!tblRegistersDateCreation)
        {
            let tblRegistersDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblRegistersDateCreation = FunctionsGeneric.dateSQLWrite(tblRegistersDateCreation_dateObj);
        }*/

        tblRegistersDateTimezone = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDateTimezone") === true) ? tblRegistersDataObject._tblRegistersDateTimezone : tblRegistersDateTimezone;
        
        tblRegistersDateEdit = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDateEdit") === true) ? tblRegistersDataObject._tblRegistersDateEdit : tblRegistersDateEdit;
        if(!tblRegistersDateEdit)
        {
            let tblRegistersDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblRegistersDateEdit = FunctionsGeneric.dateSQLWrite(tblRegistersDateEdit_dateObj);
        }

        tblRegistersIdType = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdType") === true && (tblRegistersDataObject._tblRegistersIdType)) ? tblRegistersDataObject._tblRegistersIdType : tblRegistersIdType;
        tblRegistersIdActivity = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdActivity") === true && (tblRegistersDataObject._tblRegistersIdActivity)) ? tblRegistersDataObject._tblRegistersIdActivity : tblRegistersIdActivity;

        tblRegistersIdRegisterUser = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdRegisterUser") === true) ? tblRegistersDataObject._tblRegistersIdRegisterUser : tblRegistersIdRegisterUser;
        if(!tblRegistersIdRegisterUser)
        {
            tblRegistersIdRegisterUser = 0;
        }
        tblRegistersIdRegister1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdRegister1") === true) ? tblRegistersDataObject._tblRegistersIdRegister1 : tblRegistersIdRegister1;
        if(!tblRegistersIdRegister1)
        {
            tblRegistersIdRegister1 = 0;
        }
        tblRegistersIdRegister2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdRegister2") === true) ? tblRegistersDataObject._tblRegistersIdRegister2 : tblRegistersIdRegister2;
        if(!tblRegistersIdRegister2)
        {
            tblRegistersIdRegister2 = 0;
        }
        tblRegistersIdRegister3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdRegister3") === true) ? tblRegistersDataObject._tblRegistersIdRegister3 : tblRegistersIdRegister3;
        if(!tblRegistersIdRegister3)
        {
            tblRegistersIdRegister3 = 0;
        }
        tblRegistersIdRegister4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdRegister4") === true) ? tblRegistersDataObject._tblRegistersIdRegister4 : tblRegistersIdRegister4;
        if(!tblRegistersIdRegister4)
        {
            tblRegistersIdRegister4 = 0;
        }
        tblRegistersIdRegister5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdRegister5") === true) ? tblRegistersDataObject._tblRegistersIdRegister5 : tblRegistersIdRegister5;
        if(!tblRegistersIdRegister5)
        {
            tblRegistersIdRegister5 = 0;
        }

        tblRegistersType = (tblRegistersDataObject.hasOwnProperty("_tblRegistersType") === true && (tblRegistersDataObject._tblRegistersType)) ? tblRegistersDataObject._tblRegistersType : tblRegistersType;

        tblRegistersNameTitle = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNameTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersNameTitle, "db_write_text") : tblRegistersNameTitle;
        tblRegistersNameFull = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNameFull") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersNameFull, "db_write_text") : tblRegistersNameFull;
        tblRegistersNameFirst = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNameFirst") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersNameFirst, "db_write_text") : tblRegistersNameFirst;
        tblRegistersNameLast = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNameLast") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersNameLast, "db_write_text") : tblRegistersNameLast;
        
        tblRegistersCompanyNameLegal = (tblRegistersDataObject.hasOwnProperty("_tblRegistersCompanyNameLegal") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersCompanyNameLegal, "db_write_text") : tblRegistersCompanyNameLegal;
        tblRegistersCompanyNameAlias = (tblRegistersDataObject.hasOwnProperty("_tblRegistersCompanyNameAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersCompanyNameAlias, "db_write_text") : tblRegistersCompanyNameAlias;
        
        tblRegistersDescription = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDescription, "db_write_text") : tblRegistersDescription;
        
        tblRegistersURLAlias = (tblRegistersDataObject.hasOwnProperty("_tblRegistersURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersURLAlias, "db_write_text") : tblRegistersURLAlias;
        tblRegistersKeywordsTags = (tblRegistersDataObject.hasOwnProperty("_tblRegistersKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersKeywordsTags, "db_write_text") : tblRegistersKeywordsTags;
        tblRegistersMetaDescription = (tblRegistersDataObject.hasOwnProperty("_tblRegistersMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersMetaDescription, "db_write_text") : tblRegistersMetaDescription;
        tblRegistersMetaTitle = (tblRegistersDataObject.hasOwnProperty("_tblRegistersMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersMetaTitle, "db_write_text") : tblRegistersMetaTitle;
        tblRegistersMetaInfo = (tblRegistersDataObject.hasOwnProperty("_tblRegistersMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersMetaInfo, "db_write_text") : tblRegistersMetaInfo;
        
        tblRegistersDateBirth = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDateBirth") === true && (tblRegistersDataObject._tblRegistersDateBirth)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDateBirth, gSystemConfig.configBackendDateFormat) : tblRegistersDateBirth;
        tblRegistersGender = (tblRegistersDataObject.hasOwnProperty("_tblRegistersGender") === true) ? tblRegistersDataObject._tblRegistersGender : tblRegistersGender;
        if(!tblRegistersGender)
        {
            tblRegistersGender = 0;
        }
        tblRegistersHeight = (tblRegistersDataObject.hasOwnProperty("_tblRegistersHeight") === true) ? tblRegistersDataObject._tblRegistersHeight : tblRegistersHeight;
        if(!tblRegistersHeight)
        {
            tblRegistersHeight = 0;
        }
        tblRegistersWeight = (tblRegistersDataObject.hasOwnProperty("_tblRegistersWeight") === true) ? tblRegistersDataObject._tblRegistersWeight : tblRegistersWeight;
        if(!tblRegistersWeight)
        {
            tblRegistersWeight = 0;
        }

        tblRegistersDocumentType = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocumentType") === true && (tblRegistersDataObject._tblRegistersDocumentType)) ? tblRegistersDataObject._tblRegistersDocumentType : tblRegistersDocumentType;
        tblRegistersDocument = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocument") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDocument, "db_write_text") : tblRegistersDocument;
        tblRegistersDocument1Type = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocument1Type") === true && (tblRegistersDataObject._tblRegistersDocument1Type)) ? tblRegistersDataObject._tblRegistersDocument1Type : tblRegistersDocument1Type;
        tblRegistersDocument1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocument1") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDocument1, "db_write_text") : tblRegistersDocument1;
        tblRegistersDocument2Type = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocument2Type") === true && (tblRegistersDataObject._tblRegistersDocument2Type)) ? tblRegistersDataObject._tblRegistersDocument2Type : tblRegistersDocument2Type;
        tblRegistersDocument2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocument2") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDocument2, "db_write_text") : tblRegistersDocument2;

        tblRegistersDocumentCompanyType = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocumentCompanyType") === true && (tblRegistersDataObject._tblRegistersDocumentCompanyType)) ? tblRegistersDataObject._tblRegistersDocumentCompanyType : tblRegistersDocumentCompanyType;
        tblRegistersDocumentCompany = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocumentCompany") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDocumentCompany, "db_write_text") : tblRegistersDocumentCompany;
        tblRegistersDocumentCompany1Type = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocumentCompany1Type") === true && (tblRegistersDataObject._tblRegistersDocumentCompany1Type)) ? tblRegistersDataObject._tblRegistersDocumentCompany1Type : tblRegistersDocumentCompany1Type;
        tblRegistersDocumentCompany1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocumentCompany1") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDocumentCompany1, "db_write_text") : tblRegistersDocumentCompany1;
        tblRegistersDocumentCompany2Type = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocumentCompany2Type") === true && (tblRegistersDataObject._tblRegistersDocumentCompany2Type)) ? tblRegistersDataObject._tblRegistersDocumentCompany2Type : tblRegistersDocumentCompany2Type;
        tblRegistersDocumentCompany2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDocumentCompany2") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDocumentCompany2, "db_write_text") : tblRegistersDocumentCompany2;

        tblRegistersZipCode = (tblRegistersDataObject.hasOwnProperty("_tblRegistersZipCode") === true) ? FunctionsGeneric.removeNonNumerical(tblRegistersDataObject._tblRegistersZipCode) : tblRegistersZipCode;
        tblRegistersAddressStreet = (tblRegistersDataObject.hasOwnProperty("_tblRegistersAddressStreet") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersAddressStreet, "db_write_text") : tblRegistersAddressStreet;
        tblRegistersAddressNumber = (tblRegistersDataObject.hasOwnProperty("_tblRegistersAddressNumber") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersAddressNumber, "db_write_text") : tblRegistersAddressNumber;
        tblRegistersAddressComplement = (tblRegistersDataObject.hasOwnProperty("_tblRegistersAddressComplement") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersAddressComplement, "db_write_text") : tblRegistersAddressComplement;
        tblRegistersNeighborhood = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNeighborhood") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersNeighborhood, "db_write_text") : tblRegistersNeighborhood;
        tblRegistersDistrict = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDistrict") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersDistrict, "db_write_text") : tblRegistersDistrict;
        tblRegistersCounty = (tblRegistersDataObject.hasOwnProperty("_tblRegistersCounty") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersCounty, "db_write_text") : tblRegistersCounty;
        tblRegistersCity = (tblRegistersDataObject.hasOwnProperty("_tblRegistersCity") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersCity, "db_write_text") : tblRegistersCity;
        tblRegistersState = (tblRegistersDataObject.hasOwnProperty("_tblRegistersState") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersState, "db_write_text") : tblRegistersState;
        tblRegistersCountry = (tblRegistersDataObject.hasOwnProperty("_tblRegistersCountry") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersCountry, "db_write_text") : tblRegistersCountry;

        tblRegistersIdStreet = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdStreet") === true && (tblRegistersDataObject._tblRegistersIdStreet)) ? tblRegistersDataObject._tblRegistersIdStreet : tblRegistersIdStreet;
        tblRegistersIdNeighborhood = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdNeighborhood") === true && (tblRegistersDataObject._tblRegistersIdNeighborhood)) ? tblRegistersDataObject._tblRegistersIdNeighborhood : tblRegistersIdNeighborhood;
        tblRegistersIdDistrict = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdDistrict") === true && (tblRegistersDataObject._tblRegistersIdDistrict)) ? tblRegistersDataObject._tblRegistersIdDistrict : tblRegistersIdDistrict;
        tblRegistersIdCounty = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdCounty") === true && (tblRegistersDataObject._tblRegistersIdCounty)) ? tblRegistersDataObject._tblRegistersIdCounty : tblRegistersIdCounty;
        tblRegistersIdCity = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdCity") === true && (tblRegistersDataObject._tblRegistersIdCity)) ? tblRegistersDataObject._tblRegistersIdCity : tblRegistersIdCity;
        tblRegistersIdState = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdState") === true && (tblRegistersDataObject._tblRegistersIdState)) ? tblRegistersDataObject._tblRegistersIdState : tblRegistersIdState;
        tblRegistersIdCountry = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdCountry") === true && (tblRegistersDataObject._tblRegistersIdCountry)) ? tblRegistersDataObject._tblRegistersIdCountry : tblRegistersIdCountry;

        tblRegistersLocationReference = (tblRegistersDataObject.hasOwnProperty("_tblRegistersLocationReference") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersLocationReference, "db_write_text") : tblRegistersLocationReference;
        tblRegistersLocationMap = (tblRegistersDataObject.hasOwnProperty("_tblRegistersLocationMap") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersLocationMap, "db_write_text") : tblRegistersLocationMap;

        tblRegistersPhone1InternationalCode = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone1InternationalCode") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone1InternationalCode, "db_write_text") : tblRegistersPhone1InternationalCode;
        tblRegistersPhone1AreaCode = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone1AreaCode") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone1AreaCode, "db_write_text") : tblRegistersPhone1AreaCode;
        tblRegistersPhone1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone1") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone1, "db_write_text") : tblRegistersPhone1;

        tblRegistersPhone2InternationalCode = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone2InternationalCode") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone2InternationalCode, "db_write_text") : tblRegistersPhone2InternationalCode;
        tblRegistersPhone2AreaCode = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone2AreaCode") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone2AreaCode, "db_write_text") : tblRegistersPhone2AreaCode;
        tblRegistersPhone2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone2") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone2, "db_write_text") : tblRegistersPhone2;

        tblRegistersPhone3InternationalCode = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone3InternationalCode") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone3InternationalCode, "db_write_text") : tblRegistersPhone3InternationalCode;
        tblRegistersPhone3AreaCode = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone3AreaCode") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone3AreaCode, "db_write_text") : tblRegistersPhone3AreaCode;
        tblRegistersPhone3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPhone3") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPhone3, "db_write_text") : tblRegistersPhone3;

        tblRegistersWebsite = (tblRegistersDataObject.hasOwnProperty("_tblRegistersWebsite") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersWebsite, "db_write_text") : tblRegistersWebsite;

        tblRegistersUsername = (tblRegistersDataObject.hasOwnProperty("_tblRegistersUsername") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersUsername, "db_write_text") : tblRegistersUsername;
        tblRegistersEmail = (tblRegistersDataObject.hasOwnProperty("_tblRegistersEmail") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersEmail, "db_write_text") : tblRegistersEmail;
        
        //tblRegistersPassword = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPassword") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPassword, "db_write_text") : tblRegistersPassword;
        tblRegistersPassword = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPassword") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPassword, "db_write_text"), 2) : tblRegistersPassword;

        tblRegistersPasswordHint = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPasswordHint") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPasswordHint, "db_write_text") : tblRegistersPasswordHint;
        tblRegistersPasswordLength = (tblRegistersDataObject.hasOwnProperty("_tblRegistersPasswordLength") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersPasswordLength, "db_write_text") : tblRegistersPasswordLength;
        
        if(gSystemConfig.configRegistersInfo1FieldType == 1 || gSystemConfig.configRegistersInfo1FieldType == 2)
        {
            tblRegistersInfo1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo1, "db_write_text") : tblRegistersInfo1;
        }
        if(gSystemConfig.configRegistersInfo1FieldType == 11 || gSystemConfig.configRegistersInfo1FieldType == 12)
        {
            tblRegistersInfo1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo1, "db_write_text"), 2) : tblRegistersInfo1;
        }

        if(gSystemConfig.configRegistersInfo2FieldType == 1 || gSystemConfig.configRegistersInfo2FieldType == 2)
        {
            tblRegistersInfo2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo2, "db_write_text") : tblRegistersInfo2;
        }
        if(gSystemConfig.configRegistersInfo2FieldType == 11 || gSystemConfig.configRegistersInfo2FieldType == 12)
        {
            tblRegistersInfo2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo2, "db_write_text"), 2) : tblRegistersInfo2;
        }

        if(gSystemConfig.configRegistersInfo3FieldType == 1 || gSystemConfig.configRegistersInfo3FieldType == 2)
        {
            tblRegistersInfo3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo3, "db_write_text") : tblRegistersInfo3;
        }
        if(gSystemConfig.configRegistersInfo3FieldType == 11 || gSystemConfig.configRegistersInfo3FieldType == 12)
        {
            tblRegistersInfo3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo3, "db_write_text"), 2) : tblRegistersInfo3;
        }

        if(gSystemConfig.configRegistersInfo4FieldType == 1 || gSystemConfig.configRegistersInfo4FieldType == 2)
        {
            tblRegistersInfo4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo4, "db_write_text") : tblRegistersInfo4;
        }
        if(gSystemConfig.configRegistersInfo4FieldType == 11 || gSystemConfig.configRegistersInfo4FieldType == 12)
        {
            tblRegistersInfo4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo4, "db_write_text"), 2) : tblRegistersInfo1;
        }

        if(gSystemConfig.configRegistersInfo5FieldType == 1 || gSystemConfig.configRegistersInfo5FieldType == 2)
        {
            tblRegistersInfo5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo5, "db_write_text") : tblRegistersInfo5;
        }
        if(gSystemConfig.configRegistersInfo5FieldType == 11 || gSystemConfig.configRegistersInfo5FieldType == 12)
        {
            tblRegistersInfo5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo5, "db_write_text"), 2) : tblRegistersInfo5;
        }

        if(gSystemConfig.configRegistersInfo6FieldType == 1 || gSystemConfig.configRegistersInfo6FieldType == 2)
        {
            tblRegistersInfo6 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo6") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo6, "db_write_text") : tblRegistersInfo6;
        }
        if(gSystemConfig.configRegistersInfo6FieldType == 11 || gSystemConfig.configRegistersInfo6FieldType == 12)
        {
            tblRegistersInfo6 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo6") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo6, "db_write_text"), 2) : tblRegistersInfo6;
        }

        if(gSystemConfig.configRegistersInfo7FieldType == 1 || gSystemConfig.configRegistersInfo7FieldType == 2)
        {
            tblRegistersInfo7 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo7") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo7, "db_write_text") : tblRegistersInfo7;
        }
        if(gSystemConfig.configRegistersInfo7FieldType == 11 || gSystemConfig.configRegistersInfo7FieldType == 12)
        {
            tblRegistersInfo7 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo7") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo7, "db_write_text"), 2) : tblRegistersInfo7;
        }

        if(gSystemConfig.configRegistersInfo8FieldType == 1 || gSystemConfig.configRegistersInfo8FieldType == 2)
        {
            tblRegistersInfo8 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo8") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo8, "db_write_text") : tblRegistersInfo8;
        }
        if(gSystemConfig.configRegistersInfo8FieldType == 11 || gSystemConfig.configRegistersInfo8FieldType == 12)
        {
            tblRegistersInfo8 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo8") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo8, "db_write_text"), 2) : tblRegistersInfo8;
        }

        if(gSystemConfig.configRegistersInfo9FieldType == 1 || gSystemConfig.configRegistersInfo9FieldType == 2)
        {
            tblRegistersInfo9 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo9") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo9, "db_write_text") : tblRegistersInfo9;
        }
        if(gSystemConfig.configRegistersInfo9FieldType == 11 || gSystemConfig.configRegistersInfo9FieldType == 12)
        {
            tblRegistersInfo9 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo9") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo9, "db_write_text"), 2) : tblRegistersInfo9;
        }

        if(gSystemConfig.configRegistersInfo10FieldType == 1 || gSystemConfig.configRegistersInfo10FieldType == 2)
        {
            tblRegistersInfo10 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo10") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo10, "db_write_text") : tblRegistersInfo10;
        }
        if(gSystemConfig.configRegistersInfo10FieldType == 11 || gSystemConfig.configRegistersInfo10FieldType == 12)
        {
            tblRegistersInfo10 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo10") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo10, "db_write_text"), 2) : tblRegistersInfo10;
        }

        if(gSystemConfig.configRegistersInfo11FieldType == 1 || gSystemConfig.configRegistersInfo11FieldType == 2)
        {
            tblRegistersInfo11 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo11") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo11, "db_write_text") : tblRegistersInfo11;
        }
        if(gSystemConfig.configRegistersInfo11FieldType == 11 || gSystemConfig.configRegistersInfo11FieldType == 12)
        {
            tblRegistersInfo11 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo11") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo11, "db_write_text"), 2) : tblRegistersInfo11;
        }

        if(gSystemConfig.configRegistersInfo12FieldType == 1 || gSystemConfig.configRegistersInfo12FieldType == 2)
        {
            tblRegistersInfo12 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo12") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo12, "db_write_text") : tblRegistersInfo12;
        }
        if(gSystemConfig.configRegistersInfo12FieldType == 11 || gSystemConfig.configRegistersInfo12FieldType == 12)
        {
            tblRegistersInfo12 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo12") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo12, "db_write_text"), 2) : tblRegistersInfo12;
        }

        if(gSystemConfig.configRegistersInfo13FieldType == 1 || gSystemConfig.configRegistersInfo13FieldType == 2)
        {
            tblRegistersInfo13 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo13") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo13, "db_write_text") : tblRegistersInfo13;
        }
        if(gSystemConfig.configRegistersInfo13FieldType == 11 || gSystemConfig.configRegistersInfo13FieldType == 12)
        {
            tblRegistersInfo13 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo13") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo13, "db_write_text"), 2) : tblRegistersInfo13;
        }

        if(gSystemConfig.configRegistersInfo14FieldType == 1 || gSystemConfig.configRegistersInfo14FieldType == 2)
        {
            tblRegistersInfo14 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo14") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo14, "db_write_text") : tblRegistersInfo14;
        }
        if(gSystemConfig.configRegistersInfo14FieldType == 11 || gSystemConfig.configRegistersInfo14FieldType == 12)
        {
            tblRegistersInfo14 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo14") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo14, "db_write_text"), 2) : tblRegistersInfo11;
        }

        if(gSystemConfig.configRegistersInfo15FieldType == 1 || gSystemConfig.configRegistersInfo15FieldType == 2)
        {
            tblRegistersInfo15 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo15") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo15, "db_write_text") : tblRegistersInfo15;
        }
        if(gSystemConfig.configRegistersInfo15FieldType == 11 || gSystemConfig.configRegistersInfo15FieldType == 12)
        {
            tblRegistersInfo15 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo11") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo15, "db_write_text"), 2) : tblRegistersInfo15;
        }

        if(gSystemConfig.configRegistersInfo16FieldType == 1 || gSystemConfig.configRegistersInfo16FieldType == 2)
        {
            tblRegistersInfo16 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo16") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo16, "db_write_text") : tblRegistersInfo16;
        }
        if(gSystemConfig.configRegistersInfo16FieldType == 11 || gSystemConfig.configRegistersInfo16FieldType == 12)
        {
            tblRegistersInfo16 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo16") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo16, "db_write_text"), 2) : tblRegistersInfo16;
        }

        if(gSystemConfig.configRegistersInfo17FieldType == 1 || gSystemConfig.configRegistersInfo17FieldType == 2)
        {
            tblRegistersInfo17 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo17") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo17, "db_write_text") : tblRegistersInfo17;
        }
        if(gSystemConfig.configRegistersInfo17FieldType == 11 || gSystemConfig.configRegistersInfo17FieldType == 12)
        {
            tblRegistersInfo17 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo17") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo17, "db_write_text"), 2) : tblRegistersInfo17;
        }

        if(gSystemConfig.configRegistersInfo18FieldType == 1 || gSystemConfig.configRegistersInfo18FieldType == 2)
        {
            tblRegistersInfo18 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo18") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo18, "db_write_text") : tblRegistersInfo18;
        }
        if(gSystemConfig.configRegistersInfo18FieldType == 11 || gSystemConfig.configRegistersInfo18FieldType == 12)
        {
            tblRegistersInfo18 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo18") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo18, "db_write_text"), 2) : tblRegistersInfo18;
        }

        if(gSystemConfig.configRegistersInfo19FieldType == 1 || gSystemConfig.configRegistersInfo19FieldType == 2)
        {
            tblRegistersInfo19 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo19") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo19, "db_write_text") : tblRegistersInfo19;
        }
        if(gSystemConfig.configRegistersInfo19FieldType == 11 || gSystemConfig.configRegistersInfo19FieldType == 12)
        {
            tblRegistersInfo19 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo19") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo19, "db_write_text"), 2) : tblRegistersInfo19;
        }

        if(gSystemConfig.configRegistersInfo20FieldType == 1 || gSystemConfig.configRegistersInfo20FieldType == 2)
        {
            tblRegistersInfo20 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo20") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo20, "db_write_text") : tblRegistersInfo20;
        }
        if(gSystemConfig.configRegistersInfo20FieldType == 11 || gSystemConfig.configRegistersInfo20FieldType == 12)
        {
            tblRegistersInfo20 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfo20") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfo20, "db_write_text"), 2) : tblRegistersInfo20;
        }
        
        tblRegistersInfoSmall1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall1") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall1, "db_write_text") : tblRegistersInfoSmall1;
        tblRegistersInfoSmall2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall2") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall2, "db_write_text") : tblRegistersInfoSmall2;
        tblRegistersInfoSmall3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall3") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall3, "db_write_text") : tblRegistersInfoSmall3;
        tblRegistersInfoSmall4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall4") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall4, "db_write_text") : tblRegistersInfoSmall4;
        tblRegistersInfoSmall5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall5") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall5, "db_write_text") : tblRegistersInfoSmall5;
        tblRegistersInfoSmall6 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall6") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall6, "db_write_text") : tblRegistersInfoSmall6;
        tblRegistersInfoSmall7 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall7") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall7, "db_write_text") : tblRegistersInfoSmall7;
        tblRegistersInfoSmall8 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall8") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall8, "db_write_text") : tblRegistersInfoSmall8;
        tblRegistersInfoSmall9 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall9") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall9, "db_write_text") : tblRegistersInfoSmall9;
        tblRegistersInfoSmall10 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall10") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall10, "db_write_text") : tblRegistersInfoSmall10;
        tblRegistersInfoSmall11 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall11") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall11, "db_write_text") : tblRegistersInfoSmall11;
        tblRegistersInfoSmall12 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall12") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall12, "db_write_text") : tblRegistersInfoSmall12;
        tblRegistersInfoSmall13 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall13") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall13, "db_write_text") : tblRegistersInfoSmall13;
        tblRegistersInfoSmall14 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall14") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall14, "db_write_text") : tblRegistersInfoSmall14;
        tblRegistersInfoSmall15 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall15") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall15, "db_write_text") : tblRegistersInfoSmall15;
        tblRegistersInfoSmall16 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall16") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall16, "db_write_text") : tblRegistersInfoSmall16;
        tblRegistersInfoSmall17 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall17") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall17, "db_write_text") : tblRegistersInfoSmall17;
        tblRegistersInfoSmall18 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall18") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall18, "db_write_text") : tblRegistersInfoSmall18;
        tblRegistersInfoSmall19 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall19") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall19, "db_write_text") : tblRegistersInfoSmall19;
        tblRegistersInfoSmall20 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall20") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall20, "db_write_text") : tblRegistersInfoSmall20;
        tblRegistersInfoSmall21 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall21") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall21, "db_write_text") : tblRegistersInfoSmall21;
        tblRegistersInfoSmall22 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall22") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall22, "db_write_text") : tblRegistersInfoSmall22;
        tblRegistersInfoSmall23 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall23") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall23, "db_write_text") : tblRegistersInfoSmall23;
        tblRegistersInfoSmall24 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall24") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall24, "db_write_text") : tblRegistersInfoSmall24;
        tblRegistersInfoSmall25 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall25") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall25, "db_write_text") : tblRegistersInfoSmall25;
        tblRegistersInfoSmall26 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall26") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall26, "db_write_text") : tblRegistersInfoSmall26;
        tblRegistersInfoSmall27 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall27") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall27, "db_write_text") : tblRegistersInfoSmall27;
        tblRegistersInfoSmall28 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall28") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall28, "db_write_text") : tblRegistersInfoSmall28;
        tblRegistersInfoSmall29 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall29") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall29, "db_write_text") : tblRegistersInfoSmall29;
        tblRegistersInfoSmall30 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersInfoSmall30") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersInfoSmall30, "db_write_text") : tblRegistersInfoSmall30;

        tblRegistersNumber1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumber1") === true && (tblRegistersDataObject._tblRegistersNumber1)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumber1, gSystemConfig.configRegistersNumber1FieldType) : tblRegistersNumber1;
        tblRegistersNumber2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumber2") === true && (tblRegistersDataObject._tblRegistersNumber2)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumber2, gSystemConfig.configRegistersNumber2FieldType) : tblRegistersNumber2;
        tblRegistersNumber3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumber3") === true && (tblRegistersDataObject._tblRegistersNumber3)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumber3, gSystemConfig.configRegistersNumber3FieldType) : tblRegistersNumber3;
        tblRegistersNumber4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumber4") === true && (tblRegistersDataObject._tblRegistersNumber4)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumber4, gSystemConfig.configRegistersNumber4FieldType) : tblRegistersNumber4;
        tblRegistersNumber5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumber5") === true && (tblRegistersDataObject._tblRegistersNumber5)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumber5, gSystemConfig.configRegistersNumber5FieldType) : tblRegistersNumber5;
        
        tblRegistersNumberSmall1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumberSmall1") === true && (tblRegistersDataObject._tblRegistersNumberSmall1)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumberSmall1, gSystemConfig.configRegistersNumberS1FieldType) : tblRegistersNumberSmall1;
        tblRegistersNumberSmall2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumberSmall2") === true && (tblRegistersDataObject._tblRegistersNumberSmall2)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumberSmall2, gSystemConfig.configRegistersNumberS2FieldType) : tblRegistersNumberSmall2;
        tblRegistersNumberSmall3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumberSmall3") === true && (tblRegistersDataObject._tblRegistersNumberSmall3)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumberSmall3, gSystemConfig.configRegistersNumberS3FieldType) : tblRegistersNumberSmall3;
        tblRegistersNumberSmall4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumberSmall4") === true && (tblRegistersDataObject._tblRegistersNumberSmall4)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumberSmall4, gSystemConfig.configRegistersNumberS4FieldType) : tblRegistersNumberSmall4;
        tblRegistersNumberSmall5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNumberSmall5") === true && (tblRegistersDataObject._tblRegistersNumberSmall5)) ? FunctionsGeneric.valueMaskWrite(tblRegistersDataObject._tblRegistersNumberSmall5, gSystemConfig.configRegistersNumberS5FieldType) : tblRegistersNumberSmall5;
        
        tblRegistersURL1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersURL1") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersURL1, "db_write_text") : tblRegistersURL1;
        tblRegistersURL2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersURL2") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersURL2, "db_write_text") : tblRegistersURL2;
        tblRegistersURL3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersURL3") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersURL3, "db_write_text") : tblRegistersURL3;
        tblRegistersURL4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersURL4") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersURL4, "db_write_text") : tblRegistersURL4;
        tblRegistersURL5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersURL5") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersURL5, "db_write_text") : tblRegistersURL5;
        
        tblRegistersDate1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate1") === true && (tblRegistersDataObject._tblRegistersDate1)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate1, gSystemConfig.configBackendDateFormat) : tblRegistersDate1;
        tblRegistersDate2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate2") === true && (tblRegistersDataObject._tblRegistersDate2)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate2, gSystemConfig.configBackendDateFormat) : tblRegistersDate2;
        tblRegistersDate3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate3") === true && (tblRegistersDataObject._tblRegistersDate3)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate3, gSystemConfig.configBackendDateFormat) : tblRegistersDate3;
        tblRegistersDate4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate4") === true && (tblRegistersDataObject._tblRegistersDate4)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate4, gSystemConfig.configBackendDateFormat) : tblRegistersDate4;
        tblRegistersDate5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate5") === true && (tblRegistersDataObject._tblRegistersDate5)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate5, gSystemConfig.configBackendDateFormat) : tblRegistersDate5;
        tblRegistersDate6 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate6") === true && (tblRegistersDataObject._tblRegistersDate6)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate6, gSystemConfig.configBackendDateFormat) : tblRegistersDate6;
        tblRegistersDate7 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate7") === true && (tblRegistersDataObject._tblRegistersDate7)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate7, gSystemConfig.configBackendDateFormat) : tblRegistersDate7;
        tblRegistersDate8 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate8") === true && (tblRegistersDataObject._tblRegistersDate8)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate8, gSystemConfig.configBackendDateFormat) : tblRegistersDate8;
        tblRegistersDate9 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate9") === true && (tblRegistersDataObject._tblRegistersDate9)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate9, gSystemConfig.configBackendDateFormat) : tblRegistersDate9;
        tblRegistersDate10 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersDate10") === true && (tblRegistersDataObject._tblRegistersDate10)) ? FunctionsGeneric.dateSQLWrite(tblRegistersDataObject._tblRegistersDate10, gSystemConfig.configBackendDateFormat) : tblRegistersDate10;

        tblRegistersImageMain = (tblRegistersDataObject.hasOwnProperty("_tblRegistersImageMain") === true) ? tblRegistersDataObject._tblRegistersImageMain : tblRegistersImageMain;
        tblRegistersImageMainCaption = (tblRegistersDataObject.hasOwnProperty("_tblRegistersImageMainCaption") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersImageMainCaption, "db_write_text") : tblRegistersImageMainCaption;
        tblRegistersImageLogo = (tblRegistersDataObject.hasOwnProperty("_tblRegistersImageLogo") === true) ? tblRegistersDataObject._tblRegistersImageLogo : tblRegistersImageLogo;
        tblRegistersImageBanner = (tblRegistersDataObject.hasOwnProperty("_tblRegistersImageBanner") === true) ? tblRegistersDataObject._tblRegistersImageBanner : tblRegistersImageBanner;
        tblRegistersFile1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersFile1") === true) ? tblRegistersDataObject._tblRegistersFile1 : tblRegistersFile1;
        tblRegistersFile2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersFile2") === true) ? tblRegistersDataObject._tblRegistersFile2 : tblRegistersFile2;
        tblRegistersFile3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersFile3") === true) ? tblRegistersDataObject._tblRegistersFile3 : tblRegistersFile3;
        tblRegistersFile4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersFile4") === true) ? tblRegistersDataObject._tblRegistersFile4 : tblRegistersFile4;
        tblRegistersFile5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersFile5") === true) ? tblRegistersDataObject._tblRegistersFile5 : tblRegistersFile5;
        
        tblRegistersActivation = (tblRegistersDataObject.hasOwnProperty("_tblRegistersActivation") === true && (tblRegistersDataObject._tblRegistersActivation)) ? tblRegistersDataObject._tblRegistersActivation : tblRegistersActivation;
        tblRegistersActivation1 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersActivation1") === true && (tblRegistersDataObject._tblRegistersActivation1)) ? tblRegistersDataObject._tblRegistersActivation1 : tblRegistersActivation1;
        tblRegistersActivation2 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersActivation2") === true && (tblRegistersDataObject._tblRegistersActivation2)) ? tblRegistersDataObject._tblRegistersActivation2 : tblRegistersActivation2;
        tblRegistersActivation3 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersActivation3") === true && (tblRegistersDataObject._tblRegistersActivation3)) ? tblRegistersDataObject._tblRegistersActivation3 : tblRegistersActivation3;
        tblRegistersActivation4 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersActivation5") === true && (tblRegistersDataObject._tblRegistersActivation4)) ? tblRegistersDataObject._tblRegistersActivation4 : tblRegistersActivation5;
        tblRegistersActivation5 = (tblRegistersDataObject.hasOwnProperty("_tblRegistersActivation5") === true && (tblRegistersDataObject._tblRegistersActivation5)) ? tblRegistersDataObject._tblRegistersActivation5 : tblRegistersActivation5;
        
        tblRegistersIdStatus = (tblRegistersDataObject.hasOwnProperty("_tblRegistersIdStatus") === true && (tblRegistersDataObject._tblRegistersIdStatus)) ? tblRegistersDataObject._tblRegistersIdStatus : tblRegistersIdStatus;
        tblRegistersRestrictedAccess = (tblRegistersDataObject.hasOwnProperty("_tblRegistersRestrictedAccess") === true && (tblRegistersDataObject._tblRegistersRestrictedAccess)) ? tblRegistersDataObject._tblRegistersRestrictedAccess : tblRegistersRestrictedAccess;
        tblRegistersNotes = (tblRegistersDataObject.hasOwnProperty("_tblRegistersNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblRegistersDataObject._tblRegistersNotes, "db_write_text") : tblRegistersNotes;
        
        arrIdsRegistersFiltersGeneric1 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric1") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric1)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric1 : arrIdsRegistersFiltersGeneric1;
        arrIdsRegistersFiltersGeneric2 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric2") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric2)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric2 : arrIdsRegistersFiltersGeneric2;
        arrIdsRegistersFiltersGeneric3 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric3") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric3)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric3 : arrIdsRegistersFiltersGeneric3;
        arrIdsRegistersFiltersGeneric4 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric4") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric4)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric4 : arrIdsRegistersFiltersGeneric4;
        arrIdsRegistersFiltersGeneric5 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric5") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric5)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric5 : arrIdsRegistersFiltersGeneric5;
        arrIdsRegistersFiltersGeneric6 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric6") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric6)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric6 : arrIdsRegistersFiltersGeneric6;
        arrIdsRegistersFiltersGeneric5 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric5") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric5)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric5 : arrIdsRegistersFiltersGeneric5;
        arrIdsRegistersFiltersGeneric6 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric6") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric6)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric6 : arrIdsRegistersFiltersGeneric6;
        arrIdsRegistersFiltersGeneric7 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric7") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric7)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric7 : arrIdsRegistersFiltersGeneric7;
        arrIdsRegistersFiltersGeneric8 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric8") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric8)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric8 : arrIdsRegistersFiltersGeneric8;
        arrIdsRegistersFiltersGeneric9 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric9") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric9)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric9 : arrIdsRegistersFiltersGeneric9;
        arrIdsRegistersFiltersGeneric10 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric10") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric10)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric10 : arrIdsRegistersFiltersGeneric10;
        arrIdsRegistersFiltersGeneric11 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric11") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric11)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric11 : arrIdsRegistersFiltersGeneric11;
        arrIdsRegistersFiltersGeneric12 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric12") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric12)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric12 : arrIdsRegistersFiltersGeneric12;
        arrIdsRegistersFiltersGeneric13 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric13") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric13)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric13 : arrIdsRegistersFiltersGeneric13;
        arrIdsRegistersFiltersGeneric14 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric14") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric14)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric14 : arrIdsRegistersFiltersGeneric14;
        arrIdsRegistersFiltersGeneric15 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric15") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric15)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric15 : arrIdsRegistersFiltersGeneric15;
        arrIdsRegistersFiltersGeneric16 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric16") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric16)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric16 : arrIdsRegistersFiltersGeneric16;
        arrIdsRegistersFiltersGeneric15 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric15") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric15)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric15 : arrIdsRegistersFiltersGeneric15;
        arrIdsRegistersFiltersGeneric16 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric16") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric16)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric16 : arrIdsRegistersFiltersGeneric16;
        arrIdsRegistersFiltersGeneric17 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric17") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric17)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric17 : arrIdsRegistersFiltersGeneric17;
        arrIdsRegistersFiltersGeneric18 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric18") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric18)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric18 : arrIdsRegistersFiltersGeneric18;
        arrIdsRegistersFiltersGeneric19 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric19") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric19)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric19 : arrIdsRegistersFiltersGeneric19;
        arrIdsRegistersFiltersGeneric20 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric20") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric20)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric20 : arrIdsRegistersFiltersGeneric20;
        arrIdsRegistersFiltersGeneric21 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric21") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric21)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric21 : arrIdsRegistersFiltersGeneric21;
        arrIdsRegistersFiltersGeneric22 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric22") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric22)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric22 : arrIdsRegistersFiltersGeneric22;
        arrIdsRegistersFiltersGeneric23 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric23") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric23)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric23 : arrIdsRegistersFiltersGeneric23;
        arrIdsRegistersFiltersGeneric24 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric24") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric24)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric24 : arrIdsRegistersFiltersGeneric24;
        arrIdsRegistersFiltersGeneric25 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric25") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric25)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric25 : arrIdsRegistersFiltersGeneric25;
        arrIdsRegistersFiltersGeneric26 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric26") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric26)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric26 : arrIdsRegistersFiltersGeneric26;
        arrIdsRegistersFiltersGeneric25 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric25") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric25)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric25 : arrIdsRegistersFiltersGeneric25;
        arrIdsRegistersFiltersGeneric26 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric26") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric26)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric26 : arrIdsRegistersFiltersGeneric26;
        arrIdsRegistersFiltersGeneric27 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric27") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric27)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric27 : arrIdsRegistersFiltersGeneric27;
        arrIdsRegistersFiltersGeneric28 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric28") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric28)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric28 : arrIdsRegistersFiltersGeneric28;
        arrIdsRegistersFiltersGeneric29 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric29") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric29)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric29 : arrIdsRegistersFiltersGeneric29;
        arrIdsRegistersFiltersGeneric30 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric30") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric30)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric30 : arrIdsRegistersFiltersGeneric30;
        arrIdsRegistersFiltersGeneric31 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric31") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric31)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric31 : arrIdsRegistersFiltersGeneric31;
        arrIdsRegistersFiltersGeneric32 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric32") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric32)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric32 : arrIdsRegistersFiltersGeneric32;
        arrIdsRegistersFiltersGeneric33 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric33") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric33)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric33 : arrIdsRegistersFiltersGeneric33;
        arrIdsRegistersFiltersGeneric34 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric34") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric34)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric34 : arrIdsRegistersFiltersGeneric34;
        arrIdsRegistersFiltersGeneric35 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric35") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric35)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric35 : arrIdsRegistersFiltersGeneric35;
        arrIdsRegistersFiltersGeneric36 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric36") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric36)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric36 : arrIdsRegistersFiltersGeneric36;
        arrIdsRegistersFiltersGeneric35 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric35") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric35)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric35 : arrIdsRegistersFiltersGeneric35;
        arrIdsRegistersFiltersGeneric36 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric36") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric36)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric36 : arrIdsRegistersFiltersGeneric36;
        arrIdsRegistersFiltersGeneric37 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric37") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric37)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric37 : arrIdsRegistersFiltersGeneric37;
        arrIdsRegistersFiltersGeneric38 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric38") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric38)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric38 : arrIdsRegistersFiltersGeneric38;
        arrIdsRegistersFiltersGeneric39 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric39") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric39)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric39 : arrIdsRegistersFiltersGeneric39;
        arrIdsRegistersFiltersGeneric40 = (tblRegistersDataObject.hasOwnProperty("_arrIdsRegistersFiltersGeneric40") === true && (tblRegistersDataObject._arrIdsRegistersFiltersGeneric40)) ? tblRegistersDataObject._arrIdsRegistersFiltersGeneric40 : arrIdsRegistersFiltersGeneric40;
        //----------------------


        //Query.
        //----------------------
        //strSQLCategoriesUpdate += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLRegistersUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableRegisters + " ";
        strSQLRegistersUpdate += "SET ? ";
        strSQLRegistersUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLRegistersUpdateParams.id = tblRegistersID;
        strSQLRegistersUpdateParams.id_parent = tblRegistersIdParent;
        strSQLRegistersUpdateParams.sort_order = tblRegistersSortOrder;

        //strSQLRegistersUpdateParams.date_creation = tblRegistersDateCreation;
        strSQLRegistersUpdateParams.date_timezone = tblRegistersDateTimezone;
        strSQLRegistersUpdateParams.date_edit = tblRegistersDateEdit;

        strSQLRegistersUpdateParams.id_type = tblRegistersIdType;
        strSQLRegistersUpdateParams.id_activity = tblRegistersIdActivity;

        strSQLRegistersUpdateParams.id_register_user = tblRegistersIdRegisterUser;
        strSQLRegistersUpdateParams.id_register1 = tblRegistersIdRegister1;
        strSQLRegistersUpdateParams.id_register2 = tblRegistersIdRegister2;
        strSQLRegistersUpdateParams.id_register3 = tblRegistersIdRegister3;
        strSQLRegistersUpdateParams.id_register4 = tblRegistersIdRegister4;
        strSQLRegistersUpdateParams.id_register5 = tblRegistersIdRegister5;

        strSQLRegistersUpdateParams.register_type = tblRegistersType;

        strSQLRegistersUpdateParams.name_title = tblRegistersNameTitle;
        strSQLRegistersUpdateParams.name_full = tblRegistersNameFull;
        strSQLRegistersUpdateParams.name_first = tblRegistersNameFirst;
        strSQLRegistersUpdateParams.name_last = tblRegistersNameLast;

        strSQLRegistersUpdateParams.company_name_legal = tblRegistersCompanyNameLegal;
        strSQLRegistersUpdateParams.company_name_alias = tblRegistersCompanyNameAlias;

        strSQLRegistersUpdateParams.description = tblRegistersDescription;

        strSQLRegistersUpdateParams.url_alias = tblRegistersURLAlias;
        strSQLRegistersUpdateParams.keywords_tags = tblRegistersKeywordsTags;
        strSQLRegistersUpdateParams.meta_description = tblRegistersMetaDescription;
        strSQLRegistersUpdateParams.meta_title = tblRegistersMetaTitle;
        strSQLRegistersUpdateParams.meta_info = tblRegistersMetaInfo;

        strSQLRegistersUpdateParams.date_birth = tblRegistersDateBirth;
        strSQLRegistersUpdateParams.gender = tblRegistersGender;
        strSQLRegistersUpdateParams.height = tblRegistersHeight;
        strSQLRegistersUpdateParams.weight = tblRegistersWeight;

        strSQLRegistersUpdateParams.document_type = tblRegistersDocumentType;
        strSQLRegistersUpdateParams.document = tblRegistersDocument;
        strSQLRegistersUpdateParams.document1_type = tblRegistersDocument1Type;
        strSQLRegistersUpdateParams.document1 = tblRegistersDocument1;
        strSQLRegistersUpdateParams.document2_type = tblRegistersDocument2Type;
        strSQLRegistersUpdateParams.document2 = tblRegistersDocument2;

        strSQLRegistersUpdateParams.document_company_type = tblRegistersDocumentCompanyType;
        strSQLRegistersUpdateParams.document_company = tblRegistersDocumentCompany;
        strSQLRegistersUpdateParams.document_company1_type = tblRegistersDocumentCompany1Type;
        strSQLRegistersUpdateParams.document_company1 = tblRegistersDocumentCompany1;
        strSQLRegistersUpdateParams.document_company2_type = tblRegistersDocumentCompany2Type;
        strSQLRegistersUpdateParams.document_company2 = tblRegistersDocumentCompany2;

        strSQLRegistersUpdateParams.zip_code = tblRegistersZipCode;
        strSQLRegistersUpdateParams.address_street = tblRegistersAddressStreet;
        strSQLRegistersUpdateParams.address_number = tblRegistersAddressNumber;
        strSQLRegistersUpdateParams.address_complement = tblRegistersAddressComplement;
        strSQLRegistersUpdateParams.neighborhood = tblRegistersNeighborhood;
        strSQLRegistersUpdateParams.district = tblRegistersDistrict;
        strSQLRegistersUpdateParams.county = tblRegistersCounty;
        strSQLRegistersUpdateParams.city = tblRegistersCity;
        strSQLRegistersUpdateParams.state = tblRegistersState;
        strSQLRegistersUpdateParams.country = tblRegistersCountry;
        
        strSQLRegistersUpdateParams.id_street = tblRegistersIdStreet;
        strSQLRegistersUpdateParams.id_neighborhood = tblRegistersIdNeighborhood;
        strSQLRegistersUpdateParams.id_district = tblRegistersIdDistrict;
        strSQLRegistersUpdateParams.id_county = tblRegistersIdCounty;
        strSQLRegistersUpdateParams.id_city = tblRegistersIdCity;
        strSQLRegistersUpdateParams.id_state = tblRegistersIdState;
        strSQLRegistersUpdateParams.id_country = tblRegistersIdCountry;

        strSQLRegistersUpdateParams.location_reference = tblRegistersLocationReference;
        strSQLRegistersUpdateParams.location_map = tblRegistersLocationMap;

        strSQLRegistersUpdateParams.phone1_international_code = tblRegistersPhone1InternationalCode;
        strSQLRegistersUpdateParams.phone1_area_code = tblRegistersPhone1AreaCode;
        strSQLRegistersUpdateParams.phone1 = tblRegistersPhone1;

        strSQLRegistersUpdateParams.phone2_international_code = tblRegistersPhone2InternationalCode;
        strSQLRegistersUpdateParams.phone2_area_code = tblRegistersPhone2AreaCode;
        strSQLRegistersUpdateParams.phone2 = tblRegistersPhone2;

        strSQLRegistersUpdateParams.phone3_international_code = tblRegistersPhone3InternationalCode;
        strSQLRegistersUpdateParams.phone3_area_code = tblRegistersPhone3AreaCode;
        strSQLRegistersUpdateParams.phone3 = tblRegistersPhone3;

        strSQLRegistersUpdateParams.website = tblRegistersWebsite;

        strSQLRegistersUpdateParams.username = tblRegistersUsername;
        strSQLRegistersUpdateParams.email = tblRegistersEmail;
        strSQLRegistersUpdateParams.password = tblRegistersPassword;
        strSQLRegistersUpdateParams.password_hint = tblRegistersPasswordHint;
        strSQLRegistersUpdateParams.password_length = tblRegistersPasswordLength;

        strSQLRegistersUpdateParams.info1 = tblRegistersInfo1;
        strSQLRegistersUpdateParams.info2 = tblRegistersInfo2;
        strSQLRegistersUpdateParams.info3 = tblRegistersInfo3;
        strSQLRegistersUpdateParams.info4 = tblRegistersInfo4;
        strSQLRegistersUpdateParams.info5 = tblRegistersInfo5;
        strSQLRegistersUpdateParams.info6 = tblRegistersInfo6;
        strSQLRegistersUpdateParams.info7 = tblRegistersInfo7;
        strSQLRegistersUpdateParams.info8 = tblRegistersInfo8;
        strSQLRegistersUpdateParams.info9 = tblRegistersInfo9;
        strSQLRegistersUpdateParams.info10 = tblRegistersInfo10;
        strSQLRegistersUpdateParams.info11 = tblRegistersInfo11;
        strSQLRegistersUpdateParams.info12 = tblRegistersInfo12;
        strSQLRegistersUpdateParams.info13 = tblRegistersInfo13;
        strSQLRegistersUpdateParams.info14 = tblRegistersInfo14;
        strSQLRegistersUpdateParams.info15 = tblRegistersInfo15;
        strSQLRegistersUpdateParams.info16 = tblRegistersInfo16;
        strSQLRegistersUpdateParams.info17 = tblRegistersInfo17;
        strSQLRegistersUpdateParams.info18 = tblRegistersInfo18;
        strSQLRegistersUpdateParams.info19 = tblRegistersInfo19;
        strSQLRegistersUpdateParams.info20 = tblRegistersInfo20;

        strSQLRegistersUpdateParams.info_small1 = tblRegistersInfoSmall1;
        strSQLRegistersUpdateParams.info_small2 = tblRegistersInfoSmall2;
        strSQLRegistersUpdateParams.info_small3 = tblRegistersInfoSmall3;
        strSQLRegistersUpdateParams.info_small4 = tblRegistersInfoSmall4;
        strSQLRegistersUpdateParams.info_small5 = tblRegistersInfoSmall5;
        strSQLRegistersUpdateParams.info_small6 = tblRegistersInfoSmall6;
        strSQLRegistersUpdateParams.info_small7 = tblRegistersInfoSmall7;
        strSQLRegistersUpdateParams.info_small8 = tblRegistersInfoSmall8;
        strSQLRegistersUpdateParams.info_small9 = tblRegistersInfoSmall9;
        strSQLRegistersUpdateParams.info_small10 = tblRegistersInfoSmall10;
        strSQLRegistersUpdateParams.info_small11 = tblRegistersInfoSmall11;
        strSQLRegistersUpdateParams.info_small12 = tblRegistersInfoSmall12;
        strSQLRegistersUpdateParams.info_small13 = tblRegistersInfoSmall13;
        strSQLRegistersUpdateParams.info_small14 = tblRegistersInfoSmall14;
        strSQLRegistersUpdateParams.info_small15 = tblRegistersInfoSmall15;
        strSQLRegistersUpdateParams.info_small16 = tblRegistersInfoSmall16;
        strSQLRegistersUpdateParams.info_small17 = tblRegistersInfoSmall17;
        strSQLRegistersUpdateParams.info_small18 = tblRegistersInfoSmall18;
        strSQLRegistersUpdateParams.info_small19 = tblRegistersInfoSmall19;
        strSQLRegistersUpdateParams.info_small20 = tblRegistersInfoSmall20;
        strSQLRegistersUpdateParams.info_small21 = tblRegistersInfoSmall21;
        strSQLRegistersUpdateParams.info_small22 = tblRegistersInfoSmall22;
        strSQLRegistersUpdateParams.info_small23 = tblRegistersInfoSmall23;
        strSQLRegistersUpdateParams.info_small24 = tblRegistersInfoSmall24;
        strSQLRegistersUpdateParams.info_small25 = tblRegistersInfoSmall25;
        strSQLRegistersUpdateParams.info_small26 = tblRegistersInfoSmall26;
        strSQLRegistersUpdateParams.info_small27 = tblRegistersInfoSmall27;
        strSQLRegistersUpdateParams.info_small28 = tblRegistersInfoSmall28;
        strSQLRegistersUpdateParams.info_small29 = tblRegistersInfoSmall29;
        strSQLRegistersUpdateParams.info_small30 = tblRegistersInfoSmall30;

        strSQLRegistersUpdateParams.number1 = tblRegistersNumber1;
        strSQLRegistersUpdateParams.number2 = tblRegistersNumber2;
        strSQLRegistersUpdateParams.number3 = tblRegistersNumber3;
        strSQLRegistersUpdateParams.number4 = tblRegistersNumber4;
        strSQLRegistersUpdateParams.number5 = tblRegistersNumber5;

        strSQLRegistersUpdateParams.number_small1 = tblRegistersNumberSmall1;
        strSQLRegistersUpdateParams.number_small2 = tblRegistersNumberSmall2;
        strSQLRegistersUpdateParams.number_small3 = tblRegistersNumberSmall3;
        strSQLRegistersUpdateParams.number_small4 = tblRegistersNumberSmall4;
        strSQLRegistersUpdateParams.number_small5 = tblRegistersNumberSmall5;

        strSQLRegistersUpdateParams.url1 = tblRegistersURL1;
        strSQLRegistersUpdateParams.url2 = tblRegistersURL2;
        strSQLRegistersUpdateParams.url3 = tblRegistersURL3;
        strSQLRegistersUpdateParams.url4 = tblRegistersURL4;
        strSQLRegistersUpdateParams.url5 = tblRegistersURL5;

        strSQLRegistersUpdateParams.date1 = tblRegistersDate1;
        strSQLRegistersUpdateParams.date2 = tblRegistersDate2;
        strSQLRegistersUpdateParams.date3 = tblRegistersDate3;
        strSQLRegistersUpdateParams.date4 = tblRegistersDate4;
        strSQLRegistersUpdateParams.date5 = tblRegistersDate5;
        strSQLRegistersUpdateParams.date6 = tblRegistersDate6;
        strSQLRegistersUpdateParams.date7 = tblRegistersDate7;
        strSQLRegistersUpdateParams.date8 = tblRegistersDate8;
        strSQLRegistersUpdateParams.date9 = tblRegistersDate9;
        strSQLRegistersUpdateParams.date10 = tblRegistersDate10;
        
        if(tblRegistersImageMain)
        {
            strSQLRegistersUpdateParams.image_main = tblRegistersImageMain;
        }

        strSQLRegistersUpdateParams.image_main_caption = tblRegistersImageMainCaption;

        if(tblRegistersImageLogo)
        {
            strSQLRegistersUpdateParams.image_logo = tblRegistersImageLogo;
        }
        if(tblRegistersImageBanner)
        {
            strSQLRegistersUpdateParams.image_banner = tblRegistersImageBanner;
        }

        if(tblRegistersFile1)
        {
            strSQLRegistersUpdateParams.file1 = tblRegistersFile1;
        }
        if(tblRegistersFile2)
        {
            strSQLRegistersUpdateParams.file2 = tblRegistersFile2;
        }
        if(tblRegistersFile3)
        {
            strSQLRegistersUpdateParams.file3 = tblRegistersFile3;
        }
        if(tblRegistersFile4)
        {
            strSQLRegistersUpdateParams.file4 = tblRegistersFile4;
        }
        if(tblRegistersFile5)
        {
            strSQLRegistersUpdateParams.file5 = tblRegistersFile5;
        }

        strSQLRegistersUpdateParams.activation = tblRegistersActivation;
        strSQLRegistersUpdateParams.activation1 = tblRegistersActivation1;
        strSQLRegistersUpdateParams.activation2 = tblRegistersActivation2;
        strSQLRegistersUpdateParams.activation3 = tblRegistersActivation3;
        strSQLRegistersUpdateParams.activation4 = tblRegistersActivation4;
        strSQLRegistersUpdateParams.activation5 = tblRegistersActivation5;
        
        strSQLRegistersUpdateParams.id_status = tblRegistersIdStatus;
        strSQLRegistersUpdateParams.restricted_access = tblRegistersRestrictedAccess;
        strSQLRegistersUpdateParams.notes = tblRegistersNotes;
        //----------------------


        //Execute query.
        //----------------------
        try
        {
            resultsSQLRegistersUpdate = await new Promise((resolve, reject)=>{
                dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                    if(dbSystemPoolError)
                    {
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                        }
                        throw dbSystemPoolError;
                    }else{

                        //dbSystemCon.query(strSQLRegistersUpdate, strSQLRegistersUpdateParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.query(strSQLRegistersUpdate, [strSQLRegistersUpdateParams, tblRegistersID], (dbSystemError, results) => {
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
                                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    }

                                    //Return promise.
                                    resolve(results);
                                }else{
                                    //Error.
                                    //reject(false);
                                    reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Return data treatment.
        //----------------------
        if(resultsSQLRegistersUpdate.affectedRows > 0)
        {
            //Variables - define values.
            //----------------------
            try
            {
                //Parameters build.
                arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableRegisters + ";s");
                ofglRecordsParameters = {
                    _arrSearchParameters: arrFiltersGenericSearchParameters,
                    _configSortOrder: "title",
                    _strNRecords: "",
                    _objSpecialParameters: {returnType: 3}
                };
        
                //Object build.
                ofglRecords = new ObjectFiltersGenericListing(ofglRecordsParameters);
                await ofglRecords.recordsListingGet(0, 3);


                //Bindings search.
                objIdsRegistersFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                        ["id_record;" + tblRegistersID + ";i"], 
                                                                                        "", 
                                                                                        "", 
                                                                                        FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                        1, 
                                                                                        {returnType: 3});

                //Filter results acording to filter_index.
                if(gSystemConfig.enableRegistersFilterGeneric1 != 0)
                {
                    resultsRegistersFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 101;
                    });

                    /*objIdsRegistersFiltersGeneric1Binding = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                        return obj.id_filter_index == 101;
                    });*/
                }
                if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
                {
                    resultsRegistersFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
                {
                    resultsRegistersFiltersGeneric2Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 102;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric3 != 0)
                {
                    resultsRegistersFiltersGeneric3Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 103;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric4 != 0)
                {
                    resultsRegistersFiltersGeneric4Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 104;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric5 != 0)
                {
                    resultsRegistersFiltersGeneric5Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 105;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric6 != 0)
                {
                    resultsRegistersFiltersGeneric6Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 106;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric7 != 0)
                {
                    resultsRegistersFiltersGeneric7Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 107;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric8 != 0)
                {
                    resultsRegistersFiltersGeneric8Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 108;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric9 != 0)
                {
                    resultsRegistersFiltersGeneric9Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 109;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric10 != 0)
                {
                    resultsRegistersFiltersGeneric10Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 110;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric11 != 0)
                {
                    resultsRegistersFiltersGeneric11Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 111;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric12 != 0)
                {
                    resultsRegistersFiltersGeneric12Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 112;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric13 != 0)
                {
                    resultsRegistersFiltersGeneric13Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 113;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric14 != 0)
                {
                    resultsRegistersFiltersGeneric14Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 114;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric15 != 0)
                {
                    resultsRegistersFiltersGeneric15Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 115;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric16 != 0)
                {
                    resultsRegistersFiltersGeneric16Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 116;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric17 != 0)
                {
                    resultsRegistersFiltersGeneric17Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 117;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric18 != 0)
                {
                    resultsRegistersFiltersGeneric18Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 118;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric19 != 0)
                {
                    resultsRegistersFiltersGeneric19Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 119;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric20 != 0)
                {
                    resultsRegistersFiltersGeneric20Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 120;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric21 != 0)
                {
                    resultsRegistersFiltersGeneric21Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 121;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric22 != 0)
                {
                    resultsRegistersFiltersGeneric22Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 122;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric23 != 0)
                {
                    resultsRegistersFiltersGeneric23Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 123;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric24 != 0)
                {
                    resultsRegistersFiltersGeneric24Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 124;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric25 != 0)
                {
                    resultsRegistersFiltersGeneric25Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 125;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric26 != 0)
                {
                    resultsRegistersFiltersGeneric26Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 126;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric27 != 0)
                {
                    resultsRegistersFiltersGeneric27Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 127;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric28 != 0)
                {
                    resultsRegistersFiltersGeneric28Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 128;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric29 != 0)
                {
                    resultsRegistersFiltersGeneric29Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 129;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric30 != 0)
                {
                    resultsRegistersFiltersGeneric30Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 130;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric31 != 0)
                {
                    resultsRegistersFiltersGeneric31Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 131;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric32 != 0)
                {
                    resultsRegistersFiltersGeneric32Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 132;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric33 != 0)
                {
                    resultsRegistersFiltersGeneric33Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 133;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric34 != 0)
                {
                    resultsRegistersFiltersGeneric34Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 134;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric35 != 0)
                {
                    resultsRegistersFiltersGeneric35Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 135;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric36 != 0)
                {
                    resultsRegistersFiltersGeneric36Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 136;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric37 != 0)
                {
                    resultsRegistersFiltersGeneric37Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 137;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric38 != 0)
                {
                    resultsRegistersFiltersGeneric38Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 138;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric39 != 0)
                {
                    resultsRegistersFiltersGeneric39Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 139;
                    });
                }
                if(gSystemConfig.enableRegistersFilterGeneric40 != 0)
                {
                    resultsRegistersFiltersGeneric40Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                        return obj.filter_index == 140;
                    });
                }


                //Debug.
                //console.log("ofglRecords=", ofglRecords);
            }catch(aError){
                if(gSystemConfig.configDebug === true)
                {
                    console.log("Error try/catch block (Registers Filters Generic)");
                    console.log("aError=", aError);
                }
            }finally{

            }
            //----------------------



            //(async function(){
                //Filters generic 1 - update.
                if(gSystemConfig.enableRegistersFilterGeneric1 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric1)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric1Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            /*registersFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_filters_generic;" + resultsRegistersFiltersGeneric1Listing[countArray].id + ";i", "id_record;" + tblRegistersID + ";i", "id_filter_index;101;i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            "id, id_filters_generic",
                                                                                            1);*/

                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                //return obj.id_filters_generic == resultsRegistersFiltersGeneric1Listing[countArray].id.toString() ;
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric1Listing[countArray].id.toString() && obj.id_filter_index == 101;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            //if(objIdsRegistersFiltersGeneric1Binding.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric1.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                //if(arrIdsRegistersFiltersGeneric1.includes(objIdsRegistersFiltersGeneric1Binding[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                    //await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ objIdsRegistersFiltersGeneric1Binding[0].id + ";i"]);
                                }

                                //Debug.
                                //console.log("status=full");
                                //console.log("registersFiltersGenericCheck=", registersFiltersGenericCheck);
                                //console.log("registersFiltersGenericCheck[0].id=", registersFiltersGenericCheck[0].id);
                                //console.log("includes=", arrIdsRegistersFiltersGeneric1.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()));
                            }else{

                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric1.includes(resultsRegistersFiltersGeneric1Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric1Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 101,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }


                            //Debug.
                            //let tblFiltersGenericBindingIDAwait = await FunctionsDB.counterUniversalUpdate_async(1);
                            
                            //console.log("resultsRegistersFiltersGeneric1Listing[].id=", resultsRegistersFiltersGeneric1Listing[countArray].id);
                            //console.log("tblFiltersGenericBindingIDAwait=", tblFiltersGenericBindingIDAwait);
                            //console.log("flagRegistersFiltersGenericInsert=", flagRegistersFiltersGenericInsert);
                            //console.log("objIdsRegistersFiltersGeneric1Binding=", objIdsRegistersFiltersGeneric1Binding);
                            //console.log("objIdsRegistersFiltersGenericBinding=", objIdsRegistersFiltersGenericBinding);
                            //console.log("registersFiltersGenericCheck=", registersFiltersGenericCheck);
                            
                        }

                        //Debug.
                        //console.log("resultsRegistersFiltersGeneric1Listing=", resultsRegistersFiltersGeneric1Listing);
                    }
                }


                //Filters generic 2 - update.
                /*
                if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric2)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric2Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_filters_generic;" + resultsRegistersFiltersGeneric2Listing[countArray].id + ";i", "id_record;" + tblRegistersID + ";i", "id_filter_index;102;i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            "id, id_filters_generic",
                                                                                            1);
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric2.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }

                                //Debug.
                                //console.log("status=full");
                                //console.log("registersFiltersGenericCheck=", registersFiltersGenericCheck);
                                //console.log("registersFiltersGenericCheck[0].id=", registersFiltersGenericCheck[0].id);
                                //console.log("includes=", arrIdsRegistersFiltersGeneric1.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()));
                            }else{

                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric2.includes(resultsRegistersFiltersGeneric1Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric2Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 102,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }


                            //Debug.
                            //let tblFiltersGenericBindingIDAwait = await FunctionsDB.counterUniversalUpdate_async(1);
                            
                            //console.log("resultsRegistersFiltersGeneric1Listing[].id=", resultsRegistersFiltersGeneric1Listing[countArray].id);
                            //console.log("tblFiltersGenericBindingIDAwait=", tblFiltersGenericBindingIDAwait);
                            console.log("flagRegistersFiltersGenericInsert=", flagRegistersFiltersGenericInsert);
                        }

                        //Debug.
                        //console.log("resultsRegistersFiltersGeneric1Listing=", resultsRegistersFiltersGeneric1Listing);
                    }
                }
                */
                //Filters generic 2 - update.
                if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric2)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric2Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric2Listing[countArray].id.toString() && obj.id_filter_index == 102;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric2.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric2.includes(resultsRegistersFiltersGeneric2Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric2Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 102,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 3 - update.
                if(gSystemConfig.enableRegistersFilterGeneric3 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric3)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric3Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric3Listing[countArray].id.toString() && obj.id_filter_index == 103;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric3.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric3.includes(resultsRegistersFiltersGeneric3Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric3Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 103,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 4 - update.
                if(gSystemConfig.enableRegistersFilterGeneric4 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric4)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric4Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric4Listing[countArray].id.toString() && obj.id_filter_index == 104;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric4.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric4.includes(resultsRegistersFiltersGeneric4Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric4Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 104,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 5 - update.
                if(gSystemConfig.enableRegistersFilterGeneric5 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric5)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric5Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric5Listing[countArray].id.toString() && obj.id_filter_index == 105;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric5.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric5.includes(resultsRegistersFiltersGeneric5Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric5Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 105,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 6 - update.
                if(gSystemConfig.enableRegistersFilterGeneric6 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric6)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric6Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric6Listing[countArray].id.toString() && obj.id_filter_index == 106;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric6.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric6.includes(resultsRegistersFiltersGeneric6Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric6Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 106,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 7 - update.
                if(gSystemConfig.enableRegistersFilterGeneric7 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric7)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric7Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric7Listing[countArray].id.toString() && obj.id_filter_index == 107;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric7.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric7.includes(resultsRegistersFiltersGeneric7Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric7Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 107,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 8 - update.
                if(gSystemConfig.enableRegistersFilterGeneric8 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric8)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric8Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric8Listing[countArray].id.toString() && obj.id_filter_index == 108;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric8.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric8.includes(resultsRegistersFiltersGeneric8Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric8Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 108,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 9 - update.
                if(gSystemConfig.enableRegistersFilterGeneric9 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric9)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric9Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric9Listing[countArray].id.toString() && obj.id_filter_index == 109;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric9.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric9.includes(resultsRegistersFiltersGeneric9Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric9Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 109,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 10 - update.
                if(gSystemConfig.enableRegistersFilterGeneric10 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric10)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric10Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric10Listing[countArray].id.toString() && obj.id_filter_index == 110;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric10.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric10.includes(resultsRegistersFiltersGeneric10Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric10Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 110,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 11 - update.
                if(gSystemConfig.enableRegistersFilterGeneric11 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric11)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric11Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric11Listing[countArray].id.toString() && obj.id_filter_index == 111;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric11.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric11.includes(resultsRegistersFiltersGeneric11Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric11Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 111,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 12 - update.
                if(gSystemConfig.enableRegistersFilterGeneric12 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric12)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric12Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric12Listing[countArray].id.toString() && obj.id_filter_index == 112;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric12.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric12.includes(resultsRegistersFiltersGeneric12Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric12Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 112,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 13 - update.
                if(gSystemConfig.enableRegistersFilterGeneric13 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric13)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric13Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric13Listing[countArray].id.toString() && obj.id_filter_index == 113;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric13.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric13.includes(resultsRegistersFiltersGeneric13Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric13Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 113,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 14 - update.
                if(gSystemConfig.enableRegistersFilterGeneric14 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric14)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric14Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric14Listing[countArray].id.toString() && obj.id_filter_index == 114;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric14.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric14.includes(resultsRegistersFiltersGeneric14Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric14Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 114,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 15 - update.
                if(gSystemConfig.enableRegistersFilterGeneric15 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric15)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric15Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric15Listing[countArray].id.toString() && obj.id_filter_index == 115;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric15.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric15.includes(resultsRegistersFiltersGeneric15Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric15Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 115,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 16 - update.
                if(gSystemConfig.enableRegistersFilterGeneric16 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric16)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric16Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric16Listing[countArray].id.toString() && obj.id_filter_index == 116;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric16.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric16.includes(resultsRegistersFiltersGeneric16Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric16Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 116,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 17 - update.
                if(gSystemConfig.enableRegistersFilterGeneric17 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric17)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric17Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric17Listing[countArray].id.toString() && obj.id_filter_index == 117;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric17.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric17.includes(resultsRegistersFiltersGeneric17Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric17Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 117,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 18 - update.
                if(gSystemConfig.enableRegistersFilterGeneric18 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric18)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric18Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric18Listing[countArray].id.toString() && obj.id_filter_index == 118;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric18.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric18.includes(resultsRegistersFiltersGeneric18Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric18Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 118,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 19 - update.
                if(gSystemConfig.enableRegistersFilterGeneric19 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric19)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric19Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric19Listing[countArray].id.toString() && obj.id_filter_index == 119;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric19.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric19.includes(resultsRegistersFiltersGeneric19Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric19Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 119,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 20 - update.
                if(gSystemConfig.enableRegistersFilterGeneric20 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric20)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric20Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric20Listing[countArray].id.toString() && obj.id_filter_index == 120;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric20.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric20.includes(resultsRegistersFiltersGeneric20Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric20Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 120,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 21 - update.
                if(gSystemConfig.enableRegistersFilterGeneric21 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric21)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric21Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric21Listing[countArray].id.toString() && obj.id_filter_index == 121;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric21.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric21.includes(resultsRegistersFiltersGeneric21Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric21Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 121,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 22 - update.
                if(gSystemConfig.enableRegistersFilterGeneric22 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric22)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric22Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric22Listing[countArray].id.toString() && obj.id_filter_index == 122;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric22.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric22.includes(resultsRegistersFiltersGeneric22Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric22Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 122,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 23 - update.
                if(gSystemConfig.enableRegistersFilterGeneric23 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric23)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric23Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric23Listing[countArray].id.toString() && obj.id_filter_index == 123;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric23.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric23.includes(resultsRegistersFiltersGeneric23Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric23Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 123,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 24 - update.
                if(gSystemConfig.enableRegistersFilterGeneric24 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric24)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric24Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric24Listing[countArray].id.toString() && obj.id_filter_index == 124;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric24.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric24.includes(resultsRegistersFiltersGeneric24Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric24Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 124,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 25 - update.
                if(gSystemConfig.enableRegistersFilterGeneric25 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric25)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric25Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric25Listing[countArray].id.toString() && obj.id_filter_index == 125;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric25.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric25.includes(resultsRegistersFiltersGeneric25Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric25Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 125,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 26 - update.
                if(gSystemConfig.enableRegistersFilterGeneric26 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric26)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric26Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric26Listing[countArray].id.toString() && obj.id_filter_index == 126;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric26.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric26.includes(resultsRegistersFiltersGeneric26Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric26Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 126,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 27 - update.
                if(gSystemConfig.enableRegistersFilterGeneric27 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric27)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric27Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric27Listing[countArray].id.toString() && obj.id_filter_index == 127;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric27.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric27.includes(resultsRegistersFiltersGeneric27Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric27Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 127,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 28 - update.
                if(gSystemConfig.enableRegistersFilterGeneric28 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric28)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric28Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric28Listing[countArray].id.toString() && obj.id_filter_index == 128;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric28.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric28.includes(resultsRegistersFiltersGeneric28Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric28Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 128,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 29 - update.
                if(gSystemConfig.enableRegistersFilterGeneric29 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric29)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric29Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric29Listing[countArray].id.toString() && obj.id_filter_index == 129;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric29.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric29.includes(resultsRegistersFiltersGeneric29Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric29Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 129,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 30 - update.
                if(gSystemConfig.enableRegistersFilterGeneric30 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric30)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric30Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric30Listing[countArray].id.toString() && obj.id_filter_index == 130;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric30.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric30.includes(resultsRegistersFiltersGeneric30Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric30Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 130,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 21 - update.
                if(gSystemConfig.enableRegistersFilterGeneric31 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric31)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric31Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric31Listing[countArray].id.toString() && obj.id_filter_index == 121;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric31.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric31.includes(resultsRegistersFiltersGeneric31Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric31Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 131,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 22 - update.
                if(gSystemConfig.enableRegistersFilterGeneric32 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric32)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric32Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric32Listing[countArray].id.toString() && obj.id_filter_index == 122;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric32.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric32.includes(resultsRegistersFiltersGeneric32Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric32Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 132,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 23 - update.
                if(gSystemConfig.enableRegistersFilterGeneric33 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric33)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric33Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric33Listing[countArray].id.toString() && obj.id_filter_index == 123;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric33.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric33.includes(resultsRegistersFiltersGeneric33Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric33Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 133,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 24 - update.
                if(gSystemConfig.enableRegistersFilterGeneric34 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric34)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric34Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric34Listing[countArray].id.toString() && obj.id_filter_index == 124;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric34.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric34.includes(resultsRegistersFiltersGeneric34Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric34Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 134,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 25 - update.
                if(gSystemConfig.enableRegistersFilterGeneric35 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric35)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric35Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric35Listing[countArray].id.toString() && obj.id_filter_index == 125;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric35.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric35.includes(resultsRegistersFiltersGeneric35Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric35Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 135,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 26 - update.
                if(gSystemConfig.enableRegistersFilterGeneric36 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric36)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric36Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric36Listing[countArray].id.toString() && obj.id_filter_index == 126;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric36.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric36.includes(resultsRegistersFiltersGeneric36Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric36Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 136,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 27 - update.
                if(gSystemConfig.enableRegistersFilterGeneric37 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric37)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric37Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric37Listing[countArray].id.toString() && obj.id_filter_index == 127;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric37.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric37.includes(resultsRegistersFiltersGeneric37Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric37Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 137,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 28 - update.
                if(gSystemConfig.enableRegistersFilterGeneric38 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric38)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric38Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric38Listing[countArray].id.toString() && obj.id_filter_index == 128;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric38.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric38.includes(resultsRegistersFiltersGeneric38Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric38Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 138,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }

                //Filters generic 29 - update.
                if(gSystemConfig.enableRegistersFilterGeneric39 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric39)
                    {

                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric39Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric39Listing[countArray].id.toString() && obj.id_filter_index == 129;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric39.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric39.includes(resultsRegistersFiltersGeneric39Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric39Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 139,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }
                
                //Filters generic 30 - update.
                if(gSystemConfig.enableRegistersFilterGeneric40 != 0)
                {
                    if(arrIdsRegistersFiltersGeneric40)
                    {
                        for(let countArray = 0; countArray < resultsRegistersFiltersGeneric40Listing.length; countArray++)
                        {
                            //Variables.
                            let registersFiltersGenericCheck = null;
                            let flagRegistersFiltersGenericInsert = true;

                            //Check records already selected.
                            registersFiltersGenericCheck = objIdsRegistersFiltersGenericBinding.filter(function(obj){
                                return obj.id_filters_generic == resultsRegistersFiltersGeneric40Listing[countArray].id.toString() && obj.id_filter_index == 130;
                            });
                            
                            //Update or delete existing bindings.
                            if(registersFiltersGenericCheck.length) //check if array is empty
                            {
                                if(arrIdsRegistersFiltersGeneric40.includes(registersFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                {
                                    //Update record with additional information or leave as it is.
                                    //TODO: update.
                                    flagRegistersFiltersGenericInsert = false;
                                }else{

                                    //Delete record.
                                    await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ registersFiltersGenericCheck[0].id + ";i"]);
                                }
                            }


                            //Insert new bindings. 
                            if(arrIdsRegistersFiltersGeneric40.includes(resultsRegistersFiltersGeneric40Listing[countArray].id.toString()))
                            {
                                if(flagRegistersFiltersGenericInsert == true)
                                {
                                    await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                        _tblFiltersGenericBindingID: "",
                                        _tblFiltersGenericBindingSortOrder: "",
                                        _tblFiltersGenericBindingDateCreation: "",
                                        _tblFiltersGenericBindingDateEdit: "",
                                        _tblFiltersGenericBindingIdFiltersGeneric: resultsRegistersFiltersGeneric40Listing[countArray].id,
                                        _tblFiltersGenericBindingIdFilterIndex: 140,
                                        _tblFiltersGenericBindingIdRecord: tblRegistersID,
                                        _tblFiltersGenericBindingNotes: ""
                                    });
                                }
                            }
                        }
                    }
                }                
            //})();


            strReturn = true;
        }
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let registersUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.registersUpdate_async({
                    _tblRegistersID: tblRegistersID,
                    _tblRegistersIdParent: tblRegistersIdParent,
                    _tblRegistersSortOrder: tblRegistersSortOrder,
                    _tblRegistersIdType: tblRegistersIdType,
                    _tblRegistersIdActivity: tblRegistersIdActivity,
                    _tblRegistersDateCreation: "",
                    _tblRegistersDateTimezone: "",
                    _tblRegistersDateEdit: "",
                    _tblRegistersIdRegisterUser: tblRegistersIdRegisterUser,
                    _tblRegistersIdRegister1: tblRegistersIdRegister1,
                    _tblRegistersIdRegister2: tblRegistersIdRegister2,
                    _tblRegistersIdRegister3: tblRegistersIdRegister3,
                    _tblRegistersIdRegister4: tblRegistersIdRegister4,
                    _tblRegistersIdRegister5: tblRegistersIdRegister5,
                    _tblRegistersType: tblRegistersType,
                    _tblRegistersNameTitle: tblRegistersNameTitle,
                    _tblRegistersNameFull: tblRegistersNameFull,
                    _tblRegistersNameFirst: tblRegistersNameFirst,
                    _tblRegistersNameLast: tblRegistersNameLast,
                    _tblRegistersCompanyNameLegal: tblRegistersCompanyNameLegal,
                    _tblRegistersCompanyNameAlias: tblRegistersCompanyNameAlias,
                    _tblRegistersDescription: tblRegistersDescription,
                    _tblRegistersURLAlias: tblRegistersURLAlias,
                    _tblRegistersKeywordsTags: tblRegistersKeywordsTags,
                    _tblRegistersMetaDescription: tblRegistersMetaDescription,
                    _tblRegistersMetaTitle: tblRegistersMetaTitle,
                    _tblRegistersMetaInfo: tblRegistersMetaInfo,
                    _tblRegistersDateBirth: tblRegistersDateBirth,
                    _tblRegistersGender: tblRegistersGender,
                    _tblRegistersHeight: tblRegistersHeight,
                    _tblRegistersWeight: tblRegistersWeight,
                    _tblRegistersDocumentType: tblRegistersDocumentType,
                    _tblRegistersDocument: tblRegistersDocument,
                    _tblRegistersDocument1Type: tblRegistersDocument1Type,
                    _tblRegistersDocument1: tblRegistersDocument1,
                    _tblRegistersDocument2Type: tblRegistersDocument2Type,
                    _tblRegistersDocument2: tblRegistersDocument2,
                    _tblRegistersDocumentCompanyType: tblRegistersDocumentCompanyType,
                    _tblRegistersDocumentCompany: tblRegistersDocumentCompany,
                    _tblRegistersDocumentCompany1Type: tblRegistersDocumentCompany1Type,
                    _tblRegistersDocumentCompany1: tblRegistersDocumentCompany1,
                    _tblRegistersDocumentCompany2Type: tblRegistersDocumentCompany2Type,
                    _tblRegistersDocumentCompany2: tblRegistersDocumentCompany2,
                    _tblRegistersZipCode: tblRegistersZipCode,
                    _tblRegistersAddressStreet: tblRegistersAddressStreet,
                    _tblRegistersAddressNumber: tblRegistersAddressNumber,
                    _tblRegistersAddressComplement: tblRegistersAddressComplement,
                    _tblRegistersNeighborhood: tblRegistersNeighborhood,
                    _tblRegistersDistrict: tblRegistersDistrict,
                    _tblRegistersCounty: tblRegistersCounty,
                    _tblRegistersCity: tblRegistersCity,
                    _tblRegistersState: tblRegistersState,
                    _tblRegistersCountry: tblRegistersCountry,
                    _tblRegistersIdStreet: tblRegistersIdStreet,
                    _tblRegistersIdNeighborhood: tblRegistersIdNeighborhood,
                    _tblRegistersIdDistrict: tblRegistersIdDistrict,
                    _tblRegistersIdCounty: tblRegistersIdCounty,
                    _tblRegistersIdCity: tblRegistersIdCity,
                    _tblRegistersIdState: tblRegistersIdState,
                    _tblRegistersIdCountry: tblRegistersIdCountry,
                    _tblRegistersLocationReference: tblRegistersLocationReference,
                    _tblRegistersLocationMap: tblRegistersLocationMap,
                    _tblRegistersPhone1InternationalCode: tblRegistersPhone1InternationalCode,
                    _tblRegistersPhone1AreaCode: tblRegistersPhone1AreaCode,
                    _tblRegistersPhone1: tblRegistersPhone1,
                    _tblRegistersPhone2InternationalCode: tblRegistersPhone2InternationalCode,
                    _tblRegistersPhone2AreaCode: tblRegistersPhone2AreaCode,
                    _tblRegistersPhone2: tblRegistersPhone2,
                    _tblRegistersPhone3InternationalCode: tblRegistersPhone3InternationalCode,
                    _tblRegistersPhone3AreaCode: tblRegistersPhone3AreaCode,
                    _tblRegistersPhone3: tblRegistersPhone3,
                    _tblRegistersWebsite: tblRegistersWebsite,
                    _tblRegistersUsername: tblRegistersUsername,
                    _tblRegistersEmail: tblRegistersEmail,
                    _tblRegistersPassword: tblRegistersPassword,
                    _tblRegistersPasswordHint: tblRegistersPasswordHint,
                    _tblRegistersPasswordLength: tblRegistersPasswordLength,
                    _tblRegistersInfo1: tblRegistersInfo1,
                    _tblRegistersInfo2: tblRegistersInfo2,
                    _tblRegistersInfo3: tblRegistersInfo3,
                    _tblRegistersInfo4: tblRegistersInfo4,
                    _tblRegistersInfo5: tblRegistersInfo5,
                    _tblRegistersInfo6: tblRegistersInfo6,
                    _tblRegistersInfo7: tblRegistersInfo7,
                    _tblRegistersInfo8: tblRegistersInfo8,
                    _tblRegistersInfo9: tblRegistersInfo9,
                    _tblRegistersInfo10: tblRegistersInfo10,
                    _tblRegistersInfo11: tblRegistersInfo11,
                    _tblRegistersInfo12: tblRegistersInfo12,
                    _tblRegistersInfo13: tblRegistersInfo13,
                    _tblRegistersInfo14: tblRegistersInfo14,
                    _tblRegistersInfo15: tblRegistersInfo15,
                    _tblRegistersInfo16: tblRegistersInfo16,
                    _tblRegistersInfo17: tblRegistersInfo17,
                    _tblRegistersInfo18: tblRegistersInfo18,
                    _tblRegistersInfo19: tblRegistersInfo19,
                    _tblRegistersInfo20: tblRegistersInfo20,
                    _tblRegistersInfoSmall1: tblRegistersInfoSmall1,
                    _tblRegistersInfoSmall2: tblRegistersInfoSmall2,
                    _tblRegistersInfoSmall3: tblRegistersInfoSmall3,
                    _tblRegistersInfoSmall4: tblRegistersInfoSmall4,
                    _tblRegistersInfoSmall5: tblRegistersInfoSmall5,
                    _tblRegistersInfoSmall6: tblRegistersInfoSmall6,
                    _tblRegistersInfoSmall7: tblRegistersInfoSmall7,
                    _tblRegistersInfoSmall8: tblRegistersInfoSmall8,
                    _tblRegistersInfoSmall9: tblRegistersInfoSmall9,
                    _tblRegistersInfoSmall10: tblRegistersInfoSmall10,
                    _tblRegistersInfoSmall11: tblRegistersInfoSmall11,
                    _tblRegistersInfoSmall12: tblRegistersInfoSmall12,
                    _tblRegistersInfoSmall13: tblRegistersInfoSmall13,
                    _tblRegistersInfoSmall14: tblRegistersInfoSmall14,
                    _tblRegistersInfoSmall15: tblRegistersInfoSmall15,
                    _tblRegistersInfoSmall16: tblRegistersInfoSmall16,
                    _tblRegistersInfoSmall17: tblRegistersInfoSmall17,
                    _tblRegistersInfoSmall18: tblRegistersInfoSmall18,
                    _tblRegistersInfoSmall19: tblRegistersInfoSmall19,
                    _tblRegistersInfoSmall20: tblRegistersInfoSmall20,
                    _tblRegistersInfoSmall21: tblRegistersInfoSmall21,
                    _tblRegistersInfoSmall22: tblRegistersInfoSmall22,
                    _tblRegistersInfoSmall23: tblRegistersInfoSmall23,
                    _tblRegistersInfoSmall24: tblRegistersInfoSmall24,
                    _tblRegistersInfoSmall25: tblRegistersInfoSmall25,
                    _tblRegistersInfoSmall26: tblRegistersInfoSmall26,
                    _tblRegistersInfoSmall27: tblRegistersInfoSmall27,
                    _tblRegistersInfoSmall28: tblRegistersInfoSmall28,
                    _tblRegistersInfoSmall29: tblRegistersInfoSmall29,
                    _tblRegistersInfoSmall30: tblRegistersInfoSmall30,
                    _tblRegistersNumber1: tblRegistersNumber1,
                    _tblRegistersNumber2: tblRegistersNumber2,
                    _tblRegistersNumber3: tblRegistersNumber3,
                    _tblRegistersNumber4: tblRegistersNumber4,
                    _tblRegistersNumber5: tblRegistersNumber5,
                    _tblRegistersNumberSmall1: tblRegistersNumberSmall1,
                    _tblRegistersNumberSmall2: tblRegistersNumberSmall2,
                    _tblRegistersNumberSmall3: tblRegistersNumberSmall3,
                    _tblRegistersNumberSmall4: tblRegistersNumberSmall4,
                    _tblRegistersNumberSmall5: tblRegistersNumberSmall5,
                    _tblRegistersURL1: tblRegistersURL1,
                    _tblRegistersURL2: tblRegistersURL2,
                    _tblRegistersURL3: tblRegistersURL3,
                    _tblRegistersURL4: tblRegistersURL4,
                    _tblRegistersURL5: tblRegistersURL5,
                    _tblRegistersDate1: tblRegistersDate1,
                    _tblRegistersDate2: tblRegistersDate2,
                    _tblRegistersDate3: tblRegistersDate3,
                    _tblRegistersDate4: tblRegistersDate4,
                    _tblRegistersDate5: tblRegistersDate5,
                    _tblRegistersDate6: tblRegistersDate6,
                    _tblRegistersDate7: tblRegistersDate7,
                    _tblRegistersDate8: tblRegistersDate8,
                    _tblRegistersDate9: tblRegistersDate9,
                    _tblRegistersDate10: tblRegistersDate10,
                    _tblRegistersImageMain: tblRegistersImageMain,
                    _tblRegistersImageMainCaption: tblRegistersImageMainCaption,
                    _tblRegistersImageLogo: tblRegistersImageLogo,
                    _tblRegistersImageBanner: tblRegistersImageBanner,
                    _tblRegistersFile1: tblRegistersImageFile1,
                    _tblRegistersFile2: tblRegistersImageFile2,
                    _tblRegistersFile3: tblRegistersImageFile3,
                    _tblRegistersFile4: tblRegistersImageFile4,
                    _tblRegistersFile5: tblRegistersImageFile5,
                    _tblRegistersActivation: tblRegistersActivation,
                    _tblRegistersActivation1: tblRegistersActivation1,
                    _tblRegistersActivation2: tblRegistersActivation2,
                    _tblRegistersActivation3: tblRegistersActivation3,
                    _tblRegistersActivation4: tblRegistersActivation4,
                    _tblRegistersActivation5: tblRegistersActivation5,
                    _tblRegistersIdStatus: tblRegistersIdStatus,
                    _tblRegistersRestrictedAccess: tblRegistersRestrictedAccess,
                    _tblRegistersNotes: tblRegistersNotes,
                    _arrIdsRegistersFiltersGeneric1: arrIdsRegistersFiltersGeneric1,
                    _arrIdsRegistersFiltersGeneric2: arrIdsRegistersFiltersGeneric2,
                    _arrIdsRegistersFiltersGeneric3: arrIdsRegistersFiltersGeneric3,
                    _arrIdsRegistersFiltersGeneric4: arrIdsRegistersFiltersGeneric4,
                    _arrIdsRegistersFiltersGeneric5: arrIdsRegistersFiltersGeneric5,
                    _arrIdsRegistersFiltersGeneric6: arrIdsRegistersFiltersGeneric6,
                    _arrIdsRegistersFiltersGeneric7: arrIdsRegistersFiltersGeneric7,
                    _arrIdsRegistersFiltersGeneric8: arrIdsRegistersFiltersGeneric8,
                    _arrIdsRegistersFiltersGeneric9: arrIdsRegistersFiltersGeneric9,
                    _arrIdsRegistersFiltersGeneric10: arrIdsRegistersFiltersGeneric10,
                    _arrIdsRegistersFiltersGeneric11: arrIdsRegistersFiltersGeneric11,
                    _arrIdsRegistersFiltersGeneric12: arrIdsRegistersFiltersGeneric12,
                    _arrIdsRegistersFiltersGeneric13: arrIdsRegistersFiltersGeneric13,
                    _arrIdsRegistersFiltersGeneric14: arrIdsRegistersFiltersGeneric14,
                    _arrIdsRegistersFiltersGeneric15: arrIdsRegistersFiltersGeneric15,
                    _arrIdsRegistersFiltersGeneric16: arrIdsRegistersFiltersGeneric16,
                    _arrIdsRegistersFiltersGeneric17: arrIdsRegistersFiltersGeneric17,
                    _arrIdsRegistersFiltersGeneric18: arrIdsRegistersFiltersGeneric18,
                    _arrIdsRegistersFiltersGeneric19: arrIdsRegistersFiltersGeneric19,
                    _arrIdsRegistersFiltersGeneric20: arrIdsRegistersFiltersGeneric20,
                    _arrIdsRegistersFiltersGeneric21: arrIdsRegistersFiltersGeneric21,
                    _arrIdsRegistersFiltersGeneric22: arrIdsRegistersFiltersGeneric22,
                    _arrIdsRegistersFiltersGeneric23: arrIdsRegistersFiltersGeneric23,
                    _arrIdsRegistersFiltersGeneric24: arrIdsRegistersFiltersGeneric24,
                    _arrIdsRegistersFiltersGeneric25: arrIdsRegistersFiltersGeneric25,
                    _arrIdsRegistersFiltersGeneric26: arrIdsRegistersFiltersGeneric26,
                    _arrIdsRegistersFiltersGeneric27: arrIdsRegistersFiltersGeneric27,
                    _arrIdsRegistersFiltersGeneric28: arrIdsRegistersFiltersGeneric28,
                    _arrIdsRegistersFiltersGeneric29: arrIdsRegistersFiltersGeneric29,
                    _arrIdsRegistersFiltersGeneric30: arrIdsRegistersFiltersGeneric30,
                    _arrIdsRegistersFiltersGeneric31: arrIdsRegistersFiltersGeneric31,
                    _arrIdsRegistersFiltersGeneric32: arrIdsRegistersFiltersGeneric32,
                    _arrIdsRegistersFiltersGeneric33: arrIdsRegistersFiltersGeneric33,
                    _arrIdsRegistersFiltersGeneric34: arrIdsRegistersFiltersGeneric34,
                    _arrIdsRegistersFiltersGeneric35: arrIdsRegistersFiltersGeneric35,
                    _arrIdsRegistersFiltersGeneric36: arrIdsRegistersFiltersGeneric36,
                    _arrIdsRegistersFiltersGeneric37: arrIdsRegistersFiltersGeneric37,
                    _arrIdsRegistersFiltersGeneric38: arrIdsRegistersFiltersGeneric38,
                    _arrIdsRegistersFiltersGeneric39: arrIdsRegistersFiltersGeneric39,
                    _arrIdsRegistersFiltersGeneric40: arrIdsRegistersFiltersGeneric40
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


    //Quizzes - update record.
    //**************************************************************************************
    /**
     * Quizzes - update record.
     * @static
     * @async
     * @param {object} _tblQuizzesDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async quizzesUpdate_async(_tblQuizzesDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblQuizzesDataObject = {};

        //Details - default values.
        let tblQuizzesID = "";
        let tblQuizzesIdParent = "";
        let tblQuizzesSortOrder = 0;
    
        let tblQuizzesDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //let tblQuizzesDateTimezone = "";
        let tblQuizzesDateEdit = "";

        let tblQuizzesIdType = 0; 

        let tblQuizzesIdRegisterUser = 0;

        let tblQuizzesTitle = "";
        let tblQuizzesDescription = "";
    
        let tblQuizzesURLAlias = "";
        let tblQuizzesKeywordsTags = "";
        let tblQuizzesMetaDescription = "";
        let tblQuizzesMetaTitle = "";
        let tblQuizzesMetaInfo = "";

        let tblQuizzesInfo1 = "";
        let tblQuizzesInfo2 = "";
        let tblQuizzesInfo3 = "";
        let tblQuizzesInfo4 = "";
        let tblQuizzesInfo5 = "";
    
        let tblQuizzesNumber1 = 0;
        let tblQuizzesNumber2 = 0;
        let tblQuizzesNumber3 = 0;
        let tblQuizzesNumber4 = 0;
        let tblQuizzesNumber5 = 0;

        let tblQuizzesImageMain = "";
        let tblQuizzesImageMainCaption = "";

        let tblQuizzesActivation = 1;
        let tblQuizzesActivation1 = 0;
        let tblQuizzesActivation2 = 0;
        let tblQuizzesActivation3 = 0;
        let tblQuizzesActivation4 = 0;
        let tblQuizzesActivation5 = 0;
        
        let tblQuizzesIdStatus = 0;
        let tblQuizzesNotes = "";

        let strSQLQuizzesUpdate = "";
        let strSQLQuizzesUpdateParams = {};
        let resultsSQLQuizzesUpdate = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblQuizzesDataObject = _tblQuizzesDataObject;
        tblQuizzesID = tblQuizzesDataObject._tblQuizzesID;

        tblQuizzesIdParent = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesIdParent") === true) ? tblQuizzesDataObject._tblQuizzesIdParent : tblQuizzesIdParent;

        //tblQuizzesSortOrder = tblQuizzesDataObject._tblQuizzesSortOrder;
        tblQuizzesSortOrder = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesSortOrder") === true) ? tblQuizzesDataObject._tblQuizzesSortOrder : tblQuizzesSortOrder;
        if(!tblQuizzesSortOrder)
        {
            tblQuizzesSortOrder = 0;
        }


        /*tblQuizzesDateCreation = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesDateCreation") === true) ? tblQuizzesDataObject._tblQuizzesDateCreation : tblQuizzesDateCreation; //x = condition ? true : false (default value declared)
        if(!tblQuizzesDateCreation)
        {
            let tblQuizzesDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblQuizzesDateCreation = FunctionsGeneric.dateSQLWrite(tblQuizzesDateCreation_dateObj);
        }*/

        //tblQuizzesDateTimezone = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesDateTimezone") === true) ? tblQuizzesDataObject._tblQuizzesDateTimezone : tblQuizzesDateTimezone;
        
        tblQuizzesDateEdit = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesDateEdit") === true) ? tblQuizzesDataObject._tblQuizzesDateEdit : tblQuizzesDateEdit;
        if(!tblQuizzesDateEdit)
        {
            let tblQuizzesDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblQuizzesDateEdit = FunctionsGeneric.dateSQLWrite(tblQuizzesDateEdit_dateObj);
        }

        tblQuizzesIdType = tblQuizzesDataObject._tblQuizzesIdType;

        tblQuizzesIdRegisterUser = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesIdRegisterUser") === true) ? tblQuizzesDataObject._tblQuizzesIdRegisterUser : tblQuizzesIdRegisterUser;
        if(!tblQuizzesIdRegisterUser)
        {
            tblQuizzesIdRegisterUser = 0;
        }

        tblQuizzesTitle = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesTitle, "db_write_text") : tblQuizzesTitle;
        tblQuizzesDescription = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesDescription, "db_write_text") : tblQuizzesDescription;
        
        tblQuizzesURLAlias = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesURLAlias") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesURLAlias, "db_write_text") : tblQuizzesURLAlias;
        tblQuizzesKeywordsTags = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesKeywordsTags") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesKeywordsTags, "db_write_text") : tblQuizzesKeywordsTags;
        tblQuizzesMetaDescription = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesMetaDescription") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesMetaDescription, "db_write_text") : tblQuizzesMetaDescription;
        tblQuizzesMetaTitle = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesMetaTitle, "db_write_text") : tblQuizzesMetaTitle;
        tblQuizzesMetaInfo = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesMetaTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesMetaInfo, "db_write_text") : tblQuizzesMetaInfo;
        
        if(gSystemConfig.configQuizzesInfo1FieldType == 1 || gSystemConfig.configQuizzesInfo1FieldType == 2)
        {
            tblQuizzesInfo1 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo1, "db_write_text") : tblQuizzesInfo1;
        }
        if(gSystemConfig.configQuizzesInfo1FieldType == 11 || gSystemConfig.configQuizzesInfo1FieldType == 12)
        {
            tblQuizzesInfo1 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo1, "db_write_text"), 2) : tblQuizzesInfo1;
        }

        if(gSystemConfig.configQuizzesInfo2FieldType == 1 || gSystemConfig.configQuizzesInfo2FieldType == 2)
        {
            tblQuizzesInfo2 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo2, "db_write_text") : tblQuizzesInfo2;
        }
        if(gSystemConfig.configQuizzesInfo2FieldType == 11 || gSystemConfig.configQuizzesInfo2FieldType == 12)
        {
            tblQuizzesInfo2 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo2, "db_write_text"), 2) : tblQuizzesInfo2;
        }

        if(gSystemConfig.configQuizzesInfo3FieldType == 1 || gSystemConfig.configQuizzesInfo3FieldType == 2)
        {
            tblQuizzesInfo3 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo3, "db_write_text") : tblQuizzesInfo3;
        }
        if(gSystemConfig.configQuizzesInfo3FieldType == 11 || gSystemConfig.configQuizzesInfo3FieldType == 12)
        {
            tblQuizzesInfo3 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo3, "db_write_text"), 2) : tblQuizzesInfo3;
        }

        if(gSystemConfig.configQuizzesInfo4FieldType == 1 || gSystemConfig.configQuizzesInfo4FieldType == 2)
        {
            tblQuizzesInfo4 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo4, "db_write_text") : tblQuizzesInfo4;
        }
        if(gSystemConfig.configQuizzesInfo4FieldType == 11 || gSystemConfig.configQuizzesInfo4FieldType == 12)
        {
            tblQuizzesInfo4 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo4, "db_write_text"), 2) : tblQuizzesInfo1;
        }

        if(gSystemConfig.configQuizzesInfo5FieldType == 1 || gSystemConfig.configQuizzesInfo5FieldType == 2)
        {
            tblQuizzesInfo5 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo5, "db_write_text") : tblQuizzesInfo5;
        }
        if(gSystemConfig.configQuizzesInfo5FieldType == 11 || gSystemConfig.configQuizzesInfo5FieldType == 12)
        {
            tblQuizzesInfo5 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesInfo5, "db_write_text"), 2) : tblQuizzesInfo5;
        }
        
        tblQuizzesNumber1 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesNumber1") === true && (tblQuizzesDataObject._tblQuizzesNumber1)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesDataObject._tblQuizzesNumber1, gSystemConfig.configQuizzesNumber1FieldType) : tblQuizzesNumber1;
        tblQuizzesNumber2 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesNumber2") === true && (tblQuizzesDataObject._tblQuizzesNumber2)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesDataObject._tblQuizzesNumber2, gSystemConfig.configQuizzesNumber2FieldType) : tblQuizzesNumber2;
        tblQuizzesNumber3 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesNumber3") === true && (tblQuizzesDataObject._tblQuizzesNumber3)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesDataObject._tblQuizzesNumber3, gSystemConfig.configQuizzesNumber3FieldType) : tblQuizzesNumber3;
        tblQuizzesNumber4 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesNumber4") === true && (tblQuizzesDataObject._tblQuizzesNumber4)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesDataObject._tblQuizzesNumber4, gSystemConfig.configQuizzesNumber4FieldType) : tblQuizzesNumber4;
        tblQuizzesNumber5 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesNumber5") === true && (tblQuizzesDataObject._tblQuizzesNumber5)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesDataObject._tblQuizzesNumber5, gSystemConfig.configQuizzesNumber5FieldType) : tblQuizzesNumber5;
        
        tblQuizzesImageMain = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesImageMain") === true) ? tblQuizzesDataObject._tblQuizzesImageMain : tblQuizzesImageMain;
        tblQuizzesImageMainCaption = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesImageMainCaption") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesImageMainCaption, "db_write_text") : tblQuizzesImageMainCaption;
        
        tblQuizzesActivation = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesActivation") === true && (tblQuizzesDataObject._tblQuizzesActivation)) ? tblQuizzesDataObject._tblQuizzesActivation : tblQuizzesActivation;
        tblQuizzesActivation1 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesActivation1") === true && (tblQuizzesDataObject._tblQuizzesActivation1)) ? tblQuizzesDataObject._tblQuizzesActivation1 : tblQuizzesActivation1;
        tblQuizzesActivation2 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesActivation2") === true && (tblQuizzesDataObject._tblQuizzesActivation2)) ? tblQuizzesDataObject._tblQuizzesActivation2 : tblQuizzesActivation2;
        tblQuizzesActivation3 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesActivation3") === true && (tblQuizzesDataObject._tblQuizzesActivation3)) ? tblQuizzesDataObject._tblQuizzesActivation3 : tblQuizzesActivation3;
        tblQuizzesActivation4 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesActivation5") === true && (tblQuizzesDataObject._tblQuizzesActivation4)) ? tblQuizzesDataObject._tblQuizzesActivation4 : tblQuizzesActivation5;
        tblQuizzesActivation5 = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesActivation5") === true && (tblQuizzesDataObject._tblQuizzesActivation5)) ? tblQuizzesDataObject._tblQuizzesActivation5 : tblQuizzesActivation5;
        
        tblQuizzesIdStatus = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesIdStatus") === true && (tblQuizzesDataObject._tblQuizzesIdStatus)) ? tblQuizzesDataObject._tblQuizzesIdStatus : tblQuizzesIdStatus;
        tblQuizzesNotes = (tblQuizzesDataObject.hasOwnProperty("_tblQuizzesNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesDataObject._tblQuizzesNotes, "db_write_text") : tblQuizzesNotes;
        
        //----------------------


        //Query.
        //----------------------
        //strSQLCategoriesUpdate += "INSERT INTO " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "categories";
        strSQLQuizzesUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableQuizzes + " ";
        strSQLQuizzesUpdate += "SET ? ";
        strSQLQuizzesUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLQuizzesUpdateParams.id = tblQuizzesID;

        //strSQLQuizzesUpdateParams.id = tblQuizzesID;
        strSQLQuizzesUpdateParams.id_parent = tblQuizzesIdParent;
        strSQLQuizzesUpdateParams.sort_order = tblQuizzesSortOrder;

        //strSQLQuizzesUpdateParams.date_creation = tblQuizzesDateCreation;
        //strSQLQuizzesUpdateParams.date_timezone = tblQuizzesDateTimezone;
        strSQLQuizzesUpdateParams.date_edit = tblQuizzesDateEdit;

        strSQLQuizzesUpdateParams.id_type = tblQuizzesIdType;

        strSQLQuizzesUpdateParams.id_register_user = tblQuizzesIdRegisterUser;

        strSQLQuizzesUpdateParams.title = tblQuizzesTitle;
        strSQLQuizzesUpdateParams.description = tblQuizzesDescription;

        strSQLQuizzesUpdateParams.url_alias = tblQuizzesURLAlias;
        strSQLQuizzesUpdateParams.keywords_tags = tblQuizzesKeywordsTags;
        strSQLQuizzesUpdateParams.meta_description = tblQuizzesMetaDescription;
        strSQLQuizzesUpdateParams.meta_title = tblQuizzesMetaTitle;
        strSQLQuizzesUpdateParams.meta_info = tblQuizzesMetaInfo;

        strSQLQuizzesUpdateParams.info1 = tblQuizzesInfo1;
        strSQLQuizzesUpdateParams.info2 = tblQuizzesInfo2;
        strSQLQuizzesUpdateParams.info3 = tblQuizzesInfo3;
        strSQLQuizzesUpdateParams.info4 = tblQuizzesInfo4;
        strSQLQuizzesUpdateParams.info5 = tblQuizzesInfo5;

        strSQLQuizzesUpdateParams.number1 = tblQuizzesNumber1;
        strSQLQuizzesUpdateParams.number2 = tblQuizzesNumber2;
        strSQLQuizzesUpdateParams.number3 = tblQuizzesNumber3;
        strSQLQuizzesUpdateParams.number4 = tblQuizzesNumber4;
        strSQLQuizzesUpdateParams.number5 = tblQuizzesNumber5;

        if(tblQuizzesImageMain)
        {
            strSQLQuizzesUpdateParams.image_main = tblQuizzesImageMain;
        }

        strSQLQuizzesUpdateParams.image_main_caption = tblQuizzesImageMainCaption;

        strSQLQuizzesUpdateParams.activation = tblQuizzesActivation;
        strSQLQuizzesUpdateParams.activation1 = tblQuizzesActivation1;
        strSQLQuizzesUpdateParams.activation2 = tblQuizzesActivation2;
        strSQLQuizzesUpdateParams.activation3 = tblQuizzesActivation3;
        strSQLQuizzesUpdateParams.activation4 = tblQuizzesActivation4;
        strSQLQuizzesUpdateParams.activation5 = tblQuizzesActivation5;
        
        strSQLQuizzesUpdateParams.id_status = tblQuizzesIdStatus;
        strSQLQuizzesUpdateParams.notes = tblQuizzesNotes;
        //----------------------


        //Execute query.
        //----------------------
        try
        {
            resultsSQLQuizzesUpdate = await new Promise((resolve, reject)=>{
                dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                    if(dbSystemPoolError)
                    {
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                        }
                        throw dbSystemPoolError;
                    }else{

                        //dbSystemCon.query(strSQLQuizzesUpdate, strSQLQuizzesUpdateParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.query(strSQLQuizzesUpdate, [strSQLQuizzesUpdateParams, tblQuizzesID], (dbSystemError, results) => {
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
                                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    }

                                    //Return promise.
                                    resolve(results);
                                }else{
                                    //Error.
                                    //reject(false);
                                    reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Return data treatment.
        //----------------------
        if(resultsSQLQuizzesUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let quizzesUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.quizzesUpdate_async({
                    _tblQuizzesID: tblQuizzesID,
                    _tblQuizzesIdParent: tblQuizzesIdParent,
                    _tblQuizzesSortOrder: tblQuizzesSortOrder,
                    _tblQuizzesDateCreation: "",
                    _tblQuizzesDateEdit: "",
                    _tblQuizzesIdType: tblQuizzesIdType,
                    _tblQuizzesIdRegisterUser: "0",
                    _tblQuizzesTitle: tblQuizzesTitle,
                    _tblQuizzesDescription: tblQuizzesDescription,
                    _tblQuizzesURLAlias: tblQuizzesURLAlias,
                    _tblQuizzesKeywordsTags: tblQuizzesKeywordsTags,
                    _tblQuizzesMetaDescription: tblQuizzesMetaDescription,
                    _tblQuizzesMetaTitle: tblQuizzesMetaTitle,
                    _tblQuizzesMetaInfo: "",
                    _tblQuizzesInfo1: tblQuizzesInfo1,
                    _tblQuizzesInfo2: tblQuizzesInfo2,
                    _tblQuizzesInfo3: tblQuizzesInfo3,
                    _tblQuizzesInfo4: tblQuizzesInfo4,
                    _tblQuizzesInfo5: tblQuizzesInfo5,
                    _tblQuizzesNumber1: tblQuizzesNumber1,
                    _tblQuizzesNumber2: tblQuizzesNumber2,
                    _tblQuizzesNumber3: tblQuizzesNumber3,
                    _tblQuizzesNumber4: tblQuizzesNumber4,
                    _tblQuizzesNumber5: tblQuizzesNumber5,
                    _tblQuizzesImageMain: tblQuizzesImageMain,
                    _tblQuizzesImageMainCaption: tblQuizzesImageMainCaption,
                    _tblQuizzesActivation: tblQuizzesActivation,
                    _tblQuizzesActivation1: tblQuizzesActivation1,
                    _tblQuizzesActivation2: tblQuizzesActivation2,
                    _tblQuizzesActivation3: tblQuizzesActivation3,
                    _tblQuizzesActivation4: tblQuizzesActivation4,
                    _tblQuizzesActivation5: tblQuizzesActivation5,
                    _tblQuizzesIdStatus: tblQuizzesIdStatus,
                    _tblQuizzesNotes: tblQuizzesNotes
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


    //Quizzes Options - update record.
    //**************************************************************************************
    /**
     * Quizzes Options - update record.
     * @static
     * @async
     * @param {object} _tblQuizzesOptionsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async quizzesOptionsUpdate_async(_tblQuizzesOptionsDataObject)
    {
        //Variables.
        //----------------------
        let strReturn = false;

        let tblQuizzesOptionsDataObject = {};

        //Details - default values.
        let tblQuizzesOptionsID = "";
        let tblQuizzesOptionsIdQuizzes = "";
        let tblQuizzesOptionsSortOrder = 0;
        
        let tblQuizzesOptionsDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        //let tblQuizzesOptionsDateTimezone = "";
        let tblQuizzesOptionsDateEdit = "";

        let tblQuizzesOptionsTitle = "";

        let tblQuizzesOptionsInfo1 = "";
        let tblQuizzesOptionsInfo2 = "";
        let tblQuizzesOptionsInfo3 = "";
        let tblQuizzesOptionsInfo4 = "";
        let tblQuizzesOptionsInfo5 = "";

        let tblQuizzesOptionsNumber1 = 0;
        let tblQuizzesOptionsNumber2 = 0;
        let tblQuizzesOptionsNumber3 = 0;
        let tblQuizzesOptionsNumber4 = 0;
        let tblQuizzesOptionsNumber5 = 0;
        
        let tblQuizzesOptionsImageMain = "";
    
        let tblQuizzesOptionsActivation = 0;
    
        let strSQLQuizzesOptionsUpdate = "";
        let strSQLQuizzesOptionsUpdateParams = {};
        let resultsSQLQuizzesOptionsUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {

            //Debug.
            //console.log("ofglRecords=", ofglRecords);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblQuizzesOptionsDataObject = _tblQuizzesOptionsDataObject;

        tblQuizzesOptionsID = tblQuizzesOptionsDataObject._tblQuizzesOptionsID;
        
        tblQuizzesOptionsIdQuizzes = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsIdQuizzes") === true) ? tblQuizzesOptionsDataObject._tblQuizzesOptionsIdQuizzes : tblQuizzesOptionsIdQuizzes;
        tblQuizzesOptionsSortOrder = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsSortOrder") === true) ? tblQuizzesOptionsDataObject._tblQuizzesOptionsSortOrder : tblQuizzesOptionsSortOrder;
        if(!tblQuizzesOptionsSortOrder)
        {
            tblQuizzesOptionsSortOrder = 0;
        }

        /*
        tblQuizzesOptionsDateCreation = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsDateCreation") === true) ? tblQuizzesOptionsDataObject._tblQuizzesOptionsDateCreation : tblQuizzesOptionsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblQuizzesOptionsDateCreation)
        {
            let tblQuizzesOptionsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblQuizzesOptionsDateCreation = FunctionsGeneric.dateSQLWrite(tblQuizzesOptionsDateCreation_dateObj);
        }

        tblQuizzesOptionsDateTimezone = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsDateTimezone") === true) ? tblQuizzesOptionsDataObject._tblQuizzesOptionsDateTimezone : tblQuizzesOptionsDateTimezone;
        */

        tblQuizzesOptionsDateEdit = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsDateEdit") === true) ? tblQuizzesOptionsDataObject._tblQuizzesOptionsDateEdit : tblQuizzesOptionsDateEdit;
        if(!tblQuizzesOptionsDateEdit)
        {
            let tblQuizzesOptionsDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblQuizzesOptionsDateEdit = FunctionsGeneric.dateSQLWrite(tblQuizzesOptionsDateEdit_dateObj);
        }

        tblQuizzesOptionsTitle = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsTitle") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsTitle, "db_write_text") : tblQuizzesOptionsTitle;

        if(gSystemConfig.configQuizzesOptionsInfo1FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo1FieldType == 2)
        {
            tblQuizzesOptionsInfo1 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo1") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo1, "db_write_text") : tblQuizzesOptionsInfo1;
        }
        if(gSystemConfig.configQuizzesOptionsInfo1FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo1FieldType == 12)
        {
            tblQuizzesOptionsInfo1 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo1, "db_write_text"), 2) : tblQuizzesOptionsInfo1;
        }

        if(gSystemConfig.configQuizzesOptionsInfo2FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo2FieldType == 2)
        {
            tblQuizzesOptionsInfo2 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo2") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo2, "db_write_text") : tblQuizzesOptionsInfo2;
        }
        if(gSystemConfig.configQuizzesOptionsInfo2FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo2FieldType == 12)
        {
            tblQuizzesOptionsInfo2 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo2") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo2, "db_write_text"), 2) : tblQuizzesOptionsInfo2;
        }

        if(gSystemConfig.configQuizzesOptionsInfo3FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo3FieldType == 2)
        {
            tblQuizzesOptionsInfo3 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo3") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo3, "db_write_text") : tblQuizzesOptionsInfo3;
        }
        if(gSystemConfig.configQuizzesOptionsInfo3FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo3FieldType == 12)
        {
            tblQuizzesOptionsInfo3 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo3") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo3, "db_write_text"), 2) : tblQuizzesOptionsInfo3;
        }

        if(gSystemConfig.configQuizzesOptionsInfo4FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo4FieldType == 2)
        {
            tblQuizzesOptionsInfo4 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo4") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo4, "db_write_text") : tblQuizzesOptionsInfo4;
        }
        if(gSystemConfig.configQuizzesOptionsInfo4FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo4FieldType == 12)
        {
            tblQuizzesOptionsInfo4 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo4") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo4, "db_write_text"), 2) : tblQuizzesOptionsInfo1;
        }

        if(gSystemConfig.configQuizzesOptionsInfo5FieldType == 1 || gSystemConfig.configQuizzesOptionsInfo5FieldType == 2)
        {
            tblQuizzesOptionsInfo5 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo5") === true) ? FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo5, "db_write_text") : tblQuizzesOptionsInfo5;
        }
        if(gSystemConfig.configQuizzesOptionsInfo5FieldType == 11 || gSystemConfig.configQuizzesOptionsInfo5FieldType == 12)
        {
            tblQuizzesOptionsInfo5 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsInfo1") === true) ? FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsInfo5, "db_write_text"), 2) : tblQuizzesOptionsInfo5;
        }

        tblQuizzesOptionsNumber1 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsNumber1") === true && (tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber1)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber1, gSystemConfig.configQuizzesOptionsNumber1FieldType) : tblQuizzesOptionsNumber1;
        tblQuizzesOptionsNumber2 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsNumber2") === true && (tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber2)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber2, gSystemConfig.configQuizzesOptionsNumber2FieldType) : tblQuizzesOptionsNumber2;
        tblQuizzesOptionsNumber3 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsNumber3") === true && (tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber3)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber3, gSystemConfig.configQuizzesOptionsNumber3FieldType) : tblQuizzesOptionsNumber3;
        tblQuizzesOptionsNumber4 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsNumber4") === true && (tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber4)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber4, gSystemConfig.configQuizzesOptionsNumber4FieldType) : tblQuizzesOptionsNumber4;
        tblQuizzesOptionsNumber5 = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsNumber5") === true && (tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber5)) ? FunctionsGeneric.valueMaskWrite(tblQuizzesOptionsDataObject._tblQuizzesOptionsNumber5, gSystemConfig.configQuizzesOptionsNumber5FieldType) : tblQuizzesOptionsNumber5;

        tblQuizzesOptionsImageMain = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsImageMain") === true) ? tblQuizzesOptionsDataObject._tblQuizzesOptionsImageMain : tblQuizzesOptionsImageMain;
        
        tblQuizzesOptionsActivation = (tblQuizzesOptionsDataObject.hasOwnProperty("_tblQuizzesOptionsActivation") === true && (tblQuizzesOptionsDataObject._tblQuizzesOptionsActivation)) ? tblQuizzesOptionsDataObject._tblQuizzesOptionsActivation : tblQuizzesOptionsActivation;
        //----------------------


        //Query.
        //----------------------
        strSQLQuizzesOptionsUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableQuizzesOptions + " ";
        strSQLQuizzesOptionsUpdate += "SET ? ";
        strSQLQuizzesOptionsUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLQuizzesOptionsUpdateParams.id = tblQuizzesOptionsID;
        strSQLQuizzesOptionsUpdateParams.id_quizzes = tblQuizzesOptionsIdQuizzes;
        strSQLQuizzesOptionsUpdateParams.sort_order = tblQuizzesOptionsSortOrder;

        //strSQLQuizzesOptionsUpdateParams.date_creation = tblQuizzesOptionsDateCreation;
        //strSQLQuizzesOptionsUpdateParams.date_timezone = tblQuizzesOptionsDateTimezone;
        strSQLQuizzesOptionsUpdateParams.date_edit = tblQuizzesOptionsDateEdit;


        strSQLQuizzesOptionsUpdateParams.title = tblQuizzesOptionsTitle;

        strSQLQuizzesOptionsUpdateParams.info1 = tblQuizzesOptionsInfo1;
        strSQLQuizzesOptionsUpdateParams.info2 = tblQuizzesOptionsInfo2;
        strSQLQuizzesOptionsUpdateParams.info3 = tblQuizzesOptionsInfo3;
        strSQLQuizzesOptionsUpdateParams.info4 = tblQuizzesOptionsInfo4;
        strSQLQuizzesOptionsUpdateParams.info5 = tblQuizzesOptionsInfo5;

        strSQLQuizzesOptionsUpdateParams.number1 = tblQuizzesOptionsNumber1;
        strSQLQuizzesOptionsUpdateParams.number2 = tblQuizzesOptionsNumber2;
        strSQLQuizzesOptionsUpdateParams.number3 = tblQuizzesOptionsNumber3;
        strSQLQuizzesOptionsUpdateParams.number4 = tblQuizzesOptionsNumber4;
        strSQLQuizzesOptionsUpdateParams.number5 = tblQuizzesOptionsNumber5;

        if(tblQuizzesOptionsImageMain)
        {
            strSQLQuizzesOptionsUpdateParams.image_main = tblQuizzesOptionsImageMain;
        }
        
        strSQLQuizzesOptionsUpdateParams.activation = tblQuizzesOptionsActivation;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLQuizzesOptionsUpdate = await new Promise((resolve, reject)=>{
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    dbSystemConPoolGetConnection.query(strSQLQuizzesOptionsUpdate, [strSQLQuizzesOptionsUpdateParams, tblQuizzesOptionsID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    //console.log("fileUpdate_async=true");
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLQuizzesOptionsUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //Debug.
        //console.log("resultsSQLFormsUpdate=", resultsSQLFormsUpdate);
        //console.log("tblFormsID=", tblFormsID);
        //console.log("strSQLFormsUpdateParams=", strSQLFormsUpdateParams);
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
            let quizzesOptionsUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.quizzesOptionsUpdate_async({
                    _tblQuizzesOptionsID: tblQuizzesOptionsID,
                    _tblQuizzesOptionsIdQuizzes: tblQuizzesOptionsIdQuizzes,
                    _tblQuizzesOptionsSortOrder: tblQuizzesOptionsSortOrder,
                    _tblQuizzesOptionsDateCreation: "",
                    //_tblQuizzesOptionsDateTimezone: "",
                    _tblQuizzesOptionsDateEdit: "",
                    _tblQuizzesOptionsTitle: tblQuizzesOptionsTitle,
                    _tblQuizzesOptionsInfo1: tblQuizzesOptionsInfo1,
                    _tblQuizzesOptionsInfo2: tblQuizzesOptionsInfo2,
                    _tblQuizzesOptionsInfo3: tblQuizzesOptionsInfo3,
                    _tblQuizzesOptionsInfo4: tblQuizzesOptionsInfo4,
                    _tblQuizzesOptionsInfo5: tblQuizzesOptionsInfo5,
                    _tblQuizzesOptionsNumber1: tblQuizzesOptionsNumber1,
                    _tblQuizzesOptionsNumber2: tblQuizzesOptionsNumber2,
                    _tblQuizzesOptionsNumber3: tblQuizzesOptionsNumber3,
                    _tblQuizzesOptionsNumber4: tblQuizzesOptionsNumber4,
                    _tblQuizzesOptionsNumber5: tblQuizzesOptionsNumber5,
                    _tblQuizzesOptionsImageMain: tblQuizzesOptionsImageMain,
                    _tblQuizzesOptionsActivation: tblQuizzesOptionsActivation
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


    //Forms - update record.
    //**************************************************************************************
    /**
     * Forms - update record.
     * @static
     * @async
     * @param {object} _tblFormsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async formsUpdate_async(_tblFormsDataObject)
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

        let strSQLFormsUpdate = "";
        let strSQLFormsUpdateParams = {};
        let resultsSQLFormsUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {

            //Debug.
            //console.log("ofglRecords=", ofglRecords);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblFormsDataObject = _tblFormsDataObject;

        tblFormsID = tblFormsDataObject._tblFormsID;
        tblFormsIdParent = (tblFormsDataObject.hasOwnProperty("_tblFormsIdParent") === true) ? tblFormsDataObject._tblFormsIdParent : tblFormsIdParent;
        tblFormsSortOrder = (tblFormsDataObject.hasOwnProperty("_tblFormsSortOrder") === true) ? tblFormsDataObject._tblFormsSortOrder : tblFormsSortOrder;
        if(!tblFormsSortOrder)
        {
            tblFormsSortOrder = 0;
        }

        /*
        tblFormsDateCreation = (tblFormsDataObject.hasOwnProperty("_tblFormsDateCreation") === true) ? tblFormsDataObject._tblFormsDateCreation : tblFormsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFormsDateCreation)
        {
            let tblFormsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsDateCreation = FunctionsGeneric.dateSQLWrite(tblFormsDateCreation_dateObj);
        }

        tblFormsDateTimezone = (tblFormsDataObject.hasOwnProperty("_tblFormsDateTimezone") === true) ? tblFormsDataObject._tblFormsDateTimezone : tblFormsDateTimezone;
        */

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
        
        //tblFormsEmailFormat = tblFormsDataObject._tblFormsEmailFormat;
        tblFormsEmailFormat = (tblFormsDataObject.hasOwnProperty("_tblFormsEmailFormat") === true && (tblFormsDataObject._tblFormsEmailFormat)) ? tblFormsDataObject._tblFormsEmailFormat : tblFormsEmailFormat;
        tblFormsMessageSuccess = (tblFormsDataObject.hasOwnProperty("_tblFormsMessageSuccess") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsMessageSuccess, "db_write_text") : tblFormsMessageSuccess;
        tblFormsActivation = (tblFormsDataObject.hasOwnProperty("_tblFormsActivation") === true && (tblFormsDataObject._tblFormsActivation)) ? tblFormsDataObject._tblFormsActivation : tblFormsActivation;
        tblFormsNotes = (tblFormsDataObject.hasOwnProperty("_tblFormsNotes") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsDataObject._tblFormsNotes, "db_write_text") : tblFormsNotes;
        //----------------------


        //Query.
        //----------------------
        strSQLFormsUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableForms + " ";
        strSQLFormsUpdate += "SET ? ";
        strSQLFormsUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLFormsUpdateParams.id = tblFormsID;
        strSQLFormsUpdateParams.id_parent = tblFormsIdParent;
        strSQLFormsUpdateParams.sort_order = tblFormsSortOrder;

        //strSQLFormsUpdateParams.date_creation = tblFormsDateCreation;
        //strSQLFormsUpdateParams.date_timezone = tblFormsDateTimezone;
        strSQLFormsUpdateParams.date_edit = tblFormsDateEdit;

        strSQLFormsUpdateParams.id_register_user = tblFormsIdRegisterUser;

        strSQLFormsUpdateParams.form_title = tblFormsFormTitle;
        strSQLFormsUpdateParams.form_subject = tblFormsFormSubject;

        strSQLFormsUpdateParams.recipient_name = tblFormsRecipientName;
        strSQLFormsUpdateParams.recipient_email = tblFormsRecipientEmail;
        strSQLFormsUpdateParams.recipient_email_copy = tblFormsRecipientEmailCopy;

        strSQLFormsUpdateParams.sender_name = tblFormsSenderName;
        strSQLFormsUpdateParams.sender_email = tblFormsSenderEmail;
        strSQLFormsUpdateParams.sender_config = tblFormsSenderConfig;

        strSQLFormsUpdateParams.email_format = tblFormsEmailFormat;
        strSQLFormsUpdateParams.message_success = tblFormsMessageSuccess;
        strSQLFormsUpdateParams.activation = tblFormsActivation;
        strSQLFormsUpdateParams.notes = tblFormsNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFormsUpdate = await new Promise((resolve, reject)=>{
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    dbSystemConPoolGetConnection.query(strSQLFormsUpdate, [strSQLFormsUpdateParams, tblFormsID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    //console.log("fileUpdate_async=true");
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLFormsUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //Debug.
        //console.log("resultsSQLFormsUpdate=", resultsSQLFormsUpdate);
        //console.log("tblFormsID=", tblFormsID);
        //console.log("strSQLFormsUpdateParams=", strSQLFormsUpdateParams);
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let formsUpdateResult = await new Promise((resolve, reject)=>{
            SyncSystemNS.FunctionsDBUpdate.formsUpdate_async({
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
            }).then((results)=>{
                if(results === undefined)
                {
                    //Error.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8"));
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


    //Forms Fields - update record.
    //**************************************************************************************
    /**
     * Forms Fields - update record.
     * @static
     * @async
     * @param {object} _tblFormsFieldsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async formsFieldsUpdate_async(_tblFormsFieldsDataObject)
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
    
        let strSQLFormsFieldsUpdate = "";
        let strSQLFormsFieldsUpdateParams = {};
        let resultsSQLFormsFieldsUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {

            //Debug.
            //console.log("ofglRecords=", ofglRecords);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblFormsFieldsDataObject = _tblFormsFieldsDataObject;

        tblFormsFieldsID = tblFormsFieldsDataObject._tblFormsFieldsID;
        tblFormsFieldsIdForms = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsIdForms") === true) ? tblFormsFieldsDataObject._tblFormsFieldsIdForms : tblFormsFieldsIdForms;
        tblFormsFieldsSortOrder = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsSortOrder") === true) ? tblFormsFieldsDataObject._tblFormsFieldsSortOrder : tblFormsFieldsSortOrder;
        if(!tblFormsFieldsSortOrder)
        {
            tblFormsFieldsSortOrder = 0;
        }

        /*
        tblFormsFieldsDateCreation = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsDateCreation") === true) ? tblFormsFieldsDataObject._tblFormsFieldsDateCreation : tblFormsFieldsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFormsFieldsDateCreation)
        {
            let tblFormsFieldsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsFieldsDateCreation = FunctionsGeneric.dateSQLWrite(tblFormsFieldsDateCreation_dateObj);
        }

        tblFormsFieldsDateTimezone = (tblFormsFieldsDataObject.hasOwnProperty("_tblFormsFieldsDateTimezone") === true) ? tblFormsFieldsDataObject._tblFormsFieldsDateTimezone : tblFormsFieldsDateTimezone;
        */

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
        strSQLFormsFieldsUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFormsFields + " ";
        strSQLFormsFieldsUpdate += "SET ? ";
        strSQLFormsFieldsUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLFormsFieldsUpdateParams.id = tblFormsFieldsID;
        strSQLFormsFieldsUpdateParams.id_forms = tblFormsFieldsIdForms;
        strSQLFormsFieldsUpdateParams.sort_order = tblFormsFieldsSortOrder;

        //strSQLFormsFieldsUpdateParams.date_creation = tblFormsFieldsDateCreation;
        //strSQLFormsFieldsUpdateParams.date_timezone = tblFormsFieldsDateTimezone;
        strSQLFormsFieldsUpdateParams.date_edit = tblFormsFieldsDateEdit;

        strSQLFormsFieldsUpdateParams.field_type = tblFormsFieldsFieldType;

        strSQLFormsFieldsUpdateParams.field_name = tblFormsFieldsFieldName;
        strSQLFormsFieldsUpdateParams.field_name_formatted = tblFormsFieldsFieldNameFormatted;
        strSQLFormsFieldsUpdateParams.field_instructions = tblFormsFieldsFieldInstructions;

        strSQLFormsFieldsUpdateParams.field_size = tblFormsFieldsFieldSize;
        strSQLFormsFieldsUpdateParams.field_height = tblFormsFieldsFieldHeight;
        
        strSQLFormsFieldsUpdateParams.field_filter = tblFormsFieldsFieldFilter;

        strSQLFormsFieldsUpdateParams.info_small1 = tblFormsFieldsInfoSmall1;
        strSQLFormsFieldsUpdateParams.info_small2 = tblFormsFieldsInfoSmall2;
        strSQLFormsFieldsUpdateParams.info_small3 = tblFormsFieldsInfoSmall3;
        strSQLFormsFieldsUpdateParams.info_small4 = tblFormsFieldsInfoSmall4;
        strSQLFormsFieldsUpdateParams.info_small5 = tblFormsFieldsInfoSmall5;

        strSQLFormsFieldsUpdateParams.activation = tblFormsFieldsActivation;
        strSQLFormsFieldsUpdateParams.required = tblFormsFieldsRequired;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFormsFieldsUpdate = await new Promise((resolve, reject)=>{
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    dbSystemConPoolGetConnection.query(strSQLFormsFieldsUpdate, [strSQLFormsFieldsUpdateParams, tblFormsFieldsID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    //console.log("fileUpdate_async=true");
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLFormsFieldsUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //Debug.
        //console.log("resultsSQLFormsUpdate=", resultsSQLFormsUpdate);
        //console.log("tblFormsID=", tblFormsID);
        //console.log("strSQLFormsUpdateParams=", strSQLFormsUpdateParams);
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
            let formsFieldsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.formsFieldsInsert_async({
                    _tblFormsFieldsID: tblFormsFieldsID,
                    _tblFormsFieldsIdForms: tblFormsFieldsIdForms,
                    _tblFormsFieldsSortOrder: tblFormsFieldsSortOrder,
                    _tblFormsFieldsDateCreation: "",
                    _tblFormsFieldsDateTimezone: "",
                    _tblFormsFieldsDateEdit: "",
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


    //Forms Fields Options - update record.
    //**************************************************************************************
    /**
     * Forms Fields Options - update record.
     * @static
     * @async
     * @param {object} _tblFormsFieldsOptionsDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async formsFieldsOptionsUpdate_async(_tblFormsFieldsOptionsDataObject)
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
    
        let strSQLFormsFieldsOptionsUpdate = "";
        let strSQLFormsFieldsOptionsUpdateParams = {};
        let resultsSQLFormsFieldsOptionsUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {

            //Debug.
            //console.log("ofglRecords=", ofglRecords);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblFormsFieldsOptionsDataObject = _tblFormsFieldsOptionsDataObject;

        tblFormsFieldsOptionsID = tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsID;
        
        tblFormsFieldsOptionsIdFormsFields = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsIdFormsFields") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsIdFormsFields : tblFormsFieldsOptionsIdFormsFields;
        tblFormsFieldsOptionsSortOrder = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsSortOrder") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsSortOrder : tblFormsFieldsOptionsSortOrder;
        if(!tblFormsFieldsOptionsSortOrder)
        {
            tblFormsFieldsOptionsSortOrder = 0;
        }

        /*
        tblFormsFieldsOptionsDateCreation = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsDateCreation") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsDateCreation : tblFormsFieldsOptionsDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFormsFieldsOptionsDateCreation)
        {
            let tblFormsFieldsOptionsDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsFieldsOptionsDateCreation = FunctionsGeneric.dateSQLWrite(tblFormsFieldsOptionsDateCreation_dateObj);
        }

        tblFormsFieldsOptionsDateTimezone = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsDateTimezone") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsDateTimezone : tblFormsFieldsOptionsDateTimezone;
        */

        tblFormsFieldsOptionsDateEdit = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsDateEdit") === true) ? tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsDateEdit : tblFormsFieldsOptionsDateEdit;
        if(!tblFormsFieldsOptionsDateEdit)
        {
            let tblFormsFieldsOptionsDateEdit_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFormsFieldsOptionsDateEdit = FunctionsGeneric.dateSQLWrite(tblFormsFieldsOptionsDateEdit_dateObj);
        }

        tblFormsFieldsOptionsOptionName = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsOptionName") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsOptionName, "db_write_text") : tblFormsFieldsOptionsOptionName;
        //tblFormsFieldsOptionsOptionNameFormatted = (tblFormsFieldsOptionsDataObject.hasOwnProperty("_tblFormsFieldsOptionsOptionNameFormatted") === true) ? FunctionsGeneric.contentMaskWrite(tblFormsFieldsOptionsDataObject._tblFormsFieldsOptionsOptionNameFormatted, "db_write_text") : tblFormsFieldsOptionsOptionNameFormatted;
        
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
        strSQLFormsFieldsOptionsUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFormsFieldsOptions + " ";
        strSQLFormsFieldsOptionsUpdate += "SET ? ";
        strSQLFormsFieldsOptionsUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLFormsFieldsOptionsUpdateParams.id = tblFormsFieldsOptionsID;
        strSQLFormsFieldsOptionsUpdateParams.id_forms_fields = tblFormsFieldsOptionsIdFormsFields;
        strSQLFormsFieldsOptionsUpdateParams.sort_order = tblFormsFieldsOptionsSortOrder;

        //strSQLFormsFieldsOptionsUpdateParams.date_creation = tblFormsFieldsOptionsDateCreation;
        //strSQLFormsFieldsOptionsUpdateParams.date_timezone = tblFormsFieldsOptionsDateTimezone;
        strSQLFormsFieldsOptionsUpdateParams.date_edit = tblFormsFieldsOptionsDateEdit;

        strSQLFormsFieldsOptionsUpdateParams.option_name = tblFormsFieldsOptionsOptionName;
        strSQLFormsFieldsOptionsUpdateParams.option_name_formatted = tblFormsFieldsOptionsOptionNameFormatted;

        strSQLFormsFieldsOptionsUpdateParams.config_selection = tblFormsFieldsOptionsConfigSelection;
        
        strSQLFormsFieldsOptionsUpdateParams.info_small1 = tblFormsFieldsOptionsInfoSmall1;
        strSQLFormsFieldsOptionsUpdateParams.info_small2 = tblFormsFieldsOptionsInfoSmall2;
        strSQLFormsFieldsOptionsUpdateParams.info_small3 = tblFormsFieldsOptionsInfoSmall3;
        strSQLFormsFieldsOptionsUpdateParams.info_small4 = tblFormsFieldsOptionsInfoSmall4;
        strSQLFormsFieldsOptionsUpdateParams.info_small5 = tblFormsFieldsOptionsInfoSmall5;

        if(tblFormsFieldsOptionsImageMain)
        {
            strSQLFormsFieldsOptionsUpdateParams.image_main = tblFormsFieldsOptionsImageMain;
        }
        
        strSQLFormsFieldsOptionsUpdateParams.activation = tblFormsFieldsOptionsActivation;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFormsFieldsOptionsUpdate = await new Promise((resolve, reject)=>{
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    dbSystemConPoolGetConnection.query(strSQLFormsFieldsOptionsUpdate, [strSQLFormsFieldsOptionsUpdateParams, tblFormsFieldsOptionsID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    //console.log("fileUpdate_async=true");
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLFormsFieldsOptionsUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //Debug.
        //console.log("resultsSQLFormsUpdate=", resultsSQLFormsUpdate);
        //console.log("tblFormsID=", tblFormsID);
        //console.log("strSQLFormsUpdateParams=", strSQLFormsUpdateParams);
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
            let formsFieldsOptionsUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.formsFieldsOptionsUpdate_async({
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


    //Filters Generic - update record.
    //**************************************************************************************
    /**
     * Filters Generic - update record.
     * @static
     * @async
     * @param {object} _tblFiltersGenericDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async filtersGenericUpdate_async(_tblFiltersGenericDataObject)
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
    
        let tblFiltersGenericActivation = 1;
        let tblFiltersGenericActivation1 = 0;
        let tblFiltersGenericActivation2 = 0;
        let tblFiltersGenericActivation3 = 0;
        let tblFiltersGenericActivation4 = 0;
        let tblFiltersGenericActivation5 = 0;
    
        let tblFiltersGenericNotes = "";
    
        let strSQLFiltersGenericUpdate = "";
        let strSQLFiltersGenericUpdateParams = {};
        let resultsSQLFiltersGenericUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {

            //Debug.
            //console.log("ofglRecords=", ofglRecords);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
        //----------------------
        tblFiltersGenericDataObject = _tblFiltersGenericDataObject;

        tblFiltersGenericID = tblFiltersGenericDataObject._tblFiltersGenericID;

        tblFiltersGenericSortOrder = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericSortOrder") === true) ? tblFiltersGenericDataObject._tblFiltersGenericSortOrder : tblFiltersGenericSortOrder;
        if(!tblFiltersGenericSortOrder)
        {
            tblFiltersGenericSortOrder = 0;
        }

        /*tblFiltersGenericDateCreation = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericDateCreation") === true) ? tblFiltersGenericDataObject._tblFiltersGenericDateCreation : tblFiltersGenericDateCreation; //x = condition ? true : false (default value declared)
        if(!tblFiltersGenericDateCreation)
        {
            let tblFiltersGenericDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblFiltersGenericDateCreation = FunctionsGeneric.dateSQLWrite(tblFiltersGenericDateCreation_dateObj);
        }

        //tblFiltersGenericDateTimezone = (tblFiltersGenericDataObject.hasOwnProperty("_tblFiltersGenericDateTimezone") === true) ? tblFiltersGenericDataObject._tblFiltersGenericDateTimezone : tblFiltersGenericDateTimezone;
        */

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
        strSQLFiltersGenericUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableFiltersGeneric + " ";
        strSQLFiltersGenericUpdate += "SET ? ";
        strSQLFiltersGenericUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLFiltersGenericUpdateParams.id = tblFiltersGenericID;
        strSQLFiltersGenericUpdateParams.sort_order = tblFiltersGenericSortOrder;

        //strSQLFiltersGenericUpdateParams.date_creation = tblFiltersGenericDateCreation;
        //strSQLFiltersGenericUpdateParams.date_timezone = tblFiltersGenericDateTimezone;
        strSQLFiltersGenericUpdateParams.date_edit = tblFiltersGenericDateEdit;

        strSQLFiltersGenericUpdateParams.filter_index = tblFiltersGenericFilterIndex;

        strSQLFiltersGenericUpdateParams.table_name = tblFiltersGenericTableName;
        strSQLFiltersGenericUpdateParams.title = tblFiltersGenericTitle;
        strSQLFiltersGenericUpdateParams.description = tblFiltersGenericDescription;

        strSQLFiltersGenericUpdateParams.url_alias = tblFiltersGenericURLAlias;
        strSQLFiltersGenericUpdateParams.keywords_tags = tblFiltersGenericKeywordsTags;
        strSQLFiltersGenericUpdateParams.meta_description = tblFiltersGenericMetaDescription;
        strSQLFiltersGenericUpdateParams.meta_title = tblFiltersGenericMetaTitle;
        strSQLFiltersGenericUpdateParams.meta_info = tblFiltersGenericMetaInfo;

        strSQLFiltersGenericUpdateParams.info_small1 = tblFiltersGenericInfoSmall1;
        strSQLFiltersGenericUpdateParams.info_small2 = tblFiltersGenericInfoSmall2;
        strSQLFiltersGenericUpdateParams.info_small3 = tblFiltersGenericInfoSmall3;
        strSQLFiltersGenericUpdateParams.info_small4 = tblFiltersGenericInfoSmall4;
        strSQLFiltersGenericUpdateParams.info_small5 = tblFiltersGenericInfoSmall5;

        strSQLFiltersGenericUpdateParams.number_small1 = tblFiltersGenericNumberSmall1;
        strSQLFiltersGenericUpdateParams.number_small2 = tblFiltersGenericNumberSmall2;
        strSQLFiltersGenericUpdateParams.number_small3 = tblFiltersGenericNumberSmall3;
        strSQLFiltersGenericUpdateParams.number_small4 = tblFiltersGenericNumberSmall4;
        strSQLFiltersGenericUpdateParams.number_small5 = tblFiltersGenericNumberSmall5;

        if(tblFiltersGenericImageMain)
        {
            strSQLFiltersGenericUpdateParams.image_main = tblFiltersGenericImageMain;
        }
        strSQLFiltersGenericUpdateParams.config_selection = tblFiltersGenericConfigSelection;
        
        strSQLFiltersGenericUpdateParams.activation = tblFiltersGenericActivation;
        strSQLFiltersGenericUpdateParams.activation1 = tblFiltersGenericActivation1;
        strSQLFiltersGenericUpdateParams.activation2 = tblFiltersGenericActivation2;
        strSQLFiltersGenericUpdateParams.activation3 = tblFiltersGenericActivation3;
        strSQLFiltersGenericUpdateParams.activation4 = tblFiltersGenericActivation4;
        strSQLFiltersGenericUpdateParams.activation5 = tblFiltersGenericActivation5;

        strSQLFiltersGenericUpdateParams.notes = tblFiltersGenericNotes;
        //----------------------


        //Execute query.
        //----------------------
        resultsSQLFiltersGenericUpdate = await new Promise((resolve, reject)=>{
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    dbSystemConPoolGetConnection.query(strSQLFiltersGenericUpdate, [strSQLFiltersGenericUpdateParams, tblFiltersGenericID], (dbSystemError, results) => {
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
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    //console.log("fileUpdate_async=true");
                                }

                                //Return promise.
                                resolve(results);
                            }else{
                                //Error.
                                //reject(false);
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        if(resultsSQLFiltersGenericUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //Debug.
        //console.log("resultsSQLFormsUpdate=", resultsSQLFormsUpdate);
        //console.log("tblFormsID=", tblFormsID);
        //console.log("strSQLFormsUpdateParams=", strSQLFormsUpdateParams);
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        (async function(){ //async marks the block
            try{ 
            let filtersGenericUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.filtersGenericUpdate_async({
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


    //Users - update record.
    //**************************************************************************************
    /**
     * Users - update record.
     * @static
     * @async
     * @param {object} _tblUsersDataObject
     * @returns {boolean} true - successfull | false - error
     */
    static async usersUpdate_async(_tblUsersDataObject)
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
        
        let strSQLUsersUpdate = "";
        let strSQLUsersUpdateParams = {};
        let resultsSQLUsersUpdate = null;
        //----------------------


        //Variables - value/data treatment.
        //----------------------
        tblUsersDataObject = _tblUsersDataObject;
        tblUsersID = tblUsersDataObject._tblUsersID;

        tblUsersIdParent = (tblUsersDataObject.hasOwnProperty("_tblUsersIdParent") === true) ? tblUsersDataObject._tblUsersIdParent : tblUsersIdParent;

        //tblUsersSortOrder = tblUsersDataObject._tblUsersSortOrder;
        tblUsersSortOrder = (tblUsersDataObject.hasOwnProperty("_tblUsersSortOrder") === true) ? tblUsersDataObject._tblUsersSortOrder : tblUsersSortOrder;
        if(!tblUsersSortOrder)
        {
            tblUsersSortOrder = 0;
        }

        /*
        tblUsersDateCreation = (tblUsersDataObject.hasOwnProperty("_tblUsersDateCreation") === true) ? tblUsersDataObject._tblUsersDateCreation : tblUsersDateCreation; //x = condition ? true : false (default value declared)
        if(!tblUsersDateCreation)
        {
            let tblUsersDateCreation_dateObj = new Date(FunctionsGeneric.timeZoneConverter())
            tblUsersDateCreation = FunctionsGeneric.dateSQLWrite(tblUsersDateCreation_dateObj);
        }
        */

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


        //Query.
        //----------------------
        strSQLUsersUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableUsers + " ";
        strSQLUsersUpdate += "SET ? ";
        strSQLUsersUpdate += "WHERE id = ?";
        //----------------------


        //Parameters.
        //----------------------
        //strSQLUsersUpdateParams.id = tblUsersID;
        strSQLUsersUpdateParams.id_parent = tblUsersIdParent;
        strSQLUsersUpdateParams.sort_order = tblUsersSortOrder;

        //strSQLUsersUpdateParams.date_creation = tblUsersDateCreation;
        strSQLUsersUpdateParams.date_timezone = tblUsersDateTimezone;
        strSQLUsersUpdateParams.date_edit = tblUsersDateEdit;

        strSQLUsersUpdateParams.id_type = tblUsersIdType;
        strSQLUsersUpdateParams.name_title = tblUsersNameTitle;
        strSQLUsersUpdateParams.name_full = tblUsersNameFull;
        strSQLUsersUpdateParams.name_first = tblUsersNameFirst;
        strSQLUsersUpdateParams.name_last = tblUsersNameLast;

        strSQLUsersUpdateParams.date_birth = tblUsersDateBirth;
        strSQLUsersUpdateParams.gender = tblUsersGender;
        strSQLUsersUpdateParams.document = tblUsersDocument;

        strSQLUsersUpdateParams.address_street = tblUsersAddressStreet;
        strSQLUsersUpdateParams.address_number = tblUsersAddressNumber;
        strSQLUsersUpdateParams.address_complement = tblUsersAddressComplement;
        strSQLUsersUpdateParams.neighborhood = tblUsersNeighborhood;
        strSQLUsersUpdateParams.district = tblUsersDistrict;
        strSQLUsersUpdateParams.county = tblUsersCounty;
        strSQLUsersUpdateParams.city = tblUsersCity;
        strSQLUsersUpdateParams.state = tblUsersState;
        strSQLUsersUpdateParams.country = tblUsersCountry;
        strSQLUsersUpdateParams.zip_code = tblUsersZipCode;

        strSQLUsersUpdateParams.phone1_international_code = tblUsersPhone1InternationalCode;
        strSQLUsersUpdateParams.phone1_area_code = tblUsersPhone1AreaCode;
        strSQLUsersUpdateParams.phone1 = tblUsersPhone1;

        strSQLUsersUpdateParams.phone2_international_code = tblUsersPhone2InternationalCode;
        strSQLUsersUpdateParams.phone2_area_code = tblUsersPhone2AreaCode;
        strSQLUsersUpdateParams.phone2 = tblUsersPhone2;

        strSQLUsersUpdateParams.phone3_international_code = tblUsersPhone3InternationalCode;
        strSQLUsersUpdateParams.phone3_area_code = tblUsersPhone3AreaCode;
        strSQLUsersUpdateParams.phone3 = tblUsersPhone3;

        strSQLUsersUpdateParams.username = tblUsersUsername;
        strSQLUsersUpdateParams.email = tblUsersEmail;
        strSQLUsersUpdateParams.password = tblUsersPassword;
        strSQLUsersUpdateParams.password_hint = tblUsersPasswordHint;
        strSQLUsersUpdateParams.password_length = tblUsersPasswordLength;

        strSQLUsersUpdateParams.info1 = tblUsersInfo1;
        strSQLUsersUpdateParams.info2 = tblUsersInfo2;
        strSQLUsersUpdateParams.info3 = tblUsersInfo3;
        strSQLUsersUpdateParams.info4 = tblUsersInfo4;
        strSQLUsersUpdateParams.info5 = tblUsersInfo5;
        strSQLUsersUpdateParams.info6 = tblUsersInfo6;
        strSQLUsersUpdateParams.info7 = tblUsersInfo7;
        strSQLUsersUpdateParams.info8 = tblUsersInfo8;
        strSQLUsersUpdateParams.info9 = tblUsersInfo9;
        strSQLUsersUpdateParams.info10 = tblUsersInfo10;
        
        if(tblUsersImageMain)
        {
            strSQLUsersUpdateParams.image_main = tblUsersImageMain;
        }

        strSQLUsersUpdateParams.activation = tblUsersActivation;
        strSQLUsersUpdateParams.activation1 = tblUsersActivation1;
        strSQLUsersUpdateParams.activation2 = tblUsersActivation2;
        strSQLUsersUpdateParams.activation3 = tblUsersActivation3;
        strSQLUsersUpdateParams.activation4 = tblUsersActivation4;
        strSQLUsersUpdateParams.activation5 = tblUsersActivation5;
        
        strSQLUsersUpdateParams.id_status = tblUsersIdStatus;
        strSQLUsersUpdateParams.notes = tblUsersNotes;
        //----------------------


        //Execute query.
        //----------------------
        try
        {
            resultsSQLUsersUpdate = await new Promise((resolve, reject)=>{
                dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection){
                    if(dbSystemPoolError)
                    {
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                        }
                        throw dbSystemPoolError;
                    }else{

                        //dbSystemCon.query(strSQLUsersUpdate, strSQLUsersUpdateParams, (dbSystemError, results) => {
                        dbSystemConPoolGetConnection.query(strSQLUsersUpdate, [strSQLUsersUpdateParams, tblUsersID], (dbSystemError, results) => {
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
                                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                                    }

                                    //Return promise.
                                    resolve(results);
                                }else{
                                    //Error.
                                    //reject(false);
                                    reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
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
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log("aError=", aError);
            }
        }finally{

        }
        //----------------------


        //Return data treatment.
        //----------------------
        if(resultsSQLUsersUpdate.affectedRows > 0)
        {
            strReturn = true;
        }
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        /*
        let usersUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.usersUpdate_async({
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
}