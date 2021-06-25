"use strict";

//Import Node Modules.
//----------------------
require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.

const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
//----------------------


//Backend - main.
//**************************************************************************************
/*router.get("/", (req, res)=>{

});*/
//**************************************************************************************


//Backend - Records - Delete.
//TODO: middleware function to check user_root or user_backend
//**************************************************************************************
//app.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/:idParent?", (req, res)=>{ //working, with the async block
//router.delete("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/delete/", (req, res)=>{ //working, with the async block
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/delete", (req, res)=>{ //working, with the async block
//router.delete("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords, (req, res)=>{ //working, with the async block
//router.delete("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords, (req, res, next)=>{ //working, with the async block
router.delete("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root_or_user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables.
    //----------------------
    let strTable = "";
    
    //let clBackend = new CategoriesListing();
    //let clBackend;
    let idParent = "";

    let fileType = "";

    let idQuizzes = "";

    let idForms = "";
    let idFormsFields = "";

    let tableName = "";
    let filterIndex = "";

    let pageReturn = "";
    let pageNumber = "";
    let masterPageSelect = "layout-backend-main";
    
    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";

    let idsRecordsDelete = [];
    //let arrIdsRecordsDelete = [];

    let deleteRecordsGeneric10Result;
    let deleteRecordsFilesResult;
    let deleteRecordsFilesFields;
    let returnURL = "";
    //----------------------


    //Value definition.
    //----------------------
    if(req.body.strTable)
    {
        strTable = req.body.strTable;
    }
    
    if(req.body.idParent)
    {
        idParent = req.body.idParent;
    }
    if(req.body.fileType)
    {
        fileType = req.body.fileType;
    }
    if(req.body.idQuizzes)
    {
        idQuizzes = req.body.idQuizzes;
    }
    if(req.body.idForms)
    {
        idForms = req.body.idForms;
    }
    if(req.body.idFormsFields)
    {
        idFormsFields = req.body.idFormsFields;
    }

    if(req.body.tableName)
    {
        tableName = req.body.tableName;
    }
    if(req.body.filterIndex)
    {
        filterIndex = req.body.filterIndex;
    }

    if(req.body.pageReturn)
    {
        pageReturn = req.body.pageReturn;
    }
    if(req.body.pageNumber)
    {
        pageNumber = req.body.pageNumber;
    }
    if(req.body.masterPageSelect)
    {
        masterPageSelect = req.body.masterPageSelect;
    }

    /*
    if(req.query.messageSuccess)
    {
        messageSuccess = req.params.messageSuccess;
    }
    if(req.query.messageError)
    {
        messageError = req.params.messageError;
    }
    if(req.query.messageAlert)
    {
        messageAlert = req.params.messageAlert;
    }
    */

   if(req.body.idsRecordsDelete)
   {
        //idsRecordsDelete = req.body._method;
        //idsRecordsDelete = req.body.idsRecordsDelete[];
        //idsRecordsDelete = req.body.idsRecordsDelete[];
        //idsRecordsDelete = req.body.idsRecordsDelete;
        //arrIdsRecordsDelete = req.body.arrIdsRecordsDelete; //workign
        //arrIdsRecordsDelete = req.body.arrIdsRecordsDelete.slice(); //working
        //arrIdsRecordsDelete = req.body[...arrIdsRecordsDelete]; //didn´t work
        //arrIdsRecordsDelete = Array.from(req.body.arrIdsRecordsDelete);
        //arrIdsRecordsDelete = arrIdsRecordsDelete.concat(req.body.arrIdsRecordsDelete); //best method, because it assumes single strings as arrays
        //arrIdsRecordsDelete.push.apply(arrIdsRecordsDelete, req.body.arrIdsRecordsDelete); //working
        
        //idsRecordsDelete = req.body["arrIdsRecordsDelete"];

        /*
        if(Array.isArray(req.body.idsRecordsDelete) == true)
        {
            idsRecordsDelete = req.body.idsRecordsDelete
        }else{
            idsRecordsDelete = req.body.idsRecordsDelete
        }
        */
        
       idsRecordsDelete = idsRecordsDelete.concat(req.body.idsRecordsDelete); //best method, because it assumes single strings as arrays
    }


    //Debug.
    //console.log("strTable=", strTable);
    //console.log("req.body=", req.body);
    //----------------------


    //Return URL build.
    //----------------------
    returnURL = "/" + pageReturn;
    if(idParent != "")
    {
        //returnURL = "/" + pageReturn + "/" + idParent;
        returnURL += "/" + idParent;
    }
    if(idQuizzes != "")
    {
        returnURL += "/" + idQuizzes;
    }
    if(idForms != "")
    {
        //returnURL = "/" + pageReturn + "/" + idForms;
        returnURL += "/" + idForms;
    }
    if(idFormsFields != "")
    {
        //returnURL = "/" + pageReturn + "/" + idFormsFields;
        returnURL += "/" + idFormsFields;
    }
    returnURL += "?masterPageSelect=" + masterPageSelect;
    if(pageNumber)
    {
        returnURL += "&pageNumber=" + pageNumber;
    }
    if(fileType)
    {
        returnURL += "&fileType=" + fileType;
    }

    if(tableName)
    {
        returnURL += "&tableName=" + tableName;
    }
    if(filterIndex)
    {
        returnURL += "&filterIndex=" + filterIndex;
    }
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idsRecordsDelete)
            {
                //Delete files.
                deleteRecordsFilesFields = SyncSystemNS.FunctionsGeneric.tableFieldsQueryBuild01(strTable, "files", "array");
                //console.log("deleteRecordsFilesFields=", deleteRecordsFilesFields);

                //if(deleteRecordsFilesFields)
                //if(typeof deleteRecordsFilesFields != "undefined" && deleteRecordsFilesFields != null && deleteRecordsFilesFields.length != null && deleteRecordsFilesFields.length > 0) //pre ES5
                if(Array.isArray(deleteRecordsFilesFields) && deleteRecordsFilesFields.length)
                {
                    deleteRecordsFilesResult = await SyncSystemNS.FunctionsDB.genericTableGet02(strTable, 
                                                                                                ["id;" + idsRecordsDelete.join(",") + ";ids"], 
                                                                                                "", 
                                                                                                "", 
                                                                                                //"image_main, file1, file2, file3, file4, file5",
                                                                                                deleteRecordsFilesFields.join(","),
                                                                                                1);
                    //Debug.                                                                                                
                    //console.log("deleteRecordsFilesResult=", deleteRecordsFilesResult);
                    //console.log("deleteRecordsFilesFields=", deleteRecordsFilesFields);
                    

                    //Loop through results.
                    deleteRecordsFilesResult.map((deleteRecordsFilesRow)=>{
                        //Loop through field name array.
                        for(let countFieldArray = 0; countFieldArray < deleteRecordsFilesFields.length; countFieldArray++)
                        {
                            //Delete files.
                            //if(deleteRecordsFilesRow[deleteRecordsFilesFields[countFieldArray]] != "")
                            if(deleteRecordsFilesRow[deleteRecordsFilesFields[countFieldArray]])
                            {
                                (async function(){ //async marks the block
                                    try
                                    { 

                                        let objResultFileDelete = await SyncSystemNS.FunctionsFiles.fileDelete02(deleteRecordsFilesRow[deleteRecordsFilesFields[countFieldArray]], "", SyncSystemNS.FunctionsGeneric.arrImageSizeSelect(strTable));
                                    }catch(asyncErrorDelete){

                                    }finally{

                                    }
                                })();

                                //Debug.
                                //console.log("deleteRecordsFilesRow[]=", deleteRecordsFilesRow[deleteRecordsFilesFields[countFieldArray]]);
                            }
                            //Debug.
                            //console.log("deleteRecordsFilesRow[]=", deleteRecordsFilesRow[deleteRecordsFilesFields[countFieldArray]]);
                        }


                        //Debug.
                        //console.log("deleteRecordsFilesRow.image_main=", deleteRecordsFilesRow.image_main);
                        //console.log("deleteRecordsFilesRow.file1=", deleteRecordsFilesRow.file1);
                        //console.log("deleteRecordsFilesRow.file2=", deleteRecordsFilesRow.file2);
                        //console.log("deleteRecordsFilesRow.file3=", deleteRecordsFilesRow.file3);
                        //console.log("deleteRecordsFilesRow.file4=", deleteRecordsFilesRow.file4);
                        //console.log("deleteRecordsFilesRow.file5=", deleteRecordsFilesRow.file5);
                    });
                }


                //let deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10("categories", ["id;648;i"]); //worked
                //let deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10("categories", ["id;649,650;ids"]);
                //deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10("categories", ["id;"+ idsRecordsDelete.join(",") + ";ids"]);
                //deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10(gSystemConfig.configSystemDBTableCategories, ["id;"+ idsRecordsDelete.join(",") + ";ids"]);
                deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10(strTable, ["id;"+ idsRecordsDelete.join(",") + ";ids"]);
                //deleteRecordsGeneric10Result = {returnStatus: true, nRecords: 99}; //debug
            }else{
                deleteRecordsGeneric10Result = {returnStatus: false, nRecords: 0}
            }
            
            //Debug.
            //console.log("deleteRecordsGeneric10Result=", deleteRecordsGeneric10Result);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error("asyncError=", asyncError);
            }
        }finally{
            if(deleteRecordsGeneric10Result.returnStatus == true)
            {
                returnURL += "&messageSuccess=statusMessage10";
                returnURL += "&nRecords=" + deleteRecordsGeneric10Result.nRecords;
            }else if(deleteRecordsGeneric10Result.returnStatus == false)
            {
                returnURL += "&messageError=statusMessage10e";
            }


            //Debug.
            //console.log("req=", req);
            //console.log("body=", req.body); //working
            //console.log("body['arrIdsRecordsDelete']=", req.body["arrIdsRecordsDelete"]); //working
            //console.log("body.arrIdsRecordsDelete=", req.body.arrIdsRecordsDelete); //working
            //console.log("idsRecordsDelete=", idsRecordsDelete);
            //console.log("arrIdsRecordsDelete=", arrIdsRecordsDelete);
            //res.send(req.params.id);

            //console.log("idParent=", idParent);
            //console.log("pageNumber=", pageNumber);
            //console.log("masterPageSelect=", masterPageSelect);
            //res.send("delete routine");

            //Page redirect.
            res.redirect(returnURL);
        }
    })();
    //----------------------
})/*.catch((err) => {
    return res.status(400).send();
})*/;
//**************************************************************************************


//Backend - Records - Patch (small changes).
//**************************************************************************************
//router.patch("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords, (req, res)=>{ //working, with the async block
//router.patch("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords, (req, res, next)=>{ //working, with the async block
router.patch("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRecords, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root_or_user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false, nRecords: 0, recordUpdatedValue: null};
    //let configAPIKey = process.env.CONFIG_API_KEY_SYSTEM;
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");

    let objBody = {}
    let strTable = "";
    let idRecord = "";
    let strField = "";
    let recordValue = "";
    let patchType = ""; //setValue | toggleValue | fileDelete
    let ajaxFunction = false; //true - using ajax | false - not using ajax (using redirection)
    let apiKey = "";

    let updateRecordsGeneric10Result;
    //----------------------


    //Value definition.
    //----------------------
    if(req.body)
    {
        objBody = req.body;
    } //debug

    if(req.body.strTable)
    {
        strTable = req.body.strTable;
    }
    if(req.body.idRecord)
    {
        idRecord = req.body.idRecord;
    }
    if(req.body.strField)
    {
        strField = req.body.strField;
    }
    if(req.body.recordValue)
    {
        recordValue = req.body.recordValue;
    }
    if(req.body.patchType)
    {
        patchType = req.body.patchType;
    }
    
    if(req.body.ajaxFunction)
    {
        ajaxFunction = req.body.ajaxFunction;
    }
    if(req.body.apiKey)
    {
        apiKey = req.body.apiKey;
    }
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            //if(configAPIKey == apiKey)
            if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
            {
                if(patchType == "setValue")
                {
                    /*
                    updateRecordsGeneric10Result = await SyncSystemNS.FunctionsDBUpdate.updateRecordGeneric10("categories", 
                    "activation", 
                    "0", 
                    ["id;635;i"]);
                    */ //debug

                    updateRecordsGeneric10Result = await SyncSystemNS.FunctionsDBUpdate.updateRecordGeneric10(strTable, 
                    strField, 
                    recordValue, 
                    ["id;"+ idRecord + ";i"]);

                    if(updateRecordsGeneric10Result.returnStatus == true)
                    {
                        objReturn.recordUpdatedValue = recordValue;
                    }
                }


                if(patchType == "toggleValue")
                {
                    let recordCurrentResult = "";
                    let valueCurrent = "";
                    let valueUpdate = "";


                    //Get current value.
                    recordCurrentResult = await SyncSystemNS.FunctionsDB.genericTableGet02(strTable, 
                                                                    ["id;" + idRecord + ";i"], 
                                                                    "", 
                                                                    "", 
                                                                    "id, " + strField, 
                                                                    1, 
                                                                    {returnType: 3});
                    //console.log("recordCurrentResult=", recordCurrentResult);
                    valueCurrent = recordCurrentResult[0][strField];


                    //Define update value.    
                    if(valueCurrent == "1")
                    {
                        valueUpdate = "0";
                    }else{
                        valueUpdate = "1";
                    }   


                    //Udate record.
                    updateRecordsGeneric10Result = await SyncSystemNS.FunctionsDBUpdate.updateRecordGeneric10(strTable, 
                    strField, 
                    valueUpdate, 
                    ["id;"+ idRecord + ";i"]);

                    if(updateRecordsGeneric10Result.returnStatus == true)
                    {
                        objReturn.recordUpdatedValue = valueUpdate;
                    }
                }


                if(patchType == "fileDelete")
                {
                    //Search file name to delete.
                    let fileNameDelete = "";
                    let objResultFileDelete = {};
                    let resultsRecordDetails = await SyncSystemNS.FunctionsDB.genericTableGet02(strTable, 
                                                                                                ["id;" + idRecord + ";i"], 
                                                                                                "", 
                                                                                                "", 
                                                                                                strField,
                                                                                                1);

                    fileNameDelete = resultsRecordDetails[0][strField];
                    if(fileNameDelete)
                    {
                        objResultFileDelete = await SyncSystemNS.FunctionsFiles.fileDelete02(fileNameDelete, "", SyncSystemNS.FunctionsGeneric.arrImageSizeSelect(strTable));
                        //console.log("objResultFileDelete=", objResultFileDelete);
                    }


                    //Update field.
                    updateRecordsGeneric10Result = await SyncSystemNS.FunctionsDBUpdate.updateRecordGeneric10(strTable, 
                    strField, 
                    recordValue, 
                    ["id;"+ idRecord + ";i"]);


                    if(updateRecordsGeneric10Result.returnStatus == true)
                    {
                        objReturn.recordUpdatedValue = recordValue;
                    }
                }
            }else{
                //API key not the same.
                objReturn.returnStatus = false;
                objReturn.errorMessage = "statusMessageAPI2e";
            }


            //Debug.
            //console.log("objBody=", objBody);
            //console.log("updateRecordsGeneric10Result=", updateRecordsGeneric10Result);
            //console.log("strTable=", strTable);
            //console.log("recordValue=", recordValue);
            //console.log("idRecord=", idRecord);
            //console.log("ajaxFunction=", ajaxFunction);
            //console.log("apiKey=", apiKey);
            //console.log("process.env.CONFIG_API_KEY_SYSTEM=", process.env.CONFIG_API_KEY_SYSTEM);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error("asyncError=", asyncError);
            }
        }finally{
            //Definition of the return object.
            objReturn.returnStatus = updateRecordsGeneric10Result.returnStatus;
            objReturn.nRecords = updateRecordsGeneric10Result.nRecords;


            //Page redirect.
            //res.redirect(returnURL);


            //Ajax - return object.
            if(ajaxFunction == true)
            {
                res.send({objReturn: objReturn});
            }
        }
    })();
    //----------------------


    //let debugJsonObject = {};

    //res.header('Access-Control-Allow-Origin', "*");
    //res.header('Access-Control-Allow-Headers', "*");

    //res.send("patch routine");
    //res.send({patchStatus: 'successxxx', returnData: 'patch routine', testing: "updateRecordsGeneric10Result", objBody: objBody});
});
//**************************************************************************************


//Export.
module.exports = router;