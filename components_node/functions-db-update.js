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


    //Categories - update record.
    //**************************************************************************************
    /**
     * Categories - update record.
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
        let ofglRecordsParameters = {
            _arrSearchParameters: arrFiltersGenericSearchParameters,
            _configSortOrder: "title",
            _strNRecords: "",
            _objSpecialParameters: {returnType: 3}
        };

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
        
        let strSQLCategoriesUpdate = "";
        let strSQLCategoriesUpdateParams = {};
        let resultsSQLCategoriesUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {
            ofglRecords = new ObjectFiltersGenericListing(ofglRecordsParameters);
            await ofglRecords.recordsListingGet(0, 3);

            //Filter results acording to filter_index.
            if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
            {
                resultsCategoriesFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                    //console.log("obj = ", obj);
                });
                //console.log("ofglRecords.resultsFiltersGenericListing = ", ofglRecords.resultsFiltersGenericListing);
                //console.log("resultsFiltersGeneric1Listing = ", resultsFiltersGeneric1Listing);
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
        if(resultsSQLCategoriesUpdate.affectedRows > 0)
        {

            //Record filters generic - update.

            //Filters generic 1 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric1)
                {
                    //Debug.
                    //console.log("resultsCategoriesFiltersGeneric1Listing = ", resultsCategoriesFiltersGeneric1Listing);
                    
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric1Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;101;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric1.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                    //Debug.
                                    //console.log("status=full");
                                    //console.log("categoriesFiltersGenericCheck=", categoriesFiltersGenericCheck);
                                    //console.log("categoriesFiltersGenericCheck[0].id=", categoriesFiltersGenericCheck[0].id);
                                    //console.log("includes=", arrIdsCategoriesFiltersGeneric1.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()));
                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric1.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 101,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }


                                //Debug.
                                //console.log("arrIdsCategoriesFiltersGeneric1=", arrIdsCategoriesFiltersGeneric1);
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();


                        //Debug.
                        //console.log("objRow.id = ", objRow.id);
                    });
                }
            }



            //Filters generic 2 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric2 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric2)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric2Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;102;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric2.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric2.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 102,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 3 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric3 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric3)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric3Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;103;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric3.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric3.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 103,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 4 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric4 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric4)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric4Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;104;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric4.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric4.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 104,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 5 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric5 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric5)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric5Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;105;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric5.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric5.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 105,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 6 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric6 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric6)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric6Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;106;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric6.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric6.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 106,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 7 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric7 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric7)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric7Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;107;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric7.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric7.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 107,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 8 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric8 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric8)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric8Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;108;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric8.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric8.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 108,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 9 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric9 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric9)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric9Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;109;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric9.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric9.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 109,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            //Filters generic 10 - update.
            if(gSystemConfig.enableCategoriesFilterGeneric10 != 0)
            {
                if(arrIdsCategoriesFiltersGeneric10)
                {
                    //Loop through filters.
                    resultsCategoriesFiltersGeneric10Listing.map((objRow)=>{
                        (async function(){
                            let categoriesFiltersGenericCheck = null;

                            try{
                                categoriesFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblCategoriesID + ";i", "id_filter_index;110;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(categoriesFiltersGenericCheck)
                                if(categoriesFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsCategoriesFiltersGeneric10.includes(categoriesFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ categoriesFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsCategoriesFiltersGeneric10.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 110,
                                            _tblFiltersGenericBindingIdRecord: tblCategoriesID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }
                        })();
                    });
                }
            }


            strReturn = true;
        }
        //----------------------


        return strReturn;
        

        //Usage
        //----------------------
        //----------------------
    }
    //**************************************************************************************
}