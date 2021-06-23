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


//Backend - Quizzes - listing - GET.
//**************************************************************************************
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/:idParent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const QuizzesListing = require("../" + gSystemConfig.configDirectorySystem + "/quizzes-listing.js");
    //----------------------


    //Variables.
    //----------------------
    let qlBackend;
    let idParent = "";
    //let idType = "";

    let pageNumber = "";
    let masterPageSelect = "layout-backend-main";
    let cookiesData;

    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";
    let nRecords = "";
    //----------------------


    //Value definition.
    //----------------------
    if(req.params.idParent)
    {
        idParent = req.params.idParent;
    }

    //if(req.query.idParent)
    //{
        //idParent = req.query.idParent;
    //}
    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
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
            qlBackend = new QuizzesListing({
                idParent: idParent,
                //idType: idType,
                pageNumber: pageNumber,

                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });


            /**/
            //Build object data.
            //await qlBackend.cphBodyBuild(); //working
            await qlBackend.build();
            
            //Render data with template.
            //gSystemConfig: gSystemConfig, //moved to locals
            //res.render("layout-backend-main", {
            res.render(masterPageSelect, {
                templateData: qlBackend,
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


    //Degug.
    /*
    res.render("layout-backend-main", {
        gSystemConfig: gSystemConfig
    });
    */
});
//**************************************************************************************


//Backend - Quizzes - POST (insert record).
//**************************************************************************************
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblQuizzesID = "";
    let tblQuizzesIdParent = "";
    let tblQuizzesSortOrder = 0;
    let tblQuizzesIdType = 0; //1 - news | 2 - photo gallery  | 3 - articles | 4 - quizzes

    let tblQuizzesIdRegisterUser = 0;

    let tblQuizzesTitle = "";
    let tblQuizzesDescription = "";

    let tblQuizzesURLAlias = "";
    let tblQuizzesKeywordsTags = "";
    let tblQuizzesMetaDescription = "";
    let tblQuizzesMetaTitle = "";

    let tblQuizzesInfo1 = "";
    let tblQuizzesInfo2 = "";
    let tblQuizzesInfo3 = "";
    let tblQuizzesInfo4 = "";
    let tblQuizzesInfo5 = "";

    let tblQuizzesNumber1 = 0;
    let tblQuizzesNumber2 = 0;
    let tblQuizzesNumber3 = 0;
    let tblQuizzesNumber4 = 0;
    let tblQuizzesNumber5 = 0;

    let tblQuizzesImageMain = "";
    let tblQuizzesImageMainCaption = "";

    let tblQuizzesActivation = "";
    let tblQuizzesActivation1 = "";
    let tblQuizzesActivation2 = "";
    let tblQuizzesActivation3 = "";
    let tblQuizzesActivation4 = "";
    let tblQuizzesActivation5 = "";

    let tblQuizzesIdStatus = "";
    let tblQuizzesNotes = "";

    let idParent = "";
    let idType = "";
    let pageNumber = "";
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
            tblQuizzesID = await new Promise((resolve, reject)=>{
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
                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsQuizzesFiltersGeneric1.push(fieldsPost.idsQuizzesFiltersGeneric1);

                        } else {
                            fieldsPost[name] = value;
                        }*/

                        //if(Array.isArray(name))
                        //{
                            //console.log("array true = ", name);
                        //}


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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblQuizzesID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblQuizzesID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableQuizzesImageMain == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblQuizzesID, 
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
                        });

                       
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            tblQuizzesImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblQuizzesImageMain;


                            //Resize images.
                            if(tblQuizzesImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrQuizzesImageSize, gSystemConfig.configDirectoryFiles, tblQuizzesImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblQuizzesImageMain=", tblCategoriesImageMain);
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
            //tblQuizzesID = "";
            tblQuizzesIdParent = formParseResults.fields.id_parent;
            tblQuizzesSortOrder = formParseResults.fields.sort_order;
            tblQuizzesIdType = formParseResults.fields.id_type;
        
            tblQuizzesTitle = formParseResults.fields.title;
            tblQuizzesDescription = formParseResults.fields.description;
        
            tblQuizzesURLAlias = formParseResults.fields.url_alias;
            tblQuizzesKeywordsTags = formParseResults.fields.keywords_tags;
            tblQuizzesMetaDescription = formParseResults.fields.meta_description;
            tblQuizzesMetaTitle = formParseResults.fields.meta_title;

            tblQuizzesInfo1 = formParseResults.fields.info1;
            tblQuizzesInfo2 = formParseResults.fields.info2;
            tblQuizzesInfo3 = formParseResults.fields.info3;
            tblQuizzesInfo4 = formParseResults.fields.info4;
            tblQuizzesInfo5 = formParseResults.fields.info5;

            tblQuizzesNumber1 = formParseResults.fields.number1;
            tblQuizzesNumber2 = formParseResults.fields.number2;
            tblQuizzesNumber3 = formParseResults.fields.number3;
            tblQuizzesNumber4 = formParseResults.fields.number4;
            tblQuizzesNumber5 = formParseResults.fields.number5;

            tblQuizzesImageMainCaption = formParseResults.fields.image_main_caption;
            tblQuizzesActivation = formParseResults.fields.activation;
            tblQuizzesActivation1 = formParseResults.fields.activation1;
            tblQuizzesActivation2 = formParseResults.fields.activation2;
            tblQuizzesActivation3 = formParseResults.fields.activation3;
            tblQuizzesActivation4 = formParseResults.fields.activation4;
            tblQuizzesActivation5 = formParseResults.fields.activation5;

            tblQuizzesIdStatus = formParseResults.fields.id_status;
            tblQuizzesNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            idType = formParseResults.fields.idType;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Insert record.
            //----------------------
            let quizzesInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.quizzesInsert_async({
                    _tblQuizzesID: tblQuizzesID,
                    _tblQuizzesIdParent: tblQuizzesIdParent,
                    _tblQuizzesSortOrder: tblQuizzesSortOrder,
                    _tblQuizzesDateCreation: "",
                    _tblQuizzesDateEdit: "",
                    _tblQuizzesIdType: tblQuizzesIdType,
                    _tblQuizzesIdRegisterUser: "0",
                    _tblQuizzesTitle: tblQuizzesTitle,
                    _tblQuizzesDescription: tblQuizzesDescription,
                    _tblQuizzesURLAlias: tblQuizzesURLAlias,
                    _tblQuizzesKeywordsTags: tblQuizzesKeywordsTags,
                    _tblQuizzesMetaDescription: tblQuizzesMetaDescription,
                    _tblQuizzesMetaTitle: tblQuizzesMetaTitle,
                    _tblQuizzesMetaInfo: "",
                    _tblQuizzesInfo1: tblQuizzesInfo1,
                    _tblQuizzesInfo2: tblQuizzesInfo2,
                    _tblQuizzesInfo3: tblQuizzesInfo3,
                    _tblQuizzesInfo4: tblQuizzesInfo4,
                    _tblQuizzesInfo5: tblQuizzesInfo5,
                    _tblQuizzesNumber1: tblQuizzesNumber1,
                    _tblQuizzesNumber2: tblQuizzesNumber2,
                    _tblQuizzesNumber3: tblQuizzesNumber3,
                    _tblQuizzesNumber4: tblQuizzesNumber4,
                    _tblQuizzesNumber5: tblQuizzesNumber5,
                    _tblQuizzesImageMain: tblQuizzesImageMain,
                    _tblQuizzesImageMainCaption: tblQuizzesImageMainCaption,
                    _tblQuizzesActivation: tblQuizzesActivation,
                    _tblQuizzesActivation1: tblQuizzesActivation1,
                    _tblQuizzesActivation2: tblQuizzesActivation2,
                    _tblQuizzesActivation3: tblQuizzesActivation3,
                    _tblQuizzesActivation4: tblQuizzesActivation4,
                    _tblQuizzesActivation5: tblQuizzesActivation5,
                    _tblQuizzesIdStatus: tblQuizzesIdStatus,
                    _tblQuizzesNotes: tblQuizzesNotes
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
            if(quizzesInsertResult == true)
            {
                returnURL += "&messageSuccess=statusMessage2";


                //Redirect.
                //res.redirect("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent);
                //res.redirect(returnURL);


                //Debug.
                //console.log("tblCategoriesImageMain(categoriesInsertResult)=", tblCategoriesImageMain);
            }
            //----------------------

    
            //Debug.
            //console.log("tblQuizzesID=", tblQuizzesID);
            //console.log("configPhysicalPathRoot=", gSystemConfig.configPhysicalPathRoot);
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
});
//**************************************************************************************


//Backend - Quizzes - edit - GET.
//**************************************************************************************
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbQuizzes?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    
    //Import objects.
    //----------------------
    const QuizzesEdit = require("../" + gSystemConfig.configDirectorySystem + "/quizzes-edit.js");
    //----------------------
    

    //Variables.
    //----------------------
    let qeBackend;
    let idTbQuizzes = "";

    let pageNumber = "";
    let masterPageSelect = "layout-backend-main";
    let cookiesData;

    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";
    let nRecords = "";
    //----------------------

    
    //Value definition.
    //----------------------
    if(req.params.idTbQuizzes)
    {
        idTbQuizzes = req.params.idTbQuizzes;
    }

    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
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
    //if(req.query.nRecords)
    //{
        //nRecords = req.query.nRecords;
    //}
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            qeBackend = new QuizzesEdit({
                idTbQuizzes: idTbQuizzes,

                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await qeBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: qeBackend,
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


//Backend - Quizzes - PUT (edit).
//**************************************************************************************
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblQuizzesID = "";
    let tblQuizzesIdParent = "";
    let tblQuizzesSortOrder = 0;
    let tblQuizzesIdType = 0; //1 - news | 2 - photo gallery  | 3 - articles | 4 - quizzes

    let tblQuizzesIdRegisterUser = 0;

    let tblQuizzesTitle = "";
    let tblQuizzesDescription = "";

    let tblQuizzesURLAlias = "";
    let tblQuizzesKeywordsTags = "";
    let tblQuizzesMetaDescription = "";
    let tblQuizzesMetaTitle = "";

    let tblQuizzesInfo1 = "";
    let tblQuizzesInfo2 = "";
    let tblQuizzesInfo3 = "";
    let tblQuizzesInfo4 = "";
    let tblQuizzesInfo5 = "";

    let tblQuizzesNumber1 = 0;
    let tblQuizzesNumber2 = 0;
    let tblQuizzesNumber3 = 0;
    let tblQuizzesNumber4 = 0;
    let tblQuizzesNumber5 = 0;

    let tblQuizzesImageMain = "";
    let tblQuizzesImageMainCaption = "";

    let tblQuizzesActivation = "";
    let tblQuizzesActivation1 = "";
    let tblQuizzesActivation2 = "";
    let tblQuizzesActivation3 = "";
    let tblQuizzesActivation4 = "";
    let tblQuizzesActivation5 = "";

    let tblQuizzesIdStatus = "";
    let tblQuizzesNotes = "";

    let idParent = "";
    let idType = "";
    let pageNumber = "";
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
    (async function(){ //async marks the block
        try{ 
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


                            //Define ID.
                            tblQuizzesID = fieldsPost.id;
                            

                            //console.log("formParseResults.files.image_main=", formParseResults.files.image_main);

                            //resolve({fields: fields, files: files}); //working
                        }
                    });
                    //----------------------


                    //Field parsing.
                    //----------------------
                    form.on('field', function(name, value){
                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsQuizzesFiltersGeneric1.push(fieldsPost.idsQuizzesFiltersGeneric1);

                        } else {
                            fieldsPost[name] = value;
                        }*/

                        //if(Array.isArray(name))
                        //{
                            //console.log("array true = ", name);
                        //}


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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblQuizzesID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblQuizzesID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableQuizzesImageMain == 1)
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


                        //var resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblQuizzesID, 
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
                        });

                       
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            tblQuizzesImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblQuizzesImageMain;


                            //Resize images.
                            if(tblQuizzesImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrQuizzesImageSize, gSystemConfig.configDirectoryFiles, tblQuizzesImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblQuizzesImageMain=", tblCategoriesImageMain);
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
            //tblQuizzesID = "";
            tblQuizzesIdParent = formParseResults.fields.id_parent;
            tblQuizzesSortOrder = formParseResults.fields.sort_order;
            tblQuizzesIdType = formParseResults.fields.id_type;

            tblQuizzesTitle = formParseResults.fields.title;
            tblQuizzesDescription = formParseResults.fields.description;
        
            tblQuizzesURLAlias = formParseResults.fields.url_alias;
            tblQuizzesKeywordsTags = formParseResults.fields.keywords_tags;
            tblQuizzesMetaDescription = formParseResults.fields.meta_description;
            tblQuizzesMetaTitle = formParseResults.fields.meta_title;

            tblQuizzesInfo1 = formParseResults.fields.info1;
            tblQuizzesInfo2 = formParseResults.fields.info2;
            tblQuizzesInfo3 = formParseResults.fields.info3;
            tblQuizzesInfo4 = formParseResults.fields.info4;
            tblQuizzesInfo5 = formParseResults.fields.info5;

            tblQuizzesNumber1 = formParseResults.fields.number1;
            tblQuizzesNumber2 = formParseResults.fields.number2;
            tblQuizzesNumber3 = formParseResults.fields.number3;
            tblQuizzesNumber4 = formParseResults.fields.number4;
            tblQuizzesNumber5 = formParseResults.fields.number5;

            tblQuizzesImageMainCaption = formParseResults.fields.image_main_caption;
            tblQuizzesActivation = formParseResults.fields.activation;
            tblQuizzesActivation1 = formParseResults.fields.activation1;
            tblQuizzesActivation2 = formParseResults.fields.activation2;
            tblQuizzesActivation3 = formParseResults.fields.activation3;
            tblQuizzesActivation4 = formParseResults.fields.activation4;
            tblQuizzesActivation5 = formParseResults.fields.activation5;

            tblQuizzesIdStatus = formParseResults.fields.id_status;
            tblQuizzesNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            idType = formParseResults.fields.idType;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Edit record.  
            //----------------------
            let quizzesUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.quizzesUpdate_async({
                    _tblQuizzesID: tblQuizzesID,
                    _tblQuizzesIdParent: tblQuizzesIdParent,
                    _tblQuizzesSortOrder: tblQuizzesSortOrder,
                    _tblQuizzesDateCreation: "",
                    _tblQuizzesDateEdit: "",
                    _tblQuizzesIdType: tblQuizzesIdType,
                    _tblQuizzesIdRegisterUser: "0",
                    _tblQuizzesTitle: tblQuizzesTitle,
                    _tblQuizzesDescription: tblQuizzesDescription,
                    _tblQuizzesURLAlias: tblQuizzesURLAlias,
                    _tblQuizzesKeywordsTags: tblQuizzesKeywordsTags,
                    _tblQuizzesMetaDescription: tblQuizzesMetaDescription,
                    _tblQuizzesMetaTitle: tblQuizzesMetaTitle,
                    _tblQuizzesMetaInfo: "",
                    _tblQuizzesInfo1: tblQuizzesInfo1,
                    _tblQuizzesInfo2: tblQuizzesInfo2,
                    _tblQuizzesInfo3: tblQuizzesInfo3,
                    _tblQuizzesInfo4: tblQuizzesInfo4,
                    _tblQuizzesInfo5: tblQuizzesInfo5,
                    _tblQuizzesNumber1: tblQuizzesNumber1,
                    _tblQuizzesNumber2: tblQuizzesNumber2,
                    _tblQuizzesNumber3: tblQuizzesNumber3,
                    _tblQuizzesNumber4: tblQuizzesNumber4,
                    _tblQuizzesNumber5: tblQuizzesNumber5,
                    _tblQuizzesImageMain: tblQuizzesImageMain,
                    _tblQuizzesImageMainCaption: tblQuizzesImageMainCaption,
                    _tblQuizzesActivation: tblQuizzesActivation,
                    _tblQuizzesActivation1: tblQuizzesActivation1,
                    _tblQuizzesActivation2: tblQuizzesActivation2,
                    _tblQuizzesActivation3: tblQuizzesActivation3,
                    _tblQuizzesActivation4: tblQuizzesActivation4,
                    _tblQuizzesActivation5: tblQuizzesActivation5,
                    _tblQuizzesIdStatus: tblQuizzesIdStatus,
                    _tblQuizzesNotes: tblQuizzesNotes
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
            if(quizzesUpdateResult == true)
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