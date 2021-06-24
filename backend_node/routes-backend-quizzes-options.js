"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
const util = require("util");
const _ = require("lodash");
//----------------------


//Backend - Quizzes Options - listing - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/:idQuizzes?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/:idQuizzes?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const QuizzesOptionsListing = require("../" + gSystemConfig.configDirectorySystem + "/quizzes-options-listing.js");
    //----------------------


    //Variables.
    //----------------------
    let qoBackend;
    let idQuizzes = "";
    let masterPageSelect = "layout-backend-main";
    let cookiesData;

    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";
    let nRecords = "";
    //----------------------


    //Value definition.
    //----------------------
    if(req.params.idQuizzes)
    {
        idQuizzes = req.params.idQuizzes;
    }

    if(req.query.masterPageSelect)
    {
        masterPageSelect = req.query.masterPageSelect;
    }

    cookiesData = req.cookies;

    if(req.query.messageSuccess)
    {
        messageSuccess = req.query.messageSuccess;
    }
    if(req.query.messageError)
    {
        messageError = req.query.messageError;
    }
    if(req.query.messageAlert)
    {
        messageAlert = req.query.messageAlert;
    }
    if(req.query.nRecords)
    {
        nRecords = req.query.nRecords;
    }
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            //Define values.
            qoBackend = new QuizzesOptionsListing({
                idQuizzes: idQuizzes,
                //pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });

            //Build object data.
            await qoBackend.build();

            
            //Render data with template.
            res.render(masterPageSelect, {
                templateData: qoBackend,
                additionalData: {cookiesData: cookiesData}
            });
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            next();
        }
    })();
    //----------------------
});
//**************************************************************************************


//Backend - Quizzes Options - POST (insert record).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions, (req, res)=>{
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblQuizzesOptionsID = "";
    let tblQuizzesOptionsIdQuizzes = "";
    let tblQuizzesOptionsSortOrder = 0;

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

    let idQuizzes = "";

    //let pageNumber = "";
    let masterPageSelect = "";

    let returnURL = "";

    let formfileFieldsReference = {};
    let resultsFunctionsFiles;
    let resultsFunctionsImageResize01;


    if(gSystemConfig.configUploadComponent == 1)
    {
        var form = new formidable.IncomingForm();
        //ref: https://www.codediesel.com/nodejs/processing-file-uploads-in-node-js/
        //ref: https://www.npmjs.com/package/formidable
        //ref: https://www.youtube.com/watch?v=9Zg-5jlz74w
        //ref: https://www.youtube.com/watch?v=cNG6VrGszck
        //var resultsFunctionsFiles;
    }
    //----------------------


    //Formidable configuration.
    //----------------------
    form.encoding = "utf-8";
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.maxFileSize = 200 * 1024 * 1024; //default maxFileSize is 200MB
    form.multiples = true; //default false
    //form.uploadDir = gSystemConfig.configPhysicalPathRoot + "/" + gSystemConfig.configDirectoryFilesVisualization;
    form.uploadDir = gSystemConfig.configDirectoryFilesUpload;
    form.keepExtensions = true;
    form.hash = false; //limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
    //----------------------


    //Async function.
    //----------------------
    /**/
    (async function(){ //async marks the block
        try{ 
            tblQuizzesOptionsID = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1)
                .then((results)=>{
                    if(results === undefined)
                    {
                        //Error.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                        }
                        reject(new Error("nCounterUpdate is undefined."));
                    }else{
                        //Success.
                        //resolve(nCounterUpdate);
                        resolve(results);
                    } //working
    
                });
            });
                

            //var formParseResults = await new Promise(async function(resolve, reject){
            var formParseResults = await new Promise(function(resolve, reject){
            //await new Promise(function(resolve, reject){
                //Variables.
                var fieldsPost;
                var filesPost;
                var formParseErrorPost;


                if(gSystemConfig.configUploadComponent == 1)
                {

                    //Request post data.
                    //----------------------
                    form.parse(req, function(formParseError, fields, files){
                        if(formParseError)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log("Form parse error: " + formParseError);
                            }

                            //reject(formParseError); //working
                            formParseErrorPost = formParseError;
                            return;
                        }else{
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log("Form parse success (fields): ", fields);
                                console.log("Form parse success (files): ", files);
                            }

                            /*Debug.
                            res.end(util.inspect({
                                fields: fields
                            }));
                            */

                            //Define values for posted data.
                            fieldsPost = fields;
                            filesPost = files;

                            //console.log("formParseResults.files.image_main=", formParseResults.files.image_main);

                            //resolve({fields: fields, files: files}); //working
                        }


                    });
                    //----------------------


                    //Field parsing.
                    //----------------------
                    form.on('field', function(name, value){


                        //Debug.
                        //console.log("form.on fieldsPost=", fields[name]);
                        //console.log("form.on fieldsPost=", fieldsPost);
                        //console.log("form.on common.actions.basicFormOnField=", common.actions.basicFormOnField);
                        
                        //console.log("form.on fieldsPost[name]=", fieldsPost[name]);
                        //console.log("form.on name=", name);
                        //console.log("form.on name.toString()=", name.toString());
                        //console.log("form.on value=", value);
                    });
                    //----------------------


                    //Progress bar.
                    //----------------------
                    form.on("progress", function(bytesReceived, bytesExpected){
                        let progressPercentComplete = (bytesReceived / bytesExpected) * 100;

                        //TODO: Progress bar on alert div.

                        //Debug.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log("Progress=");
                            console.log(progressPercentComplete.toFixed(2));
                        }
                    });
                    //----------------------


                    //Renaming.
                    //----------------------
                    //form.on("end", function(fields, files){
                    form.on("end", async function(fields, files){
                        //Note - this function structure must remain as it is or the "this" parameter looses it´s context.
                        /*
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableQuizzesOptionsImageMain == 1)
                        {
                            if(filesPost.hasOwnProperty("image_main") === true)
                            {
                                formfileFieldsReference.image_main = {};
                                formfileFieldsReference.image_main.originalFileName = filesPost.image_main.name;
                                formfileFieldsReference.image_main.fileSize = filesPost.image_main.size;
                                formfileFieldsReference.image_main.temporaryFilePath = filesPost.image_main.path;
                                formfileFieldsReference.image_main.fileNamePrefix = "";
                                formfileFieldsReference.image_main.fileNameSufix = "";
                                formfileFieldsReference.image_main.fileDirectoryUpload = "";
                            }
                        }


                        /**/
                        //var resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            /*SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                    this.openedFiles, 
                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                    "")*/
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblQuizzesOptionsID, 
                                                                            this.openedFiles, 
                                                                            gSystemConfig.configDirectoryFilesUpload, 
                                                                            "", 
                                                                            formfileFieldsReference)
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
                        })/*.then(async function(results){
                            if(results.returnStatus == true)
                            {
                                tblQuizzesOptionsImageMain = results.returnFileName;

                                //Debug.
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                console.log("tblQuizzesOptionsImageMain=", tblQuizzesOptionsImageMain);

                            }else{

                            }
                        })*/;

                       
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            //tblQuizzesOptionsImageMain = resultsFunctionsFiles.returnFileName;
                            //if(resultsFunctionsFiles.hasOwnProperty("image_main"))
                            //{
                                //tblQuizzesOptionsImageMain = resultsFunctionsFiles.image_main;
                            //}
                            tblQuizzesOptionsImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblQuizzesOptionsImageMain;


                            //Resize images.
                            if(tblQuizzesOptionsImageMain !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblQuizzesOptionsImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrQuizzesOptionsImageSize, gSystemConfig.configDirectoryFiles, tblQuizzesOptionsImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblQuizzesOptionsImageMain=", tblQuizzesOptionsImageMain);
                            //resolve({fields: fields, files: files});
                            resolve({fields: fieldsPost, files: filesPost});
                        }else{
                            reject(formParseErrorPost);
                        }

                    });
                    //----------------------

                }    
            });
            //Debug.
            //console.log("formParseResults=", formParseResults);


            //Define values.
            //----------------------
            //tblQuizzesOptionsID = "";
            tblQuizzesOptionsIdQuizzes = formParseResults.fields.id_quizzes;
            tblQuizzesOptionsSortOrder = formParseResults.fields.sort_order;
        
            tblQuizzesOptionsTitle = formParseResults.fields.title; 
            
            tblQuizzesOptionsInfo1 = formParseResults.fields.info1;
            tblQuizzesOptionsInfo2 = formParseResults.fields.info2;
            tblQuizzesOptionsInfo3 = formParseResults.fields.info3;
            tblQuizzesOptionsInfo4 = formParseResults.fields.info4;
            tblQuizzesOptionsInfo5 = formParseResults.fields.info5;

            tblQuizzesOptionsNumber1 = formParseResults.fields.number1;
            tblQuizzesOptionsNumber2 = formParseResults.fields.number2;
            tblQuizzesOptionsNumber3 = formParseResults.fields.number3;
            tblQuizzesOptionsNumber4 = formParseResults.fields.number4;
            tblQuizzesOptionsNumber5 = formParseResults.fields.number5;
            
            tblQuizzesOptionsActivation = formParseResults.fields.activation;

            idQuizzes = formParseResults.fields.idQuizzes;
            //pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + idQuizzes;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            /*if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }*/
            //----------------------


            //Insert record.  
            //----------------------
            let quizzesOptionsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.quizzesOptionsInsert_async({
                    _tblQuizzesOptionsID: tblQuizzesOptionsID,
                    _tblQuizzesOptionsIdQuizzes: tblQuizzesOptionsIdQuizzes,
                    _tblQuizzesOptionsSortOrder: tblQuizzesOptionsSortOrder,
                    _tblQuizzesOptionsDateCreation: "",
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
            //----------------------


            //Success.
            //----------------------
            if(quizzesOptionsInsertResult == true)
            {
                returnURL += "&messageSuccess=statusMessage2";


                //Debug.
                //console.log("tblQuizzesOptionsImageMain(categoriesInsertResult)=", tblQuizzesOptionsImageMain);
            }
            //----------------------
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(aError);
                //console.error(aError);
            }


            //Error.
            returnURL += "&messageError=statusMessage3";


            //Redirect.
            //res.redirect("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent);
            //res.redirect(returnURL);
        }finally{
            //Page redirect.
            res.redirect(returnURL);
        }
    })();
    //----------------------
            

    //Debug.
    //console.log(req.body);//object with the query post
    //console.log("fields = ");
    //console.log(fields);//object with the query post    
});
//**************************************************************************************


//Backend - Quizzes Options - edit - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbQuizzesOptions?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbQuizzesOptions?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const QuizzesOptionsEdit = require("../" + gSystemConfig.configDirectorySystem + "/quizzes-options-edit.js");
    //----------------------


    //Variables.
    //----------------------
    let qoeBackend;
    let idTbQuizzesOptions = "";

    //let pageNumber = "";
    let masterPageSelect = "layout-backend-main";
    let cookiesData;

    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";
    let nRecords = "";
    //----------------------


    //Value definition.
    //----------------------
    if(req.params.idTbQuizzesOptions)
    {
        idTbQuizzesOptions = req.params.idTbQuizzesOptions;
    }
    
    if(req.query.masterPageSelect)
    {
        masterPageSelect = req.query.masterPageSelect;
    }

    cookiesData = req.cookies;

    if(req.query.messageSuccess)
    {
        messageSuccess = req.query.messageSuccess;
    }
    if(req.query.messageError)
    {
        messageError = req.query.messageError;
    }
    if(req.query.messageAlert)
    {
        messageAlert = req.query.messageAlert;
    }
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            qoeBackend = new QuizzesOptionsEdit({
                idTbQuizzesOptions: idTbQuizzesOptions,

                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await qoeBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: qoeBackend,
                additionalData: {cookiesData: cookiesData}
            });

        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            next();
        }
    })();
    //----------------------
});
//**************************************************************************************


//Backend - Quizzes Options - PUT (edit).
//**************************************************************************************
//router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + gSystemConfig.configRouteBackendActionEdit, (req, res)=>{ //working, with the async block
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblQuizzesOptionsID = "";
    let tblQuizzesOptionsIdQuizzes = "";
    let tblQuizzesOptionsSortOrder = 0;

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

    let idQuizzes = "";

    let masterPageSelect = "";

    let returnURL = "";

    let formfileFieldsReference = {};
    let resultsFunctionsFiles;
    let resultsFunctionsImageResize01;


    if(gSystemConfig.configUploadComponent == 1)
    {
        var form = new formidable.IncomingForm();
        //ref: https://www.codediesel.com/nodejs/processing-file-uploads-in-node-js/
        //ref: https://www.npmjs.com/package/formidable
        //ref: https://www.youtube.com/watch?v=9Zg-5jlz74w
        //ref: https://www.youtube.com/watch?v=cNG6VrGszck
        //var resultsFunctionsFiles;
    }
    //----------------------


    //Formidable configuration.
    //----------------------
    form.encoding = "utf-8";
    form.maxFieldsSize = 20 * 1024 * 1024;
    form.maxFileSize = 200 * 1024 * 1024; //default maxFileSize is 200MB
    form.multiples = true; //default false
    //form.uploadDir = gSystemConfig.configPhysicalPathRoot + "/" + gSystemConfig.configDirectoryFilesVisualization;
    form.uploadDir = gSystemConfig.configDirectoryFilesUpload;
    form.keepExtensions = true;
    form.hash = false; //limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
    //----------------------  


    //Async function.
    //----------------------
    /**/
    (async function(){ //async marks the block
        try{ 
            var formParseResults = await new Promise(function(resolve, reject){
                //Variables.
                var fieldsPost;
                var filesPost;
                var formParseErrorPost;


                if(gSystemConfig.configUploadComponent == 1)
                {
                    //Request post data.
                    //----------------------
                    form.parse(req, function(formParseError, fields, files){
                        if(formParseError)
                        {
                            //Error.
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log("Form parse error: " + formParseError);
                            }

                            //reject(formParseError); //working
                            formParseErrorPost = formParseError;
                            return;
                        }else{
                            if(gSystemConfig.configDebug === true)
                            {
                                console.log("Form parse success (fields): ", fields);
                                console.log("Form parse success (files): ", files);
                            }

                            /*Debug.
                            res.end(util.inspect({
                                fields: fields
                            }));
                            */

                            //Define values for posted data.
                            fieldsPost = fields;
                            filesPost = files;


                            //Define ID.
                            tblQuizzesOptionsID = fieldsPost.id;


                            //console.log("formParseResults.files.image_main=", formParseResults.files.image_main);
                            //console.log("fieldsPost=", fieldsPost);

                            //resolve({fields: fields, files: files}); //working
                        }


                    });
                    //----------------------

                    //Field parsing.
                    //----------------------
                    form.on('field', function(name, value){


                        //Debug.
                        //console.log("form.on fieldsPost=", fields[name]);
                        //console.log("form.on fieldsPost=", fieldsPost);
                        //console.log("form.on common.actions.basicFormOnField=", common.actions.basicFormOnField);
                        
                        //console.log("form.on fieldsPost[name]=", fieldsPost[name]);
                        //console.log("form.on name=", name);
                        //console.log("form.on name.toString()=", name.toString());
                        //console.log("form.on value=", value);
                    });
                    //----------------------


                    //Progress bar.
                    //----------------------
                    form.on("progress", function(bytesReceived, bytesExpected){
                        let progressPercentComplete = (bytesReceived / bytesExpected) * 100;

                        //TODO: Progress bar on alert div.

                        //Debug.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log("Progress=");
                            console.log(progressPercentComplete.toFixed(2));
                        }
                    });
                    //----------------------


                    //Renaming.
                    //----------------------
                    //form.on("end", function(fields, files){
                    form.on("end", async function(fields, files){
                        //Note - this function structure must remain as it is or the "this" parameter looses it´s context.
                        /*
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableQuizzesOptionsImageMain == 1)
                        {
                            if(filesPost.hasOwnProperty("image_main") === true)
                            {
                                formfileFieldsReference.image_main = {};
                                formfileFieldsReference.image_main.originalFileName = filesPost.image_main.name;
                                formfileFieldsReference.image_main.fileSize = filesPost.image_main.size;
                                formfileFieldsReference.image_main.temporaryFilePath = filesPost.image_main.path;
                                formfileFieldsReference.image_main.fileNamePrefix = "";
                                formfileFieldsReference.image_main.fileNameSufix = "";
                                formfileFieldsReference.image_main.fileDirectoryUpload = "";
                            }
                        }


                        /**/
                        //var resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            /*SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                    this.openedFiles, 
                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                    "")*/
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblQuizzesOptionsID, 
                                                                            this.openedFiles, 
                                                                            gSystemConfig.configDirectoryFilesUpload, 
                                                                            "", 
                                                                            formfileFieldsReference)
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
                        })/*.then(async function(results){
                            if(results.returnStatus == true)
                            {
                                tblQuizzesOptionsImageMain = results.returnFileName;

                                //Debug.
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                console.log("tblQuizzesOptionsImageMain=", tblQuizzesOptionsImageMain);

                            }else{

                            }
                        })*/;

                       
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            //tblQuizzesOptionsImageMain = resultsFunctionsFiles.returnFileName;
                            //if(resultsFunctionsFiles.hasOwnProperty("image_main"))
                            //{
                                //tblQuizzesOptionsImageMain = resultsFunctionsFiles.image_main;
                            //}
                            tblQuizzesOptionsImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblQuizzesOptionsImageMain;


                            //Resize images.
                            if(tblQuizzesOptionsImageMain !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblQuizzesOptionsImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrQuizzesOptionsImageSize, gSystemConfig.configDirectoryFiles, tblQuizzesOptionsImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblQuizzesOptionsImageMain=", tblQuizzesOptionsImageMain);
                            //resolve({fields: fields, files: files});
                            resolve({fields: fieldsPost, files: filesPost});
                        }else{
                            reject(formParseErrorPost);
                        }

                    });
                    //----------------------

                }    
            });
            //Debug.
            //console.log("formParseResults=", formParseResults);


            //Define values.
            //----------------------
            //tblQuizzesOptionsID = "";
            tblQuizzesOptionsIdQuizzes = formParseResults.fields.id_quizzes;
            tblQuizzesOptionsSortOrder = formParseResults.fields.sort_order;
        
            tblQuizzesOptionsTitle = formParseResults.fields.title; 

            tblQuizzesOptionsInfo1 = formParseResults.fields.info1;
            tblQuizzesOptionsInfo2 = formParseResults.fields.info2;
            tblQuizzesOptionsInfo3 = formParseResults.fields.info3;
            tblQuizzesOptionsInfo4 = formParseResults.fields.info4;
            tblQuizzesOptionsInfo5 = formParseResults.fields.info5;

            tblQuizzesOptionsNumber1 = formParseResults.fields.number1;
            tblQuizzesOptionsNumber2 = formParseResults.fields.number2;
            tblQuizzesOptionsNumber3 = formParseResults.fields.number3;
            tblQuizzesOptionsNumber4 = formParseResults.fields.number4;
            tblQuizzesOptionsNumber5 = formParseResults.fields.number5;
            
            tblQuizzesOptionsActivation = formParseResults.fields.activation;

            idQuizzes = formParseResults.fields.idQuizzes;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzesOptions + "/" + idQuizzes;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            //if(pageNumber)
            //{
                //returnURL += "&pageNumber=" + pageNumber;
            //}
            //----------------------


            //Update record.  
            //----------------------
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
            //----------------------


            //Success.
            //----------------------
            if(quizzesOptionsUpdateResult == true)
            {
                returnURL += "&messageSuccess=statusMessage7&nRecords=1";
            }
            //----------------------



            //Debug.
            //console.log("tblCategoriesID=", tblCategoriesID);
            //console.log("configPhysicalPathRoot=", gSystemConfig.configPhysicalPathRoot);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(aError);
                //console.error(aError);
            }


            //Error.
            returnURL += "&messageError=statusMessage8";


            //Redirect.
            //res.redirect("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent);
            //res.redirect(returnURL);
        }finally{
            //Page redirect.
            res.redirect(returnURL);
        }
    })();
    //----------------------
});
//**************************************************************************************


//Export.
module.exports = router;