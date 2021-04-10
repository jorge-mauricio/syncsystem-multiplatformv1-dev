"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
const dbSystemCon = require("../config-application-db.js").dbSystemCon; //DB System - simple connection.
const dbSystemConPool = require("../config-application-db.js").dbSystemConPool; //DB System - pool connection.

const FunctionsGeneric = require("./functions-generic.js");
//----------------------


module.exports = class FunctionsDB
{
    //Universal counter - select.
    //**************************************************************************************
    static counterUniversalSelect(idTbCounter = 1)
    //static counterUniversalCreate(idTbCounter = 1, callback)
    {
        //Variables.
        //----------------------
        let strReturn = "";
        let nCounter = 0;

        let strSQLCounterSelect = "";
        let strSQLCounterSelectParams = [];
        //let strSQLCounterSelectQuery = null;
        //let strSQLCounterSelectQuery;


        //let resultsSQLCounterRows = "";
        //let resultsSQLCounterRows = null;
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
            strSQLCounterSelectParams.push(idTbCounter);
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
            dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
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
                    nCounter = resultsSQLCounterRows[0].counter_global;

                    if(nCounter === undefined)
                    {
                        //Error.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                        }

                        reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9")));
                        //reject(new Error("nCounter is undefined."));
                    }else{
                        //Success.

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


        //Usage.
        //----------------------
        /* 
        let counterUniversalSelectResults
        SyncSystemNS.FunctionsDB.counterUniversalSelect()
        .then(function(results){
            counterUniversalSelectResults = results;

            //console.log("SyncSystemNS.FunctionsDB.counterUniversalSelect=", results);
            //console.log(results);
        });
        */
        //----------------------
    }
    //**************************************************************************************


    //Universal counter - select (async).
    //**************************************************************************************
    //ref: https://stackoverflow.com/questions/49829713/async-constructor-via-static-function-but-await-doesnt-work
    /**
     * Universal counter - select (async).
     * @param {*} idTbCounter 
     */
    static async counterUniversalSelect_async(idTbCounter = 1)
    //static counterUniversalCreate(idTbCounter = 1, callback)
    {
        //Variables.
        //----------------------
        let strReturn = "";

        let nCounter = 0;

        let strSQLCounterSelect = "";
        let strSQLCounterSelectParams = [];
        //let strSQLCounterSelectQuery = null;
        //let strSQLCounterSelectQuery;


        //let resultsSQLCounterRows = "";
        //let resultsSQLCounterRows = null;
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
            strSQLCounterSelectParams.push(idTbCounter);
        }
        //----------------------

        
        //Execute query.
        //----------------------
        nCounter = await new Promise((resolve, reject) => {
            dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
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
                    nCounter = resultsSQLCounterRows[0].counter_global;


                    if(nCounter === undefined)
                    {
                        //Error.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                        }

                        reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9")));
                        //reject(new Error("nCounter is undefined."));
                    }else{
                        //Success.
                        resolve(nCounter);
                    }


                    //Debug.
                    //resolve(resultsSQLCounterRows);
                    //resolve(nCounter);
                    //resolve(json(resultsSQLCounterRows));//working: returns [ RowDataPacket { id: 1, counter_global: 123, description: 'Node database test' } ]
                }
            });
        });        

        /*
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
        */     
        //----------------------
        

        //Debug.
        //strReturn = idTbCounter;


        //Return data treatment.
        //----------------------
        strReturn = nCounter;
        //----------------------


        return strReturn;


        //Usage.
        //----------------------
        /* 
        (async function(){ //async marks the block
            try{ 
                let counterUniversalSelect_asyncResult = await SyncSystemNS.FunctionsDB.counterUniversalSelect_async(1);
            }catch(aError){
                console.error(aError);
            }finally{
        
            }
        })()
        */
        //----------------------
    }
    //**************************************************************************************


    //Universal counter - select (async).
    //**************************************************************************************
    //ref: https://stackoverflow.com/questions/49829713/async-constructor-via-static-function-but-await-doesnt-work
    /**
     * Universal counter - select (async).
     * @param {int} idTbCounter 
     */
    static async counterUniversalSelect_async_pool(idTbCounter = 1)
    //static counterUniversalCreate(idTbCounter = 1, callback)
    {
        //Variables.
        //----------------------
        let strReturn = "";

        let nCounter = 0;

        let strSQLCounterSelect = "";
        let strSQLCounterSelectParams = [];
        //let strSQLCounterSelectQuery = null;
        //let strSQLCounterSelectQuery;


        //let resultsSQLCounterRows = "";
        //let resultsSQLCounterRows = null;
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
            strSQLCounterSelectParams.push(idTbCounter);
        }
        //----------------------

        
        //Execute query.
        //----------------------
        nCounter = await new Promise((resolve, reject) => {
            
            dbSystemConPool.getConnection(function(conError, connection) {
                if(conError)
                {
                    throw conError;
                }else{
                    //dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
                    connection.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
                        connection.release();
        
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
                            nCounter = resultsSQLCounterRows[0].counter_global;
        
        
                            if(nCounter === undefined)
                            {
                                //Error.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                                }
        
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9")));
                                //reject(new Error("nCounter is undefined."));
                            }else{
                                //Success.
                                resolve(nCounter);
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


        /*
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
        */     
        //----------------------
        

        //Debug.
        //strReturn = idTbCounter;


        //Return data treatment.
        //----------------------
        strReturn = nCounter;
        //----------------------


        return strReturn;


        //Usage.
        //----------------------
        /* 
        (async function(){ //async marks the block
            try{ 
                let counterUniversalSelect_asyncResult = await SyncSystemNS.FunctionsDB.counterUniversalSelect_async(1);
            }catch(aError){
                console.error(aError);
            }finally{
        
            }
        })()
        */
        //----------------------
    }
    //**************************************************************************************

    

    //Universal counter - update.
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
        let strSQLCounterUpdate = "";

        //let resultsSQLCounterUpdate = null;
        //----------------------


        //Query.
        //----------------------
        strSQLCounterUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter SET";
        strSQLCounterUpdate += " counter_global = ?";
        strSQLCounterUpdate += " WHERE id = ?";
        //----------------------


        //Execute query.
        //----------------------
        //Promise method.
        return new Promise((resolve, reject) => {
            this.counterUniversalSelect(idTbCounter)
            .then(function(results){
                //Variables values.
                nCounterUpdate = results + 1;


                //Promise return.
                //resolve(nCounterUpdate); //working
                if(nCounterUpdate === undefined)
                {
                    //Error.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                    }

                    reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9")));
                    //reject(new Error("nCounterUpdate is undefined."));
                }else{
                    //Success.
                    resolve(nCounterUpdate);
                } //working


                //Debug.
                //render(results);
                //render(nCounterUpdate);
                //console.log(results); //working
                //console.log(results);
            }).then(function(results){
                //Execute query.
                dbSystemCon.query(strSQLCounterUpdate, [nCounterUpdate, idTbCounter], (dbSystemError, resultsSQLCounterUpdate) => {
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
                        //Variables values.
                        strReturn = results;


                        //Promise return.
                        //resolve(nCounterUpdate); //working
                        if(strReturn === undefined)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8"));
                            }
                            reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
                            //reject(new Error("strReturn is undefined."));
                        }else{
                            //Success.
                            resolve(strReturn);
                        }


                        //Debug.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(resultsSQLCounterUpdate.affectedRows + " record(s) updated successfully.");
                        }
                        //console.log("resultsSQLCounterUpdate = ");
                        //console.log(resultsSQLCounterUpdate);
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


    //Universal counter - update (async).
    //**************************************************************************************
    /**
     * Universal counter - update (async).
     * @param {int} idTbCounter 1 - Universal Counter | 5 - Import
     */
    static async counterUniversalUpdate_async(idTbCounter = 1)
    //async function counterUniversalUpdate(idTbCounter = 1)
    //static counterUniversalCreate(idTbCounter = 1, callback)
    {
        //Variables.
        //----------------------
        let strReturn = "";
        let nCounterUpdate = 0;
        let strSQLCounterUpdate = "";

        //let resultsSQLCounterUpdate = null;
        //----------------------


        //Select current counter number.
        //----------------------
        /*
        nCounterUpdate = await new Promise(((resolve, reject)=>{
            this.counterUniversalSelect_async(idTbCounter);
        })); //not working
        */

        nCounterUpdate = await new Promise((resolve, reject) => {
            this.counterUniversalSelect_async(idTbCounter)
            .then((results)=>{
                //Variables values.
                //nCounterUpdate = results + 1;


                //Promise return.
                //resolve(nCounterUpdate); //working
                //if(nCounterUpdate === undefined)
                if(results === undefined)
                {  
                    //Error.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                    }

                    reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9")));
                    //reject(new Error("nCounterUpdate is undefined."));
                }else{
                    //Success.
                    //resolve(nCounterUpdate);
                    resolve(results);
                } //working


                //Debug.
                //render(results);
                //render(nCounterUpdate);
                //console.log(results); //working
                //console.log(results);
            });
        });
        //----------------------


        //Logic.
        //----------------------
        //Add 1 for next number to update.
        nCounterUpdate = nCounterUpdate + 1;
        //----------------------


        //Query.
        //----------------------
        strSQLCounterUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter SET";
        strSQLCounterUpdate += " counter_global = ?";
        strSQLCounterUpdate += " WHERE id = ?";
        //----------------------


        //Execute query.
        //----------------------
        return new Promise((resolve, reject) => {
            dbSystemCon.query(strSQLCounterUpdate, [nCounterUpdate, idTbCounter], (dbSystemError, resultsSQLCounterUpdate) => {
                if(dbSystemError)
                {
                    throw dbSystemError;

                    //return reject(dbSystemError);
                }else{
                    //Variables values.
                    //strReturn = results;
                    strReturn = resultsSQLCounterUpdate; //debug.
                    

                    //Promise return.
                    //resolve(nCounterUpdate); //working
                    /*
                    if(strReturn === undefined)
                    {
                        reject(new Error("strReturn is undefined."));
                    }else{
                        resolve(strReturn);
                    } //working
                    */

                    
                    if(resultsSQLCounterUpdate.affectedRows > 0)
                    {
                        /* 
                        resultsSQLCounterUpdate object ex: 
                        OkPacket {
                        fieldCount: 0,
                        affectedRows: 1,
                        insertId: 0,
                        serverStatus: 2,
                        warningCount: 0,
                        message: '(Rows matched: 1  Changed: 1  Warnings: 0',
                        protocol41: true,
                        changedRows: 1 
                        } 
                        */


                        //Success.
                        strReturn = nCounterUpdate; //define value for return variable

                        resolve(strReturn);
                    }else{
                        //Error.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8"));
                        }
                        reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage8")));
                        //reject(new Error("strReturn is undefined."));
                    }


                    //Debug.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(resultsSQLCounterUpdate.affectedRows + " " + FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage7"));
                    }
                    //console.log("resultsSQLCounterUpdate = ");
                    //console.log(resultsSQLCounterUpdate);
                }
            })
        });
        //----------------------


        //Debug.
        //strReturn = nCounterUpdate;

        //strReturn = nCounter;
        //return strReturn;


        //Usage.
        //----------------------
        /* 
        //(async ()=>{ //working
        (async function(){
            try{ 
                let idNew = await SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1);
                console.log("counterUniversalUpdate_async_debug=", idNew); //working
            }catch(aError){
                console.error(aError);
            }finally{
        
            }
        })() 
        */
        //----------------------
    }
    //**************************************************************************************
};