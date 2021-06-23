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
        //strSQLCounterSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter ";
        strSQLCounterSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCounter + " ";
        
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
     * @static
     * @param {int} idTbCounter 
     * @returns {int | double}
     * @example
     * SyncSystemNS.FunctionsDB.counterUniversalSelect_async(1)
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
        //strSQLCounterSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter ";
        strSQLCounterSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCounter + " ";
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
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection) {
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{

                    //dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
                    dbSystemConPoolGetConnection.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
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
        //strSQLCounterSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter ";
        strSQLCounterSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCounter + " ";
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
            
            dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection) {
                if(dbSystemPoolError)
                {
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                    }
                    throw dbSystemPoolError;
                }else{
                    //dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
                    dbSystemConPoolGetConnection.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
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
        //strSQLCounterUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter SET";
        strSQLCounterUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCounter + " SET";

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
     * @static
     * @param {int} idTbCounter 1 - Universal Counter | 5 - Import
     * @returns {int | double}
     * @example
     * SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1)
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
        //nCounterUpdate = nCounterUpdate + 1;
        nCounterUpdate = parseInt(nCounterUpdate) + 1;
        //----------------------


        //Query.
        //----------------------
        //strSQLCounterUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + "counter SET";
        strSQLCounterUpdate += "UPDATE " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + gSystemConfig.configSystemDBTableCounter + " SET";
        strSQLCounterUpdate += " counter_global = ?";
        strSQLCounterUpdate += " WHERE id = ?";
        //----------------------


        //Execute query.
        //----------------------
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

                    //dbSystemCon.query(strSQLCounterUpdate, [nCounterUpdate, idTbCounter], (dbSystemError, resultsSQLCounterUpdate) => {
                    dbSystemConPoolGetConnection.query(strSQLCounterUpdate, [nCounterUpdate, idTbCounter], (dbSystemError, resultsSQLCounterUpdate) => {
                        dbSystemConPoolGetConnection.release();
                        
                        if(dbSystemError)
                        {
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                            }
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
                    });
        
                }
            });            
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


    //Function do return results from any field in table.
    //**************************************************************************************
    /**
     * Function do return results from any field in table.
     * @static
     * @async
     * @param {integer} idRecord 
     * @param {string} strTable categories
     * @param {string} fieldName 
     * @returns {string}
     */
    static async genericFieldGet01(idRecord, strTable, fieldName)
    {
        //Variables.
        //----------------------
        let strReturn = "";
        let objResultGenericField;
        let strSQLGenericFieldSelect = "";
        let strSQLGenericFieldSelectParams = [];
        //----------------------

        if(strTable)
        {
            //Query.
            //----------------------
            strSQLGenericFieldSelect += "SELECT ";
            strSQLGenericFieldSelect += "id, ";
            strSQLGenericFieldSelect += "title ";
            strSQLGenericFieldSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + FunctionsGeneric.contentMaskWrite(strTable, "db_sanitize") + " ";
            strSQLGenericFieldSelect += "WHERE id <> 0";
            //----------------------


            //Parameters.
            //----------------------
            //if(idRecord != null && idRecord != "" && (typeof idRecord !== 'undefined'))
            if(idRecord)
            {
                //strSQLGenericFieldSelect += " AND " + mysql.escape("id") + " = ?";//not workig, because it wraps in single quotes.
                strSQLGenericFieldSelect += " AND id = ?";
                strSQLGenericFieldSelectParams.push(idRecord);
            }
            //----------------------

            
            //Execute query.
            //----------------------
            objResultGenericField = await new Promise((resolve, reject) => {
                dbSystemConPool.getConnection(function(dbSystemPoolError, dbSystemConPoolGetConnection) {
                    if(dbSystemPoolError)
                    {
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
                        }
                        throw dbSystemPoolError;
                    }else{
                        //dbSystemCon.query(strSQLGenericFieldSelect, strSQLGenericFieldSelectParams, (dbSystemError, resultsSQLCounterRows) => {
                        dbSystemConPoolGetConnection.query(strSQLGenericFieldSelect, strSQLGenericFieldSelectParams, (dbSystemError, resultsSQLCounterRows) => {
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
                                //nCounter = resultsSQLCounterRows[0][fieldName];
                                //objResultGenericField = resultsSQLCounterRows[0][fieldName];
            
            
                                //if(nCounter === undefined)
                                if(resultsSQLCounterRows === undefined)
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
                                    resolve(resultsSQLCounterRows);
                                }
                            }
                        });
                    }
                });  
            });


            //Return data treatment.
            //----------------------
            //strReturn = nCounter;
            strReturn = objResultGenericField[0][fieldName];
            //----------------------
        }else{
            //strReturn = false;
            strReturn = "";
        }


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
        

        return strReturn;


        //Usage.
        //----------------------
        //${ await SyncSystemNS.FunctionsDB.genericFieldGet01(790, gSystemConfig.configSystemDBTableCategories, "title")/**/ + '' }
        //----------------------
    }
    //**************************************************************************************


    //Function do return results from any field in table.
    //**************************************************************************************
    static async genericFieldGet11(strTable, 
    fieldNameReturn, 
    arrSearchParameters, 
    configSortOrder = "", 
    strNRecords = "", 
    strReturnFields = "", 
    searchType = 1, 
    objSpecialParameters = {returnType: 1})
    {
        //arrSearchParameters: ["fieldNameSearch1;fieldValueSearch1;fieldTypeSearch1", "fieldNameSearch2;fieldValueSearch2;fieldTypeSearch2", "fieldNameSearch3;fieldValueSearch3;fieldTypeSearch3"]
            //typeFieldSearch1: s (string) | i (integer) | d (date) | dif (initial date and final date) | ids (id IN)
        //strReturnFields: field names, separated by commas. Ex: id, id_parent
        //searchType: 1 - all results | 2 - first result | 3 - count records
        //objSpecialParameters {returnType: 3, pageNumber: 2, pagingNRecords: 20}
            //returnType: 1 - string | 3 - JSon Object | 5 - Array (single column of data - strReturnFields must contain only one db column)
            //strSeparator: (any string) - in case of using returnType: 1 (string)

        //Variables.
        //----------------------
        let strReturn = "";
        //----------------------


    }
    //**************************************************************************************


    //Function do return results from any table.
    //**************************************************************************************
    /**
     * Function do return results from any table.
     * @static
     * @async
     * @param {string} strTable categories
     * @param {array} arrSearchParameters ["fieldNameSearch1;fieldValueSearch1;fieldTypeSearch1", "fieldNameSearch2;fieldValueSearch2;fieldTypeSearch2", "fieldNameSearch3;fieldValueSearch3;fieldTypeSearch3"]
     * @param {string} configSortOrder 
     * @param {string} strNRecords 
     * @param {string} strReturnFields field names, separated by commas. Ex: id, id_parent
     * @param {integer} searchType 1 - all results | 2 - first result | 3 - count records
     * @param {object} objSpecialParameters 
     * @returns {object}
     */
    static async genericTableGet02(strTable, 
    arrSearchParameters, 
    configSortOrder = "", 
    strNRecords = "", 
    strReturnFields = "", 
    searchType = 1, 
    objSpecialParameters = {returnType: 3})
    {
        //arrSearchParameters: ["fieldNameSearch1;fieldValueSearch1;fieldTypeSearch1", "fieldNameSearch2;fieldValueSearch2;fieldTypeSearch2", "fieldNameSearch3;fieldValueSearch3;fieldTypeSearch3"]
            //typeFieldSearch1: s (string) | !s (string - not equal) | i (integer) | !i (integer - not equal) | oi (integer - or) | d (date) | dif (initial date and final date) | ids (id IN)
        //strReturnFields: field names, separated by commas. Ex: id, id_parent
        //searchType: 1 - all results | 2 - first result | 3 - count records
        //objSpecialParameters {returnType: 3, pageNumber: 2, pagingNRecords: 20}
            //returnType: 1 - string | 3 - JSon Object | 5 - Array (single column of data - strReturnFields must contain only one db column)
            //strSeparator: (any string) - in case of using returnType: 1 (string)

        //Variables.
        //----------------------
        let strReturn = "";

        let strSQLGenericTableSelect = "";
        let strSQLGenericTableSelectParams = [];

        let resultsSQLGenericTable = "";

        let pageNumber = (objSpecialParameters.hasOwnProperty("_pageNumber")) ? objSpecialParameters._pageNumber : "";
        let pagingNRecords = (objSpecialParameters.hasOwnProperty("_pagingNRecords")) ? objSpecialParameters._pagingNRecords : "";

        let strOperator = "";
        //----------------------


        //Query.
        //----------------------
        strSQLGenericTableSelect += "SELECT ";
        //strSQLGenericTableSelect += "* "; //debug.
        strSQLGenericTableSelect += FunctionsGeneric.contentMaskWrite(strReturnFields, "db_sanitize") + " ";
        //strSQLGenericTableSelect += "id, ";
        //strSQLGenericTableSelect += "counter_global, ";
        //strSQLGenericTableSelect += "description ";
        //strSQLGenericTableSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + FunctionsGeneric.contentMaskWrite(strTable, "db_sanitize") + " ";
        strSQLGenericTableSelect += "FROM " + process.env.CONFIG_SYSTEM_DB_TABLE_PREFIX + FunctionsGeneric.contentMaskWrite(strTable, "db_sanitize");
        //strSQLGenericTableSelect += "WHERE id <> 0";
        //strSQLGenericTableSelect += "AND id = :id ";
        //strSQLGenericTableSelect += "AND id = ? ";
        //----------------------


        //Parameters.
        //----------------------
        //if(idTbCounter != null && idTbCounter != "" && (typeof idTbCounter !== 'undefined'))
        //{
            //strSQLCounterSelect += " AND " + mysql.escape("id") + " = ?";//not workig, because it wraps in single quotes.
            //strSQLGenericTableSelect += " AND id_parent = ?";
            //strSQLGenericTableSelectParams.push("0");
        //}

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
                strSQLGenericTableSelect += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " = ?";
                strSQLGenericTableSelectParams.push(searchParametersFieldValue);
            }
            //Integer - not equal.
            if(searchParametersFieldType == "!i")
            {
                strSQLGenericTableSelect += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " <> ?";
                strSQLGenericTableSelectParams.push(searchParametersFieldValue);
            }
            //Integer - or.
            if(searchParametersFieldType == "oi")
            {
                if(strOperator != "WHERE")
                {
                    strOperator = "OR"
                }
                strSQLGenericTableSelect += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " <> ?";
                strSQLGenericTableSelectParams.push(searchParametersFieldValue);
            }

            //String.
            if(searchParametersFieldType == "s")
            {
                strSQLGenericTableSelect += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " = ?";
                strSQLGenericTableSelectParams.push(searchParametersFieldValue);
            }
            //String - not equal.
            if(searchParametersFieldType == "!s")
            {
                strSQLGenericTableSelect += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " <> ?";
                strSQLGenericTableSelectParams.push(searchParametersFieldValue);
            }
            //String - or.
            if(searchParametersFieldType == "os")
            {
                if(strOperator != "WHERE")
                {
                    strOperator = "OR"
                }
                strSQLGenericTableSelect += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " = ?";
                strSQLGenericTableSelectParams.push(searchParametersFieldValue);
            }

            //ids.
            if(searchParametersFieldType == "ids")
            {
                let arrIds = searchParametersFieldValue.split(",");

                strSQLGenericTableSelect += " " + strOperator + " " + FunctionsGeneric.contentMaskWrite(searchParametersFieldName, "db_sanitize") + " IN (" + "?".repeat(arrIds.length).split("").join(",") + ")";

                for(let countArrayParameters = 0; countArrayParameters < arrIds.length; countArrayParameters++)
                {
                    strSQLGenericTableSelectParams.push(arrIds[countArrayParameters]);
                }
            }


            //Debug.
            //print("arrSearchParameters=" + arrSearchParameters[countArray]);
            //print("searchParametersFieldName=" + searchParametersFieldName);
            //print("searchParametersFieldValue=" + searchParametersFieldValue);
            //print("searchParametersFieldType=" + searchParametersFieldType);
        }

        if(configSortOrder)
        {
            strSQLGenericTableSelect += " ORDER BY " + configSortOrder;
        }

        if(strNRecords)
        {
            strSQLGenericTableSelect += " LIMIT " + strNRecords;
        }

        //Paging.
        if(pageNumber != "" && pagingNRecords != "")
        {
            //Logic - calculating limit.
            let limitStart = (pageNumber * pagingNRecords) - pagingNRecords;
            //let limitEnd = pageNumber * pagingNRecords; //wrong
            let limitEnd = pagingNRecords;

            
            strSQLGenericTableSelect += " LIMIT " + limitStart + ", " + limitEnd;


            //Debug.
            /*
            console.log("genericTableGet02.pageNumber = ", pageNumber);
            console.log("genericTableGet02.pagingNRecords = ", pagingNRecords);
            console.log("genericTableGet02.limitStart = ", limitStart);
            console.log("genericTableGet02.limitEnd = ", limitEnd);
            */
        }


        //Debug.
        if(gSystemConfig.configDebug === true)
        {
            console.log("strSQLGenericTableSelect=", strSQLGenericTableSelect);
        }
        //----------------------


        //Execute query.
        //----------------------
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
                    //dbSystemCon.query(strSQLCounterSelect, strSQLCounterSelectParams, (dbSystemError, resultsSQLCounterRows) => {
                    dbSystemConPoolGetConnection.query(strSQLGenericTableSelect, strSQLGenericTableSelectParams, (dbSystemError, resultsSQLGenericTableRows) => {
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

                            //All results.
                            if(searchType == 1)
                            {
                                resultsSQLGenericTable = resultsSQLGenericTableRows;
                            }

                            //Count.
                            if(searchType == 3)
                            {
                                resultsSQLGenericTable = resultsSQLGenericTableRows;
                            }
                            
                            if(resultsSQLGenericTable === undefined)
                            {
                                //Error.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                                }
        
                                reject(new Error(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9")));
                                //reject(new Error("nCounter is undefined."));
                            }else{
                                //All results.
                                if(searchType == 1)
                                {
                                    //JSon Object.
                                    if(objSpecialParameters.returnType == 3)
                                    {
                                        //Success.
                                        resolve(resultsSQLGenericTable);
                                    }


                                    //Array.
                                    if(objSpecialParameters.returnType == 5)
                                    {
                                        //Success.
                                        //Convert single column of object into array.
                                        resolve(Object.keys(resultsSQLGenericTable).map(key => resultsSQLGenericTable[key][strReturnFields]));
                                    }
                                }


                                //Count records.
                                if(searchType == 3)
                                {
                                    //Success.
                                    resolve(resultsSQLGenericTable.length);
                                    //resolve(resultsSQLGenericTable);
                                }
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


        //return strReturn;


        //Usage.
        //----------------------
        /*
        let genericTableGet02ResultDebug = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                                                                                            ["id_parent;0;i", "activation;1;i"], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "5", 
                                                                                            "id, id_parent, sort_order, category_type, date_creation, title, activation", 
                                                                                            1, 
                                                                                            {returnType: 3});

        //In case of returning one record.
        valueCurrent = genericTableGet02ResultDebug[0]["fieldName"];

        //Loop through records.
        ${oclRecords.genericTableGet02ResultDebug.map((recordsRow)=>{
            return `
                ${ recordsRow.id }
             `;
         }).join("")}
        */
        //----------------------
    }
    //**************************************************************************************
    
    
    //Function do return the table name of an id number.
    //**************************************************************************************
    /**
     * Function do return the table name of an id number.
     * @static
     * @async
     * @param {integer} idRecord 
     * @returns {object}
     */
    static async tableFindGet(idRecord, objSpecialParameters = null)
    {
        //objSpecialParameters = {_returnType = 3, activation: 1}

        //Variables.
        //----------------------
        let objReturn = {tableName: "", tableData: null, returnStatus: false}; //{tableName: "string", tableData: null, returnStatus: false}
        //----------------------


        //Logic.
        //----------------------
        if(idRecord)
        {
            //Check categories table.
            if(objReturn.returnStatus === false)
            {
                //"id, id_parent, title",
                objReturn.tableData = await this.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                    ["id;" + idRecord + ";i"], 
                                                                    "", 
                                                                    "1", 
                                                                    FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableCategories, "all", "string"),
                                                                    1, 
                                                                    {returnType: 3});

                if(objReturn.tableData.length)
                {
                    objReturn.tableName = gSystemConfig.configSystemDBTableCategories;
                    objReturn.returnStatus = true;
                }
            }


            //Check publications table.
            if(objReturn.returnStatus === false)
            {
                //"id, id_parent, title",
                objReturn.tableData = await this.genericTableGet02(gSystemConfig.configSystemDBTablePublications, 
                                                                    ["id;" + idRecord + ";i"], 
                                                                    "", 
                                                                    "1", 
                                                                    FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTablePublications, "all", "string"),
                                                                    1, 
                                                                    {returnType: 3});

                if(objReturn.tableData.length)
                {
                    objReturn.tableName = gSystemConfig.configSystemDBTablePublications;
                    objReturn.returnStatus = true;
                }
            }


            //Check registers table.
            if(objReturn.returnStatus === false)
            {
                //"id, id_parent, title",
                objReturn.tableData = await this.genericTableGet02(gSystemConfig.configSystemDBTableRegisters, 
                                                                    ["id;" + idRecord + ";i"], 
                                                                    "", 
                                                                    "1", 
                                                                    FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableRegisters, "all", "string"),
                                                                    1, 
                                                                    {returnType: 3});

                if(objReturn.tableData.length)
                {
                    objReturn.tableName = gSystemConfig.configSystemDBTableRegisters;
                    objReturn.returnStatus = true;
                }
            }

            //Check quizzes table.
            if(objReturn.returnStatus === false)
            {
                //"id, id_parent, title",
                objReturn.tableData = await this.genericTableGet02(gSystemConfig.configSystemDBTableQuizzes, 
                                                                    ["id;" + idRecord + ";i"], 
                                                                    "", 
                                                                    "1", 
                                                                    FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableQuizzes, "all", "string"),
                                                                    1, 
                                                                    {returnType: 3});

                if(objReturn.tableData.length)
                {
                    objReturn.tableName = gSystemConfig.configSystemDBTableQuizzes;
                    objReturn.returnStatus = true;
                }
            }


            //Check forms table.
            if(objReturn.returnStatus === false)
            {
                //"id, id_parent, title",
                objReturn.tableData = await this.genericTableGet02(gSystemConfig.configSystemDBTableForms, 
                                                                    ["id;" + idRecord + ";i"], 
                                                                    "", 
                                                                    "1", 
                                                                    FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableForms, "all", "string"),
                                                                    1, 
                                                                    {returnType: 3});

                if(objReturn.tableData.length)
                {
                    objReturn.tableName = gSystemConfig.configSystemDBTableForms;
                    objReturn.returnStatus = true;
                }
            }


            //Check forms fields table.
            if(objReturn.returnStatus === false)
            {
                //"id, id_parent, title",
                objReturn.tableData = await this.genericTableGet02(gSystemConfig.configSystemDBTableFormsFields, 
                                                                    ["id;" + idRecord + ";i"], 
                                                                    "", 
                                                                    "1", 
                                                                    FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFormsFields, "all", "string"),
                                                                    1, 
                                                                    {returnType: 3});

                if(objReturn.tableData.length)
                {
                    objReturn.tableName = gSystemConfig.configSystemDBTableFormsFields;
                    objReturn.returnStatus = true;
                }
            }
        }
        //----------------------


        //Debug.
        //strReturn = {tableName: "categories", tableData: {}, returnStatus: false};
        return objReturn;
    }
    //**************************************************************************************

};