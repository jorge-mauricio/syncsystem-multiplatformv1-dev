"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
const dbSystemCon = require("../config-application-db.js"); //DB.
//----------------------


module.exports = class FunctionsDB
{
    //Universal counter.
    //**************************************************************************************
    static counterUniversalSelect(idTbCounter = 1)
    //static counterUniversalCreate(idTbCounter = 1, callback)
    {
        //Variables.
        //----------------------
        let strReturn = "";
        let nCounter = 0;

        let strSQLCounterSelect = "";
        let strSQLCounterParams = [];
        let strSQLCounterSelectQuery = null;
        //let strSQLCounterSelectQuery;


        //let resultsSQLCounterRows = "";
        let resultsSQLCounterRows = null;
        //let resultsSQLCounterRows; //not working
        //----------------------


        //Query.
        //----------------------
        strSQLCounterSelect += "SELECT ";
        strSQLCounterSelect += "id, ";
        strSQLCounterSelect += "counter_global, ";
        strSQLCounterSelect += "description ";
        strSQLCounterSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter ";
        strSQLCounterSelect += "WHERE id <> 0";
        //strSQLCounterSelect += "AND id = :id ";
        //strSQLCounterSelect += "AND id = ? ";
        //----------------------


        //Parameters.
        //----------------------
        if(idTbCounter != null && idTbCounter != "" && (typeof idTbCounter !== 'undefined'))
        {
            //strSQLCounterSelect += " AND " + mysql.escape("id") + " = ?";//not workig, because it wraps in single quotes.
            strSQLCounterSelect += " AND id = ?";
            strSQLCounterParams.push(idTbCounter);
        }
        //----------------------


        //Execute query.
        //----------------------
        /*
        strSQLCounterSelectQuery = dbSystemCon.query(strSQLCounterSelect, strSQLCounterParams, (dbSystemError, resultsSQLCounterRows)=>{
            if(dbSystemError)
            {
                //Debug.
                //console.log("DB Error: " + dbSystemError);
            }else{

                //Debug.
                //console.log("dbSystemError = " + resultsSQLCounterRows);
                console.log(resultsSQLCounterRows);
                //strReturn = resultsSQLCounterRows;
                //return strReturn;
                //return resultsSQLCounterRows;
                //return json(resultsSQLCounterRows);
            }
        });
        */
        /*
        dbSystemCon.query(strSQLCounterSelect, strSQLCounterParams, (dbSystemError, resultsSQLCounterRows)=>{
            if(dbSystemError)
            {
                //throw dbSystemError;
                

                //Debug.
                //console.log("DB Error: " + dbSystemError);
            }else{

                //Debug.
                //console.log("dbSystemError = " + resultsSQLCounterRows);
                //console.log(resultsSQLCounterRows);
                //strReturn = resultsSQLCounterRows;
                //return strReturn;
                //return resultsSQLCounterRows;
                //return json(resultsSQLCounterRows);

                //strReturnCallback = resultsSQLCounterRows;
                return callback(resultsSQLCounterRows);
            }
        });
        */


        //Promise method.
        //https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node

        return new Promise((resolve, reject) => {
            dbSystemCon.query(strSQLCounterSelect, strSQLCounterParams, (dbSystemError, resultsSQLCounterRows) => {
                if(dbSystemError)
                {
                    throw dbSystemError;

                    //return reject(dbSystemError);
                }else{
                    //Select the counter number.
                    nCounter = resultsSQLCounterRows[0].counter_global;

                    if(nCounter === undefined)
                    {
                        reject(new Error("nCounter is undefined."));
                    }else{
                        resolve(nCounter);
                    }
                        

                    //Debug.
                    //resolve(resultsSQLCounterRows);
                    //resolve(nCounter);
                    //resolve(json(resultsSQLCounterRows));//working: returns [ RowDataPacket { id: 1, counter_global: 123, description: 'Node database test' } ]
                }
            });
        });        
        //----------------------


        //Clean up.
        //----------------------
        /*
        dbSystemCon.end((dbSystemError)=>{

        });
        */
        //----------------------


        //Return data.
        //return strReturn;


        //Debug.
        //return idTbCounter;
        //return strSQLCounterSelect;
        //return resultsSQLCounterRows;
    }
    //**************************************************************************************


    //Universal counter.
    //**************************************************************************************
    //async static counterUniversalUpdate(idTbCounter = 1)
    static counterUniversalUpdate(idTbCounter = 1)
    //async function counterUniversalUpdate(idTbCounter = 1)
    //static counterUniversalCreate(idTbCounter = 1, callback)
    {
        //Variables.
        //----------------------
        let strReturn = "";
        let nCounterUpdate = 0;
        let strSQLCounterrUpdate = "";

        //let resultsSQLCounterUpdate = null;
        //----------------------


        //Query.
        //----------------------
        strSQLCounterrUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter SET";
        strSQLCounterrUpdate += " counter_global = ?";
        strSQLCounterrUpdate += " WHERE id = ?";
        //----------------------


        //Promise method.
        //----------------------
        return new Promise((resolve, reject) => {
            this.counterUniversalSelect()
            .then(function(results){
                //Variables values.
                nCounterUpdate = results + 1;


                //Promise return.
                //resolve(nCounterUpdate); //working
                if(nCounterUpdate === undefined)
                {
                    reject(new Error("nCounterUpdate is undefined."));
                }else{
                    resolve(nCounterUpdate);
                }/*working*/


                //Debug.
                //render(results);
                //render(nCounterUpdate);
                //console.log(results); //working
                //console.log(results);
            }).then(function(results){
                //Execute query.
                dbSystemCon.query(strSQLCounterrUpdate, [nCounterUpdate, idTbCounter], (dbSystemError, resultsSQLCounterUpdate) => {
                    if(dbSystemError)
                    {
                        throw dbSystemError;

                        //return reject(dbSystemError);
                    }else{
                        //Variables values.
                        strReturn = results;


                        //Promise return.
                        //resolve(nCounterUpdate); //working
                        if(strReturn === undefined)
                        {
                            reject(new Error("strReturn is undefined."));
                        }else{
                            resolve(strReturn);
                        }


                        //Debug.
                        //console.log("resultsSQLCounterUpdate = ");
                        //console.log(resultsSQLCounterUpdate);
                        console.log(resultsSQLCounterUpdate.affectedRows + " record(s) updated successfully.");
                    }
                })
            });
        });        
        //----------------------


        //Usage.
        //----------------------
        /*
        let idNew = null;
        SyncSystemNS.FunctionsDB.counterUniversalUpdate()
            .then(function(pResults){
                //render(pResults)
                //console.log(pResults);
                idNew = pResults;
            }).catch(function(pError){
                console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8"), pError);
            });
        */
        //----------------------
    }
    //**************************************************************************************
};