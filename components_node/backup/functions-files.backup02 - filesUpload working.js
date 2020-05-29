"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
//const dbSystemCon = require("../config-application-db.js").dbSystemCon; //DB System - simple connection.
//const dbSystemConPool = require("../config-application-db.js").dbSystemConPool; //DB System - pool connection.

const FunctionsGeneric = require("./functions-generic.js");
//const FunctionsDB = require("./functions-db.js");

//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql"); //MySQL package.
//const lodash = require("lodash"); //Utils. 
const fs = require("fs"); //File System
const fsExtra = require("fs-extra"); //File System
const path = require("path"); //Necessary to serve static files.
//----------------------


module.exports = class FunctionsFiles
{
	//Upload files function.
    //**************************************************************************************
    /**
     * @static
     * @async
     * @param {string} idRecord 
     * @param {object} postedFile 
     * @param {string} directoryUpload c:\directory\subdirectory
     * @param {string} fileNameFinal optional
     * @returns {object} {returnStatus: false, returnFileName: ""}
     * @example SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                    this.openedFiles, 
                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                    "");
     * 
     */
    static async filesUpload(idRecord, postedFile, directoryUpload, fileNameFinal = "")
    //static filesUpload(idRecord, postedFile, directoryUpload, fileNameFinal)
    {
        //Variables.
        //----------------------
        //let strReturn = false;
        let strReturn = {returnStatus: false, returnFileName: ""}; //{returnStatus: false, returnFileName: ""}

        let fileTempPath = postedFile[0].path; //temporary file + path of our uploaded file
        let fileNameOriginal = postedFile[0].name; //the file name of the uploaded file
        
        let arrFileExtension = "";
        //let fileExtension = path.extname(formParseResults.files.image_main.path).toLowerCase();
        let fileExtension = "";
        let fileName = "";
    
        /* Location where we want to copy the uploaded file */
        //let new_location = 'c:/localhost/nodejs/';
        //let new_location = gSystemConfig.configPhysicalPathRoot + "/" + gSystemConfig.configDirectoryFilesVisualization + "/";
        let directoryFilesUpload = directoryUpload + "\\";
        //----------------------


        if(fileNameOriginal !== "") //check if file was posted.
        {
            //Define values.
            fileExtension = path.extname(fileNameOriginal).toLowerCase();
            fileName = idRecord + fileExtension;

            strReturn.returnFileName = fileName;

            //Check if it´s an image (for resizing and copying an original file size).
            //if(gSystemConfig.configImageQuality.indexOf(fileExtension) !== -1)
            if(gSystemConfig.configImageFormats.includes(fileExtension) == true)
            {
                //Include prefix for recording the original size image.
                fileName = "o" + fileName;
            }
            //console.log("configImageFormats.includes(fileExtension)=", gSystemConfig.configImageFormats.includes(fileExtension)); //debug


            //Copy file.
            //----------------------
            //fsExtra.copy(temp_path, new_location + file_name, function(err){  
            //fsExtra.copy(fileTempPath, directoryFilesUpload + fileName, function(fileCopyError){
            //return await new Promise((resolve, reject)=>{ 
            let resultsFSExtraCopy = await new Promise((resolve, reject)=>{ 
            //let resultsFSExtraCopy = new Promise((resolve, reject)=>{ 
                    fsExtra.copy(fileTempPath, directoryFilesUpload + fileName, (fileCopyError)=>{
                    if(fileCopyError)
                    {
                        //Error.
                        if(gSystemConfig.configDebug === true)
                        {
                            //console.error("File copy error: " + fileCopyError);
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage17e"));
                            console.error(fileCopyError);
                        }
                        reject(false);
                    }else{
                        if(gSystemConfig.configDebug === true)
                        {
                            //console.log("File copy success.");
                            console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage17"));
                        }
                        resolve(true);

                        /*fs.unlink(fileTempPath, (fileDeleError)=>{
                        //fs.unlinkSync(fileTempPath, (fileDeleError)=>{
                            if(fileDeleError)
                            {
                                //Error.
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("File deleting error: ", fileDeleError);
                                }
                                //throw fileDeleError;
                                //reject(new Error(fileDeleError));
                                reject(false);
                            }else{
                                if(gSystemConfig.configDebug === true)
                                {
                                    console.log("File deleting sucess.");
                                }
                                //resolve(results);
                                resolve(true);

                                //Define file name.
                                //tblCategoriesImageMain = fileName;
                            }
                        });*/
                            
                    }
                });
            });  
            //----------------------


            //Define value.
            //strReturn = resultsFSExtraCopy;
            strReturn.returnStatus = resultsFSExtraCopy;
            //strReturn.returnFileName = fileName;
        }else{
            strReturn.returnStatus = true;
        }


        //Delete temporary file.
        if(fileNameOriginal !== "") //check if file was posted.
        {
            if(strReturn.returnStatus == true)
            {
                fs.unlink(fileTempPath, (fileDeleError)=>{
                //fs.unlinkSync(fileTempPath, (fileDeleError)=>{
                    if(fileDeleError)
                    {
                        //Error.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log("File deleting error: ", fileDeleError);
                        }
                        //throw fileDeleError;
                        //reject(new Error(fileDeleError));
                        //reject(false);
                    }else{
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log("File deleting sucess.");
                        }
                        //resolve(results);
                        //resolve(true);

                        //Define file name.
                        //tblCategoriesImageMain = fileName;
                    }
                });
            }
        }


        //Debug.
        //console.log("fileNameOriginal=", fileNameOriginal);
        //console.log("fileTempPath=", fileTempPath);
        //console.log("fileNameOriginal=", fileNameOriginal);

        return strReturn;


        //Usage.
        /*
        var resultsFunctionsFiles = await new Promise((resolve, reject)=>{
            //resultsFunctionsFiles = await new Promise((resolve, reject)=>{
            SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                    this.openedFiles, 
                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                    "")
            .then(function(results){
                if(results === undefined)
                {
                    //Error.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage17e"));
                    }
                    //reject(new Error("nCounterUpdate is undefined."));
                    reject(false);
                }else{
                    //Success.
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage17"));
                    }
                    resolve(results);
                } //working
            });
        });
        */
    }
	//**************************************************************************************

}