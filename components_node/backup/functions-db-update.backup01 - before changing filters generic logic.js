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
        arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableCategories + ";s");
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
                console.log("Error try/catch block (Categories Filters Generic)");
                console.log("aError=", aError);
            }
        }finally{

        }
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
        /*
        let filesUpdateResult = await new Promise((resolve, reject)=>{
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
        
        strSQLFilesUpdateParams.file = tblFilesFile;
        strSQLFilesUpdateParams.file_size = tblFilesFileSize;
        strSQLFilesUpdateParams.file_duration = tblFilesFileDuration;
        strSQLFilesUpdateParams.file_dimensions = tblFilesFileDimensions;
        strSQLFilesUpdateParams.file_original_name = tblFilesFileOriginalName;

        strSQLFilesUpdateParams.file_thumbnail = tblFilesFileThumbnail;

        strSQLFilesUpdateParams.file1 = tblFilesFile1;
        strSQLFilesUpdateParams.file2 = tblFilesFile2;
        strSQLFilesUpdateParams.file3 = tblFilesFile3;
        strSQLFilesUpdateParams.file4 = tblFilesFile4;
        strSQLFilesUpdateParams.file5 = tblFilesFile5;

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
            let contentUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.contentUpdate_async({
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
        arrFiltersGenericSearchParameters.push("table_name;" + gSystemConfig.configSystemDBTableProducts + ";s");
        let ofglRecords = "";
        let ofglRecordsParameters = {
            _arrSearchParameters: arrFiltersGenericSearchParameters,
            _configSortOrder: "title",
            _strNRecords: "",
            _objSpecialParameters: {returnType: 3}
        };

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
        
        let strSQLProductsUpdate = "";
        let strSQLProductsUpdateParams = {};
        let resultsSQLProductsUpdate = null;
        //----------------------


        //Variables - define values.
        //----------------------
        try
        {
            ofglRecords = new ObjectFiltersGenericListing(ofglRecordsParameters);
            await ofglRecords.recordsListingGet(0, 3);

            //Filter results acording to filter_index.
            if(gSystemConfig.enableProductsFilterGeneric1 != 0)
            {
                resultsProductsFiltersGeneric1Listing = ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                });
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


        //Variables - value/data treatment.
        //TODO: maybe move this part into the try/catch block.
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

        tblProductsIdType = tblProductsDataObject._tblProductsIdType;

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
        //----------------------


        //Return data treatment.
        //----------------------
        if(resultsSQLProductsUpdate.affectedRows > 0)
        {

            //Record filters generic - update.

            //Filters generic 1 - update.
            if(gSystemConfig.enableProductsFilterGeneric1 != 0)
            {
                if(arrIdsProductsFiltersGeneric1)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric1Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;101;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric1.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                    //Debug.
                                    //console.log("status=full");
                                    //console.log("productsFiltersGenericCheck=", productsFiltersGenericCheck);
                                    console.log("productsFiltersGenericCheck[0].id=", productsFiltersGenericCheck[0].id);
                                    //console.log("includes=", arrIdsProductsFiltersGeneric1.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()));
                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric1.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 101,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }


                                //Debug.
                                console.log("arrIdsProductsFiltersGeneric1=", arrIdsProductsFiltersGeneric1);
                            }catch(aError){
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("aError=", aError);
                                }
                            }finally{

                            }

                            //Debug.
                            console.log("productsFiltersGenericCheck = ", productsFiltersGenericCheck);
                        })();


                        //Debug.
                        console.log("objRow.id = ", objRow.id);
                    });


                    //Debug.
                    //console.log("arrIdsProductsFiltersGeneric1 = ", arrIdsProductsFiltersGeneric1);
                    //console.log("tblProductsID = ", tblProductsID);
                    
                }
            }


            //Filters generic 2 - update.
            if(gSystemConfig.enableProductsFilterGeneric2 != 0)
            {
                if(arrIdsProductsFiltersGeneric2)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric2Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;102;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric2.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric2.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 102,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric3 != 0)
            {
                if(arrIdsProductsFiltersGeneric3)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric3Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;103;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric3.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric3.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 103,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric4 != 0)
            {
                if(arrIdsProductsFiltersGeneric4)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric4Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;104;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric4.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric4.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 104,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric5 != 0)
            {
                if(arrIdsProductsFiltersGeneric5)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric5Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;105;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric5.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric5.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 105,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric6 != 0)
            {
                if(arrIdsProductsFiltersGeneric6)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric6Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;106;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric6.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric6.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 106,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric7 != 0)
            {
                if(arrIdsProductsFiltersGeneric7)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric7Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;107;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric7.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric7.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 107,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric8 != 0)
            {
                if(arrIdsProductsFiltersGeneric8)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric8Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;108;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric8.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric8.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 108,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric9 != 0)
            {
                if(arrIdsProductsFiltersGeneric9)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric9Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;109;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric9.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric9.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 109,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
            if(gSystemConfig.enableProductsFilterGeneric10 != 0)
            {
                if(arrIdsProductsFiltersGeneric10)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric10Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;110;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric10.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric10.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 110,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 11 - update.
            if(gSystemConfig.enableProductsFilterGeneric11 != 0)
            {
                if(arrIdsProductsFiltersGeneric11)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric11Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;111;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric11.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                    //Debug.
                                    //console.log("status=full");
                                    //console.log("productsFiltersGenericCheck=", productsFiltersGenericCheck);
                                    //console.log("productsFiltersGenericCheck[0].id=", productsFiltersGenericCheck[0].id);
                                    //console.log("includes=", arrIdsProductsFiltersGeneric11.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()));
                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric11.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 111,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }


                                //Debug.
                                //console.log("arrIdsProductsFiltersGeneric11=", arrIdsProductsFiltersGeneric11);
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


            //Filters generic 12 - update.
            if(gSystemConfig.enableProductsFilterGeneric12 != 0)
            {
                if(arrIdsProductsFiltersGeneric12)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric12Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;112;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric12.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric12.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 112,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 13 - update.
            if(gSystemConfig.enableProductsFilterGeneric13 != 0)
            {
                if(arrIdsProductsFiltersGeneric13)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric13Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;113;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric13.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric13.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 113,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 14 - update.
            if(gSystemConfig.enableProductsFilterGeneric14 != 0)
            {
                if(arrIdsProductsFiltersGeneric14)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric14Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;114;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric14.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric14.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 114,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 15 - update.
            if(gSystemConfig.enableProductsFilterGeneric15 != 0)
            {
                if(arrIdsProductsFiltersGeneric15)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric15Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;115;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric15.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric15.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 115,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 16 - update.
            if(gSystemConfig.enableProductsFilterGeneric16 != 0)
            {
                if(arrIdsProductsFiltersGeneric16)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric16Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;116;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric16.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric16.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 116,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 17 - update.
            if(gSystemConfig.enableProductsFilterGeneric17 != 0)
            {
                if(arrIdsProductsFiltersGeneric17)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric17Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;117;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric17.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric17.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 117,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 18 - update.
            if(gSystemConfig.enableProductsFilterGeneric18 != 0)
            {
                if(arrIdsProductsFiltersGeneric18)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric18Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;118;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric18.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric18.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 118,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 19 - update.
            if(gSystemConfig.enableProductsFilterGeneric19 != 0)
            {
                if(arrIdsProductsFiltersGeneric19)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric19Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;119;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric19.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric19.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 119,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 20 - update.
            if(gSystemConfig.enableProductsFilterGeneric20 != 0)
            {
                if(arrIdsProductsFiltersGeneric20)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric20Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;120;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric20.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric20.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 120,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 21 - update.
            if(gSystemConfig.enableProductsFilterGeneric21 != 0)
            {
                if(arrIdsProductsFiltersGeneric21)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric21Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;121;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric21.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                    //Debug.
                                    //console.log("status=full");
                                    //console.log("productsFiltersGenericCheck=", productsFiltersGenericCheck);
                                    //console.log("productsFiltersGenericCheck[0].id=", productsFiltersGenericCheck[0].id);
                                    //console.log("includes=", arrIdsProductsFiltersGeneric21.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()));
                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric21.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 121,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
                                            _tblFiltersGenericBindingNotes: ""
                                        });
                                    }
                                }


                                //Debug.
                                //console.log("arrIdsProductsFiltersGeneric21=", arrIdsProductsFiltersGeneric21);
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



            //Filters generic 22 - update.
            if(gSystemConfig.enableProductsFilterGeneric22 != 0)
            {
                if(arrIdsProductsFiltersGeneric22)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric22Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;122;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric22.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric22.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 122,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 23 - update.
            if(gSystemConfig.enableProductsFilterGeneric23 != 0)
            {
                if(arrIdsProductsFiltersGeneric23)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric23Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;123;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric23.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric23.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 123,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 24 - update.
            if(gSystemConfig.enableProductsFilterGeneric24 != 0)
            {
                if(arrIdsProductsFiltersGeneric24)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric24Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;124;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric24.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric24.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 124,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 25 - update.
            if(gSystemConfig.enableProductsFilterGeneric25 != 0)
            {
                if(arrIdsProductsFiltersGeneric25)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric25Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;125;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric25.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric25.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 125,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 26 - update.
            if(gSystemConfig.enableProductsFilterGeneric26 != 0)
            {
                if(arrIdsProductsFiltersGeneric26)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric26Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;126;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric26.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric26.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 126,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 27 - update.
            if(gSystemConfig.enableProductsFilterGeneric27 != 0)
            {
                if(arrIdsProductsFiltersGeneric27)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric27Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;127;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric27.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric27.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 127,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 28 - update.
            if(gSystemConfig.enableProductsFilterGeneric28 != 0)
            {
                if(arrIdsProductsFiltersGeneric28)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric28Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;128;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric28.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric28.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 128,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 29 - update.
            if(gSystemConfig.enableProductsFilterGeneric29 != 0)
            {
                if(arrIdsProductsFiltersGeneric29)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric29Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;129;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                /**/                                                                    
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric29.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric29.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 129,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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


            //Filters generic 30 - update.
            if(gSystemConfig.enableProductsFilterGeneric30 != 0)
            {
                if(arrIdsProductsFiltersGeneric30)
                {
                    //Loop through filters.
                    resultsProductsFiltersGeneric30Listing.map((objRow)=>{
                        (async function(){
                            let productsFiltersGenericCheck = null;

                            try{
                                productsFiltersGenericCheck = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                                    ["id_filters_generic;" + objRow.id + ";i", "id_record;" + tblProductsID + ";i", "id_filter_index;130;i"], 
                                                                                                    "", 
                                                                                                    "", 
                                                                                                    "id, id_filters_generic",
                                                                                                    1); 
                                //if(productsFiltersGenericCheck)
                                if(productsFiltersGenericCheck.length) //check if array is empty
                                {
                                    if(arrIdsProductsFiltersGeneric30.includes(productsFiltersGenericCheck[0].id_filters_generic.toString()) == true) //check if selected filters has registered bindings
                                    {
                                        //Update record with additional information or leave as it is.

                                    }else{
                                        //Delete record.
                                        await FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableFiltersGenericBinding, ["id;"+ productsFiltersGenericCheck[0].id + ";i"]);
                                    }

                                }else{
                                    //Include new record.
                                    if(arrIdsProductsFiltersGeneric30.includes(objRow.id.toString()))
                                    {
                                        await FunctionsDBInsert.filtersGenericBindingInsert_async({
                                            _tblFiltersGenericBindingID: "",
                                            _tblFiltersGenericBindingSortOrder: "",
                                            _tblFiltersGenericBindingDateCreation: "",
                                            _tblFiltersGenericBindingDateEdit: "",
                                            _tblFiltersGenericBindingIdFiltersGeneric: objRow.id,
                                            _tblFiltersGenericBindingIdFilterIndex: 130,
                                            _tblFiltersGenericBindingIdRecord: tblProductsID,
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
        /*
        let filesUpdateResult = await new Promise((resolve, reject)=>{
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
        
        tblFormsEmailFormat = tblFormsDataObject._tblFormsEmailFormat;
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
            let formsFieldsUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.formsFieldsUpdate_async({
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

        strSQLFormsFieldsOptionsUpdateParams.image_main = tblFormsFieldsOptionsImageMain;
        
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
    
        let tblFiltersGenericActivation = "";
        let tblFiltersGenericActivation1 = "";
        let tblFiltersGenericActivation2 = "";
        let tblFiltersGenericActivation3 = "";
        let tblFiltersGenericActivation4 = "";
        let tblFiltersGenericActivation5 = "";
    
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

        strSQLFiltersGenericUpdateParams.image_main = tblFiltersGenericImageMain;
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
}