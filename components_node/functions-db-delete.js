'use strict';

// Import Node Modules.
// ----------------------
// require('dotenv').config(); // Load the dotenv dependency and call the config method on the imported object.
const mysql = require('mysql'); // MySQL package.
const lodash = require('lodash'); // Utils.

const gSystemConfig = require('../config-application.js'); // System configuration.
// const dbSystemCon = require('../config-application-db.js').dbSystemCon; // DB System - simple connection.
// const dbSystemConPool = require('../config-application-db.js').dbSystemConPool; // DB System - pool connection.
const { dbSystemConPool } = require('../config-application-db.js'); // DB System - pool connection.
// const SyncSystemNS = require('./syncsystem-ns.js'); // Cause error.

const FunctionsGeneric = require('./functions-generic.js');
const { isConstructorTypeNode } = require('typescript');
// const FunctionsDB = require("./functions-db.js");
// const FunctionsCrypto = require("./functions-crypto.js");
// ----------------------

module.exports = class FunctionsDBDelete {
  // Function to delete generic records.
  // **************************************************************************************
  static async deleteRecordsGeneric10(strTable, arrSearchParameters) {
    // arrSearchParameters: ["fieldNameSearch1;fieldValueSearch1;fieldTypeSearch1", "fieldNameSearch2;fieldValueSearch2;fieldTypeSearch2", "fieldNameSearch3;fieldValueSearch3;fieldTypeSearch3"]
      // typeFieldSearch1: s (string) | i (integer) | d (date) | dif (initial date and final date) | ids (id IN)

    // Variables.
    // ----------------------
    // let strReturn = false;
    let objReturn = { returnStatus: false, nRecords: 0 };

    let strSQLRecordsGenericDelete = '';
    const strSQLRecordsGenericDeleteParams = [];
    let resultsSQLRecordsGenericDelete = null;

    let strOperator = '';
    // ----------------------

    // Query.
    // ----------------------
    strSQLRecordsGenericDelete += 'DELETE FROM ' + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + FunctionsGeneric.contentMaskWrite(strTable, 'db_sanitize');
    // strSQLRecordsGenericDelete += " SET ?";
    // ----------------------

    // Parameters.
    // ----------------------
    for (let countArray = 0; countArray < arrSearchParameters.length; countArray++) {
      // Variables.
      const arrSearchParametersInfo = arrSearchParameters[countArray].split(';');
      const searchParametersFieldName = arrSearchParametersInfo[0];
      const searchParametersFieldValue = arrSearchParametersInfo[1];
      const searchParametersFieldType = arrSearchParametersInfo[2];

      // Operator selection.
      if (countArray == 0) {
        strOperator = 'WHERE';
      } else {
        strOperator = 'AND';
      }

      // Integer.
      if (searchParametersFieldType == 'i') {
        strSQLRecordsGenericDelete += ' ' + strOperator + ' ' + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, 'db_sanitize') + ' = ?';
        strSQLRecordsGenericDeleteParams.push(searchParametersFieldValue);
      }

      // ids.
      if (searchParametersFieldType == 'ids') {
        const arrIds = searchParametersFieldValue.split(',');

        // strSQLRecordsGenericDelete += ' ' + strOperator + ' ' + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, 'db_sanitize') + ' IN (?,?)'; // debug
        strSQLRecordsGenericDelete += ' ' + strOperator + ' ' + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, 'db_sanitize') + ' IN (' + '?'.repeat(arrIds.length).split('').join(',') + ')';
        // strSQLRecordsGenericDeleteParams.push(searchParametersFieldValue);
        // strSQLRecordsGenericDeleteParams.push(649); // debug
        // strSQLRecordsGenericDeleteParams.push(650); // debug

        for (let countArrayParameters = 0; countArrayParameters < arrIds.length; countArrayParameters++) {
          strSQLRecordsGenericDeleteParams.push(arrIds[countArrayParameters]);
          // console.log('arrIds[]=', arrIds[countArrayParameters]);
        }
      }
    }
    // Debug.
    // console.log('strSQLRecordsGenericDelete=', strSQLRecordsGenericDelete);
    // console.log('arrSearchParameters=', arrSearchParameters);
    // console.log('strSQLRecordsGenericDelete=', strSQLRecordsGenericDelete);
    // ----------------------

    // Execute query.
    // ----------------------
    return new Promise((resolve, reject) => {
      // dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection) {
      dbSystemConPool.getConnection((dbSystemPoolError, dbSystemConPoolGetConnection) => {
        if (dbSystemPoolError) {
          if (gSystemConfig.configDebug === true) {
            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessage10e'));
          }
          throw dbSystemPoolError;
        } else {
          // dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
          dbSystemConPoolGetConnection.query(strSQLRecordsGenericDelete, strSQLRecordsGenericDeleteParams, (dbSystemError, resultsSQLGenericTableRows) => {
            dbSystemConPoolGetConnection.release();

            if (dbSystemError) {
              // Error.
              if (gSystemConfig.configDebug === true) {
                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessageError50'));
              }
              throw dbSystemError;

              // return reject(dbSystemError);
            } else {
              // Select the counter number.

              resultsSQLRecordsGenericDelete = resultsSQLGenericTableRows;
              // console.log('resultsSQLRecordsGenericDelete=', resultsSQLRecordsGenericDelete);
              objReturn.nRecords = resultsSQLRecordsGenericDelete.affectedRows;

              if (resultsSQLRecordsGenericDelete === undefined) {
                // Error.
                if (gSystemConfig.configDebug === true) {
                  console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessage9'));
                }

                // reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessage9')));
                reject(objReturn);
                // reject(new Error("nCounter is undefined."));
              } else {
                // Success.
                objReturn.returnStatus = true;
                // resolve(resultsSQLRecordsGenericDelete);
                resolve(objReturn);
              }

              // Debug.
              // resolve(resultsSQLCounterRows);
              // resolve(nCounter);
              // resolve(json(resultsSQLCounterRows));// working: returns [ RowDataPacket { id: 1, counter_global: 123, description: 'Node database test' } ]
            }
          });
        }
      });
    });
    // ----------------------

    // return strReturn;

    // Usage.
    // ----------------------
    // let deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10("categories", ["id;"+ idsRecordsDelete.join(",") + ";ids"]);
    // ----------------------
  }
  // **************************************************************************************
};
