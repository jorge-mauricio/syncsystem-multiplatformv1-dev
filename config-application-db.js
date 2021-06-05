"use strict";

//Import Node Modules.
//----------------------
require("dotenv").config();

const mysql = require("mysql"); //MySQL package.

const gSystemConfig = require("./config-application.js"); //System configuration.

const FunctionsGeneric = require("./" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
//----------------------


//MySQL
//DB System.
//**************************************************************************************
//Create a connection.
//----------------------
/**/
const dbSystemCon = mysql.createConnection({
    supportBigNumbers: true,
    bigNumberStrings: true,
    connectTimeout: 30000,
    //port: 3306, //may be needed if returns Error: connect ETIMEDOUT
    host     : process.env.DB_SYSTEM_HOST,
    user     : process.env.DB_SYSTEM_USER,
    password : process.env.DB_SYSTEM_PASSWORD,
    database : process.env.DB_SYSTEM_DATABASE
});

//----------------------


//Create a connection (pool) - alternate method - working.
//----------------------
/*
ref: 
https://github.com/mysqljs/mysql
https://stackoverflow.com/questions/55560039/how-is-the-correct-way-to-handle-mysql-connections-in-node-js
*/
const dbSystemConPool = mysql.createPool({
    supportBigNumbers: true,
    bigNumberStrings: true,
    connectionLimit : 99, //check limit on MySql database server, minus 1
    connectTimeout: 30000,
    //port: 3306, //may be needed if returns Error: connect ETIMEDOUT
    host     : process.env.DB_SYSTEM_HOST,
    user     : process.env.DB_SYSTEM_USER,
    password : process.env.DB_SYSTEM_PASSWORD,
    database : process.env.DB_SYSTEM_DATABASE
});
//----------------------


//Connect.
//----------------------
/**/
dbSystemCon.connect((dbSystemError)=>{
    if(dbSystemError)
    {
        //Error.
        if(gSystemConfig.configDebug === true)
        {
            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
        }

        throw dbSystemError;
        //console.log("DB System Error: " + dbSystemError);
    }else{
        //Success.
        //console.log("DB connection: success"); //debug
    }
});
//----------------------


//Connect.
//----------------------
function dbSystemConConnect()
{
    dbSystemCon.connect((dbSystemError)=>{
        if(dbSystemError)
        {
            //Error.
            if(gSystemConfig.configDebug === true)
            {
                console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessageError50"));
            }
    
            throw dbSystemError;
            //console.log("DB System Error: " + dbSystemError);
        }else{
            //Success.
            //console.log("DB connection: success"); //debug
        }
    });
}
//----------------------
//**************************************************************************************


//Export modules.
module.exports.dbSystemCon = dbSystemCon; //working
module.exports.dbSystemConPool = dbSystemConPool; //working
module.exports.dbSystemConConnect = dbSystemConConnect;
//module.exports.dbSystemCon = function() {}; //not working

//module.exports = dbSystemCon; //working
/* module.exports = {
    dbSystemCon
};*/ //not working
//Try modifiyng the "require end" with .dbSystemCon.


//module.exports = mysql;
//module.exports = dbSystemCon, mysql; //Working, but has to require on the other end.
/*module.exports = {
    dbSystemConPool : dbSystemConPool,
    dbSystemCon : dbSystemCon
};*/