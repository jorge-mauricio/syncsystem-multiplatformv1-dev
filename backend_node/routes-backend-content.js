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


//Backend - Content - listing - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/:idParent?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/:idParent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //app.get("/system/categories", async (req, res)=>{ //working
    //Import objects.
    //----------------------
    const ContentListing = require("../" + gSystemConfig.configDirectorySystem + "/content-listing.js");
    //----------------------


    //Variables.
    //----------------------
    //let clBackend = new CategoriesListing();
    let clBackend;
    let idParent = "";
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
    if(req.params.idParent)
    {
        idParent = req.params.idParent;
    }

    //if(req.query.pageNumber)
    //{
        //pageNumber = req.query.pageNumber;
    //}
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
            //clBackend = await new CategoriesListing();
            //clBackend = new CategoriesListing(); //working
            clBackend = new ContentListing({
                idParent: idParent,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });
            //clBackend._idParent = idParent


            /**/
            //Build object data.
            //await clBackend.cphBodyBuild(); //working
            await clBackend.build();
            
            //Render data with template.
            //gSystemConfig: gSystemConfig, //moved to locals
            //res.render("layout-backend-main", {
            res.render(masterPageSelect, {
                templateData: clBackend,
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


//Backend - Content - POST (insert record).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent, (req, res)=>{
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblContentID = "";
    let tblContentIdParent = "";
    let tblContentSortOrder = 0;
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

    let idParent = "";

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
            tblContentID = await new Promise((resolve, reject)=>{
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
                //Variables.
                //----------------------
                var fieldsPost;
                var filesPost;
                var formParseErrorPost;
                //----------------------


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
                            //console.log("fieldsPost=", fieldsPost);

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
                        //arrIdsCategoriesFiltersGeneric1.push(fieldsPost.idsCategoriesFiltersGeneric1);

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

                        //Check fields with files.

                        //Build file fields references.
                        //console.log("fieldsPost.file_config=", fieldsPost.file_config); //debug
                        //console.log("fieldsPost.content_type=", fieldsPost.content_type); //debug
                        //if(fieldsPost.file_config !== 0)
                        //{
                            //console.log("fieldsPost.file_config !=true"); //debug
                        //}else{
                            //console.log("fieldsPost.file_config !=false"); //debug
                        //}


                        //if(fieldsPost.file_config != "0") //Check if is content.
                        //if(fieldsPost.file_config != 0) //Check if is content.
                        if(fieldsPost.content_type == "5" || fieldsPost.content_type == "7" || fieldsPost.content_type == "8"  || fieldsPost.content_type == "9" || fieldsPost.content_type == "11") //Check if is content.
                        {
                            //console.log("fieldsPost.content_type != '5'=true"); //debug


                            //image_main field.
                            //if(gSystemConfig.enableCategoriesImageMain == 1){
                                if(filesPost.hasOwnProperty("file") === true)
                                {
                                    formfileFieldsReference.file = {};
                                    formfileFieldsReference.file.originalFileName = filesPost.file.name;
                                    formfileFieldsReference.file.fileSize = filesPost.file.size;
                                    formfileFieldsReference.file.temporaryFilePath = filesPost.file.path;
                                    formfileFieldsReference.file.fileNamePrefix = "";
                                    formfileFieldsReference.file.fileNameSufix = "";
                                    formfileFieldsReference.file.fileDirectoryUpload = "";
                                }
                            //}

                            //thumbnail field.
                            if(gSystemConfig.enableContentFileThumbnail == 1){
                                if(filesPost.hasOwnProperty("file_thumbnail") === true)
                                {
                                    formfileFieldsReference.file_thumbnail = {};
                                    formfileFieldsReference.file_thumbnail.originalFileName = filesPost.file_thumbnail.name;
                                    formfileFieldsReference.file_thumbnail.fileSize = filesPost.file_thumbnail.size;
                                    formfileFieldsReference.file_thumbnail.temporaryFilePath = filesPost.file_thumbnail.path;
                                    formfileFieldsReference.file_thumbnail.fileNamePrefix = "tn-";
                                    formfileFieldsReference.file_thumbnail.fileNameSufix = "";
                                    formfileFieldsReference.file_thumbnail.fileDirectoryUpload = "";
                                }
                            }
                        }
                        //console.log("formfileFieldsReference=", formfileFieldsReference); //debug


                        //if(formfileFieldsReference != {})
                        if(_.isEmpty(formfileFieldsReference) !== true)
                        {
                            //console.log("formfileFieldsReference != {}=true"); //debug
                            //console.log("formfileFieldsReference=", formfileFieldsReference); //debug


                            resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                                /*SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                        this.openedFiles, 
                                                                        gSystemConfig.configDirectoryFilesUpload, 
                                                                        "")*/
                                SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblContentID, 
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
                                    tblCategoriesImageMain = results.returnFileName;

                                    //Debug.
                                    //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                    //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                    //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                    console.log("tblCategoriesImageMain=", tblCategoriesImageMain);

                                }else{

                                }
                            })*/;

                        }else{
                            //resultsFunctionsFiles.returnStatus = true; //error
                            resultsFunctionsFiles = { returnStatus: true };
                        }

                       
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            tblContentFile = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? resultsFunctionsFiles.file : tblContentFile;
                            //tblContentFileSize = formfileFieldsReference.file.fileSize;
                            tblContentFileSize = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? formfileFieldsReference.file.fileSize : "";
                            //tblContentFileOriginalName = formfileFieldsReference.file.originalFileName;
                            tblContentFileOriginalName = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? formfileFieldsReference.file.originalFileName : "";;

                            tblContentFileThumbnail = (resultsFunctionsFiles.hasOwnProperty("file_thumbnail") === true) ? resultsFunctionsFiles.file_thumbnail : tblContentFileThumbnail;


                            //Resize images.
                            if(tblContentFile !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblContentFile);
                            }
                            if(tblContentFileThumbnail !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblContentFileThumbnail);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblCategoriesImageMain=", tblCategoriesImageMain);
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
            //tblCategoriesID = "";
            tblContentIdParent = formParseResults.fields.id_parent;
            tblContentSortOrder = formParseResults.fields.sort_order;
            tblContentIdRegisterUser = formParseResults.fields.id_register_user; 
            tblContentContentType = formParseResults.fields.content_type; 
            tblContentContentColumns = formParseResults.fields.content_columns; 

            tblContentAlignText = formParseResults.fields.align_text; 
            tblContentAlignImage = formParseResults.fields.align_image; 

            tblContentContentText = formParseResults.fields.content_text;
            tblContentContentURL = formParseResults.fields.content_url;
            tblContentCaption = formParseResults.fields.caption;

            tblContentFileConfig = formParseResults.fields.file_config;

            tblContentActivation = formParseResults.fields.activation;

            idParent = formParseResults.fields.idParent;
            //pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            //if(pageNumber)
            //{
                //returnURL += "&pageNumber=" + pageNumber;
            //}
            //----------------------


            //Insert record.  
            //----------------------
            let contentInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.contentInsert_async({
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
            if(contentInsertResult == true)
            {
                returnURL += "&messageSuccess=statusMessage2";


                //Debug.
                //console.log("tblCategoriesImageMain(categoriesInsertResult)=", tblCategoriesImageMain);
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


//Backend - Content - edit - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbContent?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbContent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    
    //Import objects.
    //----------------------
    const ContentEdit = require("../" + gSystemConfig.configDirectorySystem + "/content-edit.js");
    //----------------------
    

    //Variables.
    //----------------------
    let ceBackend;
    let idTbContent = "";

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
    if(req.params.idTbContent)
    {
        idTbContent = req.params.idTbContent;
    }
    //if(req.query.pageNumber)
    //{
        //pageNumber = req.query.pageNumber;
    //}
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
            ceBackend = new ContentEdit({
                idTbContent: idTbContent,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await ceBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: ceBackend,
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
    //console.log("idTbCategories=", idTbCategories);
    //console.log("pageNumber=", pageNumber);
    //console.log("masterPageSelect=", masterPageSelect);

    /*
    res.render("layout-backend-main", {
        gSystemConfig: gSystemConfig
    });
    */
    //return res.render("edit categories");
    //res.send("idTbCategories=" + req.params.idTbCategories); 
    //res.send("idTbCategories=" + idTbCategories); 
    //res.send("pageNumber=" + pageNumber); 
    //res.send("masterPageSelect=" + masterPageSelect); 
});
//**************************************************************************************


//Backend - Content - PUT (edit).
//**************************************************************************************
//router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit, (req, res)=>{ //working, with the async block
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblContentID = "";
    let tblContentIdParent = "";
    let tblContentSortOrder = 0;
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

    let idParent = "";

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
                            tblContentID = fieldsPost.id;
                            

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
                        //arrIdsCategoriesFiltersGeneric1.push(fieldsPost.idsCategoriesFiltersGeneric1);

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

                        //Check fields with files.

                        //Build file fields references.
                        if(fieldsPost.content_type == "5" || fieldsPost.content_type == "7" || fieldsPost.content_type == "8"  || fieldsPost.content_type == "9" || fieldsPost.content_type == "11") //Check if is content.
                        {
                            //console.log("fieldsPost.content_type != '5'=true"); //debug


                            //image_main field.
                            //if(gSystemConfig.enableCategoriesImageMain == 1){
                                if(filesPost.hasOwnProperty("file") === true)
                                {
                                    //if(filesPost.file.size != 0)
                                    //{
                                        formfileFieldsReference.file = {};
                                        formfileFieldsReference.file.originalFileName = filesPost.file.name;
                                        formfileFieldsReference.file.fileSize = filesPost.file.size;
                                        formfileFieldsReference.file.temporaryFilePath = filesPost.file.path;
                                        formfileFieldsReference.file.fileNamePrefix = "";
                                        formfileFieldsReference.file.fileNameSufix = "";
                                        formfileFieldsReference.file.fileDirectoryUpload = "";
                                    //}
                                }
                            //}

                            //thumbnail field.
                            if(gSystemConfig.enableContentFileThumbnail == 1){
                                if(filesPost.hasOwnProperty("file_thumbnail") === true)
                                {
                                    formfileFieldsReference.file_thumbnail = {};
                                    formfileFieldsReference.file_thumbnail.originalFileName = filesPost.file_thumbnail.name;
                                    formfileFieldsReference.file_thumbnail.fileSize = filesPost.file_thumbnail.size;
                                    formfileFieldsReference.file_thumbnail.temporaryFilePath = filesPost.file_thumbnail.path;
                                    formfileFieldsReference.file_thumbnail.fileNamePrefix = "tn-";
                                    formfileFieldsReference.file_thumbnail.fileNameSufix = "";
                                    formfileFieldsReference.file_thumbnail.fileDirectoryUpload = "";
                                }
                            }
                        }


                        if(_.isEmpty(formfileFieldsReference) !== true)
                        {
                            //console.log("formfileFieldsReference != {}=true"); //debug
                            //console.log("formfileFieldsReference=", formfileFieldsReference); //debug


                            resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                                /*SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                        this.openedFiles, 
                                                                        gSystemConfig.configDirectoryFilesUpload, 
                                                                        "")*/
                                SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblContentID, 
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
                                    tblCategoriesImageMain = results.returnFileName;

                                    //Debug.
                                    //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                    //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                    //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                    console.log("tblCategoriesImageMain=", tblCategoriesImageMain);

                                }else{

                                }
                            })*/;

                        }else{
                            //resultsFunctionsFiles.returnStatus = true; //error
                            resultsFunctionsFiles = { returnStatus: true };
                        }

                       
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            tblContentFile = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? resultsFunctionsFiles.file : tblContentFile;
                            //tblContentFileSize = formfileFieldsReference.file.fileSize;
                            tblContentFileSize = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? formfileFieldsReference.file.fileSize : "";
                            //tblContentFileOriginalName = formfileFieldsReference.file.originalFileName;
                            tblContentFileOriginalName = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? formfileFieldsReference.file.originalFileName : "";;

                            tblContentFileThumbnail = (resultsFunctionsFiles.hasOwnProperty("file_thumbnail") === true) ? resultsFunctionsFiles.file_thumbnail : tblContentFileThumbnail;


                            //Resize images.
                            if(tblContentFile !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblContentFile);
                            }
                            if(tblContentFileThumbnail !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblContentFileThumbnail);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("tblContentFile=", tblContentFile);
                            //console.log("tblCategoriesImageMain=", tblCategoriesImageMain);
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
            //tblCategoriesID = "";
            tblContentIdParent = formParseResults.fields.id_parent;
            tblContentSortOrder = formParseResults.fields.sort_order;
            tblContentIdRegisterUser = formParseResults.fields.id_register_user; 
            tblContentContentType = formParseResults.fields.content_type; 
            tblContentContentColumns = formParseResults.fields.content_columns; 

            tblContentAlignText = formParseResults.fields.align_text; 
            tblContentAlignImage = formParseResults.fields.align_image; 

            tblContentContentText = formParseResults.fields.content_text;
            tblContentContentURL = formParseResults.fields.content_url;
            tblContentCaption = formParseResults.fields.caption;

            tblContentFileConfig = formParseResults.fields.file_config;

            tblContentActivation = formParseResults.fields.activation;

            idParent = formParseResults.fields.idParent;
            //pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendContent + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            //if(pageNumber)
            //{
                //returnURL += "&pageNumber=" + pageNumber;
            //}
            //----------------------


            //Update record.  
            //----------------------
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
            //----------------------


            //Success.
            //----------------------
            if(contentUpdateResult == true)
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